"use client"

import { useEffect, useState } from 'react'

export default function GalaxyShadcn() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Generate spiral galaxy points
  const generateGalaxyPoints = () => {
    const points = []
    const arms = 3 // Number of spiral arms
    const pointsPerArm = 200

    for (let arm = 0; arm < arms; arm++) {
      const armAngle = (arm * 2 * Math.PI) / arms

      for (let i = 0; i < pointsPerArm; i++) {
        const distance = (i / pointsPerArm) * 150
        const angle = armAngle + (i / pointsPerArm) * Math.PI * 2
        const spread = distance * 0.3

        // Add some randomness for natural look
        const randomSpread = (Math.random() - 0.5) * spread
        const randomDistance = distance + (Math.random() - 0.5) * 10

        const x = 200 + Math.cos(angle) * randomDistance + randomSpread * Math.cos(angle + Math.PI/2)
        const y = 150 + Math.sin(angle) * randomDistance + randomSpread * Math.sin(angle + Math.PI/2)

        // Size and opacity based on distance from center
        const size = Math.max(0.3, 2 - distance / 100)
        const opacity = Math.max(0.2, 1 - distance / 200)

        points.push({ x, y, size, opacity, delay: Math.random() * 3 })
      }
    }

    // Add central bulge
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 20
      const x = 200 + Math.cos(angle) * distance
      const y = 150 + Math.sin(angle) * distance
      points.push({
        x,
        y,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        delay: Math.random() * 3
      })
    }

    return points
  }

  const galaxyPoints = generateGalaxyPoints()

  return (
    <div className="relative w-full h-full bg-slate-950 dark:bg-black overflow-hidden">
      {/* Dark space background */}
      <div className="absolute inset-0 bg-gradient-radial from-slate-900 via-slate-950 to-black" />

      {/* SVG Spiral Galaxy */}
      <svg
        className="absolute inset-0 w-full h-full animate-spin-slow"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Central bright core */}
          <radialGradient id="galaxy-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Central galactic bulge */}
        <ellipse
          cx="200"
          cy="150"
          rx="25"
          ry="20"
          fill="url(#galaxy-core)"
          filter="url(#glow)"
        />

        {/* Generate spiral galaxy stars */}
        {galaxyPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill={i < 600 ? "#e0e7ff" : "#fef3c7"}
            opacity={point.opacity}
            filter={point.size > 1 ? "url(#blur)" : ""}
          >
            {point.size > 0.5 && (
              <animate
                attributeName="opacity"
                values={`${point.opacity};${point.opacity * 1.3};${point.opacity}`}
                dur={`${3 + point.delay}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </svg>

      {/* Ambient dust clouds */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
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
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 30s linear infinite;
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}