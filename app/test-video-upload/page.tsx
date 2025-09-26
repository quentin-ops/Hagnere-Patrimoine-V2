"use client"

import { VideoUploader } from '@/components/video-uploader'

export default function TestVideoUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Test Upload Vidéo S3
        </h1>
        
        <VideoUploader />

        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Instructions d'utilisation :</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Compression préalable (recommandé)</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                <code>{`# Installer ffmpeg si nécessaire
brew install ffmpeg

# Rendre le script exécutable
chmod +x scripts/compress-videos.sh

# Compresser une vidéo
./scripts/compress-videos.sh ma-video.mp4 hero-video`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Upload direct (vidéos jusqu'à 1GB)</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Utilisez l'uploader ci-dessus pour envoyer directement vos vidéos vers S3.
                L'upload utilise des URLs présignées pour contourner les limites de l'API.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Formats recommandés pour la hero</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li><strong>WebM VP9</strong> : 5-15 MB pour 30s en 1080p</li>
                <li><strong>MP4 H.264</strong> : 10-20 MB pour 30s en 1080p</li>
                <li><strong>Durée max</strong> : 30 secondes</li>
                <li><strong>Sans audio</strong> : Réduit la taille de 20-30%</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Utilisation dans la hero</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
                <code>{`<video
  className="absolute inset-0 w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="none"
  poster="/videos/hero-poster.jpg"
>
  <source src="[URL_S3]/hero.webm" type="video/webm" />
  <source src="[URL_S3]/hero.mp4" type="video/mp4" />
</video>`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">5. Optimisations supplémentaires</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>Utilisez CloudFront pour la distribution CDN</li>
                <li>Implémentez le lazy loading avec Intersection Observer</li>
                <li>Ajoutez toujours une image poster</li>
                <li>Prévoyez un fallback image pour les connexions lentes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
