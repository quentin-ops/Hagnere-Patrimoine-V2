'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PatrimoineCTAProps {
  position?: 'first' | 'second' | 'end'
}

export default function PatrimoineCTA({ position = 'end' }: PatrimoineCTAProps) {
  // Version épurée et moderne avec polices réduites
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-primary/95 text-white">
      {/* Effet de gradient très subtil */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5" />
      
      {/* Contenu principal - padding compact */}
      <div className="relative z-10 p-5">
        {/* En-tête */}
        <div className="mb-4">
          <h3 className="text-base font-semibold text-white mb-1">
            Hagnéré Patrimoine
          </h3>
          <p className="text-xs text-white/85 leading-relaxed">
            Optimisez votre patrimoine et réduisez vos impôts.
          </p>
        </div>
        
        {/* 3 métriques - disposition horizontale compacte */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-2 text-center">
            <p className="text-sm font-bold text-white">30%</p>
            <p className="text-[10px] text-white/75 leading-tight">Économie<br/>d'impôts</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-2 text-center">
            <p className="text-sm font-bold text-white">0€</p>
            <p className="text-[10px] text-white/75 leading-tight">Frais<br/>cachés</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2 py-2 text-center">
            <p className="text-sm font-bold text-white">100%</p>
            <p className="text-[10px] text-white/75 leading-tight">Sur<br/>mesure</p>
          </div>
        </div>
        
        {/* Boutons d'action - tailles réduites */}
        <div className="space-y-2 mb-3">
          <Button
            asChild
            size="sm"
            className="w-full h-8 bg-white text-primary hover:bg-gray-50 text-xs font-medium rounded-lg"
          >
            <Link href="/prendre-rdv">
              Prendre rendez-vous
              <ArrowRight className="ml-1.5 h-3 w-3" />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="w-full h-7 bg-white/10 text-white hover:bg-white/15 text-xs font-normal rounded-lg border border-white/20"
          >
            <Link href="/">
              Découvrir le site
            </Link>
          </Button>
        </div>
        
        {/* Points de réassurance - très discrets */}
        <div className="flex items-center justify-center gap-3 text-[10px] text-white/60">
          <span className="flex items-center gap-0.5">
            <Check className="h-2.5 w-2.5" />
            Consultation gratuite
          </span>
          <span className="flex items-center gap-0.5">
            <Check className="h-2.5 w-2.5" />
            Sans engagement
          </span>
          <span className="flex items-center gap-0.5">
            <Check className="h-2.5 w-2.5" />
            Experts certifiés
          </span>
        </div>
      </div>
    </div>
  )
}

// Export nommé pour compatibilité
export { PatrimoineCTA }
