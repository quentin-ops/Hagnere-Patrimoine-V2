"use client"

interface SessionProviderProps {
  children: React.ReactNode
}

// Ce composant n'est plus utilisé - SessionProvider est maintenant dans le layout (auth)
export function SessionProvider({ children }: SessionProviderProps) {
  return <>{children}</>
}