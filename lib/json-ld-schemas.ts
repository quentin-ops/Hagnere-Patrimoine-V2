// Ensemble de générateurs Schema.org utilisés pour le blog et les pages ressources

const BASE_URL = 'https://hagnere-patrimoine.fr'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hagnéré Patrimoine',
  url: BASE_URL,
  logo: `${BASE_URL}/logos/logo-hagnere-patrimoine-white.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-3-74-47-20-18',
    contactType: 'customer service',
    availableLanguage: 'French',
  },
  sameAs: [
    'https://www.linkedin.com/company/hagnere-patrimoine',
    'https://www.instagram.com/hagnerepatrimoine',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chambéry',
    postalCode: '73000',
    addressCountry: 'FR',
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hagnéré Patrimoine',
  alternateName: 'Hagnéré Investissement',
  url: BASE_URL,
  description:
    'Expert en gestion de patrimoine, optimisation fiscale, immobilier d’investissement et accompagnement de fortune.',
  publisher: {
    '@type': 'Organization',
    name: 'Hagnéré Patrimoine',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logos/logo-hagnere-patrimoine-white.png`,
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/ressources/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'fr-FR',
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  provider?: string
  areaServed?: string[]
  serviceType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider || 'Hagnéré Patrimoine',
    },
    areaServed: service.areaServed || ['France'],
    serviceType: service.serviceType || 'Gestion de patrimoine',
  }
}

export function generateOfferSchema(offer: {
  name: string
  description: string
  price?: string
  priceCurrency?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: offer.name,
    description: offer.description,
    price: offer.price ?? 'Sur devis',
    priceCurrency: offer.priceCurrency ?? 'EUR',
    seller: {
      '@type': 'Organization',
      name: 'Hagnéré Patrimoine',
    },
  }
}

export function generateHowToSchema(steps: Array<{ name: string; text: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Les étapes de votre stratégie patrimoniale',
    description: 'Approche structurée en 5 étapes pour piloter votre patrimoine avec Hagnéré Patrimoine.',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      position: index + 1,
    })),
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  author?: string
  datePublished?: string
  dateModified?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author || 'Équipe Hagnéré Patrimoine',
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    publisher: {
      '@type': 'Organization',
      name: 'Hagnéré Patrimoine',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logos/logo-hagnere-patrimoine-white.png`,
      },
    },
    image: article.image,
  }
}

export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Hagnéré Patrimoine',
    description:
      'Analyses patrimoniales, fiscalité, immobilier, placements financiers et stratégies de fortune.',
    url: `${BASE_URL}/ressources/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Hagnéré Patrimoine',
    },
  }
}

export function generateCollectionPageSchema(title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: `${BASE_URL}/realisations`,
    publisher: {
      '@type': 'Organization',
      name: 'Hagnéré Patrimoine',
    },
  }
}

export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact - Hagnéré Patrimoine',
    description:
      'Contactez notre équipe pour structurer et développer votre patrimoine.',
    url: `${BASE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Hagnéré Patrimoine',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chambéry',
        postalCode: '73000',
        addressCountry: 'FR',
      },
    },
  }
}

export function generateItemListSchema(items: Array<{ name: string; url: string; description?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  }
}

export function generateVideoSchema(video: {
  name: string
  description: string
  thumbnailUrl?: string
  uploadDate?: string
  duration?: string
  embedUrl?: string
  contentUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate || new Date().toISOString(),
    duration: video.duration,
    embedUrl: video.embedUrl,
    contentUrl: video.contentUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Hagnéré Patrimoine',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logos/logo-hagnere-patrimoine-white.png`,
      },
    },
  }
}
