import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'hagnere-patrimoine'
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com`

export async function POST(request: NextRequest) {
  try {
    console.log('=== Upload S3 API Called ===')
    console.log('Environment:', process.env.NODE_ENV)

    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Cette fonctionnalité n\'est disponible qu\'en développement' },
        { status: 403 }
      )
    }

    // Check AWS credentials
    console.log('AWS Config Check:')
    console.log('- Access Key ID exists:', !!process.env.AWS_ACCESS_KEY_ID)
    console.log('- Secret Key exists:', !!process.env.AWS_SECRET_ACCESS_KEY)
    console.log('- Region:', process.env.AWS_REGION || 'eu-north-1')
    console.log('- Bucket:', process.env.AWS_BUCKET_NAME || 'hagnere-patrimoine')
    console.log('- Access Key ID value (first 4 chars):', process.env.AWS_ACCESS_KEY_ID?.substring(0, 4) + '...')

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS credentials missing. Please configure .env.local file')
      return NextResponse.json(
        { error: 'Configuration AWS manquante. Veuillez configurer le fichier .env.local avec vos clés AWS' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('No file provided in request')
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    console.log('Buffer created, size:', buffer.length)

    // Generate unique filename with WebP extension for logos
    const hash = crypto.randomBytes(8).toString('hex')
    const originalExtension = file.name.split('.').pop()?.toLowerCase()

    // Detect if it's a logo based on filename or size
    const isLogo = file.name.toLowerCase().includes('logo') ||
                   file.name.toLowerCase().includes('icon') ||
                   file.size < 500 * 1024 // Less than 500KB likely a logo

    // Force WebP for logos, keep original format for other images
    const extension = isLogo ? 'webp' : (originalExtension === 'png' ? 'png' : originalExtension)
    const filename = `uploads/${Date.now()}-${hash}.${extension}`

    // Optimize image with sharp
    let optimizedBuffer: Buffer
    let contentType = 'image/jpeg'

    try {
      const image = sharp(buffer)
      const metadata = await image.metadata()

      // Resize based on type
      if (isLogo) {
        // Logos: max 500px (sufficient for web display)
        if (metadata.width && metadata.width > 500) {
          image.resize(500, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
        }
      } else {
        // Regular images: max 2000px
        if (metadata.width && metadata.width > 2000) {
          image.resize(2000, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
        }
      }

      // Convert to appropriate format and optimize
      if (isLogo) {
        // LOGOS: Always convert to WebP for maximum compression
        console.log('Processing as logo -> Converting to WebP')
        optimizedBuffer = await image
          .webp({
            quality: 80, // Lower quality for logos (still excellent visual quality)
            effort: 6,    // High compression effort
            smartSubsample: true, // Better color subsampling
            nearLossless: true,   // Use near-lossless compression
          })
          .toBuffer()
        contentType = 'image/webp'
      } else if (extension === 'png' || file.type === 'image/png') {
        // REGULAR IMAGES: Keep PNG for transparency
        console.log('Processing as regular PNG image')
        optimizedBuffer = await image
          .png({
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: true,
            quality: 90, // Slightly lower quality
            effort: 10,
          })
          .toBuffer()
        contentType = 'image/png'
      } else if (extension === 'webp' || file.type === 'image/webp') {
        // WebP images
        optimizedBuffer = await image
          .webp({
            quality: 80, // Reduced from 85
            effort: 6,
          })
          .toBuffer()
        contentType = 'image/webp'
      } else {
        // Default to JPEG for other formats
        optimizedBuffer = await image
          .jpeg({
            quality: 80, // Reduced from 85
            progressive: true,
            mozjpeg: true,
          })
          .toBuffer()
        contentType = 'image/jpeg'
      }
    } catch (error) {
      console.error('Erreur lors de l\'optimisation:', error)
      // If optimization fails, use original buffer
      optimizedBuffer = buffer
      contentType = file.type || 'image/jpeg'
    }

    // Upload to S3
    // Log optimization results
    const compressionRatio = ((1 - optimizedBuffer.length / buffer.length) * 100).toFixed(1)
    console.log('Optimization results:', {
      isLogo: isLogo,
      originalSize: `${(buffer.length / 1024).toFixed(1)} KB`,
      optimizedSize: `${(optimizedBuffer.length / 1024).toFixed(1)} KB`,
      compression: `${compressionRatio}%`,
      format: contentType
    })

    console.log('Preparing S3 upload:', {
      bucket: BUCKET_NAME,
      filename: filename,
      contentType: contentType,
      size: optimizedBuffer.length
    })

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: optimizedBuffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })

    console.log('Sending to S3...')
    await s3Client.send(command)
    console.log('Upload successful!')

    // Return the S3 URL
    const url = `${S3_BASE_URL}/${filename}`

    return NextResponse.json({
      url,
      filename,
      size: optimizedBuffer.length,
      originalSize: buffer.length,
      saved: `${Math.round((1 - optimizedBuffer.length / buffer.length) * 100)}%`,
    })
  } catch (error) {
    console.error('=== ERREUR UPLOAD S3 ===')
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')

    if (error && typeof error === 'object') {
      console.error('Full error object:', JSON.stringify(error, null, 2))

      // AWS SDK specific error handling
      if ('Code' in error) {
        console.error('AWS Error Code:', (error as any).Code)
        console.error('AWS Request ID:', (error as any).RequestId)

        // Return specific error messages based on AWS error codes
        const awsError = error as any
        if (awsError.Code === 'InvalidAccessKeyId') {
          return NextResponse.json(
            { error: 'Clé d\'accès AWS invalide. Vérifiez votre configuration dans .env.local' },
            { status: 401 }
          )
        } else if (awsError.Code === 'SignatureDoesNotMatch') {
          return NextResponse.json(
            { error: 'Clé secrète AWS invalide. Vérifiez votre configuration dans .env.local' },
            { status: 401 }
          )
        } else if (awsError.Code === 'NoSuchBucket') {
          return NextResponse.json(
            { error: `Le bucket "${BUCKET_NAME}" n'existe pas dans la région ${process.env.AWS_REGION || 'eu-north-1'}` },
            { status: 404 }
          )
        } else if (awsError.Code === 'AccessDenied') {
          return NextResponse.json(
            { error: 'Accès refusé. Vérifiez les permissions de votre utilisateur AWS pour S3' },
            { status: 403 }
          )
        }
      }
    }

    return NextResponse.json(
      {
        error: 'Erreur lors de l\'upload vers S3',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}