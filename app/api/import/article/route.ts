import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Rate limiting - Stockage en mémoire
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 10 // Maximum 10 requêtes
const RATE_LIMIT_WINDOW = 60 * 1000 // Par minute (60 secondes)

// IP Whitelisting
// IMPORTANT: En production, ajouter l'IP du serveur Hagnéré Investissement
// Pour obtenir l'IP du serveur Investissement : 
// 1. Se connecter au serveur Investissement
// 2. Exécuter : curl ifconfig.me
// 3. Ajouter l'IP obtenue ci-dessous
const ALLOWED_IPS = [
  '127.0.0.1', // Localhost
  '::1', // Localhost IPv6
  '192.168.1.14', // Votre IP locale (à adapter)
  // TODO: Ajouter l'IP du serveur Hagnéré Investissement en production
  // 'XX.XX.XX.XX', // IP serveur Investissement (remplacer XX.XX.XX.XX)
]

// Validation des limites
const CONTENT_LIMITS = {
  titleMaxLength: 200,
  excerptMaxLength: 500, // NOTE: Cette limite n'est plus appliquée - les excerpts peuvent être de n'importe quelle taille
  contentMaxLength: 100000, // ~100KB de texte
  slugMaxLength: 100,
  slugPattern: /^[a-z0-9-]+$/, // Seulement lettres minuscules, chiffres et tirets
  faqMaxItems: 20,
  faqQuestionMaxLength: 200,
  faqAnswerMaxLength: 1000,
  tagsMaxCount: 10,
}

// Fonction pour obtenir l'IP du client
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIP || 'unknown'
  return ip.trim()
}

// Fonction de rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  // Nettoyer les anciennes entrées
  if (record && now > record.resetTime) {
    rateLimitMap.delete(ip)
  }

  // Vérifier et mettre à jour le rate limit
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// Fonction de validation stricte du contenu
function validateArticleContent(article: any): { valid: boolean; error?: string } {
  // Vérifier la structure de base
  if (!article || typeof article !== 'object') {
    return { valid: false, error: "Structure d'article invalide" }
  }

  // Validation du slug
  if (!article.slug || typeof article.slug !== 'string') {
    return { valid: false, error: "Slug manquant ou invalide" }
  }
  if (article.slug.length > CONTENT_LIMITS.slugMaxLength) {
    return { valid: false, error: `Slug trop long (max ${CONTENT_LIMITS.slugMaxLength} caractères)` }
  }
  if (!CONTENT_LIMITS.slugPattern.test(article.slug)) {
    return { valid: false, error: "Slug invalide (seulement lettres minuscules, chiffres et tirets)" }
  }

  // Validation du titre
  if (!article.title || typeof article.title !== 'string') {
    return { valid: false, error: "Titre manquant ou invalide" }
  }
  if (article.title.length > CONTENT_LIMITS.titleMaxLength) {
    return { valid: false, error: `Titre trop long (max ${CONTENT_LIMITS.titleMaxLength} caractères)` }
  }
  if (article.title.length < 3) {
    return { valid: false, error: "Titre trop court (min 3 caractères)" }
  }

  // Validation du contenu
  if (!article.content || typeof article.content !== 'string') {
    return { valid: false, error: "Contenu manquant ou invalide" }
  }
  if (article.content.length > CONTENT_LIMITS.contentMaxLength) {
    return { valid: false, error: `Contenu trop long (max ${CONTENT_LIMITS.contentMaxLength} caractères)` }
  }
  if (article.content.length < 10) {
    return { valid: false, error: "Contenu trop court (min 10 caractères)" }
  }

  // Validation de l'excerpt (optionnel - sans limite de taille)
  if (article.excerpt) {
    if (typeof article.excerpt !== 'string') {
      return { valid: false, error: "Excerpt invalide" }
    }
    // Pas de limite de taille pour l'excerpt
  }

  // Validation du status
  const validStatuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED']
  if (article.status && !validStatuses.includes(article.status)) {
    return { valid: false, error: `Status invalide (doit être: ${validStatuses.join(', ')})` }
  }

  // Validation de la FAQ (optionnelle)
  if (article.faq) {
    if (!Array.isArray(article.faq)) {
      return { valid: false, error: "FAQ doit être un tableau" }
    }
    if (article.faq.length > CONTENT_LIMITS.faqMaxItems) {
      return { valid: false, error: `FAQ trop longue (max ${CONTENT_LIMITS.faqMaxItems} questions)` }
    }
    for (const item of article.faq) {
      if (!item.question || !item.answer) {
        return { valid: false, error: "Question et réponse requises pour chaque item FAQ" }
      }
      if (item.question.length > CONTENT_LIMITS.faqQuestionMaxLength) {
        return { valid: false, error: `Question FAQ trop longue (max ${CONTENT_LIMITS.faqQuestionMaxLength} caractères)` }
      }
      if (item.answer.length > CONTENT_LIMITS.faqAnswerMaxLength) {
        return { valid: false, error: `Réponse FAQ trop longue (max ${CONTENT_LIMITS.faqAnswerMaxLength} caractères)` }
      }
    }
  }

  // Validation des tags (optionnels)
  if (article.tags) {
    if (!Array.isArray(article.tags)) {
      return { valid: false, error: "Tags doit être un tableau" }
    }
    if (article.tags.length > CONTENT_LIMITS.tagsMaxCount) {
      return { valid: false, error: `Trop de tags (max ${CONTENT_LIMITS.tagsMaxCount})` }
    }
  }

  // Détection de contenu suspect (anti-spam basique)
  const suspiciousPatterns = [
    /viagra/gi,
    /casino/gi,
    /\bsex\b/gi,
    /porn/gi,
    /<script/gi,
    /javascript:/gi,
    /onclick=/gi,
    /onerror=/gi,
  ]
  
  const contentToCheck = `${article.title} ${article.content} ${article.excerpt || ''}`
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(contentToCheck)) {
      console.log(`⚠️ Contenu suspect détecté: ${pattern}`)
      return { valid: false, error: "Contenu suspect détecté" }
    }
  }

  return { valid: true }
}

export async function POST(req: Request) {
  try {
    // 1. IP Whitelisting
    const clientIP = getClientIP(req)
    const isIPAllowed = ALLOWED_IPS.includes(clientIP) || 
                        clientIP === 'unknown' || // En dev local
                        process.env.NODE_ENV === 'development'
    
    if (!isIPAllowed) {
      console.log(`❌ IP non autorisée: ${clientIP}`)
      return NextResponse.json(
        { error: "Accès non autorisé - IP non reconnue" },
        { status: 403 }
      )
    }

    // 2. Rate Limiting
    if (!checkRateLimit(clientIP)) {
      console.log(`⚠️ Rate limit dépassé pour IP: ${clientIP}`)
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez réessayer dans une minute." },
        { status: 429 }
      )
    }

    // 3. Vérifier l'origine de la requête (garde existante)
    const origin = req.headers.get('origin') || req.headers.get('referer') || ''
    const allowedOrigins = [
      'https://hagnere-investissement.fr',
      'https://www.hagnere-investissement.fr',
      'http://localhost:3000',
      'http://localhost:3001',
    ]
    
    const isOriginAllowed = allowedOrigins.some(allowed => origin.startsWith(allowed))
    
    if (!isOriginAllowed && process.env.NODE_ENV !== 'development') {
      console.log(`❌ Origine non autorisée: ${origin}`)
      return NextResponse.json(
        { error: "Accès non autorisé - Origine non reconnue" },
        { status: 403 }
      )
    }

    // 4. Récupérer et valider les données
    const body = await req.json()
    const { source, payload, generatedAt } = body

    if (!payload?.article) {
      return NextResponse.json(
        { error: "Données d'article manquantes" },
        { status: 400 }
      )
    }

    // 5. Validation stricte du contenu
    const validation = validateArticleContent(payload.article)
    if (!validation.valid) {
      console.log(`❌ Validation échouée: ${validation.error}`)
      return NextResponse.json(
        { error: `Validation échouée: ${validation.error}` },
        { status: 400 }
      )
    }

    // Log de sécurité
    console.log(`✅ Requête autorisée - IP: ${clientIP}, Origine: ${origin}, Article: ${payload.article.slug}`)

    const articleData = payload.article

    // Créer ou mettre à jour l'article
    const article = await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {
        title: articleData.title,
        excerpt: articleData.excerpt || null,
        content: articleData.content,
        status: articleData.status,
        publishedAt: articleData.publishedAt ? new Date(articleData.publishedAt) : null,
        coverImageUrl: articleData.coverImage?.url || null,
        coverImageAlt: articleData.coverImage?.alt || null,
        faq: articleData.faq || null,
        readingMinutes: articleData.readingTime || 5,
        seoTitle: articleData.seo?.title || null,
        seoDescription: articleData.seo?.description || null,
        metadata: articleData.metadata || null,
        imagePrompt: articleData.imagePrompt || null,
        featured: articleData.featured || false,
        updatedAt: new Date(),
      },
      create: {
        slug: articleData.slug,
        title: articleData.title,
        excerpt: articleData.excerpt || null,
        content: articleData.content,
        status: articleData.status,
        publishedAt: articleData.publishedAt ? new Date(articleData.publishedAt) : null,
        coverImageUrl: articleData.coverImage?.url || null,
        coverImageAlt: articleData.coverImage?.alt || null,
        faq: articleData.faq || null,
        readingMinutes: articleData.readingTime || 5,
        seoTitle: articleData.seo?.title || null,
        seoDescription: articleData.seo?.description || null,
        metadata: articleData.metadata || null,
        imagePrompt: articleData.imagePrompt || null,
        featured: articleData.featured || false,
      },
    })

    // Gérer la catégorie si elle existe
    if (articleData.category) {
      const category = await prisma.articleCategory.upsert({
        where: { slug: articleData.category.slug },
        update: {
          name: articleData.category.name,
        },
        create: {
          slug: articleData.category.slug,
          name: articleData.category.name,
          description: articleData.category.description || null,
        },
      })

      await prisma.article.update({
        where: { id: article.id },
        data: { categoryId: category.id },
      })
    }

    // Gérer les tags
    if (articleData.tags && articleData.tags.length > 0) {
      // Créer ou récupérer les tags
      const tags = await Promise.all(
        articleData.tags.map(async (tag: any) => {
          return await prisma.tag.upsert({
            where: { slug: tag.slug },
            update: { name: tag.name },
            create: {
              slug: tag.slug,
              name: tag.name,
            },
          })
        })
      )

      // Connecter les tags à l'article
      await prisma.article.update({
        where: { id: article.id },
        data: {
          tags: {
            set: tags.map(tag => ({ id: tag.id })),
          },
        },
      })
    }

    // Enregistrer le log de synchronisation
    await prisma.articleSyncLog.create({
      data: {
        articleId: article.id,
        source: source || "investissement",
        status: "success",
        payload: payload as any,
        generatedAt: generatedAt ? new Date(generatedAt) : new Date(),
      },
    })

    console.log(`✅ Article synchronisé avec succès: ${article.title}`)

    return NextResponse.json({
      success: true,
      message: "Article importé avec succès",
      article: {
        id: article.id,
        slug: article.slug,
        title: article.title,
      },
    })

  } catch (error) {
    console.error("❌ Erreur lors de l'import de l'article:", error)

    // Essayer d'enregistrer l'erreur dans les logs
    try {
      await prisma.articleSyncLog.create({
        data: {
          source: "investissement",
          status: "error",
          error: error instanceof Error ? error.message : "Erreur inconnue",
          payload: await req.json().catch(() => null),
          generatedAt: new Date(),
        },
      })
    } catch (logError) {
      console.error("Impossible d'enregistrer le log d'erreur:", logError)
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erreur lors de l'import",
      },
      { status: 500 }
    )
  }
}