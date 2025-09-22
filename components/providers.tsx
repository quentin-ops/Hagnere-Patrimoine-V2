"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SessionProvider } from "@/components/providers/session-provider"
import { BreadcrumbProvider } from "@/components/site-breadcrumb-context"
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <BreadcrumbProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </NextThemesProvider>
      </BreadcrumbProvider>
    </SessionProvider>
  )
}
