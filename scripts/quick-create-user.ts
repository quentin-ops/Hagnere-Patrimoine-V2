import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function quickCreateUser() {
  // Compte par défaut pour Quentin
  const defaultEmail = "quentin@hagnere-patrimoine.fr"
  const defaultPassword = "Patrimoine2024!"
  const defaultName = "Quentin Hagnéré"

  console.log("🚀 Création rapide d'un utilisateur")
  console.log("=" .repeat(50))

  try {
    await prisma.$connect()
    console.log("✅ Connexion à la base de données réussie")

    // Supprimer l'ancien compte s'il existe
    const existing = await prisma.user.findUnique({
      where: { email: defaultEmail },
    })

    if (existing) {
      await prisma.user.delete({
        where: { email: defaultEmail },
      })
      console.log("✅ Ancien compte supprimé")
    }

    // Créer le nouveau compte
    const passwordHash = await bcrypt.hash(defaultPassword, 10)
    const user = await prisma.user.create({
      data: {
        email: defaultEmail,
        passwordHash,
        name: defaultName,
        role: "ADMIN",
      },
    })

    console.log("\n✅ Compte créé avec succès !")
    console.log("\n📝 Identifiants de connexion :")
    console.log(`  Email : ${defaultEmail}`)
    console.log(`  Mot de passe : ${defaultPassword}`)
    console.log(`  Rôle : ADMIN`)
    
    console.log("\n🔐 Pour vous connecter :")
    console.log("  1. Allez à : http://localhost:3000/connexion")
    console.log("  2. Utilisez les identifiants ci-dessus")
    
    console.log("\n⚠️  IMPORTANT : Changez ce mot de passe après votre première connexion !")

  } catch (error) {
    console.error("\n❌ Erreur :", error)
    
    if (error instanceof Error) {
      if (error.message.includes("P1001") || error.message.includes("Can't reach database")) {
        console.error("\n🔧 SOLUTION :")
        console.error("\n1. Si vous utilisez NeonDB :")
        console.error("   - Connectez-vous à https://console.neon.tech")
        console.error("   - Copiez votre connection string")
        console.error("   - Mettez-la dans DATABASE_URL dans .env.local")
        console.error("\n2. Si vous utilisez PostgreSQL local :")
        console.error("   - Démarrez PostgreSQL : brew services start postgresql@14")
        console.error("   - Créez la base : createdb hagnere_patrimoine")
      }
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

quickCreateUser()
