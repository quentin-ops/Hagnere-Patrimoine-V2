type SyncBrevoOptions = {
  email: string
  firstName?: string | null
  lastName?: string | null
  newsletterOptIn?: boolean
  partnersOptIn?: boolean
}

const BREVO_API_URL = 'https://api.brevo.com/v3'

export async function syncBrevoContact(opts: SyncBrevoOptions): Promise<{ ok: boolean; status: number; body?: any }> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return { ok: false, status: 0, body: { error: 'BREVO_API_KEY not set' } }
  }

  const listNewsletter = parseInt(process.env.BREVO_LIST_NEWSLETTER_ID || '', 10)
  const listPartners = parseInt(process.env.BREVO_LIST_PARTNERS_ID || '', 10)

  const listIds: number[] = []
  const unlinkListIds: number[] = []

  if (!Number.isNaN(listNewsletter)) {
    if (opts.newsletterOptIn) listIds.push(listNewsletter)
    else unlinkListIds.push(listNewsletter)
  }

  if (!Number.isNaN(listPartners)) {
    if (opts.partnersOptIn) listIds.push(listPartners)
    else unlinkListIds.push(listPartners)
  }

  const payload: any = {
    email: opts.email,
    updateEnabled: true,
    attributes: {
      FIRSTNAME: opts.firstName || undefined,
      LASTNAME: opts.lastName || undefined,
    },
  }

  if (listIds.length) payload.listIds = listIds
  if (unlinkListIds.length) payload.unlinkListIds = unlinkListIds

  const res = await fetch(`${BREVO_API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(payload),
  })

  let body: any = undefined
  try {
    body = await res.json()
  } catch {}

  return { ok: res.ok, status: res.status, body }
}


