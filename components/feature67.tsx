import {
  Calculator,
  Clock,
  Shield,
  TrendingUp,
  FileCheck,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PinContainer } from "@/components/ui/3d-pin";

const features = [
  {
    id: "feature-1",
    title: "Calculs instantanés",
    description:
      "Résultats immédiats avec nos algorithmes optimisés pour une analyse précise de votre situation.",
    icon: Calculator,
  },
  {
    id: "feature-2",
    title: "Données sécurisées",
    description:
      "Vos informations restent confidentielles, aucune donnée n'est stockée sur nos serveurs.",
    icon: Shield,
  },
  {
    id: "feature-3",
    title: "Gain de temps",
    description:
      "Plus besoin de rendez-vous, simulez vos économies d'impôts 24/7 depuis chez vous.",
    icon: Clock,
  },
  {
    id: "feature-4",
    title: "Conformité 2024",
    description:
      "Nos simulateurs sont mis à jour en temps réel avec les dernières lois fiscales.",
    icon: FileCheck,
  },
  {
    id: "feature-5",
    title: "Accompagnement expert",
    description: "Un conseiller dédié peut analyser vos résultats et vous proposer une stratégie personnalisée.",
    icon: Users,
  },
  {
    id: "feature-6",
    title: "ROI optimisé",
    description:
      "Identifiez rapidement les dispositifs les plus rentables pour votre profil patrimonial.",
    icon: TrendingUp,
  },
];

const Feature67 = () => {
  return (
    <section className="py-32 bg-gray-50 dark:bg-gray-900/10">
      <div className="container flex flex-col gap-8 lg:gap-12 lg:px-16">
        <h3 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
          Pourquoi utiliser nos simulateurs ?
        </h3>
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <PinContainer key={feature.id} title={feature.title} href="#" containerClassName="w-full">
              <div
                className={cn(
                  "group relative bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border",
                  "overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1 w-96 max-w-full"
                )}
              >
                {/* Zone visuelle (image) */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={
                      [
                        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=450&fit=crop",
                        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop",
                        "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800&h=450&fit=crop",
                        "https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?w=800&h=450&fit=crop",
                        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=450&fit=crop",
                        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=450&fit=crop",
                      ][index % 6]
                    }
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    priority={index < 3}
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <feature.icon className="h-7 w-7 text-gray-800 dark:text-white" />
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{feature.description}</p>
                </div>
              </div>
            </PinContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature67 };
export default Feature67;