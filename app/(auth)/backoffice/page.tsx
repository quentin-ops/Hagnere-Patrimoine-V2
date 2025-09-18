import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Building2, BarChart3, TrendingUp, Activity, DollarSign, Calendar } from "lucide-react"
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Projets actifs
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Articles publiés
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +4 cette semaine
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Utilisateurs
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 administrateurs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visites ce mois
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
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