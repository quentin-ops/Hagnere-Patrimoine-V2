// Configuration des logos après upload sur S3
// INSTRUCTIONS : Remplacez les URLs vides par vos URLs S3 après l'upload

interface LogoConfig {
  url: string           // URL principale (PNG ou fallback)
  webpUrl?: string      // URL WebP principale
  webpUrl400?: string   // WebP 400px
  webpUrl200?: string   // WebP 200px
  webpUrl100?: string   // WebP 100px
  alt: string
  description: string
}

export const LOGOS: Record<string, LogoConfig> = {
  // Logo Hagnéré Patrimoine Elite - Version claire (fond gris clair)
  hagnereEliteLight: {
    url: '', // 🔗 REMPLACER : URL S3 du PNG principal
    webpUrl: '', // 🔗 REMPLACER : URL S3 du WebP 400px
    webpUrl400: '', // Optionnel : WebP 400px si différent
    webpUrl200: '', // Optionnel : WebP 200px
    webpUrl100: '', // Optionnel : WebP 100px
    alt: 'Hagnéré Patrimoine Elite - Logo clair',
    description: 'Version claire sur fond gris'
  },
  
  // Logo Hagnéré Patrimoine Elite - Version sombre (fond gris foncé)
  hagnereEliteDark: {
    url: '', // 🔗 REMPLACER : URL S3 du PNG principal
    webpUrl: '', // 🔗 REMPLACER : URL S3 du WebP 400px
    webpUrl400: '',
    webpUrl200: '',
    webpUrl100: '',
    alt: 'Hagnéré Patrimoine Elite - Logo sombre',
    description: 'Version sombre sur fond gris foncé'
  },
  
  // Logo Patrimoine seul - Version noire
  patrimoineBlack: {
    url: '', // 🔗 REMPLACER : URL S3 du PNG principal
    webpUrl: '', // 🔗 REMPLACER : URL S3 du WebP 400px
    webpUrl400: '',
    webpUrl200: '',
    webpUrl100: '',
    alt: 'Patrimoine - Logo noir',
    description: 'Logo Patrimoine noir sur fond transparent'
  },
  
  // Logo Hagnéré Patrimoine complet - Version blanche
  hagnerePatrimoineWhite: {
    url: '', // 🔗 REMPLACER : URL S3 du PNG principal
    webpUrl: '', // 🔗 REMPLACER : URL S3 du WebP 400px
    webpUrl400: '',
    webpUrl200: '',
    webpUrl100: '',
    alt: 'Hagnéré Patrimoine - Logo blanc',
    description: 'Logo complet blanc sur fond noir'
  }
}

// Fonction helper pour obtenir le bon logo selon le thème
export function getLogoByTheme(isDarkMode: boolean, variant: 'elite' | 'patrimoine' = 'elite') {
  if (variant === 'elite') {
    return isDarkMode ? LOGOS.hagnereEliteDark : LOGOS.hagnereEliteLight
  }
  return isDarkMode ? LOGOS.hagnerePatrimoineWhite : LOGOS.patrimoineBlack
}

// Exemple d'utilisation dans un composant React:
/*
import Image from 'next/image'
import { LOGOS, getLogoByTheme } from '@/lib/logos-config'

// Dans votre composant:
const logo = getLogoByTheme(isDarkMode, 'elite')

<Image 
  src={logo.url} 
  alt={logo.alt}
  width={200}
  height={60}
  priority
/>
*/
