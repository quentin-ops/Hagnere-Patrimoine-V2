'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Percent, TrendingDown, LineChart, Compass, Clock, Gift,
  Calculator, Building2, Shield, Users, Shuffle, Target,
  CheckCircle2, ArrowRight, Sparkles, Map, Banknote, Gem, MessageCircle
} from 'lucide-react'
import Link from 'next/link'

const objectives = [
  {
    id: 'strategie',
    title: 'Établir une stratégie / Être conseillé',
    icon: Map,
    description: 'Construisez un plan patrimonial solide',
    problem: 'Vous naviguez sans vision claire et avez besoin d\'une stratégie patrimoniale globale adaptée à vos objectifs',
    userQuote: "J'aimerais avoir une vision claire de ma situation et savoir exactement quoi faire pour atteindre mes objectifs patrimoniaux",
    solutions: [
      {
        title: 'Bilan patrimonial complet',
        description: 'Audit de votre situation et définition d\'objectifs',
        benefit: 'Vision 360° de votre patrimoine'
      },
      {
        title: 'Plan d\'action personnalisé',
        description: 'Feuille de route sur-mesure avec priorités',
        benefit: 'Stratégie claire sur 10-20 ans'
      },
      {
        title: 'Suivi et ajustements réguliers',
        description: 'Accompagnement continu avec votre conseiller',
        benefit: 'Optimisation permanente'
      }
    ]
  },
  {
    id: 'impots',
    title: 'Réduire mes impôts',
    icon: Percent,
    description: 'Optimisez votre fiscalité légalement',
    problem: "Vous payez trop d'impôts et cherchez des solutions légales pour réduire votre pression fiscale",
    userQuote: "Je paie trop d'impôts et j'aimerais connaître toutes les solutions légales pour optimiser ma fiscalité",
    solutions: [
      {
        title: 'Déficit Foncier',
        description: 'Déduction des travaux sur vos revenus',
        benefit: 'Jusqu\'à 10 700€ déductibles'
      },
      {
        title: 'Denormandie',
        description: 'Rénovation dans l\'ancien',
        benefit: 'Jusqu\'à 21% de réduction'
      },
      {
        title: 'Passer en LMNP / LMP',
        description: 'Location meublée, amortissement du bien',
        benefit: 'Revenus non imposés'
      },
      {
        title: 'Loi Malraux',
        description: 'Restauration immobilière',
        benefit: 'Jusqu\'à 30% des travaux déduits'
      },
      {
        title: 'Monument Historique',
        description: '100% des travaux déductibles',
        benefit: 'Sans plafonnement'
      },
      {
        title: 'PER',
        description: 'Plan Épargne Retraite déductible',
        benefit: 'Économie immédiate sur l\'IR'
      },
      {
        title: 'Girardin Industriel',
        description: 'Investissement en Outre-mer',
        benefit: 'Jusqu\'à 53% de réduction'
      },
      {
        title: 'Groupements Forestiers',
        description: 'Réduction d\'impôt et IFI',
        benefit: '25% de réduction d\'impôt'
      },
      {
        title: 'FCPI / FIP',
        description: 'Innovation et PME',
        benefit: 'Jusqu\'à 25% de réduction'
      }
    ]
  },
  {
    id: 'performance',
    title: 'Placer / Booster mon argent',
    icon: TrendingDown,
    description: 'Optimisez la performance de vos placements',
    problem: 'Vos placements actuels sous-performent et vous souhaitez améliorer vos rendements',
    userQuote: "Mes placements actuels ne rapportent rien, j'aimerais faire fructifier mon épargne efficacement",
    solutions: [
      {
        title: 'Gestion pilotée sur-mesure',
        description: 'Allocation dynamique par nos experts',
        benefit: 'Performance moyenne +7%/an'
      },
      {
        title: 'SCPI de rendement',
        description: 'Immobilier professionnel diversifié',
        benefit: 'Rendement moyen 5-6%/an'
      },
      {
        title: 'Private equity',
        description: 'Accès aux investissements institutionnels',
        benefit: 'Potentiel de +10%/an'
      }
    ]
  },
  {
    id: 'immobilier',
    title: 'Investir dans l\'immobilier',
    icon: Building2,
    description: 'Construisez un patrimoine solide',
    problem: 'Vous voulez investir dans l\'immobilier mais manquez de temps ou d\'expertise',
    userQuote: "Je veux investir dans l'immobilier mais je ne sais pas par où commencer ni quel montage choisir",
    solutions: [
      {
        title: 'SCPI clé en main',
        description: 'Immobilier sans contrainte de gestion',
        benefit: 'Rendement 5% net'
      },
      {
        title: 'Investissement Pinel',
        description: 'Neuf avec avantage fiscal',
        benefit: 'Jusqu\'à 21% de réduction'
      },
      {
        title: 'LMNP meublé',
        description: 'Récupération TVA et amortissement',
        benefit: 'Revenus non imposés'
      }
    ]
  },
  {
    id: 'retraite',
    title: 'Préparer ma retraite',
    icon: Clock,
    description: 'Anticipez sereinement votre retraite',
    problem: 'Vous voulez maintenir votre niveau de vie à la retraite et compenser la baisse de revenus',
    userQuote: "Je m'inquiète pour ma retraite et j'aimerais m'assurer de maintenir mon niveau de vie",
    solutions: [
      {
        title: 'PER sur-mesure',
        description: 'Constitution d\'un capital retraite défiscalisé',
        benefit: 'Rente viagère ou capital'
      },
      {
        title: 'Immobilier locatif',
        description: 'Revenus complémentaires pérennes',
        benefit: 'Patrimoine transmissible'
      },
      {
        title: 'Contrat Madelin',
        description: 'Solution dédiée aux TNS',
        benefit: 'Déduction fiscale totale'
      }
    ]
  },
  {
    id: 'transmission',
    title: 'Transmettre mon patrimoine',
    icon: Gift,
    description: 'Protégez vos proches efficacement',
    problem: 'Vous souhaitez transmettre votre patrimoine en minimisant les droits de succession',
    userQuote: "Je veux protéger mes proches et leur transmettre mon patrimoine dans les meilleures conditions",
    solutions: [
      {
        title: 'Donation-partage',
        description: 'Transmission anticipée avec abattements',
        benefit: 'Jusqu\'à 100 000€ par enfant'
      },
      {
        title: 'Assurance-vie',
        description: 'Transmission hors succession',
        benefit: 'Abattement 152 500€/bénéficiaire'
      },
      {
        title: 'SCI familiale',
        description: 'Transmission progressive des parts',
        benefit: 'Démembrement optimisé'
      }
    ]
  },
  {
    id: 'fortune',
    title: 'Gérer / Optimiser ma fortune',
    icon: Gem,
    description: 'Gestion de fortune privée premium',
    problem: 'Votre patrimoine important nécessite une gestion sophistiquée et un accompagnement premium',
    userQuote: "Mon patrimoine est devenu complexe et j'ai besoin d'une gestion professionnelle et sur-mesure",
    solutions: [
      {
        title: 'Family Office',
        description: 'Service ultra-personnalisé pour grandes fortunes',
        benefit: 'Gestion intégrale de votre patrimoine'
      },
      {
        title: 'Gestion discrétionnaire',
        description: 'Délégation complète à nos experts',
        benefit: 'Performance institutionnelle'
      },
      {
        title: 'Opportunités exclusives',
        description: 'Accès aux investissements réservés',
        benefit: 'Clubs deals et private equity'
      }
    ]
  },
  {
    id: 'financement',
    title: 'Obtenir un financement',
    icon: Banknote,
    description: 'Accédez aux meilleures conditions de crédit',
    problem: 'Vous avez besoin d\'un financement pour vos projets et cherchez les meilleures conditions du marché',
    userQuote: "J'ai besoin d'un financement avantageux mais je ne sais pas comment obtenir les meilleures conditions",
    solutions: [
      {
        title: 'Crédit immobilier optimisé',
        description: 'Négociation des meilleurs taux et conditions',
        benefit: 'Jusqu\'à -0,50% sur votre taux'
      },
      {
        title: 'Regroupement de crédits',
        description: 'Consolidation et optimisation de vos emprunts',
        benefit: 'Mensualité réduite jusqu\'à -30%'
      },
      {
        title: 'Crédit patrimonial',
        description: 'Solutions de financement sur-mesure',
        benefit: 'Effet de levier optimisé'
      }
    ]
  },
  {
    id: 'protection',
    title: 'Assurer / Protéger ma famille',
    icon: Shield,
    description: 'Sécurisez l\'avenir de vos proches',
    problem: 'Vous voulez garantir la sécurité financière de votre famille en cas d\'imprévu',
    userQuote: "Je veux m'assurer que ma famille sera protégée financièrement quoi qu'il arrive",
    solutions: [
      {
        title: 'Prévoyance décès',
        description: 'Capital garanti pour vos proches',
        benefit: 'Jusqu\'à 1M€ de couverture'
      },
      {
        title: 'Garantie emprunteur',
        description: 'Protection des crédits en cours',
        benefit: 'Maintien du niveau de vie'
      },
      {
        title: 'Épargne éducation',
        description: 'Financement études des enfants',
        benefit: 'Capital disponible à 18 ans'
      }
    ]
  }
]

export function ObjectivesTabs() {
  const [activeObjective, setActiveObjective] = useState(objectives[0].id)
  const [showTopOverlay, setShowTopOverlay] = useState(false)
  const [showBottomOverlay, setShowBottomOverlay] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const currentObjective = objectives.find(obj => obj.id === activeObjective) || objectives[0]

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current

      // Show top overlay if scrolled down
      setShowTopOverlay(scrollTop > 10)

      // Show bottom overlay if not at bottom
      setShowBottomOverlay(scrollTop < scrollHeight - clientHeight - 10)
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      // Initial check
      handleScroll()
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [activeObjective]) // Re-run when active objective changes

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-border">
              Vos objectifs patrimoniaux
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              À chaque étape de votre vie,
              <span className="text-black dark:text-white"> une solution adaptée</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Découvrez comment booster vos objectifs patrimoniaux
              grâce à nos produits d'épargne et d'investissement exclusifs.
            </p>
          </div>

          {/* Tabs Container - Horizontal Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Tab buttons as horizontal list */}
            <div className="lg:w-1/3 relative">
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[700px] pb-4 lg:pb-0 lg:pr-1"
                   style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(209 213 219) transparent' }}>
                {objectives.map((objective) => {
                  const Icon = objective.icon
                  const isActive = activeObjective === objective.id

                  return (
                    <button
                      key={objective.id}
                      onClick={() => setActiveObjective(objective.id)}
                      className={cn(
                        "min-w-[200px] lg:w-full text-left p-4 rounded-xl transition-all duration-200",
                        "border hover:shadow-md overflow-hidden",
                        "flex items-center gap-3 group relative",
                        isActive
                          ? "bg-white dark:bg-card border-black dark:border-white shadow-lg"
                          : "bg-gray-50/50 dark:bg-card/50 border-gray-200 dark:border-border hover:bg-white dark:hover:bg-card"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                        isActive
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5 transition-colors",
                          isActive
                            ? "text-black dark:text-white"
                            : "text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white"
                        )} />
                      </div>
                      <div className="flex-1">
                        <h3 className={cn(
                          "font-semibold text-sm lg:text-base transition-colors",
                          isActive
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        )}>
                          {objective.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 hidden lg:block">
                          {objective.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="absolute left-0 top-0 h-full w-1 bg-black dark:bg-white rounded-l-xl" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right side - Content */}
            <div className="lg:flex-1">
              <div className="relative">
                {/* Animated connector lines */}
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[80px] bottom-[50px] hidden lg:block">
                  <div className="relative w-[2px] h-full bg-gradient-to-b from-gray-300 via-gray-300 to-gray-300 dark:from-gray-700 dark:via-gray-700 dark:to-gray-700">
                    {/* Animated particles */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute w-1 h-1 bg-black dark:bg-white rounded-full animate-flow-1 left-[-2px]"></div>
                      <div className="absolute w-1 h-1 bg-black dark:bg-white rounded-full animate-flow-2 left-[-2px]"></div>
                      <div className="absolute w-1 h-1 bg-black dark:bg-white rounded-full animate-flow-3 left-[-2px]"></div>
                      <div className="absolute w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-flow-4 opacity-70 left-[-3px]"></div>
                    </div>
                  </div>
                </div>

                <style jsx>{`
                  @keyframes flow-1 {
                    0% {
                      top: -4px;
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      top: 100%;
                      opacity: 0;
                    }
                  }

                  @keyframes flow-2 {
                    0% {
                      top: -4px;
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      top: 100%;
                      opacity: 0;
                    }
                  }

                  @keyframes flow-3 {
                    0% {
                      top: -4px;
                      opacity: 0;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      top: 100%;
                      opacity: 0;
                    }
                  }

                  @keyframes flow-4 {
                    0% {
                      top: -6px;
                      opacity: 0;
                    }
                    10% {
                      opacity: 0.7;
                    }
                    90% {
                      opacity: 0.7;
                    }
                    100% {
                      top: 100%;
                      opacity: 0;
                    }
                  }

                  .animate-flow-1 {
                    animation: flow-1 3s linear infinite;
                  }

                  .animate-flow-2 {
                    animation: flow-2 3s linear infinite 0.8s;
                  }

                  .animate-flow-3 {
                    animation: flow-3 3s linear infinite 1.6s;
                  }

                  .animate-flow-4 {
                    animation: flow-4 3s linear infinite 2.4s;
                  }
                `}</style>

                <div className="space-y-6">
                  {/* Problem Statement */}
                  <div className="relative bg-white dark:bg-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-black dark:bg-white" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">Votre situation</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                    <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-semibold">
                      {currentObjective.problem}
                    </p>
                    <div className="flex items-start gap-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400 italic border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                      <MessageCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <p>"{currentObjective.userQuote}"</p>
                    </div>
                  </div>
                </div>

                  {/* Solutions */}
                  <div className="relative bg-white dark:bg-card rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-black dark:text-white" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">Nos solutions</span>
                  </div>

                  <div className="relative">
                    <div
                      ref={scrollRef}
                      className={cn(
                        "grid gap-3",
                        currentObjective.solutions.length > 4 && "max-h-[360px] overflow-y-auto pr-2"
                      )}
                      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(209 213 219) transparent' }}>
                      {currentObjective.solutions.map((solution, index) => {
                        // Add section titles for défiscalisation
                        const showImmobilierTitle = currentObjective.id === 'impots' && index === 0
                        const showFinancierTitle = currentObjective.id === 'impots' && index === 5

                        return (
                          <React.Fragment key={index}>
                            {showImmobilierTitle && (
                              <div className="col-span-1 px-3 pt-1 pb-2">
                                <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                  Défiscalisation Immobilière
                                </Badge>
                              </div>
                            )}
                            {showFinancierTitle && (
                              <div className="col-span-1 px-3 pt-2 pb-2">
                                <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                  Défiscalisation Financière
                                </Badge>
                              </div>
                            )}
                            <div
                              className="group relative bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-sm"
                            >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <h4 className="font-semibold text-sm lg:text-base">
                                {solution.title}
                              </h4>
                            </div>
                            <p className="text-xs lg:text-sm text-muted-foreground mb-2">
                              {solution.description}
                            </p>
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-0">
                              {solution.benefit}
                            </Badge>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                        </div>
                            </div>
                          </React.Fragment>
                        )
                      })}
                    </div>
                    {/* Overlay gradients for scroll indication */}
                    {currentObjective.solutions.length > 4 && (
                      <>
                        {showTopOverlay && (
                          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white dark:from-card to-transparent pointer-events-none" />
                        )}
                        {showBottomOverlay && (
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-card to-transparent pointer-events-none" />
                        )}
                      </>
                    )}
                  </div>
                </div>

                  {/* CTA */}
                  <div className="relative bg-white dark:bg-card rounded-xl p-6 border border-border">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Prêt à atteindre vos objectifs ?
                    </p>
                    <Button asChild className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
                      <Link href="/votre-projet">
                        Réserver un bilan patrimonial gratuit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}