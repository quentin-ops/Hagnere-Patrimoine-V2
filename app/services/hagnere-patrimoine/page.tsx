"use client"

import React from "react"
import Link from "next/link"
import {
  Calendar,
  Sparkles,
  Users,
  Target,
  BarChart3,
  Wallet,
  Handshake,
  GraduationCap,
  Globe,
  Orbit,
  Heart,
  Gift,
  Crown,
  BookOpen,
  Scale,
  LineChart,
  Gem,
  HeartHandshake,
  Search,
  Filter,
  Building2,
  TrendingUp,
  Calculator,
  FileText,
  Briefcase,
  PiggyBank,
  Home,
  Shield,
  CalendarClock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BlueVeilOverlay } from "@/components/blue-veil-overlay"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HagnerePatrimoinePage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])

  const services = [
    {
      category: "Défiscalisation",
      icon: PiggyBank,
      color: "text-green-500",
      isDouble: true,
      subcategories: [
        {
          title: "Défiscalisation Immobilière",
          items: [
            {
              name: "LMNP / LMP",
              href: "/services/lmnp-lmp",
              icon: Building2,
              description: "Location meublée, amortissement du bien"
            },
            {
              name: "Déficit Foncier",
              href: "/services/deficit-foncier",
              icon: Calculator,
              description: "Déduction des travaux sur vos revenus"
            },
            {
              name: "Pinel",
              href: "/services/pinel",
              icon: Home,
              description: "Investissement neuf, jusqu'à 21%"
            },
            {
              name: "Censi-Bouvard",
              href: "/services/censi-bouvard",
              icon: Building2,
              description: "Résidences services, jusqu'à 11%"
            },
            {
              name: "Denormandie",
              href: "/services/denormandie",
              icon: Home,
              description: "Rénovation dans l'ancien"
            },
            {
              name: "Loi Malraux",
              href: "/services/malraux",
              icon: Building2,
              description: "Restauration immobilière"
            },
            {
              name: "Monument Historique",
              href: "/services/monument-historique",
              icon: Sparkles,
              description: "100% des travaux déductibles"
            },
          ]
        },
        {
          title: "Défiscalisation Financière",
          items: [
            {
              name: "PER",
              href: "/services/per",
              icon: Wallet,
              description: "Plan Épargne Retraite déductible"
            },
            {
              name: "Girardin Industriel",
              href: "/services/girardin",
              icon: TrendingUp,
              description: "Investissement en Outre-mer"
            },
            {
              name: "Groupements Forestiers",
              href: "/services/groupements-forestiers",
              icon: Sparkles,
              description: "Réduction d'impôt et IFI"
            },
            {
              name: "FCPI / FIP",
              href: "/services/fcpi-fip",
              icon: BarChart3,
              description: "Innovation et PME, jusqu'à 25%"
            },
          ]
        }
      ]
    },
    {
      category: "Investissement Immobilier",
      icon: Building2,
      color: "text-emerald-500",
      isDouble: false,
      items: [
        {
          name: "Hagnéré Investissement",
          href: "/services/hagnere-investissement",
          icon: Building2,
          description: "Notre solution clé en main"
        },
        {
          name: "Résidences Services",
          href: "/services/residences-services",
          icon: Home,
          description: "EHPAD, étudiantes, tourisme"
        },
        {
          name: "SCPI",
          href: "/services/scpi",
          icon: BarChart3,
          description: "Pierre papier diversifiée"
        },
      ]
    },
    {
      category: "Placements",
      icon: LineChart,
      color: "text-blue-500",
      isDouble: false,
      items: [
        {
          name: "Assurance-vie",
          href: "/services/assurance-vie",
          icon: Heart,
          description: "Support d'épargne privilégié"
        },
        {
          name: "Assurance-vie Luxembourgeoise",
          href: "/services/assurance-vie-luxembourg",
          icon: Shield,
          description: "Haut de gamme international"
        },
        {
          name: "Contrat de capitalisation",
          href: "/services/contrat-capitalisation",
          icon: TrendingUp,
          description: "Optimisation fiscale"
        },
        {
          name: "Contrat de capitalisation (personne morale)",
          href: "/services/contrat-capitalisation-pm",
          icon: Building2,
          description: "Pour les sociétés"
        },
        {
          name: "Plan Épargne Retraite (PER)",
          href: "/services/per",
          icon: Wallet,
          description: "Préparer sa retraite"
        },
      ]
    },
    {
      category: "Épargne & Placements",
      icon: LineChart,
      color: "text-blue-500",
      isDouble: false,
      items: [
        {
          name: "PEA & Compte-Titres",
          href: "/services/pea-compte-titres",
          icon: BarChart3,
          description: "Investissement en bourse"
        },
        {
          name: "Livrets & Épargne",
          href: "/services/livrets-epargne",
          icon: BookOpen,
          description: "Solutions court terme"
        },
        {
          name: "Private Equity",
          href: "/services/private-equity",
          icon: Gem,
          description: "Investissement non coté"
        },
        {
          name: "Produits Structurés",
          href: "/services/produits-structures",
          icon: Shield,
          description: "Protection du capital"
        },
        {
          name: "Cryptomonnaies",
          href: "/services/cryptomonnaies",
          icon: TrendingUp,
          description: "Actifs numériques"
        },
      ]
    },
    {
      category: "Retraite & Prévoyance",
      icon: Shield,
      color: "text-indigo-500",
      isDouble: false,
      items: [
        {
          name: "PER Individuel",
          href: "/services/per-individuel",
          icon: Wallet,
          description: "Épargne retraite déductible"
        },
        {
          name: "PER Entreprise",
          href: "/services/per-entreprise",
          icon: Briefcase,
          description: "Solutions pour dirigeants"
        },
        {
          name: "Contrats Madelin",
          href: "/services/madelin",
          icon: FileText,
          description: "TNS et professions libérales"
        },
        {
          name: "Prévoyance",
          href: "/services/prevoyance",
          icon: Shield,
          description: "Protection famille"
        },
        {
          name: "Mutuelle Santé",
          href: "/services/mutuelle-sante",
          icon: Heart,
          description: "Complémentaire santé"
        },
        {
          name: "Dépendance",
          href: "/services/dependance",
          icon: HeartHandshake,
          description: "Perte d'autonomie"
        },
      ]
    },
    {
      category: "Transmission & Succession",
      icon: Gift,
      color: "text-rose-500",
      isDouble: false,
      items: [
        {
          name: "Donation",
          href: "/services/donation",
          icon: Gift,
          description: "Transmission anticipée"
        },
        {
          name: "Démembrement",
          href: "/services/demembrement",
          icon: Scale,
          description: "Usufruit et nue-propriété"
        },
        {
          name: "SCI Familiale",
          href: "/services/sci-familiale",
          icon: Home,
          description: "Gestion immobilière familiale"
        },
        {
          name: "Pacte Dutreil",
          href: "/services/pacte-dutreil",
          icon: Handshake,
          description: "Transmission d'entreprise"
        },
        {
          name: "Testament & Succession",
          href: "/services/testament-succession",
          icon: FileText,
          description: "Préparation successorale"
        },
        {
          name: "Protection du Conjoint",
          href: "/services/protection-conjoint",
          icon: Shield,
          description: "Régimes matrimoniaux"
        },
      ]
    },
    {
      category: "Financements",
      icon: TrendingUp,
      color: "text-orange-500",
      isDouble: true,
      subcategories: [
        {
          title: "Prêts Immobiliers Classiques",
          items: [
            {
              name: "Résidence principale",
              href: "/services/residence-principale",
              icon: Home,
              description: "Financement de votre habitation"
            },
            {
              name: "Résidence secondaire",
              href: "/services/residence-secondaire",
              icon: Home,
              description: "Financement maison de vacances"
            },
            {
              name: "Prêt immobilier locatif",
              href: "/services/pret-locatif",
              icon: Building2,
              description: "Investissement locatif"
            },
            {
              name: "Financement de SCPI",
              href: "/services/financement-scpi",
              icon: Building2,
              description: "Crédit pour parts de SCPI"
            },
          ]
        },
        {
          title: "Prêts Spécialisés",
          items: [
            {
              name: "Prêt Hypothécaire",
              href: "/services/pret-hypothecaire",
              icon: Home,
              description: "Garantie sur bien immobilier"
            },
            {
              name: "Crédit Lombard",
              href: "/services/credit-lombard",
              icon: Shield,
              description: "Prêt sur portefeuille titres"
            },
            {
              name: "Financement marchand de bien",
              href: "/services/financement-marchand",
              icon: TrendingUp,
              description: "Achat-revente immobilier"
            },
            {
              name: "Prêt Viager",
              href: "/services/pret-viager",
              icon: Heart,
              description: "Financement en viager"
            },
            {
              name: "Réméré",
              href: "/services/remere",
              icon: FileText,
              description: "Vente avec rachat"
            },
          ]
        }
      ]
    },
    {
      category: "Comptabilité",
      icon: Calculator,
      color: "text-purple-500",
      isDouble: false,
      items: [
        {
          name: "LMNP / LMP",
          href: "/services/lmnp-lmp",
          icon: FileText,
          description: "Comptabilité location meublée"
        },
        {
          name: "SCI",
          href: "/services/sci-comptabilite",
          icon: Building2,
          description: "Comptabilité société civile immobilière"
        },
      ]
    },
    {
      category: "Livres",
      icon: BookOpen,
      color: "text-indigo-500",
      isDouble: false,
      items: [
        {
          name: "Défiscaliser grâce à l'immobilier",
          href: "/livres/defiscaliser-immobilier",
          icon: BookOpen,
          description: "Guide complet de défiscalisation"
        },
        {
          name: "Immobilier locatif : Réussir son premier investissement sans stress",
          href: "/livres/immobilier-locatif",
          icon: BookOpen,
          description: "Le guide du premier investissement"
        },
      ]
    },
    {
      category: "Simulateurs",
      icon: Calculator,
      color: "text-cyan-500",
      isDouble: true,
      subcategories: [
        {
          title: "Simulateurs Location Nue",
          items: [
            {
              name: "Simulateur déficit foncier",
              href: "/simulateurs/deficit-foncier",
              icon: Calculator,
              description: "Location nue / déficit foncier"
            },
          ]
        },
        {
          title: "Simulateurs LMNP / LMP",
          items: [
            {
              name: "Comparateur Micro-BIC vs Réel",
              href: "/simulateurs/micro-bic-vs-reel",
              icon: BarChart3,
              description: "Comparez les régimes fiscaux"
            },
            {
              name: "Générateur LMNP Mono-appartement",
              href: "/simulateurs/lmnp-mono",
              icon: FileText,
              description: "Liasse fiscale mono-appartement"
            },
            {
              name: "Générateur LMNP Multi-appartements",
              href: "/simulateurs/lmnp-multi",
              icon: Building2,
              description: "Liasse fiscale multi-appartements"
            },
          ]
        },
        {
          title: "Simulateurs SCI / Société à l'IS",
          items: [
            {
              name: "Simulateur fiscalité SCI à l'IS",
              href: "/simulateurs/sci-is",
              icon: Building2,
              description: "Société à l'IS sur 20 ans"
            },
          ]
        },
        {
          title: "Simulateurs SCI à l'IR",
          items: [
            {
              name: "Simulateur SCI IR déficit foncier",
              href: "/simulateurs/sci-ir-deficit",
              icon: Calculator,
              description: "Location nue / déficit foncier SCI IR"
            },
          ]
        }
      ]
    },
    {
      category: "Services Premium",
      icon: Crown,
      color: "text-amber-500",
      isDouble: false,
      items: [
        {
          name: "Family Office",
          href: "/services/family-office",
          icon: Crown,
          description: "Gestion grandes fortunes"
        },
        {
          name: "Art & Collections",
          href: "/services/art-collections",
          icon: Sparkles,
          description: "Investissement passion"
        },
        {
          name: "Philanthropie",
          href: "/services/philanthropie",
          icon: Heart,
          description: "Fondations et mécénat"
        },
        {
          name: "Conciergerie Patrimoniale",
          href: "/services/conciergerie",
          icon: Gem,
          description: "Services exclusifs"
        },
        {
          name: "Expatriation",
          href: "/services/expatriation",
          icon: Globe,
          description: "Accompagnement international"
        },
        {
          name: "Hagnéré Elite",
          href: "/services/hagnere-elite",
          icon: Crown,
          description: "Club privé"
        },
      ]
    }
  ]

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-50 dark:bg-background">
      {/* Content */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="w-full max-w-[1920px] mx-auto px-8 py-20">
          {/* Header Section avec Cards */}
          <div className="px-6 mb-12">
            <div className="space-y-4">
              {/* Title Section */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center mb-3">
                  <Orbit className="h-10 w-10 text-black dark:text-white animate-spin" style={{ animationDuration: '10s' }} />
                </div>
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                  Notre Galaxie de Services
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Explorez l'univers complet de nos solutions patrimoniales,
                  de la gestion privée aux investissements exclusifs
                </p>
              </div>

            </div>
          </div>

          {/* Booking Section */}
          <div className="px-6 mb-8">
            <div className="relative border border-gray-200 dark:border-border rounded-xl p-6 overflow-hidden">
              <BlueVeilOverlay />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3 text-black dark:text-black">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <CalendarClock className="h-5 w-5" />
                  </span>
                  <h3 className="text-2xl font-bold leading-none">Nos rendez-vous</h3>
                </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/calendly"
                  className="group relative border border-gray-300 dark:border-border bg-white dark:bg-card rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-black dark:text-white">
                      Bilan Patrimonial 360°
                    </h3>
                    <div className="flex gap-2">
                      <Badge className="text-xs bg-black dark:bg-white text-white dark:text-black">
                        Gratuit
                      </Badge>
                      <Badge variant="outline" className="text-xs border-black dark:border-white text-black dark:text-white">
                        45 min
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Rendez-vous obligatoire avant toute souscription. Découvrez vos besoins et les solutions adaptées à votre situation.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/calendly"
                  className="group relative border border-gray-300 dark:border-border bg-white dark:bg-card rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-black dark:text-white">
                      Stratégies et Simulations
                    </h3>
                    <div className="flex gap-2">
                      <Badge className="text-xs bg-gray-100 dark:bg-muted text-black dark:text-white border border-gray-300 dark:border-border">
                        149€
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-300 dark:border-border text-black dark:text-white">
                        1h
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Optimisation et conseils personnalisés
                    </p>
                  </div>
                </Link>

                <Link
                  href="/calendly"
                  className="group relative border border-gray-300 dark:border-border bg-white dark:bg-card rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-black dark:text-white">
                      Stratégies et Simulations
                    </h3>
                    <div className="flex gap-2">
                      <Badge className="text-xs bg-gray-100 dark:bg-muted text-black dark:text-white border border-gray-300 dark:border-border">
                        269€
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-300 dark:border-border text-black dark:text-white">
                        2h
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Session approfondie avec plan d'action
                    </p>
                  </div>
                </Link>

                <Link
                  href="/calendly"
                  className="group relative border border-gray-300 dark:border-border bg-white dark:bg-card rounded-lg p-4 hover:border-black dark:hover:border-white transition-all duration-200 hover:shadow-md"
                >
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm text-black dark:text-white">
                      Suivi Patrimonial Pro
                    </h3>
                    <div className="flex gap-2">
                      <Badge className="text-xs bg-gray-100 dark:bg-muted text-black dark:text-white border border-gray-300 dark:border-border">
                        Sur devis
                      </Badge>
                      <Badge variant="outline" className="text-xs border-gray-300 dark:border-border text-black dark:text-white">
                        Illimité
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Accompagnement complet sur 12 mois
                    </p>
                  </div>
                </Link>
              </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="px-6 mb-8 space-y-4">
            {/* Search Bar and Action Buttons */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher un service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-white dark:bg-muted border-gray-200 dark:border-border"
                />
              </div>
              {/* Boutons retirés à la demande : Bilan Patrimonial 360° gratuit & Contact */}
            </div>

            {/* Filter Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedFilters.length === 0 ? "default" : "outline"}
                className={cn(
                  "cursor-pointer",
                  selectedFilters.length === 0
                    ? "hover:bg-gray-800 dark:hover:bg-zinc-700"
                    : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                )}
                onClick={() => setSelectedFilters([])}
              >
                <Filter className="mr-1 h-3 w-3" />
                Tous
              </Badge>
              {services.map((category) => (
                <Badge
                  key={category.category}
                  variant={selectedFilters.includes(category.category) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedFilters.includes(category.category)
                      ? "hover:bg-gray-800 dark:hover:bg-zinc-700"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                  )}
                  onClick={() => {
                    if (selectedFilters.includes(category.category)) {
                      setSelectedFilters(selectedFilters.filter(f => f !== category.category))
                    } else {
                      setSelectedFilters([...selectedFilters, category.category])
                    }
                  }}
                >
                  <category.icon className="mr-1 h-3 w-3" />
                  {category.category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 px-6 space-y-6">
            {services
              .filter(category => {
                // Filter by selected filters
                if (selectedFilters.length > 0 && !selectedFilters.includes(category.category)) {
                  return false
                }
                // Filter by search query
                if (searchQuery) {
                  const query = searchQuery.toLowerCase()
                  // Check category name
                  if (category.category.toLowerCase().includes(query)) {
                    return true
                  }
                  // Check items
                  if (category.items) {
                    return category.items.some(item =>
                      item.name.toLowerCase().includes(query) ||
                      item.description.toLowerCase().includes(query)
                    )
                  }
                  // Check subcategories
                  if (category.subcategories) {
                    return category.subcategories.some(sub =>
                      sub.title.toLowerCase().includes(query) ||
                      sub.items.some(item =>
                        item.name.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query)
                      )
                    )
                  }
                }
                return true
              })
              .map((category, index) => (
              <div key={category.category} className="break-inside-avoid mb-6">
                <Card className={cn(
                  "p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]",
                  category.category === "Services Premium"
                    ? "bg-black dark:bg-card text-white border-zinc-800 dark:border-border"
                    : "bg-white dark:bg-card border-gray-200 dark:border-border"
                )}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className={cn(
                      "p-2 rounded-md",
                      category.category === "Services Premium"
                        ? "bg-white/10"
                        : "bg-gray-100 dark:bg-muted"
                    )}>
                      <category.icon className={cn(
                        "h-5 w-5",
                        category.category === "Services Premium"
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      )} />
                    </div>
                    <h3 className={cn(
                      "text-lg font-semibold",
                      category.category === "Services Premium"
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    )}>{category.category}</h3>
                  </div>

                  {category.isDouble && category.subcategories ? (
                    <div className="space-y-4">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.title}>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 pb-1 border-b border-gray-200 dark:border-border">
                            {subcategory.title}
                          </h4>
                          <div className="space-y-2">
                            {subcategory.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block group/item"
                              >
                                <div className="flex items-start gap-2.5 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-all duration-200">
                                  <item.icon className="h-3.5 w-3.5 mt-0.5 text-gray-500 dark:text-gray-400 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {category.items?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block group/item"
                        >
                          <div className={cn(
                            "flex items-start gap-3 p-2.5 rounded-md transition-all duration-200",
                            category.category === "Services Premium"
                              ? "hover:bg-white/10"
                              : "hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                          )}>
                            <item.icon className={cn(
                              "h-4 w-4 mt-0.5",
                              category.category === "Services Premium"
                                ? "text-white/70 group-hover/item:text-white"
                                : "text-gray-500 dark:text-gray-400 group-hover/item:text-gray-700 dark:group-hover/item:text-gray-200"
                            )} />
                            <div className="flex-1">
                              <div className={cn(
                                "text-sm font-medium transition-colors",
                                category.category === "Services Premium"
                                  ? "text-white group-hover/item:text-white"
                                  : "text-gray-700 dark:text-gray-200 group-hover/item:text-gray-900 dark:group-hover/item:text-white"
                              )}>
                                {item.name}
                              </div>
                              <div className={cn(
                                "text-xs mt-0.5",
                                category.category === "Services Premium"
                                  ? "text-white/60"
                                  : "text-gray-500 dark:text-gray-400"
                              )}>
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}