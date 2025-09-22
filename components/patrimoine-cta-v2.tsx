'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface PatrimoineCTAProps {
  position?: 'first' | 'second' | 'end'
}

export default function PatrimoineCTA({ position = 'end' }: PatrimoineCTAProps) {
  // Version identique à Hagnéré Investissement
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-primary text-white">
      {/* Dégradé de fond subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
      
      {/* Effet de halo lumineux */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      
      {/* Contenu principal */}
      <div className="relative z-10 p-6">
        {/* Titre */}
        <p className="text-xl font-bold text-white mb-2">
          Hagnéré Patrimoine
        </p>
        
        <p className="text-sm text-white/90 mb-4 leading-relaxed">
          Optimisez votre patrimoine et réduisez vos impôts.
        </p>
        
        {/* 3 Cards de métriques */}
        <div className="space-y-2 mb-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/25">
            <p className="text-lg font-bold text-white">30%</p>
            <p className="text-xs text-white/90">Économie d'impôts moyenne</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/25">
            <p className="text-lg font-bold text-white">0€</p>
            <p className="text-xs text-white/90">Frais cachés</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2.5 text-center border border-white/25">
            <p className="text-lg font-bold text-white">100%</p>
            <p className="text-xs text-white/90">Sur-mesure</p>
          </div>
        </div>
        
        {/* Boutons d'action */}
        <div className="space-y-2">
          <Button
            asChild
            size="sm"
            className="w-full bg-white text-primary hover:bg-gray-100 font-semibold"
          >
            <Link href="/prendre-rdv">
              Prendre rendez-vous
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
          >
            <Link href="/">
              Découvrir le site
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Export nommé pour compatibilité
export { PatrimoineCTA }
