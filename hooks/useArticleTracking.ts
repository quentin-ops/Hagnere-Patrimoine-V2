import { useEffect, useState, useCallback } from 'react'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function useArticleTracking(articleId: string, slug?: string, title?: string) {
  const [hasConsent, setHasConsent] = useState(true)
  const [currentProgress, setCurrentProgress] = useState(0)

  const saveProgress = useCallback((progress: number) => {
    setCurrentProgress(progress)
    // Sauvegarder dans localStorage
    if (typeof window !== 'undefined' && slug) {
      localStorage.setItem(`article_progress_${slug}`, String(progress))
    }
  }, [slug])

  const markAsRead = useCallback(() => {
    if (typeof window !== 'undefined' && slug) {
      localStorage.setItem(`article_read_${slug}`, 'true')
    }
  }, [slug])

  const getCurrentProgress = useCallback(() => {
    if (typeof window !== 'undefined' && slug) {
      const saved = localStorage.getItem(`article_progress_${slug}`)
      return saved ? parseInt(saved) : 0
    }
    return 0
  }, [slug])

  const getRecentlyRead = useCallback(() => {
    // Retourner les articles récemment lus depuis localStorage
    return []
  }, [])

  useEffect(() => {
    // Enregistrer la vue
    const trackView = async () => {
      try {
        await fetch('/api/analytics/article-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articleId })
        })
      } catch (error) {
        console.error('Failed to track article view:', error)
      }
    }

    trackView()

    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        content_id: articleId
      })
    }

    // Temps de lecture
    const startTime = Date.now()
    
    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'article_read', {
          article_id: articleId,
          time_spent: timeSpent
        })
      }
    }
  }, [articleId])

  return {
    saveProgress,
    markAsRead,
    getCurrentProgress,
    hasConsent,
    getRecentlyRead
  }
}