# Configuration avec NeonDB

## 1. Récupérer votre URL de connexion NeonDB

1. Connectez-vous à : https://console.neon.tech
2. Sélectionnez votre projet
3. Dans "Connection Details", copiez la "Connection string"

Elle ressemble à :
```
postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/dbname?sslmode=require
```

## 2. Mettre à jour .env.local

Remplacez DATABASE_URL par votre URL NeonDB :

```env
# NeonDB Configuration (remplacez par votre URL)
DATABASE_URL="postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/dbname?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Iu/ijFW5B+6idPjumJKep6G8jk9g8J6iNTCMZSYUFBo=

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

## 3. Créer les tables dans NeonDB

```bash
npx prisma migrate deploy
```

## 4. Créer un nouvel utilisateur

```bash
npm run auth:create-test-user
```

Ou pour un compte personnalisé :
```bash
npm run auth:setup
```
