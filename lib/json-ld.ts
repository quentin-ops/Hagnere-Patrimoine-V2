// Configuration centralisée pour les schémas JSON-LD liés au blog Patrimoine

export const ORGANIZATION_ID = 'https://hagnere-patrimoine.fr/#organization'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Hagnéré Patrimoine',
  alternateName: 'Hagnéré Investissement',
  url: 'https://hagnere-patrimoine.fr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://hagnere-patrimoine.fr/icons/logo-hagnere-patrimoine.png',
    width: '1200',
    height: '630',
  },
  description:
    'Cabinet de gestion de patrimoine et de fortune. Ingénierie patrimoniale, optimisation fiscale et investissements haut de gamme.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7 Rue Ernest Filliard',
    addressLocality: 'Chambéry',
    postalCode: '73000',
    addressCountry: 'FR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33-3-74-47-20-18',
    contactType: 'customer service',
    availableLanguage: ['French'],
    areaServed: 'FR',
  },
  sameAs: [
    'https://www.linkedin.com/company/hagnere-patrimoine',
    'https://www.facebook.com/hagnerepatrimoine',
  ],
  founder: [
    {
      '@type': 'Person',
      name: 'Quentin Hagnéré',
      jobTitle: 'Co-fondateur',
    },
    {
      '@type': 'Person',
      name: 'Clément Chatelain',
      jobTitle: 'Co-fondateur',
    },
  ],
}

export const localBusinessSchema = {
  ...organizationSchema,
  '@type': 'LocalBusiness',
  '@id': 'https://hagnere-patrimoine.fr/#localbusiness',
  priceRange: '€€',
  openingHours: 'Mo-Fr 09:00-18:00',
  telephone: '+33374472018',
  email: 'contact@hagnere-patrimoine.fr',
}

export function createWebSiteSchema(params?: {
  name?: string
  description?: string
  url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://hagnere-patrimoine.fr/#website',
    url: params?.url || 'https://hagnere-patrimoine.fr',
    name: params?.name || 'Hagnéré Patrimoine',
    description:
      params?.description ||
      "Site officiel d'Hagnéré Patrimoine – Gestion de fortune, stratégie patrimoniale et investissements.",
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://hagnere-patrimoine.fr/ressources/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'fr-FR',
  }
}

export function createArticleSchema(params: {
  title: string
  description: string
  url: string
  publishedAt?: Date | null
  updatedAt?: Date | null
  author?: {
    name: string
    email?: string | null
  }
  image?: string | null
  tags?: string[]
  citations?: Array<{
    name: string
    url: string
  }>
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    url: params.url,
    datePublished: params.publishedAt?.toISOString(),
    dateModified: params.updatedAt?.toISOString() || params.publishedAt?.toISOString(),
    author: params.author
      ? {
          '@type': 'Person',
          name: params.author.name,
          email: params.author.email ?? undefined,
        }
      : {
          '@type': 'Organization',
          '@id': ORGANIZATION_ID,
        },
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    image:
      params.image ||
      'https://hagnere-patrimoine.fr/icons/logo-hagnere-patrimoine.png',
    keywords: params.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
  }

  if (params.citations && params.citations.length > 0) {
    schema.citation = params.citations.map((citation) => ({
      '@type': 'CreativeWork',
      name: citation.name,
      url: citation.url,
      publisher: {
        '@type': 'Organization',
        name: citation.url.includes('.gouv.fr')
          ? 'Gouvernement Français'
          : 'Source officielle',
      },
    }))
  }

  return schema
}

export function createBreadcrumbSchema(items: Array<{
  name: string
  url?: string
}>) {
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

export function createFAQSchema(faq: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
