import sharp from 'sharp'

export interface OptimizationOptions {
  // Formats de sortie
  formats?: ('webp' | 'avif' | 'jpg' | 'png')[]
  // Tailles responsive à générer
  sizes?: number[]
  // Qualité de compression (1-100)
  quality?: number
  // Largeur maximale
  maxWidth?: number
  // Hauteur maximale
  maxHeight?: number
  // Préserver les métadonnées
  preserveMetadata?: boolean
  // Optimisation aggressive
  aggressive?: boolean
}

export interface OptimizedImage {
  format: string
  size?: number
  buffer: Buffer
  width: number
  height: number
  sizeInKB: number
  key: string
}

const DEFAULT_OPTIONS: OptimizationOptions = {
  formats: ['webp', 'avif'],
  sizes: [1920, 1280, 768, 400], // Tailles responsive
  quality: 85,
  maxWidth: 1920,
  maxHeight: 1920,
  preserveMetadata: false,
  aggressive: true
}

// Configuration optimale pour les logos
export const LOGO_OPTIMIZATION: OptimizationOptions = {
  formats: ['webp', 'png'],
  sizes: [400, 200, 100], // Tailles typiques pour logos
  quality: 95, // Qualité élevée pour les logos
  maxWidth: 400,
  maxHeight: 400,
  preserveMetadata: false,
  aggressive: false // Moins agressif pour préserver les détails
}

// Configuration pour images de contenu
export const CONTENT_OPTIMIZATION: OptimizationOptions = {
  formats: ['webp', 'avif'],
  sizes: [1920, 1280, 768, 400],
  quality: 85,
  maxWidth: 1920,
  maxHeight: 1080,
  preserveMetadata: false,
  aggressive: true
}

// Configuration pour images hero/bannières
export const HERO_OPTIMIZATION: OptimizationOptions = {
  formats: ['webp', 'avif'],
  sizes: [2560, 1920, 1280, 768],
  quality: 90,
  maxWidth: 2560,
  maxHeight: 1440,
  preserveMetadata: false,
  aggressive: true
}

/**
 * Optimise une image avec les meilleures pratiques
 */
export async function optimizeImage(
  input: Buffer,
  filename: string,
  options: OptimizationOptions = DEFAULT_OPTIONS
): Promise<OptimizedImage[]> {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const results: OptimizedImage[] = []
  
  // Obtenir les métadonnées de l'image originale
  const metadata = await sharp(input).metadata()
  const originalWidth = metadata.width || 0
  const originalHeight = metadata.height || 0
  
  // Calculer les dimensions optimales en préservant le ratio
  const aspectRatio = originalWidth / originalHeight
  let targetWidth = Math.min(originalWidth, opts.maxWidth || originalWidth)
  let targetHeight = Math.min(originalHeight, opts.maxHeight || originalHeight)
  
  // Ajuster pour préserver le ratio d'aspect
  if (targetWidth / targetHeight > aspectRatio) {
    targetWidth = Math.round(targetHeight * aspectRatio)
  } else {
    targetHeight = Math.round(targetWidth / aspectRatio)
  }
  
  // Générer les différents formats et tailles
  for (const format of opts.formats || ['webp']) {
    for (const size of opts.sizes || [targetWidth]) {
      // Ne pas agrandir l'image
      if (size > originalWidth) continue
      
      const height = Math.round(size / aspectRatio)
      
      try {
        let pipeline = sharp(input)
          .resize(size, height, {
            fit: 'inside',
            withoutEnlargement: true,
            kernel: sharp.kernel.lanczos3 // Meilleur algorithme de redimensionnement
          })
        
        // Optimisations supplémentaires selon le format
        switch (format) {
          case 'webp':
            pipeline = pipeline.webp({
              quality: opts.quality,
              effort: opts.aggressive ? 6 : 4,
              smartSubsample: true,
              nearLossless: !opts.aggressive
            })
            break
            
          case 'avif':
            pipeline = pipeline.avif({
              quality: opts.quality,
              effort: opts.aggressive ? 9 : 5,
              chromaSubsampling: opts.aggressive ? '4:2:0' : '4:4:4'
            })
            break
            
          case 'jpg':
            pipeline = pipeline.jpeg({
              quality: opts.quality,
              progressive: true,
              mozjpeg: true,
              chromaSubsampling: opts.aggressive ? '4:2:0' : '4:4:4',
              trellisQuantisation: opts.aggressive,
              overshootDeringing: opts.aggressive,
              optimiseScans: opts.aggressive
            })
            break
            
          case 'png':
            pipeline = pipeline.png({
              quality: opts.quality,
              compressionLevel: opts.aggressive ? 9 : 6,
              adaptiveFiltering: true,
              palette: true
            })
            break
        }
        
        // Supprimer les métadonnées si demandé
        if (!opts.preserveMetadata) {
          pipeline = pipeline.withMetadata({
            exif: {},
            icc: 'sRGB' // Forcer sRGB pour la compatibilité web
          })
        }
        
        // Optimisations supplémentaires
        if (opts.aggressive) {
          pipeline = pipeline
            .normalize() // Améliorer le contraste
            .sharpen({ sigma: 0.5 }) // Légère accentuation après redimensionnement
        }
        
        const buffer = await pipeline.toBuffer()
        const sizeInKB = Math.round(buffer.length / 1024)
        
        // Générer un nom de fichier descriptif
        const baseName = filename.replace(/\.[^.]+$/, '')
        const key = `${baseName}-${size}w.${format}`
        
        results.push({
          format,
          size,
          buffer,
          width: size,
          height,
          sizeInKB,
          key
        })
        
      } catch (error) {
        console.error(`Erreur lors de l'optimisation en ${format} ${size}px:`, error)
      }
    }
  }
  
  // Trier par taille de fichier (plus petit en premier)
  results.sort((a, b) => a.sizeInKB - b.sizeInKB)
  
  return results
}

/**
 * Analyse une image et recommande les optimisations
 */
export async function analyzeImage(input: Buffer): Promise<{
  metadata: sharp.Metadata
  recommendations: string[]
  estimatedSavings: number
}> {
  const metadata = await sharp(input).metadata()
  const originalSizeKB = Math.round(input.length / 1024)
  const recommendations: string[] = []
  
  // Analyser et faire des recommandations
  if (metadata.width && metadata.width > 1920) {
    recommendations.push(`Réduire la largeur de ${metadata.width}px à 1920px maximum`)
  }
  
  if (metadata.format !== 'webp' && metadata.format !== 'avif') {
    recommendations.push(`Convertir de ${metadata.format} vers WebP ou AVIF pour une meilleure compression`)
  }
  
  if (metadata.density && metadata.density > 72) {
    recommendations.push(`Réduire la densité de ${metadata.density} DPI à 72 DPI pour le web`)
  }
  
  if (originalSizeKB > 500) {
    recommendations.push(`Taille de fichier élevée (${originalSizeKB}KB), optimisation recommandée`)
  }
  
  if (metadata.hasProfile) {
    recommendations.push('Supprimer les profils de couleur inutiles')
  }
  
  if (metadata.hasAlpha && metadata.format === 'jpeg') {
    recommendations.push('Utiliser PNG ou WebP pour préserver la transparence')
  }
  
  // Estimer les économies potentielles
  let estimatedSavings = 0
  if (metadata.format !== 'webp') {
    estimatedSavings += 30 // WebP économise environ 30%
  }
  if (metadata.width && metadata.width > 1920) {
    estimatedSavings += 20 // Redimensionnement économise environ 20%
  }
  if (metadata.hasProfile) {
    estimatedSavings += 5 // Suppression des métadonnées économise environ 5%
  }
  
  return {
    metadata,
    recommendations,
    estimatedSavings: Math.min(estimatedSavings, 70) // Maximum 70% d'économies
  }
}

/**
 * Optimisation intelligente basée sur le type d'image détecté
 */
export async function smartOptimize(
  input: Buffer,
  filename: string,
  context?: 'logo' | 'hero' | 'content' | 'thumbnail'
): Promise<OptimizedImage[]> {
  // Analyser l'image
  const analysis = await analyzeImage(input)
  const { metadata } = analysis
  
  // Déterminer le contexte si non fourni
  let detectedContext = context
  if (!detectedContext) {
    if (filename.toLowerCase().includes('logo')) {
      detectedContext = 'logo'
    } else if (filename.toLowerCase().includes('hero') || filename.toLowerCase().includes('banner')) {
      detectedContext = 'hero'
    } else if (metadata.width && metadata.width < 500) {
      detectedContext = 'thumbnail'
    } else {
      detectedContext = 'content'
    }
  }
  
  // Sélectionner la configuration appropriée
  let options: OptimizationOptions
  switch (detectedContext) {
    case 'logo':
      options = LOGO_OPTIMIZATION
      break
    case 'hero':
      options = HERO_OPTIMIZATION
      break
    case 'thumbnail':
      options = {
        formats: ['webp'],
        sizes: [400, 200],
        quality: 80,
        maxWidth: 400,
        maxHeight: 400,
        aggressive: true
      }
      break
    default:
      options = CONTENT_OPTIMIZATION
  }
  
  // Si l'image a de la transparence, garder PNG en plus de WebP
  if (metadata.hasAlpha) {
    if (!options.formats?.includes('png')) {
      options.formats = [...(options.formats || []), 'png']
    }
  }
  
  return optimizeImage(input, filename, options)
}

/**
 * Génère un élément picture HTML avec toutes les sources optimisées
 */
export function generatePictureElement(
  images: OptimizedImage[],
  alt: string,
  className?: string,
  loading?: 'lazy' | 'eager'
): string {
  // Grouper par format
  const byFormat = images.reduce((acc, img) => {
    if (!acc[img.format]) acc[img.format] = []
    acc[img.format].push(img)
    return acc
  }, {} as Record<string, OptimizedImage[]>)
  
  // Trouver l'image fallback (préférer jpg ou png)
  const fallback = images.find(img => img.format === 'jpg' || img.format === 'png') || images[0]
  
  let html = '<picture>\n'
  
  // Ajouter les sources modernes en premier (WebP, AVIF)
  const modernFormats = ['avif', 'webp']
  for (const format of modernFormats) {
    if (byFormat[format]) {
      const srcset = byFormat[format]
        .map(img => `${img.key} ${img.width}w`)
        .join(', ')
      
      html += `  <source type="image/${format}" srcset="${srcset}" />\n`
    }
  }
  
  // Image fallback
  html += `  <img 
    src="${fallback.key}" 
    alt="${alt}"
    width="${fallback.width}" 
    height="${fallback.height}"
    loading="${loading || 'lazy'}"
    ${className ? `class="${className}"` : ''}
  />\n`
  html += '</picture>'
  
  return html
}

/**
 * Statistiques d'optimisation
 */
export function getOptimizationStats(
  originalSize: number,
  optimizedImages: OptimizedImage[]
): {
  originalSizeKB: number
  bestSizeKB: number
  savingsPercent: number
  totalVariants: number
  formats: string[]
} {
  const originalSizeKB = Math.round(originalSize / 1024)
  const bestSize = Math.min(...optimizedImages.map(img => img.sizeInKB))
  const savingsPercent = Math.round(((originalSizeKB - bestSize) / originalSizeKB) * 100)
  
  return {
    originalSizeKB,
    bestSizeKB: bestSize,
    savingsPercent,
    totalVariants: optimizedImages.length,
    formats: [...new Set(optimizedImages.map(img => img.format))]
  }
}
