# 📤 INSTRUCTIONS D'UPLOAD S3

## ✅ Vidéos compressées avec succès !

Vos 4 vidéos de 860 MB ont été compressées à environ 10-15 MB chacune.

## 🚀 Étape 1 : Démarrer le serveur

```bash
cd "/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine"
PORT=3030 npm run dev
```

## 📤 Étape 2 : Uploader sur S3

1. Allez sur : **http://localhost:3030/test-video-upload**

2. Uploadez ces fichiers (dans l'ordre) :

### Pour Hero 1 :
- `videos-optimized/hero1.webm`
- `videos-optimized/hero1_h264.mp4`
- `videos-optimized/hero1_poster.jpg`

### Pour Hero 2 :
- `videos-optimized/hero2.webm`
- `videos-optimized/hero2_h264.mp4`
- `videos-optimized/hero2_poster.jpg`

### Pour Hero 3 :
- `videos-optimized/hero3.webm`
- `videos-optimized/hero3_h264.mp4`
- `videos-optimized/hero3_poster.jpg`

### Pour Hero 4 :
- `videos-optimized/hero4.webm`
- `videos-optimized/hero4_h264.mp4`
- `videos-optimized/hero4_poster.jpg`

## 📝 Étape 3 : Noter les URLs

Après chaque upload, **COPIEZ L'URL S3** générée.

Exemple d'URL :
```
https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/videos/1234567-abc123-hero1.webm
```

## 🎨 Étape 4 : Mettre à jour le code

Dans `components/hero-aurora.tsx`, remplacez les URLs placeholder :

```tsx
// Remplacez ces lignes (vers ligne 185-191)
<source 
  src="URL_DE_VOTRE_HERO1_WEBM" 
  type="video/webm" 
/>
<source 
  src="URL_DE_VOTRE_HERO1_MP4" 
  type="video/mp4" 
/>
```

## 💡 Code pour rotation automatique (optionnel)

Si vous voulez faire tourner les 4 vidéos automatiquement :

```tsx
const [currentVideo, setCurrentVideo] = useState(0);
const videos = [
  { 
    webm: "URL_S3_hero1.webm",
    mp4: "URL_S3_hero1.mp4",
    poster: "URL_S3_hero1_poster.jpg"
  },
  { 
    webm: "URL_S3_hero2.webm",
    mp4: "URL_S3_hero2.mp4",
    poster: "URL_S3_hero2_poster.jpg"
  },
  { 
    webm: "URL_S3_hero3.webm",
    mp4: "URL_S3_hero3.mp4",
    poster: "URL_S3_hero3_poster.jpg"
  },
  { 
    webm: "URL_S3_hero4.webm",
    mp4: "URL_S3_hero4.mp4",
    poster: "URL_S3_hero4_poster.jpg"
  }
];

// Change de vidéo toutes les 30 secondes
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  }, 30000);
  return () => clearInterval(interval);
}, []);

// Dans le JSX
<video
  key={currentVideo}
  poster={videos[currentVideo].poster}
  // ... autres props
>
  <source src={videos[currentVideo].webm} type="video/webm" />
  <source src={videos[currentVideo].mp4} type="video/mp4" />
</video>
```

## ✨ Notes importantes

- **WebM** : Format moderne, meilleure compression (Firefox, Chrome)
- **MP4** : Compatibilité universelle (Safari, anciens navigateurs)
- **Poster** : Image de preview pendant le chargement

## 🎉 C'est tout !

Une fois les URLs S3 dans votre code, vos vidéos se chargeront en ~2-3 secondes au lieu de plusieurs minutes !
