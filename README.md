This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Synchronisation des articles Hagnéré Investissement

Un utilitaire CLI permet d'importer les articles publiés sur [hagnere-investissement.fr](https://hagnere-investissement.fr) dans la base Prisma locale via l'API `/api/import/article`.

### Variables d'environnement

Ajoutez les variables suivantes dans votre `.env.local` (ou exportez-les avant d'exécuter le script) :

```
# URL du site source (optionnelle)
INVESTISSEMENT_API_BASE=https://hagnere-investissement.fr

# Secret d'export côté Hagnéré Investissement (requis pour récupérer le contenu complet)
INVESTISSEMENT_SYNC_SECRET=...

# Cible Patrimoine (localhost par défaut)
PATRIMOINE_BASE_URL=http://localhost:3000
PATRIMOINE_SYNC_SECRET=...
```

> `INVESTISSEMENT_SYNC_SECRET` et `PATRIMOINE_SYNC_SECRET` doivent correspondre aux secrets configurés respectivement sur Hagnéré Investissement et sur cette application.

### Exécution

```bash
npm run sync:articles                # synchronise tous les articles publiés
npm run sync:articles -- --slug foo  # synchronise un article spécifique
npm run sync:articles -- --dry-run   # affiche les actions sans import
```

Flags disponibles : `--slug <slug>`, `--limit <n>`, `--dry-run`, `--force` (ignore les erreurs et continue).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
