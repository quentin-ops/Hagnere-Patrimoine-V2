import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { syncBrevoContact } from '@/lib/brevo'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const { email } = await request.json().catch(() => ({ email: '' }))
  if (!email) {
    return new Response(JSON.stringify({ error: 'email requis' }), { status: 400, headers: { 'Content-Type': 'application/json' } })
  }
  const c = await prisma.marketingContact.findUnique({ where: { email: email.toLowerCase().trim() } })
  if (!c) {
    return new Response(JSON.stringify({ error: 'contact introuvable' }), { status: 404, headers: { 'Content-Type': 'application/json' } })
  }
  const res = await syncBrevoContact({
    email: c.email,
    firstName: c.firstName,
    lastName: c.lastName,
    newsletterOptIn: c.newsletterOptIn,
    partnersOptIn: c.partnersOptIn,
  })
  return new Response(JSON.stringify({ ok: res.ok, status: res.status, body: res.body }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}


