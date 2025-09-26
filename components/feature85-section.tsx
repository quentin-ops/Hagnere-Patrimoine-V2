"use client";

import {
  BedDouble,
  Wrench,
  Hammer,
  Castle,
  Landmark,
  PiggyBank,
  Crown,
  Building,
  Trees,
  Palmtree,
  Lightbulb,
  Shield,
  Search,
  Filter,
  Key,
  Users,
  Heart,
  Globe,
  Plane,
  Home,
  Car,
  Bike,
  Gift,
  Briefcase,
  ShieldCheck,
  Calculator,
  Euro,
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

// Liste complète des produits
const allProducts = [
  // Défiscalisation Immobilière
  {
    title: "LMNP / LMP",
    description: "Location meublée, amortissement du bien",
    icon: BedDouble,
    category: "Défiscalisation",
    href: "/solutions/lmnp-lmp",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073"
  },
  {
    title: "Déficit Foncier",
    description: "Déduction des travaux sur vos revenus",
    icon: Wrench,
    category: "Défiscalisation",
    href: "/solutions/deficit-foncier",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
  },
  {
    title: "Denormandie",
    description: "Rénovation dans l'ancien",
    icon: Hammer,
    category: "Défiscalisation",
    href: "/solutions/denormandie",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070"
  },
  {
    title: "Loi Malraux",
    description: "Restauration immobilière",
    icon: Castle,
    category: "Défiscalisation",
    href: "/solutions/malraux",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070"
  },
  {
    title: "Monument Historique",
    description: "100% des travaux déductibles",
    icon: Landmark,
    category: "Défiscalisation",
    href: "/solutions/monument-historique",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020"
  },
  {
    title: "PER",
    description: "Plan Épargne Retraite déductible",
    icon: PiggyBank,
    category: "Défiscalisation",
    href: "/solutions/per",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071"
  },
  {
    title: "Girardin Industriel",
    description: "Investissement en Outre-mer",
    icon: Palmtree,
    category: "Défiscalisation",
    href: "/solutions/girardin",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070"
  },
  {
    title: "FCPI",
    description: "Innovation et PME, jusqu'à 25%",
    icon: Lightbulb,
    category: "Défiscalisation",
    href: "/solutions/fcpi",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
  },
  // Investissements
  {
    title: "Hagnéré Investissement",
    description: "Notre solution exclusive",
    icon: Crown,
    category: "Investissements",
    href: "/solutions/hagnere-investissement",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072"
  },
  {
    title: "SCPI Européenne",
    description: "Immobilier européen diversifié",
    icon: Building,
    category: "Investissements",
    href: "/solutions/scpi-europeenne",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
  },
  {
    title: "Nue-Propriété",
    description: "Décote de 20 à 40%",
    icon: Key,
    category: "Investissements",
    href: "/solutions/nue-propriete",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2071"
  },
  {
    title: "Viager",
    description: "Investissement éthique",
    icon: Users,
    category: "Investissements",
    href: "/solutions/viager",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070"
  },
  {
    title: "Groupements Forestiers",
    description: "Réduction IFI",
    icon: Trees,
    category: "Investissements",
    href: "/solutions/groupements-forestiers",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2071"
  },
  {
    title: "Cheptel Bovin",
    description: "Investissement agricole",
    icon: PiggyBank,
    category: "Investissements",
    href: "/solutions/cheptel",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074"
  },
  // Assurances / Prévoyance
  {
    title: "Assurance emprunteur",
    description: "Protection crédit",
    icon: Shield,
    category: "Assurances",
    href: "/solutions/assurance-emprunteur",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070"
  },
  {
    title: "Complémentaire Santé",
    description: "Couverture santé optimale",
    icon: Heart,
    category: "Assurances",
    href: "/solutions/complementaire-sante",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070"
  },
  {
    title: "Santé expatriés",
    description: "Santé internationale",
    icon: Globe,
    category: "Assurances",
    href: "/solutions/sante-expatries",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2066"
  },
  {
    title: "Assurance voyage",
    description: "Protection voyage",
    icon: Plane,
    category: "Assurances",
    href: "/solutions/assurance-voyage",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074"
  },
  {
    title: "Assurance habitation",
    description: "Protection du logement",
    icon: Home,
    category: "Assurances",
    href: "/solutions/assurance-habitation",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070"
  },
  {
    title: "Assurance voiture",
    description: "Véhicule protégé",
    icon: Car,
    category: "Assurances",
    href: "/solutions/assurance-voiture",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070"
  },
  // Placements
  {
    title: "Assurance-vie",
    description: "Support privilégié d'épargne",
    icon: Shield,
    category: "Placements",
    href: "/solutions/assurance-vie",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071"
  },
  {
    title: "Assurance-vie Luxembourgeoise",
    description: "Haut de gamme international",
    icon: Crown,
    category: "Placements",
    href: "/solutions/assurance-vie-lux",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070"
  },
  // Transmission
  {
    title: "Donation",
    description: "Transmission anticipée",
    icon: Gift,
    category: "Transmission",
    href: "/solutions/donation",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2073"
  },
  {
    title: "Assurance décès",
    description: "Protection familiale",
    icon: ShieldCheck,
    category: "Transmission",
    href: "/solutions/assurance-deces",
    image: "https://images.unsplash.com/photo-1427751840561-9852520f8ce8?q=80&w=2076"
  },
  // Services
  {
    title: "Bilan Patrimonial",
    description: "Analyse complète 360°",
    icon: Calculator,
    category: "Services",
    href: "/services/bilan-patrimonial",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070"
  },
  {
    title: "Gestion de fortune",
    description: "Service premium +1M€",
    icon: Euro,
    category: "Services",
    href: "/elite-patrimoine",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2070"
  },
];

const categories = [
  "Tous",
  "Défiscalisation",
  "Placements",
  "Investissements",
  "Financements",
  "Assurances",
  "Gestion de fortune",
  "Rendez-vous",
  "Ressources"
];

const Feature85Section = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filtrage et recherche
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filtre par catégorie
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);
  return (
    <section className="py-16 relative">
      <div className="border-t border-border">
        <div className="relative">
          {/* FlickeringGrid on the left side */}
          <div className="absolute left-0 top-0 h-full w-32 lg:w-48 overflow-hidden pointer-events-none">
            <FlickeringGrid
              className="absolute inset-0 z-0 [mask-image:linear-gradient(to_right,white,transparent)]"
              squareSize={4}
              gridGap={6}
              color="#60A5FA"
              maxOpacity={0.3}
              flickerChance={0.1}
            />
          </div>

          {/* FlickeringGrid on the right side */}
          <div className="absolute right-0 top-0 h-full w-32 lg:w-48 overflow-hidden pointer-events-none">
            <FlickeringGrid
              className="absolute inset-0 z-0 [mask-image:linear-gradient(to_left,white,transparent)]"
              squareSize={4}
              gridGap={6}
              color="#60A5FA"
              maxOpacity={0.3}
              flickerChance={0.1}
            />
          </div>

          <div className="relative container overflow-hidden border-x border-border py-16">
            <div className="isolate mx-auto flex max-w-3xl flex-col gap-8">
              <div className="bg absolute -top-1 -left-[1px] -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_100%_120%_at_50%_50%,transparent_20%,#000_100%)] bg-[size:64px_64px] opacity-20 [clip-path:inset(0px_0px_50%_0px)]"></div>
              <h2 className="text-center text-4xl font-semibold lg:text-5xl">
                Notre catalogue de solutions
              </h2>
              <p className="text-center text-xl md:text-3xl">
                Une gamme complète de solutions patrimoniales pour répondre à tous vos besoins, de la constitution à la transmission de votre patrimoine.
              </p>
            </div>
          </div>
          {/* Search and Filter Section */}
          <div className="border-t border-border">
            <div className="container border-x border-border py-8">
              <div className="flex flex-col gap-4 px-6 md:px-8">
                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher une solution..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs"
                    >
                      {category}
                      {category !== "Tous" && (
                        <Badge variant="secondary" className="ml-1 text-[10px]">
                          {allProducts.filter(p => category === "Tous" || p.category === category).length}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground text-center">
                  {filteredProducts.length} solution{filteredProducts.length > 1 ? 's' : ''} trouvée{filteredProducts.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="border-t border-border">
            <div className="container border-x border-border px-0">
              <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedProducts.map((product, i) => {
                  const Icon = product.icon;
                  return (
                    <Link
                      key={i}
                      href={product.href}
                      className="relative flex gap-4 bg-muted px-6 pt-8 pb-8 md:flex-col md:gap-0 md:px-8 md:pt-16 transition-all hover:bg-muted/70 group cursor-pointer overflow-hidden"
                    >
                      {/* Background Image with blur effect */}
                      {product.image && (
                        <div className="absolute inset-0 transition-all duration-700">
                          <img
                            src={product.image}
                            alt=""
                            className="w-full h-full object-cover opacity-20 blur-md group-hover:blur-0 group-hover:opacity-30 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-muted via-muted/80 to-muted/60" />
                        </div>
                      )}
                      <div className="relative text-primary group-hover:scale-110 transition-transform">
                        <Icon className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />
                      </div>
                      <div className="relative">
                        <h3 className="mb-2 md:mt-6 md:text-lg font-semibold group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {product.description}
                        </p>
                        <span className="text-xs text-primary mt-2 inline-block">
                          {product.category}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-border">
              <div className="container border-x border-border py-6">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="border-x border-t border-border">
              <div className="container border-x border-border py-16"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature85Section };