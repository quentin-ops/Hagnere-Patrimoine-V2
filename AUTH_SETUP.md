# Configuration du Système d'Authentification

## 1. Configuration des Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/hagnere_patrimoine?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-tres-securise-minimum-32-caracteres"

# AWS S3 (optionnel)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="eu-west-3"
AWS_BUCKET_NAME="hagnere-patrimoine"

# Environment
NODE_ENV="development"
```

### Génération du NEXTAUTH_SECRET

Pour générer un secret sécurisé, exécutez :

```bash
openssl rand -base64 32
```

## 2. Configuration de la Base de Données

### Installation de PostgreSQL

Si PostgreSQL n'est pas installé :

```bash
# macOS avec Homebrew
brew install postgresql
brew services start postgresql

# Créer la base de données
createdb hagnere_patrimoine
```

### Initialisation de Prisma

```bash
# Installer les dépendances
npm install

# Créer les tables dans la base de données
npx prisma migrate deploy

# Générer le client Prisma
npx prisma generate
```

## 3. Création d'un Utilisateur Administrateur

### Méthode 1 : Utiliser le script fourni

```bash
npm run create-admin "votre@email.com" "votremotdepasse" "Votre Nom"
```

### Méthode 2 : Utiliser le script de setup

```bash
npm run auth:setup
```

Ce script va :
- Vérifier la connexion à la base de données
- Créer les tables si nécessaire
- Créer un utilisateur administrateur par défaut

## 4. Test de Connexion

1. Lancez l'application :
```bash
npm run dev
```

2. Accédez à : http://localhost:3000/connexion

3. Connectez-vous avec les identifiants créés

## 5. Dépannage

### Erreur "NEXTAUTH_SECRET is not set"

Assurez-vous que le fichier `.env.local` existe et contient `NEXTAUTH_SECRET`.

### Erreur de connexion à la base de données

Vérifiez que PostgreSQL est lancé et que l'URL de connexion est correcte :

```bash
# Tester la connexion
npx prisma db push
```

### Mot de passe incorrect

Si vous avez oublié le mot de passe, utilisez le script pour le réinitialiser :

```bash
npm run set-password "votre@email.com" "nouveaumotdepasse"
```

### Vérifier les utilisateurs existants

```bash
npm run auth:list-users
```

## 6. Configuration en Production

Pour la production, modifiez :

```env
NODE_ENV="production"
NEXTAUTH_URL="https://votre-domaine.com"
DATABASE_URL="votre-url-de-base-de-donnees-production"
```

## Support

En cas de problème, consultez les logs dans la console du navigateur et du serveur pour identifier l'erreur.
