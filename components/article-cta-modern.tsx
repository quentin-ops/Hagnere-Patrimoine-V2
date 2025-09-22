"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ArticleCTAModern() {
  return (
    <section className="my-6 lg:my-8">
      <div className="relative overflow-hidden rounded-2xl bg-black py-6 px-8 sm:py-8 sm:px-12 lg:py-10 lg:px-16">
        {/* Dégradé de fond subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/20" />

        {/* Contenu principal - Flex avec alignement parfait */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] gap-6 sm:gap-8 lg:gap-12">

          {/* Image en haut sur mobile, cachée sur desktop (sera affichée à droite) */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:hidden">
            {/* Effet de lueur derrière l'image - Plus grand sur mobile */}
            <div className="absolute -inset-16 sm:-inset-20 bg-gradient-to-br from-blue-500/30 via-orange-300/20 to-blue-900/30 blur-3xl" />

            <Image
              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758547885734-3d-building-illustration.png"
              alt="Hagnéré Patrimoine"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Colonne gauche - Texte parfaitement centré (plus large) */}
          <div className="flex-1 lg:flex-[2] flex flex-col justify-center text-center lg:text-left">
            <p className="cta-title text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Hagnéré Patrimoine
            </p>

            <p className="cta-description text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Optimisez votre patrimoine et réduisez vos impôts légalement.
            </p>

            {/* 3 Cards - Toujours en ligne horizontale */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center border border-white/20">
                <p className="text-base sm:text-xl font-bold text-white">30%</p>
                <p className="text-[10px] sm:text-xs text-gray-300 mt-0.5 sm:mt-1">Économie d'impôts moyenne</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center border border-white/20">
                <p className="text-base sm:text-xl font-bold text-white">0€</p>
                <p className="text-[10px] sm:text-xs text-gray-300 mt-0.5 sm:mt-1">Frais cachés</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center border border-white/20">
                <p className="text-base sm:text-xl font-bold text-white">100%</p>
                <p className="text-[10px] sm:text-xs text-gray-300 mt-0.5 sm:mt-1">Sur-mesure</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button 
                asChild 
                size="default"
                className="bg-white text-black hover:bg-gray-100 font-semibold"
              >
                <Link href="/prendre-rdv">
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button 
                asChild 
                size="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/">
                  Découvrir le site
                </Link>
              </Button>
            </div>
          </div>

          {/* Colonne droite - Image (visible uniquement sur desktop) */}
          <div className="relative hidden lg:block w-48 h-48 lg:w-64 lg:h-64">
            {/* Effet de lueur derrière l'image - Bleu/Pêche/Bleu nuit */}
            <div className="absolute -inset-12 bg-gradient-to-br from-blue-500/30 via-orange-300/20 to-blue-900/30 blur-3xl" />

            <Image
              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758547885734-3d-building-illustration.png"
              alt="Hagnéré Patrimoine"
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}