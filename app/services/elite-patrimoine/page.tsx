import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Sparkles,
  Shield,
  Building2,
  Heart,
  Globe,
  Gem,
  Star,
  Trophy,
  Award,
  Users,
  ChevronRight,
  Phone,
  Mail,
  Calendar
} from "lucide-react"

export default function ElitePatrimoinePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <Crown className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Hagnéré Elite Patrimoine</h1>
          <p className="text-xl text-gray-300 mb-8">
            Services exclusifs pour une gestion patrimoniale d'exception
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
              <Calendar className="mr-2 h-5 w-5" />
              Consultation Privée
            </Button>
            <Button size="lg" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
              <Phone className="mr-2 h-5 w-5" />
              Ligne Directe Elite
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Services Premium Exclusifs</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Family Office */}
            <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-amber-500/50 transition-all">
              <Crown className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Family Office</h3>
              <p className="text-gray-400 mb-4">
                Gestion intégrale de votre patrimoine avec une équipe dédiée d'experts
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Stratégie patrimoniale sur-mesure</li>
                <li>• Consolidation multi-banques</li>
                <li>• Reporting personnalisé</li>
                <li>• Accès 24/7 à votre conseiller</li>
              </ul>
            </Card>

            {/* Art & Collections */}
            <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-amber-500/50 transition-all">
              <Sparkles className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Art & Collections</h3>
              <p className="text-gray-400 mb-4">
                Investissement passion et diversification patrimoniale
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Conseil en acquisition d'œuvres</li>
                <li>• Gestion de collections</li>
                <li>• Vins & spiritueux rares</li>
                <li>• Véhicules de collection</li>
              </ul>
            </Card>

            {/* Philanthropie */}
            <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-amber-500/50 transition-all">
              <Heart className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Philanthropie</h3>
              <p className="text-gray-400 mb-4">
                Donnez du sens à votre patrimoine
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Création de fondation</li>
                <li>• Stratégie de mécénat</li>
                <li>• Optimisation fiscale des dons</li>
                <li>• Impact investing</li>
              </ul>
            </Card>

            {/* Conciergerie Patrimoniale */}
            <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-amber-500/50 transition-all">
              <Gem className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Conciergerie Patrimoniale</h3>
              <p className="text-gray-400 mb-4">
                Services exclusifs pour simplifier votre quotidien
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Gestion administrative complète</li>
                <li>• Services juridiques premium</li>
                <li>• Accès événements privés</li>
                <li>• Réseau international VIP</li>
              </ul>
            </Card>

            {/* Expatriation */}
            <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-amber-500/50 transition-all">
              <Globe className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expatriation</h3>
              <p className="text-gray-400 mb-4">
                Accompagnement international complet
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Optimisation fiscale internationale</li>
                <li>• Structuration offshore</li>
                <li>• Relocation services</li>
                <li>• Réseaux bancaires mondiaux</li>
              </ul>
            </Card>

            {/* Club Privé */}
            <Card className="bg-zinc-900 border-zinc-800 p-6 hover:border-amber-500/50 transition-all">
              <Trophy className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Club Hagnéré Elite</h3>
              <p className="text-gray-400 mb-4">
                Accès au cercle le plus exclusif
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Événements privés mensuels</li>
                <li>• Masterclass avec experts</li>
                <li>• Voyages patrimoniaux</li>
                <li>• Network ultra-privilégié</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Privilèges Exclusifs</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Star className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Conseiller Senior Dédié</h3>
                <p className="text-gray-400">Expert patrimonial avec plus de 15 ans d'expérience, disponible 24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Award className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Tarification Préférentielle</h3>
                <p className="text-gray-400">Conditions exclusives sur l'ensemble de nos services et produits</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Protection Juridique Renforcée</h3>
                <p className="text-gray-400">Équipe d'avocats spécialisés en droit patrimonial à votre service</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Réseau International</h3>
                <p className="text-gray-400">Accès à notre réseau mondial de partenaires premium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-amber-900/20 to-amber-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Rejoignez l'Excellence Patrimoniale
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Accès sur invitation uniquement - Patrimoine minimum : 5M€
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
              Demander une Invitation
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="mr-2 h-5 w-5" />
              elite@hagnere-patrimoine.fr
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}