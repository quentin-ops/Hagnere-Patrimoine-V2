"use client"

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Euro, Home, Building2, HomeIcon, Key, HousePlus, Castle } from 'lucide-react'

interface PropertyData {
  title: string
  location: string
  description: string
  image: string
  type: string
  surface: string
  price: string
  yield: {
    gross: string
    net: string
  }
  badge?: string
  icon: React.ComponentType<{ className?: string }>
}

const properties: PropertyData[] = [
  {
    title: "Le T2 de Aymen",
    location: "Seloncourt (25)",
    description: "T2 rénové récemment avec goût",
    image: "/property-1.jpg",
    type: "T2",
    surface: "41 m²",
    price: "83 985 €",
    yield: {
      gross: "8.72%",
      net: "6.86%"
    },
    badge: "Projet livré",
    icon: Home
  },
  {
    title: "L'immeuble de Jérôme",
    location: "Beaucourt",
    description: "Immeuble à 10 min de la frontière Suisse",
    image: "/property-2.jpg",
    type: "Immeuble",
    surface: "300 m²",
    price: "523 125 €",
    yield: {
      gross: "9.86%",
      net: "8.50%"
    },
    badge: "Projet livré",
    icon: Building2
  },
  {
    title: "Le T2 de Amandine",
    location: "Belfort (90)",
    description: "T2 lumineux proche du centre-ville",
    image: "/property-3.jpg",
    type: "T2",
    surface: "45 m²",
    price: "78 250 €",
    yield: {
      gross: "8.66%",
      net: "6.90%"
    },
    badge: "Projet livré",
    icon: HomeIcon
  },
  {
    title: "Le T3 de Sophie",
    location: "Montbéliard (25)",
    description: "T3 avec balcon et parking",
    image: "/property-4.jpg",
    type: "T3",
    surface: "65 m²",
    price: "125 000 €",
    yield: {
      gross: "7.80%",
      net: "6.20%"
    },
    badge: "Projet livré",
    icon: HousePlus
  },
  {
    title: "Le Studio de Marc",
    location: "Belfort (90)",
    description: "Studio étudiant proche université",
    image: "/property-5.jpg",
    type: "Studio",
    surface: "25 m²",
    price: "55 000 €",
    yield: {
      gross: "9.20%",
      net: "7.10%"
    },
    badge: "Projet livré",
    icon: Key
  },
  {
    title: "Le T2 de Marie",
    location: "Héricourt (70)",
    description: "T2 rénové centre-ville",
    image: "/property-6.jpg",
    type: "T2",
    surface: "48 m²",
    price: "95 000 €",
    yield: {
      gross: "8.40%",
      net: "6.70%"
    },
    badge: "Projet livré",
    icon: Castle
  }
]

export function PropertySlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number>()
  const isSlowedRef = useRef(false)

  useEffect(() => {
    const animate = () => {
      const speed = isSlowedRef.current ? 0.05 : 0.25
      setRotation((prev) => (prev - speed + 360) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const totalCards = properties.length
  const anglePerCard = 360 / totalCards
  const radius = 520

  return (
    <div
      className="relative w-full h-[340px] overflow-x-hidden overflow-y-visible py-8"
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
          {properties.map((property, index) => {
            const currentAngle = (index * anglePerCard + rotation) % 360
            const angleInRadians = (currentAngle * Math.PI) / 180
            const z = Math.cos(angleInRadians) * radius
            const x = Math.sin(angleInRadians) * radius

            const opacity = Math.max(0.4, (z + radius) / (radius * 2))
            const scale = Math.max(0.85, 0.85 + ((z + radius) / (radius * 2) - 0.5) * 0.3)

            return (
              <PropertyCard3D
                key={index}
                property={property}
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
                  transition: 'all 0.1s linear'
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function PropertyCard3D({
  property,
  style,
  index
}: {
  property: PropertyData
  style: React.CSSProperties
  index?: number
}) {
  return (
    <div
      className="card-3d"
      style={style}
    >
      <div className="w-[280px] rounded-xl overflow-hidden bg-zinc-950 dark:bg-white ring-1 ring-zinc-900 dark:ring-gray-200 shadow-lg hover:shadow-xl hover:ring-2 hover:ring-white dark:hover:ring-zinc-900 transition-all duration-200">
        <div className="relative h-[140px] bg-zinc-950 dark:bg-white">
          {property.badge && (
            <Badge className="absolute top-2 left-2 z-10 bg-black/80 text-white border-0 text-xs">
              {property.badge}
            </Badge>
          )}
          <Badge className="absolute top-2 right-2 z-10 bg-white/90 text-black border-0 text-xs">
            Net {property.yield.net}
          </Badge>

          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Light mode - blue blobs */}
            <span className={`dark:hidden absolute top-[20%] left-[30%] h-[80px] w-[80px] rounded-full ${
              (index || 0) % 4 === 0 ? 'animate-blobFloat1' :
              (index || 0) % 4 === 1 ? 'animate-blobFloat2' :
              (index || 0) % 4 === 2 ? 'animate-blobFloat3' :
              'animate-blobFloat4'
            }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.9) 0%, rgba(30, 58, 138, 0.6) 30%, rgba(30, 58, 138, 0.3) 60%, transparent 100%)',
                filter: 'blur(35px)',
                animationDelay: `${(index || 0) * 0.3}s`
              }} />

            <span className={`dark:hidden absolute bottom-[20%] right-[30%] h-[70px] w-[70px] rounded-full ${
              (index || 0) % 4 === 0 ? 'animate-blobFloat3' :
              (index || 0) % 4 === 1 ? 'animate-blobFloat4' :
              (index || 0) % 4 === 2 ? 'animate-blobFloat1' :
              'animate-blobFloat2'
            }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(30, 58, 138, 0.8) 0%, rgba(30, 58, 138, 0.5) 30%, rgba(30, 58, 138, 0.25) 60%, transparent 100%)',
                filter: 'blur(35px)',
                animationDelay: `${(index || 0) * 0.5 + 1}s`
              }} />

            {/* Dark mode - blue blobs */}
            <span className={`hidden dark:block absolute top-[20%] left-[30%] h-[80px] w-[80px] rounded-full ${
              (index || 0) % 4 === 0 ? 'animate-blobFloat1' :
              (index || 0) % 4 === 1 ? 'animate-blobFloat2' :
              (index || 0) % 4 === 2 ? 'animate-blobFloat3' :
              'animate-blobFloat4'
            }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.7) 0%, rgba(56, 189, 248, 0.4) 30%, rgba(56, 189, 248, 0.2) 60%, transparent 100%)',
                filter: 'blur(35px)',
                animationDelay: `${(index || 0) * 0.3}s`
              }} />

            <span className={`hidden dark:block absolute bottom-[20%] right-[30%] h-[70px] w-[70px] rounded-full ${
              (index || 0) % 4 === 0 ? 'animate-blobFloat3' :
              (index || 0) % 4 === 1 ? 'animate-blobFloat4' :
              (index || 0) % 4 === 2 ? 'animate-blobFloat1' :
              'animate-blobFloat2'
            }`}
              style={{
                background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.6) 0%, rgba(56, 189, 248, 0.35) 30%, rgba(56, 189, 248, 0.15) 60%, transparent 100%)',
                filter: 'blur(35px)',
                animationDelay: `${(index || 0) * 0.5 + 1}s`
              }} />
          </div>

          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <property.icon
              className="w-16 h-16 text-white dark:text-zinc-900 relative z-10"
              style={{ strokeWidth: 1.5 }}
            />
          </div>
        </div>

        <div className="p-3 space-y-2 bg-background/95">
          <div>
            <h3 className="font-semibold text-sm line-clamp-1">
              {property.title} - {property.location}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {property.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Home className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{property.type}</span>
              <span className="text-muted-foreground">• {property.surface}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{property.yield.gross}</span>
              <span className="text-muted-foreground">Brut</span>
            </div>
          </div>

          <div className="pt-2 border-t flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Euro className="h-3 w-3 text-muted-foreground" />
              <span className="font-semibold text-sm">{property.price}</span>
            </div>
            <span className="text-xs text-muted-foreground">Prix revient</span>
          </div>
        </div>
      </div>
    </div>
  )
}