"use client"

import { useState, useEffect } from 'react'

export default function GalaxyIframe() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="w-full h-full relative bg-slate-950">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
          <div className="text-white animate-pulse">Chargement de la galaxie 3D...</div>
        </div>
      )}
      <iframe
        src="https://my.spline.design/galaxyflowcopy-2be56c8b91e7bb1f45e019e31f02ad80/"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => setIsLoading(false)}
        style={{ background: 'transparent' }}
        allow="autoplay"
      />
    </div>
  )
}