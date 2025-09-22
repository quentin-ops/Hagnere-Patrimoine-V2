import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export const metadata = {
  title: 'Articles - Hagnéré Patrimoine',
  description: 'Découvrez nos articles et guides sur la gestion de patrimoine, la défiscalisation et l\'investissement',
}

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED'
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })

  // Pour le développement, on affiche aussi les brouillons
  const draftArticles = await prisma.article.findMany({
    where: {
      status: 'DRAFT'
    },
    include: {
      category: true,
      tags: true,
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const allArticles = [...articles, ...draftArticles]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Nos Articles et Guides
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explorez nos ressources pour optimiser votre patrimoine et découvrir les meilleures stratégies d'investissement
          </p>
        </div>

        {/* Articles Grid */}
        {allArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article) => (
              <Card key={article.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                {/* Image de couverture */}
                {article.coverImageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.coverImageUrl}
                      alt={article.coverImageAlt || article.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    {article.status === 'DRAFT' && (
                      <Badge className="absolute top-2 right-2 bg-yellow-100 text-yellow-800">
                        Brouillon
                      </Badge>
                    )}
                  </div>
                )}
                
                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {article.category && (
                      <Badge variant="secondary" className="text-xs">
                        {article.category.name}
                      </Badge>
                    )}
                    {article.featured && (
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        À la une
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="line-clamp-2">
                    {article.title}
                  </CardTitle>
                  
                  {article.excerpt && (
                    <CardDescription className="line-clamp-3 mt-2">
                      {article.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map(tag => (
                        <Badge key={tag.id} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {/* Métadonnées */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    {article.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {format(new Date(article.publishedAt), 'dd MMM', { locale: fr })}
                        </span>
                      </div>
                    )}
                    {article.readingMinutes && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readingMinutes} min</span>
                      </div>
                    )}
                  </div>
                  
                  {/* CTA */}
                  <Link href={`/articles/${article.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Lire l'article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Aucun article publié pour le moment
              </p>
              <Link href="/backoffice/articles">
                <Button>
                  Accéder au backoffice
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
