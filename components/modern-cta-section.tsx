"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModernCTASectionProps {
  backgroundImage?: string;
  className?: string;
}

export function ModernCTASection({ 
  backgroundImage = "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758547885734-3d-building-illustration.png",
  className 
}: ModernCTASectionProps) {
  return (
    <section className={cn("relative w-full my-6 lg:my-8", className)}>
      {/* Aura / Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 blur-3xl">
        <div className="absolute top-[-10%] left-[-10%] h-60 w-60 rounded-full bg-gradient-to-br from-[#0B2A6F]/30 via-[#5CC8FF]/20 to-[#FFC9B5]/20" />
        <div className="absolute bottom-[-10%] right-[-5%] h-72 w-72 rounded-full bg-gradient-to-tr from-[#FFC9B5]/25 via-[#5CC8FF]/10 to-[#0B2A6F]/30" />
      </div>

      <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-b from-background/80 to-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        {/* Gradient border ring */}
        <div aria-hidden className="absolute inset-0 rounded-2xl [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-r before:from-[#0B2A6F] before:via-[#5CC8FF] before:to-[#FFC9B5]" />

        <CardContent className="grid gap-4 p-4 md:gap-8 md:grid-cols-[1.2fr_1fr] md:p-10">
          {/* Texte */}
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit bg-white/10 text-white backdrop-blur">
              Optimisez votre patrimoine et réduisez vos impôts
            </Badge>

            <h2 className="mt-3 text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-4xl">
              <span className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="whitespace-nowrap">30% <span className="text-xs sm:text-sm text-muted-foreground">économie d'impôts</span></span>
                <span className="hidden sm:inline-block h-4 w-px bg-white/20 md:h-5" />
                <span className="whitespace-nowrap">100% <span className="text-xs sm:text-sm text-muted-foreground">sur-mesure</span></span>
                <span className="hidden sm:inline-block h-4 w-px bg-white/20 md:h-5" />
                <span className="whitespace-nowrap">0€ <span className="text-xs sm:text-sm text-muted-foreground">frais cachés</span></span>
              </span>
            </h2>

            <p className="mt-2 max-w-prose text-xs text-muted-foreground sm:text-sm md:text-base">
              Stratégies patrimoniales optimisées, conseil personnalisé, structuration fiscale et suivi complet par Hagnéré Patrimoine.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3 md:mt-6">
              <Button asChild size="default" className="h-9 rounded-xl px-4 text-sm shadow-lg sm:h-10 sm:px-5 md:h-11 md:rounded-2xl md:px-6 md:text-base">
                <Link href="/prendre-rdv">
                  Réserver
                </Link>
              </Button>

              <Button asChild variant="outline" size="default" className="h-9 rounded-xl border-white/20 bg-white/5 px-4 text-sm sm:h-10 sm:px-5 md:h-11 md:rounded-2xl md:px-6 md:text-base">
                <Link href="/votre-projet">En savoir plus</Link>
              </Button>
            </div>

            <p className="mt-2 text-[10px] text-muted-foreground sm:text-xs md:mt-3">
              *Selon votre situation et les dispositifs mobilisés (Pinel, Denormandie, Malraux, déficit foncier, LMNP/LMP, etc.). Simulations personnalisées sur demande.
            </p>
          </div>

          {/* Visuel avec image de fond */}
          <div className="relative mx-auto grid w-full place-items-center">
            <div className="relative aspect-square w-32 sm:w-40 md:w-64">
              <div aria-hidden className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0B2A6F]/30 via-[#5CC8FF]/25 to-[#FFC9B5]/30 blur-xl" />
              <div className="relative z-10 grid place-items-center rounded-2xl border border-white/15 bg-white/[0.02] p-3 shadow-2xl backdrop-blur-xl overflow-hidden sm:rounded-3xl sm:p-4 md:p-5">
                <Image
                  src={backgroundImage}
                  alt="Stratégie patrimoniale Hagnéré Patrimoine"
                  width={640}
                  height={640}
                  className="pointer-events-none select-none drop-shadow-[0_10px_30px_rgba(18,113,255,0.35)] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
