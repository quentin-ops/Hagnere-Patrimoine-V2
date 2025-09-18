import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import readline from "readline"
import { promisify } from "util"

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = promisify(rl.question).bind(rl)

async function resetUsers() {
  console.log("🔄 Réinitialisation des utilisateurs")
  console.log("=" .repeat(50))

  try {
    // Test de connexion à la base de données
    console.log("\n📊 Connexion à la base de données...")
    await prisma.$connect()
    console.log("✅ Connexion réussie")

    // Afficher les utilisateurs existants
    const existingUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true },
    })

    if (existingUsers.length > 0) {
      console.log(`\n⚠️  ${existingUsers.length} utilisateur(s) existant(s) :`)
      existingUsers.forEach(user => {
        console.log(`  - ${user.email} (${user.name || "sans nom"})`)
      })

      const confirmDelete = await question("\n🗑️  Voulez-vous SUPPRIMER tous ces utilisateurs ? (oui/non) : ")
      
      if (confirmDelete.toLowerCase() === "oui" || confirmDelete.toLowerCase() === "o") {
        console.log("\nSuppression des utilisateurs...")
        await prisma.user.deleteMany()
        console.log("✅ Tous les utilisateurs ont été supprimés")
      } else {
        console.log("❌ Suppression annulée")
        process.exit(0)
      }
    } else {
      console.log("\n✅ Aucun utilisateur existant")
    }

    // Créer un nouvel utilisateur
    console.log("\n🆕 Création d'un nouvel utilisateur")
    console.log("-" .repeat(50))

    const createNew = await question("\nVoulez-vous créer un nouvel utilisateur ? (oui/non) : ")
    
    if (createNew.toLowerCase() !== "oui" && createNew.toLowerCase() !== "o") {
      console.log("✨ Terminé sans créer d'utilisateur")
      process.exit(0)
    }

    const email = await question("Email : ") as string
    const name = await question("Nom : ") as string
    const password = await question("Mot de passe : ") as string

    if (!email || !password) {
      throw new Error("Email et mot de passe sont requis")
    }

    // Créer le nouvel utilisateur
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        passwordHash,
        name,
        role: "ADMIN",
      },
    })

    console.log("\n✅ Utilisateur créé avec succès :")
    console.log(`  Email : ${user.email}`)
    console.log(`  Nom : ${user.name}`)
    console.log(`  Rôle : ${user.role}`)

    console.log("\n🚀 Pour vous connecter :")
    console.log("  1. Lancez le serveur : npm run dev")
    console.log("  2. Allez à : http://localhost:3000/connexion")
    console.log(`  3. Utilisez : ${user.email} / [votre mot de passe]`)

  } catch (error) {
    console.error("\n❌ Erreur :", error)
    
    if (error instanceof Error) {
      if (error.message.includes("P1001")) {
        console.error("\n⚠️  Impossible de se connecter à la base de données")
        console.error("\nSi vous utilisez NeonDB :")
        console.error("1. Vérifiez votre connexion Internet")
        console.error("2. Vérifiez que DATABASE_URL dans .env.local est correct")
        console.error("3. Format attendu : postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require")
      }
    }
    
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

resetUsers()
