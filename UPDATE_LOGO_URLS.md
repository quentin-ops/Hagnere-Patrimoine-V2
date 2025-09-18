# 🎯 Mise à jour des URLs des logos

## ✅ Félicitations ! Vos logos sont maintenant sur S3

Voici comment finaliser l'intégration :

## 1️⃣ Mettre à jour le fichier de configuration

Ouvrez le fichier `lib/logos-config.ts` et remplacez les URLs vides par vos URLs S3 :

```typescript
// lib/logos-config.ts
export const LOGOS = {
  hagnereEliteLight: {
    url: 'https://votre-bucket.s3.eu-north-1.amazonaws.com/logos/...-logo-hagnere-elite-light.png',
    webpUrl: 'https://votre-bucket.s3.eu-north-1.amazonaws.com/logos/...-logo-hagnere-elite-light-400w.webp',
    // Si vous avez les variantes :
    webpUrl400: 'https://...400w.webp',
    webpUrl200: 'https://...200w.webp',
    webpUrl100: 'https://...100w.webp',
    alt: 'Hagnéré Patrimoine Elite - Logo clair',
  },
  
  hagnereEliteDark: {
    url: 'https://votre-bucket.s3.eu-north-1.amazonaws.com/logos/...-logo-hagnere-elite-dark.png',
    // etc...
  },
  
  // Répétez pour les 4 logos
}
```

## 2️⃣ Utiliser les logos dans votre application

### Dans le header (site-header.tsx)
```tsx
import { HeaderLogo } from '@/components/logo'

// Dans votre composant
<HeaderLogo className="h-10" />
```

### Dans une page
```tsx
import { Logo, ThemedLogo } from '@/components/logo'

// Logo spécifique
<Logo variant="elite-light" size="lg" priority />

// Logo qui s'adapte au thème clair/sombre
<ThemedLogo type="elite" size="md" />
```

### Dans le footer
```tsx
import { FooterLogo } from '@/components/logo'

<FooterLogo className="mx-auto" />
```

## 3️⃣ Tailles disponibles

- **sm** : 100x30px (petits espaces)
- **md** : 200x60px (header standard)
- **lg** : 300x90px (sections importantes)
- **xl** : 400x120px (hero, landing)

## 4️⃣ Variantes disponibles

- `elite-light` : Version claire du logo Elite
- `elite-dark` : Version sombre du logo Elite
- `patrimoine-black` : Logo Patrimoine noir
- `patrimoine-white` : Logo Patrimoine blanc

## 5️⃣ Exemple complet

```tsx
'use client'

import { Logo, ThemedLogo, HeaderLogo } from '@/components/logo'

export default function HomePage() {
  return (
    <>
      {/* Header avec logo adaptatif */}
      <header>
        <HeaderLogo />
      </header>
      
      {/* Hero avec grand logo */}
      <section className="hero">
        <Logo 
          variant="elite-light" 
          size="xl" 
          priority 
          className="mx-auto"
        />
      </section>
      
      {/* Logo qui change selon le thème */}
      <ThemedLogo type="patrimoine" size="md" />
    </>
  )
}
```

## 6️⃣ Performance optimale

Le composant Logo intègre :
- ✅ Lazy loading automatique (sauf si `priority`)
- ✅ Optimisation Next.js Image
- ✅ Support WebP avec fallback PNG
- ✅ Srcset pour images responsive
- ✅ Tailles prédéfinies pour éviter le layout shift

## 🎉 C'est terminé !

Vos logos sont maintenant :
- ⚡ Optimisés (70-90% plus légers)
- 🌍 Hébergés sur S3
- 🎨 Utilisables facilement via composants
- 📱 Responsive et performants

---

**Note** : N'oubliez pas de commiter les URLs dans `lib/logos-config.ts` une fois mises à jour !
