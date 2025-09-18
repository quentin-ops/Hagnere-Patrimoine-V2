import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export interface ArticleContent {
  format: string
  value: string
  html?: string | null
  raw?: Record<string, unknown> | null
}

export interface ArticleFaqItem {
  question: string
  answer: string
}

export interface NormalizedArticle {
  id: string
  slug: string
  title: string
  excerpt: string | null
  status: string
  featured: boolean
  readingMinutes: number | null
  publishedAt: Date | null
  updatedAt: Date
  createdAt: Date
  coverImageUrl: string | null
  coverImageAlt: string | null
  seoTitle: string | null
  seoDescription: string | null
  keywords: string[]
  content: ArticleContent | null
  faq: ArticleFaqItem[]
  metadata: Record<string, unknown> | null
  category: {
    id: string
    name: string
    slug: string
  } | null
  author: {
    id: string | null
    name: string | null
    email: string | null
  } | null
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
}

function parseJsonValue<T>(value: Prisma.JsonValue | null | undefined): T | null {
  if (!value) return null
  try {
    if (typeof value === 'object') {
      return value as T
    }
    return JSON.parse(String(value)) as T
  } catch (error) {
    console.warn('[lib/articles] Failed to parse JSON value', error)
    return null
  }
}

function normalizeContent(content: Prisma.JsonValue | null | undefined): ArticleContent | null {
  const parsed = parseJsonValue<ArticleContent & { raw?: unknown }>(content)
  if (!parsed) return null
  return {
    format: parsed.format ?? 'html',
    value: parsed.value ?? '',
    html: parsed.html ?? null,
    raw: parsed.raw && typeof parsed.raw === 'object' ? (parsed.raw as Record<string, unknown>) : null,
  }
}

function normalizeFaq(faq: Prisma.JsonValue | null | undefined): ArticleFaqItem[] {
  const parsed = parseJsonValue<ArticleFaqItem[]>(faq)
  if (!parsed) return []
  return parsed
    .map((item) => ({
      question: item.question ?? '',
      answer: item.answer ?? '',
    }))
    .filter((item) => item.question.trim().length > 0 && item.answer.trim().length > 0)
}

function normalizeArticle(article: Prisma.ArticleGetPayload<{
  include: {
    author: true
    category: true
    tags: true
  }
}>): NormalizedArticle {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt ?? null,
    status: article.status,
    featured: Boolean(article.featured),
    readingMinutes: article.readingMinutes ?? null,
    publishedAt: article.publishedAt ?? null,
    updatedAt: article.updatedAt,
    createdAt: article.createdAt,
    coverImageUrl: article.coverImageUrl ?? null,
    coverImageAlt: article.coverImageAlt ?? null,
    seoTitle: article.seoTitle ?? null,
    seoDescription: article.seoDescription ?? null,
    keywords: article.keywords ?? [],
    content: normalizeContent(article.content),
    faq: normalizeFaq(article.faq),
    metadata: parseJsonValue<Record<string, unknown>>(article.metadata),
    category: article.category
      ? {
          id: article.category.id,
          name: article.category.name,
          slug: article.category.slug,
        }
      : null,
    author: article.author
      ? {
          id: article.author.id ?? null,
          name: article.author.name ?? null,
          email: article.author.email ?? null,
        }
      : null,
    tags: article.tags?.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })) ?? [],
  }
}

interface ArticleQueryOptions {
  limit?: number
  offset?: number
  includeDrafts?: boolean
  categorySlug?: string
  search?: string
}

export async function getPublishedArticles({
  limit = 12,
  offset = 0,
  includeDrafts = false,
  categorySlug,
  search,
}: ArticleQueryOptions = {}) {
  const where: Prisma.ArticleWhereInput = {
    ...(includeDrafts ? {} : { status: 'PUBLISHED' as const }),
  }

  if (categorySlug) {
    where.category = { slug: categorySlug }
  }

  if (search) {
    const term = search.trim()
    if (term) {
      where.OR = [
        { title: { contains: term, mode: 'insensitive' } },
        { excerpt: { contains: term, mode: 'insensitive' } },
        { seoDescription: { contains: term, mode: 'insensitive' } },
      ]
    }
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        author: true,
        category: true,
        tags: true,
      },
      orderBy: [
        { publishedAt: 'desc' },
        { updatedAt: 'desc' },
      ],
      skip: offset,
      take: limit,
    }),
    prisma.article.count({ where }),
  ])

  return {
    total,
    articles: articles.map(normalizeArticle),
  }
}

export async function getArticleBySlug(
  slug: string,
  { includeDraft = false }: { includeDraft?: boolean } = {}
) {
  const where = includeDraft
    ? { slug }
    : {
        slug,
        status: 'PUBLISHED' as const,
      }

  const article = await prisma.article.findFirst({
    where,
    include: {
      author: true,
      category: true,
      tags: true,
    },
  })

  if (!article) return null
  return normalizeArticle(article)
}

export async function getRelatedArticles(categoryId: string, currentArticleId: string) {
  const articles = await prisma.article.findMany({
    where: {
      categoryId,
      id: { not: currentArticleId },
      status: 'PUBLISHED',
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 3,
    include: {
      author: true,
      category: true,
      tags: true,
    },
  })

  return articles.map(normalizeArticle)
}

export async function getLatestCategoriesWithCount(limit = 6) {
  const categories = await prisma.articleCategory.findMany({
    orderBy: {
      articles: {
        _count: 'desc',
      },
    },
    take: limit,
    include: {
      _count: {
        select: {
          articles: {
            where: {
              status: 'PUBLISHED',
            },
          },
        },
      },
    },
  })

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    count: category._count.articles,
  }))
}
