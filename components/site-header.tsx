"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeaderLogoLocal } from "@/components/logo-local"
import {
  Phone,
  Calendar,
  Mail,
  Sun,
  Moon,
  MessageSquare,
  UserPlus,
  LogIn,
  Building2,
  TrendingUp,
  Calculator,
  FileText,
  Briefcase,
  PiggyBank,
  Home,
  Shield,
  Menu,
  Sparkles,
  BarChart3,
  Wallet,
  Handshake,
  Globe,
  Heart,
  Gift,
  Crown,
  BookOpen,
  Scale,
  LineChart,
  Gem,
  HeartHandshake,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Hide header on admin pages
  if (pathname?.startsWith("/admin")) {
    return null
  }

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Contact Icons */}
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <HeaderLogoLocal />
            </Link>
            
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Se connecter */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
              >
                <a href="/connexion">
                  <LogIn className="h-4 w-4" />
                  <span className="sr-only">Se connecter</span>
                </a>
              </Button>

              {/* Séparateur */}
              <div className="mx-2 h-6 w-px bg-foreground/60" />

              {/* Contact Buttons */}
              <a href="tel:0374472018" className="inline-flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 text-xs gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5" />
                  03 74 47 20 18
                </Button>
              </a>

              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 px-2 text-xs gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-2 text-xs"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="ml-1.5">Chat AI</span>
              </Button>

              {/* Séparateur */}
              <div className="mx-2 h-6 w-px bg-foreground/60" />

              {/* Rendez-vous Button */}
              <Link href="/calendly">
                <Button
                  size="sm"
                  className="h-9 gap-1.5 px-3 text-xs bg-primary hover:bg-primary/90"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Rendez-vous gratuit
                </Button>
              </Link>

              {/* Séparateur */}
              <div className="mx-2 h-6 w-px bg-foreground/60" />

              {/* Theme Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group h-9 px-2 overflow-hidden transition-all duration-300 hover:px-3"
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 flex-shrink-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 flex-shrink-0" />
                    <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[60px] ml-1">
                      {theme === 'dark' ? 'Nuit' : theme === 'light' ? 'Jour' : 'Système'}
                    </span>
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Jour</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Nuit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Système</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Phone */}
            <a href="tel:0374472018">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Phone className="h-4 w-4" />
              </Button>
            </a>

            {/* AI Chat Mobile */}
            <Button 
              variant="outline" 
              size="icon"
              className="h-9 w-9 border-purple-500/20 hover:bg-purple-500/10"
            >
              <MessageSquare className="h-4 w-4 text-purple-500" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
                <div className="flex flex-col gap-4 mt-6">
                  {/* Mobile Services */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Notre galaxie de services
                    </h2>
                    {services.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <category.icon className={cn("h-4 w-4", category.color)} />
                          {category.category}
                        </div>
                        <div className="pl-6 space-y-1">
                          {category.isDouble && category.subcategories ? (
                            <>
                              {category.subcategories.map((subcategory) => (
                                <div key={subcategory.title} className="mb-3">
                                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                    {subcategory.title}
                                  </div>
                                  {subcategory.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="flex items-center gap-2 py-1.5 pl-2 text-sm hover:text-primary transition-colors"
                                    >
                                      <item.icon className="h-3 w-3 text-muted-foreground" />
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </>
                          ) : (
                            <>
                              {category.items?.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-colors"
                                >
                                  <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                  {item.name}
                                </Link>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Mobile Actions */}
                  <div className="space-y-2">
                    <Button className="w-full justify-start gap-2" asChild>
                      <Link
                        href="/calendly"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Calendar className="h-4 w-4" />
                        Prendre rendez-vous
                      </Link>
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-2" asChild>
                      <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Mail className="h-4 w-4" />
                        Contact
                      </Link>
                    </Button>

                    <a href="tel:0374472018" className="w-full">
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Phone className="h-4 w-4" />
                        03 74 47 20 18
                      </Button>
                    </a>
                  </div>

                  <Separator />

                  {/* Mobile Auth */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href="/connexion"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4" />
                        <span className="ml-2">Se connecter</span>
                      </Link>
                    </Button>

                    <Button
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href="/signup"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span className="ml-2">S&apos;inscrire</span>
                      </Link>
                    </Button>
                  </div>

                  <Separator />

                  {/* Mobile Theme Toggle */}
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-medium">Thème</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="h-8 w-8"
                    >
                      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
