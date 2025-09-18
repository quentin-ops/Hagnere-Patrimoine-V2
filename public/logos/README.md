# Upload des Logos sur AWS S3

## 📁 Fichiers à placer dans ce dossier

Placez les 4 versions du logo dans ce dossier avec les noms suivants :

1. **logo-hagnere-elite-light.png** 
   - Logo Hagnéré Patrimoine Elite - Version claire
   - Fond gris clair avec texte noir

2. **logo-hagnere-elite-dark.png**
   - Logo Hagnéré Patrimoine Elite - Version sombre  
   - Fond gris foncé avec texte blanc

3. **logo-patrimoine-black.png**
   - Logo Patrimoine seul - Version noire
   - Texte noir sur fond transparent

4. **logo-hagnere-patrimoine-white.png**
   - Logo Hagnéré Patrimoine complet - Version blanche
   - Texte blanc avec "Patrimoine" dans un rectangle blanc sur fond noir

## 🚀 Méthode 1: Upload via l'interface web (Recommandé)

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrez votre navigateur et allez à :
   ```
   http://localhost:3000/upload-logos
   ```

3. Sélectionnez les 4 fichiers logos

4. Cliquez sur "Uploader sur S3"

5. Les URLs S3 seront affichées - vous pouvez les copier pour les utiliser

## 🛠️ Méthode 2: Upload via script Node.js

1. Placez les 4 images dans ce dossier (`public/logos/`)

2. Assurez-vous que le serveur Next.js est en cours d'exécution :
   ```bash
   npm run dev
   ```

3. Dans un nouveau terminal, exécutez :
   ```bash
   node scripts/upload-logos.js
   ```

4. Les URLs seront affichées dans le terminal et sauvegardées dans `uploaded-urls.json`

## 📝 Variables d'environnement requises

Assurez-vous que ces variables sont configurées dans votre fichier `.env.local` :

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=eu-north-1
AWS_S3_BUCKET_NAME=your_bucket_name
```

## 🔗 URLs après upload

Une fois uploadés, les logos seront accessibles via des URLs S3 publiques du format :
```
https://[bucket-name].s3.[region].amazonaws.com/logos/[timestamp]-[filename]
```

Ces URLs peuvent être utilisées directement dans votre application React/Next.js.
