import { ArrowRightIcon, TrendingUp, Calculator, Target } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompoundInterestHero = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24">
      <div className="container">
        <Card className="group relative w-full overflow-hidden rounded-3xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-purple-200/25 blur-2xl" />
            <div className="absolute -bottom-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-green-200/20 blur-3xl" />
          </div>
          
          <CardContent className="relative py-16 lg:px-20 lg:py-24">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-8">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-sm px-3 py-1.5 border-gray-200 dark:border-gray-700">
                    <Calculator className="size-4 mr-2" />
                    Simulateur avancé
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 border-gray-200 dark:border-gray-700">
                    Nouvelle génération
                  </Badge>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                  Calculatrice
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
                    d'intérêts composés
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  Modélisez votre patrimoine financier avec précision. Combinez versement initial, 
                  apports récurrents et capitalisation pour visualiser votre trajectoire d'épargne 
                  sur le long terme.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" /> 
                    Calcul période par période
                  </span>
                  <span className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600 dark:text-green-400" /> 
                    Projection jusqu'à 50 ans
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-4">
                  <Button 
                    className="h-14 rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 text-base font-medium shadow-lg"
                    onClick={() => {
                      const simulatorSection = document.querySelector('#simulator');
                      simulatorSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Commencer la simulation
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 rounded-full border-gray-200 dark:border-gray-700 px-8 text-base hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      const helpSection = document.querySelector('#how-it-works');
                      helpSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Comment ça marche
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Animated rings */}
                    <div className="absolute inset-0 rounded-full border border-blue-200 dark:border-blue-800 animate-ping" />
                    <div className="absolute inset-0 rounded-full border border-green-200 dark:border-green-800 animate-ping animation-delay-300" />
                    <div className="absolute inset-0 rounded-full border border-purple-200 dark:border-purple-800 animate-ping animation-delay-600" />
                    
                    {/* Central glow effect */}
                    <div className="relative h-80 w-80 lg:h-96 lg:w-96">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200/30 via-green-200/20 to-purple-200/30 blur-2xl animate-pulse" />
                      
                      {/* Rotating gradient border */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-purple-400 animate-spin-slow opacity-20" />
                      
                      {/* Central content */}
                      <div className="absolute inset-8 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
                            {(Math.pow(1.06, 20) * 100).toFixed(0)}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Croissance sur 20 ans
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            (6% annuel)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { CompoundInterestHero };
