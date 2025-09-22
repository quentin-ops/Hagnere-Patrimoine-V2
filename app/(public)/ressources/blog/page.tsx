import { Metadata } from 'next'
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import BlogListing from './BlogListing'

export const metadata: Metadata = {
  title: 'Blog - Conseils en gestion de patrimoine | Hagnéré Patrimoine',
  description: 'Découvrez nos articles sur la gestion de patrimoine, la fiscalité, les investissements et la défiscalisation. Conseils d\'experts pour optimiser votre patrimoine.',
  openGraph: {
    title: 'Blog - Conseils en gestion de patrimoine',
    description: 'Articles et guides sur la gestion de patrimoine, fiscalité et investissements',
    type: 'website',
    url: 'https://hagnere-patrimoine.fr/ressources/blog',
    siteName: 'Hagnéré Patrimoine',
    images: [{
      url: 'https://hagnere-patrimoine.fr/og-blog.jpg',
      width: 1200,
      height: 630,
      alt: 'Blog Hagnéré Patrimoine'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Hagnéré Patrimoine',
    description: 'Conseils et actualités en gestion de patrimoine',
    images: ['https://hagnere-patrimoine.fr/og-blog.jpg']
  }
}

interface BlogPageProps {
  searchParams: {
    page?: string
    category?: string
    search?: string
  }
}

async function getArticles(params: {
  page: number
  category?: string
  search?: string
  limit: number
}) {
  const skip = (params.page - 1) * params.limit
  
  const where: any = {
    status: 'PUBLISHED'
  }

  if (params.category) {
    where.category = {
      slug: params.category
    }
  }

  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { excerpt: { contains: params.search, mode: 'insensitive' } }
    ]
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        category: true,
        tags: true
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      skip,
      take: params.limit
    }),
    prisma.article.count({ where })
  ])

  return { articles, total }
}

async function getCategories() {
  const categories = await prisma.articleCategory.findMany({
    include: {
      _count: {
        select: {
          articles: {
            where: { status: 'PUBLISHED' }
          }
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  return categories.filter(cat => cat._count.articles > 0)
}

async function getFeaturedArticle() {
  return prisma.article.findFirst({
    where: {
      status: 'PUBLISHED',
      featured: true
    },
    include: {
      category: true,
      tags: true
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const category = params.category
  const search = params.search
  const limit = 12

  const [
    { articles, total },
    categories,
    featuredArticle
  ] = await Promise.all([
    getArticles({ page, category, search, limit }),
    getCategories(),
    getFeaturedArticle()
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <Suspense fallback={<BlogLoadingSkeleton />}>
      <BlogListing
        articles={articles}
        categories={categories}
        featuredArticle={featuredArticle}
        currentPage={page}
        totalPages={totalPages}
        currentCategory={category}
        searchQuery={search}
      />
    </Suspense>
  )
}

function BlogLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        <div className="h-12 bg-muted rounded-lg w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-muted rounded-lg" />
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}