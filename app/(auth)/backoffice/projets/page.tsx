import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Euro, Calendar, Plus } from "lucide-react"

export default async function ProjetsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/connexion")
  }

  // Exemple de projets (à remplacer par des vraies données)
  const projets = [
    {
      id: 1,
      nom: "Villa Méditerranéenne",
      localisation: "Nice, Côte d'Azur",
      prix: "850 000 €",
      status: "En cours",
      rendement: "4.5%",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop",
      type: "Résidentiel"
    },
    {
      id: 2,
      nom: "Immeuble de rapport",
      localisation: "Lyon, Rhône",
      prix: "1 200 000 €",
      status: "Disponible",
      rendement: "6.2%",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=250&fit=crop",
      type: "Investissement"
    },
    {
      id: 3,
      nom: "Résidence étudiante",
      localisation: "Toulouse, Haute-Garonne",
      prix: "2 500 000 €",
      status: "Réservé",
      rendement: "5.8%",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
      type: "LMNP"
    },
    {
      id: 4,
      nom: "Bureaux premium",
      localisation: "Paris, Île-de-France",
      prix: "3 800 000 €",
      status: "En cours",
      rendement: "7.1%",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
      type: "Commercial"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projets immobiliers</h1>
          <p className="text-muted-foreground">
            Gérez votre portefeuille de projets immobiliers
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un projet
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total projets
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projets.length}</div>
            <p className="text-xs text-muted-foreground">
              Projets actifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valeur totale
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.35M €</div>
            <p className="text-xs text-muted-foreground">
              Portefeuille global
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rendement moyen
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.9%</div>
            <p className="text-xs text-muted-foreground">
              Sur l'ensemble
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              En cours
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Projets actifs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projets.map((projet) => (
          <Card key={projet.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={projet.image} 
                alt={projet.nom}
                className="object-cover w-full h-full"
              />
              <Badge 
                className="absolute top-2 right-2"
                variant={
                  projet.status === "Disponible" ? "default" : 
                  projet.status === "Réservé" ? "destructive" : 
                  "secondary"
                }
              >
                {projet.status}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{projet.nom}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {projet.localisation}
                  </CardDescription>
                </div>
                <Badge variant="outline">{projet.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold">{projet.prix}</p>
                  <p className="text-xs text-muted-foreground">Prix total</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">{projet.rendement}</p>
                  <p className="text-xs text-muted-foreground">Rendement</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" variant="outline" size="sm">
                  Voir détails
                </Button>
                <Button className="flex-1" size="sm">
                  Modifier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
