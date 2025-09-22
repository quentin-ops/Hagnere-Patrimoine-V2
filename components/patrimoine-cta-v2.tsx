'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface PatrimoineCTAProps {
  position?: 'first' | 'second' | 'end'
}

export default function PatrimoineCTA({ position = 'end' }: PatrimoineCTAProps) {
  // Version adaptée pour sidebar - design vertical compact style Hagnéré Investissement
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Gradient subtil de fond */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/10" />
      
      {/* Grille de points en arrière-plan pour effet tech */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Illustration 3D en arrière-plan avec opacité */}
      <div className="absolute right-0 bottom-0 w-48 h-48 opacity-30">
        <Image
          src="https://hagnerepatrimoine.s3.eu-north-1.amazonaws.com/uploads/1758547885734-3d-building-illustration.png"
          alt="3D Building"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="relative z-10 p-6">
        {/* Titre principal */}
        <h3 className="text-2xl font-bold text-white mb-1">
          Hagnéré
        </h3>
        <h3 className="text-2xl font-bold text-white mb-3">
          Patrimoine
        </h3>
        
        {/* Sous-titre */}
        <p className="text-sm text-gray-300 mb-6 leading-relaxed">
          Optimisez votre patrimoine et réduisez vos impôts légalement.
        </p>
        
        {/* 3 Cards métriques - disposition verticale */}
        <div className="space-y-3 mb-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between border border-white/10">
            <div>
              <p className="text-2xl font-bold text-white">30%</p>
              <p className="text-xs text-gray-400">Économie d'impôts moyenne</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between border border-white/10">
            <div>
              <p className="text-2xl font-bold text-white">0€</p>
              <p className="text-xs text-gray-400">Frais cachés</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center justify-between border border-white/10">
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-gray-400">Sur-mesure</p>
            </div>
          </div>
        </div>
        
        {/* Boutons empilés */}
        <div className="space-y-2">
          <Button
            asChild
            size="sm"
            className="w-full bg-white text-black hover:bg-gray-100 font-medium rounded-full"
          >
            <Link href="/prendre-rdv">
              Prendre rendez-vous
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-full bg-transparent text-white border-white/30 hover:bg-white/10 font-medium rounded-full"
          >
            <Link href="/">
              Découvrir le site
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Export nommé pour compatibilité
export { PatrimoineCTA }
