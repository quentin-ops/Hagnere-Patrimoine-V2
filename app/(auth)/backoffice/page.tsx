import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Building2, MessageSquare } from "lucide-react"
import Link from "next/link"

export default async function BackOfficePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/connexion")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre espace d'administration
        </p>
      </div>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accès rapide aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/backoffice/articles">
                <FileText className="h-4 w-4 mr-2" />
                Articles
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/backoffice/projets">
                <Building2 className="h-4 w-4 mr-2" />
                Projets
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/backoffice/messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/backoffice/utilisateurs">
                <Users className="h-4 w-4 mr-2" />
                Utilisateurs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}