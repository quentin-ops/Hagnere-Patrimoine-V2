import Link from 'next/link'

export default function NotFound() {
  // Les fichiers not-found.tsx ne reçoivent pas de params
  // La logique de redirection doit être gérée dans page.tsx
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Article non trouvé
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          L&apos;article que vous recherchez n&apos;existe pas ou a été déplacé.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/ressources/blog"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retour au blog
          </Link>
          <Link 
            href="/"
            className="px-6 py-3 bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  )
}