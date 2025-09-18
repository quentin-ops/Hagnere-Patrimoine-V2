"use client"

import { PatrimoineCTA } from '@/components/patrimoine-cta'

interface ArticleContentWithCTAsProps {
  content: string
  className?: string
}

export function ArticleContentWithCTAs({ content, className = '' }: ArticleContentWithCTAsProps) {
  const parts = content.split(/(<div class="patrimoine-cta-placeholder"[^>]*><\/div>)/g)

  return (
    <div className={className}>
      {parts.map((part, index) =>
        part.includes('patrimoine-cta-placeholder') ? (
          <PatrimoineCTA key={`patrimoine-${index}`} />
        ) : (
          <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
        )
      )}
    </div>
  )
}
