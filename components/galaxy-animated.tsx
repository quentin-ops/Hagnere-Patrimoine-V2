"use client"

import { useEffect, useState } from 'react'

export default function GalaxyAnimated() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-white">
      {/* Animated galaxy background */}
      <div className="relative w-full h-full">
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />

        {/* Rotating spiral arms */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {/* Spiral arm 1 */}
            <div className="absolute top-1/2 left-1/2 w-64 h-2 bg-gradient-to-r from-blue-500/40 via-purple-500/30 to-transparent -translate-x-1/2 -translate-y-1/2 blur-sm rotate-0" />
            {/* Spiral arm 2 */}
            <div className="absolute top-1/2 left-1/2 w-64 h-2 bg-gradient-to-r from-purple-500/40 via-pink-500/30 to-transparent -translate-x-1/2 -translate-y-1/2 blur-sm rotate-120" />
            {/* Spiral arm 3 */}
            <div className="absolute top-1/2 left-1/2 w-64 h-2 bg-gradient-to-r from-indigo-500/40 via-blue-500/30 to-transparent -translate-x-1/2 -translate-y-1/2 blur-sm rotate-240" />
          </div>
        </div>

        {/* Particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}

        {/* Orbiting stars */}
        <div className="absolute inset-0 animate-spin-slower">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full"
              style={{
                left: `${50 + Math.cos((i / 20) * Math.PI * 2) * 40}%`,
                top: `${50 + Math.sin((i / 20) * Math.PI * 2) * 40}%`,
                opacity: Math.random() * 0.6 + 0.4,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slower {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 45s linear infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .rotate-120 {
          transform: rotate(120deg);
        }
        .rotate-240 {
          transform: rotate(240deg);
        }
      `}</style>
    </div>
  )
}