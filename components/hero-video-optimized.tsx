"use client"

import { useState, useRef, useEffect } from 'react'
import { PlayCircle } from 'lucide-react'
import Image from 'next/image'

interface HeroVideoProps {
  videoUrls: {
    webm?: string
    mp4: string
    mobile?: string
  }
  posterUrl: string
  posterWebpUrl?: string
  fallbackContent?: React.ReactNode
  className?: string
  overlay?: boolean
}

export function HeroVideoOptimized({
  videoUrls,
  posterUrl,
  posterWebpUrl,
  fallbackContent,
  className = '',
  overlay = true
}: HeroVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Détecter si on est sur mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intersection Observer pour lazy loading
  useEffect(() => {
    if (hasError) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isLoaded, hasError])

  // Charger la vidéo quand visible
  useEffect(() => {
    if (!isVisible || !videoRef.current || isLoaded) return

    const video = videoRef.current

    // Ajouter les sources dynamiquement
    const sources = video.querySelectorAll('source')
    sources.forEach(source => {
      const src = source.dataset.src
      if (src) {
        source.src = src
      }
    })

    // Charger la vidéo
    video.load()

    // Gérer les événements
    const handleCanPlay = () => {
      setIsLoaded(true)
      video.play().catch(err => {
        console.warn('Autoplay bloqué:', err)
        // Certains navigateurs bloquent l'autoplay
        // On peut essayer de jouer au premier clic/touch
      })
    }

    const handleError = () => {
      console.error('Erreur chargement vidéo')
      setHasError(true)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [isVisible, isLoaded])

  // Si erreur, afficher le fallback
  if (hasError && fallbackContent) {
    return <>{fallbackContent}</>
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Poster image (toujours visible au début) */}
      {!isLoaded && (
        <div className="absolute inset-0">
          {posterWebpUrl ? (
            <picture>
              <source srcSet={posterWebpUrl} type="image/webp" />
              <img
                src={posterUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="eager"
              />
            </picture>
          ) : (
            <img
              src={posterUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
          )}
          
          {/* Indicateur de chargement */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircle className="h-16 w-16 text-white/50 animate-pulse" />
          </div>
        </div>
      )}

      {/* Vidéo */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-1000`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={posterUrl}
      >
        {/* WebM pour les navigateurs modernes */}
        {videoUrls.webm && (
          <source 
            data-src={videoUrls.webm}
            type="video/webm"
          />
        )}
        
        {/* Version mobile si disponible */}
        {isMobile && videoUrls.mobile && (
          <source 
            data-src={videoUrls.mobile}
            type="video/mp4"
          />
        )}
        
        {/* MP4 fallback */}
        <source 
          data-src={isMobile && videoUrls.mobile ? videoUrls.mobile : videoUrls.mp4}
          type="video/mp4"
        />

        {/* Message fallback si vidéo pas supportée */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/50">Votre navigateur ne supporte pas la vidéo HTML5</p>
        </div>
      </video>

      {/* Overlay gradient optionnel */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  )
}

// Hook personnalisé pour précharger les vidéos
export function usePreloadVideo(urls: string[]) {
  useEffect(() => {
    // Précharger seulement après que la page principale soit chargée
    if (typeof window === 'undefined') return

    const preload = () => {
      urls.forEach(url => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'video'
        link.href = url
        document.head.appendChild(link)
      })
    }

    // Attendre que la page soit idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preload)
    } else {
      setTimeout(preload, 2000)
    }
  }, [urls])
}

// Composant pour tester la connexion et choisir la qualité
export function AdaptiveHeroVideo(props: HeroVideoProps) {
  const [quality, setQuality] = useState<'high' | 'low'>('high')

  useEffect(() => {
    // Tester la vitesse de connexion
    if ('connection' in navigator) {
      const conn = (navigator as any).connection
      const effectiveType = conn?.effectiveType

      // Si connexion lente, utiliser la version mobile
      if (effectiveType === '2g' || effectiveType === 'slow-2g') {
        setQuality('low')
      }
    }
  }, [])

  // Adapter les URLs selon la qualité
  const adaptedVideoUrls = quality === 'low' && props.videoUrls.mobile
    ? { mp4: props.videoUrls.mobile }
    : props.videoUrls

  return <HeroVideoOptimized {...props} videoUrls={adaptedVideoUrls} />
}
