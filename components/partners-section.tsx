"use client"

import * as React from "react"

// Liste des partenaires avec leurs logos
const partners = [
  {
    name: "CORUM L'Épargne",
    logo: "https://logo.clearbit.com/corum.fr"
  },
  {
    name: "Iroko",
    logo: "https://logo.clearbit.com/iroko.eu"
  },
  {
    name: "Theoreim",
    logo: "https://logo.clearbit.com/theoreim.com"
  },
  {
    name: "Sogenial Immobilier",
    logo: "https://logo.clearbit.com/sogenial.fr"
  },
  {
    name: "BNP Paribas",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/b/b8/BNP_Paribas_logo_%282000%29.svg/440px-BNP_Paribas_logo_%282000%29.svg.png"
  },
  {
    name: "Crédit Agricole",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/c/c6/Logo_Credit_Agricole_2022.svg/440px-Logo_Credit_Agricole_2022.svg.png"
  },
  {
    name: "AXA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/AXA_Logo.svg/440px-AXA_Logo.svg.png"
  },
  {
    name: "Allianz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Allianz_logo.svg/440px-Allianz_logo.svg.png"
  },
  {
    name: "Guyane Agricole",
    logo: "https://logo.clearbit.com/guyane-agricole.fr"
  },
  {
    name: "Industrial Invest",
    logo: "https://logo.clearbit.com/industrial-invest.com"
  },
  {
    name: "Afi Esca",
    logo: "https://logo.clearbit.com/afi-esca.fr"
  },
  {
    name: "Cardif",
    logo: "https://logo.clearbit.com/cardif.fr"
  },
  {
    name: "Vie Plus",
    logo: "https://logo.clearbit.com/vieplus.fr"
  },
  {
    name: "Sanso",
    logo: "https://logo.clearbit.com/sanso-is.com"
  },
  {
    name: "Delubac",
    logo: "https://logo.clearbit.com/delubac.com"
  },
  {
    name: "France Valley",
    logo: "https://logo.clearbit.com/france-valley.com"
  },
  {
    name: "Artemis Courtage",
    logo: "https://logo.clearbit.com/artemiscourtage.com"
  },
  {
    name: "Bankkeys",
    logo: "https://logo.clearbit.com/bankkeys.com"
  }
]

export function PartnersSection() {
  return (
    <section className="relative pt-20 pb-12 px-4 overflow-hidden">
      {/* Background gradient subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-900/30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Nos partenaires principaux
          </h2>
          <p className="text-muted-foreground">
            Des institutions de confiance pour sécuriser vos investissements
          </p>
        </div>

        {/* Carousel de logos */}
        <div className="relative">
          {/* Gradient masks sur les côtés */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div
              className="flex gap-8"
              style={{
                animation: 'scroll 40s linear infinite',
                width: 'max-content'
              }}
            >
              {/* Dupliquer deux fois pour un défilement infini sans coupure */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                >
                  <div className="bg-white rounded-xl p-6 h-28 w-44 flex items-center justify-center border border-gray-200">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-14 max-w-32 w-auto h-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}