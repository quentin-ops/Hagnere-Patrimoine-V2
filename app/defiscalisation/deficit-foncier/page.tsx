import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Calculator,
  FileSearch,
  Handshake,
  HelpCircle,
  Sparkles,
  Target,
  Wallet,
  Youtube,
} from "lucide-react"

import { Hero223 } from "@/components/ui/hero223"
import { Hero210Images } from "@/components/ui/hero210-images"
import { Feature76 } from "@/components/ui/feature76"
import { ServicesPharesTabs } from "@/components/services-phares-tabs"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Déficit foncier 2025 : réduisez vos impôts avec l'immobilier locatif",
  description:
    "Comprenez le déficit foncier, ses avantages fiscaux, les risques et nos méthodes d'accompagnement pour optimiser votre patrimoine immobilier en 2025.",
}


const knowledgeSections = [
  {
    heading: "Qu'est-ce que le déficit foncier ?",
    content: (
      <>
        <p>
          Le déficit foncier correspond au solde négatif d'un investissement locatif lorsque les charges déductibles (travaux, frais de gestion, intérêts d'emprunt, assurance) dépassent les loyers encaissés. Ce mécanisme est réservé aux bailleurs imposés au régime réel d'imposition sur les revenus fonciers et intervient principalement lors de travaux de rénovation lourde.
        </p>
        <p>
          Dès lors qu'un déficit est constaté, il s'impute d'abord sur les revenus fonciers existants, puis sur le revenu global dans la limite annuelle de 10 700 €. La fraction supérieure est reportable sur les revenus fonciers pendant 10 ans, ce qui en fait un outil adapté aux foyers fortement fiscalisés.
        </p>
      </>
    ),
  },
  {
    heading: "Avantages fiscaux du déficit foncier",
    content: (
      <ul className="grid gap-2 text-muted-foreground">
        <li>
          <strong className="text-foreground">Allègement immédiat :</strong> un couple imposé à 41 % récupère jusqu'à 4 387 € d'impôts sur 10 700 € de déficit imputé sur le revenu global.
        </li>
        <li>
          <strong className="text-foreground">Report du surplus :</strong> le déficit excédentaire est reportable 10 ans sur les revenus fonciers, ce qui neutralise les loyers futurs.
        </li>
        <li>
          <strong className="text-foreground">IFI et valorisation :</strong> les travaux viennent réduire la valeur taxable à l'IFI pendant la durée du chantier et améliorent le potentiel de revente.
        </li>
      </ul>
    ),
  },
  {
    heading: "Inconvénients et points de vigilance",
    content: (
      <ul className="grid gap-2 text-muted-foreground">
        <li>
          Obligation de location nue pendant au moins 3 ans après l'imputation du déficit sur le revenu global, sous peine de remise en cause fiscale.
        </li>
        <li>
          Risque de dépassement budgétaire sur les travaux ; d'où la nécessité d'un budget détaillé, de devis sécurisés et d'un suivi comptable précis.
        </li>
        <li>
          Le dispositif est incompatible avec certains régimes forfaitaires (micro-foncier) et ne concerne pas la location meublée.
        </li>
      </ul>
    ),
  },
  {
    heading: "Fiscalité détaillée et plafonds",
    content: (
      <>
        <p>
          L'article 156 du CGI limite l'imputation sur le revenu global à 10 700 € par an. Les intérêts d'emprunt restent imputables seulement sur les revenus fonciers. Les travaux d'agrandissement ou de construction ne sont pas éligibles, tandis que les travaux d'amélioration, de réparation ou d'entretien le sont. Les références BOFiP (BOI-RFPI-BASE-30-20-10) encadrent la doctrine administrative et doivent guider chaque prise de décision.
        </p>
        <p>
          En copropriété, veillez à intégrer les appels de fonds travaux. En cas de déficit structurel supérieur au plafond, un lissage pluriannuel peut être organisé pour optimiser l'impact sur plusieurs exercices fiscaux.
        </p>
      </>
    ),
  },
  {
    heading: "Comment investir avec Hagnéré Patrimoine ?",
    content: (
      <ul className="grid gap-2 text-muted-foreground">
        <li>
          <strong className="text-foreground">1. Diagnostic personnalisé :</strong> analyse fiscale, étude des cash-flows et compatibilité avec vos autres dispositifs.
        </li>
        <li>
          <strong className="text-foreground">2. Sourcing du bien :</strong> sélection d'immeubles ou d'appartements nécessitant des travaux ciblés, avec estimation locative post-rénovation.
        </li>
        <li>
          <strong className="text-foreground">3. Pilotage des travaux :</strong> réseau d'artisans labellisés, suivi budgétaire, archivage des factures pour la déclaration fiscale.
        </li>
        <li>
          <strong className="text-foreground">4. Mise en location :</strong> accompagnement juridique (baux, diagnostics) et stratégie de sortie à 3-5 ans selon vos objectifs.
        </li>
      </ul>
    ),
  },
]

const caseStudies = [
  {
    title: "Couple cadres à Lyon",
    scenario:
      "Revenus combinés de 92 k€ - Travaux de rénovation énergétique d'un T3 de 55 k€. Déficit imputable de 10 700 € sur le revenu global.",
    impact: "Économie d'impôt : 4 387 € la première année (TMI 41 %) + neutralisation de 8 300 € de loyers sur 8 ans.",
  },
  {
    title: "Investisseur patrimonial",
    scenario:
      "Portefeuille locatif de 5 biens. Travaux de toiture sur immeuble de rapport (38 k€) financés à crédit.",
    impact: "Déficit reportable sur 10 ans couvrant la totalité des loyers nets, autofinancement du crédit sur 6 années.",
  },
  {
    title: "Transmission anticipée",
    scenario:
      "Donation d'un immeuble à enfants majeurs, suivi d'une campagne de travaux pilotée via une SCI familiale.",
    impact: "Réduction de l'assiette IFI, loyers stabilisés, sortie en location meublée après 3 ans pour prolonger l'optimisation fiscale.",
  },
]

const partners = [
  { name: "Notaires partenaires", description: "Sécurisation des actes et clauses fiscales" },
  { name: "Experts-comptables", description: "Tenue comptable et télédéclaration optimisée" },
  { name: "Banques privées", description: "Financement dédié aux travaux et différé sur mesure" },
  { name: "Architectes & BET", description: "Études énergétiques, audits structurels et suivi de chantier" },
]

const crossSelling = [
  {
    title: "Location meublée LMNP / LMP",
    description: "Optimisez vos loyers grâce à l'amortissement et la fiscalité BIC.",
    href: "/defiscalisation/lmnp-lmp",
    icon: Wallet,
  },
  {
    title: "Girardin Industriel",
    description: "Réduction d'impôt immédiate grâce aux investissements en Outre-mer.",
    href: "/defiscalisation/girardin",
    icon: Calculator,
  },
  {
    title: "Assurance-vie haut de gamme",
    description: "Capitalisation long terme et optimisation successorale personnalisée.",
    href: "/services/elite-patrimoine",
    icon: Target,
  },
]

const faqItems = [
  {
    question: "Quels sont les plafonds d'imputation du déficit foncier ?",
    answer:
      "L'imputation sur le revenu global est plafonnée à 10 700 € par an, hors intérêts d'emprunt. Le surplus est reportable pendant 10 ans sur vos revenus fonciers.",
  },
  {
    question: "Peut-on cumuler déficit foncier et dispositif Pinel ?",
    answer:
      "Oui, à condition de distinguer les biens et de respecter les obligations locatives. Le déficit foncier s'applique sur un bien loué nu au régime réel, pendant que le Pinel encadre un autre logement.",
  },
  {
    question: "Quels sont les travaux éligibles ?",
    answer:
      "Sont éligibles les travaux de réparation, d'entretien et d'amélioration. Les travaux de construction, reconstruction ou agrandissement sont exclus et doivent être isolés comptablement.",
  },
  {
    question: "Que se passe-t-il en cas de revente anticipée ?",
    answer:
      "Si vous revendez ou transformez le bien avant trois ans, l'administration fiscale peut réintégrer le déficit imputé sur le revenu global. D'où l'importance de planifier la durée de détention.",
  },
  {
    question: "Comment déclarer un déficit foncier ?",
    answer:
      "La déclaration se fait via les formulaires 2044 ou 2044-SPE. Les factures et justificatifs doivent être conservés pendant 3 ans. Nous préparons le dossier complet pour votre expert-comptable.",
  },
  {
    question: "Le déficit foncier est-il compatible avec la SCI ?",
    answer:
      "Oui s'il s'agit d'une SCI translucide à l'impôt sur le revenu. Les associés imputent alors le déficit à proportion de leurs parts.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

export default function DeficitFoncierPage() {
  return (
    <div className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero223 />

      <Hero210Images />

      <Feature76 />

      <ServicesPharesTabs />

      <section className="border-y bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Comprendre le dispositif
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">Tout comprendre au déficit foncier</h2>
            <p className="mt-4 text-muted-foreground">
              Une synthèse complète pour maîtriser les règles fiscales, les stratégies d'exécution et les points de vigilance avant d'investir.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
            <div className="space-y-4 rounded-2xl border bg-background p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Sommaire rapide</h3>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {knowledgeSections.map((section) => (
                  <li key={section.heading} className="flex items-center gap-2">
                    <Sparkles className="size-4 text-foreground" />
                    <span>{section.heading}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-muted p-4 text-sm text-foreground">
                <p className="font-medium">Le saviez-vous ?</p>
                <p>
                  Depuis 2023, les travaux énergétiques permettant de sortir du statut de passoire thermique sont prioritaires pour les banques et pour l'administration fiscale.
                </p>
              </div>
            </div>
            <div className="grid gap-10 text-base leading-relaxed text-muted-foreground">
              {knowledgeSections.map((section) => (
                <article key={section.heading} className="space-y-4 rounded-2xl border bg-background p-8 shadow-sm">
                  <h3 className="text-2xl font-semibold text-foreground">{section.heading}</h3>
                  <div className="space-y-3 text-muted-foreground">{section.content}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl border bg-muted p-8 shadow-lg backdrop-blur-sm md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">Est-ce adapté à votre situation ?</h3>
              <p className="text-muted-foreground">
                Nos conseillers patrimoniaux analysent votre fiscalité, votre capacité d'investissement et vos objectifs successoraux pour bâtir un plan d'action cohérent.
              </p>
            </div>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Parlez à un expert Hagnéré Patrimoine</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Cas pratiques
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">Exemples concrets &amp; simulations</h2>
            <p className="mt-4 text-muted-foreground">
              Des scénarios chiffrés pour visualiser l'impact du déficit foncier selon votre niveau d'imposition et la nature des travaux.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.title} className="border bg-card">
                <CardHeader className="space-y-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileSearch className="size-5 text-foreground" />
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>{study.scenario}</p>
                  <p className="rounded-xl border bg-muted p-4 text-foreground">
                    {study.impact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4">
            Réseau d'excellence
          </Badge>
          <h2 className="text-3xl font-semibold sm:text-4xl">Nos partenaires à vos côtés</h2>
          <p className="mt-4 text-muted-foreground">
            Hagnéré Patrimoine coordonne un écosystème de professionnels habilités pour sécuriser chaque étape : acquisition, travaux, financement et déclaration fiscale.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {partners.map((partner) => (
            <Card key={partner.name} className="border bg-card">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="rounded-full bg-muted p-3 text-foreground">
                  <Handshake className="size-6" />
                </div>
                <div>
                  <CardTitle>{partner.name}</CardTitle>
                  <CardDescription>{partner.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="outline">Vidéo explicative</Badge>
            <h2 className="text-3xl font-semibold">
              Comprendre le déficit foncier en moins de 5 minutes
            </h2>
            <p className="text-muted-foreground">
              Notre équipe décrypte les conditions d'éligibilité, l'impact sur l'impôt sur le revenu et la manière de piloter les travaux. Un contenu pédagogique dédié à vos premières décisions.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Youtube className="size-6 text-foreground" />
              <span>Chaîne YouTube Hagnéré Investissement</span>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-3xl border shadow-2xl">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/3pH30YQMPmA"
              title="Déficit foncier expliqué"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl font-semibold sm:text-4xl">Questions fréquentes</h2>
          <p className="mt-4 text-muted-foreground">
            Une foire aux questions orientée SEO pour répondre aux principaux doutes et vous guider vers un dossier conforme.
          </p>
        </div>
        <div className="mt-12 grid gap-4">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-start gap-3 text-lg font-semibold text-foreground">
                <HelpCircle className="size-5 text-foreground" />
                {item.question}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Explorez nos solutions
            </Badge>
            <h2 className="text-3xl font-semibold">Vous souhaitez découvrir d'autres leviers fiscaux ?</h2>
            <p className="mt-4 text-muted-foreground">
              Diversifiez votre stratégie d'optimisation et comparez les dispositifs selon vos objectifs de revenus, de capitalisation ou de transmission.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {crossSelling.map((solution) => (
              <Card key={solution.title} className="border bg-card transition-colors">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="rounded-full bg-muted p-3 text-foreground">
                    <solution.icon className="size-5" />
                  </div>
                  <div>
                    <CardTitle>{solution.title}</CardTitle>
                    <CardDescription>{solution.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={solution.href}>Découvrir</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto space-y-6 px-4 text-sm leading-relaxed text-muted-foreground">
          <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
            Hagnéré Patrimoine — Cabinet de conseil en gestion de patrimoine
          </div>
          <div className="grid gap-4 text-center md:grid-cols-3 md:text-left">
            <div>
              <p className="font-semibold text-foreground">Coordonnées</p>
              <p>Siège : Chambéry • Interventions France entière</p>
              <p>Contact : contact@hagnere-patrimoine.fr • +33 (0)4 79 00 00 00</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Statuts réglementés</p>
              <p>ORIAS n° 22 000 000 • Conseiller en investissements financiers affilié ANACOFI-CIF</p>
              <p>Carte T et mandat d'intermédiaire en opérations de banque et services de paiement</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Mentions</p>
              <p>
                Les performances passées ne préjugent pas des performances futures. Toute décision d'investissement doit être précédée d'une étude personnalisée.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
