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
  ShoppingBag,
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
  Car,
  Bike,
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
  HotelIcon,
  Calendar,
  ArrowRightLeft,
  Package,
  Newspaper,
  PlayCircle,
  Target,
  PieChart,
  Leaf,
  Beef
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
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758557657948-e4ee82b8d7161d67.webp"
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

  // Assurances - Nouvelle liste complète
  // Assurances Crédit & Santé
  {
    category: "Assurances",
    name: "Assurance emprunteur",
    icon: Shield,
    description: "Protection crédit",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Complémentaire Santé",
    icon: Heart,
    description: "Couverture santé optimale",
    image: "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Complémentaire santé expatriés",
    icon: Globe,
    description: "Santé internationale",
    image: "https://images.pexels.com/photos/3769146/pexels-photo-3769146.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Assurance voyage",
    icon: Plane,
    description: "Protection voyage",
    image: "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Gestion de fortune",
    name: "Assurance-vie Luxembourgeoise",
    icon: Crown,
    description: "Haut de gamme international",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312372504-56e1aa5e967ead53-medium.webp"
  },
  // Placements - Nouvelle liste simplifiée
  {
    category: "Placements",
    name: "Assurance-vie",
    icon: Shield,
    description: "Support privilégié d'épargne",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312131364-61e855e863f8c5e8-medium.webp"
  },
  {
    category: "Placements",
    name: "Assurance-vie Luxembourgeoise",
    icon: Crown,
    description: "Haut de gamme international",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312372504-56e1aa5e967ead53-medium.webp"
  },
  // Assurances Mobilité & Habitation
  {
    category: "Assurances",
    name: "Assurance habitation",
    icon: Home,
    description: "Protection du logement",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Assurance voiture",
    icon: Car,
    description: "Véhicule protégé",
    image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Assurance deux-roues et quad",
    icon: Bike,
    description: "Moto, scooter, quad",
    image: "https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Assurance Bateaux / Jet-Skis",
    icon: Anchor,
    description: "Navigation protégée",
    image: "https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?w=400&h=250&fit=crop"
  },

  {
    category: "Placements",
    name: "Contrat de capitalisation (IR/IS)",
    icon: HandCoins,
    description: "Transmission optimisée",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758312542466-87876bec83e68fdc-medium.webp"
  },
  {
    category: "Placements",
    name: "PER",
    icon: RotateCw,
    description: "Plan Épargne Retraite",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758313771620-40578957581e81a9-medium.webp"
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
    name: "PEA",
    icon: TrendingUp,
    description: "Actions européennes défiscalisées",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758314084104-bb6792e363cba6a3-medium.webp"
  },
  {
    category: "Placements",
    name: "Compte-Titres",
    icon: BriefcaseBusiness,
    description: "Investissement libre",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758314084104-bb6792e363cba6a3-medium.webp"
  },

  // Assurances Décès & Prévoyance
  {
    category: "Assurances",
    name: "Assurance décès",
    icon: Users,
    description: "Capital ou rente",
    image: "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Assurance obsèques",
    icon: Heart,
    description: "Frais funéraires",
    image: "https://images.pexels.com/photos/4427622/pexels-photo-4427622.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Garantie accident de la vie",
    icon: Shield,
    description: "Protection complète",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?w=400&h=250&fit=crop"
  },
  // Assurances Immobilier
  {
    category: "Assurances",
    name: "Assurance PNO",
    icon: Key,
    description: "Propriétaire non occupant",
    image: "https://images.pexels.com/photos/955793/pexels-photo-955793.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Assurances",
    name: "Assurance PNO Immeuble",
    icon: Building,
    description: "Immeuble de rapport",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=400&h=250&fit=crop"
  },
  // Assurances Spécifiques
  {
    category: "Assurances",
    name: "Assurance études internationales",
    icon: GraduationCap,
    description: "Protection étudiants",
    image: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?w=400&h=250&fit=crop"
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

  // Financements - Crédits Immobiliers
  {
    category: "Financements",
    name: "Prêt immobilier RP",
    icon: HomeIcon,
    description: "Résidence principale",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758555459222-967fadaa2e782b7e.webp"
  },
  {
    category: "Financements",
    name: "Prêt immobilier RS",
    icon: Palmtree,
    description: "Résidence secondaire",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758556327664-2cc9ad01743a2f9d.webp"
  },
  {
    category: "Financements",
    name: "Prêt immobilier locatif",
    icon: Key,
    description: "Bien destiné à la location",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758559748796-9bee8618834c5096.webp"
  },
  {
    category: "Financements",
    name: "Prêt relais",
    icon: RotateCw,
    description: "Avance en attendant la vente",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758558849478-5a6dfc89b7ee6751.webp"
  },
  {
    category: "Financements",
    name: "Prêt in fine",
    icon: Wallet,
    description: "Capital remboursé à la fin",
    image: "https://images.pexels.com/photos/4246161/pexels-photo-4246161.jpeg?w=400&h=250&fit=crop"
  },
  
  // Financements - Crédits Spécialisés
  {
    category: "Financements",
    name: "Crédit marchand de biens",
    icon: TrendingUp,
    description: "Achat, rénover, revendre",
    image: "https://images.pexels.com/photos/7821713/pexels-photo-7821713.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Crédit lombard",
    icon: Vault,
    description: "Sur portefeuille titres",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=400&h=250&fit=crop"
  },

  // Financements - Crédits de Restructuration
  {
    category: "Financements",
    name: "Rachat de crédits",
    icon: RotateCw,
    description: "Regroupement de prêts",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Crédit hypothécaire",
    icon: KeySquare,
    description: "Garanti par un bien immobilier",
    image: "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?w=400&h=250&fit=crop"
  },

  // Financements - Crédits Spécifiques
  {
    category: "Financements",
    name: "Prêt consommation",
    icon: ShoppingBag,
    description: "Biens, travaux, projets",
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Prêt viager hypothécaire",
    icon: Shield,
    description: "Pour séniors, liquidité sans vente",
    image: "https://images.pexels.com/photos/3824771/pexels-photo-3824771.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Financements",
    name: "Vente à réméré",
    icon: FileText,
    description: "Liquidité avec rachat possible",
    image: "https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?w=400&h=250&fit=crop"
  },

  // Rendez-vous
  {
    category: "Rendez-vous",
    name: "Bilan Patrimonial 360°",
    icon: PieChart,
    description: "Analyse complète gratuite",
    image: "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Rendez-vous",
    name: "Consultation Elite",
    icon: Crown,
    description: "Conseil haut de gamme",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Rendez-vous",
    name: "Stratégie 1h",
    icon: Lightbulb,
    description: "Session de travail d'1 heure",
    image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Rendez-vous",
    name: "Stratégies 2h",
    icon: Target,
    description: "Session approfondie de 2 heures",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Rendez-vous",
    name: "Hagnéré Investissement",
    icon: Briefcase,
    description: "Présentation opportunités exclusives",
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?w=400&h=250&fit=crop"
  },

  // Ressources
  {
    category: "Ressources",
    name: "Simulateurs",
    icon: Calculator,
    description: "Calculez vos économies d'impôts",
    image: "https://images.pexels.com/photos/6863255/pexels-photo-6863255.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Ressources",
    name: "Guides fiscaux",
    icon: BookOpen,
    description: "Guides pratiques téléchargeables",
    image: "https://images.pexels.com/photos/4560092/pexels-photo-4560092.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Ressources",
    name: "Webinaires",
    icon: Calendar,
    description: "Sessions live avec nos experts",
    image: "https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Ressources",
    name: "Actualités",
    icon: Newspaper,
    description: "Dernières actualités fiscales",
    image: "https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Ressources",
    name: "Vidéos",
    icon: PlayCircle,
    description: "Tutoriels et cas pratiques",
    image: "https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Ressources",
    name: "FAQ",
    icon: Search,
    description: "Réponses à vos questions",
    image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?w=400&h=250&fit=crop"
  },
  {
    category: "Ressources",
    name: "Témoignages",
    icon: Heart,
    description: "Retours d'expérience clients",
    image: "https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?w=400&h=250&fit=crop"
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
    { name: "Investissements", icon: TrendingUp },
    { name: "Financements", icon: CreditCard },
    { name: "Assurances", icon: Shield },
    { name: "Gestion de fortune", icon: Crown },
    { name: "Rendez-vous", icon: Calendar },
    { name: "Ressources", icon: BookOpen }
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
    <div className="relative w-full space-y-8">
      {/* Main decorative container with enhanced connection lines */}
      <div className="relative">
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-bl from-indigo-50/50 to-transparent dark:from-indigo-950/20 rounded-full blur-3xl" />
        </div>

        {/* Top decorative frame */}
        <div className="absolute -top-4 left-0 right-0 flex items-center justify-between">
          {/* Left corner decoration */}
          <div className="relative">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-700" />
            <div className="absolute right-0 top-0 w-2 h-2 border-t border-r border-gray-200 dark:border-gray-700 rounded-tr-sm" />
          </div>

          {/* Center top ornament */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-gray-200 dark:bg-gray-700" />
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
            <div className="w-8 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Right corner decoration */}
          <div className="relative">
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-700" />
            <div className="absolute left-0 top-0 w-2 h-2 border-t border-l border-gray-200 dark:border-gray-700 rounded-tl-sm" />
          </div>
        </div>

        {/* Search and Filters Section with enhanced styling */}
        <div className="relative space-y-6 py-10">
          {/* Side vertical lines */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-gray-200/50 dark:via-gray-700/50 to-transparent" />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-gray-200/50 dark:via-gray-700/50 to-transparent" />

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-4 h-4">
            <div className="absolute top-0 left-0 w-full h-px bg-gray-200 dark:bg-gray-700" />
            <div className="absolute top-0 left-0 w-px h-full bg-gray-200 dark:bg-gray-700" />
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4">
            <div className="absolute top-0 right-0 w-full h-px bg-gray-200 dark:bg-gray-700" />
            <div className="absolute top-0 right-0 w-px h-full bg-gray-200 dark:bg-gray-700" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
          </div>

          {/* Search Bar with enhanced connection design */}
          <div className="relative">
            {/* Connection lines to search */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-700" />
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-700" />
            </div>

            <div className="relative max-w-md mx-auto">
              {/* Search input with glass morphism effect */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
                <Input
                  type="text"
                  placeholder="Rechercher une solution..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative pl-10 pr-4 py-2 w-full bg-white/90 dark:bg-card/90 backdrop-blur-sm border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Enhanced connection bridge */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
            <div className="relative bg-white dark:bg-black px-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full" />
              </div>
            </div>
          </div>

          {/* Filter Badges with enhanced frame design */}
          <div className="relative">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 rounded-xl blur-sm opacity-50" />

            {/* Main frame with double border effect */}
            <div className="absolute inset-0 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl -z-10" />
            <div className="absolute inset-1 border border-gray-100 dark:border-gray-800 rounded-lg -z-10" />

            {/* Enhanced corner decorations */}
            <div className="absolute -top-2 -left-2 w-4 h-4">
              <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-gray-400 dark:border-gray-500 rounded-tl" />
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4">
              <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-gray-400 dark:border-gray-500 rounded-tr" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4">
              <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-gray-400 dark:border-gray-500 rounded-bl" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4">
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-gray-400 dark:border-gray-500 rounded-br" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" />
            </div>

            <div className="flex flex-wrap justify-center gap-2 p-4">
              {mainCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <div key={category.name} className="relative">
                    {/* Connector dots between badges */}
                    {index < mainCategories.length - 1 && (
                      <div className="absolute top-1/2 -right-3 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 -translate-y-1/2 z-10" />
                    )}
                    <Badge
                      variant={selectedFilters.includes(category.name) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer flex items-center gap-1 relative",
                        selectedFilters.includes(category.name)
                          ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={() => {
                        if (selectedFilters.includes(category.name)) {
                          return
                        } else {
                          setSelectedFilters([category.name])
                        }
                      }}
                    >
                      <Icon className="h-3 w-3" />
                      {category.name}
                    </Badge>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom connecting line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gray-200 dark:from-gray-700 to-transparent" />
        </div>
      </div>

      {/* Products Grid Container with enhanced connection lines */}
      <div className="relative mt-8">
        {/* Connection from filters to grid */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-gray-200 dark:from-gray-700 to-transparent" />

        {/* Enhanced grid frame with multiple layers */}
        <div className="absolute -inset-4 pointer-events-none">
          {/* Outer decorative frame */}
          <div className="absolute inset-4 border border-gray-100/50 dark:border-gray-800/50 rounded-2xl" />

          {/* Corner brackets with enhanced design */}
          <div className="absolute top-4 left-4 w-12 h-12">
            <div className="absolute inset-0 border-l-2 border-t-2 border-gray-300 dark:border-gray-600 rounded-tl-xl" />
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-600 rounded-full opacity-70" />
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute top-4 right-4 w-12 h-12">
            <div className="absolute inset-0 border-r-2 border-t-2 border-gray-300 dark:border-gray-600 rounded-tr-xl" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-bl from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-600 rounded-full opacity-70" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4 w-12 h-12">
            <div className="absolute inset-0 border-l-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-bl-xl" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-tr from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-600 rounded-full opacity-70" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse" />
          </div>
          <div className="absolute bottom-4 right-4 w-12 h-12">
            <div className="absolute inset-0 border-r-2 border-b-2 border-gray-300 dark:border-gray-600 rounded-br-xl" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-tl from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-600 rounded-full opacity-70" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse" />
          </div>

          {/* Cross-hair connections at midpoints */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-px h-3 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600" />
            <div className="w-px h-3 bg-gradient-to-t from-gray-300 to-transparent dark:from-gray-600" />
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-3 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600" />
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
            <div className="w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full border border-gray-300 dark:border-gray-600" />
            <div className="w-3 h-px bg-gradient-to-l from-gray-300 to-transparent dark:from-gray-600" />
          </div>

          {/* Decorative grid lines */}
          <div className="absolute top-1/3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-800 to-transparent opacity-50" />
          <div className="absolute top-2/3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-100 dark:via-gray-800 to-transparent opacity-50" />
          <div className="absolute left-1/4 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gray-100 dark:via-gray-800 to-transparent opacity-50" />
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gray-100 dark:via-gray-800 to-transparent opacity-50" />
          <div className="absolute left-3/4 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gray-100 dark:via-gray-800 to-transparent opacity-50" />
        </div>

        {/* Products Grid - 4 columns x 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 relative z-10">
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
      </div>

      {/* Navigation Controls with connection lines */}
      <div className="relative mt-12">
        {/* Connection line from grid to navigation */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-gray-200 dark:from-gray-700 to-transparent" />

        {/* Navigation container with frame */}
        <div className="relative inline-flex items-center justify-center gap-4 mx-auto w-full">
          {/* Background connection line */}
          <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-px bg-gray-200 dark:bg-gray-700" />

          {/* Previous Button with connection */}
          <div className="relative">
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-px bg-gray-200 dark:bg-gray-700" />
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              className="h-10 w-10 rounded-full bg-white dark:bg-card shadow-lg border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-gray-900 relative z-10"
              disabled={filteredProducts.length === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Page Indicator with frame */}
          <div className="relative px-8">
            {/* Frame around indicators */}
            <div className="absolute inset-0 border border-gray-100 dark:border-gray-800 rounded-full -z-10" />

            {/* Connection dots */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />

            <div className="flex items-center gap-1 px-4 py-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all relative",
                    currentPage === i
                      ? "bg-gray-900 dark:bg-white w-6"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  )}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Next Button with connection */}
          <div className="relative">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-px bg-gray-200 dark:bg-gray-700" />
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              className="h-10 w-10 rounded-full bg-white dark:bg-card shadow-lg border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-gray-900 relative z-10"
              disabled={filteredProducts.length === 0}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>
    </div>
  )
}