'use client'

import { useEffect, useState } from 'react'
import { Gem, Sparkle, Star, Sparkles } from 'lucide-react'

interface FallingDiamond {
  id: number
  x: number
  y: number
  rotation: number
  speed: number
  opacity: number
  size: number
  delay: number
  icon: 'gem' | 'sparkles' | 'sparkle' | 'star'
}

export function DiamondRain() {
  const [diamonds, setDiamonds] = useState<FallingDiamond[]>([])

  useEffect(() => {
    const initialDiamonds: FallingDiamond[] = []
    const diamondCount = 30

    for (let i = 0; i < diamondCount; i++) {
      // 50% gem, 30% sparkles, 15% sparkle, 5% star
      const randomIcon = Math.random()
      let icon: 'gem' | 'sparkles' | 'sparkle' | 'star'
      if (randomIcon < 0.50) {
        icon = 'gem'
      } else if (randomIcon < 0.80) {
        icon = 'sparkles'
      } else if (randomIcon < 0.95) {
        icon = 'sparkle'
      } else {
        icon = 'star'
      }

      initialDiamonds.push({
        id: i,
        x: 65 + Math.random() * 33, // Right side of container (65-98%)
        y: -100 - Math.random() * 600, // Start well offscreen at different heights
        rotation: Math.random() * 360,
        speed: 6 + Math.random() * 10, // 6-16s fall duration (faster)
        opacity: 0.2 + Math.random() * 0.5, // 0.2-0.7 opacity
        size: 14 + Math.random() * 18, // 14-32px size
        delay: Math.random() * 5, // 0-5s delay (more frequent)
        icon
      })
    }

    setDiamonds(initialDiamonds)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {diamonds.map((diamond) => (
        <div
          key={diamond.id}
          className="absolute animate-fall"
          style={{
            left: `${diamond.x}%`,
            top: `${diamond.y}px`,
            animationDuration: `${diamond.speed}s`,
            animationDelay: `${diamond.delay}s`,
            opacity: diamond.opacity,
          }}
        >
          <div
            className="animate-spin-slow"
            style={{
              animationDuration: '8s',
            }}
          >
            <div className="relative">
              {/* Blue halo behind icon */}
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.5) 40%, rgba(59, 130, 246, 0.3) 60%, transparent 100%)',
                  transform: 'scale(3)',
                }}
              />
              {diamond.icon === 'gem' ? (
                <Gem
                  size={diamond.size}
                  className="text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] relative z-10"
                  strokeWidth={1.5}
                />
              ) : diamond.icon === 'sparkles' ? (
                <Sparkles
                  size={diamond.size}
                  className="text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] relative z-10"
                  strokeWidth={1.5}
                />
              ) : diamond.icon === 'sparkle' ? (
                <Sparkle
                  size={diamond.size}
                  className="text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] relative z-10"
                  strokeWidth={1.5}
                />
              ) : (
                <Star
                  size={diamond.size}
                  className="text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] relative z-10"
                  strokeWidth={1.5}
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(35vh) translateX(5px);
          }
          50% {
            transform: translateY(60vh) translateX(-3px);
          }
          75% {
            transform: translateY(85vh) translateX(2px);
          }
          100% {
            transform: translateY(120vh) translateX(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </div>
  )
}