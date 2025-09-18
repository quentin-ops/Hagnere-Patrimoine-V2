'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Message envoyé !',
          description: "Votre message a bien été reçu, nos équipes vont vous répondre rapidement par mail ou téléphone.",
          duration: 10000,
          variant: 'success',
        })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        })
        setSubmitMessage(null)
      } else {
        toast({
          title: 'Erreur',
          description: data.error || 'Une erreur est survenue. Veuillez réessayer.',
          variant: 'destructive',
          duration: 5000,
        })
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="container-site py-12 sm:py-10" id="contact">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/70 shadow-sm">
        <div className="grid min-h-[70svh] grid-cols-1 lg:grid-cols-2">
          {/* Colonne gauche: intro + coordonnées */}
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 bg-black text-white">
            <div className="max-w-xl">
              <p className="text-xs text-white/70 sm:text-sm">Contact</p>
              <h1 className="mt-1 h1-mobile lg:text-4xl text-white">Nous contacter</h1>
              <p className="mt-3 description-base text-white/80 sm:text-base">
                Une question sur votre patrimoine ? Écrivez‑nous, un expert vous répond sous 24h ouvrées.
              </p>
            </div>
            <ul className="mt-2 space-y-3 text-sm sm:text-base">
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="h-5 w-5" />
                <a href="tel:+33374472018" className="hover:underline">03 74 47 20 18</a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="h-5 w-5" />
                <a href="mailto:backoffice@hagnere-patrimoine.fr" className="hover:underline">backoffice@hagnere-patrimoine.fr</a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5" />
                7 Rue Ernest Filliard, 73000, Chambéry
              </li>
            </ul>
          </div>

          {/* Colonne droite: formulaire sur fond gris, bords arrondis visibles via container global */}
          <div className="bg-muted p-5 sm:p-10 flex items-center justify-center">
            <div className="w-full max-w-md">
              <h2 className="text-sm font-medium sm:text-base">Formulaire de contact</h2>
              <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName" className="text-[10px] sm:text-sm">Prénom</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Votre prénom"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="h-7 text-[10px] sm:h-10 sm:text-sm bg-white border-zinc-200 placeholder:text-zinc-400 focus-visible:ring-primary/40 dark:bg-zinc-900 dark:text-white dark:border-white/20 dark:placeholder:text-white/50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName" className="text-[10px] sm:text-sm">Nom</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Votre nom"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="h-7 text-[10px] sm:h-10 sm:text-sm bg-white border-zinc-200 placeholder:text-zinc-400 focus-visible:ring-primary/40 dark:bg-zinc-900 dark:text-white dark:border-white/20 dark:placeholder:text-white/50"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-[10px] sm:text-sm">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="vous@exemple.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-7 text-[10px] sm:h-10 sm:text-sm bg-white border-zinc-200 placeholder:text-zinc-400 focus-visible:ring-primary/40 dark:bg-zinc-900 dark:text-white dark:border-white/20 dark:placeholder:text-white/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-[10px] sm:text-sm">Téléphone (optionnel)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="03 74 47 20 18"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-7 text-[10px] sm:h-10 sm:text-sm bg-white border-zinc-200 placeholder:text-zinc-400 focus-visible:ring-primary/40 dark:bg-zinc-900 dark:text-white dark:border-white/20 dark:placeholder:text-white/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-[10px] sm:text-sm">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Dites‑nous en plus sur votre besoin"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="text-[10px] sm:text-sm sm:min-h-[120px] bg-white border-zinc-200 placeholder:text-zinc-400 focus-visible:ring-primary/40 dark:bg-zinc-900 dark:text-white dark:border-white/20 dark:placeholder:text-white/50"
                  />
                </div>

                {submitMessage && (
                  <div
                    className={`p-3 rounded-lg text-xs sm:text-sm ${
                      submitMessage.type === 'success'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <div className="pt-1 sm:pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto h-7 text-[10px] sm:h-10 sm:text-sm px-4"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon message'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
