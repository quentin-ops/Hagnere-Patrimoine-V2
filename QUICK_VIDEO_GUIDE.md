# 🎬 Guide Rapide - Upload et Optimisation Vidéo

## 📤 Pour uploader vos 4 vidéos de 860 MB

### Option 1: Upload Direct (Déconseillé pour 860 MB)
```bash
# Aller sur la page de test
http://localhost:3030/test-video-upload

# ⚠️ ATTENTION: 860 MB est très lourd pour une vidéo web
# Compression FORTEMENT recommandée avant upload
```

### Option 2: Compression + Upload (RECOMMANDÉ) ✅

#### 1. Installer FFmpeg
```bash
# Sur Mac
brew install ffmpeg

# Vérifier l'installation
ffmpeg -version
```

#### 2. Compresser vos vidéos
```bash
# Depuis le dossier du projet
cd /Users/quentinhagnere/Development/Hagnéré\ Patrimoine/hagnere-patrimoine

# Compresser une vidéo (860 MB → ~10-20 MB)
./scripts/compress-videos.sh /chemin/vers/votre/video.mp4 hero-video1

# Répéter pour les 4 vidéos
./scripts/compress-videos.sh video1.mp4 hero1
./scripts/compress-videos.sh video2.mp4 hero2
./scripts/compress-videos.sh video3.mp4 hero3
./scripts/compress-videos.sh video4.mp4 hero4
```

Les fichiers compressés seront dans `./videos-optimized/`

#### 3. Uploader les vidéos compressées
- Aller sur http://localhost:3030/test-video-upload
- Uploader les fichiers depuis `videos-optimized/`
- Copier les URLs S3 générées

## 🎯 Résultats attendus

| Avant | Après | Format |
|-------|-------|--------|
| 860 MB | ~8-15 MB | WebM (meilleure compression) |
| 860 MB | ~12-20 MB | MP4 (compatibilité) |
| 860 MB | ~5-10 MB | Mobile MP4 (720p) |

## 🚀 Utilisation dans la Hero

```tsx
// components/hero-aurora.tsx
import { HeroVideoOptimized } from '@/components/hero-video-optimized'

// Dans votre composant
<HeroVideoOptimized
  videoUrls={{
    webm: 'https://votre-bucket.s3.amazonaws.com/videos/hero1.webm',
    mp4: 'https://votre-bucket.s3.amazonaws.com/videos/hero1_h264.mp4',
    mobile: 'https://votre-bucket.s3.amazonaws.com/videos/hero1_mobile.mp4'
  }}
  posterUrl="https://votre-bucket.s3.amazonaws.com/videos/hero1_poster.jpg"
  posterWebpUrl="https://votre-bucket.s3.amazonaws.com/videos/hero1_poster.webp"
  className="absolute inset-0"
/>
```

## ⚡ Rotation automatique des vidéos

Pour faire tourner vos 4 vidéos :

```tsx
const [currentVideo, setCurrentVideo] = useState(0)
const videos = [
  { webm: 'url1.webm', mp4: 'url1.mp4', poster: 'poster1.jpg' },
  { webm: 'url2.webm', mp4: 'url2.mp4', poster: 'poster2.jpg' },
  // etc...
]

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentVideo(prev => (prev + 1) % videos.length)
  }, 30000) // Change toutes les 30 secondes
  return () => clearInterval(interval)
}, [])

// Utilisation
<HeroVideoOptimized videoUrls={videos[currentVideo]} />
```

## 🔧 Compression personnalisée

Pour ajuster la qualité/taille :

```bash
# Plus petite taille (qualité réduite)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 40 -b:v 0 -an output.webm

# Meilleure qualité (taille plus grande)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 25 -b:v 0 -an output.webm

# CRF: 0 (lossless) → 63 (pire qualité)
# Recommandé: 30-35 pour hero vidéos
```

## ❓ FAQ

### "860 MB c'est trop lourd?"
OUI ! Pour le web :
- **Vidéo non optimisée** : Les utilisateurs partiront avant le chargement
- **Vidéo optimisée (10-20 MB)** : Chargement rapide, expérience fluide

### "Quelle durée max?"
- **Hero vidéo** : 15-30 secondes max
- **En boucle** : Pas de son nécessaire

### "Comment tester la performance?"
```bash
# Tester avec throttling réseau
# Dans Chrome DevTools > Network > Slow 3G
# La vidéo doit charger en < 3 secondes
```

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez que FFmpeg est installé
2. Vérifiez les permissions du script : `chmod +x scripts/compress-videos.sh`
3. Testez avec une petite vidéo d'abord
4. Utilisez la page test : http://localhost:3030/test-video-upload
