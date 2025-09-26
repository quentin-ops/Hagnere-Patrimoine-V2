'use client';
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Calculator } from "lucide-react";

const Hero202 = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container">
        <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-black h-[300px] sm:h-[350px] md:h-[400px]">
          <AuroraBackground className="absolute inset-0">
            <div className="relative z-10 px-6 text-center flex items-center justify-center h-full">
              <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="relative flex flex-col gap-3 items-center justify-center px-4"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="rounded-xl bg-black p-3">
                    <Calculator className="h-10 w-10 text-white" aria-hidden="true" />
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold dark:text-white text-center">
                    Calculatrice d'intérêts composés : formule, simulation et conseils
                  </h1>
                </div>
                <p className="mt-2 text-sm md:text-lg text-neutral-600 dark:text-neutral-200 max-w-2xl mx-auto">
                  Voyez combien vos placements peuvent vous rapporter grâce aux intérêts composés et calculez la valeur totale de votre épargne au fil du temps pour atteindre vos objectifs
                </p>
              </motion.div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </section>
  );
};

export { Hero202 };
