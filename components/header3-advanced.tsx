"use client"

import {
  Anchor,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  Award,
  Beef,
  BedDouble,
  Bike,
  Bitcoin,
  Book,
  Briefcase,
  Building,
  Building2,
  Calculator,
  Calendar,
  Car,
  Castle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code,
  Coins,
  Computer,
  CreditCard,
  Crown,
  Diamond,
  DollarSign,
  Euro,
  File,
  FileText,
  Flag,
  Gavel,
  Globe,
  Globe2,
  GraduationCap,
  HandCoins,
  Heart,
  Home,
  Key,
  Landmark,
  Leaf,
  Lightbulb,
  LineChart,
  Lock,
  Menu,
  Mic,
  Newspaper,
  Package,
  Palmtree,
  Phone,
  PieChart,
  PiggyBank,
  Plane,
  Play,
  PlayCircle,
  Puzzle,
  Receipt,
  Rocket,
  RotateCw,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Speech,
  Star,
  Target,
  Trees,
  TrendingUp,
  Umbrella,
  UserPlus,
  UserRound,
  Users,
  Wallet,
  Wrench,
  X,
} from "lucide-react"
import { Fragment, useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Meteors } from "@/components/ui/meteors"
import { SparklesCore } from "@/components/ui/sparkles"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
import { EliteEligibilityModal } from "@/components/elite-eligibility-modal"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

// Solutions Fiscales
const solutionsFiscales = [
  // Défiscalisation Immobilière
  {
    id: "solution-1",
    title: "Déficit Foncier",
    description: "10 700€/an déductibles • Travaux rentabilisés",
    href: "/defiscalisation/deficit-foncier",
    icon: Wrench,
    isTitle: false,
  },
  {
    id: "solution-2",
    title: "Denormandie",
    description: "21% réduction IR • Rénovation énergétique",
    href: "/defiscalisation/denormandie",
    icon: Leaf,
    isTitle: false,
  },
  {
    id: "solution-3",
    title: "Passer en LMNP / LMP",
    description: "Zéro impôt 10-20 ans • Location meublée",
    href: "/defiscalisation/lmnp-lmp",
    icon: BedDouble,
    isTitle: false,
  },
  {
    id: "solution-4",
    title: "Loi Malraux",
    description: "30% réduction IR • Patrimoine historique",
    href: "/defiscalisation/malraux",
    icon: Castle,
    isTitle: false,
  },
  {
    id: "solution-5",
    title: "Monument Historique",
    description: "100% travaux déductibles • Zéro plafond",
    href: "/defiscalisation/monument-historique",
    icon: Building,
    isTitle: false,
  },
  // Défiscalisation Financière
  {
    id: "solution-6",
    title: "Girardin Industriel",
    description: "120% réduction • One-shot Outre-mer",
    href: "/defiscalisation/girardin",
    icon: Palmtree,
    isTitle: false,
  },
  {
    id: "solution-7",
    title: "PER",
    description: "100% déductible • Retraite + capital",
    href: "/defiscalisation/per",
    icon: PiggyBank,
    isTitle: false,
  },
  {
    id: "solution-8",
    title: "Groupements Forestiers",
    description: "25% IR + 75% IFI • Forêts & transmission",
    href: "/defiscalisation/groupements-forestiers",
    icon: Trees,
    isTitle: false,
  },
  {
    id: "solution-9",
    title: "FCPI",
    description: "25% réduction • Start-ups innovantes",
    href: "/defiscalisation/fcpi",
    icon: Lightbulb,
    isTitle: false,
  },
  {
    id: "solution-10",
    title: "Cheptel Bovin",
    description: "100% déductible • Rendement 5-7% an",
    href: "/defiscalisation/cheptel-bovin",
    icon: Beef,
    isTitle: false,
  },
];

// Supprimé : Outils & Services (Simulateur fiscal, Audit patrimonial, Suivi en ligne)
// const technologiesFiscales = [
//   {
//     id: "technology-1",
//     title: "Simulateur fiscal",
//     href: "/simulateurs",
//     icon: Calculator,
//   },
//   {
//     id: "technology-2",
//     title: "Audit patrimonial",
//     href: "/services/audit",
//     icon: ShieldCheck,
//   },
//   {
//     id: "technology-3",
//     title: "Suivi en ligne",
//     href: "/espace-client",
//     icon: LineChart,
//   },
// ];

// Placements
const placementsCategories = [
  {
    title: "Supports d'investissement",
    products: [
      {
        id: "product-1",
        title: "Assurance-vie",
        description: "Support privilégié d'épargne",
        href: "/placements/assurance-vie",
        icon: Shield,
      },
      {
        id: "product-2",
        title: "Assurance-vie Luxembourgeoise",
        description: "Haut de gamme international",
        href: "/placements/assurance-vie-luxembourgeoise",
        icon: Crown,
      },
      {
        id: "product-3",
        title: "Contrat de capitalisation",
        description: "Transmission optimisée",
        href: "/placements/contrat-capitalisation",
        icon: Coins,
      },
      {
        id: "product-4",
        title: "PER",
        description: "Plan Épargne Retraite",
        href: "/placements/per",
        icon: RotateCw,
      },
      {
        id: "product-5",
        title: "PEA",
        description: "Actions européennes défiscalisées",
        href: "/placements/pea",
        icon: LineChart,
      },
      {
        id: "product-6",
        title: "Compte-Titres",
        description: "Investissement libre",
        href: "/placements/compte-titres",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Produits d'investissement",
    products: [
      {
        id: "product-7",
        title: "Private Equity",
        description: "Investissement non coté",
        href: "/placements/private-equity",
        icon: Diamond,
      },
      {
        id: "product-8",
        title: "Venture Capital",
        description: "Capital-risque innovant",
        href: "/placements/venture-capital",
        icon: TrendingUp,
      },
      {
        id: "product-9",
        title: "ETF",
        description: "Fonds indiciels cotés",
        href: "/placements/etf",
        icon: LineChart,
      },
      {
        id: "product-10",
        title: "Actions",
        description: "Titres de sociétés",
        href: "/placements/actions",
        icon: TrendingUp,
      },
      {
        id: "product-11",
        title: "Obligations",
        description: "Titres de créance",
        href: "/placements/obligations",
        icon: FileText,
      },
      {
        id: "product-12",
        title: "SCPI / OPCI",
        description: "Pierre-papier",
        href: "/placements/scpi-opci",
        icon: Building2,
      },
      {
        id: "product-13",
        title: "Cryptomonnaies",
        description: "Actifs digitaux",
        href: "/placements/crypto",
        icon: Bitcoin,
      },
      {
        id: "product-14",
        title: "Produits structurés",
        description: "Protection du capital",
        href: "/placements/produits-structures",
        icon: Shield,
      },
      {
        id: "product-15",
        title: "Métaux Précieux",
        description: "Or, Argent, Platine",
        href: "/placements/metaux-precieux",
        icon: Crown,
      },
      {
        id: "product-16",
        title: "Matières premières",
        description: "Commodités",
        href: "/placements/matieres-premieres",
        icon: Globe,
      },
    ],
  },
];

// Services
const servicesCategories = [
  {
    title: "Accompagnement Patrimonial",
    features: [
      {
        id: "feature-1",
        title: "Bilan Patrimonial",
        description: "Analyse complète de votre situation patrimoniale.",
        href: "/services/bilan-patrimonial",
        icon: PieChart,
      },
      {
        id: "feature-2",
        title: "Stratégie Fiscale",
        description: "Optimisation fiscale personnalisée.",
        href: "/services/strategie-fiscale",
        icon: Target,
      },
      {
        id: "feature-3",
        title: "Transmission",
        description: "Préparez la transmission de votre patrimoine.",
        href: "/services/transmission",
        icon: HandCoins,
      },
    ],
  },
  {
    title: "Services Spécialisés",
    features: [
      {
        id: "feature-4",
        title: "Expatriés",
        description: "Solutions pour les non-résidents.",
        href: "/services/expatries",
        icon: Globe,
      },
      {
        id: "feature-5",
        title: "Dirigeants",
        description: "Optimisation pour chefs d'entreprise.",
        href: "/services/dirigeants",
        icon: Building2,
      },
      {
        id: "feature-6",
        title: "Protection sociale",
        description: "Prévoyance et retraite sur mesure.",
        href: "/services/protection-sociale",
        icon: Shield,
      },
    ],
  },
];

// Investissements
const investissements = [
  // Immobilier
  {
    id: "invest-1",
    title: "Hagnéré Investissement",
    description: "Notre solution exclusive",
    href: "/investissements/hagnere-investissement",
    icon: Award,
    category: "immobilier",
  },
  {
    id: "invest-2",
    title: "SCPI Européenne",
    description: "Immobilier européen diversifié",
    href: "/investissements/scpi-europeenne",
    icon: Building,
    category: "immobilier",
  },
  {
    id: "invest-3",
    title: "Nue-Propriété",
    description: "Décote de 20 à 40%",
    href: "/investissements/nue-propriete",
    icon: Key,
    category: "immobilier",
  },
  {
    id: "invest-4",
    title: "Viager",
    description: "Investissement éthique",
    href: "/investissements/viager",
    icon: Users,
    category: "immobilier",
  },
  // Financier
  {
    id: "invest-5",
    title: "Groupements Forestiers",
    description: "Réduction IFI",
    href: "/investissements/groupements-forestiers",
    icon: Trees,
    category: "financier",
  },
  {
    id: "invest-6",
    title: "Cheptel Bovin",
    description: "Investissement agricole",
    href: "/investissements/cheptel-bovin",
    icon: Beef,
    category: "financier",
  },
];

// Financements
const financements = [
  // Crédits immobiliers
  {
    id: "finance-1",
    title: "Prêt immobilier RP",
    description: "Résidence principale",
    href: "/financements/pret-immobilier-rp",
    icon: Home,
    category: "immobilier",
  },
  {
    id: "finance-2",
    title: "Prêt immobilier RS",
    description: "Résidence secondaire",
    href: "/financements/pret-immobilier-rs",
    icon: Home,
    category: "immobilier",
  },
  {
    id: "finance-3",
    title: "Prêt immobilier locatif",
    description: "Bien destiné à la location",
    href: "/financements/pret-immobilier-locatif",
    icon: Key,
    category: "immobilier",
  },
  {
    id: "finance-4",
    title: "Prêt relais",
    description: "Avance en attendant la vente",
    href: "/financements/pret-relais",
    icon: RotateCw,
    category: "immobilier",
  },
  {
    id: "finance-5",
    title: "Prêt in fine",
    description: "Capital remboursé à la fin",
    href: "/financements/pret-in-fine",
    icon: TrendingUp,
    category: "immobilier",
  },
  // Crédits spécialisés
  {
    id: "finance-6",
    title: "Crédit marchand de biens",
    description: "Achat, rénover, revendre",
    href: "/financements/credit-marchand",
    icon: Wrench,
    category: "specialises",
  },
  {
    id: "finance-7",
    title: "Crédit lombard",
    description: "Sur portefeuille titres",
    href: "/financements/credit-lombard",
    icon: Briefcase,
    category: "specialises",
  },
  // Crédits de restructuration
  {
    id: "finance-8",
    title: "Rachat de crédits",
    description: "Regroupement de prêts",
    href: "/financements/rachat-credits",
    icon: ArrowRightLeft,
    category: "restructuration",
  },
  {
    id: "finance-9",
    title: "Crédit hypothécaire",
    description: "Garanti par un bien immobilier",
    href: "/financements/credit-hypothecaire",
    icon: Building,
    category: "restructuration",
  },
  // Crédits spécifiques
  {
    id: "finance-10",
    title: "Prêt consommation",
    description: "Biens, travaux, projets",
    href: "/financements/pret-consommation",
    icon: Package,
    category: "specifiques",
  },
  {
    id: "finance-11",
    title: "Prêt viager hypothécaire",
    description: "Pour séniors, liquidité sans vente",
    href: "/financements/pret-viager",
    icon: Heart,
    category: "specifiques",
  },
  {
    id: "finance-12",
    title: "Vente à réméré",
    description: "Liquidité avec rachat possible",
    href: "/financements/vente-remere",
    icon: Receipt,
    category: "specifiques",
  },
];

// Assurances
const assurances = [
  // Assurances Crédit & Santé
  {
    id: "assur-1",
    title: "Assurance emprunteur",
    description: "Protection crédit",
    href: "/assurances/emprunteur",
    icon: ShieldCheck,
    category: "credit-sante",
  },
  {
    id: "assur-2",
    title: "Complémentaire Santé",
    description: "Couverture santé optimale",
    href: "/assurances/complementaire-sante",
    icon: Heart,
    category: "credit-sante",
  },
  {
    id: "assur-3",
    title: "Complémentaire santé expatriés",
    description: "Santé internationale",
    href: "/assurances/sante-expatries",
    icon: Globe,
    category: "credit-sante",
  },
  {
    id: "assur-4",
    title: "Assurance voyage",
    description: "Protection voyage",
    href: "/assurances/voyage",
    icon: Plane,
    category: "credit-sante",
  },
  // Assurances Mobilité & Habitation
  {
    id: "assur-5",
    title: "Assurance habitation",
    description: "Protection du logement",
    href: "/assurances/habitation",
    icon: Home,
    category: "mobilite-habitation",
  },
  {
    id: "assur-6",
    title: "Assurance voiture",
    description: "Véhicule protégé",
    href: "/assurances/voiture",
    icon: Car,
    category: "mobilite-habitation",
  },
  {
    id: "assur-7",
    title: "Assurance deux-roues et quad",
    description: "Moto, scooter, quad",
    href: "/assurances/deux-roues",
    icon: Bike,
    category: "mobilite-habitation",
  },
  {
    id: "assur-8",
    title: "Assurance Bateaux / Jet-Skis",
    description: "Navigation protégée",
    href: "/assurances/bateaux",
    icon: Anchor,
    category: "mobilite-habitation",
  },
  // Assurances Décès & Prévoyance
  {
    id: "assur-9",
    title: "Assurance décès",
    description: "Capital ou rente",
    href: "/assurances/deces",
    icon: Users,
    category: "deces-prevoyance",
  },
  {
    id: "assur-10",
    title: "Assurance obsèques",
    description: "Frais funéraires",
    href: "/assurances/obseques",
    icon: Heart,
    category: "deces-prevoyance",
  },
  {
    id: "assur-11",
    title: "Garantie accident de la vie",
    description: "Protection complète",
    href: "/assurances/gav",
    icon: ShieldCheck,
    category: "deces-prevoyance",
  },
  // Assurances Immobilier
  {
    id: "assur-12",
    title: "Assurance PNO",
    description: "Propriétaire non occupant",
    href: "/assurances/pno",
    icon: Key,
    category: "immobilier",
  },
  {
    id: "assur-13",
    title: "Assurance PNO Immeuble",
    description: "Immeuble de rapport",
    href: "/assurances/pno-immeuble",
    icon: Building,
    category: "immobilier",
  },
  // Assurances Spécifiques
  {
    id: "assur-14",
    title: "Assurance études internationales",
    description: "Protection étudiants",
    href: "/assurances/etudes-internationales",
    icon: GraduationCap,
    category: "specifiques",
  },
];

// Gestion de fortune
const gestionFortune = [
  // Services Exclusifs
  {
    id: "fortune-1",
    title: "Conseils multi-juridictionnel international",
    description: "Expertise cross-border",
    href: "/gestion-fortune/multi-juridictionnel",
    icon: Globe,
    category: "services-exclusifs",
  },
  {
    id: "fortune-2",
    title: "Family Office",
    description: "Gestion Multi-générationnelle",
    href: "/gestion-fortune/family-office",
    icon: Crown,
    category: "services-exclusifs",
  },
  {
    id: "fortune-3",
    title: "Gestion Discrétionnaire",
    description: "Délégation totale",
    href: "/gestion-fortune/gestion-discretionnaire",
    icon: Briefcase,
    category: "services-exclusifs",
  },
  {
    id: "fortune-4",
    title: "Optimisation Internationale",
    description: "Structuration globale",
    href: "/services/optimisation-internationale",
    icon: TrendingUp,
    category: "services-exclusifs",
  },
  {
    id: "fortune-5",
    title: "Immobilier de prestige",
    description: "Biens d'exception",
    href: "/gestion-fortune/immobilier-prestige",
    icon: Building2,
    category: "services-exclusifs",
  },
  {
    id: "fortune-6",
    title: "Gestion de fortune à 360°",
    description: "Un seul interlocuteur pour tout",
    href: "/gestion-fortune/360",
    icon: Star,
    category: "services-exclusifs",
  },
  // Produits Exclusifs
  {
    id: "fortune-7",
    title: "FIC (Fond interne collectif)",
    description: "Fond dédié collectif",
    href: "/gestion-fortune/fic",
    icon: Briefcase,
    category: "produits-exclusifs",
  },
  {
    id: "fortune-8",
    title: "FAS (Fond assurance spécialisé)",
    description: "Solutions spécialisées",
    href: "/gestion-fortune/fas",
    icon: Shield,
    category: "produits-exclusifs",
  },
  {
    id: "fortune-9",
    title: "FID (Fond interne dédié)",
    description: "Gestion personnalisée",
    href: "/gestion-fortune/fid",
    icon: Star,
    category: "produits-exclusifs",
  },
  {
    id: "fortune-10",
    title: "Private Equity premium",
    description: "Opportunités exclusives",
    href: "/gestion-fortune/private-equity",
    icon: TrendingUp,
    category: "produits-exclusifs",
  },
  {
    id: "fortune-11",
    title: "Hedge Funds",
    description: "Fonds alternatifs",
    href: "/gestion-fortune/hedge-funds",
    icon: LineChart,
    category: "produits-exclusifs",
  },
  {
    id: "fortune-12",
    title: "Produits Structurés Tailor-Made",
    description: "Sur-mesure",
    href: "/gestion-fortune/structures",
    icon: Package,
    category: "produits-exclusifs",
  },
  {
    id: "fortune-13",
    title: "Crédits Lombard",
    description: "Financement sur portefeuille",
    href: "/gestion-fortune/credit-lombard",
    icon: CreditCard,
    category: "produits-exclusifs",
  },
  {
    id: "fortune-14",
    title: "Crédit Hypothécaire Immobilier",
    description: "Financement premium",
    href: "/gestion-fortune/credit-hypothecaire",
    icon: Home,
    category: "produits-exclusifs",
  },
];

// Ressources
const resources = [
  {
    id: "resource-1",
    title: "Webinaires",
    description: "Sessions live avec nos experts.",
    href: "/ressources/webinaires",
    icon: Calendar,
  },
  {
    id: "resource-2",
    title: "Guides fiscaux",
    description: "Guides pratiques téléchargeables.",
    href: "/ressources/guides",
    icon: Book,
  },
  {
    id: "resource-3",
    title: "Actualités",
    description: "Dernières actualités fiscales.",
    href: "/blog",
    icon: Newspaper,
  },
  {
    id: "resource-4",
    title: "Vidéos",
    description: "Tutoriels et cas pratiques.",
    href: "/ressources/videos",
    icon: PlayCircle,
  },
  {
    id: "resource-5",
    title: "Simulateurs",
    description: "Calculez vos économies d'impôts.",
    href: "/ressources/simulateurs",
    icon: Calculator,
  },
  {
    id: "resource-6",
    title: "FAQ",
    description: "Réponses à vos questions.",
    href: "/ressources/faq",
    icon: Search,
  },
  {
    id: "resource-7",
    title: "Témoignages",
    description: "Retours d'expérience clients.",
    href: "/ressources/temoignages",
    icon: Heart,
  },
];

const SolutionsFiscalesMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758734684100-462f74dbc91c73c2.webp"
              alt="Wallet"
              className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Ne plus payer d&apos;impôts est possible !
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Découvrez comment optimiser votre fiscalité avec un rendez-vous gratuit de 45 minutes avec un expert patrimonial
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Bilan Patrimonial 360°
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Défiscalisation Immobilière */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Défiscalisation Immobilière
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {solutionsFiscales.slice(0, 5).map((solution) => (
            <NavigationMenuLink
              key={solution.id}
              href={solution.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <solution.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {solution.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {solution.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Défiscalisation Financière */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Défiscalisation Financière
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {solutionsFiscales.slice(5).map((solution) => (
            <NavigationMenuLink
              key={solution.id}
              href={solution.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <solution.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {solution.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {solution.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

const PlacementsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
              alt="Investment"
              className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Solutions d&apos;épargne sur mesure
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Diversifiez votre patrimoine avec nos solutions d&apos;investissement sélectionnées et bénéficiez d&apos;un accompagnement personnalisé
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Bilan Patrimonial 360°
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {placementsCategories.map((category) => (
        <div key={category.title} className="grid gap-y-2 lg:gap-y-6">
          <div className="border-gray-200 text-left lg:border-b lg:pb-3">
            <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
              {category.title}
            </strong>
          </div>
          <menu className="grid md:grid-cols-3 md:gap-x-5 lg:gap-y-7">
            {category.products.map((product) => (
              <NavigationMenuLink
                key={product.id}
                href={product.href}
                className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                  <product.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                    {product.title}
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                    {product.description}
                  </p>
                </div>
                <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

const InvestissementsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
            alt="Investissements"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Diversifiez votre patrimoine
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Investissez dans des actifs tangibles et durables avec un accompagnement expert
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Bilan Patrimonial 360°
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Investissement Immobilier */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Investissement Immobilier
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {investissements.filter(inv => inv.category === "immobilier").map((invest) => (
            <NavigationMenuLink
              key={invest.id}
              href={invest.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <invest.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {invest.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {invest.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Investissement Financier */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Investissement Financier
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {investissements.filter(inv => inv.category === "financier").map((invest) => (
            <NavigationMenuLink
              key={invest.id}
              href={invest.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <invest.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {invest.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {invest.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

const FinancementsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758734684100-462f74dbc91c73c2.webp"
            alt="Financements"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Solutions de crédit adaptées
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Obtenez les meilleures conditions de financement avec notre réseau de partenaires bancaires
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Étude de financement gratuite
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Crédits immobiliers */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Crédits immobiliers
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {financements.filter(f => f.category === "immobilier").map((finance) => (
            <NavigationMenuLink
              key={finance.id}
              href={finance.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <finance.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {finance.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {finance.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Crédits spécialisés et restructuration */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Crédits spécialisés & Restructuration
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {financements.filter(f => f.category === "specialises" || f.category === "restructuration").map((finance) => (
            <NavigationMenuLink
              key={finance.id}
              href={finance.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <finance.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {finance.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {finance.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Crédits spécifiques */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Crédits spécifiques
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {financements.filter(f => f.category === "specifiques").map((finance) => (
            <NavigationMenuLink
              key={finance.id}
              href={finance.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <finance.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {finance.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {finance.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

const AssurancesMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
            alt="Assurances"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Protégez votre patrimoine et vos proches
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Solutions d&apos;assurance complètes pour sécuriser votre avenir et celui de votre famille
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Audit de protection gratuit
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-6">
      {/* Organisation en 2 colonnes */}
      <div className="grid md:grid-cols-2 gap-x-8">
        {/* Colonne 1 */}
        <div className="space-y-6">
          {/* Assurances Crédit & Santé */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Crédit & Santé
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "credit-sante").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>

          {/* Assurances Décès & Prévoyance */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Décès & Prévoyance
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "deces-prevoyance").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne 2 */}
        <div className="space-y-6">
          {/* Assurances Mobilité & Habitation */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Mobilité & Habitation
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "mobilite-habitation").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>

          {/* Assurances Immobilier & Spécifiques */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Immobilier & Spécifiques
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "immobilier" || a.category === "specifiques").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GestionFortuneMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-yellow-600/30 bg-gradient-to-br from-black via-yellow-950/20 to-black px-6 py-8">
        {/* Badge VIP */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold">
          VIP
        </div>

        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758734684100-462f74dbc91c73c2.webp"
            alt="Gestion de fortune"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
            Services exclusifs pour votre patrimoine
          </h1>

          <p className="mb-4 text-sm font-normal text-yellow-100/80">
            Accédez à des solutions premium et un accompagnement sur-mesure pour optimiser votre fortune
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-yellow-500/50 bg-gradient-to-r from-yellow-600/10 to-yellow-500/10 px-4 py-2 text-yellow-200 inline-flex items-center gap-2 text-xs hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-black hover:border-yellow-500 transition-all duration-300">
            <Crown className="h-4 w-4" />
            Consultation privée exclusive
          </a>
        </div>

        {/* Meaty part - Meteor effect with golden tint */}
        <div className="opacity-50">
          <Meteors number={15} />
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Services Exclusifs */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <Crown className="h-3 w-3 text-yellow-600" />
            Services Exclusifs
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {gestionFortune.filter(f => f.category === "services-exclusifs").map((fortune) => (
            <NavigationMenuLink
              key={fortune.id}
              href={fortune.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <fortune.icon className="size-5 text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {fortune.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {fortune.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Produits Exclusifs */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <Diamond className="h-3 w-3 text-yellow-600" />
            Produits Exclusifs
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {gestionFortune.filter(f => f.category === "produits-exclusifs").map((fortune) => (
            <NavigationMenuLink
              key={fortune.id}
              href={fortune.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <fortune.icon className="size-5 text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {fortune.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {fortune.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

const RendezVousMenu = () => {
  const [eliteModalOpen, setEliteModalOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        <menu className="grid gap-6 lg:h-full">
          {/* Première ligne : Bilan et Consultation Elite */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Consultations Gratuites</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <NavigationMenuLink
                href="/bilan-patrimonial"
                className="border-gray-200 bg-black group relative flex flex-col items-start rounded-md overflow-hidden text-left lg:border lg:p-0 hover:bg-gray-900"
              >
                <AuroraBackground className="absolute inset-0" showRadialGradient={true}>
                  <div className="relative z-10 px-6 py-5 w-full">
                    <div className="absolute top-2 right-2 z-20">
                      <Badge className="bg-green-500 text-white text-[10px]">Gratuit</Badge>
                    </div>
                    <PieChart className="size-6 text-black sm:size-7 mb-3" />
                    <div className="flex-1">
                      <div className="text-black text-sm font-medium">
                        Bilan Patrimonial 360°
                      </div>
                      <p className="text-gray-700 mt-1 text-xs">
                        Analyse complète de votre situation
                      </p>
                    </div>
                  </div>
                </AuroraBackground>
              </NavigationMenuLink>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEliteModalOpen(true);
                }}
                className="border-gray-200 bg-black group relative flex flex-col items-start rounded-md overflow-hidden text-left lg:border hover:bg-gray-900 cursor-pointer"
              >
            <div className="absolute inset-0">
              <ShootingStars
                starColor="#C0C0C0"
                trailColor="#808080"
                minSpeed={10}
                maxSpeed={30}
                minDelay={1200}
                maxDelay={4200}
              />
              <ShootingStars
                starColor="#FFFFFF"
                trailColor="#C0C0C0"
                minSpeed={10}
                maxSpeed={30}
                minDelay={1500}
                maxDelay={4500}
              />
              <ShootingStars
                starColor="#E5E5E5"
                trailColor="#999999"
                minSpeed={10}
                maxSpeed={30}
                minDelay={1000}
                maxDelay={4000}
              />
              <StarsBackground
                starDensity={0.0003}
                allStarsTwinkle={true}
                twinkleProbability={0.9}
              />
            </div>
            <div className="relative z-10 px-6 py-5 w-full h-full flex flex-col">
              <div className="absolute top-3 right-3 z-20 flex gap-1">
                <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-[10px] border-0">VIP</Badge>
                <Badge className="bg-gradient-to-r from-gray-600 to-gray-400 text-white text-[10px] border-0">Gratuit</Badge>
              </div>
              <Crown className="size-6 sm:size-7 mb-3 text-gray-300" />
              <div className="flex-1">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 text-sm font-medium">
                  Consultation Elite
                </div>
                <p className="text-gray-400 mt-1 text-xs">
                  Conseil personnalisé haut de gamme
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Deuxième ligne : Stratégies payantes */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sessions de Travail Payantes</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <NavigationMenuLink
            href="/strategie-1h"
            className="border-gray-200 bg-gray-50 lg:bg-white group relative flex flex-col items-start rounded-md px-6 py-5 text-left lg:border lg:p-5 hover:bg-gray-50"
          >
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-100 text-blue-800 text-[10px]">149€/h</Badge>
            </div>
            <Lightbulb className="size-6 text-gray-600 sm:size-7 mb-3" />
            <div className="flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                Stratégie 1h
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Session de travail d'1 heure
              </p>
            </div>
          </NavigationMenuLink>

          <NavigationMenuLink
            href="/strategie-2h"
            className="border-gray-200 bg-gray-50 lg:bg-white group relative flex flex-col items-start rounded-md px-6 py-5 text-left lg:border lg:p-5 hover:bg-gray-50"
          >
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-100 text-blue-800 text-[10px]">269€/2h</Badge>
            </div>
            <Target className="size-6 text-gray-600 sm:size-7 mb-3" />
            <div className="flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                Stratégies 2h
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Session approfondie de 2 heures
              </p>
            </div>
          </NavigationMenuLink>
        </div>
      </div>

      {/* Troisième ligne : Présentation Hagnéré Investissement (1/3 de largeur) */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Opportunités d'Investissement</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <NavigationMenuLink
            href="/presentation-investissement"
            className="border-gray-200 bg-gray-50 lg:bg-white group relative flex flex-col items-start rounded-md px-6 py-5 text-left lg:border lg:p-5 hover:bg-gray-50"
          >
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-100 text-green-800 text-[10px]">Gratuit</Badge>
            </div>
            <Briefcase className="size-6 text-gray-600 sm:size-7 mb-3" />
            <div className="flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                Hagnéré Investissement
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Découvrez nos opportunités exclusives
              </p>
            </div>
          </NavigationMenuLink>
        </div>
      </div>
    </menu>
  </div>
  <EliteEligibilityModal
    open={eliteModalOpen}
    onOpenChange={setEliteModalOpen}
  />
  </>
  );
};

const RessourcesMenu = () => (
  <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4 lg:gap-6">
    <div className="col-span-1">
      <a
        href="/ressources/simulateurs"
        className="bg-gradient-to-br from-gray-900 to-black text-white group relative flex h-full flex-row overflow-hidden rounded-lg p-0 lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col text-left">
          <div className="relative z-20 flex flex-col px-6 pb-6 pt-6">
            <span className="mb-4 text-xs font-medium uppercase tracking-wider">
              Centre de ressources
            </span>
            <div className="mt-auto flex items-center space-x-1 text-xs">
              Accéder aux ressources
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-2 text-xs text-white/70">
              Guides, webinaires et outils pour optimiser votre patrimoine.
            </p>
          </div>
        </div>
      </a>
    </div>
    <div className="lg:col-span-3 lg:flex lg:flex-col">
      <div>
        <div className="border-gray-200 mb-4 pb-3 text-left md:mb-6 lg:border-b">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Ressources Populaires
          </strong>
        </div>
      </div>
      <menu className="grid gap-y-4 lg:h-full lg:grid-cols-3 lg:gap-6">
        {resources.map((resource) => (
          <NavigationMenuLink
            key={resource.id}
            href={resource.href}
            className="border-gray-200 bg-gray-50 lg:bg-white group flex flex-row items-center space-x-4 rounded-md px-6 py-5 text-left md:space-x-5 lg:border lg:p-5 hover:bg-gray-50"
          >
            <resource.icon className="size-6 text-gray-600 sm:size-7" />
            <div className="ml-4 flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                {resource.title}
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                {resource.description}
              </p>
            </div>
          </NavigationMenuLink>
        ))}
      </menu>
    </div>
  </div>
);

const navigationMenuItems = [
  {
    key: "solutions",
    label: "Défiscalisation",
    component: SolutionsFiscalesMenu,
  },
  {
    key: "placements",
    label: "Placements",
    component: PlacementsMenu,
  },
  {
    key: "investissements",
    label: "Investissements",
    component: InvestissementsMenu,
  },
  {
    key: "financements",
    label: "Financements",
    component: FinancementsMenu,
  },
  {
    key: "assurances",
    label: "Assurances",
    component: AssurancesMenu,
  },
  {
    key: "gestion-fortune",
    label: "Gestion de fortune",
    component: GestionFortuneMenu,
  },
  {
    key: "rendez-vous",
    label: "Rendez-vous",
    component: RendezVousMenu,
  },
  {
    key: "resources",
    label: "Ressources",
    component: RessourcesMenu,
  },
] as const;

const Header3Advanced = () => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<
    "solutions" | "placements" | "services" | "resources" | null
  >(null);

  return (
    <section className="bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 border-b inset-x-0 top-0 z-50">
      <div className="container">
        <NavigationMenu className="min-w-full [&>div:last-child]:left-auto">
          <div className="flex h-16 w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <NavigationMenuList className="hidden gap-0 lg:flex">
                {navigationMenuItems.slice(0, -2).map((item) => (
                  <NavigationMenuItem key={item.key}>
                    <NavigationMenuTrigger className="text-xs">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[calc(100vw-4rem)] p-12 2xl:min-w-[calc(1400px-4rem)]">
                      <item.component />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </div>
            <div className="flex items-center gap-2">
              <NavigationMenuList className="hidden gap-0 lg:flex">
                {navigationMenuItems.slice(-2).map((item) => (
                  <NavigationMenuItem key={item.key}>
                    <NavigationMenuTrigger className="text-xs">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[calc(100vw-4rem)] p-12 2xl:min-w-[calc(1400px-4rem)]">
                      <item.component />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
              <Button
                variant="outline"
                size="icon"
                aria-label="Main Menu"
                className="lg:hidden border-black"
                onClick={() => {
                  if (open) {
                    setOpen(false);
                    setSubmenu(null);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <Menu className="size-4 text-black" />}
                {open && <X className="size-4 text-black" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="border-gray-200 bg-white container fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-auto border-t lg:hidden">
              {submenu && (
                <div className="mt-3">
                  <Button
                    variant="link"
                    onClick={() => setSubmenu(null)}
                    className="relative -left-4 text-black"
                  >
                    <ArrowLeft className="size-4 text-xs" />
                    Retour
                  </Button>
                </div>
              )}
              {submenu === null && (
                <div>
                  {navigationMenuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className="border-gray-200 flex w-full items-center border-b py-6 text-left"
                      onClick={() => setSubmenu(item.key)}
                    >
                      <span className="flex-1 text-sm font-medium text-black">
                        {item.label}
                      </span>
                      <span className="shrink-0">
                        <ArrowRight className="size-4 text-gray-400" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {navigationMenuItems.map(
                (item) =>
                  submenu === item.key && (
                    <div key={item.key}>
                      <h2 className="pb-6 pt-4 text-lg font-medium text-black">
                        {item.label}
                      </h2>
                      <item.component />
                    </div>
                  ),
              )}
              {/* Mobile menu footer */}
              <div className="mx-[2rem] mt-auto flex flex-col items-center gap-4 py-24">
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export { Header3Advanced }
