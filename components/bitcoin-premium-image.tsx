"use client"

import { useState } from 'react'

export default function BitcoinPremiumImage() {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl font-bold mb-2">₿</div>
          <div className="text-sm font-semibold">Premium</div>
          <div className="text-xs opacity-80">Investment</div>
        </div>
      </div>
    )
  }

  return (
    <img
      src="https://hagnere-patrimoine.s3.eu-north-1.amazonaws.com/logos/bitcoin-premium.png"
      alt="Bitcoin Premium Investment"
      className="w-full h-full object-cover"
      onError={() => setImageError(true)}
    />
  )
}