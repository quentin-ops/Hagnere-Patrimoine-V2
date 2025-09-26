"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { Button } from "@/components/ui/button";

const Hero223 = () => {
  return (
    <section className="relative py-32 overflow-hidden min-h-[600px]">
      {/* Grille en pleine largeur */}
      <Boxes className="scale-150" />
      
      {/* Masque pour effet de profondeur */}
      <div className="bg-background pointer-events-none absolute inset-0 z-10 h-full w-full [mask-image:radial-gradient(transparent,white)]" />

      {/* Contenu centré */}
      <div className="relative z-30 container mx-auto flex flex-col items-center justify-center px-4">
        <h1 className="max-w-4xl text-center text-5xl font-medium tracking-tight md:text-7xl">
          <span className="text-muted-foreground/50 mr-3">
            Réduisez vos impôts avec le
          </span>
          <LineShadowText>Déficit foncier</LineShadowText>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-center text-lg">
          Déduisez jusqu'à 10 700€ de travaux de vos revenus globaux et optimisez 
          votre fiscalité grâce à l'investissement locatif ancien.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="default"
            className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-6 py-3 tracking-tight bg-black hover:bg-gray-800 text-white"
          >
            <span>Simuler mon économie</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
          <Button
            variant="secondary"
            className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-6 py-3 tracking-tight"
          >
            <span>Guide gratuit</span>
            <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero223 };

// Below is the modified component from Aceternity UI
// Original source: npx shadcn@latest add https://ui.aceternity.com/registry/background-boxes.json
// Modified to follow our coding standards and design system
// We respect copyright and attribution to the original creators

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = [
    "#33A1FD",
    "#2276FF",
    "#FDCA41",
    "#2EDCC3",
    "#FF99CA",
    "#E5D5C3",
    "#343433",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="border-muted-foreground/20 relative h-8 w-16 border-l"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="border-muted-foreground/20 relative h-8 w-16 border-r border-t"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="text-muted pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 stroke-[1px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
