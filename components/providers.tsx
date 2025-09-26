"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SessionProvider } from "@/components/providers/session-provider"
import { BreadcrumbProvider } from "@/components/site-breadcrumb-context"
import { Toaster } from "@/components/ui/sonner"
import { HeroUIProvider } from "@heroui/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <BreadcrumbProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <HeroUIProvider>
            {children}
          </HeroUIProvider>
          <Toaster richColors position="top-right" />
        </NextThemesProvider>
      </BreadcrumbProvider>
    </SessionProvider>
  )
}
