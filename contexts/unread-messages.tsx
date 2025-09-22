"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface UnreadMessagesContextType {
  unreadCount: number
  refreshUnreadCount: () => Promise<void>
}

const UnreadMessagesContext = createContext<UnreadMessagesContextType | undefined>(undefined)

export function UnreadMessagesProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0)

  const refreshUnreadCount = async () => {
    try {
      const response = await fetch("/api/contact/unread-count")
      if (response.ok) {
        const data = await response.json()
        setUnreadCount(data.count)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre de messages non lus:", error)
    }
  }

  useEffect(() => {
    refreshUnreadCount()
    // Actualiser toutes les minutes
    const interval = setInterval(refreshUnreadCount, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <UnreadMessagesContext.Provider value={{ unreadCount, refreshUnreadCount }}>
      {children}
    </UnreadMessagesContext.Provider>
  )
}

export function useUnreadMessages() {
  const context = useContext(UnreadMessagesContext)
  if (context === undefined) {
    throw new Error("useUnreadMessages must be used within a UnreadMessagesProvider")
  }
  return context
}
