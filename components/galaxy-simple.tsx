"use client"

import Lottie from 'lottie-react'
import galaxyAnimation from '@/public/animations/galaxy-modal.json'

export default function GalaxySimple() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Étoiles en dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      <Lottie
        animationData={galaxyAnimation}
        loop={true}
        className="w-full h-full max-w-md max-h-md dark:invert dark:brightness-150"
      />
    </div>
  )
}

// Version CSS de secours si besoin
function GalaxyCSS() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-black overflow-hidden">
      {/* Animated galaxy core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Central bright core */}
          <div className="w-24 h-24 bg-white rounded-full blur-2xl opacity-80 animate-pulse" />

          {/* Rotating spiral arms */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Arm 1 */}
              <div className="absolute w-48 h-1 bg-gradient-to-r from-blue-400/60 via-blue-300/30 to-transparent blur-sm"
                style={{ transform: 'rotate(0deg) translateX(30px)' }} />
              {/* Arm 2 */}
              <div className="absolute w-48 h-1 bg-gradient-to-r from-purple-400/60 via-purple-300/30 to-transparent blur-sm"
                style={{ transform: 'rotate(120deg) translateX(30px)' }} />
              {/* Arm 3 */}
              <div className="absolute w-48 h-1 bg-gradient-to-r from-indigo-400/60 via-indigo-300/30 to-transparent blur-sm"
                style={{ transform: 'rotate(240deg) translateX(30px)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Static stars */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-20 right-32 w-0.5 h-0.5 bg-white rounded-full opacity-80" />
        <div className="absolute bottom-32 left-40 w-1 h-1 bg-white rounded-full opacity-70" />
        <div className="absolute top-40 right-20 w-0.5 h-0.5 bg-white rounded-full opacity-50" />
        <div className="absolute bottom-20 right-40 w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-1/3 left-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-70" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-80" />
        <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
      </div>

      {/* Nebula clouds */}
      <div className="absolute top-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

      {/* Animated particles */}
      <div className="absolute top-1/4 left-1/3 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  )
}