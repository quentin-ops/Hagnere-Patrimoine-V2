#!/usr/bin/env tsx

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  const password = process.argv[3]

  if (!email || !password) {
    console.error("Usage: npm run set-password <email> <password>")
    process.exit(1)
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash,
      },
      create: {
        email,
        passwordHash,
        name: email.split("@")[0] ?? "Utilisateur",
        role: "ADMIN",
      },
    })

    console.log("✅ Mot de passe mis à jour")
    console.log(`Email: ${user.email}`)
    console.log(`Rôle: ${user.role}`)
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du mot de passe:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

