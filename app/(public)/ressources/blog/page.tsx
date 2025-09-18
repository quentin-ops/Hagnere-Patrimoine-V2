import type { Metadata } from 'next'

import BlogListingClient from './BlogListingClient'
import { getLatestCategoriesWithCount, getPublishedArticles } from '@/lib/articles'

interface BlogPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}

function formatDate(input: string | null) {
  if (!input) return ''
  const date = new Date(input)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('fr-FR', DATE_FORMAT)
}

export const metadata: Metadata = {
  title: 'Blog Patrimoine – Analyses & Stratégies | Hagnéré Patrimoine',
  description:
    "Conseils d'experts, études de cas et stratégies fiscales pour piloter votre patrimoine avec Hagnéré Patrimoine.",
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const pageParam = params?.page
  const searchParam = params?.q
  const categoryParam = params?.category

  const page = typeof pageParam === 'string' ? Math.max(1, Number.parseInt(pageParam, 10) || 1) : 1
  const search = typeof searchParam === 'string' ? searchParam : undefined
  const categorySlug = typeof categoryParam === 'string' ? categoryParam : undefined

  const limit = 12
  const offset = (page - 1) * limit

  const [{ articles }, categories] = await Promise.all([
    getPublishedArticles({ limit, offset, search, categorySlug }),
    getLatestCategoriesWithCount(12),
  ])

  const posts = articles.map((article) => {
    const targetDate = article.publishedAt ?? article.createdAt
    return {
      id: article.id,
      slug: article.slug,
      title: article.title,
      description: article.seoDescription || article.excerpt || '',
      category: article.category?.name || 'Non catégorisé',
      author: {
        name: article.author?.name || 'Équipe Hagnéré Patrimoine',
        avatar: undefined,
      },
      image: article.coverImageUrl,
      readTime: article.readingMinutes ? `${article.readingMinutes} min` : null,
      publishedAt: formatDate(targetDate.toISOString()),
      publishedAtDate: targetDate.toISOString(),
      featured: article.featured,
    }
  })

  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    count: category.count,
  }))

  return (
    <BlogListingClient
      initialPosts={posts}
      initialCategories={formattedCategories}
      initialVideos={[]}
    />
  )
}
