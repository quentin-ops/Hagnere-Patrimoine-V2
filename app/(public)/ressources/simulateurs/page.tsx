'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  Building2,
  TrendingUp,
  PiggyBank,
  ArrowRight,
  Check,
  Sparkles,
  BarChart3,
  Home,
  FileText,
  Shield,
  Clock,
  Users,
  Target,
  Briefcase
} from 'lucide-react'
import Link from 'next/link'
import Hero237 from '@/components/hero237'
import Feature67 from '@/components/feature67'
import { Feature20 } from '@/components/feature20'
import { CometCard } from '@/components/ui/comet-card'

const simulators = [
  {
    id: 'interets-composes',
    title: 'Calculatrice d\'intérêts composés',
    description: 'Projetez la croissance capitalisée de votre épargne dans le temps',
    icon: TrendingUp,
    category: 'Épargne',
    savings: 'Projection détaillée jusqu\'à 50 ans',
    features: [
      'Capitalisation multi-fréquences',
      'Projection en euros constants',
      'Tableau annuel exportable',
      'Objectif patrimonial personnalisé'
    ],
    popularityBadge: 'Nouveau',
    color: 'from-cyan-500 to-blue-600',
    href: '/ressources/simulateurs/calculatrice-interets-composes'
  },
  {
    id: 'deficit-foncier',
    title: 'Simulateur Déficit Foncier',
    description: 'Calculez votre économie d\'impôt grâce aux travaux de rénovation',
    icon: Home,
    category: 'Immobilier',
    savings: 'Jusqu\'à 10 700€ déductibles',
    features: [
      'Calcul instantané de l\'économie fiscale',
      'Prise en compte de vos revenus fonciers',
      'Simulation sur plusieurs années',
      'Export PDF du calcul détaillé'
    ],
    popularityBadge: 'Le plus utilisé',
    color: 'from-emerald-500 to-teal-600',
    href: '/simulateurs/deficit-foncier'
  },
  {
    id: 'lmnp',
    title: 'Comparateur LMNP Micro-BIC vs Réel',
    description: 'Déterminez le régime fiscal le plus avantageux pour votre location meublée',
    icon: Building2,
    category: 'Location meublée',
    savings: 'Optimisation jusqu\'à 15 000€/an',
    features: [
      'Comparaison détaillée des deux régimes',
      'Calcul de l\'amortissement du bien',
      'Projection sur 10 ans',
      'Recommandation personnalisée'
    ],
    popularityBadge: 'Recommandé',
    color: 'from-blue-500 to-indigo-600',
    href: '/simulateurs/lmnp-comparateur'
  },
  {
    id: 'sci-is',
    title: 'Simulateur SCI à l\'IS',
    description: 'Évaluez la pertinence d\'une SCI soumise à l\'impôt sur les sociétés',
    icon: Briefcase,
    category: 'Société',
    savings: 'Taux IS à 15% jusqu\'à 42 500€',
    features: [
      'Comparaison IS vs IR',
      'Calcul de la trésorerie disponible',
      'Impact de la flat tax',
      'Stratégie de sortie optimisée'
    ],
    popularityBadge: 'Expert',
    color: 'from-purple-500 to-pink-600',
    href: '/simulateurs/sci-is'
  },
  {
    id: 'per',
    title: 'Calculateur PER',
    description: 'Optimisez votre épargne retraite et réduisez vos impôts',
    icon: PiggyBank,
    category: 'Épargne',
    savings: 'Jusqu\'à 45% de réduction d\'impôt',
    features: [
      'Calcul du plafond déductible',
      'Simulation de la rente future',
      'Comparaison versement/sortie',
      'Stratégie de rachat optimal'
    ],
    popularityBadge: 'Nouveau',
    color: 'from-amber-500 to-orange-600',
    href: '/simulateurs/per'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Gain de temps',
    description: 'Résultats instantanés sans rendez-vous'
  },
  {
    icon: Shield,
    title: '100% Gratuit',
    description: 'Tous nos simulateurs sans engagement'
  },
  {
    icon: Target,
    title: 'Précision fiscale',
    description: 'Calculs conformes à la législation 2024'
  },
  {
    icon: Users,
    title: 'Support expert',
    description: 'Assistance de nos conseillers disponible'
  }
]

// demo grid removed

export default function SimulatorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Hero237 Component */}
      <Hero237 />

      {/* Feature Section - Feature20 format demandé */}
      <Feature20 />

      

      {/* Original Hero Section (now hidden, can be removed later) */}
      <section className="hidden relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              {/* Badge */}
              <Badge className="bg-black text-white dark:bg-white dark:text-black px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                Simulateurs gratuits
              </Badge>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Simulateurs de{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  défiscalisation
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Calculez instantanément vos économies d'impôts avec nos simulateurs gratuits.
                Des outils professionnels pour optimiser votre fiscalité en toute autonomie.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                <div className="bg-white dark:bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold">15K+</div>
                  <div className="text-xs text-muted-foreground">Simulations/mois</div>
                </div>
                <div className="bg-white dark:bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
                <div className="bg-white dark:bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold">2024</div>
                  <div className="text-xs text-muted-foreground">Lois à jour</div>
                </div>
                <div className="bg-white dark:bg-card border rounded-lg p-4">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-xs text-muted-foreground">Gratuit</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                  <Calculator className="h-5 w-5 mr-2" />
                  Commencer une simulation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Parler à un expert
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}