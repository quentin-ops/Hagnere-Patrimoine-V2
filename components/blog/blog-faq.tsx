'use client'

import { ChevronDown } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface BlogFaqProps {
  faq: FAQItem[]
}

export default function BlogFaq({ faq }: BlogFaqProps) {
  if (!faq || faq.length === 0) return null

  return (
    <section className="my-12 py-12 bg-muted/30 rounded-2xl">
      <div className="px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Questions fréquentes
        </h2>
        <Accordion.Root 
          type="single" 
          collapsible 
          className="space-y-4 max-w-3xl mx-auto"
        >
          {faq.map((item, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-background border rounded-lg overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors group">
                  <span className="text-lg font-medium pr-4">
                    {item.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-4 text-muted-foreground">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  )
}
