"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Award,
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Linkedin
} from "lucide-react"
// import Image from "next/image" - Using img for placeholders

const experts = [
  {
    id: "quentin",
    name: "Quentin Hagnéré",
    title: "Fondateur & Président",
    certifications: ["CIF", "ORIAS", "AMF"],
    experience: "10+ ans",
    location: "Chambéry",
    specialties: ["Stratégie patrimoniale", "Investissement immobilier", "Défiscalisation"],
    bio: "Expert en gestion de patrimoine avec plus de 10 ans d'expérience, Quentin accompagne ses clients dans la construction et l'optimisation de leur patrimoine.",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758129971150-5372beae560993e3.webp",
    contact: {
      phone: "06 XX XX XX XX",
      email: "q.hagnere@hagnere-patrimoine.fr",
      linkedin: "quentin-hagnere"
    }
  },
  {
    id: "clement",
    name: "Clément Chatelain",
    title: "Conseiller en Gestion de Patrimoine",
    certifications: ["CIF", "ORIAS"],
    experience: "5+ ans",
    location: "Chambéry",
    specialties: ["Épargne", "Retraite", "Transmission"],
    bio: "Spécialiste de l'épargne et de la retraite, Clément aide ses clients à préparer sereinement leur avenir financier avec des solutions adaptées.",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758132066596-39914bc30c1a3f7d.webp",
    contact: {
      phone: "06 XX XX XX XX",
      email: "c.chatelain@hagnere-patrimoine.fr",
      linkedin: "clement-chatelain"
    }
  },
  {
    id: "victor",
    name: "Victor Baurain",
    title: "Conseiller en Gestion de Patrimoine",
    certifications: ["CIF", "ORIAS"],
    experience: "3+ ans",
    location: "Chambéry",
    specialties: ["Immobilier", "Défiscalisation", "Crédit"],
    bio: "Expert en investissement immobilier et solutions de défiscalisation, Victor accompagne ses clients dans leurs projets d'acquisition et d'optimisation fiscale.",
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758132083916-a3ace8c2b434b584.png",
    contact: {
      phone: "06 XX XX XX XX",
      email: "v.baurain@hagnere-patrimoine.fr",
      linkedin: "victor-baurain"
    }
  }
]

export function ExpertsSection() {
  const [selectedExpert, setSelectedExpert] = useState(experts[0])

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="border-black/20 text-black dark:border-white/20 dark:text-white">
            Notre équipe
          </Badge>
          <h2 className="text-3xl font-bold">
            Les experts Hagnéré Patrimoine
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Une équipe d'experts certifiés à votre service pour vous accompagner dans tous vos projets patrimoniaux
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Expert Cards */}
          <div className="space-y-4">
            {experts.map((expert) => (
              <Card
                key={expert.id}
                onClick={() => setSelectedExpert(expert)}
                className={cn(
                  "p-6 cursor-pointer transition-all hover:shadow-lg",
                  "border border-gray-200 dark:border-border",
                  selectedExpert.id === expert.id
                    ? "ring-1 ring-black dark:ring-white bg-gray-50 dark:bg-card"
                    : "bg-white dark:bg-card hover:-translate-y-1"
                )}
              >
                <div className="space-y-4">
                  {/* Header with name and title */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground">{expert.title}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        selectedExpert.id === expert.id
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : ""
                      )}
                    >
                      {expert.experience}
                    </Badge>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-2">
                    {expert.certifications.map((cert) => (
                      <Badge
                        key={cert}
                        variant="secondary"
                        className="text-xs"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {expert.bio}
                  </p>

                  {/* Specialties */}
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <div className="flex flex-wrap gap-1">
                      {expert.specialties.map((specialty, idx) => (
                        <span key={specialty} className="text-xs text-gray-600 dark:text-gray-400">
                          {specialty}{idx < expert.specialties.length - 1 ? " •" : ""}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {expert.location}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Right side - Selected Expert Photo */}
          <div className="relative lg:sticky lg:top-32 h-fit">
            <div className="relative rounded-full overflow-hidden max-h-[400px] h-[400px] w-[400px] mx-auto bg-gradient-to-br from-sky-200 via-sky-300 to-blue-400">
              {/* Full coverage background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-200 to-sky-300" />

              {/* Overlay background - exact copy from Gestion de Patrimoine 360° */}
              <div className="absolute inset-0 z-0">
                <div className="pointer-events-none absolute inset-[-50%] z-0" aria-hidden>
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-200 to-sky-300" />
                  <div className="absolute inset-0 opacity-90 bg-[radial-gradient(90%_90%_at_35%_45%,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.9)_20%,_rgba(88,175,255,0.55)_40%,_rgba(37,144,255,0.6)_65%,_rgba(24,119,242,0.75)_100%)] animate-[gradientShift_8s_ease-in-out_infinite] mix-blend-screen" />
                  <div className="absolute -right-10 -top-10 h-[70%] w-[65%] rounded-[48px] blur-[46px] bg-[radial-gradient(60%_60%_at_50%_50%,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.55)_40%,_rgba(255,255,255,0)_100%)]" />
                  <div className="absolute right-[-8%] top-[-10%] h-[140%] w-[78%] rounded-[56px] blur-[36px] opacity-85 animate-[pinkShift_7s_ease-in-out_infinite] bg-[radial-gradient(120%_140%_at_85%_35%,_rgba(244,114,182,0.65)_0%,_rgba(168,85,247,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(244,114,182,0)_78%)]" />
                  <div className="absolute right-[-10%] top-[-15%] h-[150%] w-[70%] blur-[28px] opacity-80 bg-[radial-gradient(140%_120%_at_100%_20%,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.7)_30%,_rgba(255,255,255,0.25)_58%,_rgba(255,255,255,0)_78%)]" />
                </div>
              </div>
              {/* Animated background blobs for light mode */}
              <div className="pointer-events-none absolute inset-0 z-0 dark:hidden" aria-hidden>
                <span className="absolute left-[-5%] top-[-5%] h-[250px] w-[250px] rounded-full bg-gradient-to-br from-sky-200 to-sky-100 opacity-60 blur-[60px]"
                  style={{
                    animation: 'floatWild 15s ease-in-out infinite'
                  }}/>
                <span className="absolute right-[-8%] top-[10%] h-[220px] w-[220px] rounded-full bg-gradient-to-br from-pink-100 to-pink-50 opacity-35 blur-[55px]"
                  style={{
                    animation: 'floatCrazy 12s ease-in-out infinite reverse'
                  }}/>
                <span className="absolute left-[40%] bottom-[-10%] h-[240px] w-[240px] rounded-full opacity-35 blur-[65px]"
                  style={{
                    background: 'linear-gradient(to bottom right, rgba(255, 218, 185, 0.4), rgba(255, 239, 213, 0.3))',
                    animation: 'floatWild 14s ease-in-out infinite 1s'
                  }}/>
                <span className="absolute right-[10%] bottom-[5%] h-[200px] w-[200px] rounded-full bg-gradient-to-br from-blue-200 to-blue-100 opacity-55 blur-[50px]"
                  style={{
                    animation: 'floatCrazy 10s ease-in-out infinite 0.5s'
                  }}/>
              </div>

              {/* Photo */}
              <div className="relative flex items-end justify-center h-[400px] pt-8 px-8 z-10">
                <img
                  src={selectedExpert.image}
                  alt={selectedExpert.name}
                  className="relative h-full w-auto max-w-full object-contain object-bottom z-10"
                />
              </div>
            </div>

            {/* CSS Animation - enhanced for more dynamic movement */}
            <style jsx>{`
              @keyframes gradientShift {
                0% { transform: translate3d(0,0,0) scale(1) rotate(0deg); filter: hue-rotate(0deg); }
                25% { transform: translate3d(-8%, 5%, 0) scale(1.15) rotate(3deg); filter: hue-rotate(15deg); }
                50% { transform: translate3d(6%, -8%, 0) scale(0.95) rotate(-2deg); filter: hue-rotate(-10deg); }
                75% { transform: translate3d(-5%, -3%, 0) scale(1.1) rotate(1deg); filter: hue-rotate(20deg); }
                100% { transform: translate3d(0,0,0) scale(1) rotate(0deg); filter: hue-rotate(0deg); }
              }
              @keyframes pinkShift {
                0% { transform: translateX(0) translateY(0) rotate(8deg) scale(1); }
                20% { transform: translateX(-15%) translateY(10%) rotate(12deg) scale(1.2); }
                40% { transform: translateX(10%) translateY(-15%) rotate(5deg) scale(0.9); }
                60% { transform: translateX(-8%) translateY(5%) rotate(10deg) scale(1.15); }
                80% { transform: translateX(12%) translateY(-8%) rotate(6deg) scale(0.95); }
                100% { transform: translateX(0) translateY(0) rotate(8deg) scale(1); }
              }
              @keyframes floatWild {
                0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
                20% { transform: translateY(-40px) translateX(30px) scale(1.1); }
                40% { transform: translateY(25px) translateX(-35px) scale(0.95); }
                60% { transform: translateY(-30px) translateX(40px) scale(1.15); }
                80% { transform: translateY(35px) translateX(-25px) scale(0.9); }
              }
              @keyframes floatCrazy {
                0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                25% { transform: translateY(-50px) translateX(-40px) rotate(10deg); }
                50% { transform: translateY(40px) translateX(45px) rotate(-15deg); }
                75% { transform: translateY(-35px) translateX(-50px) rotate(5deg); }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(10px) translateX(-10px); }
                75% { transform: translateY(-10px) translateX(20px); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  )
}