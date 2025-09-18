'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  ShieldCheck,
  Landmark,
  Building2,
  PiggyBank,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

interface CaseStudy {
  id: string
  theme: string
  title: string
  summary: string
  persona: string
  icon: React.ComponentType<{ className?: string }>
  situation: string
  objectives: string[]
  solutions: Array<{
    label: string
    detail: string
  }>
  results: Array<{
    label: string
    value: string
  }>
}

const caseStudies: CaseStudy[] = [
  {
    id: 'transmission',
    theme: 'Transmission',
    title: 'Préparer la cession familiale d’une PME',
    summary: 'Couple de dirigeants, 58 & 56 ans – Valeur d’entreprise 3,4 M€',
    persona: 'Couple fondateur d’une PME industrielle, 2 enfants impliqués dans la structure.',
    icon: ShieldCheck,
    situation:
      'Volonté de transmettre l’entreprise à la prochaine génération en limitant la fiscalité et en sécurisant le revenu du couple.',
    objectives: [
      'Baisser les droits de mutation lors de la transmission des titres',
      'Préserver des revenus confortables pour le couple après la cession',
      'Structurer la gouvernance familiale',
    ],
    solutions: [
      { label: 'Pacte Dutreil (75%)', detail: 'Mise sous Pacte Dutreil et engagement collectif sur 4 ans.' },
      { label: 'Holding patrimoniale', detail: 'Création d’une holding animatrice pour piloter la transmission progressive.' },
      { label: 'Contrat de capitalisation', detail: 'Placement de 900 K€ issus du cash-out pour générer 42 K€/an.' },
    ],
    results: [
      { label: 'Économie de droits', value: '312 K€' },
      { label: 'Rente sécurisée', value: '3 500 €/mois' },
      { label: 'Durée du projet', value: '5 mois' },
    ],
  },
  {
    id: 'defiscalisation-immobiliere',
    theme: 'Investissement immobilier',
    title: 'Créer un patrimoine locatif défiscalisant',
    summary: 'Cadre supérieur, 42 ans – Revenus 160 K€/an, TMI 41 %',
    persona: 'Cadre dirigeant souhaitant démarrer dans l’immobilier sans y consacrer son temps.',
    icon: Building2,
    situation:
      'Fiscalité lourde (impôt + prélèvements > 48 K€/an). Besoin de préparer un complément de revenu et de réduire la pression fiscale.',
    objectives: [
      'Réduire immédiatement l’impôt sur le revenu',
      'Constituer un patrimoine locatif rentable',
      'Externaliser la gestion locative',
    ],
    solutions: [
      { label: 'LMNP clé en main', detail: 'Acquisition d’un immeuble rénové & meublé (cash-flow neutre).' },
      { label: 'Déficit foncier', detail: 'Travaux pilotés permettant 68 K€ de déficit imputable.' },
      { label: 'Pilotage locatif', detail: 'Mandat de gestion + assurance vacance 24 mois.' },
    ],
    results: [
      { label: 'Impôts économisés', value: '18 K€/an' },
      { label: 'Patrimoine constitué', value: '3 lots loués' },
      { label: 'Taux d’effort', value: '0 €' },
    ],
  },
  {
    id: 'reduction-impot',
    theme: 'Optimisation fiscale',
    title: 'Transformer un bonus en capital productif',
    summary: 'Dirigeant salarié, 48 ans – Bonus annuel de 120 K€',
    persona: 'Directeur financier fortement imposé, souhaite investir sans prendre de risques excessifs.',
    icon: Landmark,
    situation:
      'Bonus soumis à la flat-tax et à l’impôt sur le revenu. Objectif : réduire la fiscalité immédiate et placer sur du moyen terme.',
    objectives: [
      'Limiter la fiscalité sur le bonus',
      'Capitaliser sur des supports diversifiés et pilotés',
      'Préparer la retraite dans 10-12 ans',
    ],
    solutions: [
      { label: 'PER Individuel', detail: 'Versement de 60 K€ déductibles sur un PER en architecture ouverte.' },
      { label: 'Girardin industriel', detail: 'Montage sécurisé via opérateur bancaire pour gommer 24 K€ d’impôt.' },
      { label: 'SCI à l’IS', detail: 'Achat de murs professionnels loués à l’entreprise (rendement 6,2 %).' },
    ],
    results: [
      { label: 'Impôt effacé', value: '24 K€' },
      { label: 'Capitalisé sur PER', value: '60 K€' },
      { label: 'Rendement cible', value: '6,2 % net' },
    ],
  },
  {
    id: 'placements-financiers',
    theme: 'Placements financiers',
    title: 'Booster la trésorerie d’entreprise',
    summary: 'Start-up profitable – Trésorerie excédentaire 1,8 M€',
    persona: 'CEO de scale-up post-levée souhaitant sécuriser la trésorerie et générer du rendement.',
    icon: PiggyBank,
    situation:
      'Trésorerie dormante sur comptes à vue. Besoin de combiner disponibilité, sécurité et rendement supérieur à l’inflation.',
    objectives: [
      'Segmenter la trésorerie court/moyen/long terme',
      'Mettre en place un reporting clair pour les associés',
      'Rester liquides sur 12 mois de charges fixes',
    ],
    solutions: [
      { label: 'Fonds monétaires ESG', detail: '700 K€ placés en monétaire court terme (T+1).' },
      { label: 'Obligataire corporate', detail: 'Portefeuille 24 mois (rendement cible 4,3 %).' },
      { label: 'Contrat de capitalisation', detail: 'Optimisation du cash à horizon 5 ans avec fiscalité soft.' },
    ],
    results: [
      { label: 'Rendement ciblé', value: '4,1 % net' },
      { label: 'Visibilité de trésorerie', value: '36 mois' },
      { label: 'Reporting', value: 'Mensuel digitalisé' },
    ],
  },
  {
    id: 'patrimoine-international',
    theme: 'Patrimoine international',
    title: 'Installer une famille expatriée en France',
    summary: 'Famille expatriée revenant de Singapour – Patrimoine financier 2,1 M€',
    persona: 'Cadre dirigeant rapatrié, souhaite organiser ses avoirs entre plusieurs juridictions.',
    icon: LineChart,
    situation:
      'Multiples comptes offshore, absence de stratégie successorale française, fiscalité à aligner avec le retour.',
    objectives: [
      'Optimiser la fiscalité à l’arrivée et éviter la double imposition',
      'Structurer les placements selon les règles françaises',
      'Sécuriser la scolarité internationale des enfants',
    ],
    solutions: [
      { label: 'Trust dénoué & remploi', detail: 'Re-logement des avoirs via assurance-vie luxembourgeoise.' },
      { label: 'Assurance-vie France/Lux', detail: 'Allocation pilotée multi-devises.' },
      { label: 'Convention fiscale', detail: 'Optimisation par rescrit & suivi déclaratif impatrié.' },
    ],
    results: [
      { label: 'Fiscalité optimisée', value: '-32 % d’IR sur 3 ans' },
      { label: 'Allocation pilotée', value: '2 devises majeures' },
      { label: 'Protection familiale', value: '100 % couverte' },
    ],
  },
]

export function ClientJourney() {
  const [activeCaseId, setActiveCaseId] = useState(caseStudies[0].id)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const activeIndex = caseStudies.findIndex((item) => item.id === activeCaseId)
  const activeCase = caseStudies[activeIndex] ?? caseStudies[0]
  const progress = (activeIndex / (caseStudies.length - 1)) * 100

  // Auto-play toutes les 10 secondes
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveCaseId(prevId => {
        const currentIndex = caseStudies.findIndex(item => item.id === prevId)
        const nextIndex = (currentIndex + 1) % caseStudies.length
        return caseStudies[nextIndex].id
      })
    }, 10000) // 10 secondes

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Fonction pour gérer le clic sur une carte
  const handleCaseClick = (caseId: string) => {
    setActiveCaseId(caseId)
    setIsAutoPlaying(false) // Arrêter l'auto-play
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background py-20">
      <div className="absolute inset-0 bg-grid-black/[0.03] dark:bg-grid-white/[0.03]" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 md:px-6">
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Parcours clients
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Solutions adaptées à chaque situation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Découvrez nos solutions à travers 5 cas concrets. Explorez les dispositifs et stratégies qui correspondent à votre situation patrimoniale.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[320px,1fr] lg:items-start">
          <div className="relative">
            <div className="absolute left-4 top-6 bottom-6 hidden w-px bg-border/60 lg:block" aria-hidden="true" />
            <div
              className="absolute left-4 top-6 hidden w-px bg-primary lg:block transition-all duration-300"
              style={{ height: `${progress}%` }}
              aria-hidden="true"
            />
            
            {/* Indicateur d'auto-play */}
            {isAutoPlaying && (
              <div className="absolute -top-2 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Auto-play actif
                </div>
              </div>
            )}

            <ScrollArea className="max-h-[540px] pr-2">
              <div className="flex flex-col gap-4">
                {caseStudies.map((item, index) => {
                  const Icon = item.icon
                  const isActive = item.id === activeCaseId
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleCaseClick(item.id)}
                      className={cn(
                        'group relative rounded-2xl border p-5 text-left transition-all duration-300',
                        isActive
                          ? 'border-primary/70 bg-primary/5 shadow-lg shadow-primary/10'
                          : 'border-border/70 bg-background/80 hover:border-primary/40 hover:bg-primary/5'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          'rounded-xl border p-3 transition-colors',
                          isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background'
                        )}
                        >
                          <Icon className={cn('h-5 w-5', !isActive && 'text-primary')} />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Cas #{index + 1} · {item.theme}</p>
                          <h3 className="mt-1 text-lg font-semibold leading-snug">{item.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>

          <div className="relative rounded-3xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {activeCase.theme}
              </Badge>
              <span className="text-sm text-muted-foreground">{activeCase.persona}</span>
            </div>

            <h3 className="mt-6 text-2xl font-bold md:text-3xl">{activeCase.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{activeCase.situation}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Objectifs clés</h4>
                <ul className="mt-3 space-y-3">
                  {activeCase.objectives.map((objective) => (
                    <li key={objective} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Dispositifs activés</h4>
                <div className="mt-3 space-y-2">
                  {activeCase.solutions.map((solution) => (
                    <div
                      key={solution.label}
                      className="rounded-xl border border-primary/20 bg-primary/5 p-3"
                    >
                      <div className="text-sm font-semibold text-primary">{solution.label}</div>
                      <p className="text-xs text-muted-foreground">{solution.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-start gap-3">
              {activeCase.results.map((result) => (
                <div
                  key={result.label}
                  className="flex min-w-[160px] flex-col rounded-2xl border border-emerald-200/60 bg-emerald-50/40 px-4 py-3 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-900/30 dark:text-emerald-100"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide">{result.label}</span>
                  <span className="text-lg font-bold">{result.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Envie d’un diagnostic similaire ? Planifiez un échange gratuitement avec un expert Hagnéré.
              </div>
              <Button asChild size="lg" className="group">
                <Link href="/calendly">
                  Discuter de votre projet
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
