# 🔴 CORRECTION URGENTE - Système d'Authentification

## ⚠️ Le problème

Votre fichier `.env.local` a des variables incorrectes qui empêchent la connexion :
- `NEXTAUTH_URL` est sur le port 3003 au lieu de 3000
- `NEXTAUTH_SECRET` est trop court (il faut minimum 32 caractères)
- `DATABASE_URL` est manquant

## ✅ Solution rapide (2 minutes)

### Étape 1 : Ouvrir le fichier `.env.local`

Dans votre éditeur, ouvrez :
```
/Users/quentinhagnere/Development/Hagnéré Patrimoine/hagnere-patrimoine/.env.local
```

### Étape 2 : Remplacer TOUT le contenu par ceci :

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/hagnere_patrimoine?schema=public"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-tres-long-et-securise-avec-plus-de-32-caracteres-ici

# AWS S3 Configuration 
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=AKIA2NX46MXORQJECK4I
AWS_SECRET_ACCESS_KEY=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
AWS_BUCKET_NAME=hagnerepatrimoine

# Synchronisation articles
INVESTISSEMENT_API_BASE=https://hagnere-investissement.fr
INVESTISSEMENT_SYNC_SECRET=integration-sync-secret
PATRIMOINE_BASE_URL=http://localhost:3000
PATRIMOINE_SYNC_SECRET=integration-sync-secret
```

### Étape 3 : Arrêter et relancer le serveur

Dans le terminal :
```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer :
npm run dev
```

## 📝 Identifiants de connexion

Deux comptes sont disponibles :

### Compte test :
- **Email :** admin@hagnere-patrimoine.fr
- **Mot de passe :** Admin123!

### Votre compte :
- **Email :** quentin@hagnere-patrimoine.fr
- **Mot de passe :** (celui que vous avez défini)

## 🧪 Test

1. Allez à : http://localhost:3000/connexion
2. Entrez les identifiants ci-dessus
3. Vous serez redirigé vers /backoffice

## 🚨 Si ça ne marche toujours pas

Exécutez dans le terminal :

```bash
# Vérifier la configuration
npm run auth:test

# Lister les utilisateurs
npm run auth:list-users

# Réinitialiser le compte test
npm run auth:create-test-user
```

## 💡 Générer un nouveau NEXTAUTH_SECRET sécurisé

```bash
openssl rand -base64 32
```

Copiez le résultat et remplacez `NEXTAUTH_SECRET` dans `.env.local`
