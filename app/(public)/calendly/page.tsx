import type { Metadata } from 'next'
import Script from 'next/script'
import { Calendar, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { GridSquares } from '@/components/grid-squares'

const CALENDLY_URL = 'https://calendly.com/clement-hagnere-patrimoine?hide_gdpr_banner=1&primary_color=000000'

export const metadata: Metadata = {
  title: 'Prendre rendez-vous | Hagnéré Patrimoine',
  description:
    "Réservez un appel découverte gratuit avec un conseiller Hagnéré Patrimoine pour discuter de votre stratégie patrimoniale.",
  keywords: [
    'prendre rendez-vous',
    'consultation gratuite',
    'appel découverte',
    'conseiller patrimonial',
    'Hagnéré Patrimoine',
  ],
  alternates: {
    canonical: 'https://hagnere-patrimoine.fr/calendly',
  },
  openGraph: {
    title: 'Prendre rendez-vous — Appel découverte gratuit | Hagnéré Patrimoine',
    description:
      'Planifiez un appel gratuit avec notre équipe pour explorer les meilleures solutions patrimoniales pour votre situation.',
    type: 'website',
    url: 'https://hagnere-patrimoine.fr/calendly',
    images: [
      {
        url: 'https://hagnere-patrimoine.fr/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Hagnéré Patrimoine - Conseillers en gestion de patrimoine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prendre rendez-vous — Appel découverte gratuit | Hagnéré Patrimoine',
    description:
      'Planifiez un échange avec un expert Hagnéré Patrimoine pour définir votre stratégie patrimoniale.',
    images: ['https://hagnere-patrimoine.fr/opengraph-image.png'],
  },
}

const faqItems = [
  {
    q: 'Les consultations sont-elles gratuites ?',
    a: "Oui, cette consultation de 30 à 45 minutes est entièrement gratuite et sans engagement. C'est l'occasion de faire connaissance et de comprendre vos enjeux patrimoniaux.",
  },
  {
    q: "Que dois-je préparer pour l'appel ?",
    a: 'Préparez vos questions et, si possible, une vision rapide de votre situation (objectifs, patrimoine, fiscalité). Plus nous avons d’informations, plus nos recommandations seront pertinentes.',
  },
  {
    q: 'Quelle est la différence entre les types de rendez-vous ?',
    a: 'Nous proposons plusieurs formats : audit découverte, optimisation patrimoniale approfondie ou accompagnement premium. Choisissez celui qui correspond à votre besoin.',
  },
  {
    q: 'Et si je dois reporter ou annuler ?',
    a: 'Pas de souci : vous recevez un email de confirmation contenant un lien pour modifier ou annuler votre rendez-vous à tout moment.',
  },
  {
    q: "L'appel se fait par téléphone ou en visio ?",
    a: 'Les deux sont possibles selon vos préférences. Vous pouvez sélectionner la modalité souhaitée lors de la réservation.',
  },
  {
    q: 'Qui sera mon interlocuteur ?',
    a: 'Un conseiller Hagnéré Patrimoine spécialisé sur votre problématique (fiscalité, investissement immobilier, transmission…) prendra contact avec vous.',
  },
]

export default function CalendlyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                Consultation
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Rendez-vous - Hagnéré Patrimoine
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Choisissez le rendez-vous adapté à vos besoins et réservez votre créneau à la date et heure de votre choix.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-black dark:text-white">📍</span>
                  <span>Hagnéré Patrimoine / Hagnéré Investissement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black dark:text-white">📞</span>
                  <span>Appel téléphonique / Visioconférence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black dark:text-white">⏱️</span>
                  <span>De 45 minutes à 2 Heures</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="container-site">
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-card shadow-xl">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-center text-primary-foreground">
                <Calendar className="mx-auto mb-3 h-8 w-8" />
                <h3 className="mb-2 text-xl font-semibold">Sélectionnez votre créneau</h3>
                <p className="text-sm opacity-90">
                  Choisissez le moment qui vous convient le mieux pour notre échange
                </p>
              </div>
              <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ minWidth: 320, height: 700 }} />
            </div>
          </div>

          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

          <div className="mt-20">
            <div className="mx-auto max-w-[70ch] text-center">
              <p className="text-xs text-muted-foreground">Questions fréquentes</p>
              <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-5xl">
                FAQ — Prise de rendez-vous
              </h2>
              <p className="mt-2 text-pretty text-xs text-muted-foreground sm:mt-3 sm:text-base">
                Tout ce qu’il faut savoir avant de réserver votre consultation
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-4xl divide-y overflow-hidden rounded-xl border border-border/70 bg-card sm:rounded-2xl">
              {faqItems.map((item, idx) => (
                <details key={item.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-3 text-left text-sm font-medium sm:gap-4 sm:px-4 sm:py-4 sm:text-lg">
                    <span>{item.q}</span>
                    <span className="flex items-center gap-2">
                      <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs text-muted-foreground transition-colors group-open:bg-primary/10 group-open:text-primary">
                        Q{idx + 1}
                      </span>
                      <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="px-3 pb-3 text-xs text-muted-foreground sm:px-4 sm:pb-4 sm:text-base">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            <noscript>
              <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center dark:border-yellow-800 dark:bg-yellow-900/20">
                <p>
                  JavaScript est désactivé dans votre navigateur. Pour réserver un créneau, visitez directement{' '}
                  <a className="font-semibold text-primary underline" href="https://calendly.com/hagnerepatrimoine/appel-decouverte" rel="noopener noreferrer">
                    notre page Calendly
                  </a>
                  .
                </p>
              </div>
            </noscript>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Prendre rendez-vous - Consultation gratuite',
            url: 'https://hagnere-patrimoine.fr/calendly',
            description: 'Réservez votre consultation gratuite avec les experts Hagnéré Patrimoine',
            publisher: {
              '@type': 'Organization',
              name: 'Hagnéré Patrimoine',
              url: 'https://hagnere-patrimoine.fr',
            },
          }),
        }}
      />
    </div>
  )
}
