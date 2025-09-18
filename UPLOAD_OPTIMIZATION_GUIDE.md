# 🚀 Guide Complet - Upload et Optimisation d'Images

## 📋 Vue d'ensemble rapide

Ce système offre un pipeline complet d'optimisation et d'upload d'images sur AWS S3 :

1. **Optimisation automatique** : WebP, AVIF, compression jusqu'à 70%
2. **Images responsive** : Multiples tailles générées automatiquement  
3. **Upload S3** : Stockage cloud sécurisé
4. **Interface web** : Upload facile avec drag & drop

## 🎯 Utilisation rapide

### Option 1 : Interface Web (Recommandé)

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Ouvrir dans le navigateur
http://localhost:3000/upload-logos

# 3. Activer "Optimisation automatique" et uploader
```

### Option 2 : Scripts NPM

```bash
# Optimiser des logos localement
npm run optimize:logos

# Optimiser du contenu
npm run optimize:content

# Optimiser une image spécifique
npm run optimize:image image.jpg ./output content

# Uploader des logos déjà optimisés
npm run upload:logos
```

## 📸 Workflow complet pour vos logos

### 1. Placer les images originales

Placez vos 4 logos dans `public/logos/` avec ces noms exacts :
- `logo-hagnere-elite-light.png`
- `logo-hagnere-elite-dark.png`
- `logo-patrimoine-black.png`
- `logo-hagnere-patrimoine-white.png`

### 2. Optimiser localement (optionnel)

```bash
# Optimise et génère WebP + PNG en 400/200/100px
npm run optimize:logos
```

Résultat dans `public/logos/optimized/` :
- `logo-hagnere-elite-light-400w.webp`
- `logo-hagnere-elite-light-400w.png`
- `logo-hagnere-elite-light-200w.webp`
- etc...

### 3. Uploader sur S3

**Via l'interface web** (optimisation automatique) :
1. Aller sur `http://localhost:3000/upload-logos`
2. Sélectionner les 4 logos
3. Activer "Optimisation automatique"
4. Choisir le preset "Logo"
5. Cliquer sur "Optimiser et Uploader"

**Via script** (images déjà optimisées) :
```bash
npm run upload:logos
```

### 4. Récupérer les URLs S3

Les URLs sont affichées après l'upload :
```
https://your-bucket.s3.eu-north-1.amazonaws.com/logos/[timestamp]-logo-400w.webp
```

## 🔧 Optimisation locale avancée

### Optimiser une seule image

```bash
# Syntaxe de base
node scripts/optimize-images.js <input> [output] [preset]

# Exemples
node scripts/optimize-images.js hero.jpg ./output hero
node scripts/optimize-images.js photo.png ./optimized content --verbose
```

### Optimiser un dossier complet

```bash
# Optimiser toutes les images d'un dossier
node scripts/optimize-images.js ./images ./optimized content

# Avec détails
node scripts/optimize-images.js ./photos ./photos-web content --verbose
```

### Presets disponibles

| Preset | Tailles | Qualité | Usage |
|--------|---------|---------|-------|
| `logo` | 400, 200, 100px | 95% | Logos, icônes |
| `hero` | 2560, 1920, 1280, 768px | 90% | Bannières |
| `content` | 1920, 1280, 768, 400px | 85% | Articles |
| `thumbnail` | 400, 200px | 80% | Vignettes |

## 📊 Exemples de résultats

### Logo PNG (150 KB) → Optimisé
```
✅ 6 variantes créées
📉 Meilleure compression: 12 KB (-92%)
   • logo-400w.webp: 12 KB
   • logo-400w.png: 18 KB
   • logo-200w.webp: 4 KB
   • logo-200w.png: 7 KB
   • logo-100w.webp: 2 KB
   • logo-100w.png: 3 KB
```

### Photo JPEG (2.4 MB) → Optimisé
```
✅ 8 variantes créées
📉 Meilleure compression: 145 KB (-94%)
   • photo-1920w.avif: 145 KB
   • photo-1920w.webp: 220 KB
   • photo-1280w.avif: 85 KB
   • photo-1280w.webp: 130 KB
   ...
```

## 🛠️ API pour développeurs

### Upload avec optimisation

```javascript
const formData = new FormData()
formData.append('file', imageFile)
formData.append('folder', 'images')
formData.append('context', 'hero') // 'logo', 'hero', 'content', 'thumbnail'

const response = await fetch('/api/upload-optimized', {
  method: 'POST',
  body: formData
})

const result = await response.json()
console.log(result)
// {
//   url: "https://...",  // URL principale (WebP)
//   variants: [...],     // Toutes les variantes
//   optimization: {      // Statistiques
//     savingsPercent: 85,
//     bestSizeKB: 145,
//     formats: ['webp', 'avif']
//   }
// }
```

### Module TypeScript

```typescript
import { smartOptimize, getOptimizationStats } from '@/lib/image-optimizer'

// Optimisation intelligente
const optimized = await smartOptimize(buffer, 'image.jpg', 'hero')

// Statistiques
const stats = getOptimizationStats(originalBuffer.length, optimized)
console.log(`Économies: ${stats.savingsPercent}%`)
```

## 💡 Conseils et astuces

### 1. Choisir le bon format
- **Photos** : Privilégier AVIF (meilleure compression)
- **Logos/Graphiques** : WebP + PNG (préserve les détails)
- **Transparence** : WebP ou PNG uniquement

### 2. Optimiser pour le web
- Toujours générer plusieurs tailles (responsive)
- Utiliser `loading="lazy"` pour les images hors viewport
- Implémenter `<picture>` avec srcset pour la performance

### 3. Économies typiques
- JPEG → WebP : ~30% d'économies
- JPEG → AVIF : ~50% d'économies
- PNG → WebP : ~80% d'économies (avec transparence)

## 🚨 Résolution de problèmes

### "Module sharp not found"
```bash
npm install sharp
```

### Images trop compressées/floues
- Augmenter la qualité : utiliser preset `logo` (95%)
- Désactiver l'optimisation aggressive
- Conserver le format original si nécessaire

### Upload échoue
- Vérifier les variables d'environnement AWS
- Vérifier les permissions S3
- Taille max : 10MB par fichier

## 📁 Structure des fichiers

```
public/
├── logos/                    # Images originales
│   ├── logo-*.png
│   └── optimized/           # Images optimisées
│       ├── logo-*-400w.webp
│       ├── logo-*-400w.png
│       └── ...
│
scripts/
├── optimize-images.js       # CLI d'optimisation
└── upload-logos.js         # Script d'upload

app/
├── upload-logos/           # Interface web
└── api/
    ├── upload/            # API basique
    └── upload-optimized/  # API avec optimisation

lib/
├── image-optimizer.ts     # Module d'optimisation
└── aws-s3.ts             # Module S3
```

## 🔗 Liens utiles

- [Documentation détaillée](./docs/OPTIMIZATION.md)
- [Interface d'upload](http://localhost:3000/upload-logos)
- [API endpoint](http://localhost:3000/api/upload-optimized)

## 📝 Variables d'environnement requises

```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=eu-north-1
AWS_S3_BUCKET_NAME=your_bucket
```

---

**💪 Prêt à optimiser !** Vos images seront jusqu'à 94% plus légères tout en conservant une excellente qualité visuelle.
