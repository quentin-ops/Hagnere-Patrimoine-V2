'use client'

import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ArticleShareButtonsProps {
  title: string
  url: string
}

export default function ArticleShareButtons({ 
  title, 
  url 
}: ArticleShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Je pense que cet article pourrait t'intéresser : ${url}`)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Lien copié !')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Erreur lors de la copie')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        Partagez cet article
      </p>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
          aria-label="Partager sur Facebook"
        >
          <Facebook className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
          aria-label="Partager sur Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href={shareLinks.email}
          className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
          aria-label="Partager par email"
        >
          <Mail className="h-5 w-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors"
          aria-label="Copier le lien"
        >
          <Link2 className={cn("h-5 w-5", copied && "text-primary")} />
        </button>
      </div>
    </div>
  )
}
