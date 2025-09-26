"use client"

import { useState, useRef } from 'react'
import { Upload, Video, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface VideoUploadResult {
  fileUrl: string
  key: string
  fileName: string
  fileSize: number
}

export function VideoUploader() {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedVideos, setUploadedVideos] = useState<VideoUploadResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const xhrRef = useRef<XMLHttpRequest | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Vérifier le type
    if (!file.type.startsWith('video/')) {
      setError('Veuillez sélectionner un fichier vidéo')
      return
    }

    // Vérifier la taille (1GB max)
    const MAX_SIZE = 1024 * 1024 * 1024 // 1GB
    if (file.size > MAX_SIZE) {
      setError('Le fichier est trop volumineux. Taille max: 1GB')
      return
    }

    setSelectedFile(file)
    setError(null)
  }

  const uploadVideo = async () => {
    if (!selectedFile) return

    setUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // 1. Obtenir l'URL présignée
      const response = await fetch('/api/upload-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileSize: selectedFile.size,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Erreur lors de la préparation de l\'upload')
      }

      const { uploadUrl, fileUrl, key } = await response.json()

      // 2. Upload direct vers S3 avec suivi de progression
      const xhr = new XMLHttpRequest()
      xhrRef.current = xhr

      // Suivi de la progression
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100)
          setUploadProgress(percentComplete)
        }
      })

      // Promise pour attendre la fin de l'upload
      await new Promise<void>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve()
          } else {
            reject(new Error(`Upload échoué: ${xhr.status}`))
          }
        })

        xhr.addEventListener('error', () => {
          reject(new Error('Erreur réseau durant l\'upload'))
        })

        xhr.addEventListener('abort', () => {
          reject(new Error('Upload annulé'))
        })

        // Envoyer la vidéo
        xhr.open('PUT', uploadUrl)
        xhr.setRequestHeader('Content-Type', selectedFile.type)
        xhr.send(selectedFile)
      })

      // 3. Ajouter à la liste des vidéos uploadées
      const uploadResult: VideoUploadResult = {
        fileUrl,
        key,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
      }

      setUploadedVideos(prev => [...prev, uploadResult])
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      console.log('✅ Vidéo uploadée:', fileUrl)
    } catch (error) {
      console.error('Erreur upload:', error)
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'upload')
    } finally {
      setUploading(false)
      setUploadProgress(0)
      xhrRef.current = null
    }
  }

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort()
      setUploading(false)
      setUploadProgress(0)
      setError('Upload annulé')
    }
  }

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Upload Vidéo S3
        </CardTitle>
        <CardDescription>
          Upload direct de vidéos vers S3. Formats supportés: MP4, WebM, MOV. Taille max: 1GB
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Zone de sélection */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          
          {selectedFile ? (
            <div className="space-y-2">
              <Video className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
              {!uploading && (
                <div className="flex gap-2 justify-center mt-4">
                  <Button
                    onClick={() => setSelectedFile(null)}
                    variant="outline"
                    size="sm"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={uploadVideo}
                    size="sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Uploader
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
              disabled={uploading}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Cliquez pour sélectionner une vidéo
              </p>
              <p className="text-sm text-gray-400 mt-2">
                ou glissez-déposez ici
              </p>
            </button>
          )}
        </div>

        {/* Barre de progression */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Upload en cours...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <Button
              onClick={cancelUpload}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Annuler
            </Button>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Liste des vidéos uploadées */}
        {uploadedVideos.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Vidéos uploadées</h3>
            <div className="space-y-2">
              {uploadedVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-sm">{video.fileName}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(video.fileSize)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => navigator.clipboard.writeText(video.fileUrl)}
                      variant="outline"
                      size="sm"
                    >
                      Copier URL
                    </Button>
                    <Button
                      onClick={() => removeVideo(index)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions d'optimisation */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>💡 Conseil:</strong> Pour optimiser vos vidéos avant upload:
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Utilisez le script <code>compress-videos.sh</code></li>
              <li>• Ciblez 10-30 MB pour une vidéo hero</li>
              <li>• Format WebM offre la meilleure compression</li>
              <li>• Supprimez l'audio si pas nécessaire</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

// Fonction utilitaire pour formater la taille
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
