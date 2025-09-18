# 🔴 CORRECTION URGENTE - Fichier .env.local

## LE PROBLÈME TROUVÉ

Votre fichier `.env.local` a une **ERREUR DE SYNTAXE** sur la ligne NEXTAUTH_URL :

❌ **ACTUELLEMENT (INCORRECT) :**
```
NEXTAUTH_URL=   NEXTAUTH_URL=http://localhost:3000
```

✅ **DOIT ÊTRE :**
```
NEXTAUTH_URL=http://localhost:3000
```

## SOLUTION IMMÉDIATE

### Option 1 : Remplacer tout le fichier (RECOMMANDÉ)

1. **Supprimez** votre fichier `.env.local` actuel
2. **Renommez** le fichier `env.local.correct` en `.env.local`

Dans le terminal :
```bash
rm .env.local
mv env.local.correct .env.local
```

### Option 2 : Corriger manuellement

1. **Ouvrez** `.env.local` dans votre éditeur
2. **Trouvez** la ligne avec l'erreur :
   ```
   NEXTAUTH_URL=   NEXTAUTH_URL=http://localhost:3000
   ```
3. **Remplacez-la** par :
   ```
   NEXTAUTH_URL=http://localhost:3000
   ```
4. **Sauvegardez** le fichier

## APRÈS LA CORRECTION

1. **Arrêtez** le serveur : `Ctrl+C`
2. **Relancez** : `npm run dev`
3. **Testez** : http://localhost:3000/connexion

## IDENTIFIANTS

- Email : `admin@hagnere-patrimoine.fr`
- Mot de passe : `Admin123!`

---

**C'EST CETTE LIGNE MAL FORMATÉE QUI CAUSE L'ERREUR 500 !**
