"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { StaticOptimizedImage } from "@/components/static-optimized-image"
import { useArticleTracking } from "@/hooks/useArticleTracking"
import { createArticleSchema, createBreadcrumbSchema, createFAQSchema, ORGANIZATION_ID } from '@/lib/json-ld'
import { generateVideoSchema } from '@/lib/json-ld-schemas'
import { generateYouTubeVideoSchema } from '@/lib/youtube-utils'
import { Clock, Calendar, Facebook, Twitter, Linkedin, Copy, Check, Mail, MessageCircle, TrendingUp, Home, Calculator, Sparkles, Youtube, User, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react"
import { ArticleCTAModern } from "@/components/article-cta-modern"
import PatrimoineCTA from "@/components/patrimoine-cta-v2"
import { ArticleContentWithCTAs } from "@/components/article-content-with-ctas"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import "@/styles/animations.css"

const SITE_URL = 'https://hagnere-patrimoine.fr'

// L'auteur est toujours Hagnéré Patrimoine - pas de relation dans le schéma

interface Category {
  id: string
  name: string
  slug: string
}

interface ArticleMetadata {
  sources_officielles?: Array<{
    title: string
    url: string
    publisher?: string
    published?: string
    accessed?: string
  }>
  video?: {
    videoId: string
    title: string
    thumbnailUrl: string
    embedUrl: string
    duration?: string
    uploadDate?: string
  }
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
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  category: Category | null
  categoryId: string | null
  metadata?: ArticleMetadata
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
  const [maxScrollProgress, setMaxScrollProgress] = useState(0)
  const [currentScrollProgress, setCurrentScrollProgress] = useState(0)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  
  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hook de tracking d'article
  const {
    saveProgress,
    markAsRead,
    getCurrentProgress,
    hasConsent,
    getRecentlyRead
  } = useArticleTracking(article.id, article.slug, article.title)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Extraire les titres du contenu HTML et ajouter des IDs + FAQ et Sources
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
    
    // Ajouter la FAQ au sommaire si elle existe
    if (article.faq && article.faq.length > 0) {
      toc.push({ id: 'faq-section', text: 'Questions fréquentes', level: 2 })
      article.faq.forEach((item, index) => {
        toc.push({ id: `faq-${index + 1}`, text: item.question, level: 3 })
      })
    }
    
    // Ajouter les sources au sommaire si elles existent
    if (article.metadata?.sources_officielles && article.metadata.sources_officielles.length > 0) {
      toc.push({ id: 'sources-section', text: 'Sources et références', level: 2 })
    }
    
    setTableOfContents(toc)
  }, [article.content, article.faq, article.metadata])

  // Observer l'élément actif lors du scroll et auto-expand UNIQUEMENT la section active
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
      
      let currentActiveId = ""
      let parentH2Id = ""
      
      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 0) {
          currentActiveId = heading.id
          
          // Trouver le H2 parent pour auto-expand
          const tocItem = tableOfContents.find(item => item.id === currentActiveId)
          if (tocItem && tocItem.level === 3) {
            // Trouver le H2 parent le plus proche
            const index = tableOfContents.indexOf(tocItem)
            for (let i = index - 1; i >= 0; i--) {
              if (tableOfContents[i].level <= 2) {
                parentH2Id = tableOfContents[i].id
                break
              }
            }
          } else if (tocItem && tocItem.level <= 2) {
            parentH2Id = currentActiveId
          }
        }
      })
      
      if (currentActiveId) {
        setActiveSection(currentActiveId)
        
        // Remplacer toutes les sections expandées par uniquement la section active
        if (parentH2Id) {
          setExpandedSections(new Set([parentH2Id]))
        } else {
          // Si aucune section parent, fermer toutes les sections
          setExpandedSections(new Set())
        }
        
        // Auto-scroll du sommaire pour garder l'élément actif visible
        setTimeout(() => {
          const tocContainer = document.getElementById('toc-nav')
          const activeElement = tocContainer?.querySelector(`a[href="#${currentActiveId}"]`) as HTMLElement
          
          if (tocContainer && activeElement) {
            const containerRect = tocContainer.getBoundingClientRect()
            const elementRect = activeElement.getBoundingClientRect()
            
            // Si l'élément est en dehors de la vue du conteneur
            if (elementRect.top < containerRect.top + 20 || elementRect.bottom > containerRect.bottom - 20) {
              // Calculer la position de scroll pour centrer l'élément dans le conteneur
              const elementOffsetTop = activeElement.offsetTop - tocContainer.offsetTop
              const scrollPosition = elementOffsetTop - (tocContainer.clientHeight / 2) + (activeElement.clientHeight / 2)
              
              tocContainer.scrollTo({
                top: Math.max(0, scrollPosition),
                behavior: 'smooth'
              })
            }
          }
        }, 100) // Petit délai pour laisser le temps au DOM de se mettre à jour
      } else {
        // Si aucune section n'est active, fermer toutes les sections
        setExpandedSections(new Set())
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tableOfContents])

  // Calculer la progression de lecture
  useEffect(() => {
    const handleScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrolled = window.scrollY
      
      if (documentHeight <= windowHeight) {
        setCurrentScrollProgress(100)
        setMaxScrollProgress(100)
        return
      }
      
      const scrollableHeight = documentHeight - windowHeight
      const progress = Math.round((scrolled / scrollableHeight) * 100)
      const clampedProgress = Math.min(Math.max(progress, 0), 100)
      
      // Mettre à jour la progression actuelle (toujours)
      setCurrentScrollProgress(clampedProgress)
      
      // Mettre à jour la progression maximale si on a scrollé plus loin
      setMaxScrollProgress(prev => {
        const newMax = Math.max(prev, clampedProgress)
        
        // Sauvegarder la progression dans les cookies si le consentement est donné
        if (hasConsent && newMax > prev) {
          saveProgress(newMax)
          
          // Marquer comme lu si on atteint 90%
          if (newMax >= 90 && prev < 90) {
            markAsRead()
          }
        }
        
        return newMax
      })
    }

    // Écouter les événements de scroll
    window.addEventListener('scroll', handleScrollProgress, { passive: true })
    
    // Calculer après un petit délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(handleScrollProgress, 100)

    // Appel initial
    handleScrollProgress()

    return () => {
      window.removeEventListener('scroll', handleScrollProgress)
      clearTimeout(timer)
    }
  }, [])

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

  // Composant CTA r\u00e9utilisable
  const CTAComponent = ({ variant = 'full', index = 0 }: { variant?: 'full' | 'compact' | 'appointment', index?: number }) => {
    // Utiliser le nouveau CTA Patrimoine
    return <PatrimoineCTA />
    
  }

  // Fonction pour ajouter des IDs aux titres et améliorer l'espacement dans le contenu HTML
  const processContent = (content: string) => {
    if (!content || typeof window === 'undefined') return content
    
    // Parser le HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    
    // Ajouter des IDs et des styles d'espacement aux titres
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach((heading, index) => {
      const text = heading.textContent || ''
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
      heading.setAttribute('id', id)
      
      // Ajouter des classes d'espacement selon le niveau du titre
      const tagName = heading.tagName.toLowerCase()
      if (tagName === 'h2') {
        heading.setAttribute('class', 'mt-16 md:mt-20 mb-6 text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100')
        heading.setAttribute('style', 'margin-top: 4rem !important; margin-bottom: 1.5rem !important;')
      } else if (tagName === 'h3') {
        heading.setAttribute('class', 'mt-12 md:mt-14 mb-4 text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200')
        heading.setAttribute('style', 'margin-top: 3rem !important; margin-bottom: 1rem !important;')
      }
    })
    
    // Traiter les paragraphes pour améliorer l'espacement
    // Remplacer les doubles <br> ou <br><br> par une fermeture et ouverture de paragraphe
    let html = doc.body.innerHTML
    
    // Remplacer les doubles sauts de ligne par des séparateurs de paragraphes
    html = html.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '</p><p class="mb-6">')
    
    // S'assurer que les paragraphes sans classe ont l'espacement approprié
    html = html.replace(/<p>/gi, '<p class="mb-6">')
    html = html.replace(/<p class="mb-6" class="mb-6">/gi, '<p class="mb-6">') // Éviter les doublons
    
    return html
  }

  const [processedContent, setProcessedContent] = useState('')
  const [contentWithCTAs, setContentWithCTAs] = useState('')
  
  // Fonction pour insérer les CTAs dans le contenu
  const insertCTAsInContent = (htmlContent: string) => {
    if (!htmlContent || typeof window === 'undefined') return htmlContent
    
    // Vérifier si les promotions automatiques sont activées
    // D'abord vérifier localStorage (pour la prévisualisation), sinon utiliser les métadonnées
    let autoPromotions = true // Par défaut activé
    
    if (typeof window !== 'undefined') {
      const localStorageValue = localStorage.getItem('autoPromotions')
      if (localStorageValue !== null) {
        autoPromotions = localStorageValue === 'true'
      } else if (article.metadata?.autoPromotions !== undefined) {
        autoPromotions = article.metadata.autoPromotions
      }
    } else if (article.metadata?.autoPromotions !== undefined) {
      autoPromotions = article.metadata.autoPromotions
    }
    
    if (!autoPromotions) {
      // Si les promotions automatiques sont désactivées, retourner le contenu sans CTA
      return htmlContent
    }
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlContent, 'text/html')
    
    // Compter le nombre de mots pour déterminer si l'article est court ou long
    const textContent = doc.body.textContent || ''
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length
    const isLongArticle = wordCount > 800 // Article long = plus de 800 mots
    
    // CTAs automatiques dans le contenu désactivées
    // Ne garder que la CTA principale après la synthèse
    
    return doc.body.innerHTML
  }
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const content = typeof article.content === 'string' 
        ? article.content
        : article.content?.value || ''
      const contentWithIds = processContent(content)
      const finalContent = insertCTAsInContent(contentWithIds)
      setProcessedContent(contentWithIds)
      setContentWithCTAs(finalContent)
    }
  }, [article.content])

  // Créer les schémas JSON-LD pour l'article
  const articleSchema = createArticleSchema({
    title: article.title,
    description: article.seoDescription || article.excerpt || '',
    url: `${SITE_URL}/ressources/blog/${article.slug}`,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
    updatedAt: new Date(article.updatedAt),
    author: {
      name: 'Hagnéré Patrimoine',
      email: 'contact@hagnere-patrimoine.fr'
    },
    image: article.coverImageUrl || undefined,
    tags: article.keywords || [],
  })

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Accueil', url: SITE_URL },
    { name: 'Ressources', url: `${SITE_URL}/ressources` },
    { name: 'Blog', url: `${SITE_URL}/ressources/blog` },
    { name: article.title },
  ])

  // Ajouter le schéma FAQ si présent
  const faqSchema = article.faq && article.faq.length > 0 
    ? createFAQSchema(article.faq.map(item => ({
        question: item.question,
        answer: item.answer,
      })))
    : null

  // Ajouter le schéma Video si présent
  const videoSchema = article.metadata?.video
    ? generateVideoSchema(generateYouTubeVideoSchema(article.metadata.video))
    : null

  const jsonLdSchemas = [articleSchema, breadcrumbSchema]
  if (faqSchema) jsonLdSchemas.push(faqSchema)
  if (videoSchema) jsonLdSchemas.push(videoSchema)

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-background" itemScope itemType="https://schema.org/Article">
      {/* Barre de progression fixe en haut - affiche la position actuelle */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/50 dark:bg-muted/50 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 transition-all duration-300 ease-out shadow-lg shadow-primary/20"
          style={{ width: `${currentScrollProgress}%` }}
        />
      </div>
      
      {/* Schémas JSON-LD pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
      />

      {/* Contenu principal */}
      <div className="pb-4 pt-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Div pour l'article principal */}
            <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border shadow-xl overflow-hidden">
              {/* Image de couverture pleine largeur */}
              {article.coverImageUrl && (
                <div className="relative w-full">
                  {console.log('[BlogArticle] Affichage image:', article.coverImageUrl, 'Alt:', article.coverImageAlt)}
                  <StaticOptimizedImage
                    src={article.coverImageUrl}
                    alt={article.coverImageAlt || article.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  />
                </div>
              )}
              
              <main className="px-4 sm:px-8 md:px-12 pb-8 md:pb-12">
                {/* Header de l'article */}
                <header className="mt-8 mb-6 lg:mb-12">
                  {/* Category and Reading Time */}
                  <div className="flex items-center gap-3 mb-6">
                    {article.category && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                          {article.category.name}
                        </span>
                      </div>
                    )}
                    {article.readingMinutes && (
                      <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-muted px-3 py-1 rounded-full">
                        <Clock className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {article.readingMinutes} min de lecture
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4" itemProp="headline">
                    {article.title}
                  </h1>

                  {/* Description */}
                  {article.seoDescription && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-4xl" itemProp="description">
                      {article.seoDescription}
                    </p>
                  )}

                  {/* Meta Information dans un badge */}
                  <div className="bg-gray-50 dark:bg-muted/50 border border-gray-200 dark:border-border rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Auteur et date - Toujours Quentin Hagnéré */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 flex-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                          <div className="relative w-9 h-9 rounded-full bg-black">
                            <Image
                              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758556598517-537bd5c866cd3e3e.webp"
                              alt="Quentin Hagnéré"
                              width={36}
                              height={36}
                              className="w-9 h-9 rounded-full object-cover object-[center_20%]"
                              itemProp="image"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100" itemProp="name">Quentin Hagnéré</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                <time dateTime={publishDate} itemProp="datePublished">
                                  {new Date(publishDate).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bouton Prendre rendez-vous - visible sur tous les écrans */}
                        <div className="sm:ml-auto">
                          <Link href="/calendly">
                            <Button 
                              size="sm" 
                              className="h-8 text-xs px-3 bg-black hover:bg-gray-800 text-white border-black transition-colors whitespace-nowrap w-full sm:w-auto"
                            >
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              Prendre rendez-vous
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Boutons de partage */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Partager</span>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-7 h-7 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                          aria-label="Partager sur Facebook"
                        >
                          <Facebook className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400 hover:text-[#1877F2]" />
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-7 h-7 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                          aria-label="Partager sur X"
                        >
                          <Twitter className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" />
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-7 h-7 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                          aria-label="Partager sur LinkedIn"
                        >
                          <Linkedin className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400 hover:text-[#0A66C2]" />
                        </button>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-7 h-7 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                          aria-label="Partager sur WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400 hover:text-[#25D366]" />
                        </button>
                        <div className="w-px h-4 bg-gray-300 dark:bg-zinc-600 mx-0.5" />
                        <button
                          onClick={handleCopyLink}
                          className="w-7 h-7 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                          aria-label="Copier le lien"
                        >
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Séparateur décoratif - masqué sur mobile */}
                <div className="hidden lg:block relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-white dark:bg-card px-6 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-primary/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <div className="w-2 h-2 rounded-full bg-primary/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Version mobile: Synthèse seulement */}
                <div className="lg:hidden">
                  {/* Synthèse sur mobile */}
                  {article.excerpt && (
                  <div className="relative mb-2 mt-2">
                    {/* Ombre animée */}
                    <div className="absolute -inset-[2px] rounded-xl blur-xl opacity-20 animate-gradient-shadow"
                      style={{
                        background: 'linear-gradient(90deg, #2563eb, #8b5cf6, #ec4899, #f97316, #2563eb)',
                        backgroundSize: '200% 200%',
                      }}
                    />
                    
                    {/* Bordure animée dégradée */}
                    <div className="absolute -inset-[1px] rounded-xl opacity-70 animate-gradient-rotate"
                      style={{
                        background: 'linear-gradient(90deg, #2563eb, #8b5cf6, #ec4899, #f97316, #2563eb)',
                        backgroundSize: '200% 200%',
                      }}
                    />
                    
                    {/* Container avec fond */}
                    <div className="relative bg-gray-50 dark:bg-card rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            📝 Synthèse de l'article
                          </p>
                          <div 
                            className="
                              [&_ul]:list-none [&_ul]:space-y-3 [&_ul]:pl-0
                              [&_li]:relative [&_li]:pl-6 [&_li]:text-sm [&_li]:leading-relaxed
                              [&_li]:text-gray-600 dark:[&_li]:text-gray-300
                              [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.4rem]
                              [&_li]:before:w-2 [&_li]:before:h-2 [&_li]:before:bg-primary 
                              [&_li]:before:rounded-full
                              [&_strong]:text-gray-900 dark:[&_strong]:text-gray-100 [&_strong]:font-semibold
                              [&_p]:mb-0 [&_li_p]:mb-0"
                            dangerouslySetInnerHTML={{ __html: article.excerpt }}
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  )}
                  
                  {/* Vidéo YouTube si présente - version mobile */}
                  {article.metadata?.video && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-6 mt-6">
                      <iframe
                        src={article.metadata.video.embedUrl}
                        title={article.metadata.video.title || "Vidéo YouTube"}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

                {/* Version desktop: Synthèse en premier */}
                <div className="hidden lg:block">
                  {article.excerpt && (
                    <div className="relative mb-2 mt-2">
                      {/* Ombre animée */}
                      <div className="absolute -inset-[2px] rounded-xl blur-xl opacity-20 animate-gradient-shadow"
                        style={{
                          background: 'linear-gradient(90deg, #2563eb, #8b5cf6, #ec4899, #f97316, #2563eb)',
                          backgroundSize: '200% 200%',
                        }}
                      />
                      
                      {/* Bordure animée dégradée */}
                      <div className="absolute -inset-[1px] rounded-xl opacity-70 animate-gradient-rotate"
                        style={{
                          background: 'linear-gradient(90deg, #2563eb, #8b5cf6, #ec4899, #f97316, #2563eb)',
                          backgroundSize: '200% 200%',
                        }}
                      />
                      
                      {/* Container avec fond */}
                      <div className="relative bg-gray-50 dark:bg-card rounded-xl p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                              Synthèse de l'article
                            </h2>
                            <div 
                              className="
                                [&_ul]:list-none [&_ul]:space-y-3 [&_ul]:pl-0
                                [&_li]:relative [&_li]:pl-6 [&_li]:text-sm [&_li]:leading-relaxed
                                [&_li]:text-gray-600 dark:[&_li]:text-gray-300
                                [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.4rem]
                                [&_li]:before:w-2 [&_li]:before:h-2 [&_li]:before:bg-primary 
                                [&_li]:before:rounded-full
                                [&_strong]:text-gray-900 dark:[&_strong]:text-gray-100 [&_strong]:font-semibold
                                [&_p]:mb-0 [&_li_p]:mb-0"
                              dangerouslySetInnerHTML={{ __html: article.excerpt }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Vidéo YouTube si présente */}
                  {article.metadata?.video && (
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-8 mt-8">
                      <iframe
                        src={article.metadata.video.embedUrl}
                        title={article.metadata.video.title || "Vidéo YouTube"}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
                
                {/* CTA unique après la synthèse pour tous les écrans */}
                <CTAComponent variant="full" />


                {/* Contenu HTML de TipTap avec CTAs intégrées */}
                <article className="mt-6 lg:mt-8">
                  <div className="article-content-wrapper">
                    {contentWithCTAs ? (
                      <ArticleContentWithCTAs 
                        content={contentWithCTAs}
                        className="prose prose-lg max-w-none text-justify
                          prose-headings:font-bold prose-headings:text-left
                          prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-16 
                          prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 md:prose-h2:mt-20 prose-h2:text-gray-900 
                          prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-12 md:prose-h3:mt-14 prose-h3:text-gray-800 
                          prose-p:text-base prose-p:leading-loose prose-p:mb-6 prose-p:text-justify
                          [&>p:first-of-type]:first-letter:text-5xl 
                          [&>p:first-of-type]:first-letter:font-bold 
                          [&>p:first-of-type]:first-letter:float-left 
                          [&>p:first-of-type]:first-letter:mr-3 
                          [&>p:first-of-type]:first-letter:leading-none
                          [&>p:first-of-type]:first-letter:text-primary
                          prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                          prose-strong:text-gray-900 prose-strong:font-bold
                          prose-ul:list-disc prose-ul:mb-6 prose-ul:ml-6 prose-ul:text-left
                          prose-ol:list-decimal prose-ol:mb-6 prose-ol:ml-6 prose-ol:text-left
                          prose-li:mb-3 prose-li:text-justify
                          prose-table:w-full prose-table:border-collapse prose-table:my-6
                          prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-left
                          prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
                          prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-6
                          prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
                          prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                          prose-hr:border-gray-300 prose-hr:my-8
                          prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto prose-img:my-6
                          dark:prose-h1:text-gray-100 dark:prose-h2:text-gray-100 
                          dark:prose-h3:text-gray-200 dark:prose-p:text-gray-300 
                          dark:prose-strong:text-gray-100
                          dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
                          [&_br]:block [&_br]:h-4
                          [&_h2]:!mt-16 md:[&_h2]:!mt-20 [&_h2]:!mb-6
                          [&_h2]:relative [&_h2]:pl-4
                          [&_h2]:before:absolute [&_h2]:before:left-0 [&_h2]:before:top-[-2.5rem]
                          [&_h2]:before:w-16 [&_h2]:before:h-[2px] 
                          [&_h2]:before:bg-gradient-to-r [&_h2]:before:from-primary/60 [&_h2]:before:to-transparent
                          [&_h2]:before:rounded-full
                          [&_h2]:after:absolute [&_h2]:after:left-0 [&_h2]:after:top-0
                          [&_h2]:after:w-1 [&_h2]:after:h-full 
                          [&_h2]:after:bg-gradient-to-b [&_h2]:after:from-primary/40 [&_h2]:after:to-transparent
                          [&_h2]:after:rounded-full
                          [&_h3]:!mt-12 md:[&_h3]:!mt-14 [&_h3]:!mb-6"
                      />
                    ) : (
                      <div 
                        className="prose prose-lg max-w-none text-justify
                          prose-headings:font-bold prose-headings:text-left
                          prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-16 
                          prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 md:prose-h2:mt-20 prose-h2:text-gray-900 
                          prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-12 md:prose-h3:mt-14 prose-h3:text-gray-800 
                          prose-p:text-base prose-p:leading-loose prose-p:mb-6 prose-p:text-justify
                          [&>p:first-of-type]:first-letter:text-5xl 
                          [&>p:first-of-type]:first-letter:font-bold 
                          [&>p:first-of-type]:first-letter:float-left 
                          [&>p:first-of-type]:first-letter:mr-3 
                          [&>p:first-of-type]:first-letter:leading-none
                          [&>p:first-of-type]:first-letter:text-primary
                          prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                          prose-strong:text-gray-900 prose-strong:font-bold
                          prose-ul:list-disc prose-ul:mb-6 prose-ul:ml-6 prose-ul:text-left
                          prose-ol:list-decimal prose-ol:mb-6 prose-ol:ml-6 prose-ol:text-left
                          prose-li:mb-3 prose-li:text-justify
                          prose-table:w-full prose-table:border-collapse prose-table:my-6
                          prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-left
                          prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
                          prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-6
                          prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
                          prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                          prose-hr:border-gray-300 prose-hr:my-8
                          prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto prose-img:my-6
                          dark:prose-h1:text-gray-100 dark:prose-h2:text-gray-100 
                          dark:prose-h3:text-gray-200 dark:prose-p:text-gray-300 
                          dark:prose-strong:text-gray-100
                          dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
                          [&_br]:block [&_br]:h-4
                          [&_h2]:!mt-16 md:[&_h2]:!mt-20 [&_h2]:!mb-6
                          [&_h2]:relative [&_h2]:pl-4
                          [&_h2]:before:absolute [&_h2]:before:left-0 [&_h2]:before:top-[-2.5rem]
                          [&_h2]:before:w-16 [&_h2]:before:h-[2px] 
                          [&_h2]:before:bg-gradient-to-r [&_h2]:before:from-primary/60 [&_h2]:before:to-transparent
                          [&_h2]:before:rounded-full
                          [&_h2]:after:absolute [&_h2]:after:left-0 [&_h2]:after:top-0
                          [&_h2]:after:w-1 [&_h2]:after:h-full 
                          [&_h2]:after:bg-gradient-to-b [&_h2]:after:from-primary/40 [&_h2]:after:to-transparent
                          [&_h2]:after:rounded-full
                          [&_h3]:!mt-12 md:[&_h3]:!mt-14 [&_h3]:!mb-6"
                        dangerouslySetInnerHTML={{ 
                          __html: processedContent || (typeof article.content === 'string' 
                            ? article.content 
                            : article.content?.value || '')
                        }}
                        itemProp="articleBody"
                      />
                    )}
                  </div>
                </article>            
            {/* FAQ si présente */}
            {article.faq && article.faq.length > 0 && (
              <section className="mt-16" itemScope itemType="https://schema.org/FAQPage">
                <h2 id="faq-section" className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Questions fréquentes</h2>
                <div className="bg-gray-50 dark:bg-card p-6 rounded-lg border border-gray-200 dark:border-border space-y-3">
                  {article.faq.map((item, index) => (
                      <div key={index} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                        <details className="group bg-white dark:bg-card rounded-lg border border-gray-200 dark:border-border overflow-hidden hover:border-gray-300 dark:hover:border-border transition-colors">
                          <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="flex-shrink-0 w-7 h-7 bg-primary/10 rounded flex items-center justify-center text-primary font-medium text-sm">
                                {index + 1}
                              </div>
                              <h3 id={`faq-${index + 1}`} className="font-medium text-gray-900 dark:text-gray-100 pr-4" itemProp="name">
                                {item.question}
                              </h3>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </summary>
                            <div className="px-4 pb-4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                              <div className="pl-10 pt-2">
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-justify" itemProp="text">
                                  {item.answer}
                                </p>
                              </div>
                            </div>
                          </details>
                        </div>
                  ))}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Vous avez d&apos;autres questions ?{' '}
                      <Link href="/contact" className="text-primary font-medium hover:underline">
                        Contactez-nous
                      </Link>
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Sources officielles */}
            {article.metadata?.sources_officielles && article.metadata.sources_officielles.length > 0 && (
              <section className="mt-12 px-4 sm:px-0" itemScope itemType="https://schema.org/WebPage">
                <h2 id="sources-section" className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Sources et références</h2>
                <div className="bg-gradient-to-br from-blue-50 dark:from-zinc-950 to-gray-50 dark:to-background rounded-xl p-6 border border-blue-100 dark:border-border">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-justify">Les informations de cet article sont basées sur des sources vérifiées et officielles</p>
                  <div className="space-y-3">
                    {article.metadata.sources_officielles.map((source, index) => (
                      <article key={index} className="bg-white dark:bg-card rounded-lg p-4 border border-gray-200 dark:border-border hover:border-blue-300 dark:hover:border-border transition-colors" itemScope itemType="https://schema.org/Citation">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <cite itemProp="citation" className="not-italic">
                              <a 
                                href={source.url} 
                                target="_blank" 
                                rel="noopener noreferrer nofollow"
                                className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                itemProp="url"
                              >
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  <span itemProp="name">{source.title}</span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-all">
                                  {source.url}
                                </div>
                              </a>
                            </cite>
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                              {source.publisher && (
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">Éditeur:</span> <span itemProp="publisher">{source.publisher}</span>
                                </div>
                              )}
                              {source.published && (
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">Publié le:</span> <time itemProp="datePublished" dateTime={source.published}>{source.published}</time>
                                </div>
                              )}
                              {source.accessed && (
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">Consulté le:</span> <time dateTime={source.accessed}>{source.accessed}</time>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              aria-label="Ouvrir la source"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}
              </main>
            </div>

            {/* Div pour la sidebar (sommaire/CTA) - cachée sur mobile */}
            <aside className="hidden lg:block space-y-6">
            {/* Sticky container pour sommaire + CTA avec gestion responsive verticale */}
            <div className="sticky top-24 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {/* Sommaire ultra-compact avec design moderne - masqué sur petits écrans en hauteur */}
              {tableOfContents.length > 0 && (
                <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-border overflow-hidden hide-on-short-screen compact-on-medium-screen">
                  {/* Header minimaliste */}
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-3.5 bg-primary rounded-full" />
                        <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Navigation</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gray-500 dark:text-gray-500">Lecture totale</span>
                        <div className="w-8 bg-gray-200 dark:bg-muted rounded-full h-0.5 overflow-hidden">
                          <div className="bg-primary h-full transition-all duration-300" style={{ width: `${maxScrollProgress}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 dark:text-gray-500 font-mono">{maxScrollProgress}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contenu avec sections collapsibles */}
                  <nav className="max-h-[240px] overflow-y-auto scrollbar-none" aria-label="Table of contents" id="toc-nav">
                    <div className="py-1">
                      {(() => {
                        const groupedItems: { h2: TableOfContentsItem, h3s: TableOfContentsItem[] }[] = [];
                        let currentH2Group: { h2: TableOfContentsItem, h3s: TableOfContentsItem[] } | null = null;
                        
                        tableOfContents.forEach((item) => {
                          if (item.level <= 2) {
                            if (currentH2Group) {
                              groupedItems.push(currentH2Group);
                            }
                            currentH2Group = { h2: item, h3s: [] };
                          } else if (item.level === 3 && currentH2Group) {
                            currentH2Group.h3s.push(item);
                          }
                        });
                        
                        if (currentH2Group) {
                          groupedItems.push(currentH2Group);
                        }
                        
                        return groupedItems.map((group, index) => {
                          const isActive = activeSection === group.h2.id || group.h3s.some(h3 => activeSection === h3.id);
                          const isExpanded = expandedSections.has(group.h2.id) || isActive;
                          const hasChildren = group.h3s.length > 0;
                          
                          return (
                            <div key={group.h2.id} className="relative">
                              {/* Ligne de connexion verticale pour les sections actives */}
                              {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                              )}
                              
                              {/* H2 Item */}
                              <div className="relative">
                                <a
                                  href={`#${group.h2.id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(group.h2.id);
                                    if (element) {
                                      const yOffset = -80;
                                      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                      window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                    if (hasChildren) {
                                      setExpandedSections(prev => {
                                        // Si la section est déjà ouverte, la fermer
                                        if (prev.has(group.h2.id)) {
                                          return new Set();
                                        } else {
                                          // Sinon, ouvrir uniquement cette section
                                          return new Set([group.h2.id]);
                                        }
                                      });
                                    }
                                  }}
                                  className={`
                                    group flex items-center gap-2 px-3 py-1.5 text-[11px] transition-all duration-150
                                    ${isActive && activeSection === group.h2.id
                                      ? 'bg-primary/5 text-primary font-medium' 
                                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-gray-100'
                                    }
                                  `}
                                >
                                  {/* Chevron pour les sections avec enfants */}
                                  {hasChildren && (
                                    <svg 
                                      className={`w-2.5 h-2.5 transition-transform duration-200 text-gray-400 ${
                                        isExpanded ? 'rotate-90' : ''
                                      }`} 
                                      fill="none" 
                                      viewBox="0 0 24 24" 
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  )}
                                  {!hasChildren && (
                                    <div className={`w-1 h-1 rounded-full ${
                                      isActive && activeSection === group.h2.id ? 'bg-primary' : 'bg-gray-400 dark:bg-gray-600'
                                    }`} />
                                  )}
                                  
                                  {/* Numéro minimaliste */}
                                  <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                  </span>
                                  
                                  {/* Texte */}
                                  <span className="flex-1 truncate">
                                    {group.h2.text}
                                  </span>
                                  
                                  {/* Badge pour nombre d'enfants */}
                                  {hasChildren && !isExpanded && (
                                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-mono">+{group.h3s.length}</span>
                                  )}
                                </a>
                              </div>
                              
                              {/* H3 Items (collapsibles) */}
                              {hasChildren && (
                                <div className={`overflow-hidden transition-all duration-200 ${
                                  isExpanded ? 'max-h-40' : 'max-h-0'
                                }`}>
                                  <div className="ml-4 pl-2 border-l border-gray-200 dark:border-border">
                                    {group.h3s.map((h3, h3Index) => (
                                      <a
                                        key={h3.id}
                                        href={`#${h3.id}`}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          const element = document.getElementById(h3.id);
                                          if (element) {
                                            const yOffset = -80;
                                            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                            window.scrollTo({ top: y, behavior: 'smooth' });
                                          }
                                        }}
                                        className={`
                                          flex items-center gap-2 px-2 py-1 text-[10px] transition-all duration-150
                                          ${activeSection === h3.id
                                            ? 'text-primary font-medium' 
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                          }
                                        `}
                                      >
                                        <div className={`w-0.5 h-0.5 rounded-full ${
                                          activeSection === h3.id ? 'bg-primary' : 'bg-gray-400'
                                        }`} />
                                        <span className="truncate">{h3.text}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </nav>
                </div>
              )}
              
              {/* CTA Moderne Hagnéré Patrimoine - Version Sidebar */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary">
                {/* Dégradé de fond subtil */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
                
                {/* Effet de halo lumineux */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                
                {/* Contenu principal */}
                <div className="relative z-10 p-6">
                  {/* Titre */}
                  <p className="text-xl font-bold text-white mb-2">
                    Hagnéré Patrimoine
                  </p>
                  
                  <p className="text-sm text-white/90 mb-4 leading-relaxed">
                    Optimisez votre patrimoine et réduisez vos impôts.
                  </p>
                  
                  {/* 3 Cards */}
                  <div className="space-y-2 mb-4">
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/25">
                      <p className="text-lg font-bold text-white">30%</p>
                      <p className="text-xs text-white/90">Économie d&apos;impôts moyenne</p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/25">
                      <p className="text-lg font-bold text-white">0€</p>
                      <p className="text-xs text-white/90">Frais cachés</p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/25">
                      <p className="text-lg font-bold text-white">100%</p>
                      <p className="text-xs text-white/90">Sur-mesure</p>
                    </div>
                  </div>
                  
                  {/* Boutons */}
                  <div className="space-y-2">
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-white text-primary hover:bg-gray-100 font-semibold"
                    >
                      <Link href="/prendre-rdv">
                        Prendre rendez-vous
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                    >
                      <Link href="/">
                        Découvrir le site
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Points de réassurance */}
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs text-white/80 text-center">
                      ✓ Gratuit • ✓ Sans engagement • ✓ Experts certifiés
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles similaires */}
            {relatedArticles.length > 0 && (
              <Card className="border border-gray-200/50 dark:border-border bg-white/90 dark:bg-card/90 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Articles similaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedArticles.map(relatedPost => (
                    <Link
                      key={relatedPost.id}
                      href={`/ressources/blog/${relatedPost.slug}`}
                      className="group block transition-all hover:bg-gray-50 dark:hover:bg-zinc-800 -mx-2 px-2 py-2 rounded-lg"
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
                          <div className="h-20 w-24 shrink-0 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 dark:from-card dark:to-background" />
                        )}
                        <div className="flex-1">
                          <h4 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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

      {/* Section Auteur */}
      <div className="py-12" itemScope itemType="https://schema.org/Person">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-gray-200 dark:border-border shadow-lg">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                {/* Photo */}
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/10 bg-black">
                    <Image
                      src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758556598517-537bd5c866cd3e3e.webp"
                      alt="Quentin Hagnéré"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-[center_20%]"
                      itemProp="image"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full border-3 border-white flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                {/* Contenu */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Info principale */}
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100" itemProp="name">Quentin Hagnéré</h3>
                        <Badge className="bg-primary/10 text-primary border-0">Expert</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3" itemProp="jobTitle">Fondateur de Hagnéré Investissement</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4" itemProp="description">
                        Spécialiste de la gestion de patrimoine et de fortune à 360°, 
                        j&apos;accompagne des milliers de clients dans la construction de stratégies performantes et innovantes 
                        pour atteindre leurs objectifs financiers avec une vision à 360° propulsée par notre galaxie de services.
                      </p>
                      <meta itemProp="worksFor" content="Hagnéré Investissement" />
                      <meta itemProp="alumniOf" content="CIF, COA, COBSP" />
                      <meta itemProp="knowsAbout" content="Investissement immobilier, Défiscalisation, Location meublée LMNP, Loi Pinel" />
                      <meta itemProp="email" content="backoffice@hagnere-patrimoine.fr" />
                      <meta itemProp="telephone" content="+33374472018" />
                      <meta itemProp="birthDate" content="1996-09-21" />
                      <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" style={{display: 'none'}}>
                        <meta itemProp="streetAddress" content="7 Rue Ernest Filliard" />
                        <meta itemProp="addressLocality" content="Chambéry" />
                        <meta itemProp="postalCode" content="73000" />
                        <meta itemProp="addressCountry" content="FR" />
                      </div>
                      <div itemProp="workExample" itemScope itemType="https://schema.org/Book" style={{display: 'none'}}>
                        <meta itemProp="name" content="Livre 1 - Quentin Hagnéré" />
                        <meta itemProp="isbn" content="978-2818810002" />
                        <meta itemProp="author" content="Quentin Hagnéré" />
                      </div>
                      <div itemProp="workExample" itemScope itemType="https://schema.org/Book" style={{display: 'none'}}>
                        <meta itemProp="name" content="Livre 2 - Quentin Hagnéré" />
                        <meta itemProp="isbn" content="978-2818811238" />
                        <meta itemProp="author" content="Quentin Hagnéré" />
                      </div>
                      
                      {/* Stats et formations */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                        <div className="flex items-center gap-2">
                          <Youtube className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">+32K abonnés</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">+10 ans d'expérience</span>
                        </div>
                      </div>
                      
                      {/* Certifications */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">CIF</Badge>
                        <Badge variant="secondary" className="text-xs">COA</Badge>
                        <Badge variant="secondary" className="text-xs">COBSP</Badge>
                        <Badge variant="secondary" className="text-xs">2 livres publiés</Badge>
                      </div>
                      
                      {/* Sites web dans des badges noirs cliquables */}
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                        <a href="https://hagnere-patrimoine.fr" target="_blank" rel="noopener noreferrer">
                          <Badge className="text-xs bg-black hover:bg-gray-800 text-white cursor-pointer flex items-center gap-1">
                            Hagnéré Patrimoine
                            <ExternalLink className="h-3 w-3" />
                          </Badge>
                        </a>
                        <a href="https://hagnere-investissement.fr" target="_blank" rel="noopener noreferrer">
                          <Badge className="text-xs bg-black hover:bg-gray-800 text-white cursor-pointer flex items-center gap-1">
                            Hagnéré Investissement
                            <ExternalLink className="h-3 w-3" />
                          </Badge>
                        </a>
                        <a href="https://lmnp.ai" target="_blank" rel="noopener noreferrer">
                          <Badge className="text-xs bg-black hover:bg-gray-800 text-white cursor-pointer flex items-center gap-1">
                            lmnp.ai
                            <ExternalLink className="h-3 w-3" />
                          </Badge>
                        </a>
                        <Badge className="text-xs bg-gray-600 text-white cursor-not-allowed opacity-75">
                          sci-ai.app (en cours)
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[200px]">
                      <Button
                        variant="default"
                        size="default"
                        className="w-full bg-primary hover:bg-primary/90 shadow-sm"
                        asChild
                      >
                        <Link href="/contact" itemProp="url">
                          <Mail className="mr-2 h-4 w-4" />
                          Prendre contact
                        </Link>
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="default"
                          className="flex-1"
                          asChild
                        >
                          <a href="https://youtube.com/@quentinhagnere" target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                            <Youtube className="mr-2 h-4 w-4" />
                            YouTube
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="default"
                          className="flex-1"
                          asChild
                        >
                          <a href="https://linkedin.com/in/quentinhagnere" target="_blank" rel="noopener noreferrer" itemProp="sameAs">
                            <Linkedin className="mr-2 h-4 w-4" />
                            LinkedIn
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
