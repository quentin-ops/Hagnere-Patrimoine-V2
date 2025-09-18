import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function createAdminUser() {
  const email = process.argv[2]
  const password = process.argv[3]
  const name = process.argv[4] || "Admin"

  if (!email || !password) {
    console.error("Usage: npm run create-admin <email> <password> [name]")
    process.exit(1)
  }

  try {
    // Hash du mot de passe
    const passwordHash = await bcrypt.hash(password, 10)

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "ADMIN",
      },
    })

    console.log("✅ Utilisateur admin créé avec succès:")
    console.log(`Email: ${user.email}`)
    console.log(`Nom: ${user.name}`)
    console.log(`Rôle: ${user.role}`)
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'utilisateur:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()