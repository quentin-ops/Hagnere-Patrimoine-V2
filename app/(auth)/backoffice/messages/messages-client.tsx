'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Archive, Trash2, Reply, Eye, EyeOff, RefreshCw, Phone, User } from "lucide-react"
import { toast } from 'sonner'
import { useUnreadMessages } from "@/contexts/unread-messages"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

type MessageStatus = 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED'

interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  message: string
  status: MessageStatus
  createdAt: string
  updatedAt: string
}

interface MessagesClientProps {
  initialMessages: ContactMessage[]
}

export function MessagesClient({ initialMessages }: MessagesClientProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filter, setFilter] = useState<'ALL' | MessageStatus>('ALL')
  const { refreshUnreadCount } = useUnreadMessages()

  const filteredMessages = messages.filter(message => {
    if (filter === 'ALL') return true
    return message.status === filter
  })

  const unreadCount = messages.filter(m => m.status === 'UNREAD').length

  const refreshMessages = async () => {
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      if (data.messages) {
        setMessages(data.messages)
        toast.success('Messages rafraîchis')
        // Rafraîchir le compteur de messages non lus
        await refreshUnreadCount()
      }
    } catch (error) {
      toast.error('Erreur lors du rafraîchissement')
    } finally {
      setIsRefreshing(false)
    }
  }

  const updateMessageStatus = async (id: string, status: MessageStatus) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        setMessages(messages.map(m => 
          m.id === id ? { ...m, status } : m
        ))
        toast.success('Statut mis à jour')
        // Rafraîchir le compteur de messages non lus
        await refreshUnreadCount()
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id))
        toast.success('Message supprimé')
        setDeleteMessageId(null)
        // Rafraîchir le compteur de messages non lus
        await refreshUnreadCount()
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message)
    if (message.status === 'UNREAD') {
      updateMessageStatus(message.id, 'READ')
    }
  }

  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'UNREAD':
        return <Badge className="bg-blue-500 text-white">Non lu</Badge>
      case 'READ':
        return <Badge variant="secondary">Lu</Badge>
      case 'REPLIED':
        return <Badge className="bg-green-500 text-white">Répondu</Badge>
      case 'ARCHIVED':
        return <Badge variant="outline">Archivé</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages clients</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 
              ? `Vous avez ${unreadCount} message${unreadCount > 1 ? 's' : ''} non lu${unreadCount > 1 ? 's' : ''}`
              : "Tous vos messages sont lus"
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshMessages}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Rafraîchir
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'ALL' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('ALL')}
        >
          Tous ({messages.length})
        </Button>
        <Button
          variant={filter === 'UNREAD' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('UNREAD')}
        >
          Non lus ({messages.filter(m => m.status === 'UNREAD').length})
        </Button>
        <Button
          variant={filter === 'READ' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('READ')}
        >
          Lus ({messages.filter(m => m.status === 'READ').length})
        </Button>
        <Button
          variant={filter === 'REPLIED' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('REPLIED')}
        >
          Répondus ({messages.filter(m => m.status === 'REPLIED').length})
        </Button>
        <Button
          variant={filter === 'ARCHIVED' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('ARCHIVED')}
        >
          Archivés ({messages.filter(m => m.status === 'ARCHIVED').length})
        </Button>
      </div>

      {/* Liste des messages */}
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <Card 
            key={message.id} 
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
              message.status === 'UNREAD' ? 'border-primary' : ''
            }`}
            onClick={() => handleMessageClick(message)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">
                      {message.firstName} {message.lastName}
                    </CardTitle>
                    {getStatusBadge(message.status)}
                  </div>
                  <CardDescription className="text-xs">
                    {message.email} {message.phone && `• ${message.phone}`} • {format(new Date(message.createdAt), 'PPpp', { locale: fr })}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `mailto:${message.email}`
                    }}
                  >
                    <Reply className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteMessageId(message.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {filter === 'ALL' 
                ? "Aucun message pour le moment"
                : `Aucun message ${filter === 'UNREAD' ? 'non lu' : filter === 'READ' ? 'lu' : filter === 'REPLIED' ? 'répondu' : 'archivé'}`
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dialog de visualisation du message */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between pr-8">
              <span>{selectedMessage?.firstName} {selectedMessage?.lastName}</span>
              {selectedMessage && getStatusBadge(selectedMessage.status)}
            </DialogTitle>
            <DialogDescription>
              {selectedMessage && format(new Date(selectedMessage.createdAt), 'PPpp', { locale: fr })}
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium">Nom :</span>
                  <span>{selectedMessage.firstName} {selectedMessage.lastName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium">Email :</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline break-all">
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="font-medium">Téléphone :</span>
                    <a href={`tel:${selectedMessage.phone}`} className="text-primary hover:underline">
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <p className="font-medium mb-2">Message :</p>
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  onClick={() => {
                    updateMessageStatus(selectedMessage.id, selectedMessage.status === 'READ' ? 'UNREAD' : 'READ')
                    setSelectedMessage(null)
                  }}
                >
                  {selectedMessage.status === 'READ' ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Marquer comme non lu</span>
                      <span className="sm:hidden">Non lu</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Marquer comme lu</span>
                      <span className="sm:hidden">Lu</span>
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    updateMessageStatus(selectedMessage.id, 'REPLIED')
                    window.location.href = `mailto:${selectedMessage.email}`
                  }}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Répondre
                </Button>
                <Button
                  size="sm"
                  variant={selectedMessage.status === 'ARCHIVED' ? 'secondary' : 'outline'}
                  onClick={() => {
                    updateMessageStatus(selectedMessage.id, selectedMessage.status === 'ARCHIVED' ? 'READ' : 'ARCHIVED')
                    setSelectedMessage(null)
                  }}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  {selectedMessage.status === 'ARCHIVED' ? 'Désarchiver' : 'Archiver'}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setDeleteMessageId(selectedMessage.id)
                    setSelectedMessage(null)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={!!deleteMessageId} onOpenChange={() => setDeleteMessageId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le message sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteMessageId && deleteMessage(deleteMessageId)}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
