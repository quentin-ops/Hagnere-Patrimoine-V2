# 🔗 Guide de Partage du Bucket S3 entre Sites

## 📋 Vue d'ensemble

Partager un bucket S3 entre plusieurs sites (ex: hagnere-patrimoine.fr et hagnere-investissement.fr) permet de :
- ✅ Centraliser la gestion des médias
- ✅ Réduire les coûts (un seul bucket)
- ✅ Simplifier la maintenance
- ✅ Partager des ressources communes (logos, images corporate)

## 🔧 Configuration CORS pour Multi-Sites

### 1. **Configuration CORS du Bucket S3**

Connectez-vous à AWS Console > S3 > Votre bucket > Permissions > CORS

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": [
      "https://hagnere-patrimoine.fr",
      "https://www.hagnere-patrimoine.fr",
      "https://hagnere-investissement.fr",
      "https://www.hagnere-investissement.fr",
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    "ExposeHeaders": [
      "ETag",
      "x-amz-server-side-encryption",
      "x-amz-request-id",
      "x-amz-id-2"
    ],
    "MaxAgeSeconds": 3000
  }
]
```

### 2. **Structure Organisée des Dossiers**

```
hagnerepatrimoine/ (bucket)
├── shared/           # Ressources partagées entre sites
│   ├── logos/
│   ├── icons/
│   └── corporate/
├── patrimoine/       # Spécifique à hagnere-patrimoine.fr
│   ├── hero/
│   ├── content/
│   └── projects/
├── investissement/   # Spécifique à hagnere-investissement.fr
│   ├── hero/
│   ├── articles/
│   └── strategies/
└── uploads/         # Uploads temporaires/dev
```

## 🔐 Configuration IAM pour Multi-Sites

### Politique IAM Recommandée

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListBucket",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::hagnerepatrimoine"
    },
    {
      "Sid": "AllowReadShared",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": "arn:aws:s3:::hagnerepatrimoine/shared/*"
    },
    {
      "Sid": "AllowFullAccessToSiteFolder",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetObjectVersion"
      ],
      "Resource": [
        "arn:aws:s3:::hagnerepatrimoine/patrimoine/*",
        "arn:aws:s3:::hagnerepatrimoine/investissement/*"
      ]
    },
    {
      "Sid": "AllowUploadFolder",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::hagnerepatrimoine/uploads/*"
    }
  ]
}
```

### Créer des Utilisateurs IAM Séparés (Optionnel)

Pour plus de sécurité, créez un utilisateur IAM par site :

```bash
# Utilisateur pour hagnere-patrimoine.fr
aws iam create-user --user-name hagnere-patrimoine-s3-user

# Utilisateur pour hagnere-investissement.fr  
aws iam create-user --user-name hagnere-investissement-s3-user

# Attacher les politiques appropriées
aws iam attach-user-policy --user-name hagnere-patrimoine-s3-user --policy-arn arn:aws:iam::YOUR_ACCOUNT:policy/S3PatrimoineAccess
```

## 🌐 Configuration Multi-Sites Next.js

### 1. **Variables d'Environnement Partagées**

```env
# .env.local pour hagnere-patrimoine.fr
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=AKIA2NX46MXORQJECK4I
AWS_SECRET_ACCESS_KEY=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
AWS_BUCKET_NAME=hagnerepatrimoine
S3_FOLDER_PREFIX=patrimoine
S3_SHARED_FOLDER=shared

# .env.local pour hagnere-investissement.fr
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=AKIA2NX46MXORQJECK4I  # Même credentials
AWS_SECRET_ACCESS_KEY=lTMjzYFK20h7vVcq7+8+Y2Dmynwh6pEpaq30TfdQ
AWS_BUCKET_NAME=hagnerepatrimoine      # Même bucket
S3_FOLDER_PREFIX=investissement        # Dossier différent
S3_SHARED_FOLDER=shared
```

### 2. **Adapter le Code d'Upload** (`lib/aws-s3.ts`)

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

// Helper pour déterminer le dossier selon le type de ressource
const getFolderPath = (type: 'site' | 'shared', folder?: string) => {
  if (type === 'shared') {
    return `${process.env.S3_SHARED_FOLDER || 'shared'}/${folder || 'misc'}`
  }
  return `${process.env.S3_FOLDER_PREFIX || 'uploads'}/${folder || 'misc'}`
}

// Upload avec gestion multi-sites
export const uploadToS3 = async (
  file: Buffer,
  fileName: string,
  contentType: string,
  folder: string = 'uploads',
  isShared: boolean = false
): Promise<string> => {
  const folderPath = getFolderPath(isShared ? 'shared' : 'site', folder)
  const key = `${folderPath}/${Date.now()}-${fileName}`
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
    // Tags pour tracking
    Tagging: `site=${process.env.S3_FOLDER_PREFIX}&shared=${isShared}`
  })

  await s3Client.send(command)
  
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}

// Fonction pour accéder aux ressources partagées
export const getSharedResourceUrl = (path: string): string => {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/shared/${path}`
}

// Liste des ressources partagées (pour référence)
export const SHARED_RESOURCES = {
  logos: {
    patrimoine: getSharedResourceUrl('logos/hagnere-patrimoine.webp'),
    investissement: getSharedResourceUrl('logos/hagnere-investissement.webp'),
    group: getSharedResourceUrl('logos/hagnere-group.webp'),
  },
  icons: {
    favicon: getSharedResourceUrl('icons/favicon.ico'),
    apple: getSharedResourceUrl('icons/apple-touch-icon.png'),
  }
}
```

### 3. **Configuration Next.js pour Images Partagées**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hagnerepatrimoine.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**',  // Accepte tous les chemins du bucket
      },
    ],
    // Configuration pour optimisation
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },
}
```

## 📂 Organisation des Uploads

### Route API Adaptée (`app/api/upload/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { uploadToS3 } from '@/lib/aws-s3'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'
    const isShared = formData.get('shared') === 'true'  // Nouveau paramètre
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload avec gestion du partage
    const fileUrl = await uploadToS3(
      buffer,
      file.name,
      file.type,
      folder,
      isShared  // Si true, upload dans /shared/
    )

    return NextResponse.json({
      success: true,
      url: fileUrl,
      isShared,
      site: process.env.S3_FOLDER_PREFIX,
      message: `File uploaded to ${isShared ? 'shared' : process.env.S3_FOLDER_PREFIX} folder`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

## 🛡️ Configuration de Sécurité

### 1. **Bucket Policy pour Accès Public en Lecture**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::hagnerepatrimoine/*",
      "Condition": {
        "StringEquals": {
          "s3:ExistingObjectTag/public": "true"
        }
      }
    }
  ]
}
```

### 2. **CloudFront Distribution (Recommandé)**

Pour de meilleures performances et sécurité :

```javascript
// Configuration CloudFront
{
  "Origins": [{
    "DomainName": "hagnerepatrimoine.s3.eu-north-1.amazonaws.com",
    "S3OriginConfig": {
      "OriginAccessIdentity": "origin-access-identity/cloudfront/YOUR_OAI"
    }
  }],
  "DefaultCacheBehavior": {
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": ["GET", "HEAD", "OPTIONS"],
    "CachedMethods": ["GET", "HEAD", "OPTIONS"],
    "Compress": true,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "PriceClass": "PriceClass_100",
  "Aliases": [
    "cdn.hagnere-patrimoine.fr",
    "cdn.hagnere-investissement.fr"
  ]
}
```

## 🔄 Migration des Ressources Existantes

### Script de Migration

```javascript
// scripts/migrate-to-shared-bucket.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function migrateToSharedStructure() {
  // Liste des fichiers à migrer vers /shared/
  const sharedFiles = [
    'logos/hagnere-patrimoine.png',
    'logos/hagnere-investissement.png',
    'icons/favicon.ico'
  ];

  for (const file of sharedFiles) {
    const copyParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      CopySource: `${process.env.AWS_BUCKET_NAME}/${file}`,
      Key: `shared/${file}`,
      ACL: 'public-read',
      TaggingDirective: 'REPLACE',
      Tagging: 'public=true&shared=true'
    };

    try {
      await s3.copyObject(copyParams).promise();
      console.log(`✅ Migré: ${file} → shared/${file}`);
      
      // Optionnel : supprimer l'ancien fichier
      // await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: file }).promise();
    } catch (error) {
      console.error(`❌ Erreur migration ${file}:`, error);
    }
  }
}

migrateToSharedStructure();
```

## 📊 Avantages du Partage

| Aspect | Sans Partage | Avec Partage |
|--------|--------------|--------------|
| **Coûts S3** | 2 buckets = 2x coûts | 1 bucket = 1x coûts |
| **Gestion Logos** | Duplication | Centralisé dans /shared/ |
| **Maintenance** | 2 configurations | 1 configuration |
| **Bande passante** | Transferts dupliqués | Cache partagé |
| **CDN** | 2 distributions | 1 distribution |

## 🚀 Utilisation Pratique

### Upload d'une Ressource Partagée

```javascript
// Frontend - Upload d'un logo partagé
const formData = new FormData()
formData.append('file', logoFile)
formData.append('folder', 'logos')
formData.append('shared', 'true')  // Marque comme partagé

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})
```

### Accès aux Ressources Partagées

```jsx
// Component React
import { SHARED_RESOURCES } from '@/lib/aws-s3'
import Image from 'next/image'

export function SharedLogo() {
  return (
    <Image
      src={SHARED_RESOURCES.logos.patrimoine}
      alt="Hagnéré Patrimoine"
      width={200}
      height={50}
      priority
    />
  )
}
```

### Variables par Site

```typescript
// lib/site-config.ts
export const SITE_CONFIG = {
  'hagnere-patrimoine': {
    folderPrefix: 'patrimoine',
    siteName: 'Hagnéré Patrimoine',
    primaryColor: '#1a56db'
  },
  'hagnere-investissement': {
    folderPrefix: 'investissement',
    siteName: 'Hagnéré Investissement',
    primaryColor: '#059669'
  }
}
```

## 📝 Checklist de Migration

- [ ] Configurer CORS pour tous les domaines
- [ ] Créer la structure de dossiers dans S3
- [ ] Migrer les ressources communes vers /shared/
- [ ] Mettre à jour les variables d'environnement
- [ ] Adapter le code d'upload avec gestion des dossiers
- [ ] Tester l'accès depuis chaque site
- [ ] Configurer CloudFront (optionnel mais recommandé)
- [ ] Mettre à jour la documentation

## 🔍 Monitoring et Logs

### Activer les Access Logs S3

```json
{
  "LoggingEnabled": {
    "TargetBucket": "hagnerepatrimoine-logs",
    "TargetPrefix": "s3-access-logs/"
  }
}
```

### Tags pour Tracking

Utilisez les tags S3 pour suivre l'usage :
- `site=patrimoine` ou `site=investissement`
- `shared=true` pour ressources partagées
- `type=logo`, `type=hero`, etc.

Cette configuration permet un partage efficace et sécurisé du bucket S3 entre vos différents sites !
