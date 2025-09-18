import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, FileText, Settings, LogOut, Building2, BarChart3 } from "lucide-react"
import Link from "next/link"

export default async function BackOfficePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/connexion")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Back-Office</h1>
                <p className="text-sm text-muted-foreground">Hagnéré Patrimoine</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Connecté en tant que: <strong>{session.user?.email}</strong>
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {session.user?.role}
              </span>
              <form action="/api/auth/signout" method="POST">
                <Button type="submit" variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bienvenue dans votre espace administrateur</CardTitle>
            <CardDescription>
              Gérez votre site, vos contenus et vos utilisateurs depuis ce tableau de bord.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projets */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Building2 className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <CardTitle className="mt-4">Projets</CardTitle>
              <CardDescription>Gérer les projets immobiliers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" asChild>
                <Link href="/backoffice/projets">Accéder aux projets</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Articles */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <FileText className="h-8 w-8 text-green-500" />
                <span className="text-2xl font-bold">24</span>
              </div>
              <CardTitle className="mt-4">Articles</CardTitle>
              <CardDescription>Gérer le blog et les contenus</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" asChild>
                <Link href="/backoffice/articles">Accéder aux articles</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Utilisateurs */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-purple-500" />
                <span className="text-2xl font-bold">3</span>
              </div>
              <CardTitle className="mt-4">Utilisateurs</CardTitle>
              <CardDescription>Gérer les comptes utilisateurs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" asChild>
                <Link href="/backoffice/utilisateurs">Gérer les utilisateurs</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
              <CardTitle className="mt-4">Statistiques</CardTitle>
              <CardDescription>Analyser les performances</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" asChild>
                <Link href="/backoffice/stats">Voir les statistiques</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Paramètres */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Settings className="h-8 w-8 text-gray-500" />
              </div>
              <CardTitle className="mt-4">Paramètres</CardTitle>
              <CardDescription>Configurer le site</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="secondary" asChild>
                <Link href="/backoffice/settings">Accéder aux paramètres</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Effectuez les tâches courantes rapidement</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline">
              Ajouter un projet
            </Button>
            <Button size="sm" variant="outline">
              Créer un article
            </Button>
            <Button size="sm" variant="outline">
              Inviter un utilisateur
            </Button>
            <Button size="sm" variant="outline">
              Exporter les données
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}