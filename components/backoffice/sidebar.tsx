"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  FileText, 
  Users, 
  Building2, 
  Settings, 
  LogOut,
  BarChart3,
  Menu,
  X,
  Globe,
  Mail,
  FolderOpen,
  Shield,
  Moon,
  Sun,
  Laptop
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export type NavItem = { 
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
}

const navGroups = [
  {
    id: "general",
    title: "Général",
    items: [
      { href: "/backoffice", label: "Tableau de bord", icon: <Home className="size-4" /> },
      { href: "/backoffice/messages", label: "Messages", icon: <Mail className="size-4" /> },
    ]
  },
  {
    id: "contenu",
    title: "Contenu",
    items: [
      { href: "/backoffice/articles", label: "Articles", icon: <FileText className="size-4" /> },
      { href: "/backoffice/projets", label: "Projets", icon: <Building2 className="size-4" /> },
      { href: "/backoffice/documents", label: "Documents", icon: <FolderOpen className="size-4" /> },
    ]
  },
  {
    id: "administration",
    title: "Administration",
    items: [
      { href: "/backoffice/utilisateurs", label: "Utilisateurs", icon: <Users className="size-4" /> },
      { href: "/backoffice/stats", label: "Statistiques", icon: <BarChart3 className="size-4" /> },
    ]
  },
  {
    id: "configuration",
    title: "Configuration",
    items: [
      { href: "/backoffice/settings", label: "Paramètres", icon: <Settings className="size-4" /> },
    ]
  }
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="w-full h-10 rounded-md bg-muted/50 animate-pulse" />
    )
  }

  const themes = [
    { value: "light", label: "Clair", icon: Sun },
    { value: "dark", label: "Sombre", icon: Moon },
    { value: "system", label: "Système", icon: Laptop },
  ]

  return (
    <div className="w-full p-1 bg-muted/50 rounded-lg">
      <div className="grid grid-cols-3 gap-1">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-md text-xs font-medium transition-all",
              "hover:bg-background/80",
              theme === value 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={`Basculer vers le thème ${label}`}
          >
            <Icon className="h-4 w-4" />
            <span className="text-[10px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

interface BackofficeSidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export function BackofficeSidebar({ mobile = false, onClose }: BackofficeSidebarProps) {
  const pathname = usePathname()
  
  const handleLinkClick = () => {
    if (mobile && onClose) {
      onClose()
    }
  }

  return (
    <aside 
      className={cn(
        "flex flex-col bg-card text-card-foreground border-r",
        mobile 
          ? "fixed inset-y-0 left-0 z-40 w-64 h-full" 
          : "sticky top-0 h-screen w-64 hidden lg:flex"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <div className="font-semibold">Back-Office</div>
              <div className="text-xs text-muted-foreground">Hagnéré Patrimoine</div>
            </div>
          </div>
          {mobile && onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.id} className="space-y-1">
            <div className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/backoffice" && pathname?.startsWith(item.href))
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full bg-destructive text-destructive-foreground">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-3">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Actions */}
        <div className="space-y-2">
          <Link href="/" className="block">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              size="sm"
            >
              <Globe className="h-4 w-4 mr-2" />
              Voir le site
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/connexion" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  )
}

// Mobile Menu Button
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="lg:hidden"
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Ouvrir le menu</span>
    </Button>
  )
}
