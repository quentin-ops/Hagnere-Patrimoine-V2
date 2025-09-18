"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, Facebook, Twitter, Linkedin, Copy, Check, Mail, MessageCircle, List, TrendingUp, Home, Calculator, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface Author {
  id: string
  name: string
  email: string | null
  image: string | null
  bio?: string | null
  role?: string | null
}

interface Category {
  id: string
  name: string
  slug: string
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | { value: string }
  status: string
  seoTitle: string | null
  seoDescription: string | null
  coverImageUrl: string | null
  coverImageAlt: string | null
  readingMinutes: number | null
  keywords: string[]
  faq: Array<{ question: string; answer: string }>
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  author: Author | null
  category: Category | null
  categoryId: string | null
  authorId: string | null
}

interface BlogArticleProps {
  article: Article
  relatedArticles: Article[]
}

interface TableOfContentsItem {
  id: string
  text: string
  level: number
}

export default function BlogArticle({ article, relatedArticles }: BlogArticleProps) {
  const [copied, setCopied] = useState(false)
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([])
  const [activeSection, setActiveSection] = useState<string>("")

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Extraire les titres du contenu HTML et ajouter des IDs
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const content = typeof article.content === 'string' 
      ? article.content 
      : article.content?.value || ''
    
    // Parser le HTML pour extraire les titres
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const toc: TableOfContentsItem[] = []
    
    headings.forEach((heading, index) => {
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName.substring(1))
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
      
      toc.push({ id, text, level })
    })
    
    setTableOfContents(toc)
  }, [article.content])

  // Observer l'élément actif lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
      
      let currentActiveId = ""
      
      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 0) {
          currentActiveId = heading.id
        }
      })
      
      if (currentActiveId) {
        setActiveSection(currentActiveId)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tableOfContents])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success("Lien copié !")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const text = encodeURIComponent(article.title)
    const url = encodeURIComponent(shareUrl)

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
      email: `mailto:?subject=${text}&body=${url}`,
    }

    const target = shareUrls[platform]
    if (!target) return
    window.open(target, '_blank')
  }

  const publishDate = article.publishedAt || article.createdAt

  // Fonction pour ajouter des IDs aux titres dans le contenu HTML
  const processContent = (content: string) => {
    if (!content || typeof window === 'undefined') return content
    
    // Parser le HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    headings.forEach((heading, index) => {
      const text = heading.textContent || ''
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
      heading.setAttribute('id', id)
    })
    
    return doc.body.innerHTML
  }

  const [processedContent, setProcessedContent] = useState('')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const content = typeof article.content === 'string' 
        ? article.content
        : article.content?.value || ''
      setProcessedContent(processContent(content))
    }
  }, [article.content])

  return (
    <article className="bg-gray-50">
      {/* Hero Section avec image et contenu superposé */}
      <header className="py-8" itemScope itemType="https://schema.org/Article">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden rounded-2xl">
            {/* Image de fond */}
            {article.coverImageUrl ? (
              <Image
                src={article.coverImageUrl}
                alt={article.coverImageAlt || article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
            )}
            
            {/* Overlay avec effet blur */}
            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Contenu du header en overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-8 md:p-12 pb-12">
                {/* Category Badge */}
                {article.category && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white/90 bg-white/20 backdrop-blur-sm rounded-md border border-white/20">
                      {article.category.name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" itemProp="headline">
                  {article.title}
                </h1>

                {/* Description/Excerpt */}
                {article.seoDescription && (
                  <p className="text-lg text-white/90 mb-6 leading-relaxed max-w-3xl" itemProp="description">
                    {article.seoDescription}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-1 text-sm text-white/80">
                  {article.author && (
                    <>
                      <div className="flex items-center gap-2" itemProp="author" itemScope itemType="https://schema.org/Person">
                        {article.author.image && (
                          <Image
                            src={article.author.image}
                            alt={article.author.name}
                            width={24}
                            height={24}
                            className="rounded-full border border-white/20"
                            itemProp="image"
                          />
                        )}
                        <span>Par <span className="font-medium text-white" itemProp="name">{article.author.name}</span></span>
                      </div>
                      <span className="mx-2">·</span>
                    </>
                  )}

                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-white/60" />
                    <time dateTime={publishDate.toISOString()} itemProp="datePublished">
                      {new Date(publishDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </time>
                  </span>

                  {article.readingMinutes && (
                    <>
                      <span className="mx-2">·</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-white/60" />
                        <span>{article.readingMinutes} min de lecture</span>
                      </span>
                    </>
                  )}
                </div>

                {/* Share row */}
                <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-white/90 mr-1">Partager :</span>
                  {/* Facebook */}
                  <button
                    onClick={() => handleShare('facebook')}
                    className="inline-flex h-9 items-center rounded-full bg-white/20 backdrop-blur-sm px-3 text-white hover:bg-white/30 transition-colors border border-white/20"
                    aria-label="Partager sur Facebook"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </button>
                  {/* X (Twitter) */}
                  <button
                    onClick={() => handleShare('twitter')}
                    className="inline-flex h-9 items-center rounded-full px-3 transition-colors border
                               bg-white/20 text-white hover:bg-white/30 border-white/20
                               dark:bg-black dark:text-white dark:hover:bg-black/90 dark:border-white/10"
                    aria-label="Partager sur X"
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    X
                  </button>
                  {/* LinkedIn */}
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="inline-flex h-9 items-center rounded-full bg-white/20 backdrop-blur-sm px-3 text-white hover:bg-white/30 transition-colors border border-white/20"
                    aria-label="Partager sur LinkedIn"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </button>
                  {/* WhatsApp */}
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="inline-flex h-9 items-center rounded-full bg-white/20 backdrop-blur-sm px-3 text-white hover:bg-white/30 transition-colors border border-white/20"
                    aria-label="Partager sur WhatsApp"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </button>
                  {/* Email */}
                  <button
                    onClick={() => handleShare('email')}
                    className="inline-flex h-9 items-center rounded-full bg-white/20 backdrop-blur-sm px-3 text-white hover:bg-white/30 transition-colors border border-white/20"
                    aria-label="Partager par e‑mail"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </button>
                  {/* Copier */}
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex h-9 items-center rounded-full bg-white/20 backdrop-blur-sm px-3 text-white hover:bg-white/30 transition-colors border border-white/20"
                    aria-label="Copier le lien"
                  >
                    {copied ? <Check className="mr-2 h-4 w-4 text-green-400" /> : <Copy className="mr-2 h-4 w-4" />}
                    Copier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-8 md:p-12 overflow-visible">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
              {/* Article */}
              <main className="max-w-none min-w-0">
                {/* Sommaire au-dessus du contenu */}
                {tableOfContents.length > 0 && (
                  <Card className="border border-gray-200 bg-gray-50 mb-8">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <List className="h-5 w-5 text-gray-600" />
                        Sommaire
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tableOfContents.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => {
                              e.preventDefault()
                              const element = document.getElementById(item.id)
                              if (element) {
                                const yOffset = -80
                                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                                window.scrollTo({ top: y, behavior: 'smooth' })
                              }
                            }}
                            className={`
                              block py-1.5 text-sm transition-all duration-200 rounded-lg hover:bg-white/60 px-3
                              ${item.level === 1 ? 'font-semibold' : ''}
                              ${item.level === 2 ? '' : ''}
                              ${item.level === 3 ? 'text-gray-600' : ''}
                              ${item.level === 4 ? 'text-gray-600' : ''}
                              ${item.level === 5 ? 'text-gray-500 text-xs' : ''}
                              ${item.level === 6 ? 'text-gray-500 text-xs' : ''}
                              ${activeSection === item.id 
                                ? 'text-primary font-medium bg-white border border-primary/20' 
                                : 'text-gray-700 hover:text-primary'
                              }
                            `}
                            style={{
                              paddingLeft: item.level > 1 ? `${(item.level - 1) * 12 + 12}px` : undefined
                            }}
                          >
                            {item.text}
                          </a>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                )}
                {/* Contenu HTML de TipTap */}
                <article>
                <div 
                  className="prose prose-lg max-w-none text-justify
                    prose-headings:font-bold 
                    prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 
                    prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6 prose-h2:text-gray-900 
                    prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5 prose-h3:text-gray-800 
                    prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-4 prose-h4:text-gray-800
                    prose-h5:text-lg prose-h5:mb-2 prose-h5:mt-3 prose-h5:text-gray-700
                    prose-h6:text-base prose-h6:mb-2 prose-h6:mt-3 prose-h6:text-gray-700
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-justify
                    prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                    prose-strong:text-gray-900 prose-strong:font-bold
                    prose-ul:list-disc prose-ul:mb-4 prose-ul:ml-6
                    prose-ol:list-decimal prose-ol:mb-4 prose-ol:ml-6
                    prose-li:mb-2 prose-li:text-justify
                    dark:prose-h1:text-gray-100 dark:prose-h2:text-gray-100 
                    dark:prose-h3:text-gray-200 dark:prose-h4:text-gray-200
                    dark:prose-h5:text-gray-300 dark:prose-h6:text-gray-300
                    dark:prose-p:text-gray-300 dark:prose-strong:text-gray-100
                    dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300"
                  dangerouslySetInnerHTML={{ 
                    __html: processedContent || (typeof article.content === 'string' 
                      ? article.content 
                      : article.content?.value || '')
                  }}
                  itemProp="articleBody"
                />
            
            {/* FAQ si présente */}
                            {article.faq && article.faq.length > 0 && (
                  <section className="mt-12 border-t pt-12">
                    <h2 className="mb-6 text-2xl font-bold">Questions fréquentes</h2>
                    <div className="space-y-4">
                      {article.faq.map((item, index) => (
                    <div key={index}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">{item.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </section>
            )}
            </article>
            
            {/* Partage */}
            <div className="mt-12 border-t pt-8">
              <p className="mb-4 text-sm font-semibold text-gray-900">Partager cet article</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('facebook')}
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('twitter')}
                  className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('linkedin')}
                  className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  className="hover:bg-gray-50"
                >
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </main>

          {/* Sidebar droite - Sticky */}
          <aside className="lg:sticky lg:top-24 space-y-6">
            {/* Offre Hagnéré Investissement */}
            <Card className="border-0 bg-gradient-to-br from-primary/5 via-white to-primary/10 shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <CardHeader className="relative pb-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Investissez dans l&apos;immobilier locatif garanti à 8% de rendement net d&apos;impôts, 100% clé-en-main !
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      Hagnéré Investissement est la seule boite en France à réaliser des projets immobiliers 100% garanti en terme de rendement locatif.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                {/* Services */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                                                <p className="font-medium text-gray-900 text-sm">Stratégie d&apos;investissement</p>
                      <p className="text-xs text-gray-600">Analyse personnalisée de votre projet</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">Optimisation fiscale</p>
                      <p className="text-xs text-gray-600">LMNP, LMP, déficit foncier, Société IS...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-colors group">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">Gestion complète</p>
                      <p className="text-xs text-gray-600">Recherche, Travaux, Gestion Locative, Comptabilité, etc.</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">144+</p>
                    <p className="text-xs text-gray-600">Projets réalisés</p>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <p className="text-2xl font-bold text-primary">9,07%</p>
                    <p className="text-xs text-gray-600">Rentabilité moy.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">0%</p>
                    <p className="text-xs text-gray-600">Impôts</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md" size="lg" asChild>
                    <Link href="/contact">
                      Démarrer mon projet
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-primary hover:text-primary/80" size="sm" asChild>
                    <Link href="/votre-projet">
                      En savoir plus →
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Articles similaires */}
            {relatedArticles.length > 0 && (
              <Card className="border shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">Articles similaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedArticles.map(relatedPost => (
                    <Link
                      key={relatedPost.id}
                      href={`/ressources/blog/${relatedPost.slug}`}
                      className="group block transition-all hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg"
                    >
                      <div className="flex gap-3">
                        {relatedPost.coverImageUrl ? (
                          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={relatedPost.coverImageUrl}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="h-20 w-24 shrink-0 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5" />
                        )}
                        <div className="flex-1">
                          <h4 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            {relatedPost.readingMinutes && (
                              <>
                                <Clock className="h-3 w-3" />
                                {relatedPost.readingMinutes} min
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </aside>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
