'use client'

import { useState } from 'react'
import { Play, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoData {
  videoId: string
  title: string
  description?: string
  embedUrl: string
  thumbnailUrl: string
}

interface BlogVideoSectionProps {
  video: VideoData
}

export default function BlogVideoSection({ video }: BlogVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="my-12">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8">
        <div className="flex items-center gap-2 mb-4">
          <Youtube className="h-6 w-6 text-red-600" />
          <h3 className="text-xl font-bold">Vidéo explicative</h3>
        </div>
        
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          {!isPlaying ? (
            <>
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                aria-label="Lire la vidéo"
              >
                <div className="bg-red-600 rounded-full p-6 group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-white fill-white ml-1" />
                </div>
              </button>
            </>
          ) : (
            <iframe
              src={`${video.embedUrl}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
        
        {video.description && (
          <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
            {video.description}
          </p>
        )}
      </div>
    </div>
  )
}
