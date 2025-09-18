'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// URLs S3 des logos uploadés
const LOGO_URLS = {
  black: 'https://hagnere-patrimoine.s3.eu-north-1.amazonaws.com/logos/logo-patrimoine-black-.png',
  white: 'https://hagnere-patrimoine.s3.eu-north-1.amazonaws.com/logos/logo-hagnere-patrimoine-white.png',
}

export function SimplePatrimoineLogo({ 
  className = '',
  size = 200 
}: { 
  className?: string
  size?: number 
}) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ width: size, height: size * 0.3 }} />
  }

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark'
  
  // Utiliser les URLs S3
  const logoSrc = isDark ? LOGO_URLS.white : LOGO_URLS.black

  return (
    <Image
      src={logoSrc}
      alt="Hagnéré Patrimoine"
      width={size}
      height={size * 0.3}
      priority
      className={className}
      unoptimized // Pour les images externes
    />
  )
}