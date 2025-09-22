# 📦 Configuration de la Synchronisation des Articles

## 🚀 Setup Rapide

### 1. Ajouter les variables d'environnement

Créez ou éditez le fichier `.env.local` à la racine du projet et ajoutez :

```env
# Secret de synchronisation (doit être identique côté Investissement)
PATRIMOINE_SYNC_SECRET="dev-secret-local-123"

# URL de retour vers Investissement si besoin
INVESTISSEMENT_API_BASE="http://localhost:3000"
INVESTISSEMENT_SYNC_SECRET="dev-secret-local-123"
```

### 2. Redémarrer le serveur

Après avoir ajouté les variables, redémarrez le serveur Next.js :

```bash
# Arrêter le serveur actuel (Ctrl+C)
# Relancer
npm run dev
```

### 3. Configuration côté Hagnéré Investissement

Dans le projet Hagnéré Investissement, ajoutez dans `.env.local` :

```env
# URL de Patrimoine (adaptez le port si nécessaire)
PATRIMOINE_BASE_URL="http://localhost:3000"
PATRIMOINE_SYNC_SECRET="dev-secret-local-123"
```

## ✅ Test de Synchronisation

### Option 1: Test manuel avec curl

```bash
curl -X POST http://localhost:3000/api/import/article \
  -H "Content-Type: application/json" \
  -H "x-sync-secret: dev-secret-local-123" \
  -d '{
    "source": "test",
    "payload": {
      "article": {
        "slug": "test-article",
        "title": "Article de Test",
        "content": {"type": "html", "value": "<p>Test</p>"},
        "status": "DRAFT"
      }
    }
  }'
```

### Option 2: Depuis Hagnéré Investissement

Dans le projet Investissement, exécutez :

```bash
npm run sync:patrimoine -- --slug=votre-article-slug
```

## 🔍 Vérification

### Voir les articles synchronisés

```bash
npx prisma studio
```
→ Ouvrez la table `Article` pour voir les articles importés
→ Ouvrez la table `ArticleSyncLog` pour voir l'historique

## 📝 Structure de l'API

### Endpoint
- **URL**: `/api/import/article`
- **Méthode**: POST
- **Header requis**: `x-sync-secret: [PATRIMOINE_SYNC_SECRET]`

### Payload attendu

```json
{
  "source": "investissement",
  "generatedAt": "2025-01-24T10:00:00Z",
  "payload": {
    "article": {
      "slug": "string",
      "title": "string",
      "excerpt": "string?",
      "content": {
        "type": "html",
        "value": "string"
      },
      "status": "DRAFT|PUBLISHED",
      "publishedAt": "date?",
      "coverImage": {
        "url": "string?",
        "alt": "string?"
      },
      "category": {
        "slug": "string",
        "name": "string"
      },
      "tags": [
        {
          "slug": "string",
          "name": "string"
        }
      ],
      "faq": [
        {
          "question": "string",
          "answer": "string"
        }
      ],
      "seo": {
        "title": "string?",
        "description": "string?"
      }
    }
  }
}
```

## 🛠️ Dépannage

### Erreur "Non autorisé"
→ Vérifiez que `PATRIMOINE_SYNC_SECRET` est défini dans `.env.local`
→ Redémarrez le serveur après avoir ajouté la variable

### Erreur de connexion
→ Vérifiez que le serveur Next.js est lancé
→ Vérifiez le port (par défaut 3000)

### Erreur Prisma
→ Exécutez `npx prisma generate` si le client n'est pas à jour
→ Exécutez `npx prisma db push` si les tables n'existent pas

## 📊 Monitoring

Les logs de synchronisation sont stockés dans la table `ArticleSyncLog` avec :
- `status`: "success" ou "error"
- `source`: D'où vient l'article
- `payload`: Les données reçues
- `error`: Message d'erreur si échec

## 🚀 Prochaines étapes

1. ✅ Configurer les variables d'environnement
2. ✅ Redémarrer le serveur
3. ✅ Tester avec un article de test
4. ✅ Synchroniser un vrai article depuis Investissement
