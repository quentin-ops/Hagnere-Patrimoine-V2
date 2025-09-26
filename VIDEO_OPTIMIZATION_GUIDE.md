# Guide d'Optimisation Vidéo pour Hero Section

## 🎯 Stratégie Recommandée

### 1. Formats et Compression

Pour une vidéo de 860 MB, voici les optimisations recommandées :

#### Formats à générer :
- **WebM (VP9)** : Meilleure compression, supporté par 95% des navigateurs
- **MP4 (H.264)** : Compatibilité universelle, fallback
- **Poster image** : Image de preview en WebP/JPEG

#### Paramètres de compression recommandés :

```bash
# WebM VP9 (meilleure qualité/taille)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 -tile-columns 2 -tile-rows 2 -cpu-used 5 -g 240 -pass 1 -an -f null /dev/null
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 -tile-columns 2 -tile-rows 2 -cpu-used 5 -g 240 -pass 2 -c:a libopus -b:a 128k output.webm

# MP4 H.264 (compatibilité)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -movflags +faststart -c:a aac -b:a 128k output_h264.mp4

# MP4 H.265/HEVC (meilleure compression mais support limité)
ffmpeg -i input.mp4 -c:v libx265 -crf 28 -preset slow -tag:v hvc1 -movflags +faststart -c:a aac -b:a 128k output_h265.mp4
```

#### Résolutions adaptatives :
- **1920x1080** : Desktop haute qualité
- **1280x720** : Desktop standard / tablette
- **854x480** : Mobile

### 2. Cibles de taille

Pour une vidéo hero de 15-30 secondes :
- **WebM** : 3-8 MB (excellent ratio qualité/taille)
- **MP4 H.264** : 5-12 MB (compatibilité universelle)
- **MP4 H.265** : 3-7 MB (si supporté)

### 3. Techniques d'optimisation pour le web

#### A. Lazy Loading avec Intersection Observer
```javascript
// Charger la vidéo seulement quand visible
const videoElement = document.querySelector('video');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      videoElement.src = videoElement.dataset.src;
      videoElement.load();
    }
  });
});
observer.observe(videoElement);
```

#### B. Preload strategies
```html
<!-- Preload poster uniquement -->
<link rel="preload" as="image" href="poster.webp">

<!-- Video avec attributs optimisés -->
<video 
  autoplay 
  muted 
  loop 
  playsinline
  preload="none"
  poster="poster.webp"
>
  <source src="hero.webm" type="video/webm">
  <source src="hero.mp4" type="video/mp4">
</video>
```

#### C. Streaming adaptatif (HLS/DASH)
Pour les vidéos plus longues, considérer HLS :
```bash
# Générer HLS segments
ffmpeg -i input.mp4 -c:v h264 -crf 23 -preset veryfast -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 4 -hls_playlist_type vod -hls_segment_filename "segment%03d.ts" playlist.m3u8
```

### 4. Upload sur S3

#### Configuration CORS pour streaming
```json
{
  "CORSRules": [{
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Range", "Accept-Ranges"],
    "MaxAgeSeconds": 3600
  }]
}
```

#### Headers recommandés
```javascript
// Dans l'upload
const params = {
  Bucket: bucketName,
  Key: key,
  Body: buffer,
  ContentType: 'video/mp4',
  CacheControl: 'public, max-age=31536000, immutable',
  Metadata: {
    'Content-Encoding': 'gzip' // si compressé
  }
};
```

### 5. Limites et solutions

#### Limites actuelles :
- API Gateway : 10 MB max
- Lambda : 6 MB payload
- Navigateur FormData : ~2 GB mais dépend de la RAM

#### Solutions pour gros fichiers :

**Option 1: Upload direct S3 avec presigned URL**
```javascript
// Générer URL présignée côté serveur
const command = new PutObjectCommand({
  Bucket: bucket,
  Key: key,
  ContentType: 'video/mp4'
});
const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

// Upload côté client avec progression
const xhr = new XMLHttpRequest();
xhr.upload.addEventListener('progress', (e) => {
  const percent = (e.loaded / e.total) * 100;
  console.log(`Upload: ${percent}%`);
});
xhr.open('PUT', url);
xhr.send(file);
```

**Option 2: Multipart Upload**
Pour fichiers > 100 MB, utiliser S3 Multipart Upload

**Option 3: Compression locale avant upload**
Utiliser un worker pour compresser côté client

### 6. Implémentation recommandée pour votre cas

Pour vos 4 vidéos de 860 MB :

1. **Compression locale d'abord** (réduire à ~10-30 MB)
2. **Upload via presigned URL** (éviter les limites API)
3. **Formats multiples** (WebM + MP4)
4. **CDN CloudFront** pour distribution optimale

## 🚀 Script de compression recommandé

```bash
#!/bin/bash
# compress-hero-videos.sh

INPUT_DIR="./videos-source"
OUTPUT_DIR="./videos-compressed"

for video in "$INPUT_DIR"/*.mp4; do
  filename=$(basename "$video" .mp4)
  
  # WebM version
  ffmpeg -i "$video" \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
    -c:v libvpx-vp9 -crf 32 -b:v 0 \
    -c:a libopus -b:a 96k \
    -auto-alt-ref 1 -lag-in-frames 25 \
    "$OUTPUT_DIR/${filename}.webm"
  
  # MP4 version
  ffmpeg -i "$video" \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
    -c:v libx264 -crf 24 -preset slow \
    -movflags +faststart \
    -an \
    "$OUTPUT_DIR/${filename}.mp4"
  
  # Poster frame
  ffmpeg -i "$video" -vf "thumbnail,scale=1920:1080" -frames:v 1 "$OUTPUT_DIR/${filename}_poster.jpg"
done
```

## 📊 Résultats attendus

| Format | Taille originale | Taille optimisée | Réduction |
|--------|-----------------|------------------|-----------|
| MP4 source | 860 MB | - | - |
| WebM VP9 | - | 8-15 MB | ~98% |
| MP4 H.264 | - | 12-20 MB | ~97% |
| Poster | - | 200 KB | - |

## 🎨 Implémentation React

```jsx
// components/hero-video.tsx
const HeroVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Lazy load on intersection
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          video.load();
          setIsLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster="/videos/hero-poster.jpg"
    >
      <source 
        data-src="https://your-bucket.s3.amazonaws.com/videos/hero.webm" 
        type="video/webm" 
      />
      <source 
        data-src="https://your-bucket.s3.amazonaws.com/videos/hero.mp4" 
        type="video/mp4" 
      />
    </video>
  );
};
```

## ⚡ Performance Tips

1. **Utilisez `preload="none"`** et chargez après DOMContentLoaded
2. **Poster image obligatoire** pour le premier rendu
3. **Désactivez l'audio** si pas nécessaire (`muted` + pas de piste audio)
4. **Limitez à 15-30 secondes** pour les vidéos en boucle
5. **Utilisez CloudFront** pour la distribution CDN
6. **Implémentez un fallback** image statique pour les connexions lentes
