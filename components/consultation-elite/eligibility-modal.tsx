"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EligibilityModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EligibilityModal({ isOpen, onClose }: EligibilityModalProps) {
  const [amount, setAmount] = useState([140000])
  const [isChecked, setIsChecked] = useState(false)

  const investmentThreshold = 250000
  const patrimonyThreshold = 1000000

  const isEligibleInvestment = amount[0] >= investmentThreshold
  const isEligiblePatrimony = amount[0] >= patrimonyThreshold

  const handleCheck = () => {
    setIsChecked(true)
  }

  const formatAmount = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1).replace('.0', '')} M€`
    }
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Consultation Elite Patrimoine
          </DialogTitle>
          <p className="text-lg text-muted-foreground mt-2">
            Vérification d'éligibilité
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!isChecked ? (
            <>
              {/* Question initiale */}
              <Alert className="border-primary/20 bg-primary/5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-base">
                  <strong>Êtes-vous certain d'être éligible à cette consultation ?</strong>
                </AlertDescription>
              </Alert>

              {/* Message d'exclusivité */}
              <div className="text-center py-2">
                <Badge variant="secondary" className="text-sm px-4 py-1">
                  La Consultation Elite est réservée à nos clients premium
                </Badge>
              </div>

              {/* Critères d'éligibilité */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold">
                    Critères d'éligibilité (au moins un requis) :
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={`${isEligibleInvestment ? 'border-green-500 bg-green-50/50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Capacité d'investissement</h4>
                          <p className="text-2xl font-bold text-primary">
                            Minimum : 250 000€
                          </p>
                          <p className="text-sm text-muted-foreground">
                            À placer chez nous
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`${isEligiblePatrimony ? 'border-green-500 bg-green-50/50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold">Patrimoine financier</h4>
                          <p className="text-2xl font-bold text-primary">
                            Minimum : 1 000 000€
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Net d'endettement
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Simulateur */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Vérifiez votre éligibilité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-4xl font-bold text-center text-primary py-2">
                      {formatAmount(amount[0])}
                    </div>

                    <Slider
                      value={amount}
                      onValueChange={setAmount}
                      min={0}
                      max={1000000}
                      step={10000}
                      className="w-full"
                    />

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0€</span>
                      <span>250 000€</span>
                      <span>500 000€</span>
                      <span>750 000€</span>
                      <span>1M€</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheck}
                    size="lg"
                    className="w-full"
                  >
                    Vérifier mon éligibilité
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Note :</strong> La Consultation Elite offre un accompagnement personnalisé
                    avec des stratégies avancées d'optimisation patrimoniale et fiscale,
                    réservé à nos clients premium.
                  </p>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Résultat */
            <div className="space-y-6">
              <Card className={isEligibleInvestment || isEligiblePatrimony ? "border-green-500" : "border-destructive"}>
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    {(isEligibleInvestment || isEligiblePatrimony) ? (
                      <>
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                        <h3 className="text-2xl font-bold text-green-600">
                          Félicitations ! Vous êtes éligible
                        </h3>
                        <p className="text-muted-foreground">
                          Votre profil correspond aux critères de la Consultation Elite.
                        </p>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Accès Premium Approuvé
                        </Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-16 w-16 text-destructive mx-auto" />
                        <h3 className="text-2xl font-bold">
                          Vous n'êtes pas encore éligible
                        </h3>
                        <p className="text-muted-foreground">
                          Votre profil ne correspond pas encore aux critères de la Consultation Elite.
                        </p>
                        <Badge variant="destructive">
                          Critères non atteints
                        </Badge>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {(isEligibleInvestment || isEligiblePatrimony) ? (
                <>
                  {/* Avantages pour les éligibles */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="font-semibold">Accompagnement Premium</div>
                        <div className="text-sm text-muted-foreground">Sur-mesure</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="font-semibold">Expert Dédié</div>
                        <div className="text-sm text-muted-foreground">Senior</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                        <div className="font-semibold">Stratégies Exclusives</div>
                        <div className="text-sm text-muted-foreground">Haut de gamme</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={() => window.location.href = "/consultation-elite/reservation"}
                    >
                      Réserver ma Consultation Elite
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setIsChecked(false)
                        setAmount([500000])
                      }}
                    >
                      Refaire le test
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Alternative pour les non-éligibles */}
                  <Card className="bg-muted/50">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2">
                        Découvrez notre Bilan Patrimonial Gratuit
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Profitez d'une analyse complète de votre situation patrimoniale,
                        adaptée à votre profil actuel.
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Analyse personnalisée
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          Recommandations adaptées
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          100% gratuit et sans engagement
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={() => window.location.href = "/bilan-patrimonial-gratuit"}
                    >
                      Accéder au Bilan Gratuit
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setIsChecked(false)
                        setAmount([500000])
                      }}
                    >
                      Refaire le test
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}