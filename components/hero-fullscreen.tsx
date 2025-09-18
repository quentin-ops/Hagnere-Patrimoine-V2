'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Phone, Users, Award, PlayCircle } from 'lucide-react'

export function HeroFullscreen() {
  return (
    <section className="relative pt-8 pb-4 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden flex flex-col lg:flex-row bg-white dark:bg-card border border-border">
          {/* Left side - White div with content (50%) */}
          <div className="w-full lg:w-1/2 h-full flex items-center justify-center order-2 lg:order-1 p-8 lg:p-12">
            <div className="w-full max-w-xl">
              <div className="space-y-4 lg:space-y-6">
                {/* Title and description */}
                <div className="space-y-5">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    Gestion de patrimoine et de fortune à{' '}
                    <span className="inline-block text-gray-900 dark:text-white">360°</span>
                  </h1>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                    Hagnéré Patrimoine est un cabinet{' '}
                    <Badge className="align-middle px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black text-sm border-0">
                      3.0
                    </Badge>{' '}
                    de gestion de patrimoine et fortune. Nous accompagnons des milliers de clients du monde entier au quotidien sur l'intégralité de leurs besoins pour répondre à leurs objectifs patrimoniaux.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-black text-white border border-black hover:bg-white hover:text-black shadow-lg dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white premium-shimmer relative overflow-hidden transition-colors hover:shadow-xl"
                  >
                    <Link href="/votre-projet">
                      <span className="premium-text-grow">Bilan Patrimonial 360° (Gratuit)</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <Link href="/contact">
                      <Phone className="mr-2 h-4 w-4" />
                      Contactez-nous
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="hidden lg:flex items-center justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <Users className="h-3.5 w-3.5 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white leading-none">+ 762</p>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">Clients satisfaits</p>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <Award className="h-3.5 w-3.5 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white leading-none">5 ans</p>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">D'expertise</p>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

                  <Link href="https://youtube.com/@hagnerepatrimoine" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <PlayCircle className="h-3.5 w-3.5 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white leading-none">+ 32 000</p>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400 whitespace-nowrap">Personnes nous suivent</p>
                    </div>
                  </Link>
                </div>

                {/* Agréments officiels - EXACT SAME STYLE AS ORIGINAL */}
                <div className="hidden xl:block pt-6 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    Nos agréments officiels
                  </h3>

                  {/* ORIAS Number */}
                  <div className="flex justify-start mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700">
                      <span className="font-semibold text-gray-900">Numéro ORIAS</span>
                      <span className="text-gray-400">·</span>
                      <span>Registre unique</span>
                      <span className="text-gray-300">|</span>
                      <span className="font-mono text-gray-900">23002291</span>
                    </div>
                  </div>

                  {/* Credentials Grid */}
                  <div className="grid gap-3 grid-cols-2">
                    {/* CIF */}
                    <div className="flex flex-col items-center text-center gap-2 rounded-xl border border-gray-200/70 bg-gray-50/60 px-4 py-4">
                      <span className="text-xs font-bold text-gray-900">CIF</span>
                      <p className="text-xs text-gray-600 leading-tight">
                        Conseiller en Investissements Financiers
                      </p>
                      <Badge className="bg-black text-white hover:bg-gray-800 text-xs px-2 py-0.5">
                        Agréé
                      </Badge>
                    </div>

                    {/* COBSP */}
                    <div className="flex flex-col items-center text-center gap-2 rounded-xl border border-gray-200/70 bg-gray-50/60 px-4 py-4">
                      <span className="text-xs font-bold text-gray-900">COBSP</span>
                      <p className="text-xs text-gray-600 leading-tight">
                        Courtier en Opérations de Banque
                      </p>
                      <Badge className="bg-black text-white hover:bg-gray-800 text-xs px-2 py-0.5">
                        Agréé
                      </Badge>
                    </div>

                    {/* CARTE T */}
                    <div className="flex flex-col items-center text-center gap-2 rounded-xl border border-gray-200/70 bg-gray-50/60 px-4 py-4">
                      <span className="text-xs font-bold text-gray-900">CARTE T</span>
                      <p className="text-xs text-gray-600 leading-tight">
                        Transaction sur immeubles et fonds
                      </p>
                      <Badge className="bg-black text-white hover:bg-gray-800 text-xs px-2 py-0.5">
                        Agréé
                      </Badge>
                    </div>

                    {/* COA */}
                    <div className="flex flex-col items-center text-center gap-2 rounded-xl border border-gray-200/70 bg-gray-50/60 px-4 py-4">
                      <span className="text-xs font-bold text-gray-900">COA</span>
                      <p className="text-xs text-gray-600 leading-tight">
                        Courtier en Assurance
                      </p>
                      <Badge className="bg-black text-white hover:bg-gray-800 text-xs px-2 py-0.5">
                        Agréé
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Full height video (50%) */}
          <div className="w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px] relative overflow-hidden bg-black order-1 lg:order-2">
            {/* Video verticale plein écran */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              {/* Remplace avec ton URL de vidéo */}
              <source src="/path-to-your-vertical-video.mp4" type="video/mp4" />

              {/* Fallback image si la vidéo ne charge pas */}
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1080&h=1920&fit=crop"
                alt="Gestion de patrimoine"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </video>

            {/* Overlay gradient optionnel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group">
                <svg
                  className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}