import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import BlogArticle from './BlogArticle'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'

interface BlogPostPageProps {
  params: { slug: string }
}

// Générer les métadonnées SEO
export async function generateMetadata({ 
  params 
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticleBySlug(slug)
  
  if (!post) {
    return {
      title: 'Article non trouvé',
      description: 'L\'article que vous recherchez n\'existe pas.'
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hagnere-patrimoine.fr'
  const articleUrl = `${baseUrl}/ressources/blog/${post.slug}`
  const imageUrl = post.coverImageUrl || `${baseUrl}/og-image-default.jpg`

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || '',
    keywords: post.tags?.map(tag => tag.name).join(', '),
    authors: [{ name: 'Hagnéré Patrimoine' }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || '',
      type: 'article',
      url: articleUrl,
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.coverImageAlt || post.title
      }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['Hagnéré Patrimoine'],
      tags: post.tags?.map(tag => tag.name),
      siteName: 'Hagnéré Patrimoine'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || '',
      images: [imageUrl],
      creator: '@HagnerePatrimoine'
    },
    alternates: {
      canonical: articleUrl
    }
  }
}

// Fonction pour récupérer l'article
async function getArticleBySlug(slug: string) {
  const session = await getServerSession(authOptions)
  
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      category: true,
      tags: true
    }
  })

  if (!article) return null

  // Vérifier les permissions
  if (article.status !== 'PUBLISHED' && !session?.user) {
    return null
  }

  // Transformer les données pour le composant
  return {
    ...article,
    content: typeof article.content === 'string' ? article.content : article.content?.value || '',
    keywords: article.tags?.map(tag => tag.name) || [],
    faq: article.faq || [],
    publishedAt: article.publishedAt?.toISOString() || null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString()
  }
}

// Fonction pour récupérer les articles liés
async function getRelatedArticles(categoryId: string | null, currentId: string) {
  if (!categoryId) return []
  
  const articles = await prisma.article.findMany({
    where: {
      categoryId,
      id: { not: currentId },
      status: 'PUBLISHED'
    },
    include: {
      category: true,
      tags: true
    },
    orderBy: { publishedAt: 'desc' },
    take: 3
  })
  
  // Transformer les données pour le composant
  return articles.map(article => ({
    ...article,
    content: typeof article.content === 'string' ? article.content : article.content?.value || '',
    keywords: article.tags?.map(tag => tag.name) || [],
    faq: article.faq || [],
    publishedAt: article.publishedAt?.toISOString() || null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString()
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getArticleBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedArticles(post.categoryId, post.id)
  const session = await getServerSession(authOptions)

  return (
    <BlogArticle 
      article={post} 
      relatedArticles={relatedPosts}
    />
  )
}

// Génération statique des pages les plus visitées
export async function generateStaticParams() {
  const posts = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
    orderBy: { publishedAt: 'desc' },
    take: 20
  })

  return posts.map((post) => ({
    slug: post.slug
  }))
}