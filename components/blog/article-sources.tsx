import { ExternalLink, Shield } from 'lucide-react'

interface Source {
  title: string
  url: string
}

interface ArticleSourcesProps {
  sources: Source[]
}

export default function ArticleSources({ sources }: ArticleSourcesProps) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="my-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Sources officielles</h3>
      </div>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              <span>{source.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
