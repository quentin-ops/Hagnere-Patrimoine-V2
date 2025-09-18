'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import GlobeWrapper from '@/components/globe-wrapper'
import { DiamondRain } from '@/components/diamond-rain'
import { ProblemsSolutionsSection } from '@/components/problems-solutions-section'
import { PartnersSection } from '@/components/partners-section'
import { ProductsGrid } from '@/components/products-grid'
import { ExpertsSection } from '@/components/experts-section'
import { HeroFullscreen } from '@/components/hero-fullscreen'
import { ObjectivesTabs } from '@/components/objectives-tabs'
import { ArrowDown, ArrowRight, Shield, TrendingUp, Users, Percent, Award, Home as HomeIcon, Landmark, FileCheck, TrendingDown, LineChart, Compass, Clock, Gift, Calculator, Building2, Shuffle, Target, Search, Sparkles, CheckCircle2, Mail, Phone, MapPin, Linkedin, Instagram, Crown, Star, Smartphone, RefreshCw, Briefcase, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'


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

const processSteps: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: 'Diagnostic gratuit',
    description:
      'On analyse votre patrimoine et vos objectifs pour dresser un point de situation clair.',
    icon: Search,
  },
  {
    title: 'Stratégie personnalisée',
    description:
      "Vous recevez un plan d'action lisible, chiffré et adapté à vos enjeux fiscaux et patrimoniaux.",
    icon: Sparkles,
  },
  {
    title: 'Mise en place & suivi',
    description:
      'Nous orchestrons les démarches et assurons un accompagnement durable avec des ajustements réguliers.',
    icon: CheckCircle2,
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
      {/* Hero Fullscreen */}
      <HeroFullscreen />

      {/* Section suivante après le Hero - ajustée pour l'animation */}
      <section className="relative py-4 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div>
            {/* Certifications Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gestion de Patrimoine Card */}
              <div className="rounded-xl bg-gradient-to-br from-white via-sky-200 to-sky-300 dark:bg-card p-6 relative overflow-hidden border border-border">
                {/* Overlay background - light mode only */}
                <div className="absolute inset-[-20px] z-0 dark:hidden">
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-200 to-sky-300" />
                    <div className="absolute inset-0 opacity-90 bg-[radial-gradient(90%_90%_at_35%_45%,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.9)_20%,_rgba(88,175,255,0.55)_40%,_rgba(37,144,255,0.6)_65%,_rgba(24,119,242,0.75)_100%)] animate-[gradientShift_8s_ease-in-out_infinite] mix-blend-screen" />
                    <div className="absolute -right-10 -top-10 h-[70%] w-[65%] rounded-[48px] blur-[46px] bg-[radial-gradient(60%_60%_at_50%_50%,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.55)_40%,_rgba(255,255,255,0)_100%)]" />
                    <div className="absolute right-[-8%] top-[-10%] h-[140%] w-[78%] rounded-[56px] blur-[36px] opacity-85 animate-[pinkShift_7s_ease-in-out_infinite] bg-[radial-gradient(120%_140%_at_85%_35%,_rgba(244,114,182,0.65)_0%,_rgba(168,85,247,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(244,114,182,0)_78%)]" />
                    <div className="absolute right-[-10%] top-[-15%] h-[150%] w-[70%] blur-[28px] opacity-80 bg-[radial-gradient(140%_120%_at_100%_20%,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.7)_30%,_rgba(255,255,255,0.25)_58%,_rgba(255,255,255,0)_78%)]" />
                  </div>
                  <style jsx>{`
                    @keyframes gradientShift {
                      0% { transform: translate3d(0,0,0) scale(1) rotate(0deg); filter: hue-rotate(0deg); }
                      25% { transform: translate3d(-8%, 5%, 0) scale(1.15) rotate(3deg); filter: hue-rotate(15deg); }
                      50% { transform: translate3d(6%, -8%, 0) scale(0.95) rotate(-2deg); filter: hue-rotate(-10deg); }
                      75% { transform: translate3d(-5%, -3%, 0) scale(1.1) rotate(1deg); filter: hue-rotate(20deg); }
                      100% { transform: translate3d(0,0,0) scale(1) rotate(0deg); filter: hue-rotate(0deg); }
                    }
                    @keyframes pinkShift {
                      0% { transform: translateX(0) translateY(0) rotate(8deg) scale(1); }
                      20% { transform: translateX(-15%) translateY(10%) rotate(12deg) scale(1.2); }
                      40% { transform: translateX(10%) translateY(-15%) rotate(5deg) scale(0.9); }
                      60% { transform: translateX(-8%) translateY(5%) rotate(10deg) scale(1.15); }
                      80% { transform: translateX(12%) translateY(-8%) rotate(6deg) scale(0.95); }
                      100% { transform: translateX(0) translateY(0) rotate(8deg) scale(1); }
                    }
                    @keyframes floatWild {
                      0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
                      20% { transform: translateY(-40px) translateX(30px) scale(1.1); }
                      40% { transform: translateY(25px) translateX(-35px) scale(0.95); }
                      60% { transform: translateY(-30px) translateX(40px) scale(1.15); }
                      80% { transform: translateY(35px) translateX(-25px) scale(0.9); }
                    }
                    @keyframes floatCrazy {
                      0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                      25% { transform: translateY(-50px) translateX(-40px) rotate(10deg); }
                      50% { transform: translateY(40px) translateX(45px) rotate(-15deg); }
                      75% { transform: translateY(-35px) translateX(-50px) rotate(5deg); }
                    }
                  `}</style>
                </div>
                {/* Animated background blobs for light mode */}
                <div className="pointer-events-none absolute inset-[-20px] z-0 dark:hidden overflow-hidden" aria-hidden>
                  <span className="absolute left-[-5%] top-[-5%] h-[250px] w-[250px] rounded-full bg-gradient-to-br from-sky-200 to-sky-100 opacity-60 blur-[60px]"
                    style={{
                      animation: 'floatWild 15s ease-in-out infinite'
                    }}/>
                  <span className="absolute right-[-8%] top-[10%] h-[220px] w-[220px] rounded-full bg-gradient-to-br from-pink-100 to-pink-50 opacity-35 blur-[55px]"
                    style={{
                      animation: 'floatCrazy 12s ease-in-out infinite reverse'
                    }}/>
                  <span className="absolute left-[40%] bottom-[-10%] h-[240px] w-[240px] rounded-full opacity-35 blur-[65px]"
                    style={{
                      background: 'linear-gradient(to bottom right, rgba(255, 218, 185, 0.4), rgba(255, 239, 213, 0.3))',
                      animation: 'floatWild 14s ease-in-out infinite 1s'
                    }}/>
                  <span className="absolute right-[10%] bottom-[5%] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-blue-200 to-blue-100 opacity-55 blur-[50px]"
                    style={{
                      animation: 'floatCrazy 10s ease-in-out infinite 0.5s'
                    }}/>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <img
                      src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/logos/logo-hagnere-patrimoine-light.png"
                      alt="Hagnéré Patrimoine"
                      className="h-10 w-auto dark:block hidden"
                    />
                    <img
                      src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757959641758-10aa25709c02fbdd.webp"
                      alt="Hagnéré Patrimoine"
                      className="h-10 w-auto dark:hidden block"
                    />
                  </div>

                  <p className="text-lg font-semibold text-black mb-2">
                    Gestion de Patrimoine 360°
                  </p>

                  <p className="text-sm text-gray-600 mb-4 text-justify">
                    Accompagnement personnalisé pour tous vos projets patrimoniaux.
                    Bilan complet, stratégies d'optimisation fiscale, préparation retraite
                    et transmission. Solutions adaptées à partir de 150K€ de patrimoine.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-black text-black text-xs">Bilan patrimonial</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">Optimisation fiscale</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">Retraite</Badge>
                    <Badge variant="outline" className="border-black text-black text-xs">Transmission</Badge>
                  </div>

                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-gray-800"
                    asChild
                  >
                    <Link href="/services/hagnere-patrimoine">
                      Découvrir nos services
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Elite Patrimoine Card */}
              <div className="rounded-xl bg-zinc-950 p-6 relative overflow-hidden">
                {/* Diamond rain animation */}
                <DiamondRain />

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    <img
                      src="/logos/logo-hagnere-elite-light.png"
                      alt="Hagnéré Elite Patrimoine"
                      className="h-10 w-auto"
                    />
                  </div>

                  <p className="text-lg font-semibold text-white mb-2 font-playfair italic">
                    Gestion de Fortune Privée Premium
                  </p>

                  <p className="text-sm text-zinc-300 mb-4 text-justify">
                    Service exclusif dédié aux patrimoines supérieurs à 1M€.
                    Accompagnement ultra-personnalisé, conseiller dédié 24/7,
                    opportunités exclusives et gestion discrétionnaire.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs">Conseiller dédié</Badge>
                    <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs">Opportunités exclusives</Badge>
                    <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs">Gestion discrétionnaire</Badge>
                    <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs">Family Office</Badge>
                  </div>

                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-zinc-100"
                    asChild
                  >
                    <Link href="/elite-patrimoine">
                      Accès Elite
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Objectives Tabs Section */}
      <ObjectivesTabs />

      {/* CTA Section - Client Satisfaction */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border">
              {/* Background gradient - light mode only */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-200 to-sky-300 dark:from-[#09090b] dark:via-[#09090b] dark:to-[#09090b]" />

              {/* Animated gradient overlay - light mode strong, dark mode very subtle */}
              <div className="absolute inset-0 opacity-90 dark:opacity-10 animate-[gradientShift_10s_ease-in-out_infinite_alternate] mix-blend-screen dark:mix-blend-lighten">
                <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_35%_45%,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.9)_20%,_rgba(88,175,255,0.55)_40%,_rgba(37,144,255,0.6)_65%,_rgba(24,119,242,0.75)_100%)] dark:bg-[radial-gradient(90%_90%_at_35%_45%,_rgba(255,255,255,0.05)_0%,_rgba(255,255,255,0.03)_20%,_rgba(255,255,255,0.02)_40%,_rgba(255,255,255,0.01)_65%,_rgba(0,0,0,0)_100%)]" />
              </div>

              {/* White glow blob - light mode only */}
              <div className="absolute -right-10 -top-10 h-[70%] w-[65%] rounded-[48px] blur-[46px] bg-[radial-gradient(60%_60%_at_50%_50%,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.55)_40%,_rgba(255,255,255,0)_100%)] dark:bg-transparent" />

              {/* Pink/violet blob - light mode only */}
              <div className="absolute right-[-8%] top-[-10%] h-[140%] w-[78%] rounded-[56px] blur-[36px] opacity-85 dark:opacity-5 animate-[pinkShift_10s_ease-in-out_infinite_alternate] bg-[radial-gradient(120%_140%_at_85%_35%,_rgba(244,114,182,0.65)_0%,_rgba(168,85,247,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(244,114,182,0)_78%)] dark:bg-[radial-gradient(120%_140%_at_85%_35%,_rgba(255,255,255,0.02)_0%,_rgba(255,255,255,0.01)_35%,_rgba(0,0,0,0)_56%,_rgba(0,0,0,0)_78%)]" />

              {/* Additional glow - light mode only */}
              <div className="absolute right-[-10%] top-[-15%] h-[150%] w-[70%] blur-[28px] opacity-80 dark:opacity-0 bg-[radial-gradient(140%_120%_at_100%_20%,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.7)_30%,_rgba(255,255,255,0.25)_58%,_rgba(255,255,255,0)_78%)]" />

              {/* Content */}
              <div className="relative z-10 p-8 md:p-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Rejoignez + de 762 clients satisfaits
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      Déjà plus de 5 années d'expérience dans la gestion de patrimoine
                    </p>
                </div>

                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-xl" asChild>
                    <Link href="/bilan-gratuit">
                      Demander votre audit gratuit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <style jsx>{`
                @keyframes gradientShift {
                  0% { transform: translate3d(0,0,0) scale(1); filter: hue-rotate(0deg); }
                  100% { transform: translate3d(-3.5%, -2%, 0) scale(1.04); filter: hue-rotate(8deg); }
                }
                @keyframes pinkShift {
                  0% { transform: translateX(0) rotate(8deg); }
                  100% { transform: translateX(-5%) rotate(8deg); }
                }
              `}</style>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-border">
                Solutions complètes
              </Badge>
              <h2 className="text-3xl font-bold">
                Notre catalogue de solutions
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Une gamme complète de solutions patrimoniales pour répondre à tous vos besoins,
                de la constitution à la transmission de votre patrimoine.
              </p>
            </div>

            {/* Products Grid */}
            <ProductsGrid />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-border">
                Méthode éprouvée
              </Badge>
              <h2 className="text-3xl font-bold">
                Comment cela fonctionne simplement ?
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Une méthode fluide pour protéger et développer votre patrimoine,
                avec un interlocuteur dédié qui vous guide à chaque étape.
              </p>
                  </div>

            {/* Animation styles for horizontal particle flow */}
            <style jsx>{`
              @keyframes flow-horizontal-1 {
                0% {
                  left: -4px;
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  left: 100%;
                  opacity: 0;
                }
              }

              @keyframes flow-horizontal-2 {
                0% {
                  left: -4px;
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  left: 100%;
                  opacity: 0;
                }
              }

              @keyframes flow-horizontal-3 {
                0% {
                  left: -4px;
                  opacity: 0;
                }
                10% {
                  opacity: 1;
                }
                90% {
                  opacity: 1;
                }
                100% {
                  left: 100%;
                  opacity: 0;
                }
              }

              @keyframes flow-horizontal-4 {
                0% {
                  left: -6px;
                  opacity: 0;
                }
                10% {
                  opacity: 0.7;
                }
                90% {
                  opacity: 0.7;
                }
                100% {
                  left: 100%;
                  opacity: 0;
                }
              }

              .animate-flow-horizontal-1 {
                animation: flow-horizontal-1 3s linear infinite;
              }

              .animate-flow-horizontal-2 {
                animation: flow-horizontal-2 3s linear infinite 0.8s;
              }

              .animate-flow-horizontal-3 {
                animation: flow-horizontal-3 3s linear infinite 1.6s;
              }

              .animate-flow-horizontal-4 {
                animation: flow-horizontal-4 3s linear infinite 2.4s;
              }
            `}</style>

            {/* Process Steps */}
            <div className="grid gap-8 md:grid-cols-3">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative">
                    {/* Connection line with animated particles for desktop */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-[40px] left-[100%] w-full z-0">
                        <div className="relative w-full h-[2px] bg-gradient-to-r from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                          {/* Animated particles */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute w-1 h-1 bg-black dark:bg-white rounded-full animate-flow-horizontal-1 top-[-2px]"></div>
                            <div className="absolute w-1 h-1 bg-black dark:bg-white rounded-full animate-flow-horizontal-2 top-[-2px]"></div>
                            <div className="absolute w-1 h-1 bg-black dark:bg-white rounded-full animate-flow-horizontal-3 top-[-2px]"></div>
                            <div className="absolute w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-flow-horizontal-4 opacity-70 top-[-3px]"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card */}
                    <div className="relative bg-card border rounded-lg p-6 hover:shadow-lg transition-all h-full flex flex-col">
                      {/* Step number and Icon */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl font-bold text-gray-200 dark:text-gray-800">
                          0{index + 1}
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                      </div>

                      {/* Content - flex-1 to push badge to bottom */}
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>

                      {/* Badge - always at bottom */}
                      <div className="mt-4 pt-4">
                        <Badge variant="secondary" className="text-xs">
                          {index === 0 && "Gratuit et sans engagement"}
                          {index === 1 && "Solutions sur-mesure"}
                          {index === 2 && "Suivi régulier inclus"}
                        </Badge>
                    </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <ExpertsSection />

      {/* Why Choose Us Section - Redesigned */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-black/20 text-black dark:border-white/20 dark:text-white">
              La différence Hagnéré
            </Badge>
            <h2 className="text-4xl font-bold">
              Pourquoi choisir Hagnéré Patrimoine ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Une expertise reconnue, une approche unique et des résultats concrets pour développer et sécuriser votre patrimoine
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 - Réglementation ORIAS/AMF */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">ORIAS/AMF</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Activité réglementée
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Enregistré ORIAS et contrôlé AMF pour une sécurité totale de vos investissements
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Opportunités exclusives */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Exclusif</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Opportunités exclusives
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Accès privilégié aux meilleurs placements : SCPI premium, private equity, produits structurés
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Experience Premium */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Premium</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Expérience client VIP
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Réponse en -24h, RDV visio à la demande, conseiller dédié disponible 6j/7
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 - Simulations chiffrées */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Data-driven</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Simulations concrètes
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Chaque solution testée avec projections chiffrées pour un impact mesurable garanti
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 - Suivi digital */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">100% digital</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Plateforme moderne
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Suivi en ligne, documents sécurisés, reporting temps réel accessible 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6 - Partenariats */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Top tier</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Partenaires premium
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Accords avec les leaders du marché : Amundi, Primonial, La Française, Swiss Life
                  </p>
                </div>
              </div>
            </div>

            {/* Card 7 - Expertise 360 */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">360°</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Expertise complète
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Fiscalité, retraite, immobilier, transmission : un seul interlocuteur expert
                  </p>
                </div>
              </div>
            </div>

            {/* Card 8 - Suivi évolutif */}
            <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-2xl transition-all group-hover:scale-150" />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-gray-700 dark:text-white/90" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Adaptatif</Badge>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Stratégie évolutive
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Révision trimestrielle, adaptation aux changements fiscaux et patrimoniaux
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Globe 3D Section - Moved here after Product Catalog */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <GlobeWrapper />
        </div>
      </section>

      {/* Partners Section */}
      <section id="partenaires">
        <PartnersSection />
      </section>

      {/* Problems & Services Section */}
      <ProblemsSolutionsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer - Modern Shadcn UI Black/White Theme */}
      <footer className="bg-white dark:bg-background border-t border-gray-200 dark:border-border">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="px-6 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                    Hagnéré Patrimoine
          </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Conseil en gestion de patrimoine et de fortune indépendant.
                    Stratégies sur-mesure, accompagnement premium et transparence totale.
              </p>
            </div>
            
                {/* Contact Info */}
                <div className="space-y-3">
                  {contactItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-card flex items-center justify-center">
                          <Icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.label}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                  >
                    <Link href="/votre-projet">
                      Bilan patrimonial gratuit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Footer Links Columns */}
              {footerColumns.map((column) => (
                <div key={column.title} className="space-y-4">
                  <h3 className="text-sm font-semibold text-black dark:text-white">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-border">
            <div className="px-6 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © {new Date().getFullYear()} Hagnéré Patrimoine. Tous droits réservés.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full border border-gray-300 dark:border-border flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
            </div>
            
                {/* Legal Links */}
                <div className="flex items-center gap-4">
                  <Link
                    href="/mentions-legales"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Mentions légales
                  </Link>
                  <Link
                    href="/confidentialite"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                  <Link
                    href="/cookies"
                    className="text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
