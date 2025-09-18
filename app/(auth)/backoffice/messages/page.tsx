import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Archive, Trash2, Reply } from "lucide-react"

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/connexion")
  }

  // Exemple de messages (à remplacer par des vraies données)
  const messages = [
    {
      id: 1,
      from: "Jean Dupont",
      email: "jean.dupont@example.com",
      subject: "Question sur l'investissement immobilier",
      preview: "Bonjour, j'aimerais avoir plus d'informations sur vos services de défiscalisation...",
      date: "Il y a 2 heures",
      read: false
    },
    {
      id: 2,
      from: "Marie Martin",
      email: "marie.martin@example.com",
      subject: "Demande de rendez-vous",
      preview: "Je souhaiterais prendre rendez-vous pour discuter de mon projet patrimonial...",
      date: "Hier",
      read: true
    },
    {
      id: 3,
      from: "Pierre Durand",
      email: "pierre.durand@example.com",
      subject: "Merci pour votre conseil",
      preview: "Je tenais à vous remercier pour votre accompagnement dans mon projet...",
      date: "Il y a 3 jours",
      read: true
    }
  ]

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 
              ? `Vous avez ${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''}`
              : "Tous vos messages sont lus"
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archives
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Corbeille
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <Card 
            key={message.id} 
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${!message.read ? 'border-primary' : ''}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">
                      {message.from}
                    </CardTitle>
                    {!message.read && (
                      <Badge variant="default" className="text-xs">
                        Non lu
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs">
                    {message.email} • {message.date}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Reply className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-sm mb-1">{message.subject}</p>
              <p className="text-sm text-muted-foreground">{message.preview}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun message pour le moment</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
