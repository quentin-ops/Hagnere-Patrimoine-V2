'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import BlogArticleCard from '@/components/blog/blog-article-card'
import PatrimoineCTA from '@/components/patrimoine-cta-v2'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface BlogListingProps {
  articles: any[]
  categories: any[]
  featuredArticle: any
  currentPage: number
  totalPages: number
  currentCategory?: string
  searchQuery?: string
}

export default function BlogListing({
  articles,
  categories,
  featuredArticle,
  currentPage,
  totalPages,
  currentCategory,
  searchQuery
}: BlogListingProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchQuery || '')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    params.set('page', '1')
    router.push(`/ressources/blog?${params.toString()}`)
  }

  const handleCategoryChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    params.set('page', '1')
    router.push(`/ressources/blog?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/ressources/blog?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog & Actualités
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Conseils d'experts, analyses et actualités pour optimiser 
              votre patrimoine et réduire vos impôts
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un article..."
                  className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      handleCategoryChange(currentCategory || null)
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      {featuredArticle && !searchQuery && !currentCategory && currentPage === 1 && (
        <div className="container mx-auto px-4 py-12">
          <div className="relative bg-card rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-semibold">
                À la une
              </span>
            </div>
            <div className="grid lg:grid-cols-2 gap-0">
              {featuredArticle.coverImageUrl && (
                <div className="aspect-video lg:aspect-auto">
                  <img
                    src={featuredArticle.coverImageUrl}
                    alt={featuredArticle.coverImageAlt || featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {featuredArticle.category && (
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit mb-4">
                    {featuredArticle.category.name}
                  </span>
                )}
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  <Link 
                    href={`/ressources/blog/${featuredArticle.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {featuredArticle.title}
                  </Link>
                </h2>
                {featuredArticle.excerpt && (
                  <p className="text-lg text-muted-foreground mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>Par Hagnéré Patrimoine</span>
                  {featuredArticle.publishedAt && (
                    <>
                      <span className="text-muted-foreground/50">•</span>
                      <span>
                        {format(featuredArticle.publishedAt, 'd MMMM yyyy', { locale: fr })}
                      </span>
                    </>
                  )}
                  {featuredArticle.readingMinutes && (
                    <>
                      <span className="text-muted-foreground/50">•</span>
                      <span>{featuredArticle.readingMinutes} min de lecture</span>
                    </>
                  )}
                </div>
                <Link
                  href={`/ressources/blog/${featuredArticle.slug}`}
                  className="inline-flex items-center text-primary font-semibold hover:gap-3 transition-all gap-2"
                >
                  Lire l'article
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Categories */}
          <aside className="lg:w-64 shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card rounded-lg border mb-4"
            >
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </button>

            <div className={cn(
              "space-y-6",
              showMobileFilters ? "block" : "hidden lg:block"
            )}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Catégories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg transition-colors",
                        !currentCategory 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      )}
                    >
                      Toutes les catégories
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryChange(cat.slug)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between",
                          currentCategory === cat.slug 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-muted"
                        )}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs opacity-70">
                          {cat._count.articles}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-primary/10 rounded-lg p-6">
                <h4 className="font-semibold mb-2">Newsletter</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Recevez nos conseils patrimoniaux
                </p>
                <Link
                  href="/newsletter"
                  className="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          </aside>

          {/* Articles Grid */}
          <div className="flex-1">
            {/* Results count */}
            {(searchQuery || currentCategory) && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  {articles.length} article{articles.length > 1 ? 's' : ''} trouvé{articles.length > 1 ? 's' : ''}
                  {searchQuery && ` pour "${searchQuery}"`}
                  {currentCategory && ` dans ${categories.find(c => c.slug === currentCategory)?.name}`}
                </p>
                {(searchQuery || currentCategory) && (
                  <button
                    onClick={() => {
                      setSearch('')
                      router.push('/ressources/blog')
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            )}

            {/* Articles Grid */}
            {articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {articles.map((article, index) => (
                    <div key={article.id}>
                      <BlogArticleCard article={article} />
                      {/* CTA after 6th article */}
                      {index === 5 && (
                        <div className="md:col-span-2 xl:col-span-3 my-8">
                          <PatrimoineCTA />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        currentPage === 1 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:bg-muted"
                      )}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={cn(
                              "px-4 py-2 rounded-lg transition-colors",
                              page === currentPage
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                            )}
                          >
                            {page}
                          </button>
                        )
                      }
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page}>...</span>
                      }
                      return null
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        currentPage === totalPages 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:bg-muted"
                      )}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Aucun article trouvé
                </p>
                <Link
                  href="/ressources/blog"
                  className="text-primary hover:underline"
                >
                  Voir tous les articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="container mx-auto px-4 pb-12">
        <PatrimoineCTA />
      </div>
    </div>
  )
}
