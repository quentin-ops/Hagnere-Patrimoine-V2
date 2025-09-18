# 🚀 Démarrage Rapide - Authentification

## Configuration en 5 minutes

### 1. Créer le fichier de configuration

Créez un fichier `.env.local` à la racine du projet :

```bash
# Copiez ces lignes dans .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/hagnere_patrimoine?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="changez-ceci-avec-un-secret-securise-de-32-caracteres-minimum"
```

### 2. Générer un secret sécurisé

```bash
# Dans le terminal, générez un secret
openssl rand -base64 32

# Copiez le résultat et remplacez NEXTAUTH_SECRET dans .env.local
```

### 3. Installer PostgreSQL (si nécessaire)

```bash
# macOS
brew install postgresql
brew services start postgresql

# Créer la base de données
createdb hagnere_patrimoine
```

### 4. Initialiser la base de données

```bash
# Installer les dépendances
npm install

# Créer les tables
npx prisma migrate deploy

# Générer le client Prisma
npx prisma generate
```

### 5. Créer un utilisateur de test

```bash
# Méthode 1 : Utilisateur de test automatique
npm run auth:create-test-user

# Cela créera :
# Email : admin@hagnere-patrimoine.fr
# Mot de passe : Admin123!
```

OU

```bash
# Méthode 2 : Configuration interactive
npm run auth:setup

# Suivez les instructions pour créer votre propre utilisateur
```

### 6. Lancer et tester

```bash
# Démarrer l'application
npm run dev

# Ouvrir dans le navigateur
# http://localhost:3000/connexion
```

## 🧪 Scripts de diagnostic

### Vérifier la configuration

```bash
# Tester tout le système
npm run auth:test

# Lister les utilisateurs existants
npm run auth:list-users

# Tester une connexion spécifique
npm run auth:test "email@exemple.com" "motdepasse"
```

### Réinitialiser un mot de passe

```bash
npm run set-password "email@exemple.com" "nouveau-mot-de-passe"
```

## 🔧 Dépannage rapide

### Erreur "Cannot connect to database"

```bash
# Vérifier que PostgreSQL est lancé
brew services list

# Redémarrer PostgreSQL
brew services restart postgresql
```

### Erreur "Tables don't exist"

```bash
# Créer les tables
npx prisma migrate deploy
```

### Erreur "NEXTAUTH_SECRET not set"

Assurez-vous que `.env.local` existe et contient `NEXTAUTH_SECRET`.

### Mot de passe oublié

```bash
# Réinitialiser pour l'utilisateur de test
npm run auth:create-test-user

# Ou pour un autre utilisateur
npm run set-password "votre@email.com" "nouveau-mot-de-passe"
```

## 📝 Checklist de vérification

- [ ] PostgreSQL est installé et lancé
- [ ] La base de données `hagnere_patrimoine` existe
- [ ] Le fichier `.env.local` existe avec les bonnes variables
- [ ] `NEXTAUTH_SECRET` est défini (32+ caractères)
- [ ] Les tables sont créées (`npx prisma migrate deploy`)
- [ ] Au moins un utilisateur existe (`npm run auth:list-users`)
- [ ] L'application démarre sans erreur (`npm run dev`)

## 🎯 Test final

1. Aller à http://localhost:3000/connexion
2. Utiliser les identifiants créés
3. Après connexion → Redirection vers /backoffice

---

**Besoin d'aide ?** Exécutez `npm run auth:test` pour un diagnostic complet.
