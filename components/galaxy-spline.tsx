"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(
  () => import('@splinetool/react-spline/next'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-100 dark:bg-slate-900 animate-pulse" />
  }
)

export default function GalaxySpline() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (hasError) {
    // Fallback to CSS animated galaxy if Spline fails
    return <GalaxyCSS />
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-slate-400 animate-pulse">Initialisation...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative bg-slate-50 dark:bg-slate-900">
      <Spline
        scene="https://prod.spline.design/LDeMhZrKVmmQjd-6/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
        onLoad={() => console.log('Spline loaded')}
        onError={(e) => {
          console.error('Spline error:', e)
          setHasError(true)
        }}
      />
    </div>
  )
}

// CSS Fallback Galaxy
function GalaxyCSS() {
  return (
    <div className="w-full h-full relative bg-slate-950 overflow-hidden">
      {/* Central bright core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-3xl opacity-60 animate-pulse" />

      {/* Spiral arms */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '60s' }}>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
          {/* Arm 1 */}
          <div className="absolute top-0 left-1/2 w-2 h-48 bg-gradient-to-b from-blue-400/40 to-transparent blur-sm rotate-0 origin-bottom" />
          {/* Arm 2 */}
          <div className="absolute top-0 left-1/2 w-2 h-48 bg-gradient-to-b from-purple-400/40 to-transparent blur-sm rotate-[120deg] origin-bottom" />
          {/* Arm 3 */}
          <div className="absolute top-0 left-1/2 w-2 h-48 bg-gradient-to-b from-indigo-400/40 to-transparent blur-sm rotate-[240deg] origin-bottom" />
        </div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Nebula clouds */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
    </div>
  )
}