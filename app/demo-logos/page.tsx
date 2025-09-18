'use client'

import { Logo, ThemedLogo, HeaderLogo, FooterLogo } from '@/components/logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DemoLogosPage() {
  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Démonstration des Logos</h1>
          <p className="text-muted-foreground">
            Tous les logos optimisés et leurs variantes
          </p>
        </div>

        {/* Tabs pour différentes démos */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tous les logos</TabsTrigger>
            <TabsTrigger value="themed">Adaptatifs</TabsTrigger>
            <TabsTrigger value="sizes">Tailles</TabsTrigger>
            <TabsTrigger value="usage">Utilisation</TabsTrigger>
          </TabsList>

          {/* Tab 1: Tous les logos */}
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Elite Light */}
              <Card>
                <CardHeader>
                  <CardTitle>Elite - Version Claire</CardTitle>
                  <CardDescription>Sur fond gris clair</CardDescription>
                </CardHeader>
                <CardContent className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                  <Logo variant="elite-light" size="lg" />
                </CardContent>
              </Card>

              {/* Elite Dark */}
              <Card>
                <CardHeader>
                  <CardTitle>Elite - Version Sombre</CardTitle>
                  <CardDescription>Sur fond gris foncé</CardDescription>
                </CardHeader>
                <CardContent className="bg-gray-800 rounded-lg p-8 flex items-center justify-center">
                  <Logo variant="elite-dark" size="lg" />
                </CardContent>
              </Card>

              {/* Patrimoine Black */}
              <Card>
                <CardHeader>
                  <CardTitle>Patrimoine - Noir</CardTitle>
                  <CardDescription>Sur fond transparent/clair</CardDescription>
                </CardHeader>
                <CardContent className="bg-white rounded-lg p-8 flex items-center justify-center">
                  <Logo variant="patrimoine-black" size="lg" />
                </CardContent>
              </Card>

              {/* Patrimoine White */}
              <Card>
                <CardHeader>
                  <CardTitle>Patrimoine - Blanc</CardTitle>
                  <CardDescription>Sur fond noir</CardDescription>
                </CardHeader>
                <CardContent className="bg-black rounded-lg p-8 flex items-center justify-center">
                  <Logo variant="patrimoine-white" size="lg" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: Logos adaptatifs au thème */}
          <TabsContent value="themed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Logos adaptatifs au thème</CardTitle>
                <CardDescription>
                  Ces logos changent automatiquement selon le thème clair/sombre
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-semibold">Logo Elite (adaptatif)</h3>
                  <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
                    <ThemedLogo type="elite" size="lg" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bascule entre elite-light et elite-dark selon le thème
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Logo Patrimoine (adaptatif)</h3>
                  <div className="bg-muted rounded-lg p-8 flex items-center justify-center">
                    <ThemedLogo type="patrimoine" size="lg" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bascule entre patrimoine-black et patrimoine-white selon le thème
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Différentes tailles */}
          <TabsContent value="sizes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tailles disponibles</CardTitle>
                <CardDescription>4 tailles prédéfinies pour tous les usages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <div key={size} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-20 font-mono text-sm">{size}</div>
                    <Logo variant="elite-light" size={size} />
                    <div className="text-sm text-muted-foreground">
                      {size === 'sm' && '100x30px - Petits espaces'}
                      {size === 'md' && '200x60px - Header standard'}
                      {size === 'lg' && '300x90px - Sections importantes'}
                      {size === 'xl' && '400x120px - Hero, landing'}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Exemples d'utilisation */}
          <TabsContent value="usage" className="space-y-6">
            {/* Header Example */}
            <Card>
              <CardHeader>
                <CardTitle>Header</CardTitle>
                <CardDescription>Logo avec animation au hover</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-b pb-4">
                  <HeaderLogo />
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <code className="text-sm">
                    {`<HeaderLogo className="h-10" />`}
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Footer Example */}
            <Card>
              <CardHeader>
                <CardTitle>Footer</CardTitle>
                <CardDescription>Logo avec copyright</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-white p-8 rounded-lg">
                  <FooterLogo className="text-center" />
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <code className="text-sm">
                    {`<FooterLogo className="mx-auto" />`}
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Exemples de code</CardTitle>
                <CardDescription>Comment utiliser les composants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-semibold">Import des composants :</p>
                  <code className="text-sm block">
                    {`import { Logo, ThemedLogo, HeaderLogo, FooterLogo } from '@/components/logo'`}
                  </code>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-semibold">Logo spécifique :</p>
                  <code className="text-sm block">
                    {`<Logo variant="elite-light" size="lg" priority />`}
                  </code>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-semibold">Logo adaptatif au thème :</p>
                  <code className="text-sm block">
                    {`<ThemedLogo type="elite" size="md" />`}
                  </code>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-semibold">Logo responsive (srcset) :</p>
                  <code className="text-sm block">
                    {`<Logo variant="elite-light" size="lg" responsive />`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Note */}
        <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="text-yellow-800 dark:text-yellow-200">
              ⚠️ Configuration requise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Pour que les logos s'affichent, vous devez mettre à jour les URLs dans{' '}
              <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">
                lib/logos-config.ts
              </code>{' '}
              avec les URLs S3 de vos logos uploadés.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
