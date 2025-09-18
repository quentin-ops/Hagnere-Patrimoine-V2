'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface BreadcrumbContextType {
  projectTitle: string | null
  setProjectTitle: (title: string | null) => void
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined)

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [projectTitle, setProjectTitle] = useState<string | null>(null)

  return (
    <BreadcrumbContext.Provider value={{ projectTitle, setProjectTitle }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext)

  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider')
  }

  return context
}
