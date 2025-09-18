import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Upload, Folder, File, FileImage, FileVideo } from "lucide-react"

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/connexion")
  }

  // Exemple de documents (à remplacer par des vraies données)
  const documents = [
    {
      id: 1,
      nom: "Contrat-type-investissement.pdf",
      type: "PDF",
      taille: "2.4 MB",
      date: "15/09/2024",
      categorie: "Contrats",
      icon: FileText
    },
    {
      id: 2,
      nom: "Guide-defiscalisation-2024.pdf",
      type: "PDF",
      taille: "5.2 MB",
      date: "10/09/2024",
      categorie: "Guides",
      icon: FileText
    },
    {
      id: 3,
      nom: "Presentation-patrimoine.pptx",
      type: "Présentation",
      taille: "8.7 MB",
      date: "05/09/2024",
      categorie: "Présentations",
      icon: File
    },
    {
      id: 4,
      nom: "Villa-mediterranee-photos.zip",
      type: "Archive",
      taille: "45.3 MB",
      date: "01/09/2024",
      categorie: "Images",
      icon: FileImage
    },
    {
      id: 5,
      nom: "Video-presentation-services.mp4",
      type: "Vidéo",
      taille: "124.5 MB",
      date: "28/08/2024",
      categorie: "Médias",
      icon: FileVideo
    },
    {
      id: 6,
      nom: "Rapport-financier-Q3-2024.xlsx",
      type: "Excel",
      taille: "1.8 MB",
      date: "25/08/2024",
      categorie: "Rapports",
      icon: File
    }
  ]

  const categories = ["Tous", "Contrats", "Guides", "Présentations", "Images", "Médias", "Rapports"]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Gérez vos documents et fichiers
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Uploader un document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total documents
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">
              Fichiers stockés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Espace utilisé
            </CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">188.4 MB</div>
            <p className="text-xs text-muted-foreground">
              Sur 10 GB disponibles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Téléchargements
            </CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dernière mise à jour
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Hier</div>
            <p className="text-xs text-muted-foreground">
              15/09/2024
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === "Tous" ? "default" : "outline"}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Bibliothèque de documents</CardTitle>
          <CardDescription>
            Tous vos fichiers et documents importants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc) => {
              const Icon = doc.icon
              return (
                <div 
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doc.nom}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.taille}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {doc.categorie}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {documents.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun document trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
