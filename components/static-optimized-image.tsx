"use client"

import Image, { type ImageProps } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface StaticOptimizedImageProps extends Omit<ImageProps, 'loading'> {
  fallbackSrc?: string
  aspectRatio?: 'square' | '16/9' | '4/3' | '21/9' | 'auto'
  enableLazyLoad?: boolean
}

const aspectRatioClasses: Record<NonNullable<StaticOptimizedImageProps['aspectRatio']>, string> = {
  square: 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '21/9': 'aspect-[21/9]',
  auto: '',
}

export function StaticOptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = '/logos/logo-hagnere-patrimoine-white.png',
  aspectRatio = 'auto',
  enableLazyLoad = true,
  priority = false,
  fill,
  width,
  height,
  sizes,
  quality,
  onLoad,
  onError,
  ...props
}: StaticOptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const optimizedSizes =
    sizes ||
    (fill
      ? `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 75vw,
    (max-width: 1280px) 50vw,
    33vw
  `
      : undefined)

  const handleError = (event: unknown) => {
    setHasError(true)
    setIsLoading(false)
    if (fallbackSrc && fallbackSrc !== imgSrc) {
      setImgSrc(fallbackSrc)
    }
    onError?.(event as never)
  }

  const handleLoad = (event: unknown) => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.(event as never)
  }

  useEffect(() => {
    if (!enableLazyLoad || priority || !imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.loading = 'eager'
            observer.unobserve(imgRef.current)
          }
        })
      },
      { rootMargin: '50px' }
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [enableLazyLoad, priority])

  const containerClasses = cn(
    'relative',
    aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
    fill && 'h-full w-full'
  )

  const imageClasses = cn(
    'transition-opacity duration-300',
    isLoading && 'opacity-0',
    !isLoading && 'opacity-100',
    hasError && 'opacity-50',
    className
  )

  return (
    <div className={containerClasses}>
      <Image
        ref={imgRef as never}
        src={imgSrc}
        alt={alt}
        className={imageClasses}
        quality={quality ?? 85}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={optimizedSizes}
        onLoad={handleLoad}
        onError={handleError}
        placeholder="empty"
        {...props}
      />

      {isLoading && <div className="absolute inset-0 animate-pulse rounded bg-muted" />}
    </div>
  )
}
