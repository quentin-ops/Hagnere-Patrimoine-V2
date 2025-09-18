'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [uploadedUrl, setUploadedUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus('')
      setUploadedUrl('')
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier')
      return
    }

    setIsLoading(true)
    setUploadStatus('Upload en cours...')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setUploadStatus('Upload réussi!')
        setUploadedUrl(data.url)
      } else {
        setUploadStatus(`Erreur: ${data.error} - ${data.details || ''}`)
      }
    } catch (error) {
      setUploadStatus(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Upload S3</h1>
        
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="file" className="block text-sm font-medium mb-2">
                Sélectionner une image
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {file && (
              <div className="text-sm text-muted-foreground">
                Fichier sélectionné: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}

            <Button 
              onClick={handleUpload} 
              disabled={!file || isLoading}
              className="w-full"
            >
              {isLoading ? 'Upload en cours...' : 'Uploader vers S3'}
            </Button>

            {uploadStatus && (
              <div className={`p-3 rounded-md ${uploadStatus.includes('réussi') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {uploadStatus}
              </div>
            )}

            {uploadedUrl && (
              <div className="space-y-2">
                <p className="text-sm font-medium">URL de l'image:</p>
                <input 
                  type="text" 
                  value={uploadedUrl} 
                  readOnly 
                  className="w-full p-2 border rounded-md text-xs"
                />
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Aperçu:</p>
                  <img 
                    src={uploadedUrl} 
                    alt="Upload test" 
                    className="max-w-full h-auto rounded-md border"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}