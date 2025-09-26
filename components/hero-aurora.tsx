"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Users, Award, PlayCircle, Youtube, Shield, Star, Mail, Zap, Blocks } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import Link from 'next/link';
import { useTheme } from "next-themes";
import { AuroraBackground } from "@/components/ui/aurora-background";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { WordRotate } from "@/components/magicui/word-rotate";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

// URLs des vidéos depuis S3
const VIDEO_URLS = {
  // Vidéos verticales (format portrait)
  hero3Webm: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero3.webm",
  hero3Mp4: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero3_h264.mp4",
  hero3Poster: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero3_poster.jpg",
  hero4Webm: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero4.webm",
  hero4Mp4: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero4_h264.mp4",
  hero4Poster: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero4_poster.jpg",
  // Vidéos 16:9 (ne pas utiliser pour desktop)
  hero1Webm: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero1.webm",
  hero1Mp4: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero1_h264.mp4",
  hero1Poster: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero1_poster.jpg",
  hero2Webm: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero2.webm",
  hero2Mp4: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero2_h264.mp4",
  hero2Poster: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/hero/hero2_poster.jpg",
};

const HeroAurora = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Utiliser la vidéo verticale noire (hero4) en dark mode, verticale blanche (hero3) en light mode
  const currentTheme = resolvedTheme || 'light';
  const videoToUse = currentTheme === 'dark' ? 'hero4' : 'hero3';

  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Solution simple pour Chrome (identique à la page de test)
  useEffect(() => {
    if (mounted && videoRef.current) {
      // Force muted pour Chrome
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, [mounted]);
  const benefits = [
    {
      icon: Youtube,
      title: "+32K abonnés",
      href: "https://youtube.com/@hagnerepatrimoine",
    },
    {
      icon: Users,
      title: "+762 clients satisfaits",
    },
    {
      icon: Award,
      title: "5 ans d'expertise",
    },
  ];

  return (
    <section className="h-[calc(100vh-64px)] w-full overflow-hidden">
      <div className="relative flex h-full">
        {/* Partie gauche - Contenu avec Aurora Background */}
        <div className="relative w-full lg:w-1/2 h-full">
          <AuroraBackground showRadialGradient={true} className="h-full">
            <div className="container h-full flex items-center justify-center px-8">
              <div className="space-y-6 max-w-xl">
                {/* Badge Cabinet 3.0 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Badge className="inline-flex px-3 py-1 backdrop-blur-sm text-sm bg-white/80 text-zinc-900 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800">
                    <Star className="mr-2 h-3 w-3" />
                    Cabinet 3.0
                  </Badge>
                </motion.div>

                {/* Titre principal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  className="space-y-2"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white">
                    Gestion de patrimoine et de fortune
                  </h1>
                  <div className="text-4xl md:text-5xl lg:text-6xl">
                    <WordRotate
                      words={["à 360°", "Pensée pour vous", "Nouvelle génération", "Performante"]}
                      duration={3000}
                      className="font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950 dark:from-gray-300 dark:via-gray-100 dark:to-gray-300"
                    />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  className="text-lg leading-relaxed text-zinc-700 dark:text-gray-300"
                >
                  Hagnéré Patrimoine est un cabinet de gestion de patrimoine et fortune.
                  Nous accompagnons des milliers de clients du monde entier au quotidien
                  sur l'intégralité de leurs besoins pour répondre à leurs objectifs patrimoniaux.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/votre-projet" className="w-full sm:w-auto">
                    <InteractiveHoverButton className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-100 bg-zinc-900 hover:bg-black text-white border-zinc-900">
                      <span>Bilan Patrimonial 360°</span>
                      <Badge className="ml-2 text-xs px-2 py-0 bg-white text-zinc-900 dark:bg-black dark:text-white">
                        Gratuit
                      </Badge>
                    </InteractiveHoverButton>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <InteractiveHoverButton className="w-full border border-zinc-300 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-gray-600 dark:text-white dark:hover:bg-white dark:hover:text-black">
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Contactez-nous</span>
                    </InteractiveHoverButton>
                  </Link>
                </motion.div>

                {/* Benefits List */}
                <motion.ul
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                  className="flex flex-wrap gap-4 mt-6"
                >
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    const content = (
                      <>
                        <div className="p-1.5 rounded-full backdrop-blur-sm bg-zinc-200/80 dark:bg-gray-800/50">
                          <Icon className="size-3 text-zinc-900 dark:text-gray-300" />
                        </div>
                        <span className="text-sm">{benefit.title}</span>
                        {index !== benefits.length - 1 && (
                          <div className="ml-2 size-1 rounded-full bg-zinc-400 dark:bg-gray-600" />
                        )}
                      </>
                    );

                    if (benefit.href) {
                      return (
                        <li key={benefit.title}>
                          <Link
                            href={benefit.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 transition-colors text-zinc-600 hover:text-zinc-900 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            {content}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={benefit.title} className="flex items-center gap-2 text-zinc-600 dark:text-gray-400">
                        {content}
                      </li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </AuroraBackground>
        </div>

        {/* Partie droite - Vidéo */}
        <div className="hidden lg:block w-1/2 h-full relative bg-white dark:bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="w-full h-full"
          >
            {/* VIDÉO VERTICALE QUI CHANGE SELON LE THÈME */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={VIDEO_URLS[`${videoToUse}Poster`]}
              key={videoToUse} // Force le rechargement de la vidéo quand le thème change
              onLoadedMetadata={() => {
                // Même logique que la page de test
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  videoRef.current.volume = 0;
                  videoRef.current.play()
                    .then(() => console.log(`✅ Vidéo ${videoToUse} lancée`))
                    .catch(() => setShowPlayButton(true));
                }
              }}
            >
              {/* VIDÉO VERTICALE: hero3 (blanche) en light mode, hero4 (noire) en dark mode */}
              <source 
                src={VIDEO_URLS[`${videoToUse}Webm`]}
                type="video/webm" 
              />
              <source 
                src={VIDEO_URLS[`${videoToUse}Mp4`]}
                type="video/mp4" 
              />
              Votre navigateur ne supporte pas la vidéo
            </video>

            {/* Bouton Play pour Chrome si autoplay bloqué */}
            {showPlayButton && (
              <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-zinc-900/10 dark:bg-black/20">
                <button
                  onClick={() => {
                    videoRef.current?.play();
                    setShowPlayButton(false);
                  }}
                  className="group flex items-center justify-center w-20 h-20 rounded-full shadow-2xl transition-all hover:scale-110 bg-white hover:bg-zinc-50 dark:bg-white/90 dark:hover:bg-white"
                  aria-label="Lancer la vidéo"
                >
                  <PlayCircle className="h-10 w-10 group-hover:scale-110 transition-transform text-zinc-900 dark:text-black" />
                </button>
              </div>
            )}

            {/* Fallback si pas de vidéo */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 bg-white dark:bg-black">
              <div className="text-center p-8">
                <PlayCircle className="h-20 w-20 mx-auto mb-4 text-zinc-400/20 dark:text-white/10" />
                <p className="text-lg text-zinc-500 dark:text-white/30">Vidéo de présentation</p>
              </div>
            </div>

            {/* Overlay gradient - seulement en dark mode */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent dark:from-black/60 dark:via-transparent dark:to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { HeroAurora };

