"use client"

import { useEffect, useRef, useState } from 'react'
import {
  Calculator,
  TrendingUp,
  Home,
  Shield,
  Clock,
  FileText,
  Wallet,
  CreditCard,
  Building2,
  Banknote,
  PiggyBank,
  Target
} from 'lucide-react'

interface ServiceData {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  highlights?: string[]
}

const services: ServiceData[] = [
  {
    title: "Défiscalisation",
    description: "Optimisez votre fiscalité avec des stratégies sur mesure pour réduire vos impôts légalement",
    icon: Calculator,
    highlights: ["Loi Pinel", "PER", "Girardin"]
  },
  {
    title: "Investissement",
    description: "Développez votre patrimoine avec des solutions d'investissement diversifiées et performantes",
    icon: TrendingUp,
    highlights: ["Actions", "Obligations", "SCPI"]
  },
  {
    title: "Immobilier",
    description: "Investissez dans l'immobilier locatif avec un accompagnement complet de A à Z",
    icon: Home,
    highlights: ["Locatif", "LMNP", "Pinel"]
  },
  {
    title: "Assurance",
    description: "Protégez votre famille et vos biens avec des solutions d'assurance adaptées",
    icon: Shield,
    highlights: ["Vie", "Prévoyance", "Habitation"]
  },
  {
    title: "Retraite",
    description: "Préparez sereinement votre retraite avec des solutions d'épargne performantes",
    icon: Clock,
    highlights: ["PER", "Madelin", "PERP"]
  },
  {
    title: "Succession",
    description: "Transmettez votre patrimoine en optimisant la fiscalité successorale",
    icon: FileText,
    highlights: ["Donation", "Testament", "Démembrement"]
  },
  {
    title: "Épargne",
    description: "Constituez une épargne solide avec des placements sécurisés et rentables",
    icon: Wallet,
    highlights: ["Livrets", "PEL", "Assurance vie"]
  },
  {
    title: "Financement",
    description: "Obtenez les meilleurs taux pour vos projets immobiliers et personnels",
    icon: CreditCard,
    highlights: ["Crédit immobilier", "Rachat", "Prêt personnel"]
  },
  {
    title: "Patrimoine",
    description: "Gérez et développez votre patrimoine global avec une vision à 360°",
    icon: Building2,
    highlights: ["Audit", "Stratégie", "Optimisation"]
  },
  {
    title: "Placements",
    description: "Diversifiez vos placements pour optimiser le couple rendement/risque",
    icon: Banknote,
    highlights: ["Bourse", "OPCVM", "Private Equity"]
  },
  {
    title: "Prévoyance",
    description: "Anticipez les aléas de la vie avec des solutions de prévoyance adaptées",
    icon: PiggyBank,
    highlights: ["Décès", "Invalidité", "Dépendance"]
  },
  {
    title: "Objectifs",
    description: "Définissez et atteignez vos objectifs patrimoniaux avec un plan personnalisé",
    icon: Target,
    highlights: ["Court terme", "Moyen terme", "Long terme"]
  }
]

export function ServicesSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef(0)
  const [, forceUpdate] = useState({})
  const animationRef = useRef<number>()
  const isSlowedRef = useRef(false)

  useEffect(() => {
    let lastTime = performance.now()
    let frameCount = 0

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67 // Normalize to 60 FPS
      lastTime = currentTime

      const speed = isSlowedRef.current ? 0.03 : 0.15
      rotationRef.current -= (speed * deltaTime)
      if (rotationRef.current < 0) {
        rotationRef.current += 360
      }

      // Only update state every 3 frames to reduce re-renders
      frameCount++
      if (frameCount % 3 === 0) {
        forceUpdate({})
        frameCount = 0
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const totalCards = services.length
  const anglePerCard = 360 / totalCards
  const radius = 420

  return (
    <div
      className="relative w-full h-64 overflow-x-hidden overflow-y-visible py-8"
      onMouseEnter={() => isSlowedRef.current = true}
      onMouseLeave={() => isSlowedRef.current = false}
    >
      <style jsx>{`
        .wheel-3d {
          transform-style: preserve-3d;
          perspective: 1500px;
        }

        .card-3d {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card via-card/80 via-50% to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card via-card/80 via-50% to-transparent z-20 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card/30 to-transparent z-10 pointer-events-none" />

      <div className="wheel-3d relative w-full h-full flex items-center justify-center">
        <div
          ref={containerRef}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            transformStyle: 'preserve-3d',
          }}
        >
          {services.map((service, index) => {
            const currentAngle = (index * anglePerCard + rotationRef.current) % 360
            const angleInRadians = (currentAngle * Math.PI) / 180
            const z = Math.cos(angleInRadians) * radius
            const x = Math.sin(angleInRadians) * radius

            const opacity = Math.max(0.3, (z + radius) / (radius * 2))
            const scale = Math.max(0.75, 0.75 + ((z + radius) / (radius * 2) - 0.5) * 0.5)

            return (
              <ServiceCard3D
                key={index}
                service={service}
                index={index}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `
                    translate(-50%, -50%)
                    translateX(${x}px)
                    translateZ(${z}px)
                    scale(${scale})
                  `,
                  opacity,
                  zIndex: Math.round(z + radius),
                  willChange: 'transform, opacity'
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ServiceCard3D({
  service,
  index,
  style
}: {
  service: ServiceData
  index: number
  style: React.CSSProperties
}) {
  return (
    <div
      className="card-3d"
      style={style}
    >
      <div className="w-[180px] rounded-xl overflow-hidden bg-background border shadow-lg hover:shadow-xl">
        {/* Zone image avec fond noir et icône */}
        <div className="relative h-[80px] bg-zinc-950 dark:bg-zinc-900">
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

            <span className={`dark:hidden absolute bottom-[20%] right-[30%] h-[70px] w-[70px] rounded-full ${
              index % 4 === 0 ? 'animate-blobFloat3' :
              index % 4 === 1 ? 'animate-blobFloat4' :
              index % 4 === 2 ? 'animate-blobFloat1' :
              'animate-blobFloat2'
            }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.8) 0%, rgba(30, 58, 138, 0.5) 30%, rgba(30, 58, 138, 0.25) 60%, transparent 100%)',
                filter: 'blur(35px)',
                animationDelay: `${index * 0.5 + 1}s`
              }} />

            {/* Dark mode - blue blobs */}
            <span className={`hidden dark:block absolute top-[20%] left-[30%] h-[80px] w-[80px] rounded-full ${
              index % 4 === 0 ? 'animate-blobFloat1' :
              index % 4 === 1 ? 'animate-blobFloat2' :
              index % 4 === 2 ? 'animate-blobFloat3' :
              'animate-blobFloat4'
            }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.7) 0%, rgba(56, 189, 248, 0.4) 30%, rgba(56, 189, 248, 0.2) 60%, transparent 100%)',
                filter: 'blur(35px)',
                animationDelay: `${index * 0.3}s`
              }} />

            <span className={`hidden dark:block absolute bottom-[20%] right-[30%] h-[70px] w-[70px] rounded-full ${
              index % 4 === 0 ? 'animate-blobFloat3' :
              index % 4 === 1 ? 'animate-blobFloat4' :
              index % 4 === 2 ? 'animate-blobFloat1' :
              'animate-blobFloat2'
            }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.6) 0%, rgba(56, 189, 248, 0.35) 30%, rgba(56, 189, 248, 0.15) 60%, transparent 100%)',
                filter: 'blur(35px)',
                animationDelay: `${index * 0.5 + 1}s`
              }} />
          </div>

          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <service.icon
              className="w-8 h-8 text-white relative z-10"
              style={{ strokeWidth: 1.5 }}
            />
          </div>
        </div>

        {/* Zone texte en blanc */}
        <div className="p-3 bg-white dark:bg-zinc-100">
          <h3 className="text-xs font-semibold text-zinc-900 mb-0.5">
            {service.title}
          </h3>
          <p className="text-[10px] text-zinc-600 line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  )
}