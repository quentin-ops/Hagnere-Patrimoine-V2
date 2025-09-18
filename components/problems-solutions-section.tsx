"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Compass,
  TrendingDown,
  Percent,
  MessageSquare,
  FileSearch,
  Lightbulb,
  Rocket,
  TrendingUp,
  Shield,
  Users,
  Home,
  Gift,
  Clock,
  AlertCircle,
  Building,
  Crown,
} from 'lucide-react'

const challenges = [
  {
    icon: Percent,
    title: "Impôts trop lourds",
    description:
      "Une fiscalité qui pèse sur vos revenus et limite vos capacités d'investissement.",
  },
  {
    icon: Compass,
    title: "Manque de stratégie claire",
    description:
      "Des décisions prises au coup par coup, sans vision globale ni feuille de route structurée.",
  },
  {
    icon: TrendingDown,
    title: "Placements peu performants",
    description:
      "Des produits qui stagnent et n'exploitent pas pleinement votre potentiel patrimonial.",
  },
  {
    icon: Clock,
    title: "Préparation de la retraite",
    description:
      "Anticiper vos revenus futurs et maintenir votre niveau de vie après votre carrière.",
  },
  {
    icon: Gift,
    title: "Transmission patrimoniale",
    description:
      "Organiser la succession pour protéger vos proches et optimiser la transmission.",
  },
  {
    icon: Home,
    title: "Acquisition immobilière",
    description:
      "Financer et structurer vos projets immobiliers de manière optimale.",
  },
  {
    icon: Shield,
    title: "Protection de la famille",
    description:
      "Sécuriser l'avenir de vos proches face aux aléas de la vie.",
  },
  {
    icon: Users,
    title: "Changement de situation",
    description:
      "Divorce, héritage, vente d'entreprise : adapter votre stratégie aux événements de vie.",
  },
  {
    icon: AlertCircle,
    title: "Patrimoine mal structuré",
    description:
      "Réorganiser vos actifs pour plus d'efficacité fiscale et de protection.",
  },
]

const journeySteps = [
  {
    number: "01",
    title: "Bilan Patrimonial 360° - Gratuit",
    description:
      "Premier échange gratuit en visio avec un conseiller dédié. On prend le temps de comprendre votre situation, vos projets et vos priorités.",
    icon: MessageSquare,
    highlights: ["Rendez-vous gratuit", "Conseiller dédié", "Sans engagement"],
  },
  {
    number: "02",
    title: "Analyse à 360° de votre situation",
    description:
      "Nous réalisons un diagnostic fiscal, financier et patrimonial précis pour vous donner une vision claire et globale de votre situation.",
    icon: FileSearch,
    highlights: ["Diagnostic complet", "Vision globale", "Analyse précise"],
  },
  {
    number: "03",
    title: "Des solutions qui vous parlent",
    description:
      "Vous recevez des solutions claires, concrètes et adaptées. Zéro jargon, uniquement des actions concrètes à activer à votre rythme.",
    icon: Lightbulb,
    highlights: ["Solutions claires", "Zéro jargon", "À votre rythme"],
  },
  {
    number: "04",
    title: "Mise en œuvre accompagnée",
    description:
      "Nous gérons toute la mise en place : ouverture de comptes, souscriptions, démarches administratives. Vous signez, on s'occupe du reste.",
    icon: Rocket,
    highlights: ["Clé en main", "Accompagnement total", "Zéro complexité"],
  },
  {
    number: "05",
    title: "Suivi et optimisation continue",
    description:
      "Votre patrimoine évolue, nos conseils aussi. Points réguliers, ajustements stratégiques et nouvelles opportunités : on reste à vos côtés.",
    icon: TrendingUp,
    highlights: ["Suivi régulier", "Optimisation continue", "Nouvelles opportunités"],
  },
]

export function ProblemsSolutionsSection() {
  return null
}
