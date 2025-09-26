'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { ChevronRight, Map, Percent, TrendingDown, Building2, Clock, Gift, Gem, Banknote, Shield, CheckCircle2, ArrowRight, Sparkles, MessageCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

const objectives = [
  {
    id: 'strategie',
    title: 'Établir une stratégie / Être conseillé',
    icon: Map,
    header: 'Établir une stratégie',
    excerpt: 'Construisez un plan patrimonial solide adapté à vos objectifs',
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
    header: 'Réduire mes impôts',
    excerpt: 'Optimisez votre fiscalité avec des solutions légales et efficaces',
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
    header: 'Booster mes placements',
    excerpt: 'Optimisez la performance de vos placements avec nos solutions',
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
    header: 'Investir dans l\'immobilier',
    excerpt: 'Construisez un patrimoine solide avec l\'immobilier',
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
    header: 'Préparer ma retraite',
    excerpt: 'Anticipez sereinement votre retraite avec nos solutions',
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
    header: 'Transmettre mon patrimoine',
    excerpt: 'Protégez vos proches et optimisez la transmission',
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
    header: 'Gérer ma fortune',
    excerpt: 'Gestion de fortune privée premium pour grandes fortunes',
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
    header: 'Obtenir un financement',
    excerpt: 'Accédez aux meilleures conditions de crédit du marché',
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
    header: 'Protéger ma famille',
    excerpt: 'Sécurisez l\'avenir de vos proches avec nos solutions',
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

export function ServicesPharesTabs() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTopOverlay, setShowTopOverlay] = useState(false)
  const [showBottomOverlay, setShowBottomOverlay] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

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
  }, [])

  return (
    <section className="py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="border-border">
            Nos services phares
          </Badge>
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white lg:text-5xl">
            Nos services phares
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos solutions sur-mesure pour optimiser, protéger et développer votre patrimoine. Chaque service est conçu pour répondre à vos objectifs spécifiques.
          </p>
        </div>

        {/* Mobile Accordion */}
        <Accordion
          type="multiple"
          className="flex flex-col gap-px overflow-hidden rounded-xl border bg-border lg:hidden"
        >
          {objectives.map((feature) => {
            const Icon = feature.icon
            return (
              <AccordionItem
                key={feature.id}
                value={feature.id}
                className="border-b-0 bg-muted px-7 py-4 data-[state=open]:bg-background"
              >
                <AccordionTrigger className="group relative items-start text-left hover:no-underline data-[state=active]:bg-background">
                  <span className="absolute -top-4 bottom-0 -left-7 h-full w-[3px] bg-primary transition-opacity duration-300 group-data-[state=closed]:opacity-0"></span>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-auto w-5" />
                      <span className="text-sm font-medium">
                        {feature.header}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.excerpt}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-7 rounded-xl border bg-muted/50 p-5 data-[state=inactive]:hidden">
                  {/* Problem Statement */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                    <p className="text-xs lg:text-sm text-gray-700 dark:text-gray-300 font-semibold">
                      {feature.problem}
                    </p>
                    <div className="flex items-start gap-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400 italic border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                      <MessageCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <p>"{feature.userQuote}"</p>
                    </div>
                  </div>

                  {/* Solutions */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-4 w-4 text-black dark:text-white" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">Nos solutions</span>
                    </div>
                    <div className="grid gap-3">
                      {feature.solutions.map((solution, index) => (
                        <div
                          key={index}
                          className="group relative bg-muted rounded-lg overflow-hidden cursor-pointer transition-all hover:bg-muted/70"
                        >
                          {/* Background gradient effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                          <div className="relative p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                    {solution.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {solution.description}
                                </p>
                                <Badge variant="secondary" className="text-xs">
                                  {solution.benefit}
                                </Badge>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all flex-shrink-0 mt-1 group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {/* Desktop Tabs */}
        <Tabs
          defaultValue="strategie"
          className="hidden grid-cols-3 gap-px overflow-hidden rounded-xl border bg-border lg:grid lg:max-h-[600px]"
        >
          <TabsList className="flex flex-col gap-px bg-border overflow-y-auto max-h-[600px]" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(209 213 219) transparent' }}>
            {objectives.map((feature) => {
              const Icon = feature.icon
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="group relative flex flex-col gap-2.5 bg-muted px-6 py-6 transition-colors duration-300 data-[state=active]:bg-white dark:data-[state=active]:bg-background hover:bg-muted/80 cursor-pointer justify-start items-start text-left"
                >
                  <span className="absolute top-0 bottom-0 left-0 h-full w-[3px] bg-primary transition-opacity duration-300 group-data-[state=inactive]:opacity-0"></span>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-auto w-4" />
                      <span className="font-medium text-sm">{feature.header}</span>
                    </div>
                    <ChevronRight className="h-auto w-4 text-muted-foreground" />
                  </div>
                  <p className="text-left text-muted-foreground text-xs">
                    {feature.excerpt}
                  </p>
                </TabsTrigger>
              )
            })}
          </TabsList>
          {objectives.map((feature) => (
            <TabsContent
              value={feature.id}
              key={feature.id}
              className="col-span-2 flex flex-col gap-7 bg-white dark:bg-background p-10 data-[state=inactive]:hidden max-h-[600px] overflow-y-auto"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(209 213 219) transparent' }}
            >
              {/* Problem Statement */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                  {feature.problem}
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 italic border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                  <MessageCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <p>"{feature.userQuote}"</p>
                </div>
              </div>

              {/* Solutions */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-black dark:text-white" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">Nos solutions</span>
                </div>
                <div className="relative">
                  <div
                    ref={scrollRef}
                    className={cn(
                      "grid gap-3",
                      feature.solutions.length > 4 && "max-h-[360px] overflow-y-auto pr-2"
                    )}
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(209 213 219) transparent' }}
                  >
                    {feature.solutions.map((solution, index) => {
                      // Add section titles for défiscalisation
                      const showImmobilierTitle = feature.id === 'impots' && index === 0
                      const showFinancierTitle = feature.id === 'impots' && index === 5

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
                            className="group relative bg-muted rounded-lg overflow-hidden cursor-pointer transition-all hover:bg-muted/70"
                          >
                            {/* Background gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
                                      {solution.title}
                                    </h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {solution.description}
                                  </p>
                                  <Badge variant="secondary" className="text-xs">
                                    {solution.benefit}
                                  </Badge>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all flex-shrink-0 mt-1 group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </div>
                  {/* Overlay gradients for scroll indication */}
                  {feature.solutions.length > 4 && (
                    <>
                      {showTopOverlay && (
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none" />
                      )}
                      {showBottomOverlay && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white dark:bg-card rounded-xl p-6 border border-border">
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}