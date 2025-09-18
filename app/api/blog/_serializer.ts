import type { NormalizedArticle } from "@/lib/articles"

export interface SerializeOptions {
  includeContent?: boolean
  includeFaq?: boolean
  includeMetadata?: boolean
  includeAuthor?: boolean
  includeTags?: boolean
}

export function parseIncludeParam(searchParam: string | null) {
  if (!searchParam) return new Set<string>()
  return new Set(
    searchParam
      .split(",")
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean)
  )
}

export function serializeArticle(article: NormalizedArticle, options: SerializeOptions = {}) {
  const base = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    status: article.status,
    excerpt: article.excerpt,
    featured: article.featured,
    readingMinutes: article.readingMinutes,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    updatedAt: article.updatedAt.toISOString(),
    createdAt: article.createdAt.toISOString(),
    coverImageUrl: article.coverImageUrl,
    coverImageAlt: article.coverImageAlt,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    keywords: article.keywords,
    category: article.category
      ? {
          id: article.category.id,
          name: article.category.name,
          slug: article.category.slug,
        }
      : null,
  }

  const extended: Record<string, unknown> = {}

  if (options.includeAuthor) {
    extended.author = article.author
      ? {
          id: article.author.id,
          name: article.author.name,
          email: article.author.email,
        }
      : null
  }

  if (options.includeTags) {
    extended.tags = article.tags
  }

  if (options.includeMetadata) {
    extended.metadata = article.metadata ?? null
  }

  if (options.includeFaq) {
    extended.faq = article.faq
  }

  if (options.includeContent) {
    extended.content = article.content
  }

  return { ...base, ...extended }
}
