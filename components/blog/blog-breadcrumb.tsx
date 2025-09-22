import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BlogBreadcrumbProps {
  category?: {
    name: string
    slug: string
  } | null
  title: string
}

export default function BlogBreadcrumb({ 
  category, 
  title 
}: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link 
            href="/" 
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Accueil</span>
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li>
          <Link 
            href="/ressources" 
            className="hover:text-primary transition-colors"
          >
            Ressources
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li>
          <Link 
            href="/ressources/blog" 
            className="hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </li>
        {category && (
          <>
            <ChevronRight className="h-4 w-4" />
            <li>
              <Link 
                href={`/ressources/blog?category=${category.slug}`}
                className="hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            </li>
          </>
        )}
        <ChevronRight className="h-4 w-4" />
        <li>
          <span className="text-foreground font-medium line-clamp-1">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  )
}
