# 🎬 Configuration Vidéo Hero - Mode Light Desktop

## ✅ FAIT : Votre configuration est prête !

### Configuration actuelle :
- **Mode LIGHT + Desktop** → Vidéo verticale BLANC (hero3) ✅
- **Mode DARK + Desktop** → Vidéo verticale NOIR (hero4)
- **Desktop par défaut** → Vidéo 16:9 BLANC (hero1)
- **Mobile** → Vidéo 16:9 NOIR (hero2)

### Caractéristiques :
- ✅ **Lecture automatique** activée
- ✅ **Boucle infinie** activée
- ✅ **Sans son** (muted)
- ✅ **Optimisé** pour chargement rapide

## 📁 ÉTAPE FINALE : Copier les vidéos

### Commande simple (copiez-collez dans Terminal) :

```bash
cd "/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine"

# Copier toutes les vidéos vers public/
cp videos-optimized/hero*.webm public/
cp videos-optimized/hero*_h264.mp4 public/
cp videos-optimized/hero*_poster.jpg public/
```

### OU Double-cliquez sur :
`COPIER_VIDEOS.command`

## 🚀 Lancer le site

```bash
cd "/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine"
PORT=3030 npm run dev
```

## 📊 Vos fichiers vidéo

| Vidéo | Taille | Usage |
|-------|--------|-------|
| **hero3.webm** | 1.3 MB | Mode Light Desktop (verticale blanc) |
| hero3_poster.jpg | 42 KB | Image de preview |
| hero4.webm | 1.0 MB | Mode Dark Desktop (verticale noir) |
| hero1.webm | 9.0 MB | Desktop par défaut (16:9 blanc) |
| hero2.webm | 4.1 MB | Mobile (16:9 noir) |

## 🎯 Test

1. Allez sur http://localhost:3030
2. **En mode LIGHT** sur Desktop → La vidéo verticale blanc (hero3) se lance automatiquement
3. Basculez en mode DARK → La vidéo change pour verticale noir (hero4)
4. Sur mobile → Vidéo 16:9

## 💡 Notes techniques

Le composant `hero-aurora.tsx` :
- Détecte automatiquement le thème (light/dark)
- Détecte la taille d'écran (desktop/mobile)
- Change la vidéo en fonction
- Utilise `key={video-${theme}-${device}}` pour forcer le rechargement

## ❓ Dépannage

Si les vidéos ne se chargent pas :
1. Vérifiez que les fichiers sont dans `public/`
2. Redémarrez le serveur Next.js
3. Videz le cache du navigateur (Cmd+Shift+R)

Si la lecture automatique ne fonctionne pas :
- Chrome/Safari bloquent parfois l'autoplay
- Solution : Interagissez avec la page (un clic suffit)

## 📝 Personnalisation

Pour changer l'ordre des vidéos, modifiez dans `components/hero-aurora.tsx` :

```jsx
// Ligne 197-220
{resolvedTheme === 'light' && isDesktop ? (
  // Votre vidéo pour mode Light Desktop
  <source src="/hero3.webm" type="video/webm" />
) : resolvedTheme === 'dark' && isDesktop ? (
  // Votre vidéo pour mode Dark Desktop  
  <source src="/hero4.webm" type="video/webm" />
)}
```
