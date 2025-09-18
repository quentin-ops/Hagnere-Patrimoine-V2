"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Clock, BookOpen, TrendingUp, Users, CalendarIcon, ChevronLeft, ChevronRight, Star, User, Calendar, Play, Youtube, Phone, MessageSquare, ArrowRight, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GridSquares } from "@/components/grid-squares";


interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  category: string
  author: {
    name: string
    avatar?: string
  }
  image?: string | null
  readTime?: string | null
  publishedAt: string
  publishedAtDate: string
  featured?: boolean
}

interface BlogListingClientProps {
  initialPosts: BlogPost[]
  initialCategories: Category[]
  initialVideos?: any[]
}

export default function BlogListingClient({
  initialPosts,
  initialCategories,
  initialVideos = [],
}: BlogListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [categorySliderIndex, setCategorySliderIndex] = useState(0)
  const [articleSliderIndex, setArticleSliderIndex] = useState(0)
  const [videos, setVideos] = useState<any[]>(initialVideos)
  const [videoSliderIndex, setVideoSliderIndex] = useState(0)

  useEffect(() => {
    setCategories(initialCategories)
  }, [initialCategories])

  useEffect(() => {
    setPosts(initialPosts)
    setFilteredPosts(initialPosts)
  }, [initialPosts])

  useEffect(() => {
    setVideos(initialVideos)
  }, [initialVideos])

  // Filtrer les articles
  useEffect(() => {
    let filtered = posts;

    // Filtre par catégorie
    if (selectedCategory && selectedCategory !== "") {
      // Trouver le nom de la catégorie à partir du slug
      const category = categories.find(cat => cat.slug === selectedCategory);
      if (category) {
        filtered = filtered.filter(post => 
          post.category.toLowerCase() === category.name.toLowerCase()
        );
      }
    }

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Les articles sont déjà triés par date, donc filtered conserve l'ordre
    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts, categories]);

  // Les compteurs sont maintenant gérés par l'API

  // Article mis en avant - seulement s'il y a plus d'un article ou si un article est explicitement featured
  const featuredPost = filteredPosts.length > 1 
    ? (filteredPosts.find(post => post.featured) || filteredPosts[0])
    : (filteredPosts.find(post => post.featured) || null);
  const regularPosts = featuredPost 
    ? filteredPosts.filter(post => post.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec grille animée */}
      <div className="relative bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
        <GridSquares />
        <div className="relative container max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Made By Hagnéré Investissement
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Le Blog - Hagnéré Investissement
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Nous partageons conseils et ressources d&apos;experts du secteur. Pour de vrai.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Badge variant="secondary" className="bg-muted text-foreground border-muted/70 text-xs px-2 py-1 sm:text-sm sm:px-2.5 sm:py-1">
                <BookOpen className="h-3.5 w-3.5 mr-1 sm:h-4 sm:w-4 sm:mr-1" />
                Articles experts
              </Badge>
              <Badge variant="secondary" className="bg-muted text-foreground border-muted/70 text-xs px-2 py-1 sm:text-sm sm:px-2.5 sm:py-1">
                <TrendingUp className="h-3.5 w-3.5 mr-1 sm:h-4 sm:w-4 sm:mr-1" />
                Analyses marché
              </Badge>
              <Badge variant="secondary" className="bg-muted text-foreground border-muted/70 text-xs px-2 py-1 sm:text-sm sm:px-2.5 sm:py-1">
                <Users className="h-3.5 w-3.5 mr-1 sm:h-4 sm:w-4 sm:mr-1" />
                Retours d&apos;expérience
              </Badge>
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild size="lg" className="h-10 text-sm sm:h-11 sm:text-base">
                <a href="/calendly" rel="noopener noreferrer">
                  <CalendarIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Discuter de votre projet
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar avec recherche et filtres */}
          <aside className="lg:w-64 lg:sticky lg:top-24 lg:h-fit space-y-6">
            {/* Barre de recherche */}
            <div>
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Recherche
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm"
                />
              </div>
            </div>

            {/* Séparateur */}
            <div className="border-t pt-4">
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Filtre
              </Label>
            </div>

            {/* Filtre par catégorie */}
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
                  <span className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtrer par catégorie
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm mb-3">Parcourir par catégories</h3>
                  {/* Bouton pour afficher tous les articles */}
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === ""
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>Tous les articles</span>
                      <Badge variant="secondary" className="ml-2">
                        {posts.length}
                      </Badge>
                    </div>
                  </button>
                  {/* Liste des catégories */}
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.slug
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        {category.count > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {category.count}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </aside>

          {/* Contenu principal */}
          <div className="flex-1">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun article trouvé.</p>
              </div>
            ) : (
              <>
                {/* Article mis en avant */}
                {featuredPost && (
                  <div className="mb-12">
                    <Link href={`/ressources/blog/${featuredPost.slug}`} className="group block">
                      <article className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-primary/20">
                        {/* Badge flottant */}
                        <div className="absolute top-6 left-6 z-10">
                          <Badge variant="default" className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold shadow-lg flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-current" />
                            Article mis en avant
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2">
                          {/* Image avec overlay gradient et overflow hidden */}
                          <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                            <Image
                              src={featuredPost.image || "/images/blog-default.jpg"}
                              alt={featuredPost.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Gradient overlay pour améliorer la lisibilité */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                          </div>
                          
                          {/* Contenu avec espacement amélioré */}
                          <div className="p-8 lg:p-10 flex flex-col justify-center relative">
                            {/* Catégorie */}
                            <Badge variant="secondary" className="mb-4 w-fit">
                              {featuredPost.category}
                            </Badge>
                            
                            {/* Titre plus prominent */}
                            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                              {featuredPost.title}
                            </h2>
                            
                            {/* Description avec meilleur contraste */}
                            <p className="text-muted-foreground text-lg mb-8 line-clamp-3 leading-relaxed">
                              {featuredPost.description}
                            </p>
                            
                            {/* Footer amélioré avec séparateur */}
                            <div className="pt-6 border-t border-primary/10">
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                                    <AvatarImage src={featuredPost.author.avatar} />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                      {featuredPost.author.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-semibold text-sm">{featuredPost.author.name}</p>
                                    <p className="text-xs text-muted-foreground">{featuredPost.publishedAt}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{featuredPost.readTime} de lecture</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* CTA subtil */}
                            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-primary font-medium text-sm flex items-center gap-1">
                                Lire l'article
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                )}

                {/* Section des catégories avec slider */}
                {categories.length > 0 && (
                  <div className="relative mb-12">
                    {/* Titre de la section */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Explorer par catégorie</h2>
                      {/* Boutons de navigation - affichés seulement s'il y a plus de 3 catégories */}
                      {categories.length > 3 && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCategorySliderIndex(Math.max(0, categorySliderIndex - 1))}
                            disabled={categorySliderIndex === 0}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const totalCategories = categories.length;
                              const maxIndex = Math.max(0, totalCategories - 3);
                              setCategorySliderIndex(Math.min(maxIndex, categorySliderIndex + 1));
                            }}
                            disabled={categorySliderIndex >= Math.max(0, categories.length - 3)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Conteneur du slider (3 cards visibles par viewport) */}
                    <div className="overflow-hidden -mx-2">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${categorySliderIndex * 33.333}%)` }}
                      >
                        {categories
                          .map((category, index) => {
                        // Définir les descriptions pour les catégories
                        const descriptions: { [key: string]: string } = {
                          "fiscalite": "Optimisez votre fiscalité avec nos stratégies éprouvées",
                          "financement": "Solutions de financement pour vos projets immobiliers",
                          "marche-immobilier": "Analyses et tendances du marché immobilier",
                          "gestion-locative": "Conseils pour une gestion locative efficace",
                          "travaux-renovation": "Guides pour vos travaux et rénovations",
                          "juridique": "Informations juridiques essentielles",
                          "patrimoine": "Stratégies pour développer votre patrimoine",
                          "geographie": "Analyses géographiques et marchés locaux",
                          "ameublement-decoration": "Conseils pour l'aménagement et la décoration",
                          "mise-en-location-gestion-locative": "Optimisez vos revenus locatifs",
                          "strategie-gestion-de-patrimoine": "Stratégies avancées de gestion patrimoniale",
                        };
                        
                        // Définir les images personnalisées pour certaines catégories
                        // Ajout d'un timestamp pour forcer le rechargement du cache
                        const v = Date.now();
                        const categoryImages: { [key: string]: string } = {
                          "financement": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/financement-3d.png?v=${v}`,
                          "gestion-locative": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/gestion-locative-3d.png?v=${v}`,
                          "mise-en-location-gestion-locative": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/gestion-locative-3d.png?v=${v}`,
                          "juridique": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/juridique-3d.png?v=${v}`,
                          "marche-immobilier": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/marche-immobilier-3d.png?v=${v}`,
                          "patrimoine": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/patrimoine-3d.png?v=${v}`,
                          "strategie-gestion-de-patrimoine": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/patrimoine_chart_3d.png?v=${v}`,
                          "fiscalite": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/fiscalite-3d.png?v=${v}`,
                          "travaux-renovation": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/travaux-renovation-3d.png?v=${v}`,
                          "geographie": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/marche-immobilier-3d.png?v=${v}`,
                          "ameublement-decoration": `https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/categories/ameublement-decoration-3d.png?v=${v}`
                        };
                        
                        return (
                          <div
                  key={category.id}
                            className="w-1/3 flex-shrink-0 px-2"
                          >
                            <button 
                              onClick={() => setSelectedCategory(category.slug)}
                              className="group relative h-64 w-full rounded-xl overflow-hidden text-left transition-all duration-300 hover:shadow-xl"
                            >
                            {/* Fond noir avec gradient et halo pour toutes les catégories */}
                            <div className="absolute inset-0 bg-black" />
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20" />
                            {/* Effet de halo style CTA Hagnéré Investissement */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-orange-300/20 to-blue-900/30 blur-xl" />
                            
                            {/* Image - avec placeholder temporaire pour les catégories sans image personnalisée */}
                            <Image
                              src={categoryImages[category.slug] || "/hero-bg.jpg"}
                              alt={category.name}
                              fill
                              className="object-contain opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 text-gray-900 hover:bg-white font-semibold">
                  {category.name}
                </Badge>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <p className="text-white font-semibold text-lg">
                                {descriptions[category.slug] || `Découvrez nos articles sur ${category.name.toLowerCase()}`}
                              </p>
                            </div>
                            </button>
                          </div>
                        );
                      })}
                      </div>
                    </div>
            </div>
          )}

          {/* Section articles avec slider */}
                <div className="relative">
                  {/* Titre et boutons de navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Nos derniers articles</h2>
                    {regularPosts.length > 3 && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setArticleSliderIndex(Math.max(0, articleSliderIndex - 1))}
                          disabled={articleSliderIndex === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const maxIndex = Math.max(0, Math.ceil(regularPosts.length / 3) - 1);
                            setArticleSliderIndex(Math.min(maxIndex, articleSliderIndex + 1));
                          }}
                          disabled={articleSliderIndex >= Math.max(0, Math.ceil(regularPosts.length / 3) - 1)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Conteneur du slider */}
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${articleSliderIndex * 100}%)` }}
                    >
                      {/* Grouper les articles par 3 */}
                      {Array.from({ length: Math.ceil(regularPosts.length / 3) }, (_, groupIndex) => (
                        <div key={groupIndex} className="w-full flex-shrink-0">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {regularPosts.slice(groupIndex * 3, (groupIndex + 1) * 3).map((post) => (
                    <Link key={post.id} href={`/ressources/blog/${post.slug}`} className="group">
                      <article className="h-full flex flex-col bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-200">
                        {/* Image qui touche tous les bords */}
                        <div className="relative w-full aspect-[16/10]">
                          <Image
                            src={post.image || "/images/blog-default.jpg"}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                          />
                        </div>
                        
                        {/* Contenu */}
                        <div className="flex flex-col flex-1 p-6">
                          {/* Catégorie */}
                          <div className="mb-3">
                            <Badge variant="secondary">{post.category}</Badge>
                  </div>
                          
                          {/* Titre */}
                          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                  </h3>
                          
                          {/* Description */}
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                            {post.description}
                          </p>
                          
                          {/* Footer avec auteur, date et temps de lecture */}
                          <div className="flex flex-wrap items-center gap-2 pt-4 border-t">
                            <Badge variant="secondary" className="text-xs">
                              <User className="h-3 w-3 mr-1" />
                              {post.author.name}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {post.publishedAt}
                            </Badge>
                            <Badge variant="secondary" className="text-xs ml-auto">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {post.readTime}
                            </Badge>
                          </div>
                  </div>
                      </article>
                    </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section vidéos YouTube avec slider */}
                {videos.length > 0 && (
                  <div className="relative mt-12">
                    {/* Titre et boutons de navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">Nos dernières vidéos</h2>
                        <Badge variant="destructive" className="gap-1">
                          <Youtube className="h-3 w-3" />
                          YouTube
                        </Badge>
                      </div>
                      {videos.length > 3 && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setVideoSliderIndex(Math.max(0, videoSliderIndex - 1))}
                            disabled={videoSliderIndex === 0}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const maxIndex = Math.max(0, Math.ceil(videos.length / 3) - 1);
                              setVideoSliderIndex(Math.min(maxIndex, videoSliderIndex + 1));
                            }}
                            disabled={videoSliderIndex >= Math.max(0, Math.ceil(videos.length / 3) - 1)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Conteneur du slider */}
                    <div className="overflow-hidden">
                      <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${videoSliderIndex * 100}%)` }}
                      >
                        {/* Grouper les vidéos par 3 */}
                        {Array.from({ length: Math.ceil(videos.length / 3) }, (_, groupIndex) => (
                          <div key={groupIndex} className="w-full flex-shrink-0">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {videos.slice(groupIndex * 3, (groupIndex + 1) * 3).map((video) => (
                                <a 
                                  key={video.id} 
                                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group"
                                >
                                  <article className="h-full flex flex-col bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-200">
                                    {/* Thumbnail avec overlay play */}
                                    <div className="relative w-full aspect-video">
                                      <Image
                                        src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                        alt={video.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover"
                                      />
                                      {/* Overlay avec bouton play */}
                                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <div className="bg-red-600 rounded-full p-4">
                                          <Play className="h-6 w-6 text-white fill-white" />
                                        </div>
                                      </div>
                                      {/* Badge durée si disponible */}
                                      {video.duration && (
                                        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
                                          {(() => {
                                            // Formater la durée ISO 8601 en format lisible
                                            const match = video.duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
                                            if (match) {
                                              const hours = parseInt(match[1] || '0');
                                              const minutes = parseInt(match[2] || '0');
                                              const seconds = parseInt(match[3] || '0');
                                              
                                              if (hours > 0) {
                                                return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                                              } else {
                                                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
                                              }
                                            }
                                            return video.duration;
                                          })()}
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    {/* Contenu */}
                                    <div className="flex flex-col flex-1 p-4">
                                      {/* Titre */}
                                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                        {video.title}
                                      </h3>
                                      
                                      {/* Description si disponible */}
                                      {video.description && (
                                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-grow">
                                          {video.description}
                                        </p>
                                      )}
                                      
                                      {/* Footer avec infos */}
                                      <div className="flex items-center gap-2 pt-3 border-t">
                                        <Badge variant="secondary" className="text-xs">
                                          <Eye className="h-3 w-3 mr-1" />
                                          {video.viewCount ? 
                                            `${new Intl.NumberFormat('fr-FR', { notation: 'compact', maximumFractionDigits: 1 }).format(video.viewCount)} vues` 
                                            : "0 vues"
                                          }
                                        </Badge>
                                        {video.publishedAt && (
                                          <Badge variant="secondary" className="text-xs ml-auto">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {new Date(video.publishedAt).toLocaleDateString("fr-FR", {
                                              day: "numeric",
                                              month: "short",
                                              year: "numeric"
                                            })}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </article>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Section CTA avec deux cards */}
                <div className="mt-16 mb-8">
                  <h2 className="text-2xl font-bold mb-8 text-center">Besoin d'aide pour votre projet immobilier ?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* CTA Prendre rendez-vous - Style noir avec halo bleu */}
                    <div className="relative overflow-hidden rounded-lg hover:shadow-2xl transition-all duration-300 group">
                      {/* Fond noir avec effet de halo bleu */}
                      <div className="absolute inset-0 bg-black" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-blue-600/30 blur-xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80" />
                      
                      <div className="relative p-8 text-white">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="bg-blue-500/20 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30">
                            <Phone className="h-6 w-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Parlez à un conseiller</h3>
                            <p className="text-gray-300">
                              Obtenez des conseils personnalisés de nos experts en investissement immobilier. 
                              Réservez un créneau qui vous convient pour discuter de votre projet.
                            </p>
                          </div>
                        </div>
                        <Button asChild size="lg" className="w-full group bg-white text-black hover:bg-gray-100">
                          <a href="/calendly" rel="noopener noreferrer">
                            <CalendarIcon className="mr-2 h-5 w-5" />
                            Prendre rendez-vous
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* CTA Chat AI - Style coloré animé */}
                    <div className="relative overflow-hidden rounded-lg group bg-card border">
                      {/* Blobs animés comme dans partenaire-cta: rose / bleu / violet / pêche */}
                      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <span className="absolute left-[-15%] top-[-25%] h-[320px] w-[320px] rounded-full bg-pink-300/45 dark:bg-pink-600/35 blur-[90px] animate-[blobFloat1_9s_ease-in-out_infinite_alternate]" />
                        <span className="absolute right-[-15%] top-[-20%] h-[360px] w-[360px] rounded-full bg-sky-300/45 dark:bg-sky-600/40 blur-[90px] animate-[blobFloat2_10s_ease-in-out_infinite_alternate]" />
                        <span className="absolute left-[10%] bottom-[-25%] h-[400px] w-[400px] rounded-full bg-violet-300/40 dark:bg-violet-600/35 blur-[100px] animate-[blobFloat3_11s_ease-in-out_infinite_alternate]" />
                        <span className="absolute right-[10%] bottom-[-30%] h-[380px] w-[380px] rounded-full bg-orange-200/50 dark:bg-orange-500/45 blur-[110px] animate-[blobFloat4_12s_ease-in-out_infinite_alternate]" />
                      </div>
                      
                      <div className="relative z-10 p-8">
                        <Badge className="bg-white/90 text-black border-0 font-semibold mb-4">
                          Bientôt disponible
                        </Badge>
                        
                        <div className="flex items-start gap-4 mb-6">
                          <div className="bg-muted/50 backdrop-blur-sm p-3 rounded-lg">
                            <Sparkles className="h-6 w-6 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2 text-foreground">Assistant AI disponible 24/7</h3>
                            <p className="text-muted-foreground">
                              Obtenez des réponses instantanées à vos questions sur l'investissement immobilier 
                              grâce à notre assistant IA intelligent.
                            </p>
                          </div>
                        </div>
                        <Button size="lg" className="w-full" disabled>
                          <MessageSquare className="mr-2 h-5 w-5" />
                          Démarrer une conversation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
