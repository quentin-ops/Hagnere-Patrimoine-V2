"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun, Globe } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type Props = {
  className?: string
}

export const AnimatedThemeToggler = ({ className }: Props) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = useCallback(async (newTheme: string) => {
    if (!buttonRef.current || !document.startViewTransition) {
      // Fallback pour les navigateurs qui ne supportent pas View Transitions API
      setTheme(newTheme)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })

    try {
      await transition.ready

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } catch (e) {
      // En cas d'erreur, on applique le thème sans animation
      console.log("View Transition failed:", e)
    }
  }, [setTheme])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        className={cn("group h-9 px-2", className)}
        disabled
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const currentIcon = () => {
    if (theme === 'system') {
      return (
        <>
          <Globe className="h-4 w-4 transition-all flex-shrink-0" />
          <span className="sr-only">Système</span>
        </>
      )
    }
    
    return (
      <>
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 flex-shrink-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 flex-shrink-0" />
        <span className="sr-only">{resolvedTheme === 'dark' ? 'Nuit' : 'Jour'}</span>
      </>
    )
  }

  const getThemeLabel = () => {
    if (theme === 'system') return 'Système'
    return resolvedTheme === 'dark' ? 'Nuit' : 'Jour'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={buttonRef}
          variant="ghost"
          className={cn(
            "group h-9 px-2 overflow-hidden transition-all duration-300 hover:px-3 relative",
            className
          )}
        >
          {currentIcon()}
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[60px] ml-1">
            {getThemeLabel()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Jour</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Nuit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')}>
          <Globe className="mr-2 h-4 w-4" />
          <span>Système</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
