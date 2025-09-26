'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { DiamondRain } from '@/components/diamond-rain'
import { ProblemsSolutionsSection } from '@/components/problems-solutions-section'
import { PartnersSection } from '@/components/partners-section'
import { ProductsGrid } from '@/components/products-grid'
import { ExpertsSection } from '@/components/experts-section'
import { HeroAurora } from '@/components/hero-aurora'
import { ServicesPharesTabs } from '@/components/services-phares-tabs'
import { LineShadowText } from '@/components/ui/line-shadow-text'
import { ArrowDown, ArrowRight, Shield, TrendingUp, Users, Percent, Award, Home as HomeIcon, Landmark, FileCheck, TrendingDown, LineChart, Compass, Clock, Gift, Calculator, Building2, Shuffle, Target, Search, Sparkles, CheckCircle2, Mail, Phone, MapPin, Linkedin, Instagram, Crown, Star, Smartphone, RefreshCw, Briefcase, Calendar, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { CTARippleSection } from '@/components/cta-ripple-section'
import { AgrementsSection } from '@/components/agrements-section'
import { ExpertiseCardsSection } from '@/components/expertise-cards-section'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { logoUrls } from '@/lib/logo-config'
import { FeatureSection } from '@/components/feature-section'
import { Feature85Section } from '@/components/feature85-section'
import { WorldMapSection } from '@/components/world-map-section'


const painPoints = [
  {
    title: 'Impôts trop lourds',
    description: 'Réduisez légalement votre fiscalité grâce aux optimisations disponibles.',
    icon: Percent,
  },
  {
    title: 'Placements peu performants',
    description: 'Boostez vos rendements avec des solutions adaptées à votre profil.',
    icon: TrendingDown,
  },
  {
    title: 'Investissements décevants',
    description: 'Stratégie claire et diversifiée pour de vrais résultats.',
    icon: LineChart,
  },
  {
    title: 'Stratégie absente',
    description: 'Feuille de route claire pour éviter les décisions coûteuses.',
    icon: Compass,
  },
  {
    title: 'Retraite non préparée',
    description: 'Maintenez votre niveau de vie en anticipant dès maintenant.',
    icon: Clock,
  },
  {
    title: 'Transmission complexe',
    description: 'Protégez vos proches et évitez conflits et frais inutiles.',
    icon: Gift,
  },
  {
    title: 'Comptabilité mal gérée',
    description: 'Structurez et simplifiez vos obligations fiscales.',
    icon: Calculator,
  },
  {
    title: 'Immobilier mal structuré',
    description: 'Le bon montage pour optimiser vos acquisitions.',
    icon: Building2,
  },
  {
    title: 'Famille non protégée',
    description: 'Sécurisez l\'avenir de vos proches face aux imprévus.',
    icon: Shield,
  },
  {
    title: 'Changements de vie',
    description: 'Adaptez votre stratégie à chaque étape importante.',
    icon: Users,
  },
  {
    title: 'Patrimoine dispersé',
    description: 'Vision claire et pilotage global de tous vos actifs.',
    icon: Shuffle,
  },
  {
    title: 'Opportunités manquées',
    description: 'Accédez aux meilleures solutions du marché.',
    icon: Target,
  },
]

const strengths: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: 'Conseil sur-mesure d\'experts agréés',
    description: 'Stratégies personnalisées par des conseillers certifiés AMF et ORIAS.',
    icon: Award,
  },
  {
    title: 'Frais bas et 100% transparents',
    description: 'Aucun frais caché, honoraires clairs dès le départ.',
    icon: Percent,
  },
  {
    title: 'Disponibilité et proximité garanties',
    description: 'Conseiller dédié joignable 6j/7, réponse sous 24h maximum.',
    icon: Users,
  },
  {
    title: 'Vision patrimoniale long terme',
    description: 'Stratégie globale sur 10-20 ans avec ajustements réguliers.',
    icon: TrendingUp,
  },
  {
    title: 'Indépendance totale',
    description: 'Aucun conflit d\'intérêts, nous travaillons uniquement pour vous.',
    icon: Shield,
  },
]

const processSteps: Array<{ title: string; description: string; icon: LucideIcon; duration: string }> = [
  {
    title: 'Diagnostic gratuit',
    description:
      'On analyse votre patrimoine et vos objectifs pour dresser un point de situation clair.',
    icon: Search,
    duration: '30 minutes',
  },
  {
    title: 'Stratégie personnalisée',
    description:
      "Vous recevez un plan d'action lisible, chiffré et adapté à vos enjeux fiscaux et patrimoniaux.",
    icon: Sparkles,
    duration: '7 jours',
  },
  {
    title: 'Mise en place & suivi',
    description:
      'Nous orchestrons les démarches et assurons un accompagnement durable avec des ajustements réguliers.',
    icon: CheckCircle2,
    duration: 'Continu',
  },
  {
    title: 'Optimisation continue',
    description:
      'Adaptation permanente de votre stratégie aux évolutions fiscales et à vos nouveaux objectifs.',
    icon: TrendingUp,
    duration: 'À vie',
  },
]

const footerColumns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Nos expertises',
    links: [
      { label: 'Gestion patrimoniale 360°', href: '/services/hagnere-patrimoine' },
      { label: 'Family Office Elite', href: '/services/elite-patrimoine' },
      { label: 'Accompagnement international', href: '/votre-projet' },
      { label: 'Ressources & conseils', href: '/ressources' },
    ],
  },
  {
    title: 'À propos',
    links: [
      { label: 'Notre méthode', href: '/#processus' },
      { label: 'Success stories', href: '/#cas-clients' },
      { label: 'Partenaires', href: '/#partenaires' },
      { label: 'Actualités', href: '/ressources' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Prendre rendez-vous', href: '/votre-projet' },
      { label: 'Espace client', href: '/connexion' },
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
    ],
  },
]

const contactItems: Array<{ icon: LucideIcon; label: string; href?: string }> = [
  {
    icon: MapPin,
    label: 'Paris & accompagnement national',
  },
  {
    icon: Phone,
    label: '+33 1 86 95 24 10',
    href: 'tel:+33186952410',
  },
  {
    icon: Mail,
    label: 'contact@hagnerepatrimoine.com',
    href: 'mailto:contact@hagnerepatrimoine.com',
  },
]

const socialLinks: Array<{ icon: LucideIcon; label: string; href: string }> = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hagnere-patrimoine',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/hagnerepatrimoine',
  },
]

const casesData = [
  {
    id: 1,
    theme: 'Transmission',
    title: "Préparer la cession familiale d'une PME",
    description: "Couple fondateur d'une PME industrielle, 2 enfants impliqués dans la structure. Volonté de transmettre l'entreprise à la prochaine génération en limitant la fiscalité et en sécurisant le revenu du couple.",
    objectives: [
      'Baisser les droits de mutation lors de la transmission des titres',
      'Préserver des revenus confortables pour le couple après la cession',
      'Structurer la gouvernance familiale'
    ],
    devices: [
      { name: 'Pacte Dutreil (75%)', detail: 'Mise sous Pacte Dutreil et engagement collectif sur 4 ans.' },
      { name: 'Holding patrimoniale', detail: "Création d'une holding animatrice pour piloter la transmission progressive." },
      { name: 'Contrat de capitalisation', detail: 'Placement de 900 K€ issus du cash-out pour générer 42 K€/an.' }
    ],
    results: [
      { label: 'Économie de droits', value: '312 K€' },
      { label: 'Rente sécurisée', value: '3 500 €/mois' },
      { label: 'Durée du projet', value: '5 mois' }
    ]
  },
  {
    id: 2,
    theme: 'Investissement immobilier',
    title: 'Créer un patrimoine locatif défiscalisant',
    description: "Cadre dirigeant souhaitant démarrer dans l'immobilier sans y consacrer son temps. Fiscalité lourde (impôt + prélèvements > 48 K€/an). Besoin de préparer un complément de revenu et de réduire la pression fiscale.",
    objectives: [
      "Réduire immédiatement l'impôt sur le revenu",
      'Constituer un patrimoine locatif rentable',
      'Externaliser la gestion locative'
    ],
    devices: [
      { name: 'LMNP clé en main', detail: "Acquisition d'un immeuble rénové & meublé (cash-flow neutre)." },
      { name: 'Déficit foncier', detail: 'Travaux pilotés permettant 68 K€ de déficit imputable.' },
      { name: 'Pilotage locatif', detail: 'Mandat de gestion + assurance vacance 24 mois.' }
    ],
    results: [
      { label: 'Économie IR immédiate', value: '28 K€/an' },
      { label: 'Patrimoine créé', value: '820 K€' },
      { label: 'Rendement net', value: '4,8%' }
    ]
  },
  {
    id: 3,
    theme: 'Optimisation fiscale',
    title: 'Transformer un bonus en capital productif',
    description: "Dirigeant salarié avec bonus annuel conséquent. Souhaite réduire la charge fiscale et faire fructifier son épargne plutôt que de tout perdre en impôts.",
    objectives: [
      "Réduire l'impôt sur les revenus exceptionnels",
      'Constituer une épargne productive',
      'Préparer la retraite'
    ],
    devices: [
      { name: 'PER individuel', detail: 'Versement de 45 K€ déductible du revenu imposable.' },
      { name: 'Contrat Madelin', detail: 'Abondement de 25 K€/an sur contrat retraite complémentaire.' },
      { name: 'Assurance-vie', detail: 'Placement de 50 K€ en gestion pilotée diversifiée.' }
    ],
    results: [
      { label: 'Économie IR', value: '31 K€' },
      { label: 'Capital retraite', value: '+185 K€' },
      { label: 'Performance moyenne', value: '5,2%/an' }
    ]
  },
  {
    id: 4,
    theme: 'Placements financiers',
    title: "Booster la trésorerie d'entreprise",
    description: "Start-up profitable avec trésorerie excédentaire importante. Besoin d'optimiser le cash sans prendre de risques excessifs tout en gardant de la flexibilité.",
    objectives: [
      'Optimiser la trésorerie excédentaire',
      'Maintenir la liquidité pour les opportunités',
      'Diversifier les risques'
    ],
    devices: [
      { name: 'Contrat de capitalisation', detail: 'Placement de 800 K€ avec rachat partiel possible.' },
      { name: 'OPCVM obligataires', detail: 'Allocation de 600 K€ sur fonds datés (3-5 ans).' },
      { name: 'Compte à terme', detail: 'Placement de 400 K€ à 3,5% sur 18 mois.' }
    ],
    results: [
      { label: 'Rendement moyen', value: '4,1%/an' },
      { label: 'Gain total', value: '73 K€' },
      { label: 'Liquidité maintenue', value: '100%' }
    ]
  },
  {
    id: 5,
    theme: 'Patrimoine international',
    title: 'Installer une famille expatriée en France',
    description: "Famille américaine s'installant en France avec une fortune importante. Besoin de structurer le patrimoine selon le droit français et optimiser la fiscalité internationale.",
    objectives: [
      'Structurer le patrimoine selon le droit français',
      'Optimiser la convention fiscale France-USA',
      'Préparer la transmission internationale'
    ],
    devices: [
      { name: 'SCI patrimoniale', detail: 'Acquisition de la résidence principale via SCI familiale.' },
      { name: 'Trust français', detail: "Mise en place d'un trust compatible avec la fiscalité française." },
      { name: 'Assurance-vie luxembourgeoise', detail: 'Placement de 3 M€ en contrat multisupport international.' }
    ],
    results: [
      { label: 'Économie fiscale', value: '420 K€' },
      { label: 'Protection patrimoniale', value: '100%' },
      { label: 'Conformité', value: 'France & USA' }
    ]
  }
]

export default function Home() {
  const [selectedCase, setSelectedCase] = useState(1)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const currentCase = casesData.find(c => c.id === selectedCase) || casesData[0]

  return (
    <div className="min-h-screen">
      {/* Hero Aurora avec effet de fond animé */}
      <HeroAurora />

      {/* Agréments Section - Nouvelle section */}
      <AgrementsSection />

      {/* Expertise Cards Section - Double expertise */}
      <ExpertiseCardsSection />

      {/* Services Phares Tabs Section - New Feature106 style */}
      <ServicesPharesTabs />

      {/* CTA Section with BackgroundGradientAnimation - Navy Blue Theme */}
      <section className="py-32">
        <div className="container">
          <div className="relative h-[400px] overflow-hidden rounded-xl">
            <BackgroundGradientAnimation
              containerClassName="h-[400px] w-full rounded-xl"
              gradientBackgroundStart="rgb(3, 7, 30)"
              gradientBackgroundEnd="rgb(15, 23, 42)"
              firstColor="30, 58, 138"
              secondColor="29, 78, 216"
              thirdColor="55, 48, 163"
              fourthColor="30, 41, 59"
              fifthColor="67, 56, 202"
              pointerColor="59, 130, 246"
              size="60%"
              blendingValue="hard-light"
              interactive={true}
            >
              <div className="absolute inset-0 flex h-[400px] items-center justify-center px-4 sm:px-6 md:px-10 py-4 sm:py-6">
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                  <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-white">
                    Laissez-nous vous démontrer que l'on peut vous faire gagner beaucoup !
                  </h1>
                  <p className="mb-8 text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
                    Découvrez comment notre expertise peut transformer votre patrimoine.
                    Analyse gratuite, stratégie sur-mesure et résultats concrets garantis.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-blue-950 hover:bg-gray-100" asChild>
                      <Link href="/calendly">
                        <Calendar className="mr-2 h-5 w-5" />
                        Bilan patrimonial 360° gratuit
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10" asChild>
                      <Link href="/contact">
                        <Mail className="mr-2 h-5 w-5" />
                        Nous contacter
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </BackgroundGradientAnimation>
          </div>
        </div>
      </section>

      {/* Feature 85 Section - Product Catalog */}
      <Feature85Section />

      {/* How it Works Section */}
      <section className="py-32">
        <div className="container">
          <div className="text-left">
            <h2 className="mb-6 text-4xl font-semibold text-gray-900 dark:text-white lg:text-5xl">
              Comment cela fonctionne simplement ?
            </h2>
            <Button asChild className="mr-4 rounded-full">
              <Link href="/calendly">
                Commencer maintenant
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          {/* Feature Cards Section */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className={cn("mt-0 flex flex-col border-l px-6 sm:mt-4 md:mt-6")}
                >
                  {/* Masked Text - Big Number */}
                  <div className="relative mb-16">
                    <LineShadowText
                      as="h1"
                      className="text-9xl font-bold text-black/10 dark:text-white/10"
                      shadowColor="#000"
                    >
                      {`0${index + 1}`}
                    </LineShadowText>
                  </div>

                  <p className="text-md mt-4 mb-2 font-semibold">{step.title}</p>
                  <p className="text-md mb-6 text-muted-foreground">
                    {step.description}
                  </p>
                  <Badge variant="outline" className="w-fit gap-2 py-2">
                    <Clock className="size-4" />
                    {step.duration}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <ExpertsSection />

      {/* Feature Section - Why Choose Hagnéré Patrimoine */}
      <FeatureSection />

      {/* Partners Section */}
      <section id="partenaires">
        <PartnersSection />
      </section>

      {/* Problems & Services Section */}
      <ProblemsSolutionsSection />

      {/* World Map Section - International Reach */}
      <WorldMapSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Ripple Section */}
      <CTARippleSection />
    </div>
  );
}
