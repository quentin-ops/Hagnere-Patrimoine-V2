"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function PatrimoineCTA() {
  return (
    <section className="my-8">
      <div className="relative overflow-hidden rounded-2xl bg-black py-8 px-8 sm:px-12 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-blue-900/25" />

        <div className="relative z-10 flex min-h-[260px] flex-col items-center justify-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="relative h-36 w-36 sm:h-44 sm:w-44 lg:hidden">
            <div className="absolute -inset-20 bg-gradient-to-br from-blue-500/30 via-blue-300/20 to-blue-900/30 blur-3xl" />
            <Image
              src="https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/patrimoine_chart_3d.png"
              alt="Visualisation des performances Hagnéré Patrimoine"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Hagnéré Patrimoine</p>
            <p className="mt-3 max-w-2xl text-sm sm:text-base lg:text-lg text-white/70">
              Gestion de patrimoine et de fortune. Profitez d'un Bilan Patrimonial 360° offert (45 min) pour construire une stratégie fiscalement optimisée et alignée sur vos objectifs.
            </p>

            <div className="mt-6 grid w-full max-w-2xl grid-cols-3 gap-3 text-white/80">
              <div className="rounded-lg border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
                <p className="text-lg font-semibold sm:text-xl">360°</p>
                <p className="text-[10px] sm:text-xs text-white/60">Bilan complet</p>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
                <p className="text-lg font-semibold sm:text-xl">45 min</p>
                <p className="text-[10px] sm:text-xs text-white/60">Offertes</p>
              </div>
              <div className="rounded-lg border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
                <p className="text-lg font-semibold sm:text-xl">100%</p>
                <p className="text-[10px] sm:text-xs text-white/60">Sur-mesure</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Button asChild size="default" className="bg-white text-black hover:bg-gray-100">
                <Link href="/calendly">Prendre rendez-vous</Link>
              </Button>
              <Button
                asChild
                size="default"
                className="border border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Link href="/services/hagnere-patrimoine">Découvrir nos services</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden h-56 w-56 lg:block xl:h-64 xl:w-64">
            <div className="absolute -inset-16 bg-gradient-to-br from-blue-500/30 via-blue-300/20 to-blue-900/30 blur-3xl" />
            <Image
              src="https://hagnere-investissement.s3.eu-north-1.amazonaws.com/images/patrimoine_chart_3d.png"
              alt="Visualisation des performances Hagnéré Patrimoine"
              fill
              className="relative z-10 object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
