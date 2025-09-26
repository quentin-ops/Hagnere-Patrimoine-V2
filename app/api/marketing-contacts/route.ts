import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const filter = (url.searchParams.get('filter') || 'all').toLowerCase()
  const q = (url.searchParams.get('q') || '').trim().toLowerCase()
  const take = Math.min(parseInt(url.searchParams.get('take') || '50', 10) || 50, 200)
  const skip = parseInt(url.searchParams.get('skip') || '0', 10) || 0

  const where: any = {}
  if (filter === 'newsletter') where.newsletterOptIn = true
  if (filter === 'partners') where.partnersOptIn = true
  if (q) where.email = { contains: q }

  const [items, total] = await Promise.all([
    prisma.marketingContact.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      take,
      skip,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        newsletterOptIn: true,
        partnersOptIn: true,
        source: true,
        updatedAt: true,
        createdAt: true,
      },
    }),
    prisma.marketingContact.count({ where }),
  ])

  return new Response(
    JSON.stringify({ items, total, take, skip, filter }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}


