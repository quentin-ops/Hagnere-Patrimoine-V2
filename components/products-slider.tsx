"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BlueVeilOverlay } from "@/components/blue-veil-overlay"
import {
  Home,
  PiggyBank,
  Building2,
  Gift,
  Shield,
  TrendingDown,
  Landmark,
  FileText,
  Briefcase,
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

// Liste des produits par catégorie
const products = [
  // Défiscalisation
  { category: "Défiscalisation", name: "Déficit foncier", color: "bg-blue-500", icon: TrendingDown },
  { category: "Défiscalisation", name: "Denormandie", color: "bg-blue-500", icon: Home },
  { category: "Défiscalisation", name: "Pinel", color: "bg-blue-500", icon: Building2 },
  { category: "Défiscalisation", name: "Malraux", color: "bg-blue-500", icon: Landmark },
  { category: "Défiscalisation", name: "Monument historique", color: "bg-blue-500", icon: Landmark },

  // Épargne & Retraite
  { category: "Épargne & Retraite", name: "PER", color: "bg-green-500", icon: PiggyBank },
  { category: "Épargne & Retraite", name: "Assurance-vie", color: "bg-green-500", icon: Heart },
  { category: "Épargne & Retraite", name: "Contrat de capitalisation", color: "bg-green-500", icon: Briefcase },
  { category: "Épargne & Retraite", name: "PEA", color: "bg-green-500", icon: FileText },
  { category: "Épargne & Retraite", name: "Compte-titres", color: "bg-green-500", icon: FileText },

  // Immobilier
  { category: "Immobilier", name: "SCPI", color: "bg-purple-500", icon: Building2 },
  { category: "Immobilier", name: "LMNP", color: "bg-purple-500", icon: Home },
  { category: "Immobilier", name: "Location meublée", color: "bg-purple-500", icon: Home },
  { category: "Immobilier", name: "Nue-propriété", color: "bg-purple-500", icon: Building2 },
  { category: "Immobilier", name: "SCI", color: "bg-purple-500", icon: Briefcase },

  // Transmission
  { category: "Transmission", name: "Donation", color: "bg-orange-500", icon: Gift },
  { category: "Transmission", name: "Démembrement", color: "bg-orange-500", icon: Gift },
  { category: "Transmission", name: "Pacte Dutreil", color: "bg-orange-500", icon: FileText },
  { category: "Transmission", name: "Trust", color: "bg-orange-500", icon: Shield },
  { category: "Transmission", name: "Holding patrimoniale", color: "bg-orange-500", icon: Briefcase },

  // Financement
  {
    category: "Financement",
    name: "Regroupement de crédits",
    color: "bg-indigo-500",
    icon: TrendingDown,
    image: "https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758545189278-082efa16126307d1.webp"
  },

  // Protection
  { category: "Protection", name: "Prévoyance", color: "bg-red-500", icon: Shield },
  { category: "Protection", name: "Assurance décès", color: "bg-red-500", icon: Shield },
  { category: "Protection", name: "GAV", color: "bg-red-500", icon: Shield },
  { category: "Protection", name: "Assurance emprunteur", color: "bg-red-500", icon: Shield },
]

export function ProductsSlider() {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = React.useState(false)
  const scrollPositionRef = React.useRef(0)

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = 180 + 16 // card width + gap
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      const newPosition = Math.min(maxScroll, scrollRef.current.scrollLeft + cardWidth * 3)
      scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
      scrollPositionRef.current = newPosition
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 1000)
    }
  }

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = 180 + 16 // card width + gap
      const newPosition = Math.max(0, scrollRef.current.scrollLeft - cardWidth * 3)
      scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' })
      scrollPositionRef.current = newPosition
      setIsPaused(true)
      setTimeout(() => setIsPaused(false), 1000)
    }
  }

  React.useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Initialize scroll position to the middle on first load
    if (scrollPositionRef.current === 0) {
      scrollPositionRef.current = scrollContainer.scrollWidth / 2
      scrollContainer.scrollLeft = scrollPositionRef.current
    }

    let animationId: number

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPositionRef.current -= 1

        // Reset scroll when reaching the beginning (for infinite loop effect)
        if (scrollPositionRef.current <= 0) {
          scrollPositionRef.current = scrollContainer.scrollWidth / 2
        }

        scrollContainer.scrollLeft = scrollPositionRef.current
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPaused])

  // Duplicate products for infinite scroll effect
  const duplicatedProducts = [...products, ...products]

  return (
    <div className="relative w-full">
      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        onClick={handleScrollLeft}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
        onClick={handleScrollRight}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden py-8 px-2"
        onMouseEnter={() => {
          if (scrollRef.current) {
            scrollPositionRef.current = scrollRef.current.scrollLeft
          }
          setIsPaused(true)
        }}
        onMouseLeave={() => {
          if (scrollRef.current) {
            scrollPositionRef.current = scrollRef.current.scrollLeft
          }
          setIsPaused(false)
        }}
      >
        {duplicatedProducts.map((product, index) => {
          const Icon = product.icon
          return (
            <div
              key={`${product.name}-${index}`}
              className={cn(
                "relative flex-shrink-0 w-[180px] h-[180px] rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer hover:scale-105 bg-white"
              )}
            >
              <BlueVeilOverlay
                variant={
                  product.category === "Défiscalisation"
                    ? "stargate"
                    : product.category === "Épargne & Retraite"
                    ? "openai-grove"
                    : product.category === "Immobilier"
                    ? "privacy-gradient"
                    : product.category === "Transmission"
                    ? "age-prediction"
                    : product.category === "Protection"
                    ? "teen-safety"
                    : "openai-microsoft"
                }
              />
              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-4 text-black space-y-3">
                {/* Icon */}
                <Icon className="h-10 w-10" />

                {/* Badge */}
                <Badge className="bg-black/80 text-white text-xs">
                  {product.category}
                </Badge>

                {/* Title */}
                <h3 className="font-semibold text-sm text-center text-black">
                  {product.name}
                </h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}