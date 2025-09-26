'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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

const simulators = [
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

export default function SimulatorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-background dark:to-background">
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

      {/* Benefits Section */}
      <section className="py-12 border-y bg-gray-50/50 dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-card flex items-center justify-center">
                    <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Simulators Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <BarChart3 className="h-3 w-3 mr-1" />
                Nos outils
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Choisissez votre simulateur
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des calculateurs précis et à jour pour chaque dispositif de défiscalisation
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {simulators.map((simulator) => {
                const Icon = simulator.icon
                return (
                  <Card key={simulator.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${simulator.color} opacity-5`} />

                    {/* Popularity Badge */}
                    {simulator.popularityBadge && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px]">
                          {simulator.popularityBadge}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${simulator.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-[10px]">
                              {simulator.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{simulator.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-sm">
                        {simulator.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Savings Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950/30 rounded-full">
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">
                          {simulator.savings}
                        </span>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-2">
                        {simulator.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button asChild className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <Link href={simulator.href}>
                          Lancer le simulateur
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-black p-8">
                <div className="max-w-3xl mx-auto space-y-6">
                  <h3 className="text-2xl font-bold">
                    Besoin d'un accompagnement personnalisé ?
                  </h3>
                  <p className="text-white/80 dark:text-black/80">
                    Nos experts sont disponibles pour analyser vos résultats et vous proposer une stratégie sur-mesure
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" asChild>
                      <Link href="/bilan-gratuit">
                        Bilan patrimonial gratuit
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 dark:border-black/20 dark:text-black dark:hover:bg-black/10" asChild>
                      <Link href="/contact">
                        Contactez un conseiller
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}