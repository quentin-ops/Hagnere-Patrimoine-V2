# 🚀 INSTRUCTIONS POUR LANCER LE SERVEUR

## 1️⃣ ARRÊTER TOUT

Dans le terminal où le serveur tourne :
- Appuyez sur `Ctrl+C` pour arrêter le serveur

## 2️⃣ RELANCER LE SERVEUR

Dans le terminal, depuis le dossier `hagnere-patrimoine` :

```bash
npm run dev
```

## 3️⃣ ATTENDRE QUE LE SERVEUR DÉMARRE

Vous devriez voir :
```
▲ Next.js 15.5.3
- Local:        http://localhost:3000
- Network:      http://192.168.1.14:3000
✓ Ready in ...
```

## 4️⃣ OUVRIR LA PAGE DE CONNEXION

Dans votre navigateur :
http://localhost:3000/connexion

## 5️⃣ SE CONNECTER

Utilisez ces identifiants :
- **Email :** admin@hagnere-patrimoine.fr
- **Mot de passe :** Admin123!

## ⚠️ SI ÇA NE MARCHE PAS

### Vérifiez votre fichier `.env.local`

Il DOIT contenir :
```
NEXTAUTH_URL=http://localhost:3000
```
(PAS 3001, PAS 3003, SEULEMENT 3000)

### Redémarrez tout

1. Arrêtez le serveur (Ctrl+C)
2. Fermez le terminal
3. Ouvrez un nouveau terminal
4. Allez dans le dossier : `cd "Hagnéré Patrimoine/hagnere-patrimoine"`
5. Lancez : `npm run dev`

## 📝 Commandes de diagnostic

Si ça ne marche toujours pas :

```bash
# Vérifier les utilisateurs
npm run auth:list-users

# Tester la configuration
npm run auth:test

# Recréer l'utilisateur de test
npm run auth:create-test-user
```
