'use client'

import { ArticleCTAModern } from '@/components/article-cta-modern'

interface PatrimoineCTAProps {
  position?: 'first' | 'second' | 'end'
  backgroundImage?: string
}

export default function PatrimoineCTA({ 
  position = 'end',
  backgroundImage
}: PatrimoineCTAProps) {
  // Utilisation du nouveau composant ArticleCTAModern
  return <ArticleCTAModern />
}

// Export nommé pour compatibilité
export { PatrimoineCTA }
