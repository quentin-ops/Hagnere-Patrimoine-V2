'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Percent, TrendingDown, LineChart, Compass, Clock, Gift,
  Calculator, Building2, Shield, Users, Shuffle, Target
} from 'lucide-react'

const painPoints = [
  {
    title: 'Impôts trop lourds',
    description: 'Réduisez légalement votre fiscalité grâce aux optimisations disponibles.',
    icon: Percent,
  },
  {
    title: 'Placements peu performants',
    description: 'Boostez vos rendements avec des solutions adaptées à votre profil.',
    icon: TrendingDown,
  },
  {
    title: 'Investissements décevants',
    description: 'Stratégie claire et diversifiée pour de vrais résultats.',
    icon: LineChart,
  },
  {
    title: 'Stratégie absente',
    description: 'Feuille de route claire pour éviter les décisions coûteuses.',
    icon: Compass,
  },
  {
    title: 'Retraite non préparée',
    description: 'Maintenez votre niveau de vie en anticipant dès maintenant.',
    icon: Clock,
  },
  {
    title: 'Transmission complexe',
    description: 'Protégez vos proches et évitez conflits et frais inutiles.',
    icon: Gift,
  },
  {
    title: 'Comptabilité mal gérée',
    description: 'Structurez et simplifiez vos obligations fiscales.',
    icon: Calculator,
  },
  {
    title: 'Immobilier mal structuré',
    description: 'Le bon montage pour optimiser vos acquisitions.',
    icon: Building2,
  },
  {
    title: 'Famille non protégée',
    description: "Sécurisez l'avenir de vos proches face aux imprévus.",
    icon: Shield,
  },
  {
    title: 'Changements de vie',
    description: 'Adaptez votre stratégie à chaque étape importante.',
    icon: Users,
  },
  {
    title: 'Patrimoine dispersé',
    description: 'Vision claire et pilotage global de tous vos actifs.',
    icon: Shuffle,
  },
  {
    title: 'Opportunités manquées',
    description: 'Accédez aux meilleures solutions du marché.',
    icon: Target,
  },
]

export function ProblemsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPos = 0

    const animate = () => {
      if (!scrollContainer) return

      scrollPos += 1

      // Reset scroll when reaching the middle of duplicated content
      if (scrollPos >= scrollContainer.scrollWidth / 2) {
        scrollPos = 0
      }

      scrollContainer.scrollLeft = scrollPos
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer?.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-black/5 border-black/20 text-black backdrop-blur-sm dark:bg-white/10 dark:border-white/20 dark:text-white">
              Solutions sur-mesure
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nous avons une solution à tous vos problèmes
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Des services sur-mesure pour chaque situation patrimoniale,
              avec une expertise reconnue et des résultats concrets.
            </p>
          </div>

          {/* Slider */}
          <div className="relative">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-hidden scroll-smooth"
              style={{ scrollBehavior: 'auto' }}
            >
              {/* Duplicate items for infinite scroll */}
              {[...painPoints, ...painPoints].map((point, index) => {
                const Icon = point.icon
                return (
                  <div
                    key={`${point.title}-${index}`}
                    className="flex items-center gap-4 min-w-fit rounded-lg bg-white border border-gray-200 p-4 hover:shadow-lg transition-all dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 dark:hover:bg-white/10"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-gray-700 dark:text-white/90" />
                    </div>

                    {/* Text content */}
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                        {point.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 max-w-[300px]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}