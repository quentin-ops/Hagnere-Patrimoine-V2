'use client'

import GlobeWrapper from '@/components/globe-wrapper'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Globe, Shield, TrendingUp, Users, Building, Award, Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function OptimisationInternationalePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Globe */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <GlobeWrapper />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Services internationaux
            </Badge>
            <h2 className="text-4xl font-semibold text-gray-900 dark:text-white lg:text-5xl mb-4">
              Nos solutions d'optimisation internationale
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Expertise transfrontalière pour optimiser votre patrimoine à l'échelle mondiale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gestion transfrontalière</h3>
              <p className="text-muted-foreground mb-4">
                Optimisation fiscale et patrimoniale pour les expatriés et les patrimoines internationaux.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Conventions fiscales internationales
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Exit tax et impatriation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Trusts et structures internationales
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Protection internationale</h3>
              <p className="text-muted-foreground mb-4">
                Sécurisation de vos actifs à travers différentes juridictions.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Assurance-vie luxembourgeoise
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Comptes bancaires multi-devises
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Diversification géographique
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all">
              <Building className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Immobilier international</h3>
              <p className="text-muted-foreground mb-4">
                Investissements immobiliers dans les meilleures opportunités mondiales.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Marchés européens et américains
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  SCPI européennes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  REITs internationaux
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Investissements globaux</h3>
              <p className="text-muted-foreground mb-4">
                Accès aux marchés financiers mondiaux et opportunités exclusives.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Private equity international
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Hedge funds offshore
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Marchés émergents
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expatriation patrimoniale</h3>
              <p className="text-muted-foreground mb-4">
                Accompagnement complet pour les changements de résidence fiscale.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Optimisation avant départ
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Structuration nouvelle résidence
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Suivi post-expatriation
                </li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="bg-card p-6 rounded-lg border hover:shadow-lg transition-all">
              <Briefcase className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Structuration d'entreprise</h3>
              <p className="text-muted-foreground mb-4">
                Holdings et structures internationales pour entrepreneurs.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Holdings européennes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Optimisation des flux
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  IP box et brevets
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Développez votre patrimoine à l'international
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Bénéficiez de notre expertise dans 22 pays pour optimiser et sécuriser vos actifs à l'échelle mondiale.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Consulter un expert international
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services/elite-patrimoine">
                  Découvrir Elite Patrimoine
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}