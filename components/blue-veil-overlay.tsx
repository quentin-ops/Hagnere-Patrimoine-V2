"use client"

import React from "react"
import { cn } from "@/lib/utils"

type BlueVeilOverlayProps = {
  className?: string
  children?: React.ReactNode
  variant?: "stargate" | "teen-safety" | "age-prediction" | "privacy-gradient" | "openai-grove" | "openai-microsoft" | "blue" | "emerald" | "violet" | "amber" | "rose"
}

/**
 * Reusable animated background overlay with multiple gradient variants.
 * Includes 6 new pixel-perfect overlays based on provided designs.
 */
export function BlueVeilOverlay({ className, children, variant = "blue" }: BlueVeilOverlayProps) {
  // Image 1: Stargate UK - Cyan/Pink gradient diagonal
  if (variant === "stargate") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl", className)} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-300 to-pink-400" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_30%_30%,rgba(56,189,248,0.4),transparent)] animate-[floatBlob1_15s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_70%,rgba(244,114,182,0.4),transparent)] animate-[floatBlob2_12s_ease-in-out_infinite]" />
        <div className="absolute inset-0 backdrop-blur-[80px]" />
        <style jsx>{`
          @keyframes floatBlob1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          @keyframes floatBlob2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-40px, 20px) scale(1.05); }
            66% { transform: translate(30px, -10px) scale(0.98); }
          }
        `}</style>
        {children}
      </div>
    )
  }

  // Image 2: Teen safety - Violet/Cyan gradient diagonal  
  if (variant === "teen-safety") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl", className)} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-300 to-cyan-400" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_20%_20%,rgba(167,139,250,0.5),transparent)] animate-[morphBlob1_18s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_80%_80%,rgba(34,211,238,0.5),transparent)] animate-[morphBlob2_14s_ease-in-out_infinite]" />
        <div className="absolute inset-0 backdrop-blur-[60px]" />
        <style jsx>{`
          @keyframes morphBlob1 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            25% { transform: translate(20px, -30px) scale(1.15) rotate(90deg); }
            50% { transform: translate(-30px, 10px) scale(0.9) rotate(180deg); }
            75% { transform: translate(10px, 20px) scale(1.05) rotate(270deg); }
          }
          @keyframes morphBlob2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -20px) scale(1.2); }
          }
        `}</style>
        {children}
      </div>
    )
  }

  // Image 3: Age prediction - Pink/Cyan soft gradient
  if (variant === "age-prediction") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl", className)} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-pink-100 to-cyan-200 animate-[hueShift_20s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_40%_40%,rgba(251,207,232,0.6),transparent)] animate-[pulseBlob_8s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_30%,rgba(165,243,252,0.4),transparent)] animate-[pulseBlob_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute inset-0 backdrop-blur-[40px]" />
        <style jsx>{`
          @keyframes hueShift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(20deg); }
          }
          @keyframes pulseBlob {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 0.8; }
          }
        `}</style>
        {children}
      </div>
    )
  }

  // Image 4: Privacy gradient - Purple/Blue soft gradient
  if (variant === "privacy-gradient") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl", className)} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-violet-200 to-blue-300" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_30%_30%,rgba(196,181,253,0.5),transparent)] animate-[waveMotion1_16s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_70%_70%,rgba(147,197,253,0.5),transparent)] animate-[waveMotion2_12s_ease-in-out_infinite]" />
        <div className="absolute inset-0 backdrop-blur-[50px]" />
        <style jsx>{`
          @keyframes waveMotion1 {
            0%, 100% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(30px) translateY(-20px); }
            50% { transform: translateX(-20px) translateY(30px); }
            75% { transform: translateX(20px) translateY(10px); }
          }
          @keyframes waveMotion2 {
            0%, 100% { transform: translateX(0) translateY(0) scale(1); }
            33% { transform: translateX(-30px) translateY(20px) scale(1.1); }
            66% { transform: translateX(20px) translateY(-30px) scale(0.95); }
          }
        `}</style>
        {children}
      </div>
    )
  }

  // Image 5: OpenAI Grove - Green/Yellow gradient
  if (variant === "openai-grove") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl", className)} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-lime-200 to-yellow-200 animate-[breathe_10s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_30%_50%,rgba(134,239,172,0.6),transparent)] animate-[driftLeft_20s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_70%_50%,rgba(253,224,71,0.4),transparent)] animate-[driftRight_15s_ease-in-out_infinite]" />
        <div className="absolute inset-0 backdrop-blur-[30px]" />
        <style jsx>{`
          @keyframes breathe {
            0%, 100% { filter: brightness(1) saturate(1); }
            50% { filter: brightness(1.1) saturate(1.2); }
          }
          @keyframes driftLeft {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-40px); }
          }
          @keyframes driftRight {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(40px); }
          }
        `}</style>
        {children}
      </div>
    )
  }

  // Image 6: OpenAI Microsoft - Blue gradient with orange accent
  if (variant === "openai-microsoft") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl", className)} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-sky-300 to-blue-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(251,146,60,0.3),transparent)] animate-[orangeGlow_8s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_90%_at_30%_60%,rgba(56,189,248,0.5),transparent)] animate-[blueFlow_12s_ease-in-out_infinite]" />
        <div className="absolute inset-0 backdrop-blur-[40px]" />
        <style jsx>{`
          @keyframes orangeGlow {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.3); opacity: 0.5; }
          }
          @keyframes blueFlow {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-20px, 10px) scale(1.05); }
            50% { transform: translate(10px, -20px) scale(0.95); }
            75% { transform: translate(-10px, -10px) scale(1.02); }
          }
        `}</style>
        {children}
      </div>
    )
  }

  // Original variants with animations
  const baseGradients: Record<string, string> = {
    blue: "from-white via-cyan-50 to-sky-100",
    emerald: "from-white via-cyan-50 to-sky-100",
    violet: "from-white via-violet-50 to-sky-100",
    amber: "from-white via-orange-50 to-amber-100",
    rose: "from-white via-pink-50 to-sky-100",
  }
  const glowRadials: Record<string, string> = {
    blue: "bg-[radial-gradient(90%_90%_at_35%_45%,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.9)_20%,_rgba(88,175,255,0.55)_40%,_rgba(37,144,255,0.6)_65%,_rgba(24,119,242,0.75)_100%)]",
    emerald: "bg-[radial-gradient(90%_90%_at_40%_50%,_rgba(255,255,255,1)_0%,_rgba(219,254,255,0.9)_20%,_rgba(34,211,238,0.55)_40%,_rgba(6,182,212,0.6)_65%,_rgba(8,145,178,0.75)_100%)]",
    violet: "bg-[radial-gradient(90%_90%_at_30%_40%,_rgba(255,255,255,1)_0%,_rgba(243,232,255,0.9)_20%,_rgba(168,85,247,0.55)_40%,_rgba(147,51,234,0.6)_65%,_rgba(124,58,237,0.75)_100%)]",
    amber: "bg-[radial-gradient(90%_90%_at_45%_55%,_rgba(255,255,255,1)_0%,_rgba(255,237,213,0.9)_20%,_rgba(254,215,170,0.55)_40%,_rgba(253,186,116,0.6)_65%,_rgba(249,115,22,0.75)_100%)]",
    rose: "bg-[radial-gradient(90%_90%_at_35%_45%,_rgba(255,255,255,1)_0%,_rgba(254,226,226,0.9)_20%,_rgba(251,113,133,0.55)_40%,_rgba(244,63,94,0.6)_65%,_rgba(225,29,72,0.75)_100%)]",
  }
  const veilRadials: Record<string, string> = {
    blue: "bg-[radial-gradient(120%_140%_at_85%_35%,_rgba(244,114,182,0.65)_0%,_rgba(168,85,247,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(244,114,182,0)_78%)]",
    emerald: "bg-[radial-gradient(120%_140%_at_80%_40%,_rgba(125,211,252,0.65)_0%,_rgba(34,211,238,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(125,211,252,0)_78%)]",
    violet: "bg-[radial-gradient(120%_140%_at_90%_30%,_rgba(196,181,253,0.65)_0%,_rgba(124,58,237,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(196,181,253,0)_78%)]",
    amber: "bg-[radial-gradient(120%_140%_at_75%_45%,_rgba(254,215,170,0.65)_0%,_rgba(249,115,22,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(254,215,170,0)_78%)]",
    rose: "bg-[radial-gradient(120%_140%_at_85%_35%,_rgba(252,165,165,0.65)_0%,_rgba(244,63,94,0.45)_35%,_rgba(255,255,255,0.25)_56%,_rgba(252,165,165,0)_78%)]",
  }
  
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl", className)} aria-hidden>
      <div className={cn("absolute inset-0 bg-gradient-to-br", baseGradients[variant])} />
      <div className={cn("absolute inset-0 opacity-90 animate-[gradientShift_10s_ease-in-out_infinite_alternate] mix-blend-screen", glowRadials[variant])} />
      <div className="absolute -right-10 -top-10 h-[70%] w-[65%] rounded-[48px] blur-[46px] bg-[radial-gradient(60%_60%_at_50%_50%,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0.55)_40%,_rgba(255,255,255,0)_100%)]" />
      <div className={cn("absolute right-[-8%] top-[-10%] h-[140%] w-[78%] rounded-[56px] blur-[36px] opacity-85 animate-[pinkShift_10s_ease-in-out_infinite_alternate]", veilRadials[variant])} />
      <div className="absolute right-[-10%] top-[-15%] h-[150%] w-[70%] blur-[28px] opacity-80 bg-[radial-gradient(140%_120%_at_100%_20%,_rgba(255,255,255,0.95)_0%,_rgba(255,255,255,0.7)_30%,_rgba(255,255,255,0.25)_58%,_rgba(255,255,255,0)_78%)]" />

      <style jsx>{`
        @keyframes gradientShift {
          0% { transform: translate3d(0,0,0) scale(1); filter: hue-rotate(0deg); }
          100% { transform: translate3d(-3.5%, -2%, 0) scale(1.04); filter: hue-rotate(8deg); }
        }
        @keyframes pinkShift {
          0% { transform: translateX(0) rotate(8deg); }
          100% { transform: translateX(-5%) rotate(8deg); }
        }
      `}</style>
      {children}
    </div>
  )
}