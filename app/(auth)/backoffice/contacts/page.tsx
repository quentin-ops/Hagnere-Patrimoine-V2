"use client"
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Contact = {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  newsletterOptIn: boolean
  partnersOptIn: boolean
  source?: string | null
  updatedAt: string
  createdAt: string
}

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([])
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<'all'|'newsletter'|'partners'>('all')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set('filter', filter)
    if (q) params.set('q', q)
    const res = await fetch(`/api/marketing-contacts?${params.toString()}`, { cache: 'no-store' })
    const data = await res.json()
    setItems(data.items)
    setLoading(false)
  }

  useEffect(() => { load() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Contacts marketing</h1>
      <div className="flex gap-2 items-center">
        <Input placeholder="Rechercher un email…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Button variant="outline" onClick={load} disabled={loading}>Rechercher</Button>
        <div className="ml-auto flex gap-2">
          <Button variant={filter==='all'?'default':'outline'} onClick={()=>setFilter('all')}>Tous</Button>
          <Button variant={filter==='newsletter'?'default':'outline'} onClick={()=>setFilter('newsletter')}>Newsletter</Button>
          <Button variant={filter==='partners'?'default':'outline'} onClick={()=>setFilter('partners')}>Partenaires</Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Email</th>
              <th className="text-left px-3 py-2">Nom</th>
              <th className="text-left px-3 py-2">Opt-ins</th>
              <th className="text-left px-3 py-2">Source</th>
              <th className="text-left px-3 py-2">Maj</th>
            </tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id} className="border-t">
                <td className="px-3 py-2">{c.email}</td>
                <td className="px-3 py-2">{[c.firstName,c.lastName].filter(Boolean).join(' ') || '-'}</td>
                <td className="px-3 py-2 flex gap-2">
                  {c.newsletterOptIn && <Badge>Newsletter</Badge>}
                  {c.partnersOptIn && <Badge variant="secondary">Partenaires</Badge>}
                  {!c.newsletterOptIn && !c.partnersOptIn && <span className="text-gray-500">—</span>}
                </td>
                <td className="px-3 py-2">{c.source || '-'}</td>
                <td className="px-3 py-2">{new Date(c.updatedAt).toLocaleString('fr-FR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


