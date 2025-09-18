"use client"

import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronLeft, ChevronRight, Building2, PiggyBank, TrendingUp, Wallet, Shield, Crown, FileText, Calculator, BookOpen, Users, ArrowRight, Clock, CheckCircle, Star, Home, Landmark, LineChart, Briefcase, Heart, TreePine, HandCoins, Globe, FileSignature, CreditCard, Banknote, Package, HeartHandshake, GraduationCap, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SecondHeader() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 300)
    }
  }

  const menuItems = [
    {
      title: "Gestion de fortune",
      icon: Crown,
      color: "text-amber-600",
      description: "Services exclusifs",
      badge: "VIP",
      items: [
        // Services Exclusifs
        { name: "Conseils multi-juridictionnel international", href: "/gestion-fortune/multi-juridictionnel", description: "Expertise cross-border", icon: Globe },
        { name: "Family Office", href: "/gestion-fortune/family-office", description: "Gestion Multi-générationnelle", icon: Crown },
        { name: "Gestion Discrétionnaire", href: "/gestion-fortune/gestion-discretionnaire", description: "Délégation totale", icon: Briefcase },
        { name: "Optimisation Internationale", href: "/gestion-fortune/optimisation-internationale", description: "Structuration globale", icon: TrendingUp },
        { name: "Immobilier de prestige", href: "/gestion-fortune/immobilier-prestige", description: "Biens d'exception", icon: Building2 },
        { name: "Gestion de fortune à 360°", href: "/gestion-fortune/360", description: "Un seul interlocuteur pour tout", icon: Star },
        // Produits Exclusifs
        { name: "FIC (Fond interne collectif)", href: "/gestion-fortune/fic", description: "Fond dédié collectif", icon: Briefcase },
        { name: "FAS (Fond assurance spécialisé)", href: "/gestion-fortune/fas", description: "Solutions spécialisées", icon: Shield },
        { name: "FID (Fond interne dédié)", href: "/gestion-fortune/fid", description: "Gestion personnalisée", icon: Star },
        { name: "Private Equity premium", href: "/gestion-fortune/private-equity", description: "Opportunités exclusives", icon: TrendingUp },
        { name: "Hedge Funds", href: "/gestion-fortune/hedge-funds", description: "Fonds alternatifs", icon: LineChart },
        { name: "Produits Structurés Tailor-Made", href: "/gestion-fortune/structures", description: "Sur-mesure", icon: Package },
        { name: "Crédits Lombard", href: "/gestion-fortune/credit-lombard", description: "Financement sur portefeuille", icon: CreditCard },
        { name: "Crédit Hypothécaire Immobilier", href: "/gestion-fortune/credit-hypothecaire", description: "Financement premium", icon: Home },
      ]
    },
    {
      title: "Défiscalisation",
      icon: PiggyBank,
      color: "text-green-600",
      description: "Réduisez vos impôts légalement",
      badge: "-21%",
      items: [
        // Défiscalisation Immobilière
        { name: "Déficit Foncier", href: "/defiscalisation/deficit-foncier", description: "Déduction des travaux sur vos revenus", icon: Calculator },
        { name: "Denormandie", href: "/defiscalisation/denormandie", description: "Rénovation dans l'ancien", icon: Building2 },
        { name: "Passer en LMNP / LMP", href: "/defiscalisation/lmnp-lmp", description: "Location meublée, amortissement du bien", icon: Briefcase },
        { name: "Loi Malraux", href: "/defiscalisation/malraux", description: "Restauration immobilière", icon: Landmark },
        { name: "Monument Historique", href: "/defiscalisation/monument-historique", description: "100% des travaux déductibles", icon: Crown },
        // Défiscalisation Financière
        { name: "Girardin Industriel", href: "/defiscalisation/girardin", description: "Investissement en Outre-mer", icon: Globe },
        { name: "PER", href: "/defiscalisation/per", description: "Plan Épargne Retraite déductible", icon: Wallet },
        { name: "Groupements Forestiers", href: "/defiscalisation/groupements-forestiers", description: "Réduction d'impôt et IFI", icon: TreePine },
        { name: "Cheptel Bovin", href: "/defiscalisation/cheptel-bovin", description: "Investissement agricole défiscalisant", icon: Landmark },
      ]
    },
    {
      title: "Placements",
      icon: TrendingUp,
      color: "text-blue-600",
      description: "Faites fructifier votre épargne",
      badge: "+8%",
      items: [
        // Supports d&apos;investissement
        { name: "Assurance-vie", href: "/placements/assurance-vie", description: "Support privilégié d'épargne", icon: Heart },
        { name: "Assurance-vie Luxembourgeoise", href: "/placements/assurance-vie-luxembourgeoise", description: "Haut de gamme international", icon: Shield },
        { name: "Contrat de capitalisation (IR/IS)", href: "/placements/contrat-capitalisation", description: "Transmission optimisée", icon: FileText },
        { name: "PER", href: "/placements/per", description: "Plan Épargne Retraite", icon: Clock },
        { name: "PEA", href: "/placements/pea", description: "Actions européennes défiscalisées", icon: LineChart },
        { name: "Compte-Titres", href: "/placements/compte-titres", description: "Investissement libre", icon: Briefcase },
        // Produits
        { name: "Private Equity", href: "/placements/private-equity", description: "Investissement non coté", icon: Crown },
        { name: "Venture Capital", href: "/placements/venture-capital", description: "Capital-risque innovant", icon: TrendingUp },
        { name: "ETF", href: "/placements/etf", description: "Fonds indiciels cotés", icon: LineChart },
        { name: "Actions", href: "/placements/actions", description: "Titres de sociétés", icon: TrendingUp },
        { name: "Obligations", href: "/placements/obligations", description: "Titres de créance", icon: FileText },
        { name: "SCPI / OPCI", href: "/placements/scpi-opci", description: "Pierre-papier", icon: Building2 },
        { name: "Cryptomonnaies", href: "/placements/crypto", description: "Actifs digitaux", icon: Globe },
        { name: "Produits structurés", href: "/placements/produits-structures", description: "Protection du capital", icon: Shield },
        { name: "Métaux Précieux", href: "/placements/metaux-precieux", description: "Or, Argent, Platine", icon: Crown },
        { name: "Matières premières", href: "/placements/matieres-premieres", description: "Commodités", icon: Globe },
      ]
    },
    {
      title: "Investissements",
      icon: Building2,
      color: "text-purple-600",
      description: "Diversifiez votre patrimoine",
      badge: "SCPI",
      items: [
        // Immobilier
        { name: "Hagnéré Investissement", href: "/investissements/hagnere-investissement", description: "Notre solution exclusive", icon: Star },
        { name: "SCPI Européenne", href: "/investissements/scpi-europeenne", description: "Immobilier européen diversifié", icon: Building2 },
        { name: "Nue-Propriété", href: "/investissements/nue-propriete", description: "Décote de 20 à 40%", icon: FileText },
        { name: "Viager", href: "/investissements/viager", description: "Investissement éthique", icon: HeartHandshake },
        // Financier
        { name: "Groupements Forestiers", href: "/investissements/groupements-forestiers", description: "Réduction IFI", icon: TreePine },
        { name: "Cheptel Bovin", href: "/investissements/cheptel-bovin", description: "Investissement agricole", icon: Landmark },
      ]
    },
    {
      title: "Financements",
      icon: Wallet,
      color: "text-indigo-600",
      description: "Solutions de crédit adaptées",
      badge: "1.5%",
      items: [
        // Crédits immobiliers
        { name: "Prêt immobilier RP", href: "/financements/pret-immobilier-rp", description: "Résidence principale", icon: Home },
        { name: "Prêt immobilier RS", href: "/financements/pret-immobilier-rs", description: "Résidence secondaire", icon: Home },
        { name: "Prêt immobilier locatif", href: "/financements/pret-immobilier-locatif", description: "Bien destiné à la location", icon: Building2 },
        { name: "Prêt relais", href: "/financements/pret-relais", description: "Avance en attendant la vente", icon: Clock },
        { name: "Prêt in fine", href: "/financements/pret-in-fine", description: "Capital remboursé à la fin", icon: Banknote },
        // Crédits spécialisés
        { name: "Crédit marchand de biens", href: "/financements/credit-marchand", description: "Achat, rénover, revendre", icon: Briefcase },
        { name: "Crédit lombard", href: "/financements/credit-lombard", description: "Sur portefeuille titres", icon: LineChart },
        // Crédits de restructuration
        { name: "Rachat de crédits", href: "/financements/rachat-credits", description: "Regroupement de prêts", icon: HandCoins },
        { name: "Crédit hypothécaire", href: "/financements/credit-hypothecaire", description: "Garanti par un bien immobilier", icon: Landmark },
        // Crédits spécifiques
        { name: "Prêt consommation", href: "/financements/pret-consommation", description: "Biens, travaux, projets", icon: CreditCard },
        { name: "Prêt viager hypothécaire", href: "/financements/pret-viager", description: "Pour séniors, liquidité sans vente", icon: Users },
        { name: "Vente à réméré", href: "/financements/vente-remere", description: "Liquidité avec rachat possible", icon: FileSignature },
      ]
    },
    {
      title: "Assurances / Prévoyance",
      icon: Shield,
      color: "text-red-600",
      description: "Protégez vos proches",
      badge: "100%",
      items: [
        // Assurances Crédit & Santé
        { name: "Assurance emprunteur", href: "/assurances/emprunteur", description: "Protection crédit", icon: CreditCard },
        { name: "Complémentaire Santé", href: "/assurances/complementaire-sante", description: "Couverture santé optimale", icon: Heart },
        { name: "Complémentaire santé expatriés", href: "/assurances/sante-expatries", description: "Santé internationale", icon: Globe },
        { name: "Assurance voyage", href: "/assurances/voyage", description: "Protection voyage", icon: Globe },
        // Assurances Mobilité & Habitation
        { name: "Assurance habitation", href: "/assurances/habitation", description: "Protection du logement", icon: Home },
        { name: "Assurance voiture", href: "/assurances/voiture", description: "Véhicule protégé", icon: CreditCard },
        { name: "Assurance deux-roues et quad", href: "/assurances/deux-roues", description: "Moto, scooter, quad", icon: Briefcase },
        { name: "Assurance Bateaux / Jet-Skis", href: "/assurances/bateaux", description: "Navigation protégée", icon: Globe },
        // Assurances Décès & Prévoyance
        { name: "Assurance décès", href: "/assurances/deces", description: "Capital ou rente", icon: Shield },
        { name: "Assurance obsèques", href: "/assurances/obseques", description: "Frais funéraires", icon: Heart },
        { name: "Garantie accident de la vie", href: "/assurances/gav", description: "Protection complète", icon: AlertTriangle },
        // Assurances Immobilier
        { name: "Assurance PNO", href: "/assurances/pno", description: "Propriétaire non occupant", icon: Building2 },
        { name: "Assurance PNO Immeuble", href: "/assurances/pno-immeuble", description: "Immeuble de rapport", icon: Landmark },
        // Assurances Spécifiques
        { name: "Assurance études internationales", href: "/assurances/etudes-internationales", description: "Protection étudiants", icon: GraduationCap },
      ]
    },
    {
      title: "Ressources",
      icon: BookOpen,
      color: "text-gray-600",
      description: "Outils et contenus",
      badge: "New",
      items: [
        { name: "Blog", href: "/blog", description: "Articles et analyses", icon: FileText },
        { name: "Guides", href: "/guides", description: "Guides pratiques", icon: BookOpen },
        { name: "Simulateurs", href: "/simulateurs", description: "Calculateurs en ligne", icon: Calculator },
        { name: "Actualités fiscales", href: "/actualites", description: "Veille réglementaire", icon: Clock },
        { name: "FAQ", href: "/faq", description: "Questions fréquentes", icon: AlertTriangle },
        { name: "Glossaire", href: "/glossaire", description: "Définitions", icon: BookOpen },
        { name: "Webinaires", href: "/webinaires", description: "Formations en ligne", icon: GraduationCap },
        { name: "Livres blancs", href: "/livres-blancs", description: "Études approfondies", icon: FileText },
      ]
    },
  ]

  return (
    <header className="sticky top-[65px] z-40 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 relative">
        {/* Desktop Navigation with scroll */}
        <div className="hidden lg:block relative">
          {/* Left scroll button and gradient */}
          {canScrollLeft && (
            <>
              <div className="absolute left-0 top-0 h-14 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background border border-border shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:scale-110"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Right scroll button and gradient */}
          {canScrollRight && (
            <>
              <div className="absolute right-0 top-0 h-14 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-background border border-border shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:scale-110"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Scrollable nav container */}
          <nav
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex h-14 items-center justify-between gap-1 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <style jsx>{`
              nav::-webkit-scrollbar {
                display: none;
              }
              @keyframes shimmer {
                0% {
                  background-position: -200% 0;
                }
                100% {
                  background-position: 200% 0;
                }
              }
              .shimmer-text {
                background: linear-gradient(
                  110deg,
                  #ffffff 0%,
                  #ffffff 40%,
                  #C0C0C0 45%,
                  #E5E4E2 50%,
                  #C0C0C0 55%,
                  #ffffff 60%,
                  #ffffff 100%
                );
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shimmer 2s linear infinite;
              }
            `}</style>
            {/* Left aligned buttons */}
            <div className="flex items-center gap-1">
              {menuItems.filter(menu => menu.title !== "Gestion de fortune").map((menu) => {
                const Icon = menu.icon
                const isGestionFortune = menu.title === "Gestion de fortune"
                return (
                  <DropdownMenu key={menu.title} modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={
                      isGestionFortune
                        ? "h-9 px-3 text-[11px] font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-white group relative data-[state=open]:bg-black dark:data-[state=open]:bg-white transition-all duration-200 rounded-md border border-black dark:border-white overflow-hidden"
                        : "h-9 px-3 text-[11px] font-medium text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:!text-gray-900 dark:hover:!text-white group relative data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 transition-all duration-200 [&>svg]:!text-gray-600 [&>svg]:dark:!text-gray-400 [&:hover>svg]:!text-gray-900 [&:hover>svg]:dark:!text-white rounded-md"
                    }
                  >
                    {isGestionFortune && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-black/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                        </div>
                      </>
                    )}
                    <Icon className={isGestionFortune ? "mr-1 h-3.5 w-3.5 flex-shrink-0 text-white dark:text-black relative z-10" : "mr-1 h-3.5 w-3.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-200"} />
                    <span className={isGestionFortune ? "tracking-wide relative z-10 text-white dark:text-black" : "tracking-wide"}>{menu.title}</span>
                    <ChevronDown className={isGestionFortune ? "ml-0.5 h-2.5 w-2.5 flex-shrink-0 text-white dark:text-black relative z-10 transition-all duration-200 group-data-[state=open]:rotate-180" : "ml-0.5 h-2.5 w-2.5 flex-shrink-0 opacity-50 transition-all duration-200 group-data-[state=open]:rotate-180 group-hover:opacity-100"} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={isGestionFortune
                    ? "w-[900px] max-w-[calc(100vw-2rem)] p-0 border-0 shadow-2xl bg-black dark:bg-gray-950"
                    : "w-[900px] max-w-[calc(100vw-2rem)] p-0 border shadow-xl"
                  }
                  align="center"
                  sideOffset={8}
                  collisionPadding={20}
                  alignOffset={0}
                >
                  <div className="flex">
                    {/* Left side - Menu items */}
                    <div className={isGestionFortune ? "flex-1 p-6 bg-black" : "flex-1 p-6"}>
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={isGestionFortune
                              ? "p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-sm border border-gray-700"
                              : "p-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-sm"
                            }>
                              <Icon className={isGestionFortune
                                ? "h-5 w-5 text-white"
                                : "h-5 w-5 text-gray-700 dark:text-gray-300"
                              } />
                            </div>
                            <div>
                              <h3 className={isGestionFortune
                                ? "text-lg font-semibold text-white"
                                : "text-lg font-semibold text-gray-900 dark:text-white"
                              }>{menu.title}</h3>
                              <p className={isGestionFortune
                                ? "text-sm text-gray-400"
                                : "text-sm text-gray-500 dark:text-gray-400"
                              }>{menu.description}</p>
                            </div>
                          </div>
                          {menu.badge && (
                            <Badge className={isGestionFortune
                              ? "bg-white dark:bg-white text-black dark:text-black border-0 animate-pulse"
                              : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 border-0 animate-pulse"
                            }>
                              {menu.badge}
                            </Badge>
                          )}
                        </div>
                        <DropdownMenuSeparator className={isGestionFortune
                          ? "bg-gradient-to-r from-transparent via-gray-700 to-transparent h-px"
                          : "bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 h-px"
                        } />
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-2 gap-1">
                        {menu.title === "Défiscalisation" && (
                          <>
                            {/* Défiscalisation Immobilière Title */}
                            <div className="col-span-2 px-3 pt-2 pb-2">
                              <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                Défiscalisation Immobilière
                              </Badge>
                            </div>
                          </>
                        )}
                        {menu.title === "Gestion de fortune" && (
                          <>
                            {/* Services Exclusifs Title */}
                            <div className="col-span-2 px-3 pt-2 pb-2">
                              <Badge className="bg-white dark:bg-white text-black dark:text-black text-[10px] px-2 py-0.5">
                                Services Exclusifs
                              </Badge>
                            </div>
                          </>
                        )}
                        {menu.title === "Placements" && (
                          <>
                            {/* Supports d&apos;investissement Title */}
                            <div className="col-span-2 px-3 pt-2 pb-2">
                              <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                Supports d&apos;investissement
                              </Badge>
                            </div>
                          </>
                        )}
                        {menu.title === "Investissements" && (
                          <>
                            {/* Investissement Immobilier Title */}
                            <div className="col-span-2 px-3 pt-2 pb-2">
                              <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                Immobilier
                              </Badge>
                            </div>
                          </>
                        )}
                        {menu.title === "Financements" && (
                          <>
                            {/* Crédits immobiliers Title */}
                            <div className="col-span-2 px-3 pt-2 pb-2">
                              <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                Crédits immobiliers
                              </Badge>
                            </div>
                          </>
                        )}
                        {menu.title === "Assurances / Prévoyance" && (
                          <>
                            {/* Assurances Crédit & Santé Title */}
                            <div className="col-span-2 px-3 pt-2 pb-2">
                              <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                Assurances Crédit & Santé
                              </Badge>
                            </div>
                          </>
                        )}
                        {menu.items.map((item, index) => {
                          const ItemIcon = item.icon

                          // Add section titles for Gestion de fortune menu
                          const showProduitsExclusifs = menu.title === "Gestion de fortune" && index === 6
                          // Add Financial section title for défiscalisation menu
                          const showFinancialTitle = menu.title === "Défiscalisation" && index === 5
                          // Add Financial section title for investissements menu
                          const showFinancialInvestTitle = menu.title === "Investissements" && index === 4
                          // Add Produits section title for placements menu
                          const showProduitsTitle = menu.title === "Placements" && index === 6
                          // Add section titles for financements menu
                          const showCreditsSpecialises = menu.title === "Financements" && index === 5
                          const showCreditsRestructuration = menu.title === "Financements" && index === 7
                          const showCreditsSpecifiques = menu.title === "Financements" && index === 9
                          // Add section titles for assurances menu
                          const showAssurancesMobilite = menu.title === "Assurances / Prévoyance" && index === 4
                          const showAssurancesDeces = menu.title === "Assurances / Prévoyance" && index === 8
                          const showAssurancesImmo = menu.title === "Assurances / Prévoyance" && index === 11
                          const showAssurancesSpecifiques = menu.title === "Assurances / Prévoyance" && index === 13

                          return (
                            <React.Fragment key={item.href}>
                              {showProduitsExclusifs && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-white dark:bg-white text-black dark:text-black text-[10px] px-2 py-0.5">
                                    Produits Exclusifs
                                  </Badge>
                                </div>
                              )}
                              {showFinancialTitle && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Défiscalisation Financière
                                  </Badge>
                                </div>
                              )}
                              {showFinancialInvestTitle && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Financier
                                  </Badge>
                                </div>
                              )}
                              {showProduitsTitle && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Produits
                                  </Badge>
                                </div>
                              )}
                              {showCreditsSpecialises && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Crédits spécialisés
                                  </Badge>
                                </div>
                              )}
                              {showCreditsRestructuration && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Crédits de restructuration
                                  </Badge>
                                </div>
                              )}
                              {showCreditsSpecifiques && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Crédits spécifiques
                                  </Badge>
                                </div>
                              )}
                              {showAssurancesMobilite && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Assurances Mobilité & Habitation
                                  </Badge>
                                </div>
                              )}
                              {showAssurancesDeces && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Assurances Décès & Prévoyance
                                  </Badge>
                                </div>
                              )}
                              {showAssurancesImmo && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Assurances Immobilier
                                  </Badge>
                                </div>
                              )}
                              {showAssurancesSpecifiques && (
                                <div className="col-span-2 px-3 pt-4 pb-2">
                                  <Badge className="bg-black text-white dark:bg-white dark:text-black text-[10px] px-2 py-0.5">
                                    Assurances Spécifiques
                                  </Badge>
                                </div>
                              )}
                              <DropdownMenuItem className="p-0" asChild>
                                <Link
                                  href={item.href}
                                  className={isGestionFortune
                                    ? "group relative flex items-start gap-3 px-3 py-3 rounded-lg hover:!bg-white dark:hover:!bg-white transition-all duration-300 hover:shadow-sm w-full"
                                    : "group relative flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-all duration-300 hover:shadow-sm w-full"
                                  }
                                >
                              {/* Icon with modern animations */}
                              <div className="relative mt-0.5">
                                {/* Icon glow effect */}
                                <div className={isGestionFortune
                                  ? "absolute inset-0 rounded-full opacity-0"
                                  : "absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                                } />

                                {/* Icon container with rotation and scale */}
                                <div className={isGestionFortune
                                  ? "relative transform transition-all duration-300 group-hover:scale-110"
                                  : "relative transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:animate-pulse"
                                }>
                                  <ItemIcon className={isGestionFortune
                                    ? "h-4 w-4 text-gray-400 group-hover:!text-black dark:text-gray-400 dark:group-hover:!text-black transition-colors duration-300"
                                    : "h-4 w-4 text-gray-500 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white transition-colors duration-300"
                                  } />
                                </div>
                              </div>

                              {/* Text content with slide animation */}
                              <div className="flex-1 transform transition-transform duration-300 group-hover:translate-x-1">
                                <p className={isGestionFortune
                                  ? "text-sm font-medium mb-1 text-gray-100 group-hover:!text-black dark:text-gray-100 dark:group-hover:!text-black transition-colors duration-300"
                                  : "text-sm font-medium mb-1 text-gray-700 group-hover:text-black dark:text-gray-300 dark:group-hover:text-white transition-colors duration-300"
                                }>
                                  {item.name}
                                </p>
                                <p className={isGestionFortune
                                  ? "text-xs text-gray-400 dark:text-gray-400 group-hover:!text-gray-700 dark:group-hover:!text-gray-700 transition-colors duration-300"
                                  : "text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300"
                                }>
                                  {item.description}
                                </p>
                              </div>
                              
                              {/* Arrow that appears on hover */}
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <ChevronDown className={isGestionFortune ? "h-3 w-3 text-gray-400 group-hover:!text-black -rotate-90" : "h-3 w-3 text-gray-400 -rotate-90"} />
                              </div>
                                </Link>
                              </DropdownMenuItem>
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </div>

                    {/* Right side - Promotional section */}
                    <div className={isGestionFortune
                      ? "w-[280px] bg-black dark:bg-black p-6 border-l border-neutral-100"
                      : "w-[280px] bg-gray-50 dark:bg-card/50 p-6 border-l"
                    }>
                      <div className="h-full flex flex-col">
                        <div className="rounded-lg overflow-hidden mb-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop"
                            alt="Consultation gratuite"
                            className="w-full h-32 object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={isGestionFortune
                              ? "bg-yellow-500 text-black text-[10px] px-2 py-0.5"
                              : "text-[10px] px-2 py-0.5"
                            } variant={isGestionFortune ? "default" : "secondary"}>
                              <Star className="h-3 w-3 mr-1" />
                              Exclusif
                            </Badge>
                            <Badge className={isGestionFortune
                              ? "border-gray-600 text-gray-300 text-[10px] px-2 py-0.5"
                              : "text-[10px] px-2 py-0.5"
                            } variant="outline">
                              100% Gratuit
                            </Badge>
                          </div>

                          <h4 className={isGestionFortune
                            ? "font-semibold text-sm mb-2 text-white dark:text-white"
                            : "font-semibold text-sm mb-2"
                          }>Rendez-vous Bilan Patrimonial 360° - Elite Patrimoine</h4>
                          <p className={isGestionFortune
                            ? "text-xs text-gray-400 dark:text-gray-400 mb-3"
                            : "text-xs text-muted-foreground mb-3"
                          }>
                            Bénéficiez d&apos;une analyse complète de votre situation et recevez des recommandations personnalisées
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className={isGestionFortune
                              ? "flex items-center gap-2 text-[10px] text-gray-300 dark:text-gray-300"
                              : "flex items-center gap-2 text-[10px]"
                            }>
                              <Clock className={isGestionFortune
                                ? "h-3 w-3 text-gray-500 dark:text-gray-500"
                                : "h-3 w-3 text-muted-foreground"
                              } />
                              <span>Entretien de 1 heure</span>
                            </div>
                            <div className={isGestionFortune
                              ? "flex items-center gap-2 text-[10px] text-gray-300 dark:text-gray-300"
                              : "flex items-center gap-2 text-[10px]"
                            }>
                              <CheckCircle className={isGestionFortune
                                ? "h-3 w-3 text-gray-500 dark:text-gray-500"
                                : "h-3 w-3 text-muted-foreground"
                              } />
                              <span>Sans engagement</span>
                            </div>
                            <div className={isGestionFortune
                              ? "flex items-center gap-2 text-[10px] text-gray-300 dark:text-gray-300"
                              : "flex items-center gap-2 text-[10px]"
                            }>
                              <Users className={isGestionFortune
                                ? "h-3 w-3 text-gray-500 dark:text-gray-500"
                                : "h-3 w-3 text-muted-foreground"
                              } />
                              <span>Par visioconférence ou en présentiel</span>
                            </div>
                          </div>
                        </div>
                        <Link
                          href="/bilan-gratuit"
                          className={isGestionFortune
                            ? "inline-flex items-center justify-center w-full px-4 py-2 bg-white hover:bg-gray-200 dark:bg-white dark:hover:bg-gray-200 text-black dark:text-black text-sm font-medium rounded-lg transition-colors"
                            : "inline-flex items-center justify-center w-full px-4 py-2 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black text-sm font-medium rounded-lg transition-colors"
                          }>
                          Réserver mon créneau
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
                )
              })}
            </div>

            {/* Right aligned Gestion de fortune */}
            {menuItems.filter(menu => menu.title === "Gestion de fortune").map((menu) => {
              const Icon = menu.icon
              const isGestionFortune = true
              return (
                <DropdownMenu key={menu.title} modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 px-3 text-[11px] font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-white group relative data-[state=open]:bg-black dark:data-[state=open]:bg-white transition-all duration-200 rounded-md border border-black dark:border-white overflow-hidden"
                    >
                      {isGestionFortune && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-black/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                          </div>
                        </>
                      )}
                      <Icon className="mr-1 h-3.5 w-3.5 flex-shrink-0 text-white dark:text-black relative z-10" />
                      <span className="tracking-wide relative z-10 text-white dark:text-black">{menu.title}</span>
                      <ChevronDown className="ml-0.5 h-2.5 w-2.5 flex-shrink-0 text-white dark:text-black relative z-10 transition-all duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[900px] max-w-[calc(100vw-2rem)] p-0 border-0 shadow-2xl bg-black dark:bg-gray-950"
                    align="end"
                    sideOffset={8}
                    collisionPadding={20}
                    alignOffset={0}
                  >
                    <div className="flex">
                      {/* Left side - Menu items */}
                      <div className="flex-1 p-6 bg-black">
                        {/* Header */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-sm border border-gray-700">
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white">{menu.title}</h3>
                                <p className="text-sm text-gray-400">{menu.description}</p>
                              </div>
                            </div>
                            {menu.badge && (
                              <Badge className="bg-white dark:bg-white text-black dark:text-black border-0 animate-pulse">
                                {menu.badge}
                              </Badge>
                            )}
                          </div>
                          <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-gray-700 to-transparent h-px" />
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-2 gap-1">
                          {/* Services Exclusifs Title */}
                          <div className="col-span-2 px-3 pt-2 pb-2">
                            <Badge className="bg-white dark:bg-white text-black dark:text-black text-[10px] px-2 py-0.5">
                              Services Exclusifs
                            </Badge>
                          </div>

                          {menu.items.map((item, index) => {
                            const ItemIcon = item.icon
                            const showProduitsExclusifs = index === 6

                            return (
                              <React.Fragment key={item.href}>
                                {showProduitsExclusifs && (
                                  <div className="col-span-2 px-3 pt-4 pb-2">
                                    <Badge className="bg-white dark:bg-white text-black dark:text-black text-[10px] px-2 py-0.5">
                                      Produits Exclusifs
                                    </Badge>
                                  </div>
                                )}
                                <DropdownMenuItem className="p-0" asChild>
                                  <Link
                                    href={item.href}
                                    className="group relative flex items-start gap-3 px-3 py-3 rounded-lg hover:!bg-white dark:hover:!bg-white transition-all duration-300 hover:shadow-sm w-full"
                                  >
                                    <div className="relative mt-0.5">
                                      <div className="relative transform transition-all duration-300 group-hover:scale-110">
                                        <ItemIcon className="h-4 w-4 text-gray-400 group-hover:!text-black dark:text-gray-400 dark:group-hover:!text-black transition-colors duration-300" />
                                      </div>
                                    </div>
                                    <div className="flex-1 transform transition-transform duration-300 group-hover:translate-x-1">
                                      <p className="text-sm font-medium mb-1 text-gray-100 group-hover:!text-black dark:text-gray-100 dark:group-hover:!text-black transition-colors duration-300">
                                        {item.name}
                                      </p>
                                      <p className="text-xs text-gray-400 dark:text-gray-400 group-hover:!text-gray-700 dark:group-hover:!text-gray-700 transition-colors duration-300">
                                        {item.description}
                                      </p>
                                    </div>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                      <ChevronDown className="h-3 w-3 text-gray-400 group-hover:!text-black -rotate-90" />
                                    </div>
                                  </Link>
                                </DropdownMenuItem>
                              </React.Fragment>
                            )
                          })}
                        </div>
                      </div>

                      {/* Right side - Promotional section */}
                      <div className="w-[280px] bg-black dark:bg-black p-6 border-l border-neutral-100">
                        <div className="h-full flex flex-col">
                          <div className="rounded-lg overflow-hidden mb-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop"
                              alt="Consultation gratuite"
                              className="w-full h-32 object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className="bg-yellow-500 text-black text-[10px] px-2 py-0.5" variant="default">
                                <Star className="h-3 w-3 mr-1" />
                                Exclusif
                              </Badge>
                              <Badge className="border-gray-600 text-gray-300 text-[10px] px-2 py-0.5" variant="outline">
                                100% Gratuit
                              </Badge>
                            </div>

                            <h4 className="font-semibold text-sm mb-2 text-white dark:text-white">Rendez-vous Bilan Patrimonial 360° - Elite Patrimoine</h4>
                            <p className="text-xs text-gray-400 dark:text-gray-400 mb-3">
                              Bénéficiez d&apos;une analyse complète de votre situation et recevez des recommandations personnalisées
                            </p>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-[10px] text-gray-300 dark:text-gray-300">
                                <Clock className="h-3 w-3 text-gray-500 dark:text-gray-500" />
                                <span>Entretien de 1 heure</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-gray-300 dark:text-gray-300">
                                <CheckCircle className="h-3 w-3 text-gray-500 dark:text-gray-500" />
                                <span>Sans engagement</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-gray-300 dark:text-gray-300">
                                <Users className="h-3 w-3 text-gray-500 dark:text-gray-500" />
                                <span>Par visioconférence ou en présentiel</span>
                              </div>
                            </div>
                          </div>
                          <Link
                            href="/bilan-gratuit"
                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-white hover:bg-gray-200 dark:bg-white dark:hover:bg-gray-200 text-black dark:text-black text-sm font-medium rounded-lg transition-colors"
                          >
                            Réserver mon créneau
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
