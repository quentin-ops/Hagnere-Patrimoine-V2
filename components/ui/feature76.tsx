import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import {
  TrendingDown,
  Shield,
  Building2,
  Calculator,
  FileText,
  Handshake
} from "lucide-react";

const features = [
  {
    id: "feature-1",
    title: "Réduction immédiate d'impôt",
    description:
      "Imputez jusqu'à 10 700 € de travaux par an sur vos revenus fonciers et diminuez rapidement votre fiscalité. Un couple imposé à 41% récupère jusqu'à 4 387 € d'impôts.",
    icon: <TrendingDown className="h-6 w-6" />,
  },
  {
    id: "feature-2",
    title: "Valorisation durable du bien",
    description:
      "Rénover un actif résidentiel augmente le loyer potentiel, la valeur de revente et l'attractivité locative. Valorisation moyenne post-rénovation de +25%.",
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    id: "feature-3",
    title: "Effet de levier du crédit",
    description:
      "Financez les travaux à crédit et laissez la fiscalité rembourser une partie des mensualités. Le déficit généré compense le coût du financement.",
    icon: <Calculator className="h-6 w-6" />,
  },
  {
    id: "feature-4",
    title: "Souplesse patrimoniale",
    description:
      "Location nue pendant les travaux, possibilité de basculer en meublé après amortissement pour prolonger l'optimisation. Report du déficit sur 10 ans.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: "feature-5",
    title: "Sécurisation juridique",
    description:
      "Travaux éligibles, devis certifiés, conformité BOFiP : nous auditons chaque dossier pour éviter les redressements fiscaux.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    id: "feature-6",
    title: "Accompagnement clé en main",
    description:
      "Accès à notre réseau de notaires, experts-comptables et artisans sélectionnés pour fluidifier votre projet d'investissement.",
    icon: <Handshake className="h-6 w-6" />,
  },
];

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 border-gray-200",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800 border-gray-200",
        index < 3 && "lg:border-b dark:border-neutral-800 border-gray-200"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

const Feature76 = () => {
  return (
    <>
      <section className="relative pt-32 border-t">
        <div className="container relative z-10">
          <div className="max-w-3xl text-center mx-auto mb-16">
            <Badge
              variant="outline"
              className="mb-4"
            >
              <TrendingDown className="size-4 mr-1" />
              Déficit foncier 2025
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
              Pourquoi activer un déficit foncier en 2025 ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Le contexte fiscal actuel en fait l'opportunité idéale pour optimiser votre patrimoine
            </p>
          </div>

          <div className="relative">
            <div className="bg-border absolute left-0 right-0 top-0 h-px" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <Feature key={feature.id} title={feature.title} description={feature.description} icon={feature.icon} index={index} />
              ))}
            </div>
            <div className="bg-border absolute bottom-0 left-0 right-0 h-px" />
          </div>
        </div>
        {/* Lignes verticales sur les côtés pour desktop */}
        <div className="container absolute inset-0 hidden h-full md:block">
          <div className="relative h-full">
            <div className="bg-border absolute inset-y-0 left-0 h-full w-px"></div>
            <div className="bg-border absolute inset-y-0 right-0 h-full w-px"></div>
          </div>
        </div>
        {/* Flickering Grid Animation en dessous */}
        <div className="container">
          <div className="h-32 overflow-hidden">
            <FlickeringGrid
              squareSize={4}
              gridGap={6}
              color="#3B82F6"
              maxOpacity={0.4}
              flickerChance={0.15}
              height="100%"
              width="100%"
              className="opacity-60"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export { Feature76 };