"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"
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
  Trees,
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
  Diamond,
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
  Handshake,
  Calculator,
  Sparkles,
  FileText,
  LineChart,
  Bed,
  BedDouble,
  Hammer,
  HardHat,
  Wrench,
  RotateCw,
  Crown,
  LandPlot,
  MapPin,
  Lightbulb,
  Rocket,
  Microscope,
  Bitcoin,
  Coins as CoinsIcon,
  Pill,
  UserCheck,
  UsersRound,
  FileCheck,
  Split,
  GitBranch,
  HomeIcon,
  HandshakeIcon,
  Scroll,
  ShieldHalf,
  CreditCardIcon,
  PiggyBankIcon,
  WalletCards,
  TrendingUpIcon,
  BriefcaseBusiness,
  BanknotesIcon,
  HandCoinsIcon,
  Receipt as ReceiptIcon,
  Landmark as LandmarkIcon,
  University,
  GavelIcon,
  ScaleIcon,
  KeySquare,
  Building as BuildingIcon,
  HotelIcon
} from "lucide-react"

// Liste des produits par catégorie avec descriptions et images (issus du header)
const products = [
  // Défiscalisation Immobilière
  {
    category: "Défiscalisation",
    name: "LMNP / LMP",
    icon: BedDouble,
    description: "Location meublée, amortissement du bien",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758288342956-816b7970bc1f5f7d-medium.webp"
  },
  {
    category: "Défiscalisation",
    name: "Déficit Foncier",
    icon: Wrench,
    description: "Déduction des travaux sur vos revenus",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758288844577-b3a23a0166725c5e-medium.webp"
  },
  {
    category: "Défiscalisation",
    name: "Denormandie",
    icon: Hammer,
    description: "Rénovation dans l'ancien",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758289027187-63321999a16cbf62-medium.webp"
  },
  {
    category: "Défiscalisation",
    name: "Loi Malraux",
    icon: Castle,
    description: "Restauration immobilière",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758289262946-f411b41fd1106990-medium.webp"
  },
  {
    category: "Défiscalisation",
    name: "Monument Historique",
    icon: LandmarkIcon,
    description: "100% des travaux déductibles",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758289633932-8973ca050b7da0f7-medium.webp"
  },

  // Défiscalisation Financière
  {
    category: "Défiscalisation",
    name: "PER",
    icon: PiggyBankIcon,
    description: "Plan Épargne Retraite déductible",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758289747413-cb6f1932f1a4b715-medium.webp"
  },
  {
    category: "Défiscalisation",
    name: "Girardin Industriel",
    icon: Palmtree,
    description: "Investissement en Outre-mer",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758290053810-ea767bd276acaadb-medium.webp"
  },
  {
    category: "Défiscalisation",
    name: "FCPI",
    icon: Lightbulb,
    description: "Innovation et PME, jusqu'à 25%",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758290153154-90174055383336de-medium.webp"
  },

  // Investissements - Immobilier
  {
    category: "Investissements",
    name: "Hagnéré Investissement",
    icon: Crown,
    description: "Notre solution exclusive",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758290325402-93753a1df4128749-medium.webp"
  },
  {
    category: "Investissements",
    name: "SCPI Européenne",
    icon: BuildingIcon,
    description: "Immobilier européen diversifié",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758311674132-35497dfbadc480b7-medium.webp"
  },
  {
    category: "Investissements",
    name: "Nue-Propriété",
    icon: Key,
    description: "Décote de 20 à 40%",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758546952137-91671a96a60892c2.webp"
  },
  {
    category: "Investissements",
    name: "Viager",
    icon: Users,
    description: "Investissement éthique",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758546389223-9a7d8e6f7b5c4a3e.webp"
  },
  // Investissements - Financier
  {
    category: "Investissements",
    name: "Groupements Forestiers",
    icon: Trees,
    description: "Réduction IFI",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758290089811-6582cad967ac828c-medium.webp"
  },
  {
    category: "Investissements",
    name: "Cheptel Bovin",
    icon: PiggyBank,
    description: "Investissement agricole",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758545846278-e13bcaf310e7b378.webp"
  },

  // Placements
  {
    category: "Assurances / Prévoyance",
    name: "Assurance-vie",
    icon: Shield,
    description: "Support d'épargne privilégié",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312131364-61e855e863f8c5e8-medium.webp"
  },
  {
    category: "Gestion de fortune",
    name: "Assurance-vie Luxembourgeoise",
    icon: Crown,
    description: "Haut de gamme international",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312372504-56e1aa5e967ead53-medium.webp"
  },
  {
    category: "Placements",
    name: "Contrat de capitalisation",
    icon: CoinsIcon,
    description: "Optimisation fiscale",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312542466-87876bec83e68fdc-medium.webp"
  },
  {
    category: "Placements",
    name: "Contrat de capitalisation (personne morale)",
    icon: BriefcaseBusiness,
    description: "Pour les sociétés",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312917480-effcf004ac02d0bb-medium.webp"
  },
  {
    category: "Assurances / Prévoyance",
    name: "Plan Épargne Retraite (PER)",
    icon: RotateCw,
    description: "Préparer sa retraite",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758313771620-40578957581e81a9-medium.webp"
  },

  // Épargne & Placements
  {
    category: "Placements",
    name: "PEA & Compte-Titres",
    icon: LineChart,
    description: "Investissement en bourse",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758314084104-bb6792e363cba6a3-medium.webp"
  },
  {
    category: "Placements",
    name: "Livrets & Épargne",
    icon: PiggyBank,
    description: "Solutions court terme",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758314708988-fa1408f8e444d016.webp"
  },
  {
    category: "Gestion de fortune",
    name: "Private Equity",
    icon: Diamond,
    description: "Investissement non coté",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758318349030-38e581dbc2b4b6fa.webp"
  },
  {
    category: "Placements",
    name: "Produits Structurés",
    icon: Zap,
    description: "Protection du capital",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758316559295-6836eb2b274e6653.webp"
  },
  {
    category: "Placements",
    name: "Cryptomonnaies",
    icon: Bitcoin,
    description: "Actifs numériques",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758318388066-3ee7934313a17881.webp"
  },

  // Retraite & Prévoyance
  {
    category: "Assurances / Prévoyance",
    name: "Contrats Madelin",
    icon: BriefcaseBusiness,
    description: "TNS et professions libérales",
    image: "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances / Prévoyance",
    name: "Prévoyance",
    icon: Umbrella,
    description: "Protection famille",
    image: "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances / Prévoyance",
    name: "Mutuelle Santé",
    icon: HeartPulse,
    description: "Complémentaire santé",
    image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?w=400&h=250&fit=crop"
  },

  // Transmission & Succession
  {
    category: "Gestion de fortune",
    name: "Donation",
    icon: Gift,
    description: "Transmission anticipée",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Gestion de fortune",
    name: "Démembrement",
    icon: Split,
    description: "Usufruit et nue-propriété",
    image: "https://images.pexels.com/photos/8111862/pexels-photo-8111862.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Gestion de fortune",
    name: "SCI Familiale",
    icon: UsersRound,
    description: "Gestion immobilière familiale",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Gestion de fortune",
    name: "Pacte Dutreil",
    icon: HandshakeIcon,
    description: "Transmission d'entreprise",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Gestion de fortune",
    name: "Testament & Succession",
    icon: Scroll,
    description: "Préparation successorale",
    image: "https://images.pexels.com/photos/4427957/pexels-photo-4427957.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Gestion de fortune",
    name: "Protection du Conjoint",
    icon: ShieldHalf,
    description: "Régimes matrimoniaux",
    image: "https://images.pexels.com/photos/6669864/pexels-photo-6669864.jpeg?w=400&h=250&fit=crop"
  },

  // Financements
  {
    category: "Financements",
    name: "Résidence principale",
    icon: HomeIcon,
    description: "Financement de votre habitation",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Résidence secondaire",
    icon: Palmtree,
    description: "Financement maison de vacances",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Prêt immobilier locatif",
    icon: Key,
    description: "Investissement locatif",
    image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Financement de SCPI",
    icon: BarChart3,
    description: "Crédit pour parts de SCPI",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Prêt Hypothécaire",
    icon: KeySquare,
    description: "Garantie sur bien immobilier",
    image: "https://images.pexels.com/photos/4246161/pexels-photo-4246161.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Crédit Lombard",
    icon: Vault,
    description: "Prêt sur portefeuille titres",
    image: "https://images.pexels.com/photos/7821713/pexels-photo-7821713.jpeg?w=400&h=250&fit=crop"
  },

]

export function ProductsGrid() {
  const [currentPage, setCurrentPage] = React.useState(0)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>(["Défiscalisation"])

  // Categories in header order with icons
  const mainCategories = [
    { name: "Défiscalisation", icon: PiggyBank },
    { name: "Placements", icon: LineChart },
    { name: "Investissements", icon: Building2 },
    { name: "Financements", icon: TrendingUp },
    { name: "Assurances / Prévoyance", icon: Shield },
    { name: "Gestion de fortune", icon: Gift }
  ]

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
          {mainCategories.map((category) => {
            const Icon = category.icon
            return (
              <Badge
                key={category.name}
                variant={selectedFilters.includes(category.name) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer flex items-center gap-1",
                  selectedFilters.includes(category.name)
                    ? "bg-black text-white hover:bg-gray-800"
                    : "hover:bg-gray-100"
                )}
                onClick={() => {
                  if (selectedFilters.includes(category.name)) {
                    // Ne pas permettre de décocher si c'est le dernier filtre sélectionné
                    if (selectedFilters.length > 1) {
                      setSelectedFilters(selectedFilters.filter(f => f !== category.name))
                    }
                  } else {
                    setSelectedFilters([...selectedFilters, category.name])
                  }
                }}
              >
                <Icon className="h-3 w-3" />
                {category.name}
              </Badge>
            )
          })}
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
              {/* Image container with 16:9 aspect ratio for SEO and performance */}
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                {/* Optimized Next.js Image with WebP conversion */}
                <Image
                  src={product.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop"}
                  alt={`${product.name} - ${product.description || 'Solution patrimoniale Hagnéré'}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  priority={index < 4} // Priority loading for first 4 images
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                />
                
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
                
                {/* Centered Icon with glass morphism effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="h-7 w-7 text-gray-800 dark:text-white" />
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