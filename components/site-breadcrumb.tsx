'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useBreadcrumb } from '@/components/site-breadcrumb-context'

interface BreadcrumbEntry {
  label: string
  href?: string
}

interface SiteBreadcrumbProps {
  items?: BreadcrumbEntry[]
}

const routeConfig: Record<string, string> = {
  '/': 'Accueil',
  '/contact': 'Contact',
  '/connexion': 'Connexion',
  '/votre-projet': 'Votre projet',
  '/partenaires': 'Partenaires',
  '/realisations': 'Réalisations',
  '/ressources': 'Ressources',
  '/ressources/blog': 'Blog',
  '/tarifs': 'Tarifs',
  '/services': 'Services',
  '/services/hagnere-patrimoine': 'Hagnéré Patrimoine',
  '/services/elite-patrimoine': 'Hagnéré Elite',
}

export function SiteBreadcrumb({ items }: SiteBreadcrumbProps) {
  const pathname = usePathname()
  const { projectTitle } = useBreadcrumb()

  if (items && items.length > 0) {
    return (
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Accueil</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {items.map((item, index) => (
              <div key={`${item.label}-${index}`} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {item.href && index < items.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    )
  }

  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return null
  }

  const generatedItems: BreadcrumbEntry[] = []
  let currentPath = ''

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const configuredLabel = routeConfig[currentPath]
    const label = configuredLabel || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')

    generatedItems.push({
      label,
      href: index < segments.length - 1 ? currentPath : undefined,
    })
  })

  if (projectTitle && generatedItems.length > 0) {
    generatedItems[generatedItems.length - 1] = {
      label: projectTitle,
    }
  }

  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Accueil</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {generatedItems.map((item, index) => (
              <div key={`${item.label}-${index}`} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
