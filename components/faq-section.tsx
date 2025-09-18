'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "Quels sont les frais liés à votre service de gestion patrimoniale ?",
    answer: "Nos frais sont transparents dès le départ. Nous travaillons sur honoraires clairs pour le conseil, sans frais cachés, et avec possibilité de commission selon les solutions de placement. Vous recevez un devis précis avant toute mission."
  },
  {
    question: "À partir de quel montant de patrimoine peut-on bénéficier de vos services Elite / 360° ?",
    answer: "Nos services 360° s'adressent à tous dès 150 000 € de patrimoine. Le service Élite est réservé aux patrimoines plus élevés (supérieurs à 1-2 M€ selon la situation), avec un accompagnement ultra-personnalisé."
  },
  {
    question: "Que comprend exactement le bilan patrimonial gratuit que vous proposez ?",
    answer: "Ce bilan inclut une analyse complète de votre situation actuelle (fiscalité, immobilier, placements, retraite, transmission), l'identification de forces/faiblesses, et une proposition de pistes d'optimisation adaptées à vos objectifs."
  },
  {
    question: "Est-ce que je perds le contrôle de mes investissements si vous prenez en charge la gestion ?",
    answer: "Pas du tout. Nous élaborons avec vous une stratégie personnalisée. Chaque décision d'investissement est validée ensemble. Notre rôle est de vous conseiller, de vous proposer les meilleures options, mais la décision finale vous appartient."
  },
  {
    question: "Que se passe-t-il si la situation fiscale ou économique change (lois, marchés, épargne retraite…) ?",
    answer: "Nous assurons un suivi régulier et des revues de stratégie pour adapter votre plan patrimonial. Nous anticipons les réformes, surveillons les marchés, et ajustons les recommandations lorsque nécessaire."
  },
  {
    question: "Comment êtes-vous rémunérés ? Est-ce uniquement via honoraires ou aussi par rétrocessions ?",
    answer: "Notre rémunération est mixte, comprenant honoraires de conseil clairement définis dans la lettre de mission, et, lorsque cela est pertinent, des rétrocessions de partenaires. L'ensemble est transparent pour vous."
  },
  {
    question: "Est-ce que vos services conviennent si j'ai un patrimoine \"modeste\" ou si je débute dans l'investissement ?",
    answer: "Absolument. Bien que certains services premium soient destinés aux patrimoines élevés, nous proposons aussi des solutions adaptées aux personnes avec des actifs moins conséquents, pour les aider à construire et optimiser leur patrimoine dès aujourd'hui."
  },
  {
    question: "Quels sont les risques associés à vos recommandations / aux placements que vous proposez ?",
    answer: "Tous les investissements comportent un certain niveau de risque. Nous vous informons toujours des risques potentiels (volatilité, liquidité, fiscalité), et les stratégies que nous proposons sont calibrées selon votre tolérance au risque. Notre approche est prudente et diversifiée."
  },
  {
    question: "Comment se déroule la transmission de patrimoine, et quelles solutions sont possibles pour limiter les droits de succession ?",
    answer: "Nous identifions les dispositifs légaux adaptés (donation, démembrement, assurance-vie, pacte Dutreil, etc.) pour optimiser la transmission. Tout est fait dans le respect des obligations fiscales, pour protéger vos proches tout en limitant les charges."
  },
  {
    question: "Puis-je coupler des services professionnels et personnels dans votre accompagnement (entreprise, retraite, immobilier, etc.) ?",
    answer: "Oui. Nous travaillons de façon globale : vos actifs personnels et professionnels sont pris en compte pour construire une stratégie complète qui englobe fiscalité, retraite, immobilier, transmission, etc. Cela permet d'éviter les incohérences entre les différents volets de votre patrimoine."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-border p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4">
            Support & Aide
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Foire aux questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Retrouvez les réponses aux questions les plus fréquentes.
            Besoin d'une assistance personnalisée ?{' '}
            <Link href="/contact" className="font-medium underline underline-offset-4 hover:no-underline">
              Contactez notre équipe
            </Link>
          </p>
        </div>

        {/* FAQ Items Grid */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "group relative border rounded-xl transition-all duration-200",
                openIndex === index
                  ? "border-black dark:border-white bg-white dark:bg-card shadow-lg"
                  : "border-gray-200 dark:border-border bg-white/50 dark:bg-card/30 hover:bg-white dark:hover:bg-card/50"
              )}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 flex items-center gap-4 text-left"
              >
                <Badge
                  variant={openIndex === index ? "default" : "secondary"}
                  className={cn(
                    "shrink-0 transition-colors",
                    openIndex === index
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-100 text-gray-600 dark:bg-muted dark:text-gray-400"
                  )}
                >
                  Q{index + 1}
                </Badge>

                <span className={cn(
                  "flex-1 font-medium transition-colors pr-4",
                  openIndex === index
                    ? "text-black dark:text-white"
                    : "text-gray-700 dark:text-gray-300"
                )}>
                  {item.question}
                </span>

                <div className={cn(
                  "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  openIndex === index
                    ? "bg-black dark:bg-white"
                    : "bg-gray-100 dark:bg-muted"
                )}>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-all duration-400 ease-in-out",
                      openIndex === index
                        ? "rotate-180 text-white dark:text-black"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                  />
                </div>
              </button>

              <div
                ref={el => contentRefs.current[index] = el}
                style={{
                  maxHeight: openIndex === index ? contentRefs.current[index]?.scrollHeight + 'px' : '0',
                  transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 pl-20">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-border">
            {/* Background with overlay - same as service cards */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-background dark:via-card dark:to-background" />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute -inset-x-20 -inset-y-20 bg-gradient-to-r from-gray-200/20 via-transparent to-gray-200/20 dark:from-gray-700/20 dark:to-gray-700/20 animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-8 py-12 text-center">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Encore des questions ?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Des questions ou besoin d'assistance ? Notre équipe est là pour vous aider !
              </p>
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg"
              >
                <Link href="/contact">
                  Contactez-nous
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
