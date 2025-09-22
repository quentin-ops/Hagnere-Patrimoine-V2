'use client'

import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PatrimoineCTAProps {
  position?: 'first' | 'second' | 'end'
}

export default function PatrimoineCTA({ position = 'end' }: PatrimoineCTAProps) {
  // Version principale - style Hagnéré Investissement
  return (
    <section className="my-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/95 to-primary shadow-2xl">
        {/* Effets de fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
          {/* Titre principal */}
          <div className="text-center mb-6">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Hagnéré Patrimoine
            </h3>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-medium">
              Optimisez votre patrimoine et réduisez vos impôts.
            </p>
          </div>
          
          {/* 3 Métriques clés */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-4xl mx-auto">
            {/* Métrique 1 */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/25 hover:bg-white/20 transition-all">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">30%</p>
                <p className="text-base sm:text-lg text-white/90 font-medium">
                  Économie d'impôts<br className="hidden sm:block" /> moyenne
                </p>
              </div>
            </div>
            
            {/* Métrique 2 */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/25 hover:bg-white/20 transition-all">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">0€</p>
                <p className="text-base sm:text-lg text-white/90 font-medium">
                  Frais<br className="hidden sm:block" /> cachés
                </p>
              </div>
            </div>
            
            {/* Métrique 3 */}
            <div className="text-center">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/25 hover:bg-white/20 transition-all">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-2">100%</p>
                <p className="text-base sm:text-lg text-white/90 font-medium">
                  Sur<br className="hidden sm:block" />-mesure
                </p>
              </div>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8 py-7 h-auto rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Link href="/prendre-rdv">
                <Calendar className="h-5 w-5 mr-2" />
                Prendre rendez-vous
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 hover:bg-white/30 font-bold text-lg px-8 py-7 h-auto rounded-full hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Link href="/">
                <ArrowRight className="h-5 w-5 mr-2" />
                Découvrir le site
              </Link>
            </Button>
          </div>
          
          {/* Points de réassurance */}
          <div className="mt-10 text-center">
            <p className="text-base text-white/80 font-medium">
              ✓ Consultation gratuite &nbsp;&nbsp; ✓ Sans engagement &nbsp;&nbsp; ✓ Experts certifiés
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export nommé pour compatibilité
export { PatrimoineCTA }
