import { useEffect, useState } from 'react'

const COOKIE_NAME = 'article_tracking'
const COOKIE_CONSENT = 'cookies_accepted'
const COOKIE_EXPIRY = 365

interface ArticleProgress {
  articleId: string
  slug: string
  title: string
  progress: number
  lastRead: string
  readingTime?: number
}

interface ArticleTrackingData {
  articlesRead: ArticleProgress[]
  totalReadingTime: number
}

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift()
    return cookieValue || null
  }
  return null
}

const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`
}

const removeCookie = (name: string) => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

export function useArticleTracking(articleId: string, slug: string, title: string) {
  const [trackingData, setTrackingData] = useState<ArticleTrackingData>({
    articlesRead: [],
    totalReadingTime: 0,
  })
  const [startTime] = useState<number>(Date.now())
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const consent = getCookie(COOKIE_CONSENT)
    setHasConsent(consent === 'true' || consent === 'all')

    if (consent === 'true' || consent === 'all') {
      const existingData = getCookie(COOKIE_NAME)
      if (existingData) {
        try {
          const parsed = JSON.parse(decodeURIComponent(existingData)) as ArticleTrackingData
          setTrackingData(parsed)
        } catch (error) {
          console.error('[useArticleTracking] parse error', error)
        }
      }
    }
  }, [])

  const saveProgress = (progress: number) => {
    if (!hasConsent) return

    const currentTime = Date.now()
    const readingTime = Math.floor((currentTime - startTime) / 1000)

    const updatedData: ArticleTrackingData = {
      ...trackingData,
      totalReadingTime: trackingData.totalReadingTime + readingTime,
    }

    const existingIndex = updatedData.articlesRead.findIndex((item) => item.articleId === articleId)
    const baseProgress: ArticleProgress = {
      articleId,
      slug,
      title,
      progress,
      lastRead: new Date().toISOString(),
      readingTime,
    }

    if (existingIndex >= 0) {
      const existing = updatedData.articlesRead[existingIndex]
      updatedData.articlesRead[existingIndex] = {
        ...baseProgress,
        progress: Math.max(existing.progress, progress),
        readingTime: (existing.readingTime ?? 0) + readingTime,
      }
    } else {
      updatedData.articlesRead.push(baseProgress)
    }

    if (updatedData.articlesRead.length > 100) {
      updatedData.articlesRead = updatedData.articlesRead
        .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime())
        .slice(0, 100)
    }

    try {
      setCookie(COOKIE_NAME, encodeURIComponent(JSON.stringify(updatedData)), COOKIE_EXPIRY)
      setTrackingData(updatedData)
    } catch (error) {
      console.error('[useArticleTracking] save error', error)
    }
  }

  const markAsRead = () => saveProgress(100)

  const getCurrentProgress = () => {
    const entry = trackingData.articlesRead.find((item) => item.articleId === articleId)
    return entry?.progress ?? 0
  }

  const getTotalArticlesRead = () => trackingData.articlesRead.filter((item) => item.progress >= 90).length

  const getRecentlyRead = (limit = 5) =>
    trackingData.articlesRead
      .filter((item) => item.articleId !== articleId)
      .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime())
      .slice(0, limit)

  const hasReadArticle = (id: string) => {
    const entry = trackingData.articlesRead.find((item) => item.articleId === id)
    return entry ? entry.progress >= 90 : false
  }

  const clearHistory = () => {
    if (!hasConsent) return
    removeCookie(COOKIE_NAME)
    setTrackingData({ articlesRead: [], totalReadingTime: 0 })
  }

  return {
    saveProgress,
    markAsRead,
    getCurrentProgress,
    getTotalArticlesRead,
    getRecentlyRead,
    hasReadArticle,
    clearHistory,
    hasConsent,
    totalReadingTime: trackingData.totalReadingTime,
  }
}
