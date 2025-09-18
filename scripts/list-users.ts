import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function listUsers() {
  console.log("📋 Liste des utilisateurs")
  console.log("=" .repeat(50))

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    })

    if (users.length === 0) {
      console.log("\n⚠️  Aucun utilisateur trouvé dans la base de données")
      console.log("\nPour créer un utilisateur, exécutez :")
      console.log("  npm run auth:setup")
      console.log("ou")
      console.log("  npm run create-admin <email> <password> [nom]")
      return
    }

    console.log(`\n✅ ${users.length} utilisateur(s) trouvé(s) :\n`)

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`)
      console.log(`   Nom : ${user.name || "Non défini"}`)
      console.log(`   Rôle : ${user.role}`)
      console.log(`   ID : ${user.id}`)
      console.log(`   Créé le : ${user.createdAt.toLocaleDateString("fr-FR")}`)
      console.log(`   Mot de passe : ${user.passwordHash ? "Défini" : "Non défini"}`)
      console.log("")
    })

    console.log("-" .repeat(50))
    console.log("\n💡 Actions disponibles :")
    console.log("  - Créer un utilisateur : npm run auth:setup")
    console.log("  - Réinitialiser un mot de passe : npm run set-password <email> <nouveau-mot-de-passe>")

  } catch (error) {
    console.error("❌ Erreur lors de la récupération des utilisateurs :", error)
    
    if (error instanceof Error && error.message.includes("P1001")) {
      console.error("\n⚠️  Impossible de se connecter à la base de données")
      console.error("Vérifiez que PostgreSQL est lancé et que DATABASE_URL est correcte dans .env.local")
    }
  } finally {
    await prisma.$disconnect()
  }
}

listUsers()
