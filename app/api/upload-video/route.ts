import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// POST: Obtenir une URL présignée pour upload direct
export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, fileSize } = await request.json()
    
    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'Nom de fichier et type requis' },
        { status: 400 }
      )
    }

    // Vérifier la taille (limite à 1GB)
    const MAX_SIZE = 1024 * 1024 * 1024 // 1GB
    if (fileSize && fileSize > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux. Limite: 1GB' },
        { status: 400 }
      )
    }

    // Vérifier le type de fichier
    const allowedTypes = [
      'video/mp4',
      'video/webm',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-ms-wmv',
      'video/mpeg'
    ]
    
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json(
        { error: 'Type de fichier non supporté' },
        { status: 400 }
      )
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
    const key = `videos/${timestamp}-${randomString}-${cleanFileName}`

    // Créer la commande S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
      // Ajouter des métadonnées utiles
      Metadata: {
        'original-name': fileName,
        'upload-date': new Date().toISOString(),
      },
      // Cache pour les vidéos (1 an)
      CacheControl: 'public, max-age=31536000, immutable',
    })

    // Générer l'URL présignée (valide 1 heure)
    const uploadUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 3600 
    })

    // URL finale du fichier
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    return NextResponse.json({
      success: true,
      uploadUrl,
      fileUrl,
      key,
      expiresIn: 3600,
    })
  } catch (error) {
    console.error('Erreur génération presigned URL:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération de l\'URL d\'upload' },
      { status: 500 }
    )
  }
}
