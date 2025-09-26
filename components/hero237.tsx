import { TrendingUp, Shield, Users } from "lucide-react";
import React from "react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const Hero237 = () => {
  const circle1Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/nextjs-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vue-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vite-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/spotify-icon.svg",
  ];

  const circle2Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/astro-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
  ];

  const circle3Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/notion-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/github-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/slack-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/laravel-icon.svg",
  ];

  const circle4Images = [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/gatsby-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/dropbox-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/brave-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vscode-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/sketch-icon.svg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-icon.svg",
  ];

  const stats = [
    {
      icon: <Users className="h-5 w-5 text-gray-700 dark:text-white/90" />,
      title: "+ 762",
      description: "Clients satisfaits",
    },
    {
      icon: <Shield className="h-5 w-5 text-gray-700 dark:text-white/90" />,
      title: "5 ans",
      description: "D'expertise",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-gray-700 dark:text-white/90" />,
      title: "+ 32 000",
      description: "Personnes nous suivent",
    },
  ];

  return (
    <section className="relative border border-b w-screen overflow-hidden py-32">
      <div className="container relative flex flex-col lg:flex-row">
        <div className="mt-10 space-y-12 lg:w-full xl:w-1/2">
          <p className="bg-muted w-fit rounded-full px-4 py-1 text-sm uppercase">
            Les Simulateurs by Hagnéré Patrimoine
          </p>
          <h1 className="mt-3 max-w-lg text-6xl font-bold lg:text-7xl">
            <span className="opacity-30"></span> Nos Simulateurs
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg">
            Découvrez nos simulateurs de défiscalisation pour calculer vos économies d'impôts
            en quelques clics. Outils professionnels 100% gratuits et sans engagement.
          </p>

          <ul className="mt-18 flex items-center gap-8">
            {stats.map((stat, index) => (
              <li key={stat.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 dark:bg-card/90 dark:border-white/10 flex items-center justify-center">
                  {stat.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {stat.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.description}</p>
                </div>
                {index !== stats.length - 1 && (
                  <div className="ml-4 h-12 w-px bg-gradient-to-t from-gray-300 to-transparent dark:from-gray-600" />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="h-112 relative lg:w-1/2">
          <div className="relative -left-35 lg:left-0 flex h-[1100px] w-[1500px] flex-col items-center justify-center lg:absolute">
            <OrbitingCircles iconSize={40} radius={310} speed={2}>
              {circle1Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={390} reverse speed={2}>
              {circle2Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={470} speed={2}>
              {circle3Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
            <OrbitingCircles iconSize={40} radius={550} reverse speed={1}>
              {circle4Images.map((src, index) => (
                <div key={index} className="size-12">
                  <img src={src} className="size-full object-contain" alt="" />
                </div>
              ))}
            </OrbitingCircles>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero237 };
export default Hero237;