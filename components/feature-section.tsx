import { Shield, Crown, Star, Calculator, Smartphone, Building2, Briefcase, RefreshCw } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Activité réglementée",
    description: "Enregistré ORIAS et contrôlé AMF pour une sécurité totale de vos investissements",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Opportunités exclusives",
    description: "Accès privilégié aux meilleurs placements : SCPI premium, private equity, produits structurés",
    icon: <Crown className="h-6 w-6" />,
  },
  {
    title: "Expérience client VIP",
    description: "Réponse en -24h, RDV visio à la demande, conseiller dédié disponible 6j/7",
    icon: <Star className="h-6 w-6" />,
  },
  {
    title: "Simulations concrètes",
    description: "Chaque solution testée avec projections chiffrées pour un impact mesurable garanti",
    icon: <Calculator className="h-6 w-6" />,
  },
  {
    title: "Plateforme moderne",
    description: "Suivi en ligne, documents sécurisés, reporting temps réel accessible 24/7",
    icon: <Smartphone className="h-6 w-6" />,
  },
  {
    title: "Partenaires premium",
    description: "Accords avec les leaders du marché : Amundi, Primonial, La Française, Swiss Life",
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    title: "Expertise complète",
    description: "Fiscalité, retraite, immobilier, transmission : un seul interlocuteur expert",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: "Stratégie évolutive",
    description: "Révision trimestrielle, adaptation aux changements fiscaux et patrimoniaux",
    icon: <RefreshCw className="h-6 w-6" />,
  }
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
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
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

const FeatureSection = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4"
          >
            <Shield className="size-4 mr-1" />
            La différence Hagnéré
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl mb-4">
            Pourquoi choisir Hagnéré Patrimoine ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une expertise reconnue, une approche unique et des résultats concrets pour développer et sécuriser votre patrimoine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeatureSection };