'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { 
  FileText, 
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Calendar,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Link from 'next/link'

interface Article {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  status: string
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  featured: boolean
  category?: {
    id: string
    name: string
    slug: string
  } | null
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
  syncLogs?: Array<{
    id: string
    status: string
    source: string
    createdAt: Date
  }>
}

interface ArticlesClientProps {
  initialArticles: Article[]
}

export function ArticlesClient({ initialArticles }: ArticlesClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  const filteredArticles = articles.filter(article => {
    // Filtre par statut
    if (statusFilter !== "ALL" && article.status !== statusFilter) {
      return false
    }
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        article.title.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.category?.name.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.name.toLowerCase().includes(query))
      )
    }
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return <Badge className="bg-green-100 text-green-800">Publié</Badge>
      case 'DRAFT':
        return <Badge className="bg-yellow-100 text-yellow-800">Brouillon</Badge>
      case 'ARCHIVED':
        return <Badge className="bg-gray-100 text-gray-800">Archivé</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getSyncStatusBadge = (syncLogs: any[]) => {
    if (!syncLogs || syncLogs.length === 0) {
      return <Badge variant="outline" className="text-xs">Non synchronisé</Badge>
    }
    const lastSync = syncLogs[0]
    if (lastSync.status === 'success') {
      return (
        <Badge variant="outline" className="text-xs text-green-600 border-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Synchronisé ({lastSync.source})
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="text-xs text-red-600 border-red-600">
        <AlertCircle className="h-3 w-3 mr-1" />
        Erreur sync
      </Badge>
    )
  }

  const refreshArticles = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
        toast.success('Articles rafraîchis')
      }
    } catch (error) {
      toast.error('Erreur lors du rafraîchissement')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Articles</h1>
          <p className="text-muted-foreground">
            Gérez vos articles et leur synchronisation
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refreshArticles}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Rafraîchir
          </Button>
          <Button asChild>
            <Link href="/backoffice/articles/new">
              <Plus className="h-4 w-4 mr-2" />
              Nouvel article
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Tous les statuts
                  </div>
                </SelectItem>
                <SelectItem value="PUBLISHED">Publiés</SelectItem>
                <SelectItem value="DRAFT">Brouillons</SelectItem>
                <SelectItem value="ARCHIVED">Archivés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{articles.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Publiés</p>
                <p className="text-2xl font-bold">
                  {articles.filter(a => a.status === 'PUBLISHED').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Brouillons</p>
                <p className="text-2xl font-bold">
                  {articles.filter(a => a.status === 'DRAFT').length}
                </p>
              </div>
              <Edit className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Synchronisés</p>
                <p className="text-2xl font-bold">
                  {articles.filter(a => a.syncLogs && a.syncLogs.length > 0).length}
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des articles */}
      <Card>
        <CardHeader>
          <CardTitle>Articles ({filteredArticles.length})</CardTitle>
          <CardDescription>
            Liste de tous vos articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                    {article.featured && (
                      <Badge className="bg-blue-100 text-blue-800">
                        À la une
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.publishedAt 
                        ? format(new Date(article.publishedAt), 'dd MMM yyyy', { locale: fr })
                        : 'Non publié'
                      }
                    </div>
                    {article.category && (
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {article.category.name}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Modifié {format(new Date(article.updatedAt), 'dd MMM', { locale: fr })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(article.status)}
                    {getSyncStatusBadge(article.syncLogs || [])}
                    {article.tags.map(tag => (
                      <Badge key={tag.id} variant="outline" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    title="Voir l'article"
                  >
                    <Link href={`/articles/${article.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    title="Éditer"
                  >
                    <Link href={`/backoffice/articles/${article.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    title="Supprimer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'ALL'
                  ? "Aucun article ne correspond à vos critères"
                  : "Aucun article pour le moment"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de suppression */}
      <AlertDialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'article</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'article "{selectedArticle?.title}" ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!selectedArticle) return
                
                try {
                  const response = await fetch(`/api/articles/${selectedArticle.id}`, {
                    method: 'DELETE',
                  })
                  
                  if (response.ok) {
                    setArticles(articles.filter(a => a.id !== selectedArticle.id))
                    toast.success('Article supprimé')
                    setSelectedArticle(null)
                  } else {
                    toast.error('Erreur lors de la suppression')
                  }
                } catch (error) {
                  toast.error('Erreur lors de la suppression')
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
