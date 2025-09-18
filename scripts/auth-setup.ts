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

async function setupAuth() {
  console.log("🔐 Configuration du système d'authentification")
  console.log("=" .repeat(50))

  try {
    // Test de connexion à la base de données
    console.log("\n📊 Test de connexion à la base de données...")
    await prisma.$connect()
    console.log("✅ Connexion à la base de données réussie")

    // Vérifier si des utilisateurs existent déjà
    const userCount = await prisma.user.count()
    console.log(`\n👥 Nombre d'utilisateurs existants : ${userCount}`)

    if (userCount > 0) {
      const users = await prisma.user.findMany({
        select: { email: true, name: true, role: true },
      })
      console.log("\nUtilisateurs existants :")
      users.forEach(user => {
        console.log(`  - ${user.email} (${user.name}) - Rôle : ${user.role}`)
      })

      const answer = await question("\nVoulez-vous créer un nouvel utilisateur ? (o/n) : ")
      if (answer.toLowerCase() !== "o" && answer.toLowerCase() !== "oui") {
        console.log("✨ Configuration terminée")
        process.exit(0)
      }
    }

    console.log("\n🆕 Création d'un nouvel utilisateur administrateur")
    console.log("-" .repeat(50))

    // Demander les informations
    const email = await question("Email : ") as string
    const name = await question("Nom : ") as string
    const password = await question("Mot de passe : ") as string

    // Validation basique
    if (!email || !password) {
      throw new Error("Email et mot de passe sont requis")
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    })

    if (existingUser) {
      const updateAnswer = await question("\n⚠️  Cet email existe déjà. Voulez-vous mettre à jour le mot de passe ? (o/n) : ")
      
      if (updateAnswer.toLowerCase() === "o" || updateAnswer.toLowerCase() === "oui") {
        const passwordHash = await bcrypt.hash(password, 10)
        await prisma.user.update({
          where: { email: email.trim().toLowerCase() },
          data: { passwordHash },
        })
        console.log("✅ Mot de passe mis à jour avec succès")
      }
    } else {
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
    }

    console.log("\n📝 Prochaines étapes :")
    console.log("1. Assurez-vous que le fichier .env.local existe avec :")
    console.log("   - DATABASE_URL")
    console.log("   - NEXTAUTH_URL=http://localhost:3000")
    console.log("   - NEXTAUTH_SECRET (générez avec : openssl rand -base64 32)")
    console.log("\n2. Lancez l'application : npm run dev")
    console.log("3. Connectez-vous à : http://localhost:3000/connexion")

  } catch (error) {
    console.error("\n❌ Erreur :", error)
    
    if (error instanceof Error && error.message.includes("P1001")) {
      console.error("\n⚠️  Impossible de se connecter à la base de données")
      console.error("Vérifiez que PostgreSQL est lancé et que DATABASE_URL est correcte dans .env.local")
    }
    
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

setupAuth()
