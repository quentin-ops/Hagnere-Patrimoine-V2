"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import {
  Calculator,
  TrendingUp,
  Shield,
  Briefcase,
  LineChart,
  Globe,
  PiggyBank,
  Heart,
  Crown,
  Building2,
  Scale,
  Gift,
} from "lucide-react"
import Autoplay from "embla-carousel-autoplay"

interface ServiceData {
  title: string
  description: string
  icon: React.ElementType
  gradient: string
}

const services: ServiceData[] = [
  {
    title: "Défiscalisation",
    description: "Optimisez votre fiscalité avec nos solutions sur-mesure",
    icon: Calculator,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Investissement",
    description: "Développez votre patrimoine avec nos stratégies performantes",
    icon: TrendingUp,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Protection",
    description: "Sécurisez votre avenir et celui de vos proches",
    icon: Shield,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Gestion Privée",
    description: "Bénéficiez d'un accompagnement personnalisé",
    icon: Briefcase,
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Épargne",
    description: "Constituez un capital pour vos projets futurs",
    icon: PiggyBank,
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    title: "Immobilier",
    description: "Investissez dans la pierre avec expertise",
    icon: Building2,
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    title: "Retraite",
    description: "Préparez sereinement votre retraite",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    title: "Transmission",
    description: "Organisez la transmission de votre patrimoine",
    icon: Gift,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "International",
    description: "Diversifiez à l'international",
    icon: Globe,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Elite Services",
    description: "Services exclusifs pour grandes fortunes",
    icon: Crown,
    gradient: "from-gray-700 to-gray-900",
  },
  {
    title: "Analyse",
    description: "Audit complet de votre situation patrimoniale",
    icon: LineChart,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Juridique",
    description: "Conseil juridique et fiscal expert",
    icon: Scale,
    gradient: "from-red-500 to-rose-600",
  },
]

export function ServicesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  return (
    <div className="w-full py-4 relative">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4 items-stretch">
          {services.map((service, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 pb-6">
              <div className="w-full h-full flex flex-col rounded-xl overflow-hidden bg-black dark:bg-zinc-900 border border-zinc-800 transition-all duration-300">
                {/* Zone image avec fond noir et icône */}
                <div className="relative h-[100px] flex-shrink-0 bg-zinc-950 dark:bg-zinc-900">
                  {/* Animated background blobs */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Light mode - blue blobs */}
                    <span className={`dark:hidden absolute top-[20%] left-[30%] h-[80px] w-[80px] rounded-full ${
                      index % 4 === 0 ? 'animate-blobFloat1' :
                      index % 4 === 1 ? 'animate-blobFloat2' :
                      index % 4 === 2 ? 'animate-blobFloat3' :
                      'animate-blobFloat4'
                    }`}
                      style={{
                        background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.6) 30%, rgba(30, 58, 138, 0.3) 60%, transparent 100%)',
                        filter: 'blur(35px)',
                        animationDelay: `${index * 0.3}s`
                      }} />

                    {/* Dark mode - white blobs */}
                    <span className={`hidden dark:block absolute top-[20%] left-[30%] h-[80px] w-[80px] rounded-full ${
                      index % 4 === 0 ? 'animate-blobFloat1' :
                      index % 4 === 1 ? 'animate-blobFloat2' :
                      index % 4 === 2 ? 'animate-blobFloat3' :
                      'animate-blobFloat4'
                    }`}
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)',
                        filter: 'blur(30px)',
                        animationDelay: `${index * 0.3}s`
                      }} />
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Zone texte */}
                <div className="p-4 bg-black dark:bg-zinc-900 flex-grow flex flex-col">
                  <h3 className="text-sm font-semibold mb-1 text-white">{service.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}