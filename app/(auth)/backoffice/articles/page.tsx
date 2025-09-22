import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArticlesClient } from "./articles-client"

export default async function ArticlesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/connexion")
  }

  // Récupérer tous les articles depuis la base de données
  const articles = await prisma.article.findMany({
    include: {
      category: true,
      tags: true,
      syncLogs: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <ArticlesClient initialArticles={articles} />
}