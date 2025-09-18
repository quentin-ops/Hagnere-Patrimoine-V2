#!/usr/bin/env tsx

import { config as loadEnv } from 'dotenv'

loadEnv()
loadEnv({ path: '.env.local', override: true })

interface RemoteArticleSummary {
  id: string
  slug: string
  title?: string
  updatedAt?: string
  createdAt?: string
}

interface SyncMediaItem {
  type: string
  url?: string | null
  alt?: string | null
  filename?: string | null
  checksum?: string | null
  mimeType?: string | null
}

interface SyncArticleContent {
  format: 'html' | 'json' | 'markdown'
  value: string
  html?: string | null
  raw?: Record<string, unknown> | null
}

interface SyncArticleRecord {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  status: string
  publishedAt?: string | null
  updatedAt?: string | null
  createdAt: string
  readingMinutes?: number | null
  featured?: boolean | null
  currentVersion?: number | null
  content: SyncArticleContent
  faq?: unknown[]
  seo?: {
    title?: string | null
    description?: string | null
    metadata?: Record<string, unknown> | null
  }
  coverImage?: {
    url?: string | null
    alt?: string | null
  } | null
  category?: {
    id: string
    name: string
    slug: string
  } | null
  tags?: Array<{
    id?: string | null
    name: string
    slug: string
  }>
  author?: {
    id?: string | null
    name?: string | null
    email?: string | null
  } | null
  imagePrompt?: string | null
  metadata?: Record<string, unknown> | null
}

interface SyncPayload {
  article: SyncArticleRecord
  media?: SyncMediaItem[]
}

interface SyncEnvelope {
  source?: string
  generatedAt?: string | null
  payload: SyncPayload
}

interface CliOptions {
  slug?: string
  dryRun?: boolean
  limit?: number
  force?: boolean
}

const API_BASE = process.env.INVESTISSEMENT_API_BASE ?? 'https://hagnere-investissement.fr'
const TARGET_BASE = process.env.PATRIMOINE_BASE_URL ?? 'http://localhost:3000'
const SOURCE_SECRET = process.env.INVESTISSEMENT_SYNC_SECRET
const TARGET_SECRET = process.env.PATRIMOINE_SYNC_SECRET

function parseArgs(): CliOptions {
  const options: CliOptions = {}
  const args = process.argv.slice(2)

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--slug' && args[i + 1]) {
      options.slug = args[i + 1]
      i += 1
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--limit' && args[i + 1]) {
      const value = Number.parseInt(args[i + 1], 10)
      if (!Number.isNaN(value) && value > 0) {
        options.limit = value
      }
      i += 1
    } else if (arg === '--force') {
      options.force = true
    }
  }

  return options
}

async function fetchJson<T>(url: URL, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Request failed: ${response.status} ${response.statusText}\n${body}`)
  }
  return response.json() as Promise<T>
}

async function fetchPublishedSummaries(limit?: number): Promise<RemoteArticleSummary[]> {
  const url = new URL('/api/blog/published', API_BASE)
  if (limit) {
    url.searchParams.set('limit', String(limit))
  }

  const summaries = await fetchJson<RemoteArticleSummary[]>(url)
  return summaries.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    updatedAt: item.updatedAt ?? item.createdAt,
    createdAt: item.createdAt,
  }))
}

function normalizeEnvelope(data: unknown): SyncEnvelope {
  if (!data || typeof data !== 'object') {
    throw new Error('Sync payload is invalid: empty response')
  }

  if (Array.isArray(data)) {
    const firstValid = data.find((entry) => Boolean((entry as SyncEnvelope)?.payload?.article)) as SyncEnvelope | undefined
    if (!firstValid) {
      throw new Error('Sync payload is invalid: array payload without article')
    }
    return firstValid
  }

  const record = data as Record<string, unknown>

  if (Array.isArray(record.articles)) {
    const firstValid = (record.articles as unknown[]).find((entry) => Boolean((entry as SyncEnvelope)?.payload?.article)) as SyncEnvelope | undefined
    if (firstValid) {
      return firstValid
    }
  }

  if ('payload' in record && record.payload && typeof record.payload === 'object') {
    const envelope = record as SyncEnvelope
    if (!envelope.payload.article) {
      throw new Error('Sync payload is invalid: missing payload.article')
    }
    return envelope
  }

  if ('article' in record && record.article && typeof record.article === 'object') {
    return {
      source: typeof record.source === 'string' ? (record.source as string) : undefined,
      generatedAt: typeof record.generatedAt === 'string' ? (record.generatedAt as string) : undefined,
      payload: {
        article: record.article as SyncArticleRecord,
        media: Array.isArray(record.media) ? (record.media as SyncMediaItem[]) : undefined,
      },
    }
  }

  throw new Error('Sync payload is invalid: unsupported response format')
}

async function fetchArticleEnvelope(slug: string): Promise<SyncEnvelope> {
  const url = new URL('/api/blog/export', API_BASE)
  url.searchParams.set('slug', slug)

  const headers: HeadersInit = {}
  if (SOURCE_SECRET) {
    headers['x-sync-secret'] = SOURCE_SECRET
  }

  const raw = await fetchJson<unknown>(url, { headers })
  const envelope = normalizeEnvelope(raw)

  if (!envelope.payload.article.slug) {
    envelope.payload.article.slug = slug
  }

  return envelope
}

async function importArticle(envelope: SyncEnvelope, options: CliOptions) {
  if (options.dryRun) {
    console.log(`📝 [DRY RUN] ${envelope.payload.article.slug}`)
    return
  }

  if (!TARGET_SECRET) {
    throw new Error('PATRIMOINE_SYNC_SECRET must be defined to import articles')
  }

  const url = new URL('/api/import/article', TARGET_BASE)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-sync-secret': TARGET_SECRET,
    },
    body: JSON.stringify(envelope),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Import failed: ${response.status} ${response.statusText}\n${body}`)
  }

  const result = await response.json().catch(() => ({}))
  console.log(`✅ Importé ${envelope.payload.article.slug}`, result)
}

async function maybeUpdateArticleTimestamps(envelope: SyncEnvelope, summary?: RemoteArticleSummary) {
  if (!envelope.payload.article.updatedAt && summary?.updatedAt) {
    envelope.payload.article.updatedAt = summary.updatedAt
  }
  if (!envelope.payload.article.createdAt && summary?.createdAt) {
    envelope.payload.article.createdAt = summary.createdAt
  }
}

async function main() {
  const options = parseArgs()

  if (!SOURCE_SECRET && !options.dryRun) {
    console.warn('⚠️ INVESTISSEMENT_SYNC_SECRET is not set. Export requests may be rejected.')
  }

  if (!TARGET_SECRET && !options.dryRun) {
    console.warn('⚠️ PATRIMOINE_SYNC_SECRET is not set. Imports will fail until it is configured.')
  }

  const summaries: RemoteArticleSummary[] = []
  if (options.slug) {
    summaries.push({ id: options.slug, slug: options.slug })
  } else {
    const fetched = await fetchPublishedSummaries(options.limit)
    summaries.push(...fetched)
  }

  if (summaries.length === 0) {
    console.log('Aucun article à synchroniser.')
    return
  }

  console.log(`🔄 Synchronisation de ${summaries.length} article(s) depuis ${API_BASE}`)

  for (const summary of summaries) {
    try {
      console.log(`➡️  Traitement ${summary.slug}`)
      const envelope = await fetchArticleEnvelope(summary.slug)
      await maybeUpdateArticleTimestamps(envelope, summary)

      if (!envelope.payload.article.content || !envelope.payload.article.content.value) {
        throw new Error('Article sans contenu, import annulé')
      }

      await importArticle(envelope, options)
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Échec ${summary.slug}: ${error.message}`)
      } else {
        console.error(`❌ Échec ${summary.slug}:`, error)
      }
      if (!options.force) {
        console.log('Arrêt de la synchronisation (utilisez --force pour continuer malgré les erreurs).')
        throw error
      }
    }
  }

  console.log('✨ Synchronisation terminée')
}

main().catch((error) => {
  console.error('❌ Synchronisation interrompue:', error)
  process.exitCode = 1
})
