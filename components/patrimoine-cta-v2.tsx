'use client'

import { ModernCTASection } from '@/components/modern-cta-section'

interface PatrimoineCTAProps {
  position?: 'first' | 'second' | 'end'
  backgroundImage?: string
}

export default function PatrimoineCTA({ 
  position = 'end',
  backgroundImage = "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758547885734-3d-building-illustration.png"
}: PatrimoineCTAProps) {
  // Utilisation du composant ModernCTASection identique à Hagnéré Investissement
  return (
    <ModernCTASection 
      backgroundImage={backgroundImage}
      className="w-full"
    />
  )
}

// Export nommé pour compatibilité
export { PatrimoineCTA }
