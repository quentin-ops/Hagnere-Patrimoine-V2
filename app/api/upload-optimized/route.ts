import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/aws-s3'
import { smartOptimize, getOptimizationStats, analyzeImage } from '@/lib/image-optimizer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    const context = formData.get('context') as 'logo' | 'hero' | 'content' | 'thumbnail' | undefined
    const skipOptimization = formData.get('skipOptimization') === 'true'
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Analyser l'image originale
    const analysis = await analyzeImage(buffer)
    const originalSizeKB = Math.round(buffer.length / 1024)
    
    console.log(`📊 Analyse de ${file.name}:`)
    console.log(`   - Format: ${analysis.metadata.format}`)
    console.log(`   - Dimensions: ${analysis.metadata.width}x${analysis.metadata.height}`)
    console.log(`   - Taille: ${originalSizeKB}KB`)
    console.log(`   - Recommandations: ${analysis.recommendations.join(', ')}`)
    
    if (skipOptimization) {
      // Upload sans optimisation
      const fileUrl = await uploadToS3(
        buffer,
        file.name,
        file.type,
        folder
      )
      
      return NextResponse.json({
        success: true,
        url: fileUrl,
        original: {
          sizeKB: originalSizeKB,
          format: analysis.metadata.format,
          width: analysis.metadata.width,
          height: analysis.metadata.height
        },
        optimized: false,
        message: 'Fichier uploadé sans optimisation'
      })
    }
    
    // Optimiser l'image intelligemment
    console.log('🔧 Optimisation en cours...')
    const optimizedImages = await smartOptimize(buffer, file.name, context)
    
    if (optimizedImages.length === 0) {
      return NextResponse.json(
        { error: 'Échec de l\'optimisation de l\'image' },
        { status: 500 }
      )
    }
    
    // Calculer les statistiques
    const stats = getOptimizationStats(buffer.length, optimizedImages)
    console.log(`✨ Optimisation terminée:`)
    console.log(`   - Économies: ${stats.savingsPercent}%`)
    console.log(`   - Meilleure taille: ${stats.bestSizeKB}KB`)
    console.log(`   - Formats générés: ${stats.formats.join(', ')}`)
    console.log(`   - Variantes créées: ${stats.totalVariants}`)
    
    // Uploader toutes les variantes sur S3
    const uploadResults = []
    for (const optimized of optimizedImages) {
      try {
        const fileUrl = await uploadToS3(
          optimized.buffer,
          optimized.key,
          `image/${optimized.format}`,
          folder
        )
        
        uploadResults.push({
          url: fileUrl,
          format: optimized.format,
          width: optimized.width,
          height: optimized.height,
          sizeKB: optimized.sizeInKB
        })
      } catch (error) {
        console.error(`Erreur lors de l'upload de ${optimized.key}:`, error)
      }
    }
    
    // Trouver la meilleure version (WebP de taille moyenne généralement)
    const primaryUrl = uploadResults.find(r => r.format === 'webp')?.url || uploadResults[0]?.url
    
    return NextResponse.json({
      success: true,
      url: primaryUrl,
      variants: uploadResults,
      original: {
        sizeKB: originalSizeKB,
        format: analysis.metadata.format,
        width: analysis.metadata.width,
        height: analysis.metadata.height
      },
      optimization: {
        savingsPercent: stats.savingsPercent,
        bestSizeKB: stats.bestSizeKB,
        totalVariants: stats.totalVariants,
        formats: stats.formats
      },
      recommendations: analysis.recommendations,
      message: `Image optimisée avec ${stats.savingsPercent}% d'économies`
    })
    
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json(
      { 
        error: 'Échec de l\'upload', 
        details: error instanceof Error ? error.message : 'Erreur inconnue' 
      },
      { status: 500 }
    )
  }
}

// Route GET pour obtenir les recommandations d'optimisation
export async function GET(request: NextRequest) {
  return NextResponse.json({
    endpoints: {
      upload: '/api/upload-optimized',
      method: 'POST',
      description: 'Upload et optimise automatiquement les images'
    },
    parameters: {
      file: 'Le fichier image à uploader (requis)',
      folder: 'Dossier de destination sur S3 (optionnel, défaut: "uploads")',
      context: 'Type d\'image: "logo", "hero", "content", "thumbnail" (optionnel)',
      skipOptimization: 'Passer "true" pour désactiver l\'optimisation (optionnel)'
    },
    optimizations: {
      formats: ['WebP', 'AVIF', 'PNG (pour transparence)'],
      sizes: {
        logo: [400, 200, 100],
        hero: [2560, 1920, 1280, 768],
        content: [1920, 1280, 768, 400],
        thumbnail: [400, 200]
      },
      techniques: [
        'Compression intelligente selon le format',
        'Redimensionnement responsive',
        'Suppression des métadonnées inutiles',
        'Normalisation des couleurs',
        'Accentuation après redimensionnement',
        'Profil sRGB pour compatibilité web'
      ]
    },
    response: {
      url: 'URL principale de l\'image optimisée',
      variants: 'Liste de toutes les variantes créées',
      optimization: 'Statistiques d\'optimisation',
      recommendations: 'Suggestions d\'amélioration'
    }
  })
}
