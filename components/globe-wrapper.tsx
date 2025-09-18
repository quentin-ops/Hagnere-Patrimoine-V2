"use client"

import dynamic from 'next/dynamic'

const StylizedGlobe = dynamic(() => import('./stylized-globe'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center">
      <div className="text-white">Chargement du globe...</div>
    </div>
  )
})

export default function GlobeWrapper() {
  return <StylizedGlobe />
}