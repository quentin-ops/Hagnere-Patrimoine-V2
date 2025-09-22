"use client"

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  sizes?: string
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  sizes,
  fallbackSrc,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isWebPSupported, setIsWebPSupported] = useState(true)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const webP = new Image()
      webP.onload = webP.onerror = function () {
        setIsWebPSupported(webP.height === 2)
      }
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    }
    checkWebPSupport()
  }, [])

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    if (loading !== 'lazy' || !containerRef.current) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [loading])

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    // If WebP fails and we have a fallback, try the fallback
    if (currentSrc === src && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
    } else {
      onError?.()
    }
  }

  // Convert S3 URLs to WebP if needed
  const getOptimizedSrc = (originalSrc: string) => {
    // If it's already a WebP or if WebP is not supported, return original
    if (!isWebPSupported || originalSrc.includes('.webp')) {
      return originalSrc
    }

    // Convert PNG/JPG URLs to WebP for S3 hosted images
    if (originalSrc.includes('hagnerepatrimoine.s3') || originalSrc.includes('hagnere-patrimoine.s3')) {
      // For new uploads, they should already be WebP
      // For old uploads, we'll need the migration script
      return originalSrc
    }

    return originalSrc
  }

  const optimizedSrc = getOptimizedSrc(currentSrc)

  // Get base path for S3 images
  const basePath = optimizedSrc.includes('hagnerepatrimoine.s3')
    ? optimizedSrc
        .replace(/-(thumb|small|medium|large|xlarge|fallback)\.(jpg|jpeg|png|webp)$/i, '')
        .replace(/\.(jpg|jpeg|png|webp)$/i, '')
    : ''

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!optimizedSrc.includes('hagnerepatrimoine.s3') && !optimizedSrc.includes('hagnere-patrimoine.s3')) {
      return undefined
    }

    return `
      ${basePath}-small.webp 400w,
      ${basePath}-medium.webp 800w,
      ${basePath}-large.webp 1200w
    `.trim()
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-gray-100 dark:bg-gray-800",
        className
      )}
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {/* Loading skeleton */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
      )}

      {/* Actual image */}
      {isInView && (
        <picture>
          {/* WebP source */}
          {isWebPSupported && optimizedSrc.includes('.webp') && (
            <source
              type="image/webp"
              srcSet={generateSrcSet()}
              sizes={sizes}
            />
          )}

          {/* Fallback source */}
          {(fallbackSrc || optimizedSrc.includes('hagnerepatrimoine.s3')) && (
            <source
              type="image/jpeg"
              srcSet={fallbackSrc || basePath + '-fallback.jpg'}
              sizes={sizes}
            />
          )}

          <img
            ref={imgRef}
            src={optimizedSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            style={{
              width: width ? `${width}px` : '100%',
              height: height ? `${height}px` : 'auto',
            }}
          />
        </picture>
      )}

      {/* Low quality placeholder for immediate display */}
      {!isInView && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
      )}
    </div>
  )
}