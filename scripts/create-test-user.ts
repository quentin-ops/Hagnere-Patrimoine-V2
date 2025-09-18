import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function createTestUser() {
  // Utilisateur de test par défaut
  const defaultEmail = "admin@hagnere-patrimoine.fr"
  const defaultPassword = "Admin123!"
  const defaultName = "Administrateur"

  console.log("🧪 Création d'un utilisateur de test")
  console.log("=" .repeat(50))

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: defaultEmail },
    })

    if (existingUser) {
      console.log("\n⚠️  L'utilisateur de test existe déjà")
      console.log(`  Email : ${existingUser.email}`)
      
      // Mettre à jour le mot de passe
      const passwordHash = await bcrypt.hash(defaultPassword, 10)
      await prisma.user.update({
        where: { email: defaultEmail },
        data: {
          passwordHash,
          name: defaultName,
          role: "ADMIN",
        },
      })
      
      console.log("\n✅ Mot de passe réinitialisé")
    } else {
      // Créer le nouvel utilisateur
      const passwordHash = await bcrypt.hash(defaultPassword, 10)
      const user = await prisma.user.create({
        data: {
          email: defaultEmail,
          passwordHash,
          name: defaultName,
          role: "ADMIN",
        },
      })

      console.log("\n✅ Utilisateur de test créé")
    }

    console.log("\n📝 Identifiants de connexion :")
    console.log(`  Email : ${defaultEmail}`)
    console.log(`  Mot de passe : ${defaultPassword}`)
    console.log(`  Rôle : ADMIN`)
    
    console.log("\n🚀 Pour tester :")
    console.log("  1. Lancez l'application : npm run dev")
    console.log("  2. Allez à : http://localhost:3000/connexion")
    console.log("  3. Connectez-vous avec les identifiants ci-dessus")
    
    console.log("\n⚠️  IMPORTANT : Changez ce mot de passe en production !")

  } catch (error) {
    console.error("\n❌ Erreur :", error)
    
    if (error instanceof Error && error.message.includes("P1001")) {
      console.error("\n⚠️  Impossible de se connecter à la base de données")
      console.error("Assurez-vous que :")
      console.error("  1. PostgreSQL est lancé")
      console.error("  2. Le fichier .env.local existe avec DATABASE_URL")
      console.error("  3. Les tables sont créées : npx prisma migrate deploy")
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()
