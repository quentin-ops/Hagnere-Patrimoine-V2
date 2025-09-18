"use client"

import { useState, useRef } from 'react'
import { Upload, X, Copy, CheckCircle, Loader2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function DevS3Uploader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('L\'image doit faire moins de 10MB')
      return
    }

    setError('')
    setUploadedUrl('')
    setCopied(false)

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Store file info
    setFileInfo({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    })

    // Auto upload
    uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-s3', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Upload failed:', data)
        throw new Error(data.error || data.details || 'Erreur lors de l\'upload')
      }

      setUploadedUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setPreview(null)
    setFileInfo(null)
    setUploadedUrl('')
    setError('')
    setCopied(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white rounded-full p-3 shadow-lg hover:bg-zinc-800 transition-colors"
        title="Upload vers S3"
      >
        <Upload className="h-5 w-5" />
      </button>

      {/* Upload modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Upload S3 (Dev Tool)</h3>
                <p className="text-sm text-muted-foreground">
                  Optimise et upload une image vers S3
                </p>
              </div>

              {/* File input */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-contain rounded-lg"
                    />
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Cliquer pour sélectionner une image
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* File info */}
              {fileInfo && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground truncate max-w-[200px]">
                    {fileInfo.name}
                  </span>
                  <Badge variant="secondary">{fileInfo.size}</Badge>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Upload status */}
              {isUploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Optimisation et upload en cours...</span>
                </div>
              )}

              {/* Success with URL */}
              {uploadedUrl && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>Upload réussi!</span>
                  </div>

                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <p className="text-xs text-muted-foreground">URL S3:</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background p-2 rounded flex-1 overflow-x-auto">
                        {uploadedUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyToClipboard}
                        className="flex-shrink-0"
                      >
                        {copied ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={reset}
                    variant="outline"
                    className="w-full"
                  >
                    Nouvelle image
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}