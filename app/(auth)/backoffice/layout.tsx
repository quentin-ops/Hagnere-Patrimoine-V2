"use client"

import { BackofficeSidebar, MobileMenuButton } from "@/components/backoffice/sidebar"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Shield } from "lucide-react"

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <BackofficeSidebar />
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <BackofficeSidebar 
            mobile 
            onClose={() => setMobileMenuOpen(false)} 
          />
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between h-14 px-4 bg-card border-b">
          <div className="flex items-center gap-4">
            <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
            <div className="lg:hidden flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm">Back-Office</span>
            </div>
          </div>
          
          {session && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {session.user?.email}
              </span>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {session.user?.role || "ADMIN"}
              </span>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
