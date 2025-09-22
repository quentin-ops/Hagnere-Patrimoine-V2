#!/usr/bin/env ts-node

import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'hagnerepatrimoine'

interface ImageSize {
  suffix: string
  width: number
  quality: number
}

const IMAGE_SIZES: ImageSize[] = [
  { suffix: 'thumb', width: 150, quality: 70 },
  { suffix: 'small', width: 400, quality: 75 },
  { suffix: 'medium', width: 800, quality: 75 },
  { suffix: 'large', width: 1200, quality: 75 },
  { suffix: 'xlarge', width: 1920, quality: 75 },
]

async function downloadImage(key: string): Promise<Buffer | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    const response = await s3Client.send(command)

    if (response.Body) {
      const chunks: Uint8Array[] = []
      // @ts-ignore
      for await (const chunk of response.Body) {
        chunks.push(chunk)
      }
      return Buffer.concat(chunks)
    }
    return null
  } catch (error) {
    console.error(`Error downloading ${key}:`, error)
    return null
  }
}

async function uploadImage(buffer: Buffer, key: string, contentType: string): Promise<boolean> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
    await s3Client.send(command)
    console.log(`✅ Uploaded: ${key}`)
    return true
  } catch (error) {
    console.error(`Error uploading ${key}:`, error)
    return false
  }
}

async function processImage(key: string): Promise<void> {
  console.log(`\n📸 Processing: ${key}`)

  // Download original image
  const originalBuffer = await downloadImage(key)
  if (!originalBuffer) {
    console.error(`Failed to download: ${key}`)
    return
  }

  try {
    // Get image metadata
    const metadata = await sharp(originalBuffer).metadata()
    console.log(`  Dimensions: ${metadata.width}x${metadata.height}`)
    console.log(`  Format: ${metadata.format}`)
    console.log(`  Size: ${(originalBuffer.length / 1024).toFixed(1)} KB`)

    // Generate base path without extension
    const basePath = key.replace(/\.(jpg|jpeg|png|gif|bmp)$/i, '')

    // Generate multiple sizes
    for (const size of IMAGE_SIZES) {
      const webpKey = `${basePath}-${size.suffix}.webp`

      // Check if this size already exists (skip if it does)
      try {
        const existsCommand = new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: webpKey,
        })
        await s3Client.send(existsCommand)
        console.log(`  ⏭️  Skipping ${size.suffix} (already exists)`)
        continue
      } catch {
        // File doesn't exist, proceed with generation
      }

      // Generate WebP version
      const webpBuffer = await sharp(originalBuffer)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside',
        })
        .webp({
          quality: size.quality,
          effort: 6,
          smartSubsample: true,
        })
        .toBuffer()

      // Upload to S3
      const success = await uploadImage(webpBuffer, webpKey, 'image/webp')
      if (success) {
        const compression = ((1 - webpBuffer.length / originalBuffer.length) * 100).toFixed(1)
        console.log(`  ✨ ${size.suffix}: ${(webpBuffer.length / 1024).toFixed(1)} KB (${compression}% smaller)`)
      }
    }

    // Also create a JPEG fallback for the medium size
    const jpegKey = `${basePath}-fallback.jpg`
    try {
      const existsCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: jpegKey,
      })
      await s3Client.send(existsCommand)
      console.log(`  ⏭️  Skipping JPEG fallback (already exists)`)
    } catch {
      // Generate JPEG fallback
      const jpegBuffer = await sharp(originalBuffer)
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

      const success = await uploadImage(jpegBuffer, jpegKey, 'image/jpeg')
      if (success) {
        console.log(`  🔄 JPEG fallback: ${(jpegBuffer.length / 1024).toFixed(1)} KB`)
      }
    }

    console.log(`✨ Completed processing: ${key}`)
  } catch (error) {
    console.error(`Error processing ${key}:`, error)
  }
}

async function migrateImages(): Promise<void> {
  console.log('🚀 Starting S3 image migration to WebP...')
  console.log(`📦 Bucket: ${BUCKET_NAME}`)
  console.log(`🌍 Region: ${process.env.AWS_REGION || 'eu-north-1'}`)
  console.log('-----------------------------------\n')

  try {
    // List all objects in the uploads folder
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'uploads/',
    })

    const response = await s3Client.send(command)

    if (!response.Contents || response.Contents.length === 0) {
      console.log('No images found in the uploads folder.')
      return
    }

    // Filter for image files only (skip already processed WebP files)
    const imageFiles = response.Contents
      .filter(obj => obj.Key)
      .filter(obj => {
        const key = obj.Key!.toLowerCase()
        return (
          !key.includes('-thumb.') &&
          !key.includes('-small.') &&
          !key.includes('-medium.') &&
          !key.includes('-large.') &&
          !key.includes('-xlarge.') &&
          !key.includes('-fallback.') &&
          !key.endsWith('.webp') &&
          (key.endsWith('.jpg') ||
           key.endsWith('.jpeg') ||
           key.endsWith('.png') ||
           key.endsWith('.gif'))
        )
      })
      .map(obj => obj.Key!)

    console.log(`📁 Found ${imageFiles.length} images to process`)
    console.log('-----------------------------------')

    // Process each image
    for (const key of imageFiles) {
      await processImage(key)
    }

    console.log('\n-----------------------------------')
    console.log('✅ Migration completed!')
    console.log(`📊 Processed ${imageFiles.length} images`)

  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateImages()
    .then(() => {
      console.log('\n🎉 All done!')
      process.exit(0)
    })
    .catch(error => {
      console.error('Migration failed:', error)
      process.exit(1)
    })
}

export { migrateImages }