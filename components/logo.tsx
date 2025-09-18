'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LOGOS } from '@/lib/logos-config'

interface LogoProps {
  variant?: 'elite-light' | 'elite-dark' | 'patrimoine-black' | 'patrimoine-white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  priority?: boolean
  responsive?: boolean
}

const sizeMap = {
  sm: { width: 100, height: 30 },
  md: { width: 200, height: 60 },
  lg: { width: 300, height: 90 },
  xl: { width: 400, height: 120 }
}

export function Logo({ 
  variant = 'elite-light',
  size = 'md',
  className,
  priority = false,
  responsive = false
}: LogoProps) {
  const logoConfig = {
    'elite-light': LOGOS.hagnereEliteLight,
    'elite-dark': LOGOS.hagnereEliteDark,
    'patrimoine-black': LOGOS.patrimoineBlack,
    'patrimoine-white': LOGOS.hagnerePatrimoineWhite
  }[variant]

  const dimensions = sizeMap[size]

  if (!logoConfig.url) {
    return (
      <div 
        className={cn(
          "bg-muted rounded flex items-center justify-center text-muted-foreground text-xs",
          className
        )}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        Logo
      </div>
    )
  }

  if (responsive) {
    // Utiliser picture element pour images responsive
    return (
      <picture className={className}>
        {/* WebP pour navigateurs modernes */}
        {logoConfig.webpUrl && (
          <source 
            type="image/webp" 
            srcSet={`
              ${logoConfig.webpUrl400 || logoConfig.webpUrl} 400w,
              ${logoConfig.webpUrl200 || logoConfig.webpUrl} 200w,
              ${logoConfig.webpUrl100 || logoConfig.webpUrl} 100w
            `}
            sizes="(max-width: 640px) 100px, (max-width: 1024px) 200px, 400px"
          />
        )}
        {/* Fallback PNG */}
        <img
          src={logoConfig.url}
          alt={logoConfig.alt}
          width={dimensions.width}
          height={dimensions.height}
          className={cn("h-auto", className)}
          loading={priority ? "eager" : "lazy"}
        />
      </picture>
    )
  }

  return (
    <Image
      src={logoConfig.url}
      alt={logoConfig.alt}
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={cn("object-contain", className)}
    />
  )
}

// Hook pour utiliser le logo selon le thème
import { useTheme } from 'next-themes'

export function ThemedLogo({
  type = 'elite',
  size = 'md',
  className,
  priority
}: {
  type?: 'elite' | 'patrimoine'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  priority?: boolean
}) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark'
  
  const variant = type === 'elite' 
    ? (isDark ? 'elite-dark' : 'elite-light')
    : (isDark ? 'patrimoine-white' : 'patrimoine-black')

  return <Logo variant={variant} size={size} className={className} priority={priority} />
}

// Composant pour le header avec animation
export function HeaderLogo({ className }: { className?: string }) {
  return (
    <div className={cn("group", className)}>
      <ThemedLogo 
        type="elite" 
        size="md" 
        priority
        className="transition-transform duration-200 group-hover:scale-105" 
      />
    </div>
  )
}

// Composant pour le footer
export function FooterLogo({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Logo 
        variant="patrimoine-white" 
        size="lg"
        className="opacity-90 hover:opacity-100 transition-opacity" 
      />
      <p className="text-xs text-muted-foreground">
        © 2024 Hagnéré Patrimoine. Tous droits réservés.
      </p>
    </div>
  )
}
