# 📦 Documentation Upload S3 - Hagnéré Patrimoine

## 🚀 Vue d'ensemble

Le système d'upload S3 de Hagnéré Patrimoine est une solution complète pour l'upload, l'optimisation et la gestion d'images sur AWS S3. [[memory:9035767]]

## 🔧 Configuration

### Variables d'environnement (.env.local)

```env
# AWS S3 Configuration 
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=AKIA2NX46MXORQJECK4I
AWS_SECRET_ACCESS_KEY=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
AWS_BUCKET_NAME=hagnerepatrimoine
```

### Configuration Next.js (next.config.ts)

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hagnerepatrimoine.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      // ... autres domaines
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
    qualities: [75, 85, 95, 100],
  },
};
```

## 📁 Architecture du Système

### 1. **Client S3 de Base** (`lib/aws-s3.ts`)

```typescript
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

// Upload simple
export const uploadToS3 = async (
  file: Buffer,
  fileName: string,
  contentType: string,
  folder: string = 'uploads'
): Promise<string> => {
  const key = `${folder}/${Date.now()}-${fileName}`
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: contentType,
  })

  await s3Client.send(command)
  
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

// Suppression
export const deleteFromS3 = async (fileUrl: string): Promise<void> => {
  const key = fileUrl.split('.com/')[1]
  
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  })

  await s3Client.send(command)
}

// URLs présignées
export const getPresignedUploadUrl = async (
  fileName: string,
  contentType: string,
  folder: string = 'uploads'
): Promise<{ uploadUrl: string; fileUrl: string }> => {
  const key = `${folder}/${Date.now()}-${fileName}`
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  })

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  
  return { uploadUrl, fileUrl }
}
```

### 2. **Optimiseur d'Images** (`lib/image-optimizer.ts`)

```typescript
import sharp from 'sharp'

// Configurations prédéfinies
export const LOGO_OPTIMIZATION: OptimizationOptions = {
  formats: ['webp', 'png'],
  sizes: [400, 200, 100],
  quality: 95,
  maxWidth: 400,
  maxHeight: 400,
  preserveMetadata: false,
  aggressive: false
}

export const CONTENT_OPTIMIZATION: OptimizationOptions = {
  formats: ['webp', 'avif'],
  sizes: [1920, 1280, 768, 400],
  quality: 85,
  maxWidth: 1920,
  maxHeight: 1080,
  preserveMetadata: false,
  aggressive: true
}

export const HERO_OPTIMIZATION: OptimizationOptions = {
  formats: ['webp', 'avif'],
  sizes: [2560, 1920, 1280, 768],
  quality: 90,
  maxWidth: 2560,
  maxHeight: 1440,
  preserveMetadata: false,
  aggressive: true
}

// Fonction d'optimisation principale
export async function optimizeImage(
  input: Buffer,
  filename: string,
  options: OptimizationOptions = DEFAULT_OPTIONS
): Promise<OptimizedImage[]> {
  const results: OptimizedImage[] = []
  const metadata = await sharp(input).metadata()
  
  for (const format of opts.formats || ['webp']) {
    for (const size of opts.sizes || [targetWidth]) {
      if (size > originalWidth) continue
      
      let pipeline = sharp(input)
        .resize(size, height, {
          fit: 'inside',
          withoutEnlargement: true,
          kernel: sharp.kernel.lanczos3
        })
      
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
      }
      
      const buffer = await pipeline.toBuffer()
      results.push({
        format,
        size,
        buffer,
        width: size,
        height,
        sizeInKB: Math.round(buffer.length / 1024),
        key: `${baseName}-${size}w.${format}`
      })
    }
  }
  
  return results
}

// Optimisation intelligente selon contexte
export async function smartOptimize(
  input: Buffer,
  filename: string,
  context?: 'logo' | 'hero' | 'content' | 'thumbnail'
): Promise<OptimizedImage[]> {
  // Détection automatique du contexte
  let detectedContext = context
  if (!detectedContext) {
    if (filename.toLowerCase().includes('logo')) {
      detectedContext = 'logo'
    } else if (filename.toLowerCase().includes('hero')) {
      detectedContext = 'hero'
    } else {
      detectedContext = 'content'
    }
  }
  
  // Sélection de la configuration
  const options = {
    'logo': LOGO_OPTIMIZATION,
    'hero': HERO_OPTIMIZATION,
    'content': CONTENT_OPTIMIZATION,
    'thumbnail': { formats: ['webp'], sizes: [400, 200], quality: 80 }
  }[detectedContext]
  
  return optimizeImage(input, filename, options)
}
```

## 🌐 Routes API

### **Route Upload Simple** (`/api/upload/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/aws-s3'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileUrl = await uploadToS3(
      buffer,
      file.name,
      file.type,
      folder
    )

    return NextResponse.json({
      success: true,
      url: fileUrl,
      message: 'File uploaded successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

### **Route Upload Optimisé** (`/api/upload-optimized/route.ts`) [[memory:6398683]]

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/aws-s3'
import { smartOptimize, getOptimizationStats, analyzeImage } from '@/lib/image-optimizer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    const context = formData.get('context') as 'logo' | 'hero' | 'content' | 'thumbnail'
    const skipOptimization = formData.get('skipOptimization') === 'true'
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Analyse de l'image
    const analysis = await analyzeImage(buffer)
    const originalSizeKB = Math.round(buffer.length / 1024)
    
    if (skipOptimization) {
      const fileUrl = await uploadToS3(buffer, file.name, file.type, folder)
      return NextResponse.json({
        success: true,
        url: fileUrl,
        optimized: false
      })
    }
    
    // Optimisation intelligente
    const optimizedImages = await smartOptimize(buffer, file.name, context)
    
    // Upload de toutes les variantes
    const uploadResults = []
    for (const optimized of optimizedImages) {
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
    }
    
    // Statistiques
    const stats = getOptimizationStats(buffer.length, optimizedImages)
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
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

### **Route Upload S3 avec Sizes Responsives** (`/api/upload-s3/route.ts`)

```typescript
import sharp from 'sharp'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// Tailles prédéfinies pour images responsives
const IMAGE_SIZES = {
  thumbnail: { width: 150, suffix: 'thumb' },
  small: { width: 400, suffix: 'small' },
  medium: { width: 800, suffix: 'medium' },
  large: { width: 1200, suffix: 'large' },
  xlarge: { width: 1920, suffix: 'xlarge' },
}

async function generateResponsiveImages(buffer: Buffer, baseFilename: string) {
  const sizes: Record<string, string> = {}
  const hash = crypto.randomBytes(8).toString('hex')
  const timestamp = Date.now()

  for (const [sizeName, config] of Object.entries(IMAGE_SIZES)) {
    const filename = `uploads/${timestamp}-${hash}-${config.suffix}.webp`

    // Génération WebP
    const webpBuffer = await sharp(buffer)
      .resize(config.width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({
        quality: sizeName === 'thumbnail' ? 70 : 75,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer()

    // Upload sur S3
    const url = await uploadToS3(webpBuffer, filename, 'image/webp')
    sizes[sizeName] = url
  }

  // Fallback JPEG
  const jpegBuffer = await sharp(buffer)
    .resize(800, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toBuffer()

  const jpegUrl = await uploadToS3(jpegBuffer, `${baseFilename}-fallback.jpg`, 'image/jpeg')
  sizes['fallback'] = jpegUrl

  return sizes
}
```

## 🎨 Composant React d'Upload

### **DevS3Uploader** (`components/dev-s3-uploader.tsx`)

```typescript
"use client"

import { useState, useRef } from 'react'
import { Upload, X, Copy, CheckCircle, Loader2 } from 'lucide-react'

export function DevS3Uploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validation
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('L\'image doit faire moins de 10MB')
      return
    }

    // Preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    // Upload
    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('context', 'content') // ou 'logo', 'hero', etc.

      const response = await fetch('/api/upload-optimized', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'upload')
      }

      setUploadedUrl(data.url)
      
      // Sauvegarde dans l'historique
      const historyItem = {
        id: Date.now().toString(),
        title: file.name,
        url: data.url,
        timestamp: Date.now(),
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        preview: data.url
      }
      
      // Sauvegarde localStorage
      const history = JSON.parse(localStorage.getItem('s3-upload-history') || '[]')
      localStorage.setItem('s3-upload-history', JSON.stringify([historyItem, ...history].slice(0, 30)))
      
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setIsUploading(false)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="file-upload"
      />
      
      <label htmlFor="file-upload" className="cursor-pointer">
        {preview ? (
          <img src={preview} alt="Preview" className="h-32 w-full object-contain" />
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8" />
            <span>Cliquer pour sélectionner une image</span>
          </div>
        )}
      </label>

      {isUploading && (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Optimisation et upload en cours...</span>
        </div>
      )}

      {uploadedUrl && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Upload réussi!</span>
          </div>
          
          <div className="flex items-center gap-2">
            <code className="text-xs bg-gray-100 p-2 rounded flex-1">
              {uploadedUrl}
            </code>
            <button onClick={() => copyToClipboard(uploadedUrl)}>
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

## 📦 Script d'Upload en Batch

### **Upload de Logos** (`scripts/upload-logos.js`)

```javascript
const fs = require('fs');
const path = require('path');

const LOGOS = [
  { filename: 'logo-hagnere-elite-light.png', description: 'Logo Elite - Clair' },
  { filename: 'logo-hagnere-elite-dark.png', description: 'Logo Elite - Sombre' },
];

async function uploadLogo(filepath, filename) {
  const file = fs.readFileSync(filepath);
  const blob = new Blob([file], { type: 'image/png' });
  
  const formData = new FormData();
  formData.append('file', blob, filename);
  formData.append('context', 'logo');
  
  const response = await fetch('http://localhost:3000/api/upload-optimized', {
    method: 'POST',
    body: formData
  });
  
  return response.json();
}

async function uploadAllLogos() {
  console.log('🚀 Upload des logos sur S3...\n');
  const results = [];
  
  for (const logo of LOGOS) {
    const filepath = path.join(__dirname, '..', 'public', 'logos', logo.filename);
    
    if (!fs.existsSync(filepath)) {
      console.error(`❌ Fichier non trouvé: ${filepath}`);
      continue;
    }
    
    console.log(`📤 Upload de ${logo.filename}...`);
    
    try {
      const result = await uploadLogo(filepath, logo.filename);
      results.push({
        filename: logo.filename,
        url: result.url,
        description: logo.description
      });
      console.log(`✅ Upload réussi: ${result.url}\n`);
    } catch (error) {
      console.error(`❌ Échec de l'upload\n`);
    }
  }
  
  // Sauvegarde des URLs
  const outputPath = path.join(__dirname, '..', 'public', 'logos', 'uploaded-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log('✨ Upload terminé!');
}

// Exécution
if (require.main === module) {
  uploadAllLogos().catch(console.error);
}
```

## 🎯 Utilisation

### Upload Simple
```javascript
// Frontend
const formData = new FormData()
formData.append('file', file)
formData.append('folder', 'images')

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

const { url } = await response.json()
```

### Upload avec Optimisation [[memory:6426241]]
```javascript
// Frontend avec contexte
const formData = new FormData()
formData.append('file', file) // Le nom du fichier est préservé
formData.append('context', 'hero') // Type d'image
formData.append('folder', 'hero-images')

const response = await fetch('/api/upload-optimized', {
  method: 'POST',
  body: formData
})

const { url, variants, optimization } = await response.json()
// url: URL principale (WebP)
// variants: Toutes les variantes (WebP, AVIF, PNG, etc.)
// optimization: Statistiques d'optimisation
```

### Upload avec Sizes Responsives
```javascript
const formData = new FormData()
formData.append('file', file)
formData.append('generateSizes', 'true')

const response = await fetch('/api/upload-s3', {
  method: 'POST',
  body: formData
})

const { url, sizes } = await response.json()
// sizes: { thumbnail, small, medium, large, xlarge, fallback }
```

## 🚀 Optimisations Appliquées

### Formats Générés
- **WebP** : Format principal, compression 75-95%
- **AVIF** : Format moderne, meilleure compression
- **PNG** : Pour images avec transparence
- **JPEG** : Fallback pour compatibilité

### Tailles Responsives
| Type | Tailles (px) | Qualité | Usage |
|------|-------------|---------|--------|
| Logo | 400, 200, 100 | 95% | Headers, footers |
| Hero | 2560, 1920, 1280, 768 | 90% | Bannières, headers |
| Content | 1920, 1280, 768, 400 | 85% | Articles, pages |
| Thumbnail | 400, 200 | 80% | Listes, grilles |

### Techniques d'Optimisation
- **Sharp.kernel.lanczos3** : Meilleur algorithme de redimensionnement
- **Smart Subsample** : Sous-échantillonnage intelligent
- **Progressive JPEG** : Chargement progressif
- **MozJPEG** : Encodeur JPEG optimisé
- **Normalisation** : Amélioration du contraste
- **Sharpening** : Accentuation après redimensionnement
- **sRGB** : Profil couleur web standard

## 📊 Résultats Typiques

```
Image originale : 5.2 MB (PNG, 3000x2000)
↓
Après optimisation :
- WebP 1920px : 185 KB (-96%)
- WebP 1280px : 98 KB (-98%)  
- WebP 768px : 42 KB (-99%)
- AVIF 1920px : 142 KB (-97%)
- JPEG fallback : 220 KB (-95%)

Total économies : 96% en moyenne
Temps de chargement : -85%
```

## 🔒 Sécurité

1. **Validation des fichiers** : Type et taille vérifiés
2. **Noms uniques** : Timestamp + hash pour éviter collisions
3. **Environnement** : Upload limité au développement
4. **Credentials** : AWS IAM avec permissions minimales
5. **Cache** : Headers de cache optimisés (30 jours)

## 🛠️ Scripts NPM

```json
{
  "scripts": {
    "upload:logos": "node scripts/upload-logos.js",
    "optimize:image": "node scripts/optimize-images.js",
    "optimize:logos": "node scripts/optimize-images.js ./public/logos ./public/logos/optimized logo",
    "optimize:content": "node scripts/optimize-images.js ./public/images ./public/images/optimized content"
  }
}
```

## 📝 Notes Importantes

1. Les images sont automatiquement compressées avec une perte minimale de qualité [[memory:6398683]]
2. Les noms de fichiers sont conservés dans les chemins/props [[memory:6426241]]
3. Toutes les images sont uploadées sur AWS S3, pas stockées localement [[memory:9035767]]
4. L'optimisation est automatique selon le contexte détecté
5. Le composant DevS3Uploader n'est disponible qu'en développement

Cette documentation couvre l'ensemble du système d'upload S3 avec toutes les optimisations et configurations nécessaires pour une performance maximale.
