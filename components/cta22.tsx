"use client";

import { Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WavyBackground } from "@/components/ui/wavy-background";
import { logoUrls } from "@/lib/logo-config";

type Cta22Props = {
  className?: string;
};

const Cta22 = ({ className }: Cta22Props) => {
  const logoSrc = "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758656570571-8f03e028d22b412c.webp";

  return (
    <section className={cn("py-16", className)}>
      <div className="relative h-[350px] overflow-hidden rounded-xl w-full">
        <WavyBackground
          containerClassName="rounded-xl"
          backgroundFill="black"
          blur={12}
          speed="slow"
          waveOpacity={0.35}
          colors={["#93c5fd", "#60a5fa", "#3b82f6", "#1e40af", "#f472b6"]}
        >
          <div className="flex h-[350px] items-center px-4 sm:px-6 md:px-10 py-4 sm:py-6">
            <div className="relative z-10 w-full self-center text-center sm:w-auto sm:flex-1 md:text-left">
              <img
                src={logoUrls.patrimoine.white}
                alt="Hagnéré Patrimoine"
                className="mx-auto md:mx-0 h-8 w-auto mb-3 opacity-90"
              />
              <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-2xl md:text-3xl text-white">
                Investissez en bourse avec un cabinet de gestion de patrimoine et de fortune reconnu
              </h1>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 md:justify-start">
                <Button className="bg-white text-black hover:bg-white/90">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Bilan patrimonial gratuit</span>
                </Button>
                <Button variant="outline" className="border border-white text-white hover:bg-white/10">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Contact</span>
                </Button>
              </div>
            </div>
            {/* Single large logo with hover animation */}
            <div className="relative z-10 hidden md:flex w-[260px] h-[350px] items-center justify-center group">
              <img
                src={logoSrc}
                alt="Hagnéré Patrimoine"
                className="h-48 w-auto opacity-90 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1"
              />
            </div>
          </div>
        </WavyBackground>
      </div>
    </section>
  );
};

export { Cta22 };
