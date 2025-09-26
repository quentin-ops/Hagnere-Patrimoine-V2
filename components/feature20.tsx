"use client";
import { 
  TrendingUp,
  Home,
  Building2,
  Briefcase,
  PiggyBank,
  Calculator,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

const utilities = [
  {
    title: "Calculatrice d'intérêts composés",
    description: "Projetez la croissance capitalisée de votre épargne dans le temps",
    icon: TrendingUp,
    href: "/ressources/simulateurs/calculatrice-interets-composes",
    category: "Épargne",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop"
  },
  {
    title: "Simulateur Déficit Foncier",
    description: "Calculez votre économie d'impôt grâce aux travaux de rénovation",
    icon: Home,
    href: "/simulateurs/deficit-foncier",
    category: "Immobilier",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop"
  },
  {
    title: "Comparateur LMNP",
    description: "Déterminez le régime fiscal le plus avantageux pour votre location meublée",
    icon: Building2,
    href: "/simulateurs/lmnp-comparateur",
    category: "Location meublée",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=450&fit=crop"
  },
  {
    title: "Simulateur SCI à l'IS",
    description: "Évaluez la pertinence d'une SCI soumise à l'impôt sur les sociétés",
    icon: Briefcase,
    href: "/simulateurs/sci-is",
    category: "Société",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop"
  },
  {
    title: "Calculateur PER",
    description: "Optimisez votre épargne retraite et réduisez vos impôts",
    icon: PiggyBank,
    href: "/simulateurs/per",
    category: "Retraite",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop"
  },
  {
    title: "Simulateur Multi-Outils",
    description: "Accédez à tous nos simulateurs de défiscalisation",
    icon: Calculator,
    href: "/ressources/simulateurs",
    category: "Tous les outils",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop"
  },
];

const Feature20 = () => {
  return (
    <section className="py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="text-3xl font-medium md:w-1/2 text-gray-900 dark:text-gray-100">
            Les Simulateurs by Hagnéré Patrimoine
          </h2>
          <p className="md:w-1/2 text-gray-600 dark:text-gray-300">
            Découvrez nos outils de simulation gratuits pour optimiser votre fiscalité
            et projeter vos économies d'impôts. Résultats instantanés et sans engagement.
          </p>
        </div>
        <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {utilities.map((utility, index) => {
            const Icon = utility.icon;
            return (
              <Link
                key={index}
                href={utility.href}
                className={cn(
                  "group relative bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-border",
                  "overflow-hidden transition-all duration-200",
                  "hover:shadow-xl hover:-translate-y-1",
                  "cursor-pointer block"
                )}
              >
                {/* Image container with aspect ratio */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={utility.image}
                    alt={`${utility.title} - ${utility.description}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    priority={index < 3}
                    quality={85}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
                  
                  {/* Centered Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="h-7 w-7 text-gray-800 dark:text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Product Name */}
                  <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                    {utility.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {utility.description}
                  </p>

                  {/* Bottom section with Badge and Arrow */}
                  <div className="flex items-center justify-between">
                    {/* Category Badge */}
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-200"
                    >
                      {utility.category}
                    </Badge>
                    
                    {/* Arrow Icon */}
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Feature20 };
