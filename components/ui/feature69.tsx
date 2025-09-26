"use client"

import { ArrowRight, CheckCircle, TrendingUp, Shield, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"

const Feature69 = () => {
  const features = [
    {
      title: "Déduction immédiate",
      description: "Jusqu'à 10 700€ déductibles de vos revenus globaux chaque année",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Report sur 10 ans",
      description: "Le déficit excédentaire est reportable sur vos revenus fonciers",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Sécurité juridique",
      description: "Conformité BOFiP garantie et accompagnement expert",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: "Optimisation fiscale",
      description: "Réduction d'impôt de 21% à 63% selon votre TMI",
      icon: <Calculator className="h-5 w-5" />,
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Colonne de gauche - Contenu */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Transformez vos travaux en
                <span className="text-muted-foreground"> avantage fiscal</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Le déficit foncier est le dispositif le plus simple et le plus efficace pour réduire vos impôts
                tout en valorisant votre patrimoine immobilier.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start group cursor-pointer hover:translate-x-2 transition-transform duration-200"
                >
                  <div className="flex-shrink-0 mt-1 text-black">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                Calculer mon économie
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Voir un cas pratique
              </Button>
            </div>
          </div>

          {/* Colonne de droite - Statistiques visuelles */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="rounded-2xl bg-white p-6 shadow-lg border">
                  <div className="text-4xl font-bold text-black">10 700€</div>
                  <p className="text-sm text-muted-foreground mt-2">Déduction annuelle maximale</p>
                </div>
                <div className="rounded-2xl bg-gray-900 text-white p-6">
                  <div className="text-4xl font-bold">-41%</div>
                  <p className="text-sm text-gray-300 mt-2">D'impôts pour un couple TMI 41%</p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-6">
                  <div className="text-4xl font-bold text-gray-900">10 ans</div>
                  <p className="text-sm text-gray-700 mt-2">Report du déficit</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-lg border">
                  <div className="text-4xl font-bold text-black">+25%</div>
                  <p className="text-sm text-muted-foreground mt-2">Valorisation moyenne du bien</p>
                </div>
              </div>
            </div>

            {/* Badge flottant */}
            <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Dispositif 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Feature69 }

