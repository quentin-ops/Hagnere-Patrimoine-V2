'use client'

import { ChangeEvent, useMemo, useState, useEffect } from 'react'
import { Hero202 } from '@/components/hero202'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { TracingBeam } from '@/components/ui/tracing-beam'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { BarChart3, Download, Info, Target, TrendingUp, Mail, Settings, Send, Loader2 } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import ShimmerButton from '@/components/magicui/shimmer-button'
import { Cta22 } from '@/components/cta22'
import { Faq5 } from '@/components/faq5'
import type { FaqItem } from '@/components/faq5'
import * as htmlToImage from 'html-to-image'
import html2canvas from 'html2canvas'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

const percentageFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const compactCurrencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  notation: 'compact',
  maximumFractionDigits: 1
})

const chartConfig = {
  contributions: {
    label: 'Capital investi',
    color: 'hsl(0, 0%, 0%)'
  },
  interest: {
    label: 'Intérêts composés',
    color: 'hsl(210, 100%, 50%)'
  }
} satisfies ChartConfig

type ContributionFrequency = 'monthly' | 'quarterly' | 'annually'
type CompoundingFrequency = 'daily' | 'monthly' | 'quarterly' | 'annually'
type ContributionTiming = 'start' | 'end'

type YearlyBreakdown = {
  year: number
  startingBalance: number
  contributions: number
  interest: number
  endingBalance: number
  realEndingBalance: number
  cumulativeContributions: number
  cumulativeInterest: number
}

type SimulationParams = {
  initialInvestment: number
  periodicContribution: number
  contributionFrequency: ContributionFrequency
  contributionTiming: ContributionTiming
  annualRate: number
  years: number
  compoundingFrequency: CompoundingFrequency
  annualIncrease: number
  inflationRate: number
  goalAmount: number
}

type SimulationResult = {
  finalBalance: number
  totalContributions: number
  totalInterest: number
  realFinalBalance: number
  yearlyBreakdown: YearlyBreakdown[]
  goalReachedAtYear: number | null
  doublingYear: number | null
  averageAnnualReturn: number
}

const contributionFrequencyMap: Record<ContributionFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1
}

const compoundingFrequencyMap: Record<CompoundingFrequency, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1
}

const contributionLabels: Record<ContributionFrequency, string> = {
  monthly: 'Versement mensuel',
  quarterly: 'Versement trimestriel',
  annually: 'Versement annuel'
}

const formatTimeKey = (value: number) => value.toFixed(6)

const parseLocaleNumber = (value: string): number => {
  if (!value) return 0
  const normalised = value.replace(/\s/g, '').replace(',', '.')
  const parsed = Number(normalised)
  return Number.isFinite(parsed) ? parsed : 0
}

const formatAmountFr = (value: string): string => {
  const num = parseLocaleNumber(value)
  try {
    return new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 2
    }).format(num)
  } catch {
    return value
  }
}


const buildContributionTimes = (frequency: number, timing: ContributionTiming) => {
  const times: number[] = []

  for (let index = 0; index < frequency; index++) {
    const time = timing === 'start' ? index / frequency : (index + 1) / frequency
    times.push(Number(time.toFixed(6)))
  }

  return times
}

const buildEventTimeline = (
  compoundingPeriods: number,
  contributionTimes: number[]
) => {
  const timeSet = new Set<number>()
  timeSet.add(0)

  for (let index = 0; index < compoundingPeriods; index++) {
    timeSet.add((index + 1) / compoundingPeriods)
  }

  contributionTimes.forEach(time => {
    if (time >= 0 && time <= 1) {
      timeSet.add(time)
    }
  })

  return Array.from(timeSet).sort((a, b) => a - b)
}

function computeSimulation(params: SimulationParams): SimulationResult {
  const {
    initialInvestment,
    periodicContribution,
    contributionFrequency,
    contributionTiming,
    annualRate,
    years,
    compoundingFrequency,
    annualIncrease,
    inflationRate,
    goalAmount
  } = params

  const sanitizedInitial = Math.max(initialInvestment, 0)
  const sanitizedContribution = Math.max(periodicContribution, 0)
  const sanitizedGoal = Math.max(goalAmount, 0)
  const sanitizedYears = Math.max(Math.round(years), 0)
  const inflationFactor = Math.max(1 + inflationRate / 100, 0)

  if (sanitizedYears === 0) {
    return {
      finalBalance: sanitizedInitial,
      totalContributions: sanitizedInitial,
      totalInterest: 0,
      realFinalBalance: sanitizedInitial,
      yearlyBreakdown: [],
      goalReachedAtYear: null,
      doublingYear: null,
      averageAnnualReturn: 0
    }
  }

  // Calcul simple avec la formule standard des intérêts composés
  const monthlyRate = annualRate / 100 / 12
  const contributionPeriods = contributionFrequencyMap[contributionFrequency]

  const yearlyBreakdown: YearlyBreakdown[] = []
  let balance = sanitizedInitial
  let totalContributions = sanitizedInitial
  let totalInterest = 0
  let goalReachedAtYear: number | null = null
  let doublingYear: number | null = null

  // Simulation année par année
  for (let year = 1; year <= sanitizedYears; year++) {
    const startingBalance = balance
    let yearContributions = 0
    let yearInterest = 0

    // Calcul mois par mois
    for (let month = 1; month <= 12; month++) {
      // Calcul des intérêts sur le solde actuel
      const monthInterestAmount = balance * monthlyRate
      balance += monthInterestAmount
      yearInterest += monthInterestAmount
      totalInterest += monthInterestAmount

      // Ajout du versement après les intérêts
      if (contributionFrequency === 'monthly') {
        balance += sanitizedContribution
        yearContributions += sanitizedContribution
        totalContributions += sanitizedContribution
      } else if (contributionFrequency === 'quarterly' && month % 3 === 1) {
        balance += sanitizedContribution
        yearContributions += sanitizedContribution
        totalContributions += sanitizedContribution
      } else if (contributionFrequency === 'annually' && month === 1) {
        balance += sanitizedContribution
        yearContributions += sanitizedContribution
        totalContributions += sanitizedContribution
      }
    }

    // Enregistrement des données de l'année
    yearlyBreakdown.push({
      year: year,
      startingBalance: startingBalance,
      contributions: year === 1 ? sanitizedInitial + yearContributions - sanitizedInitial : yearContributions,
      interest: yearInterest,
      endingBalance: balance,
      realEndingBalance: balance / Math.pow(inflationFactor, year),
      cumulativeContributions: totalContributions,
      cumulativeInterest: totalInterest
    })

    // Vérification des objectifs
    if (sanitizedGoal > 0 && goalReachedAtYear === null && balance >= sanitizedGoal) {
      goalReachedAtYear = year
    }

    if (doublingYear === null && totalContributions > 0 && balance >= totalContributions * 2) {
      doublingYear = year
    }
  }

  const finalBalance = balance
  const realFinalBalance = finalBalance / Math.pow(inflationFactor, sanitizedYears)

  const averageAnnualReturn = sanitizedYears > 0 && totalContributions > 0
    ? Math.pow(finalBalance / totalContributions, 1 / sanitizedYears) - 1
    : 0

  return {
    finalBalance,
    totalContributions,
    totalInterest,
    realFinalBalance,
    yearlyBreakdown,
    goalReachedAtYear,
    doublingYear,
    averageAnnualReturn
  }
}

export default function CompoundInterestCalculatorPage() {
  const { toast } = useToast()
  
  const [initialInvestmentInput, setInitialInvestmentInput] = useState('15000')
  const [periodicContributionInput, setPeriodicContributionInput] = useState('400')
  const [contributionFrequency, setContributionFrequency] = useState<ContributionFrequency>('monthly')
  const [annualRate, setAnnualRate] = useState(6)
  const [years, setYears] = useState(20)

  const contributionTiming: ContributionTiming = 'start'
  const compoundingFrequency: CompoundingFrequency = 'monthly'
  const annualIncrease = 0
  const inflationRate = 0
  const goalAmount = 0

  const initialInvestment = Math.max(parseLocaleNumber(initialInvestmentInput), 0)
  const periodicContribution = Math.max(parseLocaleNumber(periodicContributionInput), 0)

  const simulation = useMemo(
    () =>
      computeSimulation({
        initialInvestment,
        periodicContribution,
        contributionFrequency,
        contributionTiming,
        annualRate,
        years,
        compoundingFrequency,
        annualIncrease,
        inflationRate,
        goalAmount
      }),
    [
      initialInvestment,
      periodicContribution,
      contributionFrequency,
      contributionTiming,
      annualRate,
      years,
      compoundingFrequency,
      annualIncrease,
      inflationRate,
      goalAmount
    ]
  )

  const chartData = useMemo(
    () =>
      simulation.yearlyBreakdown.map(year => {
        const contributions = year.cumulativeContributions
        const interest = Math.max(year.endingBalance - contributions, 0)

        return {
          year: year.year,
          yearLabel: `${year.year}`,
          contributions,
          interest,
          endingBalance: year.endingBalance
        }
      }),
    [simulation.yearlyBreakdown]
  )

  const hasChartData = chartData.length > 0

  const tooltipValueFormatter = (value: number | string) =>
    currencyFormatter.format(typeof value === 'number' ? value : Number(value))

  const handleNumberInput = (
    setter: (value: number) => void,
    transform: (value: number) => number = value => value
  ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value)
      setter(Number.isNaN(value) ? 0 : transform(value))
    }

  const handleTextInput = (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value)
    }

  const handleInitialInvestmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    setInitialInvestmentInput(formatAmountFr(raw))
  }

  const handlePeriodicContributionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    setPeriodicContributionInput(formatAmountFr(raw))
  }

  useEffect(() => {
    setInitialInvestmentInput(prev => formatAmountFr(prev))
    setPeriodicContributionInput(prev => formatAmountFr(prev))
  }, [])

  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [optinNewsletter, setOptinNewsletter] = useState(false)
  const [optinPartners, setOptinPartners] = useState(false)
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([])
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  
  // Domaines email populaires en France
  const popularDomains = [
    'gmail.com',
    'outlook.fr',
    'outlook.com',
    'hotmail.fr',
    'hotmail.com',
    'yahoo.fr',
    'yahoo.com',
    'orange.fr',
    'free.fr',
    'sfr.fr',
    'laposte.net',
    'icloud.com',
    'wanadoo.fr',
    'bbox.fr',
    'numericable.fr',
    'protonmail.com',
    'live.fr'
  ]
  
  // Générer des suggestions basées sur l'input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRecipientEmail(value)
    
    // Si l'utilisateur a tapé quelque chose avant @ et n'a pas encore de domaine complet
    if (value.includes('@')) {
      const [localPart, domainPart] = value.split('@')
      if (localPart && (!domainPart || domainPart.length < 5)) {
        // Filtrer les domaines qui correspondent au début tapé
        const matchingDomains = popularDomains
          .filter(domain => !domainPart || domain.toLowerCase().startsWith(domainPart.toLowerCase()))
          .slice(0, 5) // Limiter à 5 suggestions
          .map(domain => `${localPart}@${domain}`)
        setEmailSuggestions(matchingDomains)
      } else {
        setEmailSuggestions([])
      }
    } else if (value.length > 0) {
      // Suggérer des exemples de formats
      setEmailSuggestions([
        `${value}@gmail.com`,
        `${value}@outlook.fr`,
        `${value}@yahoo.fr`
      ])
    } else {
      setEmailSuggestions([])
    }
  }

  const sendEmail = async () => {
    try {
      setIsSending(true)
      setSendError(null)

      // Validation de l'email
      const cleanEmail = recipientEmail.trim()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!cleanEmail || !emailRegex.test(cleanEmail)) {
        toast({
          variant: "destructive",
          title: "Email invalide",
          description: "Veuillez entrer une adresse email valide (ex: nom@exemple.com)"
        })
        setIsSending(false)
        return
      }

      if (!acceptPrivacy) {
        toast({
          variant: "destructive",
          title: "Politique de confidentialité",
          description: "Vous devez accepter la politique de confidentialité pour continuer"
        })
        setSendError('Veuillez accepter la politique de confidentialité.')
        setIsSending(false)
        return
      }

      const chartImage = await captureChartPng()
      
      // Log pour débugger
      if (chartImage) {
        console.log('Image capturée, taille:', chartImage.length, 'caractères')
        console.log('Début de l\'image:', chartImage.substring(0, 50))
      } else {
        console.warn('Aucune image capturée')
      }
      
      const rows = simulation.yearlyBreakdown.map(y => ({
        year: y.year,
        startingBalance: y.startingBalance,
        contributions: y.contributions,
        interest: y.interest,
        endingBalance: y.endingBalance,
        realEndingBalance: y.realEndingBalance,
      }))

      const payload = {
        to: cleanEmail,
        toName: undefined,
        consents: {
          acceptPrivacy,
          newsletter: optinNewsletter,
          partners: optinPartners,
        },
        params: {
          initialInvestment,
          periodicContribution,
          contributionFrequency,
          annualRate,
          years,
        },
        kpis: {
          finalBalance: simulation.finalBalance,
          realFinalBalance: simulation.realFinalBalance,
          totalContributions: simulation.totalContributions,
          totalInterest: simulation.totalInterest,
          averageAnnualReturn: simulation.averageAnnualReturn,
        },
        rows,
        chartImage,
        logoUrl: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757959641758-10aa25709c02fbdd.webp'
      }

      const res = await fetch('/api/email/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const text = await res.text()
        
        // Parser le message d'erreur si c'est du JSON
        let errorMessage = text
        try {
          const errorData = JSON.parse(text)
          errorMessage = errorData.error || text
        } catch {
          // Si ce n'est pas du JSON, garder le texte brut
        }
        
        throw new Error(errorMessage || 'Erreur lors de l\'envoi de l\'email')
      }

      // Reset form and close dialog
      setEmailDialogOpen(false)
      setRecipientEmail('')
      setAcceptPrivacy(false)
      setOptinNewsletter(false)
      setOptinPartners(false)
      
      toast({
        title: "Email envoyé avec succès !",
        description: "Vérifiez votre boîte de réception pour consulter votre simulation."
      })
    } catch (err) {
      console.error(err)
      
      const errorMessage = err instanceof Error ? err.message : "Impossible d'envoyer l'email"
      
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: errorMessage
      })
      
      setSendError(errorMessage)
    } finally {
      setIsSending(false)
    }
  }

  const captureChartPng = async (): Promise<string | undefined> => {
    try {
      // Trouver le conteneur du graphique
      const container = document.querySelector('#projection-chart') as HTMLElement | null
      
      if (!container) {
        console.warn('Conteneur du graphique non trouvé')
        return undefined
      }
      
      // Vérifier que le graphique est visible
      const chartSvg = container.querySelector('svg')
      if (!chartSvg) {
        console.warn('SVG du graphique non trouvé, attente supplémentaire...')
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
      
      // Attendre que le graphique soit complètement rendu
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Utiliser html2canvas pour une meilleure capture
      try {
        const canvas = await html2canvas(container, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          windowWidth: container.scrollWidth,
          windowHeight: container.scrollHeight
        })
        
        const dataUrl = canvas.toDataURL('image/png', 1.0)
        console.log('Graphique capturé avec html2canvas')
        return dataUrl
      } catch (canvasError) {
        console.warn('Erreur avec html2canvas, essai avec html-to-image:', canvasError)
        
        // Fallback avec html-to-image
        const dataUrl = await htmlToImage.toPng(container, { 
          cacheBust: true, 
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          quality: 1
        })
        
        console.log('Graphique capturé avec html-to-image')
        return dataUrl
      }
    } catch (error) {
      console.error('Erreur lors de la capture du graphique:', error)
      return undefined
    }
  }

  const downloadPdf = async () => {
    try {
      setIsDownloadingPdf(true)
      // Afficher un indicateur de chargement
      const downloadButton = document.querySelector('button:has(.lucide-download)') as HTMLButtonElement
      const originalText = downloadButton?.textContent || ''
      if (downloadButton) {
        downloadButton.disabled = true
        downloadButton.textContent = 'Génération en cours...'
      }
      
      // Capture du graphique
      const chartImage = await captureChartPng()
      
      // Préparation des données
      const rows = simulation.yearlyBreakdown.map(y => ({
        year: y.year,
        startingBalance: y.startingBalance,
        contributions: y.contributions,
        interest: y.interest,
        endingBalance: y.endingBalance,
        realEndingBalance: y.realEndingBalance,
      }))

      const payload = {
        params: {
          initialInvestment,
          periodicContribution,
          contributionFrequency,
          annualRate,
          years,
        },
        kpis: {
          finalBalance: simulation.finalBalance,
          realFinalBalance: simulation.realFinalBalance,
          totalContributions: simulation.totalContributions,
          totalInterest: simulation.totalInterest,
          averageAnnualReturn: simulation.averageAnnualReturn,
        },
        rows,
        chartImage,
        logoUrl: 'https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757959641758-10aa25709c02fbdd.webp'
      }
      
      const res = await fetch('/api/pdf/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      if (!res.ok) {
        const errorText = await res.text()
        console.error('Erreur serveur:', errorText)
        alert('Erreur lors de la génération du PDF. Veuillez réessayer.')
        return
      }
      
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'simulation-interets-composes.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      
      // Restaurer le bouton
      if (downloadButton) {
        downloadButton.disabled = false
        downloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg> Télécharger en PDF'
      }
    } catch (error) {
      console.error('Erreur dans downloadPdf:', error)
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.')
      
      // Restaurer le bouton en cas d'erreur
      const errorButton = document.querySelector('button:has(.lucide-download)') as HTMLButtonElement
      if (errorButton) {
        errorButton.disabled = false
        errorButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg> Télécharger en PDF'
      }
    } finally {
      setIsDownloadingPdf(false)
    }
  }

  const faqsData: FaqItem[] = [
    {
      question: 'Quelle est la différence entre intérêts simples et intérêts composés ?',
      answer:
        "Les intérêts simples ne portent que sur le capital initial, tandis que les intérêts composés incluent les intérêts sur les intérêts précédemment gagnés, créant une croissance exponentielle.",
    },
    {
      question: 'Comment calculer manuellement les intérêts composés ?',
      answer:
        "Utilisez la formule : VF = VI × (1 + r)^n, où VF est la valeur future, VI le capital initial, r le taux d'intérêt et n le nombre de périodes. Pour des versements réguliers, ajoutez la formule des annuités.",
    },
    {
      question: 'À quoi sert la règle de 72 ?',
      answer:
        "La règle de 72 permet d'estimer rapidement le temps de doublement de votre capital. Divisez 72 par le taux de rendement annuel : à 8%, votre capital double en 9 ans (72/8).",
    },
    {
      question: 'Quel placement offre les meilleurs intérêts composés ?',
      answer:
        "Les ETF capitalisants et les actions à dividendes réinvestis offrent généralement les meilleurs rendements à long terme (6-8% en moyenne), mais avec plus de risque que les livrets d'épargne (0,5-3%).",
    },
    {
      question: 'Quelle est la fréquence de capitalisation idéale ?',
      answer:
        "Plus la capitalisation est fréquente (quotidienne > mensuelle > annuelle), meilleur est le rendement. Mais la différence reste marginale : privilégiez le taux et la durée.",
    },
    {
      question: "Quel montant minimal pour que les intérêts composés vaillent le coup ?",
      answer:
        "Il n'y a pas de montant minimal ! Même 50€ par mois peuvent devenir significatifs sur 30 ans. L'important est de commencer tôt et d'être régulier dans vos versements.",
    },
    {
      question: 'Les intérêts composés sont-ils imposables ?',
      answer:
        "Cela dépend de l'enveloppe fiscale : PEA et assurance-vie offrent des avantages après certaines durées. Les livrets réglementés (Livret A, LDDS) sont totalement défiscalisés.",
    },
    {
      question: "Qu'est-ce que l'intérêt composé mensuel ?",
      answer:
        "L'intérêt composé mensuel signifie que les intérêts sont calculés et ajoutés au capital chaque mois. Cette fréquence de capitalisation génère un rendement légèrement supérieur à une capitalisation annuelle.",
    },
    {
      question: 'Comment fonctionne la magie des intérêts composés ?',
      answer:
        "La 'magie des intérêts composés' réside dans la croissance exponentielle : vos intérêts génèrent des intérêts qui génèrent à leur tour des intérêts. Sur 30 ans, vous pouvez multiplier votre capital par 5, 10 ou plus selon le taux.",
    },
  ]

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Hero Section */}
        <Hero202 />

        {/* Main Simulator Section */}
        <div className="relative overflow-hidden pb-24" id="simulator">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-gray-300/30 blur-3xl" />
            <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-gray-500/15 blur-2xl" />
            <div className="absolute -bottom-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gray-300/20 blur-3xl" />
          </div>

          <div className="container relative flex w-full flex-col gap-5 pt-6">
            <main className="grid gap-8 lg:grid-cols-[380px,1fr]">
              <section>
                <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                  <CardHeader className="space-y-2">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl font-bold text-black dark:text-white">
                      <Settings className="h-5 w-5" />
                      Paramètres de la simulation
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Ajustez vos hypothèses pour modéliser votre trajectoire d&apos;épargne et de rendement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="initialInvestment">Capital de départ</Label>
                          <Input
                            id="initialInvestment"
                            inputMode="decimal"
                            value={initialInvestmentInput}
                            onChange={handleInitialInvestmentChange}
                            className="bg-gray-100 dark:bg-gray-800 border-0 text-right text-sm font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-700 focus:border focus:border-gray-300 dark:focus:border-gray-600 transition-colors w-32 px-2 py-1 rounded"
                            placeholder="15 000 €"
                          />
                        </div>
                        <Slider
                          min={0}
                          max={1000000}
                          step={500}
                          value={[initialInvestment]}
                          onValueChange={([value]) =>
                            setInitialInvestmentInput(
                              new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value ?? 0)
                            )
                          }
                          className="[&_[role=slider]]:bg-black dark:[&_[role=slider]]:bg-white [&_[role=slider]]:border-black dark:[&_[role=slider]]:border-white [&_[role=slider]:focus-visible]:ring-black dark:[&_[role=slider]:focus-visible]:ring-white [&_.bg-primary]:bg-black dark:[&_.bg-primary]:bg-white"
                        />
                      </div>

                      <Separator className="bg-gray-200 dark:bg-gray-700" />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="periodicContribution">{contributionLabels[contributionFrequency]}</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="periodicContribution"
                              inputMode="decimal"
                              value={periodicContributionInput}
                              onChange={handlePeriodicContributionChange}
                              className="bg-gray-100 dark:bg-gray-800 border-0 text-right text-sm font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-700 focus:border focus:border-gray-300 dark:focus:border-gray-600 transition-colors w-24 px-2 py-1 rounded"
                              placeholder="400 €"
                            />
                            <Select
                              value={contributionFrequency}
                              onValueChange={value => setContributionFrequency(value as ContributionFrequency)}
                            >
                              <SelectTrigger className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 min-w-[110px] h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <SelectItem value="monthly">Mensuel</SelectItem>
                                <SelectItem value="quarterly">Trimestriel</SelectItem>
                                <SelectItem value="annually">Annuel</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Slider
                          min={0}
                          max={5000}
                          step={contributionFrequency === 'annually' ? 500 : 50}
                          value={[periodicContribution]}
                          onValueChange={([value]) =>
                            setPeriodicContributionInput(
                              new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value ?? 0)
                            )
                          }
                          className="[&_[role=slider]]:bg-black dark:[&_[role=slider]]:bg-white [&_[role=slider]]:border-black dark:[&_[role=slider]]:border-white [&_[role=slider]:focus-visible]:ring-black dark:[&_[role=slider]:focus-visible]:ring-white [&_.bg-primary]:bg-black dark:[&_.bg-primary]:bg-white"
                        />
                      </div>

                      <Separator className="bg-gray-200 dark:bg-gray-700" />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Taux de rendement annuel</Label>
                          <div className="flex items-center">
                            <Input
                              type="number"
                              min={0}
                              max={30}
                              step={0.1}
                              value={annualRate}
                              onChange={handleNumberInput(setAnnualRate, value => Math.min(Math.max(value, 0), 30))}
                              className="bg-gray-100 dark:bg-gray-800 border-0 text-right text-sm font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-700 focus:border focus:border-gray-300 dark:focus:border-gray-600 transition-colors w-16 px-2 py-1 rounded"
                              placeholder="6"
                            />
                            <span className="text-sm font-bold text-black dark:text-white">%</span>
                          </div>
                        </div>
                        <Slider
                          min={0}
                          max={20}
                          step={0.1}
                          value={[annualRate]}
                          onValueChange={([value]) => setAnnualRate(value ?? 0)}
                          className="[&_[role=slider]]:bg-black dark:[&_[role=slider]]:bg-white [&_[role=slider]]:border-black dark:[&_[role=slider]]:border-white [&_[role=slider]:focus-visible]:ring-black dark:[&_[role=slider]:focus-visible]:ring-white [&_.bg-primary]:bg-black dark:[&_.bg-primary]:bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Durée d&apos;investissement</Label>
                          <div className="flex items-center gap-1">
                            <Input
                              type="number"
                              min={1}
                              max={60}
                              step={1}
                              value={years}
                              onChange={handleNumberInput(setYears, value => Math.min(Math.max(value, 1), 60))}
                              className="bg-gray-100 dark:bg-gray-800 border-0 text-right text-sm font-bold text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-white dark:focus:bg-gray-700 focus:border focus:border-gray-300 dark:focus:border-gray-600 transition-colors w-16 px-2 py-1 rounded"
                              placeholder="20"
                            />
                            <span className="text-sm font-bold text-black dark:text-white">ans</span>
                          </div>
                        </div>
                        <Slider
                          min={1}
                          max={50}
                          step={1}
                          value={[years]}
                          onValueChange={([value]) => setYears(value ?? 1)}
                          className="[&_[role=slider]]:bg-black dark:[&_[role=slider]]:bg-white [&_[role=slider]]:border-black dark:[&_[role=slider]]:border-white [&_[role=slider]:focus-visible]:ring-black dark:[&_[role=slider]:focus-visible]:ring-white [&_.bg-primary]:bg-black dark:[&_.bg-primary]:bg-white"
                        />
                      </div>
                    </div>

                    <div className="mt-6 -mx-6 -mb-6">
                      <CardSpotlight className="w-full p-6 rounded-b-lg rounded-t-none border-0 border-t border-gray-200 dark:border-gray-700 bg-black">
                    <p className="text-sm font-semibold relative z-20 text-white mb-3">
                      Formule des intérêts composés
                    </p>
                    <div className="relative z-20">
                      <p className="text-sm font-mono text-center text-gray-400 mb-3">
                        FV = PV × (1 + r)ⁿ + PMT × [((1 + r)ⁿ - 1) / r]
                      </p>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">•</span>
                          <p><span className="text-white font-semibold">FV</span> : Valeur future (capital final)</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">•</span>
                          <p><span className="text-white font-semibold">PV</span> : Capital initial</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">•</span>
                          <p><span className="text-white font-semibold">r</span> : Taux d'intérêt périodique</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">•</span>
                          <p><span className="text-white font-semibold">n</span> : Nombre de périodes</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500">•</span>
                          <p><span className="text-white font-semibold">PMT</span> : Versement périodique</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 mt-3 relative z-20 text-xs">
                      Résultat mis à jour instantanément lors de la modification des paramètres.
                    </p>
                      </CardSpotlight>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="space-y-6">
                <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/10 p-2">
                          <BarChart3 className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <CardTitle>Projection annuelle</CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-300">
                            Visualisez la progression de votre patrimoine.
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="px-4 py-2 text-xs bg-white text-black border-black hover:bg-gray-50 transition-colors"
                          type="button"
                          onClick={() => setEmailDialogOpen(true)}
                        >
                          <Mail className="mr-2 h-4 w-4" /> 
                          Envoyer par mail
                        </Button>
                        
                        {emailDialogOpen && (
                          <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                            <DialogContent>
                            {isSending && (
                              <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
                                <div className="flex flex-col items-center gap-3">
                                  <div className="relative">
                                    <div className="h-12 w-12 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                                    <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-black dark:border-white border-t-transparent animate-spin"></div>
                                  </div>
                                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Envoi en cours...</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Génération du PDF et envoi de l'email</p>
                                </div>
                              </div>
                            )}
                            <DialogHeader>
                              <DialogTitle>Envoyer la simulation par email</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                              <label className="text-sm">Adresse email du destinataire</label>
                              <Input
                                type="email"
                                placeholder="jean.dupont@gmail.com, marie@outlook.fr..."
                                value={recipientEmail}
                                onChange={handleEmailChange}
                                list="email-suggestions"
                                autoComplete="email"
                              />
                              <datalist id="email-suggestions">
                                {emailSuggestions.map((suggestion, index) => (
                                  <option key={index} value={suggestion} />
                                ))}
                              </datalist>
                              <div className="space-y-2 pt-2">
                                <div className="flex items-start gap-2">
                                  <Checkbox id="privacy" checked={acceptPrivacy} onCheckedChange={(v) => setAcceptPrivacy(Boolean(v))} />
                                  <label htmlFor="privacy" className="text-sm leading-snug">
                                    J'accepte la <a href="/politique-confidentialite" target="_blank" className="underline">politique de confidentialité</a>
                                    <span className="text-red-600"> *</span>
                                  </label>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Checkbox id="optin-news" checked={optinNewsletter} onCheckedChange={(v) => setOptinNewsletter(Boolean(v))} />
                                  <label htmlFor="optin-news" className="text-sm leading-snug">
                                    Je souhaite recevoir des conseils et offres par e‑mail
                                  </label>
                                </div>
                                <div className="flex items-start gap-2">
                                  <Checkbox id="optin-partners" checked={optinPartners} onCheckedChange={(v) => setOptinPartners(Boolean(v))} />
                                  <label htmlFor="optin-partners" className="text-sm leading-snug">
                                    J'accepte le partage à des partenaires (facultatif)
                                  </label>
                                </div>
                              </div>
                              {sendError && (
                                <Badge variant="destructive">Erreur: {sendError}</Badge>
                              )}
                            </div>
                            <DialogFooter>
                              <Button 
                                type="button" 
                                variant="secondary" 
                                disabled={isSending}
                                onClick={() => setEmailDialogOpen(false)}
                              >
                                Annuler
                              </Button>
                              <Button 
                                type="button" 
                                onClick={sendEmail} 
                                disabled={isSending || !recipientEmail.includes('@')}
                                className="relative"
                              >
                                {isSending ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Envoi en cours...
                                  </>
                                ) : (
                                  <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Envoyer
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                        <Button 
                          type="button" 
                          onClick={downloadPdf} 
                          disabled={isDownloadingPdf}
                          className="group px-4 py-2 text-xs bg-black text-white border border-black hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDownloadingPdf ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Génération du PDF...
                            </>
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
                              Télécharger en PDF
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="h-72 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900/60 p-4" id="projection-chart" data-testid="chart-container">
                      {hasChartData ? (
                        <ChartContainer config={chartConfig} className="h-full w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ left: 0, right: 16, top: 16, bottom: 0 }} id="area-chart">
                              <defs>
                                <linearGradient id="fill-contributions" x1="0" x2="0" y1="0" y2="1">
                                  <stop offset="5%" stopColor="var(--color-contributions)" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="var(--color-contributions)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fill-interest" x1="0" x2="0" y1="0" y2="1">
                                  <stop offset="5%" stopColor="var(--color-interest)" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="var(--color-interest)" stopOpacity={0.1} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid vertical={false} strokeDasharray="4 8" strokeOpacity={0.2} />
                              <XAxis dataKey="yearLabel" tickLine={false} axisLine={false} tickMargin={8} />
                              <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={value => compactCurrencyFormatter.format(Number(value))}
                                width={80}
                              />
                              <Tooltip
                                cursor={{ strokeDasharray: '4 4' }}
                                content={({ active, payload, label }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-3 min-w-[180px]">
                                        <p className="text-sm font-semibold mb-2">Année {label}</p>
                                        {payload.map((entry: any, index: number) => (
                                          <div key={index} className="flex items-center justify-between gap-6">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                              {entry.name === "contributions" ? "Versements" : "Intérêts"}
                                            </span>
                                            <span className="font-semibold text-sm">
                                              {currencyFormatter.format(entry.value)}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="contributions"
                                stackId="total"
                                stroke="var(--color-contributions)"
                                fill="url(#fill-contributions)"
                                strokeWidth={2}
                              />
                              <Area
                                type="monotone"
                                dataKey="interest"
                                stackId="total"
                                stroke="var(--color-interest)"
                                fill="url(#fill-interest)"
                                strokeWidth={2}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                          Ajustez vos paramètres pour afficher la projection.
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm bg-black dark:bg-white" /> Capital investi
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: 'hsl(210, 100%, 50%)' }} /> Intérêts composés
                      </span>
                    </div>

                    <Tabs defaultValue="summary" className="w-full">
                      <TabsList className="grid h-auto w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1">
                        <TabsTrigger
                          value="summary"
                          className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black font-medium"
                        >
                          Synthèse
                        </TabsTrigger>
                        <TabsTrigger
                          value="table"
                          className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black font-medium"
                        >
                          Tableau annuel
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="summary" className="space-y-4 pt-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          <Card className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-900/60">
                            <CardHeader className="space-y-1 pb-2">
                              <CardDescription className="text-xs">Capital final projeté</CardDescription>
                              <Badge variant="secondary" className="w-fit text-lg font-bold px-3 py-1 bg-black text-white dark:bg-white dark:text-black">
                                {currencyFormatter.format(simulation.finalBalance)}
                              </Badge>
                            </CardHeader>
                            <CardContent className="text-xs text-gray-600 dark:text-gray-300">
                              Pouvoir d'achat : <span className="font-bold text-black dark:text-white">{currencyFormatter.format(simulation.realFinalBalance)}</span> (euros constants)
                            </CardContent>
                          </Card>

                          <Card className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-900/60">
                            <CardHeader className="space-y-1 pb-2">
                              <CardDescription className="text-xs">Intérêts cumulés</CardDescription>
                              <CardTitle className="text-lg font-bold text-black dark:text-white">
                                {currencyFormatter.format(simulation.totalInterest)}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-gray-600 dark:text-gray-300">
                              <span className="font-bold text-black dark:text-white">
                                {percentageFormatter.format(
                                  simulation.totalInterest / Math.max(simulation.totalContributions, 1)
                                )}
                              </span>{' '}
                              du capital investi
                            </CardContent>
                          </Card>

                          <Card className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-900/60">
                            <CardHeader className="space-y-1 pb-2">
                              <CardDescription className="text-xs">Versements cumulés</CardDescription>
                              <CardTitle className="text-lg font-bold text-black dark:text-white">
                                {currencyFormatter.format(simulation.totalContributions)}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-gray-600 dark:text-gray-300">
                              Inclut le capital de départ et l'ensemble des versements.
                            </CardContent>
                          </Card>

                          <Card className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-900/60">
                            <CardHeader className="space-y-1 pb-2">
                              <CardDescription className="text-xs">Rendement annualisé moyen</CardDescription>
                              <CardTitle className="text-lg font-bold text-black dark:text-white">
                                {percentageFormatter.format(Math.max(simulation.averageAnnualReturn, 0))}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-gray-600 dark:text-gray-300">
                              Taux interne basé sur la totalité des flux.
                            </CardContent>
                          </Card>
                        </div>

                        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-slate-900/60 p-4 text-sm text-gray-600 dark:text-gray-300">
                          Avec un capital initial de <span className="font-bold text-black dark:text-white">15 000 €</span> et en investissant mensuellement <span className="font-bold text-black dark:text-white">400 €</span> pendant <span className="font-bold text-black dark:text-white">20 ans</span> à <span className="font-bold text-black dark:text-white">6%</span>, vous obtenez un capital de <span className="font-bold text-black dark:text-white">234 469 €</span>.
                        </div>
                      </TabsContent>

                      <TabsContent value="table" className="pt-4">
                        <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                          <Table>
                            <TableHeader className="bg-white/5">
                              <TableRow className="border-gray-200 dark:border-gray-700">
                                <TableHead>Année</TableHead>
                                <TableHead>Capital début</TableHead>
                                <TableHead>Versements</TableHead>
                                <TableHead>Intérêts</TableHead>
                                <TableHead>Capital fin</TableHead>
                                <TableHead>Euros constants</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {simulation.yearlyBreakdown.map(year => (
                                <TableRow key={year.year} className="border-gray-200 dark:border-gray-700">
                                  <TableCell>{year.year}</TableCell>
                                  <TableCell>{currencyFormatter.format(year.startingBalance)}</TableCell>
                                  <TableCell>{currencyFormatter.format(year.contributions)}</TableCell>
                                  <TableCell>{currencyFormatter.format(year.interest)}</TableCell>
                                  <TableCell>{currencyFormatter.format(year.endingBalance)}</TableCell>
                                  <TableCell>{currencyFormatter.format(year.realEndingBalance)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>


                    </Tabs>
                  </CardContent>
                </Card>

                
              </section>
            </main>

            {/* CTA Section inside simulator container */}
            <Cta22 className="pt-2 pb-0" />
          </div>
        </div>


        {/* Guide Section with Tracing Beam */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container">
            <TracingBeam className="px-6">
              <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                {/* Section Qu'est-ce que les intérêts composés */}
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4">Qu'est-ce que les intérêts composés ?</h2>
                  <p className="text-lg mb-4 text-justify">
                    Les <strong>intérêts composés</strong> représentent le mécanisme financier où les intérêts générés par un capital sont réinvestis pour produire à leur tour des intérêts. C'est ce qu'on appelle <strong>l'effet boule de neige</strong> : votre argent travaille pour vous, et les intérêts gagnés travaillent également.
                  </p>
                  <p className="text-lg mb-4 text-justify">
                    Contrairement aux <strong>intérêts simples</strong> qui ne portent que sur le capital initial, les intérêts composés s'appliquent sur le capital ET sur les intérêts déjà accumulés. Cette différence devient spectaculaire sur le long terme.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm italic text-justify text-gray-700 dark:text-gray-300">
                      💡 Albert Einstein aurait qualifié les intérêts composés de "8ème merveille du monde". Warren Buffett attribue sa fortune à cette force puissante de la capitalisation.
                    </p>
                  </div>
                </div>

                {/* Section Comment fonctionnent */}
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4">Comment fonctionnent les intérêts composés ?</h2>
                  <p className="text-lg mb-4 text-justify">
                    Le mécanisme des intérêts composés repose sur la <strong>capitalisation</strong> : chaque période, les intérêts sont calculés sur le montant total (capital + intérêts précédents).
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold mb-3">Exemple concret année par année :</h3>
                    <p className="mb-2 text-justify">Avec un capital initial de 100€ et un taux de 5% :</p>
                    <ul className="space-y-2">
                      <li>• <strong>Année 1</strong> : 100€ → 105€ (5€ d'intérêts)</li>
                      <li>• <strong>Année 2</strong> : 105€ → 110,25€ (5,25€ d'intérêts)</li>
                      <li>• <strong>Année 3</strong> : 110,25€ → 115,76€ (5,51€ d'intérêts)</li>
                      <li>• <strong>Année 10</strong> : Capital final de 162,89€</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-justify">
                      Remarquez la <strong>croissance exponentielle</strong> : les intérêts augmentent chaque année.
                    </p>
                  </div>
                </div>

                {/* Section Formule de calcul */}
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4">Formule de calcul des intérêts composés</h2>
                  <p className="text-lg mb-4 text-justify">
                    La formule mathématique des intérêts composés avec versements périodiques est :
                  </p>
                  <CardSpotlight className="mb-6">
                    <div className="text-white text-center p-8">
                      <div className="text-2xl font-mono mb-4">
                        VF = VI × (1 + r)^n + VP × [((1 + r)^n - 1) / r]
                      </div>
                      <div className="text-left max-w-2xl mx-auto mt-6 space-y-2 text-sm">
                        <p>• <strong>VF</strong> : Valeur Future (capital final)</p>
                        <p>• <strong>VI</strong> : Valeur Initiale (capital de départ)</p>
                        <p>• <strong>r</strong> : Taux d'intérêt par période</p>
                        <p>• <strong>n</strong> : Nombre de périodes</p>
                        <p>• <strong>VP</strong> : Versement Périodique</p>
                      </div>
                    </div>
                  </CardSpotlight>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-justify">
                    Cette formule montre la <strong>croissance exponentielle du capital</strong> grâce à la capitalisation des intérêts.
                  </p>
                </div>

                {/* Section Comment utiliser */}
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4">Comment utiliser la calculatrice d'intérêts composés ?</h2>
                  <p className="text-lg mb-4 text-justify">
                    Notre <strong>simulateur d'intérêts composés</strong> est simple et intuitif. Suivez ces étapes :
                  </p>
                  <ol className="space-y-3 text-lg">
                    <li><strong>1. Capital initial</strong> : Entrez votre montant investi de départ</li>
                    <li><strong>2. Versement périodique</strong> : Indiquez vos versements réguliers (mensuels, trimestriels ou annuels)</li>
                    <li><strong>3. Taux de rendement annuel</strong> : Estimez votre taux d'intérêt espéré</li>
                    <li><strong>4. Durée d'investissement</strong> : Définissez votre horizon de placement</li>
                  </ol>
                  <p className="text-lg mt-4 text-justify">
                    Les résultats s'affichent instantanément avec un graphique et tableau détaillé année par année.
                  </p>
                </div>

                {/* Section Comprendre les résultats */}
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4">Comprendre les résultats de la simulation</h2>
                  <p className="text-lg mb-4 text-justify">
                    Notre calculateur fournit plusieurs indicateurs clés pour analyser votre épargne :
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Capital final</h3>
                      <p className="text-sm text-justify">La valeur totale de votre épargne incluant les intérêts accumulés.</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Intérêts composés</h3>
                      <p className="text-sm text-justify">Le montant total des intérêts générés sur la période.</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Capital investi</h3>
                      <p className="text-sm text-justify">La somme totale de vos versements (initial + périodiques).</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Taux de rendement moyen</h3>
                      <p className="text-sm text-justify">Le rendement annuel moyen réalisé sur votre investissement.</p>
                    </div>
                  </div>
                </div>

                {/* Section Stratégies */}
                <div className="mb-10">
                  <h2 className="text-3xl font-bold mb-4">Stratégies pour maximiser vos intérêts composés</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-black pl-4">
                      <h3 className="font-semibold">Commencer à investir le plus tôt possible</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-justify">Le temps est votre meilleur allié pour bénéficier de l'effet boule de neige.</p>
                    </div>
                    <div className="border-l-4 border-black pl-4">
                      <h3 className="font-semibold">Effectuer des versements réguliers</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-justify">Les versements programmés (DCA) renforcent la croissance exponentielle.</p>
                    </div>
                    <div className="border-l-4 border-black pl-4">
                      <h3 className="font-semibold">Réinvestir systématiquement les gains</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-justify">Ne jamais retirer les intérêts, laissez-les travailler pour vous.</p>
                    </div>
                    <div className="border-l-4 border-black pl-4">
                      <h3 className="font-semibold">Augmenter progressivement le taux d'épargne</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-justify">Augmentez vos versements avec vos revenus pour accélérer la capitalisation.</p>
                    </div>
                    <div className="border-l-4 border-black pl-4">
                      <h3 className="font-semibold">Minimiser les frais et optimiser la fiscalité</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-justify">Utilisez PEA, assurance-vie et autres enveloppes fiscales avantageuses.</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-8 text-center">Exemples concrets d'intérêts composés</h2>

                <div className="mb-10">
                  <h3 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                    La règle de 72
                  </h3>
                  <p className="text-xl mb-4 font-bold">
                    Doublez votre capital facilement
                  </p>
                  <div className="text-sm prose prose-sm dark:prose-invert">
                    <p className="text-justify">
                      La <strong>règle de 72</strong> est une méthode simple pour estimer le temps nécessaire
                      pour doubler votre capital avec les intérêts composés. Divisez simplement 72 par votre
                      taux de rendement annuel. Par exemple, à 6% par an, votre capital double en 12 ans (72/6).
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                      <ul>
                        <li>• À 3% : doublement en 24 ans</li>
                        <li>• À 6% : doublement en 12 ans</li>
                        <li>• À 9% : doublement en 8 ans</li>
                        <li>• À 12% : doublement en 6 ans</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                    Comparaison : Intérêts simples vs composés
                  </h3>
                  <p className="text-xl mb-4 font-bold">
                    La différence qui fait toute la différence
                  </p>
                  <div className="text-sm prose prose-sm dark:prose-invert">
                    <p>Prenons un exemple avec 10 000€ placés à 5% pendant 20 ans :</p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-left">Type</th>
                            <th className="text-right">Capital final</th>
                            <th className="text-right">Gain</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Intérêts simples</td>
                            <td className="text-right">20 000€</td>
                            <td className="text-right">+10 000€</td>
                          </tr>
                          <tr>
                            <td>Intérêts composés</td>
                            <td className="text-right">26 533€</td>
                            <td className="text-right">+16 533€</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p>
                      Les intérêts composés génèrent <strong>65% de gains supplémentaires</strong> !
                      Cette différence s'amplifie avec le temps.
                    </p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                    Produits financiers et intérêts composés
                  </h3>
                  <p className="text-xl mb-4 font-bold">
                    Où bénéficier de la capitalisation
                  </p>
                  <div className="text-sm prose prose-sm dark:prose-invert">
                    <p>
                      Plusieurs produits financiers permettent de profiter des intérêts composés :
                    </p>
                    <ul>
                      <li>• <strong>Livrets d'épargne</strong> : Livret A, LDDS (capitalisation annuelle)</li>
                      <li>• <strong>Assurance-vie</strong> : Fonds euros avec intérêts capitalisés</li>
                      <li>• <strong>PEA</strong> : Actions à dividendes réinvestis</li>
                      <li>• <strong>ETF capitalisants</strong> : Réinvestissement automatique des dividendes</li>
                      <li>• <strong>Comptes à terme</strong> : Intérêts composés sur durée fixe</li>
                      <li>• <strong>Obligations</strong> : Coupons réinvestis</li>
                    </ul>
                    <p className="mt-3">
                      Choisissez des produits adaptés à votre profil de risque et horizon de placement.
                    </p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                    Impact de l'inflation
                  </h3>
                  <p className="text-xl mb-4 font-bold">
                    Protégez votre pouvoir d'achat
                  </p>
                  <div className="text-sm prose prose-sm dark:prose-invert">
                    <p>L'inflation érode le pouvoir d'achat de votre épargne. Avec 2% d'inflation annuelle :</p>
                    <ul>
                      <li>• 100€ aujourd'hui vaudront 82€ dans 10 ans en pouvoir d'achat</li>
                      <li>• Il faut viser un rendement supérieur à l'inflation pour s'enrichir réellement</li>
                      <li>• Les intérêts composés permettent de battre l'inflation sur le long terme</li>
                    </ul>
                    <p className="mt-3">
                      <strong>Conseil :</strong> Visez un rendement réel (après inflation) d'au moins 3-4% pour
                      une croissance significative de votre patrimoine.
                    </p>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                    Erreurs à éviter
                  </h3>
                  <p className="text-xl mb-4 font-bold">
                    Les pièges qui sabotent vos intérêts composés
                  </p>
                  <div className="text-sm prose prose-sm dark:prose-invert">
                    <p>Évitez ces erreurs courantes qui réduisent l'effet des intérêts composés :</p>
                    <ul>
                      <li>• <strong>Retirer les gains trop tôt</strong> : Chaque retrait réduit exponentiellement le capital final</li>
                      <li>• <strong>Arrêter les versements</strong> : La régularité est clé pour l'effet boule de neige</li>
                      <li>• <strong>Courir après le meilleur taux</strong> : Les changements fréquents génèrent des frais</li>
                      <li>• <strong>Négliger les frais</strong> : 1% de frais annuels peut réduire le capital final de 20-30%</li>
                      <li>• <strong>Sous-estimer le temps</strong> : Commencer tard coûte exponentiellement cher</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                    Cas pratiques détaillés
                  </h3>
                  <p className="text-xl mb-4 font-bold">
                    Scénarios réels d'investissement
                  </p>
                  <div className="text-sm prose prose-sm dark:prose-invert">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-700">
                      <p className="font-semibold mb-2">Scénario 1 : L'investisseur précoce</p>
                      <p className="text-justify">
                        Marie commence à 25 ans avec 5 000€ et verse 300€/mois pendant 35 ans à 6%.
                        <br />
                        <strong>Résultat :</strong> 447 000€ (capital investi : 131 000€)
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="font-semibold mb-2">Scénario 2 : L'investisseur tardif</p>
                      <p className="text-justify">
                        Pierre commence à 40 ans avec 20 000€ et verse 600€/mois pendant 20 ans à 6%.
                        <br />
                        <strong>Résultat :</strong> 299 000€ (capital investi : 164 000€)
                      </p>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      Malgré un investissement total plus élevé, Pierre obtient un capital final inférieur à Marie,
                      illustrant parfaitement l'importance de commencer tôt.
                    </p>
                  </div>
                </div>
              </div>
            </TracingBeam>
          </div>
        </div>

        {/* Section FAQ */}
        <Faq5 badge="FAQ" heading="Foire aux questions (FAQ)" description="Réponses aux questions les plus fréquentes." faqs={faqsData} />

      </div>

  )
}
