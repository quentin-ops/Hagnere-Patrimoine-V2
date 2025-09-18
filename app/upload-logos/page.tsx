'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, Upload, AlertCircle, Loader2, Zap, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface UploadResult {
  filename: string
  url: string
  description: string
  optimization?: {
    savingsPercent: number
    bestSizeKB: number
    totalVariants: number
    formats: string[]
  }
  variants?: Array<{
    url: string
    format: string
    width: number
    height: number
    sizeKB: number
  }>
}

export default function UploadLogosPage() {
  const [uploading, setUploading] = useState(false)
  const [results, setResults] = useState<UploadResult[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [optimizeImages, setOptimizeImages] = useState(true)
  const [imageContext, setImageContext] = useState<'logo' | 'hero' | 'content' | 'thumbnail'>('logo')
  const [uploadProgress, setUploadProgress] = useState(0)

  const logoDescriptions = [
    { name: 'logo-hagnere-elite-light', description: 'Logo Hagnéré Patrimoine Elite - Version claire' },
    { name: 'logo-hagnere-elite-dark', description: 'Logo Hagnéré Patrimoine Elite - Version sombre' },
    { name: 'logo-patrimoine-black', description: 'Logo Patrimoine - Version noire' },
    { name: 'logo-hagnere-patrimoine-white', description: 'Logo Hagnéré Patrimoine - Version blanche' }
  ]

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files)
      setErrors([])
      setResults([])
      setUploadProgress(0)
    }
  }

  const uploadFile = async (file: File): Promise<UploadResult> => {
    const formData = new FormData()
    
    // Déterminer le dossier selon le type de fichier
    const folder = file.name.includes('logo') ? 'logos' : 'uploads'
    
    formData.append('file', file)
    formData.append('folder', folder)
    formData.append('context', imageContext)
    formData.append('skipOptimization', (!optimizeImages).toString())
    
    // Choisir l'endpoint selon l'optimisation
    const endpoint = optimizeImages ? '/api/upload-optimized' : '/api/upload'
    
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }
    
    const data = await response.json()
    
    // Trouver la description correspondante
    const logoInfo = logoDescriptions.find(l => 
      file.name.includes(l.name.replace('logo-', ''))
    )
    
    return {
      filename: file.name,
      url: data.url,
      description: logoInfo?.description || file.name,
      optimization: data.optimization,
      variants: data.variants
    }
  }

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setErrors(['Veuillez sélectionner au moins un fichier'])
      return
    }
    
    setUploading(true)
    setErrors([])
    setResults([])
    setUploadProgress(0)
    
    const uploadResults: UploadResult[] = []
    const uploadErrors: string[] = []
    const totalFiles = selectedFiles.length
    
    for (let i = 0; i < totalFiles; i++) {
      const file = selectedFiles[i]
      
      try {
        const result = await uploadFile(file)
        uploadResults.push(result)
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100))
      } catch (error) {
        uploadErrors.push(`Échec de l'upload de ${file.name}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
      }
    }
    
    setResults(uploadResults)
    setErrors(uploadErrors)
    setUploading(false)
  }

  const copyUrlsToClipboard = () => {
    const urls = results.map(r => {
      let text = `${r.description}:\n${r.url}`
      if (r.optimization) {
        text += `\n  - Économies: ${r.optimization.savingsPercent}%`
        text += `\n  - Formats: ${r.optimization.formats.join(', ')}`
      }
      return text
    }).join('\n\n')
    navigator.clipboard.writeText(urls)
  }

  const formatSize = (kb: number) => {
    if (kb < 1024) {
      return `${kb} KB`
    }
    return `${(kb / 1024).toFixed(2)} MB`
  }

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            Upload Optimisé des Images sur AWS S3
          </CardTitle>
          <CardDescription>
            Upload avec optimisation automatique : compression WebP/AVIF, redimensionnement responsive, et plus
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="optimize">Optimisation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              {/* Zone d'upload */}
              <div className="space-y-2">
                <Label htmlFor="images">Sélectionner les images</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleFileSelect}
                  disabled={uploading}
                />
                <p className="text-sm text-muted-foreground">
                  Formats acceptés: PNG, JPEG, WebP, SVG. Multi-sélection supportée.
                </p>
              </div>

              {/* Options d'optimisation */}
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="optimize" className="font-medium">
                      Optimisation automatique
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Compression WebP/AVIF, multiples tailles, économies jusqu'à 70%
                    </p>
                  </div>
                  <Switch
                    id="optimize"
                    checked={optimizeImages}
                    onCheckedChange={setOptimizeImages}
                  />
                </div>
                
                {optimizeImages && (
                  <div className="space-y-2 pt-2 border-t">
                    <Label htmlFor="context">Type d'image (preset d'optimisation)</Label>
                    <Select value={imageContext} onValueChange={(value: any) => setImageContext(value)}>
                      <SelectTrigger id="context">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logo">
                          <div className="flex flex-col">
                            <span>Logo</span>
                            <span className="text-xs text-muted-foreground">400px max, WebP+PNG, qualité 95%</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="hero">
                          <div className="flex flex-col">
                            <span>Hero/Bannière</span>
                            <span className="text-xs text-muted-foreground">2560px max, WebP+AVIF, qualité 90%</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="content">
                          <div className="flex flex-col">
                            <span>Contenu</span>
                            <span className="text-xs text-muted-foreground">1920px max, WebP+AVIF, qualité 85%</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="thumbnail">
                          <div className="flex flex-col">
                            <span>Vignette</span>
                            <span className="text-xs text-muted-foreground">400px max, WebP, qualité 80%</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Fichiers sélectionnés */}
              {selectedFiles && selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Fichiers sélectionnés ({selectedFiles.length})</Label>
                  <div className="border rounded-lg p-3 space-y-1 max-h-32 overflow-y-auto">
                    {Array.from(selectedFiles).map((file, index) => (
                      <div key={index} className="text-sm flex items-center gap-2">
                        <span className="text-muted-foreground">•</span>
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {uploading && (
                <div className="space-y-2">
                  <Label>Progression de l'upload</Label>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    {uploadProgress}% - {optimizeImages ? 'Optimisation et upload en cours...' : 'Upload en cours...'}
                  </p>
                </div>
              )}

              {/* Bouton d'upload */}
              <Button 
                onClick={handleUpload} 
                disabled={uploading || !selectedFiles || selectedFiles.length === 0}
                className="w-full"
                size="lg"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {optimizeImages ? 'Optimisation et upload...' : 'Upload en cours...'}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    {optimizeImages ? 'Optimiser et Uploader sur S3' : 'Uploader sur S3'}
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="optimize" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Optimisations appliquées automatiquement :</strong>
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">🎨 Formats modernes</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>WebP</strong> : ~30% plus léger que JPEG, supporte la transparence</li>
                    <li>• <strong>AVIF</strong> : ~50% plus léger que JPEG, meilleure qualité</li>
                    <li>• <strong>PNG</strong> : Conservé pour la transparence si nécessaire</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">📐 Tailles responsive</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Logos</strong> : 400px, 200px, 100px</li>
                    <li>• <strong>Hero</strong> : 2560px, 1920px, 1280px, 768px</li>
                    <li>• <strong>Contenu</strong> : 1920px, 1280px, 768px, 400px</li>
                    <li>• <strong>Vignettes</strong> : 400px, 200px</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">⚡ Techniques d'optimisation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Compression intelligente adaptée au format</li>
                    <li>• Suppression des métadonnées inutiles</li>
                    <li>• Profil couleur sRGB pour compatibilité web</li>
                    <li>• Accentuation après redimensionnement</li>
                    <li>• Algorithme Lanczos3 pour un redimensionnement optimal</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Erreurs */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Résultats */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Images uploadées et optimisées</Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyUrlsToClipboard}
                >
                  Copier les URLs
                </Button>
              </div>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="font-medium text-sm">{result.description}</p>
                          <p className="text-xs text-muted-foreground break-all">
                            URL principale: {result.url}
                          </p>
                        </div>
                        
                        {result.optimization && (
                          <div className="bg-green-50 dark:bg-green-950 rounded-md p-3 space-y-1">
                            <p className="text-sm font-medium text-green-800 dark:text-green-200">
                              ✨ Optimisation réussie
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-green-700 dark:text-green-300">
                              <span>Économies: {result.optimization.savingsPercent}%</span>
                              <span>Meilleure taille: {formatSize(result.optimization.bestSizeKB)}</span>
                              <span>Variantes: {result.optimization.totalVariants}</span>
                              <span>Formats: {result.optimization.formats.join(', ')}</span>
                            </div>
                          </div>
                        )}
                        
                        {result.variants && result.variants.length > 0 && (
                          <details className="text-xs">
                            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                              Voir toutes les variantes ({result.variants.length})
                            </summary>
                            <div className="mt-2 space-y-1 pl-4">
                              {result.variants.map((variant, vIndex) => (
                                <div key={vIndex} className="text-muted-foreground">
                                  • {variant.format.toUpperCase()} {variant.width}x{variant.height} - {formatSize(variant.sizeKB)}
                                </div>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Résumé des économies */}
              {results.some(r => r.optimization) && (
                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    <strong>Résumé de l'optimisation :</strong><br/>
                    Économies moyennes de {
                      Math.round(
                        results
                          .filter(r => r.optimization)
                          .reduce((sum, r) => sum + (r.optimization?.savingsPercent || 0), 0) / 
                        results.filter(r => r.optimization).length
                      )
                    }% sur {results.filter(r => r.optimization).length} image(s).<br/>
                    Les images sont maintenant optimisées pour un chargement rapide sur le web !
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}