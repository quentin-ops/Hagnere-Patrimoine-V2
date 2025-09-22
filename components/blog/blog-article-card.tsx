import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface BlogArticleCardProps {
  article: {
    slug: string
    title: string
    excerpt?: string | null
    coverImageUrl?: string | null
    coverImageAlt?: string | null
    publishedAt?: Date | null
    readingMinutes?: number | null
  }
  compact?: boolean
}

export default function BlogArticleCard({ 
  article, 
  compact = false 
}: BlogArticleCardProps) {
  if (compact) {
    return (
      <Link href={`/ressources/blog/${article.slug}`}>
        <article className="group cursor-pointer">
          <div className="flex gap-4">
            {article.coverImageUrl && (
              <div className="shrink-0">
                <img
                  src={article.coverImageUrl}
                  alt={article.coverImageAlt || article.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                {article.publishedAt && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(article.publishedAt, 'd MMM', { locale: fr })}
                  </span>
                )}
                {article.readingMinutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readingMinutes} min
                  </span>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/ressources/blog/${article.slug}`}>
      <article className="group cursor-pointer bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-all">
        {article.coverImageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={article.coverImageUrl}
              alt={article.coverImageAlt || article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Hagnéré Patrimoine
            </span>
            {article.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(article.publishedAt, 'd MMMM yyyy', { locale: fr })}
              </span>
            )}
            {article.readingMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readingMinutes} min
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
