'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

interface ArticleTableOfContentsProps {
  headings: Heading[]
}

export default function ArticleTableOfContents({ 
  headings 
}: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
      }
    )

    const elements = headings.map(({ id }) => 
      document.getElementById(id)
    ).filter(Boolean)

    elements.forEach((element) => {
      if (element) observer.observe(element)
    })

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [headings])

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav className="hidden lg:block">
      <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
        Table des matières
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "block text-sm py-1 transition-colors hover:text-primary",
                activeId === heading.id
                  ? "text-primary font-medium border-l-2 border-primary -ml-px pl-4"
                  : "text-muted-foreground pl-4"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
