"use client";

import { useState } from "react";
import { ArrowRight, Calendar, Crown, Diamond } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SparklesCore } from "@/components/ui/sparkles";
import { Meteors } from "@/components/ui/meteors";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { EliteEligibilityModal } from "@/components/elite-eligibility-modal";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import {
  solutionsFiscales,
  placementsCategories,
  investissements,
  financements,
  assurances,
  gestionFortune,
  resources,
  simulateurs,
  rendezVous
} from "./navbar-menus-data";
import { PieChart, Lightbulb, Target, Briefcase } from "lucide-react";

export const SolutionsFiscalesMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758734684100-462f74dbc91c73c2.webp"
              alt="Wallet"
              className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Ne plus payer d&apos;impôts est possible !
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Découvrez comment optimiser votre fiscalité avec un rendez-vous gratuit de 45 minutes avec un expert patrimonial
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Bilan Patrimonial 360°
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Défiscalisation Immobilière */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Défiscalisation Immobilière
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {solutionsFiscales.slice(0, 5).map((solution) => (
            <NavigationMenuLink
              key={solution.id}
              href={solution.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <solution.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {solution.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {solution.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Défiscalisation Financière */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Défiscalisation Financière
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {solutionsFiscales.slice(5).map((solution) => (
            <NavigationMenuLink
              key={solution.id}
              href={solution.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <solution.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {solution.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {solution.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

export const PlacementsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
              alt="Investment"
              className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Solutions d&apos;épargne sur mesure
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Diversifiez votre patrimoine avec nos solutions d&apos;investissement sélectionnées et bénéficiez d&apos;un accompagnement personnalisé
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Bilan Patrimonial 360°
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {placementsCategories.map((category) => (
        <div key={category.title} className="grid gap-y-2 lg:gap-y-6">
          <div className="border-gray-200 text-left lg:border-b lg:pb-3">
            <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
              {category.title}
            </strong>
          </div>
          <menu className="grid md:grid-cols-3 md:gap-x-5 lg:gap-y-7">
            {category.products.map((product) => (
              <NavigationMenuLink
                key={product.id}
                href={product.href}
                className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                  <product.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                    {product.title}
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                    {product.description}
                  </p>
                </div>
                <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

export const InvestissementsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
            alt="Investissements"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Diversifiez votre patrimoine
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Investissez dans des actifs tangibles et durables avec un accompagnement expert
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Bilan Patrimonial 360°
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Investissement Immobilier */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Investissement Immobilier
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {investissements.filter(inv => inv.category === "immobilier").map((invest) => (
            <NavigationMenuLink
              key={invest.id}
              href={invest.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <invest.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {invest.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {invest.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Investissement Financier */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Investissement Financier
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {investissements.filter(inv => inv.category === "financier").map((invest) => (
            <NavigationMenuLink
              key={invest.id}
              href={invest.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <invest.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {invest.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {invest.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

export const FinancementsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758734684100-462f74dbc91c73c2.webp"
            alt="Financements"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Solutions de crédit adaptées
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Obtenez les meilleures conditions de financement avec notre réseau de partenaires bancaires
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Étude de financement gratuite
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Crédits immobiliers */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Crédits immobiliers
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {financements.filter(f => f.category === "immobilier").map((finance) => (
            <NavigationMenuLink
              key={finance.id}
              href={finance.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <finance.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {finance.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {finance.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Crédits spécialisés et restructuration */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Crédits spécialisés & Restructuration
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {financements.filter(f => f.category === "specialises" || f.category === "restructuration").map((finance) => (
            <NavigationMenuLink
              key={finance.id}
              href={finance.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <finance.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {finance.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {finance.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Crédits spécifiques */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Crédits spécifiques
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {financements.filter(f => f.category === "specifiques").map((finance) => (
            <NavigationMenuLink
              key={finance.id}
              href={finance.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <finance.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {finance.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {finance.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

export const AssurancesMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
            alt="Assurances"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Protégez votre patrimoine et vos proches
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Solutions d&apos;assurance complètes pour sécuriser votre avenir et celui de votre famille
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Audit de protection gratuit
          </a>
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-6">
      {/* Organisation en 2 colonnes */}
      <div className="grid md:grid-cols-2 gap-x-8">
        {/* Colonne 1 */}
        <div className="space-y-6">
          {/* Assurances Crédit & Santé */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Crédit & Santé
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "credit-sante").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>

          {/* Assurances Décès & Prévoyance */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Décès & Prévoyance
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "deces-prevoyance").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne 2 */}
        <div className="space-y-6">
          {/* Assurances Mobilité & Habitation */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Mobilité & Habitation
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "mobilite-habitation").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>

          {/* Assurances Immobilier & Spécifiques */}
          <div>
            <div className="border-gray-200 text-left border-b pb-2 mb-3">
              <strong className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                Immobilier & Spécifiques
              </strong>
            </div>
            <div className="space-y-2">
              {assurances.filter(a => a.category === "immobilier" || a.category === "specifiques").map((assur) => (
                <NavigationMenuLink
                  key={assur.id}
                  href={assur.href}
                  className="group flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <assur.icon className="size-4 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {assur.title}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {assur.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const GestionFortuneMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-yellow-600/30 bg-gradient-to-br from-black via-yellow-950/20 to-black px-6 py-8">
        {/* Badge VIP */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold">
          VIP
        </div>

        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
            src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758734684100-462f74dbc91c73c2.webp"
            alt="Gestion de fortune"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          />
        </a>

          <h1 className="mb-4 text-xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
            Services exclusifs pour votre patrimoine
          </h1>

          <p className="mb-4 text-sm font-normal text-yellow-100/80">
            Accédez à des solutions premium et un accompagnement sur-mesure pour optimiser votre fortune
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-yellow-500/50 bg-gradient-to-r from-yellow-600/10 to-yellow-500/10 px-4 py-2 text-yellow-200 inline-flex items-center gap-2 text-xs hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 hover:text-black hover:border-yellow-500 transition-all duration-300">
            <Crown className="h-4 w-4" />
            Consultation privée exclusive
          </a>
        </div>

        {/* Meaty part - Meteor effect with golden tint */}
        <div className="opacity-50">
          <Meteors number={15} />
        </div>
      </div>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Services Exclusifs */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <Crown className="h-3 w-3 text-yellow-600" />
            Services Exclusifs
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {gestionFortune.filter(f => f.category === "services-exclusifs").map((fortune) => (
            <NavigationMenuLink
              key={fortune.id}
              href={fortune.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <fortune.icon className="size-5 text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {fortune.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {fortune.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>

      {/* Produits Exclusifs */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <Diamond className="h-3 w-3 text-yellow-600" />
            Produits Exclusifs
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {gestionFortune.filter(f => f.category === "produits-exclusifs").map((fortune) => (
            <NavigationMenuLink
              key={fortune.id}
              href={fortune.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <fortune.icon className="size-5 text-gray-600 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {fortune.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {fortune.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

export const RendezVousMenu = () => {
  const [eliteModalOpen, setEliteModalOpen] = useState(false);

  return (
    <>
      <div className="w-full">
        <menu className="grid gap-6 lg:h-full">
          {/* Première ligne : Bilan et Consultation Elite */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Consultations Gratuites</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <NavigationMenuLink
                href="/bilan-patrimonial"
                className="border-gray-200 bg-black group relative flex flex-col items-start rounded-md overflow-hidden text-left lg:border lg:p-0 hover:bg-gray-900"
              >
                <AuroraBackground className="absolute inset-0" showRadialGradient={true}>
                  <div className="relative z-10 px-6 py-5 w-full">
                    <div className="absolute top-2 right-2 z-20">
                      <Badge className="bg-green-500 text-white text-[10px]">Gratuit</Badge>
                    </div>
                    <PieChart className="size-6 text-black sm:size-7 mb-3" />
                    <div className="flex-1">
                      <div className="text-black text-sm font-medium">
                        Bilan Patrimonial 360°
                      </div>
                      <p className="text-gray-700 mt-1 text-xs">
                        Analyse complète de votre situation
                      </p>
                    </div>
                  </div>
                </AuroraBackground>
              </NavigationMenuLink>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEliteModalOpen(true);
                }}
                className="border-gray-200 bg-black group relative flex flex-col items-start rounded-md overflow-hidden text-left lg:border hover:bg-gray-900 cursor-pointer"
              >
            <div className="absolute inset-0">
              <ShootingStars
                starColor="#C0C0C0"
                trailColor="#808080"
                minSpeed={10}
                maxSpeed={30}
                minDelay={1200}
                maxDelay={4200}
              />
              <ShootingStars
                starColor="#FFFFFF"
                trailColor="#C0C0C0"
                minSpeed={10}
                maxSpeed={30}
                minDelay={1500}
                maxDelay={4500}
              />
              <ShootingStars
                starColor="#E5E5E5"
                trailColor="#999999"
                minSpeed={10}
                maxSpeed={30}
                minDelay={1000}
                maxDelay={4000}
              />
              <StarsBackground
                starDensity={0.0003}
                allStarsTwinkle={true}
                twinkleProbability={0.9}
              />
            </div>
            <div className="relative z-10 px-6 py-5 w-full h-full flex flex-col">
              <div className="absolute top-3 right-3 z-20 flex gap-1">
                <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-[10px] border-0">VIP</Badge>
                <Badge className="bg-gradient-to-r from-gray-600 to-gray-400 text-white text-[10px] border-0">Gratuit</Badge>
              </div>
              <Crown className="size-6 sm:size-7 mb-3 text-gray-300" />
              <div className="flex-1">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300 text-sm font-medium">
                  Consultation Elite
                </div>
                <p className="text-gray-400 mt-1 text-xs">
                  Conseil personnalisé haut de gamme
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Deuxième ligne : Stratégies payantes */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sessions de Travail Payantes</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <NavigationMenuLink
            href="/strategie-1h"
            className="border-gray-200 bg-gray-50 lg:bg-white group relative flex flex-col items-start rounded-md px-6 py-5 text-left lg:border lg:p-5 hover:bg-gray-50"
          >
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-100 text-blue-800 text-[10px]">149€/h</Badge>
            </div>
            <Lightbulb className="size-6 text-gray-600 sm:size-7 mb-3" />
            <div className="flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                Stratégie 1h
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Session de travail d'1 heure
              </p>
            </div>
          </NavigationMenuLink>

          <NavigationMenuLink
            href="/strategie-2h"
            className="border-gray-200 bg-gray-50 lg:bg-white group relative flex flex-col items-start rounded-md px-6 py-5 text-left lg:border lg:p-5 hover:bg-gray-50"
          >
            <div className="absolute top-2 right-2">
              <Badge className="bg-blue-100 text-blue-800 text-[10px]">269€/2h</Badge>
            </div>
            <Target className="size-6 text-gray-600 sm:size-7 mb-3" />
            <div className="flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                Stratégies 2h
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Session approfondie de 2 heures
              </p>
            </div>
          </NavigationMenuLink>
        </div>
      </div>

      {/* Troisième ligne : Présentation Hagnéré Investissement (1/3 de largeur) */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Opportunités d'Investissement</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <NavigationMenuLink
            href="/presentation-investissement"
            className="border-gray-200 bg-gray-50 lg:bg-white group relative flex flex-col items-start rounded-md px-6 py-5 text-left lg:border lg:p-5 hover:bg-gray-50"
          >
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-100 text-green-800 text-[10px]">Gratuit</Badge>
            </div>
            <Briefcase className="size-6 text-gray-600 sm:size-7 mb-3" />
            <div className="flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                Hagnéré Investissement
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                Découvrez nos opportunités exclusives
              </p>
            </div>
          </NavigationMenuLink>
        </div>
      </div>
    </menu>
  </div>
  <EliteEligibilityModal
    open={eliteModalOpen}
    onOpenChange={setEliteModalOpen}
  />
  </>
  );
};

export const RessourcesMenu = () => (
  <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4 lg:gap-6">
    <div className="col-span-1">
      <a
        href="/ressources/simulateurs"
        className="bg-gradient-to-br from-gray-900 to-black text-white group relative flex h-full flex-row overflow-hidden rounded-lg p-0 lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col text-left">
          <div className="relative z-20 flex flex-col px-6 pb-6 pt-6">
            <span className="mb-4 text-xs font-medium uppercase tracking-wider">
              Centre de ressources
            </span>
            <div className="mt-auto flex items-center space-x-1 text-xs">
              Accéder aux ressources
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-2 text-xs text-white/70">
              Guides, webinaires et outils pour optimiser votre patrimoine.
            </p>
          </div>
        </div>
      </a>
    </div>
    <div className="lg:col-span-3 lg:flex lg:flex-col">
      <div>
        <div className="border-gray-200 mb-4 pb-3 text-left md:mb-6 lg:border-b">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Ressources Populaires
          </strong>
        </div>
      </div>
      <menu className="grid gap-y-4 lg:h-full lg:grid-cols-3 lg:gap-6">
        {resources.map((resource) => (
          <NavigationMenuLink
            key={resource.id}
            href={resource.href}
            className="border-gray-200 bg-gray-50 lg:bg-white group flex flex-row items-center space-x-4 rounded-md px-6 py-5 text-left md:space-x-5 lg:border lg:p-5 hover:bg-gray-50"
          >
            <resource.icon className="size-6 text-gray-600 sm:size-7" />
            <div className="ml-4 flex-1">
              <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                {resource.title}
              </div>
              <p className="text-gray-600 mt-1 text-xs">
                {resource.description}
              </p>
            </div>
          </NavigationMenuLink>
        ))}
      </menu>
    </div>
  </div>
);

export const SimulateursMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    {/* Colonne gauche avec image */}
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
        {/* Sparkles effect with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={200}
            className="absolute inset-0 w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        {/* Radial Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

        {/* Content with blur background */}
        <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
          {/* Image */}
          <a href="/calendly" className="block mb-4">
            <img
              src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
              alt="Simulateurs"
              className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </a>

          <h1 className="mb-4 text-xl font-bold text-white">
            Outils de simulation patrimoniale
          </h1>

          <p className="mb-4 text-sm font-normal text-slate-300">
            Utilisez nos simulateurs pour estimer vos gains et optimiser vos investissements
          </p>

          <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Calendar className="h-4 w-4" />
            Bilan Patrimonial 360°
          </a>
        </div>
      </div>
    </div>

    {/* Contenu principal */}
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {/* Section Simulateurs */}
      <div className="grid gap-y-2 lg:gap-y-6">
        <div className="border-gray-200 text-left lg:border-b lg:pb-3">
          <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
            Outils de calcul
          </strong>
        </div>
        <menu className="grid md:grid-cols-2 md:gap-x-5 lg:gap-y-7">
          {simulateurs.map((simulateur) => (
            <NavigationMenuLink
              key={simulateur.id}
              href={simulateur.href}
              className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                <simulateur.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                  {simulateur.title}
                </div>
                <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                  {simulateur.description}
                </p>
              </div>
              <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
            </NavigationMenuLink>
          ))}
        </menu>
      </div>
    </div>
  </div>
);

export const AutresMenu = () => {
  const [eliteModalOpen, setEliteModalOpen] = useState(false);

  return (
    <>
      <div className="grid gap-y-12 lg:flex lg:space-x-8">
        {/* Colonne gauche avec image */}
        <div className="w-full shrink-0 lg:max-w-[18rem]">
          <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-xl border border-gray-800 bg-black px-6 py-8">
            {/* Sparkles effect with gradient overlay */}
            <div className="absolute inset-0 z-0">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={200}
                className="absolute inset-0 w-full h-full"
                particleColor="#FFFFFF"
                speed={0.5}
              />
            </div>

            {/* Radial Gradient overlay */}
            <div className="absolute inset-0 w-full h-full bg-black/20 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] z-[1]" />

            {/* Content with blur background */}
            <div className="relative z-[2] flex flex-col items-start backdrop-blur-md bg-black/20 border border-white rounded-lg p-4 -mx-2">
              {/* Image */}
              <a href="/calendly" className="block mb-4">
                <img
                  src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758735003578-e8bb254e4316438e.webp"
                  alt="Autres services"
                  className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </a>

              <h1 className="mb-4 text-xl font-bold text-white">
                Services et ressources complémentaires
              </h1>

              <p className="mb-4 text-sm font-normal text-slate-300">
                Prenez rendez-vous avec nos experts et accédez à toutes nos ressources pour optimiser votre patrimoine
              </p>

              <a href="/bilan-gratuit" className="rounded-lg border border-gray-400 bg-white/10 px-4 py-2 text-white inline-flex items-center gap-2 text-xs hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                <Calendar className="h-4 w-4" />
                Bilan Patrimonial 360°
              </a>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid w-full gap-y-12 lg:gap-y-6">
          {/* Section Rendez-vous */}
          <div className="grid gap-y-2 lg:gap-y-6">
            <div className="border-gray-200 text-left lg:border-b lg:pb-3">
              <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
                Rendez-vous
              </strong>
            </div>
            <menu className="grid md:grid-cols-3 md:gap-x-5 lg:gap-y-7">
              {rendezVous.slice(0, 6).map((rdv) => (
                <NavigationMenuLink
                  key={rdv.id}
                  href={rdv.href}
                  className="border-gray-200 group relative flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  {rdv.badge && (
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={`text-[10px] ${
                          rdv.badge.color === "green"
                            ? "bg-green-100 text-green-800"
                            : rdv.badge.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : rdv.badge.color === "gold"
                            ? "bg-gradient-to-r from-yellow-600 to-yellow-400 text-white border-0"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {rdv.badge.text}
                      </Badge>
                    </div>
                  )}
                  <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                    <rdv.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {rdv.title}
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                      {rdv.description}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </menu>
          </div>

          {/* Section Ressources */}
          <div className="grid gap-y-2 lg:gap-y-6">
            <div className="border-gray-200 text-left lg:border-b lg:pb-3">
              <strong className="text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
                Ressources
              </strong>
            </div>
            <menu className="grid md:grid-cols-3 md:gap-x-5 lg:gap-y-7">
              {resources.filter(resource => ["resource-3", "resource-4", "resource-6"].includes(resource.id)).map((resource) => (
                <NavigationMenuLink
                  key={resource.id}
                  href={resource.href}
                  className="border-gray-200 group flex flex-row items-center space-x-6 border-b py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2 rounded-md hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                    <resource.icon className="size-5 text-gray-600 group-hover:text-black group-hover:scale-110 transition-all duration-200" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 group-hover:text-black text-sm font-medium">
                      {resource.title}
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-800 mt-1 text-xs">
                      {resource.description}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-gray-400 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        </div>
      </div>
      <EliteEligibilityModal
        open={eliteModalOpen}
        onOpenChange={setEliteModalOpen}
      />
    </>
  );
};
