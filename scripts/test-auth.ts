import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function testAuth() {
  console.log("🧪 Test du système d'authentification")
  console.log("=" .repeat(50))

  // 1. Vérifier les variables d'environnement
  console.log("\n📋 Variables d'environnement :")
  console.log(`  DATABASE_URL : ${process.env.DATABASE_URL ? "✅ Définie" : "❌ Manquante"} `)
  console.log(`  NEXTAUTH_URL : ${process.env.NEXTAUTH_URL ? "✅ Définie" : "❌ Manquante"} - ${process.env.NEXTAUTH_URL || ""}`)
  console.log(`  NEXTAUTH_SECRET : ${process.env.NEXTAUTH_SECRET ? "✅ Définie" : "❌ Manquante"}`)
  
  if (!process.env.DATABASE_URL) {
    console.error("\n❌ DATABASE_URL n'est pas définie dans .env.local")
    console.error("Créez un fichier .env.local avec DATABASE_URL")
    process.exit(1)
  }

  if (!process.env.NEXTAUTH_SECRET) {
    console.warn("\n⚠️  NEXTAUTH_SECRET n'est pas définie")
    console.warn("Générez un secret avec : openssl rand -base64 32")
  }

  try {
    // 2. Test de connexion à la base de données
    console.log("\n🔌 Test de connexion à la base de données...")
    await prisma.$connect()
    console.log("✅ Connexion réussie")

    // 3. Vérifier les utilisateurs
    console.log("\n👥 Utilisateurs dans la base de données :")
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true,
        createdAt: true,
      },
    })

    if (users.length === 0) {
      console.log("⚠️  Aucun utilisateur trouvé")
      console.log("\n💡 Créez un utilisateur avec : npm run auth:setup")
    } else {
      users.forEach((user, index) => {
        console.log(`\n  ${index + 1}. ${user.email}`)
        console.log(`     - Nom : ${user.name || "Non défini"}`)
        console.log(`     - Rôle : ${user.role}`)
        console.log(`     - Mot de passe : ${user.passwordHash ? "✅ Défini" : "❌ Non défini"}`)
        console.log(`     - Créé le : ${user.createdAt.toLocaleDateString("fr-FR")}`)
      })
    }

    // 4. Test de validation d'un mot de passe (si des arguments sont fournis)
    const testEmail = process.argv[2]
    const testPassword = process.argv[3]

    if (testEmail && testPassword) {
      console.log(`\n🔐 Test de connexion pour : ${testEmail}`)
      
      const user = await prisma.user.findUnique({
        where: { email: testEmail.trim().toLowerCase() },
      })

      if (!user) {
        console.log("❌ Utilisateur non trouvé")
      } else if (!user.passwordHash) {
        console.log("❌ L'utilisateur n'a pas de mot de passe défini")
      } else {
        const isValid = await bcrypt.compare(testPassword, user.passwordHash)
        if (isValid) {
          console.log("✅ Mot de passe correct - Connexion autorisée")
        } else {
          console.log("❌ Mot de passe incorrect")
        }
      }
    } else {
      console.log("\n💡 Pour tester une connexion : npm run auth:test <email> <password>")
    }

    // 5. Vérifier la configuration NextAuth
    console.log("\n🔧 Configuration NextAuth :")
    console.log(`  - Page de connexion : /connexion`)
    console.log(`  - Redirection après connexion : /backoffice`)
    console.log(`  - Middleware protège : /backoffice/*`)

    console.log("\n✅ Tests terminés")
    console.log("\n📝 Prochaines étapes :")
    console.log("1. Si .env.local n'existe pas, créez-le avec les variables nécessaires")
    console.log("2. Si aucun utilisateur n'existe : npm run auth:setup")
    console.log("3. Lancez l'application : npm run dev")
    console.log("4. Connectez-vous à : http://localhost:3000/connexion")

  } catch (error) {
    console.error("\n❌ Erreur lors des tests :", error)
    
    if (error instanceof Error) {
      if (error.message.includes("P1001")) {
        console.error("\n⚠️  Impossible de se connecter à la base de données")
        console.error("Vérifiez que :")
        console.error("  1. PostgreSQL est lancé")
        console.error("  2. La base de données existe")
        console.error("  3. DATABASE_URL est correcte dans .env.local")
        console.error("\nPour créer la base de données : createdb hagnere_patrimoine")
      } else if (error.message.includes("P2021")) {
        console.error("\n⚠️  Les tables n'existent pas dans la base de données")
        console.error("Exécutez : npx prisma migrate deploy")
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

testAuth()
