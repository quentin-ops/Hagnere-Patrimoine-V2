"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Home,
  PiggyBank,
  Building2,
  Gift,
  Shield,
  Landmark,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Search,
  Filter,
  TreePine,
  Scale,
  Coins,
  Receipt,
  Percent,
  ScrollText,
  CreditCard,
  TrendingUp,
  Building,
  Hotel,
  Factory,
  Store,
  Users,
  FileSignature,
  Lock,
  Key,
  ShieldCheck,
  ShieldAlert,
  Umbrella,
  HeartHandshake,
  LifeBuoy,
  Hospital,
  Gem,
  Banknote,
  HandCoins,
  Palmtree,
  Mountain,
  Castle,
  Euro,
  DollarSign,
  PoundSterling,
  CircleDollarSign,
  BadgeEuro,
  Vault,
  Anchor,
  Ship,
  Plane,
  Globe,
  Map,
  BookOpen,
  GraduationCap,
  Baby,
  UserPlus,
  HeartPulse,
  Stethoscope,
  Activity,
  Zap,
  Palette,
  BarChart3,
  Heart,
  Handshake
} from "lucide-react"

// Liste des produits par catégorie avec descriptions et images (issus du header)
const products = [
  // Défiscalisation Immobilière
  {
    category: "Défiscalisation",
    name: "LMNP / LMP",
    icon: Building2,
    description: "Location meublée, amortissement du bien",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Déficit Foncier",
    icon: Receipt,
    description: "Déduction des travaux sur vos revenus",
    image: "https://images.pexels.com/photos/209266/pexels-photo-209266.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Pinel",
    icon: Home,
    description: "Investissement neuf, jusqu'à 21%",
    image: "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Censi-Bouvard",
    icon: Building2,
    description: "Résidences services, jusqu'à 11%",
    image: "https://images.pexels.com/photos/3825752/pexels-photo-3825752.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Denormandie",
    icon: Home,
    description: "Rénovation dans l'ancien",
    image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Loi Malraux",
    icon: Castle,
    description: "Restauration immobilière",
    image: "https://images.pexels.com/photos/208674/pexels-photo-208674.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Monument Historique",
    icon: Landmark,
    description: "100% des travaux déductibles",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?w=400&h=250&fit=crop"
  },

  // Défiscalisation Financière
  {
    category: "Défiscalisation",
    name: "PER",
    icon: Wallet,
    description: "Plan Épargne Retraite déductible",
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Girardin Industriel",
    icon: TrendingUp,
    description: "Investissement en Outre-mer",
    image: "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "Groupements Forestiers",
    icon: TreePine,
    description: "Réduction d'impôt et IFI",
    image: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Défiscalisation",
    name: "FCPI / FIP",
    icon: BarChart3,
    description: "Innovation et PME, jusqu'à 25%",
    image: "https://images.pexels.com/photos/7567565/pexels-photo-7567565.jpeg?w=400&h=250&fit=crop"
  },

  // Investissement Immobilier
  {
    category: "Investissement Immobilier",
    name: "Hagnéré Investissement",
    icon: Building2,
    description: "Notre solution clé en main",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Investissement Immobilier",
    name: "Résidences Services",
    icon: Home,
    description: "EHPAD, étudiantes, tourisme",
    image: "https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Investissement Immobilier",
    name: "SCPI",
    icon: BarChart3,
    description: "Pierre papier diversifiée",
    image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?w=400&h=250&fit=crop"
  },

  // Placements
  {
    category: "Placements",
    name: "Assurance-vie",
    icon: Heart,
    description: "Support d'épargne privilégié",
    image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Placements",
    name: "Assurance-vie Luxembourgeoise",
    icon: Shield,
    description: "Haut de gamme international",
    image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Placements",
    name: "Contrat de capitalisation",
    icon: TrendingUp,
    description: "Optimisation fiscale",
    image: "https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Placements",
    name: "Contrat de capitalisation (personne morale)",
    icon: Building2,
    description: "Pour les sociétés",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Placements",
    name: "Plan Épargne Retraite (PER)",
    icon: Wallet,
    description: "Préparer sa retraite",
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?w=400&h=250&fit=crop"
  },

  // Épargne & Placements
  {
    category: "Épargne & Placements",
    name: "PEA & Compte-Titres",
    icon: BarChart3,
    description: "Investissement en bourse",
    image: "https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Épargne & Placements",
    name: "Livrets & Épargne",
    icon: BookOpen,
    description: "Solutions court terme",
    image: "https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Épargne & Placements",
    name: "Private Equity",
    icon: Gem,
    description: "Investissement non coté",
    image: "https://images.pexels.com/photos/3833052/pexels-photo-3833052.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Épargne & Placements",
    name: "Produits Structurés",
    icon: Shield,
    description: "Protection du capital",
    image: "https://images.pexels.com/photos/5835276/pexels-photo-5835276.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Épargne & Placements",
    name: "Cryptomonnaies",
    icon: TrendingUp,
    description: "Actifs numériques",
    image: "https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg?w=400&h=250&fit=crop"
  },

  // Retraite & Prévoyance
  {
    category: "Retraite & Prévoyance",
    name: "PER Individuel",
    icon: Wallet,
    description: "Épargne retraite déductible",
    image: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Retraite & Prévoyance",
    name: "PER Entreprise",
    icon: Briefcase,
    description: "Solutions pour dirigeants",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Retraite & Prévoyance",
    name: "Contrats Madelin",
    icon: ScrollText,
    description: "TNS et professions libérales",
    image: "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Retraite & Prévoyance",
    name: "Prévoyance",
    icon: Shield,
    description: "Protection famille",
    image: "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Retraite & Prévoyance",
    name: "Mutuelle Santé",
    icon: Heart,
    description: "Complémentaire santé",
    image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Retraite & Prévoyance",
    name: "Dépendance",
    icon: HeartHandshake,
    description: "Perte d'autonomie",
    image: "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?w=400&h=250&fit=crop"
  },

  // Transmission & Succession
  {
    category: "Transmission & Succession",
    name: "Donation",
    icon: Gift,
    description: "Transmission anticipée",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Transmission & Succession",
    name: "Démembrement",
    icon: Scale,
    description: "Usufruit et nue-propriété",
    image: "https://images.pexels.com/photos/8111862/pexels-photo-8111862.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Transmission & Succession",
    name: "SCI Familiale",
    icon: Home,
    description: "Gestion immobilière familiale",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Transmission & Succession",
    name: "Pacte Dutreil",
    icon: Handshake,
    description: "Transmission d'entreprise",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Transmission & Succession",
    name: "Testament & Succession",
    icon: ScrollText,
    description: "Préparation successorale",
    image: "https://images.pexels.com/photos/4427957/pexels-photo-4427957.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Transmission & Succession",
    name: "Protection du Conjoint",
    icon: Shield,
    description: "Régimes matrimoniaux",
    image: "https://images.pexels.com/photos/6669864/pexels-photo-6669864.jpeg?w=400&h=250&fit=crop"
  },

  // Financements
  {
    category: "Financements",
    name: "Résidence principale",
    icon: Home,
    description: "Financement de votre habitation",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Résidence secondaire",
    icon: Home,
    description: "Financement maison de vacances",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Prêt immobilier locatif",
    icon: Building2,
    description: "Investissement locatif",
    image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Financement de SCPI",
    icon: Building2,
    description: "Crédit pour parts de SCPI",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Prêt Hypothécaire",
    icon: Home,
    description: "Garantie sur bien immobilier",
    image: "https://images.pexels.com/photos/4246161/pexels-photo-4246161.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Crédit Lombard",
    icon: Shield,
    description: "Prêt sur portefeuille titres",
    image: "https://images.pexels.com/photos/7821713/pexels-photo-7821713.jpeg?w=400&h=250&fit=crop"
  },

]

export function ProductsGrid() {
  const [currentPage, setCurrentPage] = React.useState(0)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([])

  // Get unique categories for filter badges
  const categories = Array.from(new Set(products.map(p => p.category)))

  // Filter products based on search and selected filters
  const filteredProducts = products.filter(product => {
    // Filter by selected categories
    if (selectedFilters.length > 0 && !selectedFilters.includes(product.category)) {
      return false
    }
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    }
    return true
  })

  const itemsPerPage = 8 // 4 cards per row x 2 rows
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const currentProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(0)
  }, [searchQuery, selectedFilters])

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Défiscalisation":
        return "text-blue-600 border-blue-600 bg-blue-50"
      case "Épargne & Retraite":
        return "text-green-600 border-green-600 bg-green-50"
      case "Immobilier":
        return "text-purple-600 border-purple-600 bg-purple-50"
      case "Transmission":
        return "text-orange-600 border-orange-600 bg-orange-50"
      case "Protection":
        return "text-red-600 border-red-600 bg-red-50"
      default:
        return "text-gray-600 border-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="relative w-full space-y-6">
      {/* Search and Filters Section */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Rechercher une solution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white border-gray-200"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge
            variant={selectedFilters.length === 0 ? "default" : "outline"}
            className={cn(
              "cursor-pointer",
              selectedFilters.length === 0
                ? "bg-black text-white hover:bg-gray-800"
                : "hover:bg-gray-100"
            )}
            onClick={() => setSelectedFilters([])}
          >
            <Filter className="mr-1 h-3 w-3" />
            Tous
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedFilters.includes(category) ? "default" : "outline"}
              className={cn(
                "cursor-pointer",
                selectedFilters.includes(category)
                  ? "bg-black text-white hover:bg-gray-800"
                  : "hover:bg-gray-100"
              )}
              onClick={() => {
                if (selectedFilters.includes(category)) {
                  setSelectedFilters(selectedFilters.filter(f => f !== category))
                } else {
                  setSelectedFilters([...selectedFilters, category])
                }
              }}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Products Grid Container */}
      <div className="relative">
        {/* Navigation arrows */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevPage}
          className="h-10 w-10 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          className="h-10 w-10 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Products Grid - 4 columns x 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product, index) => {
          const Icon = product.icon
          return (
            <div
              key={`${product.name}-${index}`}
              className={cn(
                "group relative bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border",
                "overflow-hidden transition-all duration-200",
                "hover:shadow-xl hover:-translate-y-1",
                "cursor-pointer"
              )}
            >
              {/* Image with blur effect and centered icon */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop"}
                  alt={product.name}
                  className="w-full h-full object-cover blur-[2px] group-hover:blur-none group-hover:scale-110 transition-all duration-500"
                />
                {/* Dark overlay for better icon visibility */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Centered Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-white/95 dark:bg-black/95 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="h-8 w-8 text-gray-800 dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Product Name */}
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {product.description || "Solution patrimoniale adaptée à vos besoins"}
                </p>

                {/* Category Badge */}
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    getCategoryColor(product.category)
                  )}
                >
                  {product.category}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>

        {/* Page Indicator */}
        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentPage === i
                  ? "bg-gray-900 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}