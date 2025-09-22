"use client"

import { useState, useRef, useEffect } from 'react'
import { Upload, X, Copy, CheckCircle, Loader2, Image as ImageIcon, History, Trash2, Clock, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface UploadHistoryItem {
  id: string
  title: string
  url: string
  timestamp: number
  fileName: string
  fileSize: string
  preview?: string
}

export function DevS3Uploader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [uploadTitle, setUploadTitle] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null)
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>([])
  const [activeTab, setActiveTab] = useState('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('s3-upload-history')
    if (savedHistory) {
      try {
        setUploadHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to load upload history:', e)
      }
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (uploadHistory.length > 0) {
      try {
        // Remove preview data before saving to localStorage to save space
        const historyToSave = uploadHistory.map(item => ({
          ...item,
          preview: undefined
        }))
        localStorage.setItem('s3-upload-history', JSON.stringify(historyToSave))
      } catch (e) {
        console.error('Failed to save upload history:', e)
        // If storage is full, try to clear old items
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          const reducedHistory = uploadHistory.slice(0, 20).map(item => ({
            ...item,
            preview: undefined
          }))
          try {
            localStorage.setItem('s3-upload-history', JSON.stringify(reducedHistory))
          } catch {
            // If still failing, clear the history
            localStorage.removeItem('s3-upload-history')
          }
        }
      }
    }
  }, [uploadHistory])

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

    // Set default title from filename
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")
    setUploadTitle(nameWithoutExt)

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

      // Add to history (use S3 URL as preview to save localStorage space)
      const historyItem: UploadHistoryItem = {
        id: Date.now().toString(),
        title: uploadTitle || fileInfo?.name || 'Sans titre',
        url: data.url,
        timestamp: Date.now(),
        fileName: fileInfo?.name || '',
        fileSize: fileInfo?.size || '',
        preview: data.url // Use the S3 URL instead of base64
      }

      setUploadHistory(prev => [historyItem, ...prev].slice(0, 30)) // Reduced to 30 items to save space
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const copyToClipboard = (url: string, id?: string) => {
    navigator.clipboard.writeText(url)
    if (id) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } else {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const deleteFromHistory = (id: string) => {
    setUploadHistory(prev => prev.filter(item => item.id !== id))
  }

  const clearHistory = () => {
    setUploadHistory([])
    try {
      localStorage.removeItem('s3-upload-history')
    } catch (e) {
      console.error('Failed to clear history:', e)
    }
  }

  const reset = () => {
    setPreview(null)
    setFileInfo(null)
    setUploadedUrl('')
    setUploadTitle('')
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
        className="fixed bottom-6 right-6 z-50 bg-black text-white rounded-full p-3 shadow-lg hover:bg-zinc-800 transition-colors group"
        title="Upload vers S3"
      >
        <Upload className="h-5 w-5" />
        {uploadHistory.length > 0 && (
          <Badge
            className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center bg-primary text-primary-foreground"
          >
            {uploadHistory.length}
          </Badge>
        )}
      </button>

      {/* Upload modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 pt-6 pb-2">
                <h3 className="text-lg font-semibold mb-3">Upload S3 (Dev Tool)</h3>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger value="history">
                    <History className="h-4 w-4 mr-2" />
                    Historique ({uploadHistory.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upload" className="px-6 pb-6 space-y-4 mt-4">
                {/* Title input */}
                <div>
                  <Label htmlFor="upload-title" className="text-sm">Titre (optionnel)</Label>
                  <Input
                    id="upload-title"
                    type="text"
                    placeholder="Donnez un titre à votre image"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="mt-1"
                  />
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
                          onClick={() => copyToClipboard(uploadedUrl)}
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
              </TabsContent>

              <TabsContent value="history" className="px-6 pb-6 mt-4">
                {uploadHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Aucun upload dans l'historique</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-muted-foreground">
                        {uploadHistory.length} image{uploadHistory.length > 1 ? 's' : ''} uploadée{uploadHistory.length > 1 ? 's' : ''}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Tout effacer
                      </Button>
                    </div>

                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3">
                        {uploadHistory.map((item) => (
                          <div
                            key={item.id}
                            className="border rounded-lg p-3 space-y-2 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{item.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {formatDistanceToNow(item.timestamp, {
                                      addSuffix: true,
                                      locale: fr
                                    })}
                                  </span>
                                  {item.fileSize && (
                                    <>
                                      <span>•</span>
                                      <span>{item.fileSize}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              {item.preview && (
                                <img
                                  src={item.preview}
                                  alt={item.title}
                                  className="h-12 w-12 object-cover rounded border"
                                />
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-muted p-2 rounded flex-1 overflow-hidden text-ellipsis">
                                {item.url}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(item.url, item.id)}
                                className="flex-shrink-0"
                              >
                                {copiedId === item.id ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                asChild
                                className="flex-shrink-0"
                              >
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteFromHistory(item.id)}
                                className="flex-shrink-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </>
  )
}