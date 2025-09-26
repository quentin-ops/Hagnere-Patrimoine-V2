import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer9() {
  return (
    <div className="bg-gray-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="border-b border-neutral-200 pb-2 dark:border-neutral-700">
          <div className="mb-10 max-w-xl">
            <Logo className="justify-start" />
            <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              Expertise patrimoniale et conseils en investissement pour optimiser et protéger votre patrimoine.
              Accompagnement personnalisé pour particuliers et professionnels.
            </p>
            <div className="text-sm text-neutral-700 dark:text-neutral-300">
              Un cabinet de référence à{" "}
              <span className="font-medium text-neutral-800 dark:text-neutral-400">
                Chambéry
              </span>
            </div>
            <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              Suivez notre actualité sur{" "}
              <Link
                href="https://www.linkedin.com/company/hagnere-patrimoine"
                className="font-medium text-neutral-800 underline dark:text-neutral-400"
                target="__blank"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 border-b border-neutral-200 pt-10 pb-10 md:grid-cols-4 dark:border-neutral-700">
          <ul className="text-base font-medium text-neutral-800 dark:text-neutral-200">
            <li className="mb-4 text-sm font-bold text-black dark:text-white">
              Services
            </li>
            {SERVICES.map((item, idx) => (
              <li key={"first" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-neutral-800 dark:text-neutral-200">
            <li className="mb-4 text-sm font-bold text-black dark:text-white">
              Solutions
            </li>
            {SOLUTIONS.map((item, idx) => (
              <li key={"first" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-neutral-800 dark:text-neutral-200">
            <li className="mb-4 text-sm font-bold text-black dark:text-white">
              Ressources
            </li>
            {RESSOURCES.map((item, idx) => (
              <li key={"first" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="text-base font-medium text-neutral-800 dark:text-neutral-200">
            <li className="mb-4 text-sm font-bold text-black dark:text-white">
              À propos
            </li>
            {PAGES.map((item, idx) => (
              <li key={"first" + idx} className="mb-4 text-sm font-normal">
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mb-4 pt-10 text-sm text-neutral-600 dark:text-neutral-400">
          &copy; {new Date().getFullYear()} Hagnéré Patrimoine. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}

const SERVICES = [
  { title: "Gestion de patrimoine", href: "/services/gestion-patrimoine" },
  { title: "Optimisation fiscale", href: "/services/optimisation-fiscale" },
  { title: "Investissement immobilier", href: "/services/investissement-immobilier" },
  { title: "Retraite et prévoyance", href: "/services/retraite" },
  { title: "Transmission de patrimoine", href: "/services/transmission" },
  { title: "Conseil en investissement", href: "/services/investissement" },
  { title: "Elite Patrimoine", href: "/services/elite-patrimoine" },
  { title: "Accompagnement 360°", href: "/services/accompagnement-360" },
  { title: "Optimisation internationale", href: "/services/optimisation-internationale" },
];

const SOLUTIONS = [
  { title: "Particuliers", href: "/solutions/particuliers" },
  { title: "Entrepreneurs", href: "/solutions/entrepreneurs" },
  { title: "Professions libérales", href: "/solutions/professions-liberales" },
  { title: "Expatriés", href: "/solutions/expatries" },
  { title: "Dirigeants d'entreprise", href: "/solutions/dirigeants" },
  { title: "Retraités", href: "/solutions/retraites" },
];

const RESSOURCES = [
  { title: "Simulateur intérêts composés", href: "/ressources/simulateurs/calculatrice-interets-composes" },
  { title: "Guides patrimoniaux", href: "/ressources/guides" },
  { title: "Actualités fiscales", href: "/actualites" },
  { title: "FAQ", href: "/faq" },
  { title: "Glossaire", href: "/glossaire" },
  { title: "Blog", href: "/blog" },
  { title: "Webinaires", href: "/webinaires" },
  { title: "Études de cas", href: "/etudes-de-cas" },
];

const PAGES = [
  { title: "Notre cabinet", href: "/a-propos" },
  { title: "Notre équipe", href: "/equipe" },
  { title: "Nos valeurs", href: "/valeurs" },
  { title: "Témoignages clients", href: "/temoignages" },
  { title: "Contact", href: "/contact" },
  { title: "Bilan patrimonial gratuit", href: "/bilan-gratuit" },
  { title: "Prendre rendez-vous", href: "/contact" },
  { title: "Mentions légales", href: "/mentions-legales" },
  { title: "Politique de confidentialité", href: "/politique-confidentialite" },
  { title: "CGV", href: "/cgv" },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/hagnere-patrimoine" },
  { title: "Facebook", href: "https://www.facebook.com/hagnerepatrimoine" },
];

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex flex-shrink-0 items-center py-4",
        className,
      )}
    >
      <Image
        src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757695115817-logo-patrimoine-black--100w.webp"
        height="40"
        width="150"
        alt="Hagnéré Patrimoine"
        className="block h-10 w-auto dark:hidden"
      />
      <Image
        src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1757695117053-logo-hagnere-patrimoine-white-100w.webp"
        height="40"
        width="150"
        alt="Hagnéré Patrimoine"
        className="hidden h-10 w-auto dark:block"
      />
    </Link>
  );
};

export { Footer9 as FooterWithGrid };