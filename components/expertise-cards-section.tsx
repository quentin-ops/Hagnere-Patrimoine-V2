import { TrendingUp, Users } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ExpertiseCardsSection = () => {
  return (
    <section className="py-16">
      <div className="container flex flex-col items-center">
        <div className="text-center">
          <h3 className="text-4xl font-semibold text-pretty md:mb-4 lg:mb-6 lg:max-w-3xl lg:text-5xl">
            Notre double expertise à votre service
          </h3>
        </div>
      </div>
      <div className="container mt-16">
        <div className="relative">
          <div className="grid border md:grid-cols-2 md:divide-x">
            <div className="relative border-border md:border-t overflow-hidden">
              <div className="absolute top-0 h-px w-full bg-border md:hidden" />

              <AuroraBackground className="h-full">
                <motion.div
                  initial={{ opacity: 0.0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="relative flex flex-col items-center text-center pt-8 pb-8 md:px-8 md:pt-12 md:pb-12 lg:px-12 lg:pt-16 lg:pb-20"
                >
                  <div className="mb-8 flex aspect-1/1 w-16 items-center justify-center md:w-[6.25rem] lg:mb-[3.25rem]">
                    <div className="relative h-full w-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/20 backdrop-blur-sm rounded-2xl" />
                      <TrendingUp className="relative z-10 h-12 w-12 md:h-16 md:w-16 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h2 className="mb-4 text-2xl font-semibold md:mb-5 text-zinc-900 dark:text-white">
                    Gestion de Patrimoine 360°
                  </h2>

                  <p className="mb-6 text-zinc-700 dark:text-zinc-300 max-w-md">
                    Accompagnement personnalisé pour tous vos projets patrimoniaux.
                    Bilan complet, stratégies d'optimisation fiscale, préparation retraite et transmission.
                    Solutions adaptées à partir de 150K€ de patrimoine.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <span className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 backdrop-blur-sm rounded-full">
                      Bilan patrimonial
                    </span>
                    <span className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 backdrop-blur-sm rounded-full">
                      Optimisation fiscale
                    </span>
                    <span className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 backdrop-blur-sm rounded-full">
                      Retraite
                    </span>
                    <span className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 backdrop-blur-sm rounded-full">
                      Transmission
                    </span>
                  </div>

                  <a href="/services/hagnere-patrimoine" className="inline-block">
                    <InteractiveHoverButton className="bg-black text-white hover:bg-zinc-800">
                      <span>Découvrir nos services</span>
                    </InteractiveHoverButton>
                  </a>
                </motion.div>
              </AuroraBackground>
            </div>
            <div className="relative border-border pt-8 pb-8 md:border-t md:px-8 md:pt-12 md:pb-12 lg:px-12 lg:pt-16 lg:pb-20 bg-neutral-900 overflow-hidden">
              <div className="absolute top-0 h-px w-full bg-border md:hidden" />

              {/* Shooting Stars and Stars Background */}
              <ShootingStars
                minSpeed={10}
                maxSpeed={30}
                minDelay={500}
                maxDelay={1500}
                starColor="#FFFFFF"
                trailColor="#FFFFFF"
                starWidth={10}
                starHeight={1}
                className="pointer-events-none"
              />
              <StarsBackground
                starDensity={0.00015}
                allStarsTwinkle={true}
                twinkleProbability={0.7}
                minTwinkleSpeed={0.5}
                maxTwinkleSpeed={1}
                className="pointer-events-none"
              />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="mb-8 flex aspect-1/1 w-16 items-center justify-center md:w-[6.25rem] lg:mb-[3.25rem]">
                  <img
                    src="/logos/logo-hagnere-elite-light.png"
                    alt="Hagnéré Elite Patrimoine"
                    className="h-full w-auto object-contain"
                  />
                </div>

                <h2 className="mb-4 text-2xl font-semibold md:mb-5 text-white font-playfair italic">
                  Gestion de Fortune Privée Premium
                </h2>

                <p className="mb-6 text-zinc-300 max-w-md">
                  Service exclusif dédié aux patrimoines supérieurs à 1M€.
                  Accompagnement ultra-personnalisé, conseiller dédié 24/7,
                  opportunités exclusives et gestion discrétionnaire.
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <span className="px-3 py-1 text-xs bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-full">
                    Conseiller dédié
                  </span>
                  <span className="px-3 py-1 text-xs bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-full">
                    Opportunités exclusives
                  </span>
                  <span className="px-3 py-1 text-xs bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-full">
                    Gestion discrétionnaire
                  </span>
                  <span className="px-3 py-1 text-xs bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-full">
                    Family Office
                  </span>
                </div>

                <a href="/elite-patrimoine" className="inline-block">
                  <InteractiveHoverButton className="bg-white text-black hover:bg-zinc-100">
                    <span>Accès Elite</span>
                  </InteractiveHoverButton>
                </a>
              </motion.div>
            </div>
          </div>
          <div className="absolute -top-[5px] -left-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
          <div className="absolute -top-[5px] -right-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
          <div className="absolute -bottom-[5px] -left-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
          <div className="absolute -right-[5px] -bottom-[5px]">
            <div className="size-[12px] rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ExpertiseCardsSection };