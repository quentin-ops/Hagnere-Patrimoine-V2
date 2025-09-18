"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Home, MapPin, TrendingUp, Euro } from 'lucide-react'

interface PropertyCardProps {
  title: string
  location: string
  description: string
  image: string
  type: string
  surface: string
  price: string
  yield: {
    gross: string
    net: string
  }
  badge?: string
}

const properties: PropertyCardProps[] = [
  {
    title: "Le T2 de Aymen",
    location: "Seloncourt (25)",
    description: "T2 rénové récemment avec goût situé dans la commune de Seloncourt, loué avec un parking fermé",
    image: "/property-1.jpg",
    type: "T2",
    surface: "41 m²",
    price: "83 985 €",
    yield: {
      gross: "8.72%",
      net: "6.86%"
    },
    badge: "Projet livré"
  },
  {
    title: "L'immeuble de Jérôme",
    location: "Beaucourt",
    description: "Immeuble situé à 10 min de la frontière Suisse entièrement rénové",
    image: "/property-2.jpg",
    type: "Immeuble",
    surface: "300 m²",
    price: "523 125 €",
    yield: {
      gross: "9.86%",
      net: "8.50%"
    },
    badge: "Projet livré"
  },
  {
    title: "Le T2 de Amandine",
    location: "Belfort (90)",
    description: "Appartement T2 lumineux proche du centre-ville de Belfort, idéalement situé pour les étudiants et jeunes",
    image: "/property-3.jpg",
    type: "T2",
    surface: "45 m²",
    price: "78 250 €",
    yield: {
      gross: "8.66%",
      net: "6.90%"
    },
    badge: "Projet livré"
  }
]

export function PropertyCard({ property }: { property: PropertyCardProps }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[16/10] bg-muted">
        {property.badge && (
          <Badge className="absolute top-3 left-3 z-10 bg-black/80 text-white border-0">
            {property.badge}
          </Badge>
        )}
        <Badge className="absolute top-3 right-3 z-10 bg-white/90 text-black border-0">
          Net {property.yield.net}
        </Badge>
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg'
          }}
        />
      </div>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{property.title} - {property.location}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Typologie</p>
              <p className="font-semibold text-sm">{property.type}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Surface</p>
              <p className="font-semibold text-sm">{property.surface}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Rendement</p>
              <p className="font-semibold text-sm">{property.yield.gross} • Brut</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Euro className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Prix</p>
              <p className="font-semibold text-sm">{property.price}</p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t flex justify-between items-center">
          <div className="text-sm">
            <span className="font-semibold">{property.yield.net}</span>
            <span className="text-muted-foreground"> • Net</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Prix revient
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PropertyCards() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  )
}