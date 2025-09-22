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

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'hagnerepatrimoine'
const S3_BASE_URL = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com`

// Image size configurations
const IMAGE_SIZES = {
  thumbnail: { width: 150, suffix: 'thumb' },
  small: { width: 400, suffix: 'small' },
  medium: { width: 800, suffix: 'medium' },
  large: { width: 1200, suffix: 'large' },
  xlarge: { width: 1920, suffix: 'xlarge' },
}

async function uploadToS3(buffer: Buffer, filename: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  })

  await s3Client.send(command)
  return `${S3_BASE_URL}/${filename}`
}

async function generateResponsiveImages(buffer: Buffer, baseFilename: string) {
  const sizes: Record<string, string> = {}
  const hash = crypto.randomBytes(8).toString('hex')
  const timestamp = Date.now()

  for (const [sizeName, config] of Object.entries(IMAGE_SIZES)) {
    try {
      const filename = `uploads/${timestamp}-${hash}-${config.suffix}.webp`

      // Generate WebP version
      const webpBuffer = await sharp(buffer)
        .resize(config.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({
          quality: sizeName === 'thumbnail' ? 70 : 75, // Lower quality for thumbnails
          effort: 6,
          smartSubsample: true,
        })
        .toBuffer()

      // Upload to S3
      const url = await uploadToS3(webpBuffer, filename, 'image/webp')
      sizes[sizeName] = url

      console.log(`Generated ${sizeName}:`, {
        size: `${(webpBuffer.length / 1024).toFixed(1)} KB`,
        url: url
      })
    } catch (error) {
      console.error(`Error generating ${sizeName} size:`, error)
    }
  }

  // Also generate a JPEG fallback for the medium size
  try {
    const jpegFilename = `uploads/${timestamp}-${hash}-fallback.jpg`
    const jpegBuffer = await sharp(buffer)
      .resize(800, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer()

    const jpegUrl = await uploadToS3(jpegBuffer, jpegFilename, 'image/jpeg')
    sizes['fallback'] = jpegUrl

    console.log('Generated JPEG fallback:', {
      size: `${(jpegBuffer.length / 1024).toFixed(1)} KB`,
      url: jpegUrl
    })
  } catch (error) {
    console.error('Error generating JPEG fallback:', error)
  }

  return sizes
}

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
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS credentials missing. Please configure .env.local file')
      return NextResponse.json(
        { error: 'Configuration AWS manquante. Veuillez configurer le fichier .env.local avec vos clés AWS' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const generateSizes = formData.get('generateSizes') === 'true' // Optional parameter

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

    // Generate unique filename
    const hash = crypto.randomBytes(8).toString('hex')
    const timestamp = Date.now()
    const baseFilename = `uploads/${timestamp}-${hash}`

    // Check if we should generate multiple sizes
    if (generateSizes) {
      console.log('Generating responsive images...')
      const sizes = await generateResponsiveImages(buffer, baseFilename)

      return NextResponse.json({
        url: sizes.medium || sizes.large || Object.values(sizes)[0], // Default to medium size
        sizes: sizes,
        originalSize: buffer.length,
        message: 'Multiple sizes generated'
      })
    }

    // Single optimized image (default behavior)
    const filename = `${baseFilename}.webp`
    const fallbackFilename = `${baseFilename}.jpg`

    // Process image with sharp
    const metadata = await sharp(buffer).metadata()
    console.log('Image metadata:', {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format
    })

    // Generate WebP version
    const webpBuffer = await sharp(buffer)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality: 75, // Aggressive compression
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer()

    // Generate JPEG fallback
    const jpegBuffer = await sharp(buffer)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer()

    // Upload both versions
    const webpUrl = await uploadToS3(webpBuffer, filename, 'image/webp')
    const jpegUrl = await uploadToS3(jpegBuffer, fallbackFilename, 'image/jpeg')

    // Log optimization results
    const compressionRatio = ((1 - webpBuffer.length / buffer.length) * 100).toFixed(1)
    console.log('Optimization results:', {
      originalSize: `${(buffer.length / 1024).toFixed(1)} KB`,
      webpSize: `${(webpBuffer.length / 1024).toFixed(1)} KB`,
      jpegSize: `${(jpegBuffer.length / 1024).toFixed(1)} KB`,
      compression: `${compressionRatio}%`,
    })

    return NextResponse.json({
      url: webpUrl, // Primary WebP URL
      fallbackUrl: jpegUrl, // JPEG fallback
      filename,
      size: webpBuffer.length,
      originalSize: buffer.length,
      saved: `${Math.round((1 - webpBuffer.length / buffer.length) * 100)}%`,
    })
  } catch (error) {
    console.error('=== ERREUR UPLOAD S3 ===')
    console.error('Error:', error)

    if (error && typeof error === 'object' && 'Code' in error) {
      const awsError = error as any

      if (awsError.Code === 'InvalidAccessKeyId') {
        return NextResponse.json(
          { error: 'Clé d\'accès AWS invalide' },
          { status: 401 }
        )
      } else if (awsError.Code === 'SignatureDoesNotMatch') {
        return NextResponse.json(
          { error: 'Clé secrète AWS invalide' },
          { status: 401 }
        )
      } else if (awsError.Code === 'NoSuchBucket') {
        return NextResponse.json(
          { error: `Le bucket "${BUCKET_NAME}" n'existe pas` },
          { status: 404 }
        )
      } else if (awsError.Code === 'AccessDenied') {
        return NextResponse.json(
          { error: 'Accès refusé au bucket S3' },
          { status: 403 }
        )
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