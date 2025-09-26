'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Shield, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GestionPatrimoine360() {
  const services = [
    {
      icon: Shield,
      title: "Bilan patrimonial",
      description: "Analyse complète de votre situation financière et patrimoniale",
      features: ["Audit complet", "Objectifs personnalisés", "Stratégies sur mesure"]
    },
    {
      icon: TrendingUp,
      title: "Optimisation fiscale",
      description: "Réduction légale de votre charge fiscale",
      features: ["Défiscalisation", "Investissements optimisés", "Transmission anticipée"]
    },
    {
      icon: Users,
      title: "Retraite",
      description: "Préparation et optimisation de vos revenus futurs",
      features: ["Simulation retraite", "Épargne adaptée", "Revenus complémentaires"]
    },
    {
      icon: CheckCircle,
      title: "Transmission",
      description: "Protection et transmission de votre patrimoine",
      features: ["Donation-partage", "Assurance-vie", "SCI familiale"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4" variant="outline">
            Gestion de Patrimoine
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Gestion de Patrimoine 360°
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Accompagnement personnalisé pour tous vos projets patrimoniaux. 
            Bilan complet, stratégies d'optimisation fiscale, préparation retraite et transmission.
          </p>
          <p className="text-lg text-gray-900 dark:text-gray-400 mt-4 font-semibold">
            Solutions adaptées à partir de 150K€ de patrimoine
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800/30 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gray-900 dark:text-gray-400" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Commencez votre bilan patrimonial gratuit
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez nos solutions personnalisées adaptées à votre situation
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/votre-projet">
              <Button size="lg" variant="secondary" className="font-semibold">
                Bilan Patrimonial Gratuit
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Contactez-nous
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
