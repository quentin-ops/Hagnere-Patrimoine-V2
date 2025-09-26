"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  Crown,
  TrendingUp,
  Wallet,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface EliteEligibilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EliteEligibilityModal({
  open,
  onOpenChange,
}: EliteEligibilityModalProps) {
  const router = useRouter();
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [patrimonyAmount, setPatrimonyAmount] = useState<number>(500000);
  const [primaryCriteria, setPrimaryCriteria] = useState<"investment" | "patrimony" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleSliderChange = (value: number[], type: "investment" | "patrimony") => {
    if (type === "investment") {
      setInvestmentAmount(value[0]);
    } else {
      setPatrimonyAmount(value[0]);
    }
    setShowResult(false);
  };

  const checkEligibility = () => {
    setShowResult(true);
  };

  const isEligible = investmentAmount >= 250000 || patrimonyAmount >= 1000000;

  const handleContinue = () => {
    if (isEligible) {
      onOpenChange(false);
      router.push("/consultation-elite");
    }
  };

  const handleAlternative = () => {
    onOpenChange(false);
    router.push("/bilan-patrimonial");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-lg">
              <Crown className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Consultation Elite Patrimoine
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Vérification d'éligibilité
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Question principale */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  Êtes-vous certain d'être éligible à cette consultation ?
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  La Consultation Elite est réservée à nos clients premium
                </p>
              </div>
            </div>
          </div>

          {/* Critères d'éligibilité */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Critères d'éligibilité (au moins un requis) :
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Capacité d'investissement</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">Minimum : 250 000€</p>
                <Badge variant="outline" className="text-xs">À placer chez nous</Badge>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Patrimoine financier</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">Minimum : 1 000 000€</p>
                <Badge variant="outline" className="text-xs">Net d'endettement</Badge>
              </div>
            </div>
          </div>

          {/* Simulateur */}
          <div className="space-y-5 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Vérifiez votre éligibilité
            </h3>

            {/* Question de sélection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Quelle est votre situation ?
              </Label>
              <RadioGroup value={primaryCriteria || ""} onValueChange={(value) => {
                setPrimaryCriteria(value as "investment" | "patrimony");
                setShowResult(false);
              }}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="investment" id="investment" />
                  <Label htmlFor="investment" className="cursor-pointer flex-1">
                    <span className="font-medium">J'ai des liquidités à investir</span>
                    <span className="block text-xs text-gray-500">Montant disponible pour placement</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="patrimony" id="patrimony" />
                  <Label htmlFor="patrimony" className="cursor-pointer flex-1">
                    <span className="font-medium">Je souhaite optimiser mon patrimoine</span>
                    <span className="block text-xs text-gray-500">Valeur totale de mes actifs financiers</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Slider pour montant d'investissement */}
            {primaryCriteria === "investment" && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <Label className="text-sm font-medium">
                    Montant à investir
                  </Label>
                  <span className="text-lg font-bold text-blue-600">
                    {formatNumber(investmentAmount)}
                  </span>
                </div>
                <Slider
                  value={[investmentAmount]}
                  onValueChange={(value) => handleSliderChange(value, "investment")}
                  min={0}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0€</span>
                  <span>250 000€</span>
                  <span>500 000€</span>
                  <span>750 000€</span>
                  <span>1M€</span>
                </div>
              </div>
            )}

            {/* Slider pour patrimoine */}
            {primaryCriteria === "patrimony" && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <Label className="text-sm font-medium">
                    Patrimoine financier net
                  </Label>
                  <span className="text-lg font-bold text-green-600">
                    {formatNumber(patrimonyAmount)}
                  </span>
                </div>
                <Slider
                  value={[patrimonyAmount]}
                  onValueChange={(value) => handleSliderChange(value, "patrimony")}
                  min={0}
                  max={5000000}
                  step={50000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0€</span>
                  <span>1M€</span>
                  <span>2M€</span>
                  <span>3M€</span>
                  <span>4M€</span>
                  <span>5M€</span>
                </div>
              </div>
            )}

            {/* Bouton de vérification */}
            {primaryCriteria && (
              <Button
                onClick={checkEligibility}
                className="w-full"
                variant="default"
              >
                Vérifier mon éligibilité
              </Button>
            )}

            {/* Résultat */}
            {showResult && primaryCriteria && (
              <div className={cn(
                "p-4 rounded-lg border-2 transition-all",
                isEligible
                  ? "bg-green-50 border-green-300"
                  : "bg-red-50 border-red-300"
              )}>
                <div className="flex items-start gap-3">
                  {isEligible ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={cn(
                      "font-semibold",
                      isEligible ? "text-green-900" : "text-red-900"
                    )}>
                      {isEligible
                        ? "✨ Félicitations ! Vous êtes éligible"
                        : "Vous n'êtes pas encore éligible"}
                    </p>
                    <p className={cn(
                      "text-sm mt-1",
                      isEligible ? "text-green-700" : "text-red-700"
                    )}>
                      {isEligible
                        ? "Vous pouvez accéder à notre Consultation Elite Patrimoine"
                        : primaryCriteria === "investment"
                          ? `Il vous manque ${formatNumber(250000 - investmentAmount)} pour atteindre le seuil d'éligibilité`
                          : `Il vous manque ${formatNumber(1000000 - patrimonyAmount)} pour atteindre le seuil d'éligibilité`
                      }
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  {isEligible ? (
                    <>
                      <Button
                        onClick={handleContinue}
                        className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Accéder à la Consultation Elite
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleAlternative}
                        className="flex-1"
                      >
                        Bilan Patrimonial 360° (Gratuit)
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1"
                      >
                        Fermer
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Note informative */}
          {!showResult && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Note :</strong> La Consultation Elite offre un accompagnement personnalisé
                avec des stratégies avancées d'optimisation patrimoniale et fiscale,
                réservé à nos clients premium.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}