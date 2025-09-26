"use client";

import {
  ArrowRight,
  ChevronDown,
  Compass,
  Percent,
  TrendingUp,
  Building2,
  Clock,
  Gift,
  Gem,
  Banknote,
  Shield,
  BedDouble,
  Wrench,
  Hammer,
  Castle,
  TrendingDown,
  Wallet,
  Users,
  Briefcase,
  Leaf,
  Building,
  Palmtree,
  PiggyBank,
  Trees,
  Lightbulb,
  Beef,
  Crown,
  Coins,
  RotateCw,
  LineChart,
  Diamond,
  Bitcoin,
  FileText,
  PieChart,
  Target,
  HandCoins,
  Globe,
  Award,
  Key,
  Home,
  ArrowRightLeft,
  Package,
  Heart,
  Receipt,
  ShieldCheck,
  Plane,
  Car,
  Bike,
  Umbrella
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const features = [
  {
    id: "feature-1",
    title: "Établir une stratégie / Être conseillé",
    icon: Compass,
    description:
      "Construisez un plan patrimonial solide avec un accompagnement personnalisé. Bilan complet, définition d'objectifs et feuille de route sur-mesure pour atteindre vos ambitions patrimoniales.",
    href: "/services/strategie-patrimoniale",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "feature-2",
    title: "Réduire mes impôts",
    icon: Percent,
    description:
      "Optimisez votre fiscalité légalement grâce à nos solutions de défiscalisation. Immobilier défiscalisant, PER, dispositifs Malraux et Monument Historique pour réduire significativement votre imposition.",
    href: "/services/optimisation-fiscale",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "feature-3",
    title: "Placer / Booster mon argent",
    icon: TrendingUp,
    description:
      "Optimisez la performance de vos placements avec nos solutions sur-mesure. Gestion pilotée, SCPI de rendement et private equity pour faire fructifier efficacement votre épargne.",
    href: "/services/placements",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: "feature-4",
    title: "Investir dans l'immobilier",
    icon: Building2,
    description:
      "Construisez un patrimoine solide avec nos solutions immobilières. SCPI sans contrainte de gestion, Pinel pour la défiscalisation, LMNP pour des revenus non imposés.",
    href: "/services/investissement-immobilier",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "feature-5",
    title: "Préparer ma retraite",
    icon: Clock,
    description:
      "Anticipez sereinement votre retraite et maintenez votre niveau de vie. PER défiscalisé, immobilier locatif et solutions Madelin pour constituer des revenus complémentaires pérennes.",
    href: "/services/preparation-retraite",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "feature-6",
    title: "Transmettre mon patrimoine",
    icon: Gift,
    description:
      "Protégez vos proches efficacement et optimisez la transmission. Donation-partage, assurance-vie et SCI familiale pour transmettre dans les meilleures conditions fiscales.",
    href: "/services/transmission-patrimoine",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    id: "feature-7",
    title: "Gérer / Optimiser ma fortune",
    icon: Gem,
    description:
      "Gestion de fortune privée premium pour patrimoines importants. Family Office, gestion discrétionnaire et accès aux opportunités exclusives réservées aux grandes fortunes.",
    href: "/services/gestion-fortune",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    id: "feature-8",
    title: "Obtenir un financement",
    icon: Banknote,
    description:
      "Accédez aux meilleures conditions de crédit du marché. Négociation de taux préférentiels, regroupement de crédits et solutions de financement patrimonial sur-mesure.",
    href: "/services/financement",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    id: "feature-9",
    title: "Assurer / Protéger ma famille",
    icon: Shield,
    description:
      "Sécurisez l'avenir de vos proches avec nos solutions de prévoyance. Capital décès, garantie emprunteur et épargne éducation pour protéger financièrement votre famille.",
    href: "/services/assurance-protection",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
];

// Fonction pour obtenir les solutions correspondantes à chaque feature
const getSolutionsForFeature = (selectionIndex: number) => {
  const solutionsMap: Record<number, Array<{ name: string; icon: any; description: string; category?: string }>> = {
    0: [ // Établir une stratégie / Être conseillé
      {
        name: "Bilan Patrimonial 360°",
        icon: PieChart,
        description: "Analyse complète de votre situation",
        category: "Gratuit"
      },
      {
        name: "Consultation Elite",
        icon: Crown,
        description: "Conseil personnalisé haut de gamme",
        category: "VIP Gratuit"
      },
      {
        name: "Stratégie 1h",
        icon: Clock,
        description: "Session de travail d'1 heure",
        category: "149€/h"
      },
      {
        name: "Stratégies 2h",
        icon: Target,
        description: "Session approfondie de 2 heures",
        category: "269€/2h"
      },
      {
        name: "Hagnéré Investissement",
        icon: Award,
        description: "Découvrez nos opportunités exclusives",
        category: "Gratuit"
      }
    ],
    1: [ // Réduire mes impôts
      {
        name: "Déficit Foncier",
        icon: Wrench,
        description: "10 700€/an déductibles • Travaux rentabilisés",
        category: "Immobilier"
      },
      {
        name: "Denormandie",
        icon: Leaf,
        description: "21% réduction IR • Rénovation énergétique",
        category: "Immobilier"
      },
      {
        name: "LMNP / LMP",
        icon: BedDouble,
        description: "Zéro impôt 10-20 ans • Location meublée",
        category: "Immobilier"
      },
      {
        name: "Loi Malraux",
        icon: Castle,
        description: "30% réduction IR • Patrimoine historique",
        category: "Immobilier"
      },
      {
        name: "Monument Historique",
        icon: Building,
        description: "100% travaux déductibles • Zéro plafond",
        category: "Immobilier"
      },
      {
        name: "Girardin Industriel",
        icon: Palmtree,
        description: "120% réduction • One-shot Outre-mer",
        category: "Financier"
      },
      {
        name: "PER",
        icon: PiggyBank,
        description: "100% déductible • Retraite + capital",
        category: "Financier"
      },
      {
        name: "Groupements Forestiers",
        icon: Trees,
        description: "25% IR + 75% IFI • Forêts & transmission",
        category: "Financier"
      },
      {
        name: "FCPI",
        icon: Lightbulb,
        description: "25% réduction • Start-ups innovantes",
        category: "Financier"
      },
      {
        name: "Cheptel Bovin",
        icon: Beef,
        description: "100% déductible • Rendement 5-7% an",
        category: "Financier"
      }
    ],
    2: [ // Placer / Booster mon argent
      {
        name: "Assurance-vie",
        icon: Shield,
        description: "Support privilégié d'épargne",
        category: "Support"
      },
      {
        name: "Assurance-vie Luxembourgeoise",
        icon: Crown,
        description: "Haut de gamme international",
        category: "Premium"
      },
      {
        name: "Contrat de capitalisation",
        icon: Coins,
        description: "Transmission optimisée",
        category: "Support"
      },
      {
        name: "PER",
        icon: RotateCw,
        description: "Plan Épargne Retraite",
        category: "Support"
      },
      {
        name: "PEA",
        icon: LineChart,
        description: "Actions européennes défiscalisées",
        category: "Support"
      },
      {
        name: "Compte-Titres",
        icon: Briefcase,
        description: "Investissement libre",
        category: "Support"
      },
      {
        name: "Private Equity",
        icon: Diamond,
        description: "Investissement non coté",
        category: "Produit"
      },
      {
        name: "Venture Capital",
        icon: TrendingUp,
        description: "Capital-risque innovant",
        category: "Produit"
      },
      {
        name: "ETF",
        icon: LineChart,
        description: "Fonds indiciels cotés",
        category: "Produit"
      },
      {
        name: "SCPI / OPCI",
        icon: Building2,
        description: "Pierre-papier",
        category: "Immobilier"
      },
      {
        name: "Cryptomonnaies",
        icon: Bitcoin,
        description: "Actifs digitaux",
        category: "Alternatif"
      },
      {
        name: "Métaux Précieux",
        icon: Crown,
        description: "Or, Argent, Platine",
        category: "Alternatif"
      }
    ],
    3: [ // Investir dans l'immobilier
      {
        name: "Hagnéré Investissement",
        icon: Award,
        description: "Notre solution exclusive",
        category: "Exclusif"
      },
      {
        name: "SCPI Européenne",
        icon: Building,
        description: "Immobilier européen diversifié",
        category: "SCPI"
      },
      {
        name: "Nue-Propriété",
        icon: Key,
        description: "Décote de 20 à 40%",
        category: "Démembrement"
      },
      {
        name: "Viager",
        icon: Users,
        description: "Investissement éthique",
        category: "Alternatif"
      },
      {
        name: "LMNP / LMP",
        icon: BedDouble,
        description: "Location meublée optimisée",
        category: "Locatif"
      },
      {
        name: "Déficit Foncier",
        icon: Wrench,
        description: "Déduction des travaux",
        category: "Défiscalisant"
      },
      {
        name: "Denormandie",
        icon: Leaf,
        description: "Rénovation dans l'ancien",
        category: "Défiscalisant"
      },
      {
        name: "Loi Malraux",
        icon: Castle,
        description: "Restauration patrimoine historique",
        category: "Défiscalisant"
      },
      {
        name: "Monument Historique",
        icon: Building,
        description: "100% travaux déductibles",
        category: "Défiscalisant"
      },
      {
        name: "SCPI / OPCI",
        icon: Building2,
        description: "Pierre-papier diversifiée",
        category: "Pierre-papier"
      }
    ],
    4: [ // Préparer ma retraite
      {
        name: "PER",
        icon: RotateCw,
        description: "Plan Épargne Retraite déductible",
        category: "Retraite"
      },
      {
        name: "Contrat Madelin",
        icon: Shield,
        description: "Pour TNS, déduction totale",
        category: "Indépendants"
      },
      {
        name: "Assurance-vie",
        icon: Shield,
        description: "Rente viagère ou rachats programmés",
        category: "Support"
      },
      {
        name: "SCPI de rendement",
        icon: Building2,
        description: "Revenus réguliers à vie",
        category: "Immobilier"
      },
      {
        name: "LMNP / LMP",
        icon: BedDouble,
        description: "Revenus locatifs non imposés",
        category: "Immobilier"
      },
      {
        name: "Contrat de capitalisation",
        icon: Coins,
        description: "Constitution d'un capital",
        category: "Support"
      },
      {
        name: "Investissement locatif",
        icon: Building2,
        description: "Revenus complémentaires pérennes",
        category: "Immobilier"
      }
    ],
    5: [ // Transmettre mon patrimoine
      {
        name: "Assurance-vie",
        icon: Shield,
        description: "152 500€ par bénéficiaire hors succession",
        category: "Prévoyance"
      },
      {
        name: "Donation-partage",
        icon: Gift,
        description: "Répartition équitable et définitive",
        category: "Succession"
      },
      {
        name: "SCI familiale",
        icon: Building2,
        description: "Transmission progressive des parts",
        category: "Immobilier"
      },
      {
        name: "Démembrement",
        icon: Key,
        description: "Nue-propriété / usufruit",
        category: "Optimisation"
      },
      {
        name: "Contrat de capitalisation",
        icon: Coins,
        description: "Transmission optimisée",
        category: "Support"
      },
      {
        name: "Pacte Dutreil",
        icon: Briefcase,
        description: "75% d'abattement sur entreprise",
        category: "Entreprise"
      },
      {
        name: "Groupements Forestiers",
        icon: Trees,
        description: "Transmission avec avantages fiscaux",
        category: "Alternatif"
      }
    ],
    6: [ // Gérer / Optimiser ma fortune
      {
        name: "Assurance-vie Luxembourgeoise",
        icon: Crown,
        description: "Haut de gamme international",
        category: "Premium"
      },
      {
        name: "Private Equity",
        icon: Diamond,
        description: "Investissement non coté",
        category: "Alternatif"
      },
      {
        name: "Venture Capital",
        icon: TrendingUp,
        description: "Capital-risque innovant",
        category: "Alternatif"
      },
      {
        name: "Hagnéré Investissement",
        icon: Award,
        description: "Notre solution exclusive",
        category: "Exclusif"
      },
      {
        name: "Métaux Précieux",
        icon: Crown,
        description: "Or, Argent, Platine",
        category: "Alternatif"
      },
      {
        name: "Cryptomonnaies",
        icon: Bitcoin,
        description: "Actifs digitaux",
        category: "Digital"
      },
      {
        name: "Produits structurés",
        icon: Shield,
        description: "Protection du capital",
        category: "Complexe"
      },
      {
        name: "Crédit lombard",
        icon: Briefcase,
        description: "Sur portefeuille titres",
        category: "Financement"
      }
    ],
    7: [ // Obtenir un financement
      {
        name: "Prêt immobilier RP",
        icon: Home,
        description: "Résidence principale",
        category: "Immobilier"
      },
      {
        name: "Prêt immobilier RS",
        icon: Home,
        description: "Résidence secondaire",
        category: "Immobilier"
      },
      {
        name: "Prêt immobilier locatif",
        icon: Key,
        description: "Bien destiné à la location",
        category: "Immobilier"
      },
      {
        name: "Prêt relais",
        icon: RotateCw,
        description: "Avance en attendant la vente",
        category: "Immobilier"
      },
      {
        name: "Prêt in fine",
        icon: TrendingUp,
        description: "Capital remboursé à la fin",
        category: "Immobilier"
      },
      {
        name: "Crédit marchand de biens",
        icon: Wrench,
        description: "Achat, rénover, revendre",
        category: "Spécialisé"
      },
      {
        name: "Crédit lombard",
        icon: Briefcase,
        description: "Sur portefeuille titres",
        category: "Spécialisé"
      },
      {
        name: "Rachat de crédits",
        icon: ArrowRightLeft,
        description: "Regroupement de prêts",
        category: "Restructuration"
      },
      {
        name: "Crédit hypothécaire",
        icon: Building,
        description: "Garanti par un bien immobilier",
        category: "Restructuration"
      },
      {
        name: "Prêt consommation",
        icon: Package,
        description: "Biens, travaux, projets",
        category: "Spécifique"
      },
      {
        name: "Prêt viager hypothécaire",
        icon: Heart,
        description: "Pour séniors, liquidité sans vente",
        category: "Spécifique"
      },
      {
        name: "Vente à réméré",
        icon: Receipt,
        description: "Liquidité avec rachat possible",
        category: "Spécifique"
      }
    ],
    8: [ // Assurer / Protéger ma famille
      {
        name: "Assurance emprunteur",
        icon: ShieldCheck,
        description: "Protection crédit",
        category: "Crédit"
      },
      {
        name: "Complémentaire Santé",
        icon: Heart,
        description: "Couverture santé optimale",
        category: "Santé"
      },
      {
        name: "Santé expatriés",
        icon: Globe,
        description: "Santé internationale",
        category: "Santé"
      },
      {
        name: "Assurance voyage",
        icon: Plane,
        description: "Protection voyage",
        category: "Santé"
      },
      {
        name: "Assurance habitation",
        icon: Home,
        description: "Protection du logement",
        category: "Habitation"
      },
      {
        name: "Assurance voiture",
        icon: Car,
        description: "Véhicule protégé",
        category: "Mobilité"
      },
      {
        name: "Assurance moto",
        icon: Bike,
        description: "Deux-roues assuré",
        category: "Mobilité"
      },
      {
        name: "Responsabilité civile",
        icon: Umbrella,
        description: "Protection dommages tiers",
        category: "Responsabilité"
      },
      {
        name: "Garantie accidents de la vie",
        icon: Shield,
        description: "Invalidité et séquelles",
        category: "Prévoyance"
      },
      {
        name: "Protection juridique",
        icon: Shield,
        description: "Assistance et défense juridique",
        category: "Services"
      }
    ]
  };

  return solutionsMap[selectionIndex] || [];
};

const FeaturesCarouselSection = () => {
  const [selection, setSelection] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [showTopOverlay, setShowTopOverlay] = useState(false);
  const [showBottomOverlay, setShowBottomOverlay] = useState(true);

  const handleSolutionsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = element;

    // Show top overlay if scrolled down
    setShowTopOverlay(scrollTop > 10);

    // Show bottom overlay if not at bottom
    setShowBottomOverlay(scrollTop < scrollHeight - clientHeight - 10);
  };

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    carouselApi.scrollTo(selection);
  }, [carouselApi, selection]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setSelection(carouselApi.selectedScrollSnap());
    };
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="relative py-16 overflow-hidden border-t-2 border-b-2 border-gray-300 dark:border-gray-700">
      {/* Grille de fond */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_20%,#000_100%)]" />
      </div>
      
      {/* Bordure supérieure */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container relative">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        </div>
      </div>
      
      <div className="container relative">
        <div className="flex flex-col gap-8 md:flex-row-reverse">
          <div className="md:w-1/2 rounded-3xl bg-gray-50 dark:bg-gray-900 p-8 lg:p-12">
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white">
                  {(() => {
                    const Icon = features[selection].icon;
                    return Icon ? <Icon className="w-6 h-6" /> : null;
                  })()}
                  <span>{features[selection].title}</span>
                </div>
                <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                  Vous naviguez sans vision claire et avez besoin d'une stratégie patrimoniale globale adaptée à vos objectifs
                </p>
                <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "J'aimerais avoir une vision claire de ma situation et savoir exactement quoi faire pour atteindre mes objectifs patrimoniaux"
                  </p>
                </div>

                {/* Solutions cards */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Nos solutions
                  </h3>
                  <div className="relative">
                    <div
                      className={`grid gap-3 ${
                        getSolutionsForFeature(selection).length > 7 ? "max-h-[560px] overflow-y-auto pr-2" : ""
                      }`}
                      onScroll={getSolutionsForFeature(selection).length > 7 ? handleSolutionsScroll : undefined}
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgb(209 213 219) transparent'
                      }}>
                      {getSolutionsForFeature(selection).map((solution, index) => (
                        <div
                          key={index}
                          className="group relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <solution.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                                  {solution.name}
                                </h4>
                                {solution.category && (
                                  <Badge variant="secondary" className="text-xs">
                                    {solution.category}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {solution.description}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Overlay gradient pour indiquer le scroll */}
                    {getSolutionsForFeature(selection).length > 7 && (
                      <>
                        <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent pointer-events-none transition-opacity duration-300 ${
                          showBottomOverlay ? 'opacity-100' : 'opacity-0'
                        }`} />
                        <div className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-50 dark:from-gray-900 to-transparent pointer-events-none transition-opacity duration-300 ${
                          showTopOverlay ? 'opacity-100' : 'opacity-0'
                        }`} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col md:w-1/2 md:pr-8 lg:pr-24 lg:text-left 2xl:pr-32">
            <h2 className="mb-6 text-3xl font-bold text-pretty lg:text-5xl">
              Nos services phares
            </h2>
            <p className="mb-16 text-muted-foreground lg:text-xl">
              Découvrez nos solutions sur-mesure pour optimiser, protéger et développer votre patrimoine.
              Chaque service est conçu pour répondre à vos objectifs spécifiques.
            </p>
            <ul className="relative space-y-2">
              {features.map((feature, i) => (
                <li
                  key={feature.id}
                  className={`group relative w-full cursor-pointer px-6 py-3 transition rounded-lg ${
                    selection === i ? "bg-gray-200 dark:bg-gray-800" : ""
                  }`}
                  onClick={() => setSelection(i)}
                >
                  {/* Ligne de connexion verticale */}
                  {i < features.length - 1 && (
                    <div className="absolute left-[31px] -bottom-2 h-[calc(100%+8px)] w-px">
                      <div className="h-full w-full bg-gradient-to-b from-gray-300/80 via-gray-300/60 to-gray-300/40 dark:from-gray-700/80 dark:via-gray-700/60 dark:to-gray-700/40" />
                    </div>
                  )}
                  
                  {/* Point de connexion */}
                  <div className="absolute left-[27px] top-1/2 -translate-y-1/2 z-10">
                    <div className={`size-2 rounded-full transition-all duration-300 ${
                      selection === i
                        ? "ring-4 ring-black/10 bg-black dark:ring-white/10 dark:bg-white scale-150"
                        : "bg-gray-400 dark:bg-gray-600"
                    }`} />
                  </div>
                  
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-2 pl-6">
                      {feature.icon && (
                        <feature.icon className="size-4 text-accent-foreground" />
                      )}
                      <div className="text-sm font-semibold text-accent-foreground">
                        {feature.title}
                      </div>
                    </div>
                    <div className={`flex size-8 items-center justify-center rounded-full transition-all ${
                      selection === i
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-accent text-accent-foreground group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black"
                    }`}>
                      <ChevronDown className={`size-4 shrink-0 transition-transform duration-200 ${
                        selection === i ? "rotate-180" : ""
                      }`} />
                    </div>
                  </div>
                  {selection === i && (
                    <div className="text-sm font-medium pl-6">
                      <p className="my-4 text-muted-foreground lg:my-6">
                        {feature.description}
                      </p>
                      <a
                        href={feature.href}
                        className="group/link flex items-center pb-3 text-sm text-accent-foreground"
                      >
                        En savoir plus{" "}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bordure inférieure */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container relative">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export { FeaturesCarouselSection };