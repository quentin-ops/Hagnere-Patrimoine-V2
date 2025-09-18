import { type Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  getArticleBySlug,
  getRelatedArticles,
  type NormalizedArticle,
} from '@/lib/articles'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

const CANONICAL_BASE = 'https://hagnere-patrimoine.fr'

function processContent(content: string) {
  return content.replace(
    /<div[^>]*data-patrimoine-cta[^>]*(?:\/?>|><\/div>)/gi,
    '<div class="patrimoine-cta-placeholder" data-type="patrimoine"></div>'
  )
}

function mapMetadata(metadata: Record<string, unknown> | null | undefined) {
  const sourcesRaw = Array.isArray(metadata?.sources_officielles)
    ? (metadata?.sources_officielles as Array<Record<string, unknown>>)
    : []

  const sources = sourcesRaw
    .map((item) => ({
      title: typeof item.title === 'string' ? item.title : undefined,
      url: typeof item.url === 'string' ? item.url : undefined,
      publisher: typeof item.publisher === 'string' ? item.publisher : undefined,
      published: typeof item.published === 'string' ? item.published : undefined,
      accessed: typeof item.accessed === 'string' ? item.accessed : undefined,
    }))
    .filter((item) => Boolean(item.title && item.url))

  const videoRaw = metadata?.video as Record<string, unknown> | undefined
  const video = videoRaw && typeof videoRaw === 'object'
    ? {
        videoId: typeof videoRaw.videoId === 'string' ? videoRaw.videoId : undefined,
        title: typeof videoRaw.title === 'string' ? videoRaw.title : undefined,
        thumbnailUrl: typeof videoRaw.thumbnailUrl === 'string' ? videoRaw.thumbnailUrl : undefined,
        embedUrl: typeof videoRaw.embedUrl === 'string' ? videoRaw.embedUrl : undefined,
        duration: typeof videoRaw.duration === 'string' ? videoRaw.duration : undefined,
        uploadDate: typeof videoRaw.uploadDate === 'string' ? videoRaw.uploadDate : undefined,
      }
    : undefined

  return {
    ...(sources.length > 0 ? { sources_officielles: sources } : {}),
    ...(video && video.videoId ? { video } : {}),
  }
}

function mapArticleForClient(article: NormalizedArticle) {
  const rawContent = article.content?.html || article.content?.value || ''
  const processed = processContent(rawContent)

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: processed,
    status: article.status,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    coverImageUrl: article.coverImageUrl,
    coverImageAlt: article.coverImageAlt,
    readingMinutes: article.readingMinutes,
    keywords: article.keywords,
    faq: article.faq,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
    author: article.author
      ? {
          id: article.author.id,
          name: article.author.name,
          email: article.author.email,
          image: null,
          bio: null,
          role: null,
        }
      : null,
    category: article.category
      ? {
          id: article.category.id,
          name: article.category.name,
          slug: article.category.slug,
        }
      : null,
    categoryId: article.category?.id ?? null,
    authorId: article.author?.id ?? null,
    metadata: mapMetadata(article.metadata),
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  // const session = await getServerSession(authOptions)
  const session = null // Temporairement désactivé

  let article = await getArticleBySlug(slug)
  if (!article && session) {
    article = await getArticleBySlug(slug, { includeDraft: true })
  }

  if (!article) {
    return { title: 'Article non trouvé' }
  }

  const canonicalUrl = `${CANONICAL_BASE}/ressources/blog/${article.slug}`
  const title = article.seoTitle || `${article.title} | Blog Hagnéré Patrimoine`
  const description = article.seoDescription || article.excerpt || undefined

  return {
    title,
    description,
    keywords: article.keywords?.join(', '),
    authors: article.author?.name ? [{ name: article.author.name }] : undefined,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      publishedTime: article.publishedAt?.toISOString() || article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: article.author?.name ? [article.author.name] : undefined,
      images: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  // const session = await getServerSession(authOptions)
  const session = null // Temporairement désactivé

  let article = await getArticleBySlug(slug)
  if (!article && session) {
    article = await getArticleBySlug(slug, { includeDraft: true })
  }

  if (!article) {
    const redirectEntry = await prisma.urlRedirect.findFirst({
      where: {
        sourceUrl: `/ressources/blog/${slug}`,
        isActive: true,
      },
    })

    if (redirectEntry) {
      await prisma.urlRedirect.update({
        where: { id: redirectEntry.id },
        data: {
          hitCount: { increment: 1 },
          lastHitAt: new Date(),
        },
      })

      redirect(redirectEntry.targetUrl)
    }

    notFound()
  }

  const relatedArticles =
    article.category?.id
      ? await getRelatedArticles(article.category.id, article.id)
      : []

  const articleForClient = mapArticleForClient(article)
  const relatedForClient = relatedArticles.map(mapArticleForClient)

  const BlogArticle = dynamic(() => import('./BlogArticle'), { ssr: true })

  const publishArticle = async () => {
    'use server'
    // const sessionInfo = await getServerSession(authOptions)
    // if (!sessionInfo) return
    return // Temporairement désactivé

    await prisma.article.update({
      where: { id: article.id },
      data: {
        status: 'PUBLISHED',
        publishedAt: article.publishedAt ?? new Date(),
      },
    })

    redirect(`/ressources/blog/${article.slug}`)
  }

  return (
    <>
      {article.status !== 'PUBLISHED' && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-3">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-amber-800">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Article en brouillon</span>
              <span className="text-sm">
                Cet article n'est pas encore publié et n'est visible que par les administrateurs.
              </span>
            </div>
            {session && (
              <div className="flex items-center gap-2">
                <form action={publishArticle}>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700"
                  >
                    Publier l'article
                  </button>
                </form>
                <Link
                  href={`/interne/blog/${article.slug}/editer`}
                  className="inline-flex items-center rounded-md border border-amber-300 bg-white px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100"
                >
                  Modifier l'article
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <BlogArticle article={articleForClient} relatedArticles={relatedForClient} />
    </>
  )
}
