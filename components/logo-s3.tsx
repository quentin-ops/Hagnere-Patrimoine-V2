"use client"

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { LOGO_PATRIMOINE_BLACK, LOGO_PATRIMOINE_WHITE, LOGO_ELITE_LIGHT, LOGO_ELITE_DARK } from '@/lib/logo-config'

interface LogoProps {
  type?: 'patrimoine' | 'elite'
  size?: number
  className?: string
}

export function S3Logo({ type = 'patrimoine', size = 200, className = '' }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`h-[${size / 4}px] w-[${size}px] ${className}`} />
  }

  const isDark = resolvedTheme === 'dark'
  
  let logoUrl: string
  let alt: string
  
  if (type === 'patrimoine') {
    logoUrl = isDark ? LOGO_PATRIMOINE_WHITE : LOGO_PATRIMOINE_BLACK
    alt = "Hagnéré Patrimoine"
  } else {
    logoUrl = isDark ? LOGO_ELITE_DARK : LOGO_ELITE_LIGHT
    alt = "Hagnéré Elite"
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size / 4 }}>
      <Image
        src={logoUrl}
        alt={alt}
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}

export function HeaderLogoS3({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`h-6 w-24 ${className}`} />
  }

  const isDark = resolvedTheme === 'dark'
  const logoUrl = isDark ? LOGO_PATRIMOINE_WHITE : LOGO_PATRIMOINE_BLACK

  return (
    <div className={`relative h-6 w-24 ${className}`}>
      <Image
        src={logoUrl}
        alt="Hagnéré Patrimoine"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
}