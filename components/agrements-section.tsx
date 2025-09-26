import { Shield, Briefcase, Building2, Home, BadgeCheck } from "lucide-react";

const agrements = [
  {
    id: "agrement-1",
    title: "CIF",
    orias: "23002291",
    description:
      "Conseiller en Investissements Financiers adhérent de l'ANACOFI-CIF, association agréée par l'AMF sous le n° E009325.",
    icon: <Shield className="size-10" strokeWidth={1.5} />,
  },
  {
    id: "agrement-2",
    title: "COA",
    orias: "23002291",
    description:
      "Courtier en Opérations d'Assurance. Partenaire des plus grandes compagnies pour vous offrir les meilleures solutions.",
    icon: <Briefcase className="size-10" strokeWidth={1.5} />,
  },
  {
    id: "agrement-3",
    title: "COBSP",
    orias: "23002291",
    description:
      "Courtier en Opérations de Banque et Services de Paiement pour optimiser vos financements et crédits immobiliers.",
    icon: <Building2 className="size-10" strokeWidth={1.5} />,
  },
  {
    id: "agrement-4",
    title: "Carte T",
    orias: "CPI 7501 2024",
    description:
      "Transaction immobilière. Carte professionnelle délivrée par la CCI de Paris Île-de-France pour vos projets immobiliers.",
    icon: <Home className="size-10" strokeWidth={1.5} />,
  },
];

const AgrementsSection = () => {
  return (
    <section className="relative pt-32 pb-8">
      <div className="container relative z-10 flex flex-col space-y-14">
        <div className="px-6 lg:px-10 flex items-center justify-between">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white lg:text-5xl lg:max-w-md">
            Nos agréments officiels
          </h2>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-medium shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="font-mono tracking-tight">ORIAS</span>
            <span className="text-white/60 dark:text-black/60">·</span>
            <span className="text-white/80 dark:text-black/80">Registre unique</span>
            <span className="text-white/60 dark:text-black/60">|</span>
            <span className="font-semibold">23002291</span>
          </div>
        </div>
        <div className="relative mt-6 md:mt-10">
          {/* Top border line only */}
          <div className="bg-border absolute left-0 right-0 top-0 h-px" />

          <div className="divide-border grid md:grid-cols-4 md:divide-x">
            {agrements.map((agrement) => (
              <div
                key={agrement.id}
                className="relative px-6 pb-20 md:pb-10 lg:px-10 transition-all duration-300 hover:bg-muted/30 dark:hover:bg-transparent group"
              >
                <div className="bg-border absolute left-0 right-0 top-0 h-px md:hidden" />
                <div className="bg-background relative -mt-6 mb-10 flex aspect-square w-12 items-center justify-center md:-mt-10 md:mb-10 md:w-20 text-primary/80 group-hover:text-primary transition-colors duration-300 group-hover:scale-110 transform">
                  {agrement.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3 md:mb-4 lg:mb-6">
                    <h3 className="text-lg font-semibold md:text-2xl">
                      {agrement.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-500 text-white dark:bg-blue-600">
                      <BadgeCheck className="h-3 w-3" />
                      Agréé
                    </span>
                  </div>
                  <p className="text-muted-foreground">{agrement.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom border line only */}
          <div className="bg-border absolute bottom-0 left-0 right-0 h-px" />
        </div>
      </div>
    </section>
  );
};

export { AgrementsSection };