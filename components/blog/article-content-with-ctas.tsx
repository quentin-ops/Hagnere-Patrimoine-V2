'use client'

import { useEffect, useRef } from 'react'
import PatrimoineCTA from '@/components/patrimoine-cta-v2'

interface ArticleContentWithCTAsProps {
  content: string
  readingTime: number
}

export default function ArticleContentWithCTAs({ 
  content, 
  readingTime 
}: ArticleContentWithCTAsProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Ajouter une barre latérale noire aux titres et supprimer TOUS les séparateurs
    const headings = contentRef.current.querySelectorAll('h1, h2, h3')
    headings.forEach((heading: Element) => {
      const htmlHeading = heading as HTMLElement
      // Forcer la suppression TOTALE de toutes les bordures
      htmlHeading.style.setProperty('border', 'none', 'important')
      htmlHeading.style.setProperty('border-top', 'none', 'important')
      htmlHeading.style.setProperty('border-right', 'none', 'important')
      htmlHeading.style.setProperty('border-bottom', 'none', 'important')
      // Réinitialiser complètement les styles Tailwind
      htmlHeading.classList.remove('border-t', 'border-b', 'border-r')
      // Ajouter SEULEMENT la barre latérale noire
      htmlHeading.style.setProperty('border-left', '4px solid #000000', 'important')
      htmlHeading.style.setProperty('padding-left', '1.25rem', 'important')
      htmlHeading.style.setProperty('margin-left', '0', 'important')
      // Espacement propre
      htmlHeading.style.setProperty('padding-top', '0.25rem', 'important')
      htmlHeading.style.setProperty('padding-bottom', '0.25rem', 'important')
      htmlHeading.style.setProperty('margin-top', '2rem', 'important')
      htmlHeading.style.setProperty('margin-bottom', '1rem', 'important')
    })

    // Injecter les CTAs après certains paragraphes
    const paragraphs = contentRef.current.querySelectorAll('p')
    const totalParagraphs = paragraphs.length
    
    if (totalParagraphs > 10) {
      // CTA après 30% du contenu
      const firstCTAPosition = Math.floor(totalParagraphs * 0.3)
      const firstCTA = document.createElement('div')
      firstCTA.innerHTML = '<div data-cta-position="first"></div>'
      paragraphs[firstCTAPosition]?.after(firstCTA)

      // CTA après 70% du contenu
      const secondCTAPosition = Math.floor(totalParagraphs * 0.7)
      const secondCTA = document.createElement('div')
      secondCTA.innerHTML = '<div data-cta-position="second"></div>'
      paragraphs[secondCTAPosition]?.after(secondCTA)
    }
  }, [content])

  return (
    <div className="article-content">
      <div 
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:!border-0 prose-headings:!border-t-0
          prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:!border-0 prose-h1:!border-t-0 prose-h1:!border-b-0
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-900 prose-h2:!border-0 prose-h2:!border-t-0 prose-h2:!border-b-0
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800 prose-h3:!border-0 prose-h3:!border-t-0 prose-h3:!border-b-0
          prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700 prose-p:mb-6
          prose-ul:my-6 prose-ul:space-y-2 prose-li:marker:text-primary
          prose-ol:my-6 prose-ol:space-y-2
          prose-li:text-lg prose-li:text-gray-700
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-primary 
          prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-8
          prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50
          prose-blockquote:py-4 prose-blockquote:pr-6 prose-blockquote:rounded-r-lg
          prose-a:text-primary prose-a:underline prose-a:font-medium
          hover:prose-a:text-primary/80 prose-a:transition-colors
          prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-pre:bg-gray-900 prose-pre:text-gray-100
          [&_.example-block]:bg-primary/5 [&_.example-block]:p-6 
          [&_.example-block]:rounded-lg [&_.example-block]:my-8
          [&_.highlight]:bg-yellow-100 [&_.highlight]:px-2 [&_.highlight]:py-0.5
          [&_.tiptap-heading]:scroll-mt-24
          [&>h1]:!border-t-0 [&>h1]:!border-b-0 [&>h1]:!border-r-0
          [&>h2]:!border-t-0 [&>h2]:!border-b-0 [&>h2]:!border-r-0
          [&>h3]:!border-t-0 [&>h3]:!border-b-0 [&>h3]:!border-r-0
        "
      />
      
      {/* CTAs dynamiques */}
      <PatrimoineCTA position="end" />
    </div>
  )
}
