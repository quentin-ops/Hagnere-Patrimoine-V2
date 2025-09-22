import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-6xl font-bold text-primary mb-2">404</div>
          <h1 className="text-2xl font-bold mb-4">Article introuvable</h1>
          <p className="text-muted-foreground mb-8">
            Désolé, l'article que vous recherchez n'existe pas ou a été déplacé.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/ressources/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Search className="h-5 w-5" />
            Parcourir tous les articles
          </Link>
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Articles populaires
          </p>
          <div className="space-y-2">
            <Link
              href="/ressources/blog/deficit-foncier"
              className="block text-sm hover:text-primary transition-colors"
            >
              Guide du déficit foncier
            </Link>
            <Link
              href="/ressources/blog/lmnp"
              className="block text-sm hover:text-primary transition-colors"
            >
              Investir en LMNP
            </Link>
            <Link
              href="/ressources/blog/sci"
              className="block text-sm hover:text-primary transition-colors"
            >
              Créer une SCI
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}