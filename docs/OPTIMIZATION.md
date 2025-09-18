# 🚀 Système d'Optimisation d'Images - Hagnéré Patrimoine

## Vue d'ensemble

Ce système offre une optimisation automatique et intelligente des images avec les meilleures pratiques du web moderne :
- **Formats modernes** : WebP, AVIF
- **Compression intelligente** : jusqu'à 70% d'économies
- **Images responsive** : multiples tailles générées automatiquement
- **Optimisation contextuelle** : presets adaptés selon le type d'image

## 🎯 Caractéristiques

### Formats générés
- **WebP** : ~30% plus léger que JPEG, supporte la transparence
- **AVIF** : ~50% plus léger que JPEG, meilleure qualité
- **PNG** : Conservé pour les logos avec transparence
- **JPEG** : Fallback pour compatibilité maximale

### Tailles responsive
Chaque image est déclinée en plusieurs tailles pour s'adapter aux différents écrans :

| Type | Tailles générées | Qualité | Usage |
|------|-----------------|---------|--------|
| **Logo** | 400, 200, 100px | 95% | En-têtes, pieds de page |
| **Hero** | 2560, 1920, 1280, 768px | 90% | Bannières, headers |
| **Content** | 1920, 1280, 768, 400px | 85% | Articles, galeries |
| **Thumbnail** | 400, 200px | 80% | Vignettes, aperçus |

### Optimisations appliquées
- ✅ Compression adaptative selon le format
- ✅ Suppression des métadonnées inutiles
- ✅ Profil couleur sRGB pour compatibilité web
- ✅ Algorithme Lanczos3 pour redimensionnement optimal
- ✅ Accentuation intelligente après redimensionnement
- ✅ Normalisation des couleurs pour meilleur contraste

## 📤 Upload avec optimisation

### Via l'interface web

1. Accédez à l'interface d'upload :
   ```
   http://localhost:3000/upload-logos
   ```

2. Activez l'option "Optimisation automatique"

3. Sélectionnez le type d'image approprié :
   - Logo
   - Hero/Bannière
   - Contenu
   - Vignette

4. Uploadez vos images

### Via l'API

```javascript
const formData = new FormData()
formData.append('file', imageFile)
formData.append('folder', 'images')
formData.append('context', 'content') // 'logo', 'hero', 'content', 'thumbnail'

const response = await fetch('/api/upload-optimized', {
  method: 'POST',
  body: formData
})

const result = await response.json()
// result contient l'URL principale et toutes les variantes
```

## 🛠️ Optimisation locale (CLI)

### Installation

Le script utilise Sharp, déjà installé dans le projet :
```bash
npm install sharp
```

### Usage basique

```bash
# Optimiser une seule image
node scripts/optimize-images.js image.jpg

# Optimiser un dossier complet
node scripts/optimize-images.js ./images ./optimized

# Spécifier un preset
node scripts/optimize-images.js logo.png ./logos logo

# Mode verbose pour voir les détails
node scripts/optimize-images.js image.jpg ./output content --verbose
```

### Exemples d'utilisation

#### Optimiser des logos
```bash
node scripts/optimize-images.js ./public/logos ./public/logos/optimized logo
```
Résultat : WebP + PNG en 400px, 200px, 100px avec qualité 95%

#### Optimiser des images hero
```bash
node scripts/optimize-images.js hero-banner.jpg ./public/images hero
```
Résultat : WebP + AVIF en 2560px, 1920px, 1280px, 768px avec qualité 90%

#### Optimiser du contenu général
```bash
node scripts/optimize-images.js ./content-images ./optimized content
```
Résultat : WebP + AVIF en 1920px, 1280px, 768px, 400px avec qualité 85%

## 📊 Analyse et recommandations

Le système analyse automatiquement chaque image et fournit :
- Format actuel et dimensions
- Taille du fichier
- Recommandations d'optimisation
- Estimation des économies possibles

### Exemple de sortie

```
📸 hero-image.jpg
   Format: jpeg, Dimensions: 3840x2160
   Taille originale: 2.4 MB
   
💡 Recommandations:
   • Réduire la largeur de 3840px à 1920px
   • Convertir en WebP ou AVIF pour une meilleure compression
   
✅ Optimisation terminée!
   Variantes créées: 8
   Meilleure taille: 145 KB (-94%)
   
📁 Fichiers générés:
   • hero-image-2560w.webp
     WEBP 2560x1440 | 245 KB (-90%)
   • hero-image-2560w.avif
     AVIF 2560x1440 | 145 KB (-94%)
   ...
```

## 🔧 Configuration avancée

### Module d'optimisation (`lib/image-optimizer.ts`)

```typescript
import { smartOptimize, LOGO_OPTIMIZATION } from '@/lib/image-optimizer'

// Optimisation intelligente automatique
const results = await smartOptimize(buffer, filename)

// Optimisation avec preset spécifique
const results = await smartOptimize(buffer, filename, 'logo')

// Configuration personnalisée
const results = await optimizeImage(buffer, filename, {
  formats: ['webp', 'png'],
  sizes: [600, 300],
  quality: 90,
  maxWidth: 600,
  aggressive: false
})
```

### Génération d'élément `<picture>` HTML

```typescript
import { generatePictureElement } from '@/lib/image-optimizer'

const pictureHTML = generatePictureElement(
  optimizedImages,
  'Description de l\'image',
  'w-full h-auto',
  'lazy'
)
```

Résultat :
```html
<picture>
  <source type="image/avif" srcset="img-400w.avif 400w, img-768w.avif 768w" />
  <source type="image/webp" srcset="img-400w.webp 400w, img-768w.webp 768w" />
  <img 
    src="img-400w.jpg" 
    alt="Description de l'image"
    width="400" 
    height="300"
    loading="lazy"
    class="w-full h-auto"
  />
</picture>
```

## 🎯 Bonnes pratiques

### 1. Choix du preset
- **Logo** : Pour les images avec texte, détails fins
- **Hero** : Pour les grandes images d'arrière-plan
- **Content** : Pour les images d'articles, galeries
- **Thumbnail** : Pour les aperçus, vignettes

### 2. Formats selon le contenu
- **Photos** : WebP + AVIF (meilleure compression)
- **Logos/Graphiques** : WebP + PNG (préserve les détails)
- **Transparence** : WebP + PNG (conserve l'alpha)

### 3. Performance
- Toujours utiliser `loading="lazy"` sauf pour les images au-dessus de la ligne de flottaison
- Spécifier `width` et `height` pour éviter le layout shift
- Utiliser les variantes responsive avec `srcset`

## 📈 Résultats typiques

| Type d'image | Taille originale | Après optimisation | Économies |
|--------------|-----------------|-------------------|-----------|
| Photo HD (JPEG) | 2.4 MB | 145 KB (AVIF) | -94% |
| Logo (PNG) | 150 KB | 25 KB (WebP) | -83% |
| Screenshot (PNG) | 800 KB | 120 KB (WebP) | -85% |
| Icône (SVG) | 8 KB | 3 KB (optimisé) | -63% |

## 🚨 Dépannage

### Erreur : "Sharp module not found"
```bash
npm install sharp
```

### Images floues après optimisation
- Augmentez la qualité dans le preset
- Désactivez l'option `aggressive`
- Utilisez un preset moins agressif

### Transparence perdue
- Le système détecte automatiquement la transparence
- PNG est ajouté automatiquement si nécessaire
- Vérifiez que WebP est utilisé (supporte la transparence)

## 📚 Ressources

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [WebP vs JPEG](https://developers.google.com/speed/webp)
- [AVIF Guide](https://jakearchibald.com/2020/avif-has-landed/)
- [Responsive Images MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
