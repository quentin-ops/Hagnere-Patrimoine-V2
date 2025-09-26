"use client";
import { cn } from "@/lib/utils";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { HeaderLogoLocal } from "@/components/logo-local";
import { ThemeSwitcherWrapper } from "@/components/theme-switcher-wrapper";
import { NavbarActionButtons } from "@/components/navbar-action-buttons";
import { NavbarLoginButton } from "@/components/navbar-login-button";
import { Button } from "@/components/ui/moving-border";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  SolutionsFiscalesMenu,
  PlacementsMenu,
  InvestissementsMenu,
  FinancementsMenu,
  AssurancesMenu,
  GestionFortuneMenu,
  SimulateursMenu,
  AutresMenu,
} from "@/components/navbar-menus-components";

const navigationMenuItems = [
  {
    key: "defiscalisation",
    label: "Défiscalisation",
    component: SolutionsFiscalesMenu,
  },
  {
    key: "placements",
    label: "Placements",
    component: PlacementsMenu,
  },
  {
    key: "investissements",
    label: "Investissements",
    component: InvestissementsMenu,
  },
  {
    key: "financements",
    label: "Financements",
    component: FinancementsMenu,
  },
  {
    key: "assurances",
    label: "Assurances",
    component: AssurancesMenu,
  },
  {
    key: "gestion-fortune",
    label: "Gestion de fortune",
    component: GestionFortuneMenu,
  },
  {
    key: "simulateurs",
    label: "Simulateurs",
    component: SimulateursMenu,
  },
  {
    key: "autres",
    label: "Autres",
    component: AutresMenu,
  },
] as const;

const Navbar = () => {
  return (
    <div className="flex w-full justify-center">
      <DesktopNav />
      <MobileNav />
    </div>
  );
};

const DesktopNav = () => {
  return (
    <motion.div
      className={cn(
        "relative z-[60] mx-6 hidden w-[calc(100%-3rem)] flex-row items-center justify-between self-start rounded-full bg-white/80 backdrop-blur-md px-6 py-2 nav:flex dark:bg-neutral-950/80",
        "sticky inset-x-0 top-2",
      )}
    >
      {/* Logo and Navigation Menu */}
      <div className="flex items-center gap-2">
        <Link href="/" className="mr-2">
          <HeaderLogoLocal />
        </Link>
        
        {/* Navigation Menu - Aligned left after logo */}
        <NavigationMenu>
          <NavigationMenuList className="gap-0">
            {navigationMenuItems.map((item) => (
              <NavigationMenuItem key={item.key}>
                <NavigationMenuTrigger className="text-[11px] px-2 h-7">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[calc(100vw-4rem)] p-12 2xl:min-w-[calc(1400px-4rem)]">
                  <item.component />
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link href="/calendly" className="hidden md:block">
          <Button
            borderRadius="50rem"
            as="div"
            containerClassName="h-10 w-auto hover:scale-105 hover:shadow-lg transition-all duration-300"
            borderClassName="bg-[radial-gradient(#3b82f6_40%,transparent_60%)] hover:bg-[radial-gradient(#60a5fa_40%,transparent_60%)]"
            duration={3000}
            className="bg-black dark:bg-white text-white dark:text-black border-neutral-200 dark:border-slate-800 text-xs font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2 px-5 py-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>Rendez-vous gratuit</span>
            </div>
          </Button>
        </Link>
        <NavbarActionButtons className="hidden md:flex" />
        <NavbarLoginButton className="hidden md:flex" />
        <ThemeSwitcherWrapper />
      </div>
    </motion.div>
  );
};

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <>
      <motion.div
        animate={{ borderRadius: open ? "4px" : "2rem" }}
        key={String(open)}
        className="relative mx-4 flex w-[calc(100%-2rem)] flex-col items-center justify-between bg-white/80 backdrop-blur-md px-5 py-2 nav:hidden dark:bg-neutral-950/80"
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Link href="/">
            <HeaderLogoLocal />
          </Link>
          <div className="flex items-center gap-1.5">
            <NavbarActionButtons className="hidden sm:flex" />
            <NavbarLoginButton className="hidden sm:flex" />
            <ThemeSwitcherWrapper />
            {open ? (
              <X
                className="h-6 w-6 text-black dark:text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <Menu
                className="h-6 w-6 text-black dark:text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-16 z-20 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 dark:bg-neutral-950"
            >
              {navigationMenuItems.map((item) => (
                <div key={item.key} className="w-full">
                  <button
                    onClick={() => setActiveSubmenu(activeSubmenu === item.key ? null : item.key)}
                    className="relative flex w-full justify-between text-neutral-600 dark:text-neutral-300 py-2"
                  >
                    <span className="block font-medium">{item.label}</span>
                  </button>
                  {activeSubmenu === item.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0 }}
                      className="pl-4 text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      Voir les détails sur le site desktop
                    </motion.div>
                  )}
                </div>
              ))}
              <Link href="/calendly" className="w-full">
                <Button
                  borderRadius="0.5rem"
                  as="div"
                  containerClassName="h-10 w-full hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                  borderClassName="bg-[radial-gradient(#3b82f6_40%,transparent_60%)] hover:bg-[radial-gradient(#60a5fa_40%,transparent_60%)]"
                  duration={3000}
                  className="bg-black dark:bg-white text-white dark:text-black border-neutral-200 dark:border-slate-800 text-xs font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-center gap-2 px-5 py-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Rendez-vous gratuit</span>
                  </div>
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export function NavbarTop() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full py-1.5">
      <Navbar />
    </div>
  );
}