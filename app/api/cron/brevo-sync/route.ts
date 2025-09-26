import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { syncBrevoContact } from '@/lib/brevo'

export const runtime = 'nodejs'

function unauthorized(message = 'Unauthorized') {
  return new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret') || request.headers.get('x-cron-secret') || ''
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return unauthorized()
  }

  const take = Math.min(parseInt(url.searchParams.get('take') || '100', 10) || 100, 500)
  const skip = parseInt(url.searchParams.get('skip') || '0', 10) || 0
  const since = url.searchParams.get('since')
  const only = url.searchParams.get('only') // 'newsletter' | 'partners' | undefined

  const where: any = {}
  if (since) {
    const d = new Date(since)
    if (!isNaN(d.getTime())) where.updatedAt = { gt: d }
  }
  if (only === 'newsletter') where.newsletterOptIn = true
  if (only === 'partners') where.partnersOptIn = true

  const contacts = await prisma.marketingContact.findMany({
    where,
    orderBy: { updatedAt: 'asc' },
    take,
    skip,
  })

  let success = 0
  let failed = 0
  const results: Array<{ email: string; ok: boolean; status: number }> = []

  for (const c of contacts) {
    try {
      const res = await syncBrevoContact({
        email: c.email,
        firstName: c.firstName,
        lastName: c.lastName,
        newsletterOptIn: c.newsletterOptIn,
        partnersOptIn: c.partnersOptIn,
      })
      if (res.ok) success++
      else failed++
      results.push({ email: c.email, ok: res.ok, status: res.status })
    } catch (e) {
      failed++
      results.push({ email: c.email, ok: false, status: 0 })
    }
  }

  return new Response(
    JSON.stringify({
      count: contacts.length,
      success,
      failed,
      take,
      skip,
      since: since || null,
      only: only || null,
      results,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}


