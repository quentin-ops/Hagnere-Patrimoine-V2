# 📡 API Import Article - Documentation

## 🔒 Système de sécurité multi-couches

L'endpoint `/api/import/article` est protégé par **4 couches de sécurité** :

### 1️⃣ IP Whitelisting
Seules les IPs autorisées peuvent accéder à l'endpoint :
- ✅ `127.0.0.1` (localhost)
- ✅ `::1` (localhost IPv6)
- ✅ `192.168.1.14` (IP locale)
- ⚠️ Ajouter l'IP du serveur Hagnéré Investissement en production

### 2️⃣ Rate Limiting
- **Limite** : 10 requêtes maximum par minute
- **Fenêtre** : 60 secondes glissantes
- **Réinitialisation** : Automatique après 1 minute
- **Code erreur** : 429 (Too Many Requests)

### 3️⃣ Vérification de l'origine
Domaines autorisés uniquement :
- ✅ `https://hagnere-investissement.fr`
- ✅ `https://www.hagnere-investissement.fr`
- ✅ `http://localhost:3000` (développement)
- ✅ `http://localhost:3001` (développement alternatif)

### 4️⃣ Validation stricte du contenu

#### Limites de taille
| Champ | Min | Max |
|-------|-----|-----|
| Titre | 3 caractères | 200 caractères |
| Slug | - | 100 caractères |
| Excerpt | - | 500 caractères |
| Contenu | 10 caractères | 100 000 caractères |
| FAQ | - | 20 questions |
| Tags | - | 10 tags |

#### Règles de validation
- **Slug** : Uniquement lettres minuscules, chiffres et tirets (`/^[a-z0-9-]+$/`)
- **Status** : `DRAFT`, `PUBLISHED` ou `ARCHIVED` uniquement
- **FAQ** : Question max 200 car., réponse max 1000 car.

#### Détection anti-spam
Contenu suspect automatiquement bloqué :
- ❌ Mots-clés spam (casino, viagra, etc.)
- ❌ Code JavaScript (`<script>`, `onclick=`, etc.)
- ❌ Tentatives XSS
- ❌ Contenu adulte

### Codes de réponse
- **200** : Article importé avec succès
- **400** : Validation échouée (contenu invalide)
- **403** : Accès refusé (IP ou origine non autorisée)
- **429** : Trop de requêtes (rate limit)
- **500** : Erreur serveur

## 📤 Utilisation depuis Hagnéré Investissement

```javascript
// Exemple d'appel depuis Hagnéré Investissement
const response = await fetch('https://hagnere-patrimoine.fr/api/import/article', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    source: 'investissement',
    payload: {
      article: {
        slug: 'mon-article',
        title: 'Titre de l\'article',
        content: '<p>Contenu HTML</p>',
        status: 'PUBLISHED'
      }
    }
  })
})
```

## 🚧 Limitations

- L'endpoint n'est **PAS caché** (impossible techniquement)
- La protection se base sur l'header `Origin` ou `Referer`
- Les requêtes depuis des outils comme Postman peuvent falsifier l'origine

## 💡 Protection supplémentaire possible

Si besoin de plus de sécurité, on pourrait ajouter :
- Rate limiting (max X requêtes par minute)
- Validation stricte du contenu (longueur max, caractères autorisés)
- Webhook signature (HMAC)
- IP whitelisting côté serveur

## 🧪 Tests

```bash
# ✅ Test autorisé (depuis localhost)
curl -X POST http://localhost:3002/api/import/article \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"payload":{"article":{"slug":"test","title":"Test","content":"<p>Test</p>","status":"DRAFT"}}}'

# ❌ Test bloqué (origine non autorisée)
curl -X POST http://localhost:3002/api/import/article \
  -H "Content-Type: application/json" \
  -H "Origin: https://exemple-malveillant.com" \
  -d '{"payload":{"article":{"slug":"test","title":"Test","content":"<p>Test</p>","status":"DRAFT"}}}'
```
