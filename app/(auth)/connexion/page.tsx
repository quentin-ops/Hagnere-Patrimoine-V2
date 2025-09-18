"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Lock } from "lucide-react"

export default function ConnexionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/backoffice"
  const errorParam = searchParams?.get("error")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!errorParam) {
      return
    }

    const messages: Record<string, string> = {
      CredentialsSignin: "Email ou mot de passe incorrect",
      AccessDenied: "Accès refusé. Contactez un administrateur.",
      Default: "Une erreur est survenue. Veuillez réessayer.",
    }

    setError(messages[errorParam] ?? messages.Default)
  }, [errorParam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (result?.error) {
        setError("Email ou mot de passe incorrect")
      } else {
        router.push(result?.url ?? callbackUrl)
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col bg-background md:flex-row overflow-hidden">
      {/* Left storytelling panel */}
      <div className="relative flex w-full items-center justify-center bg-black px-8 py-12 text-white md:w-2/5 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-zinc-900 opacity-95" aria-hidden="true" />

        <div className="relative z-10 flex w-full flex-col gap-10 justify-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-light tracking-wide text-zinc-100">
              Bâtir votre patrimoine,<br />
              <span className="font-semibold">Sécuriser votre avenir</span>
            </h2>
            <p className="text-lg leading-relaxed text-zinc-300">
              « La véritable richesse ne se mesure pas seulement en chiffres, mais dans la capacité à créer un héritage durable.
              Chaque décision patrimoniale est une pierre posée pour construire la sérénité financière de demain. »
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full" />
          </div>

          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-semibold text-gray-600">
              QH
            </div>
            <div>
              <div className="font-semibold text-white">Quentin Hagnéré</div>
              <div className="text-xs uppercase tracking-wide text-zinc-400">Fondateur &amp; Président</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full items-center justify-center px-6 py-12 md:w-3/5 md:px-16 overflow-y-auto">
        <Card className="w-full max-w-lg border border-border/60 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-3xl font-semibold">Se connecter</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Content de vous revoir ! Connectez-vous à votre compte pour accéder à votre espace administrateur.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link href="/mot-de-passe-oublie" className="text-xs text-primary hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border border-border text-primary focus:ring-primary/40"
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Se souvenir de moi
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                Vous n'avez pas encore de compte ?{' '}
                <Link href="/" className="text-primary hover:underline">
                  Contactez-nous
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
