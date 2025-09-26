"use client";

import { Badge } from "@/components/ui/badge";
import { WorldMap } from "@/components/world-map";
import { Globe, Users, Award, Briefcase } from "lucide-react";

export function WorldMapSection() {
  // France center coordinates (adjusted for better visual placement)
  const franceCenter = { lat: 37.0, lng: 4.0 };

  // Destinations worldwide (removed Paris since we're starting from France)
  const destinations = [
    { lat: 51.5074, lng: -0.1278, label: "Londres" }, // London
    { lat: 40.7128, lng: -74.0060, label: "New York" }, // New York
    { lat: 35.6762, lng: 139.6503, label: "Tokyo" }, // Tokyo
    { lat: 1.3521, lng: 103.8198, label: "Singapour" }, // Singapore
    { lat: 25.2048, lng: 55.2708, label: "Dubai" }, // Dubai
    { lat: -33.8688, lng: 151.2093, label: "Sydney" }, // Sydney
    { lat: 47.3769, lng: 8.5417, label: "Zurich" }, // Zurich
    { lat: 43.6532, lng: -79.3832, label: "Toronto" }, // Toronto
    { lat: -22.9068, lng: -43.1729, label: "Rio" }, // Rio de Janeiro
  ];

  const connections = destinations.map(dest => ({
    start: franceCenter,
    end: dest,
  }));

  const stats = [
    {
      icon: Globe,
      value: "22",
      label: "Pays couverts",
      description: "Accompagnement international"
    },
    {
      icon: Users,
      value: "700+",
      label: "Clients accompagnés",
      description: "Confiance et satisfaction"
    },
    {
      icon: Award,
      value: "5+",
      label: "Années d'expertise",
      description: "Savoir-faire reconnu"
    },
    {
      icon: Briefcase,
      value: "47M€+",
      label: "Sous gestion",
      description: "Patrimoine sous gestion"
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="border-border">
            Rayonnement international
          </Badge>
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white lg:text-5xl">
            Une expertise qui rayonne depuis la France
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Basés en France, nous accompagnons nos clients partout dans le monde.
            Notre réseau international et notre expertise transfrontalière nous permettent
            de gérer des patrimoines complexes à l'échelle globale.
          </p>
        </div>

        {/* World Map */}
        <div className="mb-12">
          <WorldMap dots={connections} lineColor="#3b82f6" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-primary/80" />
                    <span className="text-3xl font-bold text-primary">
                      {stat.value}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Où que vous soyez, nous sommes à vos côtés pour optimiser et sécuriser votre patrimoine.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Badge className="px-4 py-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              🇫🇷 France
            </Badge>
            <Badge className="px-4 py-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              🇨🇭 Suisse
            </Badge>
            <Badge className="px-4 py-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              🇱🇺 Luxembourg
            </Badge>
            <Badge className="px-4 py-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              🇬🇧 Royaume-Uni
            </Badge>
            <Badge className="px-4 py-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              🇺🇸 États-Unis
            </Badge>
            <Badge className="px-4 py-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              🇸🇬 Singapour
            </Badge>
            <Badge className="px-4 py-2 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              ... Etc
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}