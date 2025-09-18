import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

// Générer un secret sécurisé
const generateSecret = () => {
  return crypto.randomBytes(32).toString('base64')
}

const envContent = `# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/hagnere_patrimoine?schema=public"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${generateSecret()}

# AWS S3 Configuration (conserver vos valeurs existantes)
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=AKIA2NX46MXORQJECK4I
AWS_SECRET_ACCESS_KEY=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
AWS_BUCKET_NAME=hagnerepatrimoine

# Synchronisation articles
INVESTISSEMENT_API_BASE=https://hagnere-investissement.fr
INVESTISSEMENT_SYNC_SECRET=integration-sync-secret
PATRIMOINE_BASE_URL=http://localhost:3000
PATRIMOINE_SYNC_SECRET=integration-sync-secret`

const envPath = path.resolve(process.cwd(), '.env.local')

// Vérifier si le fichier existe déjà
if (fs.existsSync(envPath)) {
  console.log('⚠️  Le fichier .env.local existe déjà')
  console.log('📝 Contenu recommandé pour .env.local :')
  console.log('=====================================')
  console.log(envContent)
  console.log('=====================================')
  console.log('\n💡 Pour remplacer le fichier existant, supprimez-le d\'abord :')
  console.log('   rm .env.local')
  console.log('   npm run setup:env')
} else {
  // Créer le fichier
  fs.writeFileSync(envPath, envContent)
  console.log('✅ Fichier .env.local créé avec succès !')
  console.log('\n📝 Variables configurées :')
  console.log('  - DATABASE_URL')
  console.log('  - NEXTAUTH_URL')
  console.log('  - NEXTAUTH_SECRET (généré automatiquement)')
  console.log('  - AWS_* (configuration S3)')
  console.log('\n🚀 Prochaines étapes :')
  console.log('  1. Vérifiez que PostgreSQL est lancé')
  console.log('  2. Créez la base de données : createdb hagnere_patrimoine')
  console.log('  3. Appliquez les migrations : npx prisma migrate deploy')
  console.log('  4. Créez un utilisateur : npm run auth:create-test-user')
  console.log('  5. Lancez le serveur : npm run dev')
}
