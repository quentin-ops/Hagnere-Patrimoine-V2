"use client"

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoProps {
  type?: 'patrimoine' | 'elite'
  size?: number
  className?: string
}

export function LocalLogo({ type = 'patrimoine', size = 200, className = '' }: LogoProps) {
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
    logoUrl = isDark ? '/logos/logo-hagnere-patrimoine-white.png' : '/logos/logo-patrimoine-black-.png'
    alt = "Hagnéré Patrimoine"
  } else {
    logoUrl = isDark ? '/logos/logo-hagnere-elite-ldark.png' : '/logos/logo-hagnere-elite-light.png'
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

export function HeaderLogoLocal({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`h-8 w-auto ${className}`} />
  }

  const isDark = resolvedTheme === 'dark'
  const logoUrl = isDark ? '/logos/logo-hagnere-patrimoine-white.png' : '/logos/logo-patrimoine-black-.png'

  return (
    <Image
      src={logoUrl}
      alt="Hagnéré Patrimoine"
      width={128}
      height={32}
      className={`object-contain h-8 w-auto ${className}`}
      priority
    />
  )
}