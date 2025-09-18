import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const MediaItemSchema = z.object({
  type: z.string(),
  url: z.string().optional().nullable(),
  alt: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  checksum: z.string().optional().nullable(),
  mimeType: z.string().optional().nullable(),
})

const SyncPayloadSchema = z.object({
  article: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    excerpt: z.string().optional().nullable(),
    status: z.string(),
    publishedAt: z.string().datetime().optional().nullable(),
    updatedAt: z.string(),
    createdAt: z.string(),
    readingMinutes: z.number().int().optional().nullable(),
    featured: z.boolean().optional().nullable(),
    currentVersion: z.number().int().optional().nullable(),
    content: z.object({
      format: z.enum(["html", "json", "markdown"]).default("html"),
      value: z.string(),
      html: z.string().optional().nullable(),
      raw: z.record(z.unknown()).optional().nullable(),
    }),
    faq: z.array(z.record(z.unknown())).default([]),
    seo: z.object({
      title: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      metadata: z.record(z.unknown()).optional().nullable(),
    }),
    coverImage: z
      .object({
        url: z.string().optional().nullable(),
        alt: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
    category: z
      .object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      })
      .optional()
      .nullable(),
    tags: z
      .array(
        z.object({
          id: z.string().optional().nullable(),
          name: z.string(),
          slug: z.string(),
        })
      )
      .optional()
      .default([]),
    author: z
      .object({
        id: z.string().optional().nullable(),
        name: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
    imagePrompt: z.string().optional().nullable(),
    metadata: z.record(z.unknown()).optional().nullable(),
  }),
  media: z.array(MediaItemSchema).optional().default([]),
})

const EnvelopeSchema = z.object({
  source: z.string().default("unknown"),
  generatedAt: z.string().datetime().optional().nullable(),
  payload: SyncPayloadSchema,
})

function extractSecret(req: NextRequest) {
  const secretHeader = req.headers.get("x-sync-secret")
  if (secretHeader && secretHeader.trim().length > 0) {
    return secretHeader.trim()
  }
  const authHeader = req.headers.get("authorization")
  if (!authHeader) return null
  const [type, value] = authHeader.split(" ")
  if (type?.toLowerCase() !== "bearer" || !value) {
    return null
  }
  return value.trim()
}

function toJson(value: unknown) {
  try {
    return JSON.parse(JSON.stringify(value))
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.PATRIMOINE_SYNC_SECRET
  if (!expectedSecret) {
    return NextResponse.json({ error: "PATRIMOINE_SYNC_SECRET non configuré" }, { status: 500 })
  }

  const providedSecret = extractSecret(req)
  if (providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const json = await req.json().catch(() => null)
  if (!json) {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 })
  }

  const parsed = EnvelopeSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalide", details: parsed.error.flatten() }, { status: 400 })
  }

  const { payload, source } = parsed.data
  const articleData = payload.article
  const payloadJson = toJson(payload)

  let articleId: string | null = null
  let logStatus: "success" | "error" = "success"
  let logError: string | null = null

  try {
    let categoryConnect: { id: string } | undefined
    if (articleData.category) {
      const category = await prisma.articleCategory.upsert({
        where: { slug: articleData.category.slug },
        update: {
          name: articleData.category.name,
        },
        create: {
          id: articleData.category.id,
          name: articleData.category.name,
          slug: articleData.category.slug,
        },
      })
      categoryConnect = { id: category.id }
    }

    const articleRecord = await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {
        title: articleData.title,
        excerpt: articleData.excerpt,
        status: articleData.status,
        coverImageUrl: articleData.coverImage?.url ?? null,
        coverImageAlt: articleData.coverImage?.alt ?? null,
        seoTitle: articleData.seo.title ?? null,
        seoDescription: articleData.seo.description ?? null,
        readingMinutes: articleData.readingMinutes ?? null,
        metadata: toJson(articleData.metadata),
        faq: toJson(articleData.faq),
        imagePrompt: articleData.imagePrompt ?? null,
        featured: Boolean(articleData.featured),
        currentVersion: articleData.currentVersion ?? 1,
        content: toJson({
          format: articleData.content.format,
          value: articleData.content.value,
          html: articleData.content.html ?? null,
          raw: articleData.content.raw ?? null,
        }) ?? {
          format: articleData.content.format,
          value: articleData.content.value,
          html: articleData.content.html ?? null,
        },
        publishedAt: articleData.publishedAt ? new Date(articleData.publishedAt) : null,
        category: categoryConnect ? { connect: categoryConnect } : { disconnect: true },
      },
      create: {
        id: articleData.id,
        slug: articleData.slug,
        title: articleData.title,
        excerpt: articleData.excerpt,
        status: articleData.status,
        coverImageUrl: articleData.coverImage?.url ?? null,
        coverImageAlt: articleData.coverImage?.alt ?? null,
        seoTitle: articleData.seo.title ?? null,
        seoDescription: articleData.seo.description ?? null,
        readingMinutes: articleData.readingMinutes ?? null,
        metadata: toJson(articleData.metadata),
        faq: toJson(articleData.faq),
        imagePrompt: articleData.imagePrompt ?? null,
        featured: Boolean(articleData.featured),
        currentVersion: articleData.currentVersion ?? 1,
        content: toJson({
          format: articleData.content.format,
          value: articleData.content.value,
          html: articleData.content.html ?? null,
          raw: articleData.content.raw ?? null,
        }) ?? {
          format: articleData.content.format,
          value: articleData.content.value,
          html: articleData.content.html ?? null,
        },
        publishedAt: articleData.publishedAt ? new Date(articleData.publishedAt) : null,
        createdAt: new Date(articleData.createdAt),
        category: categoryConnect ? { connect: categoryConnect } : undefined,
      },
      include: { tags: true },
    })

    articleId = articleRecord.id

    const tagIds: string[] = []
    const tags = articleData.tags ?? []
    for (const tagInfo of tags) {
      const tag = await prisma.tag.upsert({
        where: { slug: tagInfo.slug },
        update: { name: tagInfo.name },
        create: {
          id: tagInfo.id ?? undefined,
          name: tagInfo.name,
          slug: tagInfo.slug,
        },
      })
      tagIds.push(tag.id)
    }

    await prisma.article.update({
      where: { id: articleRecord.id },
      data: {
        tags: {
          set: tagIds.map((id) => ({ id })),
        },
      },
    })

    return NextResponse.json({ ok: true, articleId: articleRecord.id, tags: tagIds })
  } catch (error) {
    logStatus = "error"
    logError = error instanceof Error ? error.message : "Erreur inconnue"
    console.error("[import-article]", error)
    return NextResponse.json({ error: logError }, { status: 500 })
  } finally {
    try {
      await prisma.articleSyncLog.create({
        data: {
          articleId,
          source,
          status: logStatus,
          error: logError,
          payload: payloadJson,
        },
      })
    } catch (logError) {
      console.error("[import-article][log-error]", logError)
    }
  }
}

