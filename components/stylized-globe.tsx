"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Globe as GlobeIcon, FileText, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { FeatureCollection } from 'geojson'

type City = {
  lat: number
  lng: number
  label: string
  size: number
  color: string
  pulse?: boolean
}

type Arc = {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: string
}

type GlobeControls = {
  autoRotate: boolean
  autoRotateSpeed: number
  enableZoom: boolean
  minDistance: number
  maxDistance: number
  enablePan: boolean
  enableRotate: boolean
}

type GlobeInstance = {
  pointOfView: (coords: { lat: number; lng: number; altitude: number }, ms?: number) => void
  controls: () => GlobeControls
}

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
})

export default function StylizedGlobe() {
  const globeRef = useRef<GlobeInstance | null>(null)
  const [countries, setCountries] = useState<FeatureCollection | null>(null)
  const [visibleArcs, setVisibleArcs] = useState<Arc[]>([])
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  // Generate stable star positions
  const [stars] = useState(() => 
    Array.from({ length: 200 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 2,
      height: Math.random() * 2,
      opacity: Math.random() * 0.8,
    }))
  )
  
  // Cities with presence - Chambéry as HQ
  const cities = useMemo<City[]>(() => [
    // HQ - blue point
    { lat: 45.5646, lng: 5.9178, label: "Chambéry", size: 0.4, color: "#60a5fa", pulse: true },
    
    // Europe capitals and major cities - smaller white dots
    { lat: 48.8566, lng: 2.3522, label: "Paris", size: 0.3, color: "#ffffff" },
    { lat: 51.5074, lng: -0.1278, label: "Londres", size: 0.3, color: "#ffffff" },
    { lat: 52.5200, lng: 13.4050, label: "Berlin", size: 0.25, color: "#ffffff" },
    { lat: 40.4168, lng: -3.7038, label: "Madrid", size: 0.25, color: "#ffffff" },
    { lat: 41.9028, lng: 12.4964, label: "Rome", size: 0.25, color: "#ffffff" },
    { lat: 47.3769, lng: 8.5417, label: "Zurich", size: 0.3, color: "#ffffff" },
    { lat: 48.2082, lng: 16.3738, label: "Vienne", size: 0.2, color: "#ffffff" },
    { lat: 59.3293, lng: 18.0686, label: "Stockholm", size: 0.2, color: "#ffffff" },
    { lat: 52.3676, lng: 4.9041, label: "Amsterdam", size: 0.25, color: "#ffffff" },
    { lat: 50.8503, lng: 4.3517, label: "Bruxelles", size: 0.2, color: "#ffffff" },
    { lat: 43.7384, lng: 7.4246, label: "Monaco", size: 0.3, color: "#ffffff" },
    { lat: 38.7223, lng: -9.1393, label: "Lisbonne", size: 0.2, color: "#ffffff" },
    { lat: 45.4642, lng: 9.1900, label: "Milan", size: 0.25, color: "#ffffff" },
    { lat: 47.4979, lng: 19.0402, label: "Budapest", size: 0.2, color: "#ffffff" },
    
    // North America - subtle dots
    { lat: 40.7128, lng: -74.0060, label: "New York", size: 0.35, color: "#ffffff" },
    { lat: 34.0522, lng: -118.2437, label: "Los Angeles", size: 0.3, color: "#ffffff" },
    { lat: 41.8781, lng: -87.6298, label: "Chicago", size: 0.25, color: "#ffffff" },
    { lat: 37.7749, lng: -122.4194, label: "San Francisco", size: 0.3, color: "#ffffff" },
    { lat: 25.7617, lng: -80.1918, label: "Miami", size: 0.25, color: "#ffffff" },
    { lat: 43.6532, lng: -79.3832, label: "Toronto", size: 0.25, color: "#ffffff" },
    { lat: 45.5017, lng: -73.5673, label: "Montréal", size: 0.25, color: "#ffffff" },
    { lat: 49.2827, lng: -123.1207, label: "Vancouver", size: 0.2, color: "#ffffff" },
    { lat: 19.4326, lng: -99.1332, label: "Mexico", size: 0.2, color: "#ffffff" },
    
    // South America - minimal presence
    { lat: -23.5505, lng: -46.6333, label: "São Paulo", size: 0.25, color: "#ffffff" },
    { lat: -34.6037, lng: -58.3816, label: "Buenos Aires", size: 0.2, color: "#ffffff" },
    { lat: -22.9068, lng: -43.1729, label: "Rio", size: 0.2, color: "#ffffff" },
    { lat: -33.4489, lng: -70.6693, label: "Santiago", size: 0.2, color: "#ffffff" },
    
    // Middle East & Asia - strategic points
    { lat: 25.2048, lng: 55.2708, label: "Dubai", size: 0.3, color: "#ffffff" },
    { lat: 24.4539, lng: 54.3773, label: "Abu Dhabi", size: 0.25, color: "#ffffff" },
    { lat: 21.3099, lng: 39.1658, label: "Jeddah", size: 0.2, color: "#ffffff" },
    { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.3, color: "#ffffff" },
    { lat: 1.3521, lng: 103.8198, label: "Singapour", size: 0.3, color: "#ffffff" },
    { lat: 22.3193, lng: 114.1694, label: "Hong Kong", size: 0.25, color: "#ffffff" },
    { lat: 31.2304, lng: 121.4737, label: "Shanghai", size: 0.25, color: "#ffffff" },
    { lat: 37.5665, lng: 126.9780, label: "Séoul", size: 0.2, color: "#ffffff" },
    
    // Oceania
    { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.25, color: "#ffffff" },
  ], [])

  // Generate minimal land dots for subtle continent indication (used in fallback)
  const landDots = useMemo(() => {
    const dots: Array<{ lat: number; lng: number; size: number }> = []
    const continentCenters = [
      { lat: 50, lng: 10, size: 0.3 },
      { lat: 0, lng: 20, size: 0.3 },
      { lat: 35, lng: 100, size: 0.3 },
      { lat: 45, lng: -100, size: 0.3 },
      { lat: -15, lng: -60, size: 0.3 },
      { lat: -25, lng: 135, size: 0.3 },
    ]

    continentCenters.forEach((center) => {
      for (let i = 0; i < 5; i += 1) {
        dots.push({
          lat: center.lat + (Math.random() - 0.5) * 20,
          lng: center.lng + (Math.random() - 0.5) * 30,
          size: center.size * (0.5 + Math.random() * 0.5),
        })
      }
    })

    return dots
  }, [])

  const fallbackCityDots = useMemo(
    () =>
      cities.map((city) => ({
        ...city,
        left: ((city.lng + 180) / 360) * 100,
        top: ((90 - city.lat) / 180) * 100,
      })),
    [cities]
  )

  useEffect(() => {
    // Basic WebGL capability detection to avoid renderer crashes in sandboxed contexts
    const checkWebgl = () => {
      if (typeof window === 'undefined') {
        return true
      }

      try {
        const canvas = document.createElement('canvas')
        const gl =
          canvas.getContext('webgl') ||
          canvas.getContext('webgl2') ||
          canvas.getContext('experimental-webgl')
        return Boolean(gl)
      } catch {
        return false
      }
    }

    setWebglSupported(checkWebgl())
  }, [])

  useEffect(() => {
    if (!webglSupported) return

    // Load countries GeoJSON for outlines
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(res => res.json() as Promise<FeatureCollection>)
      .then(setCountries)
      .catch(() => setCountries(null))
  }, [webglSupported])

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) {
      return
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    setPrefersReducedMotion(media.matches)

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }

    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  // Create static arcs to ALL cities
  useEffect(() => {
    if (!webglSupported) {
      setVisibleArcs([])
      return
    }

    if (cities.length > 0) {
      // Create arcs to ALL cities (except Chambéry itself)
      const allStaticArcs = cities
        .slice(1)
        .filter(city => city && city.lat && city.lng)
        .map(city => ({
          startLat: 45.5646,
          startLng: 5.9178,
          endLat: city.lat,
          endLng: city.lng,
          color: 'rgba(96, 165, 250, 0.4)'
        }))
      
      setVisibleArcs(allStaticArcs)
    }
  }, [cities, webglSupported])

  useEffect(() => {
    if (!webglSupported || !globeRef.current) {
      return
    }

    const globe = globeRef.current

    // Initial view - more zoomed in on Europe
    const timer = window.setTimeout(() => {
      globe.pointOfView({ lat: 45, lng: 10, altitude: 1.8 }, 1000)
    }, 100)

    // Auto-rotate
    globe.controls().autoRotate = !prefersReducedMotion
    globe.controls().autoRotateSpeed = prefersReducedMotion ? 0 : 0.45
    globe.controls().enableZoom = false  // Disable zoom to allow page scroll
    globe.controls().minDistance = 150
    globe.controls().maxDistance = 600
    globe.controls().enablePan = false
    globe.controls().enableRotate = true

    return () => {
      window.clearTimeout(timer)
    }
  }, [webglSupported, prefersReducedMotion])

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-black via-slate-950 to-black rounded-2xl overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.width}px`,
              height: `${star.height}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      
      <div className="w-full h-full flex items-center justify-end pr-8" style={{ perspective: '1000px' }}>
        {webglSupported ? (
          <Globe
            ref={globeRef}
            width={700}
            height={580}
            backgroundColor="rgba(0,0,0,0)"
            rendererConfig={{ 
              preserveDrawingBuffer: false,
              antialias: true,
              alpha: true
            }}
          
          // Modern dark globe with topology
          globeImageUrl=""
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showGlobe={true}
          showAtmosphere={true}
          atmosphereColor="#60a5fa"
          atmosphereAltitude={0.3}
          
          // Country polygons with white outlines
          polygonsData={countries?.features ?? []}
          polygonAltitude={0}
          polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
          polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
          polygonStrokeColor={() => 'rgba(255, 255, 255, 0.2)'}
          polygonsTransitionDuration={0}
          
          // Points for cities with glow effect
          pointsData={cities}
          pointLat="lat"
          pointLng="lng"
          pointColor={d => d.pulse ? "#60a5fa" : "rgba(255,255,255,0.8)"}
          pointAltitude={0.01}
          pointRadius={d => d.pulse ? d.size : d.size}
          pointResolution={8}
          
          // Static blue arcs spreading from Chambéry
          arcsData={visibleArcs}
          arcColor={() => 'rgba(96, 165, 250, 0.4)'}
          arcDashLength={0}  // Solid lines
          arcDashGap={0}
          arcDashAnimateTime={0}
          arcStroke={0.12}
          arcAltitudeAutoScale={0.35}
          arcsTransitionDuration={0}
          
          // No labels for cleaner UI
          labelsData={[]}
          />
        ) : (
          <div className="relative h-[520px] w-[520px] max-w-full">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900/35 via-slate-900/70 to-black/85 blur-2xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-white/5" />
            <div className="absolute inset-[8%] rounded-full border border-white/10" />
            <div className="absolute inset-[14%] rounded-full border border-white/5 opacity-70" />
            <div className="absolute inset-[20%] rounded-full border border-white/5 opacity-50" />
            <div className="absolute inset-[10%] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(96,165,250,0.18),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(99,102,241,0.12),transparent_65%)] animate-[pulse_7s_ease-in-out_infinite]" />
              {landDots.map((dot, idx) => {
                const left = ((dot.lng + 180) / 360) * 100
                const top = ((90 - dot.lat) / 180) * 100
                return (
                  <span
                    key={`land-${idx}`}
                    className="absolute rounded-full bg-slate-800"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: `${dot.size * 18}px`,
                      height: `${dot.size * 18}px`,
                      opacity: 0.65,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )
              })}
              {fallbackCityDots.map((city, idx) => (
                <span
                  key={`city-${idx}`}
                  className="absolute rounded-full shadow-[0_0_10px_rgba(96,165,250,0.35)]"
                  style={{
                    left: `${city.left}%`,
                    top: `${city.top}%`,
                    width: `${city.size * 30}px`,
                    height: `${city.size * 30}px`,
                    backgroundColor: city.pulse ? '#60a5fa' : 'rgba(255,255,255,0.8)',
                    transform: 'translate(-50%, -50%)',
                    opacity: city.pulse ? 1 : 0.7,
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-white/60">
              {webglSupported === null
                ? 'Initialisation de la visualisation...'
                : 'Mode statique affiché (WebGL indisponible)'}
            </div>
          </div>
        )}
      </div>
      
      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      
      {/* Main Info Text */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <GlobeIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-6">
          Hagnéré Patrimoine intervient auprès de ses clients dans plus de 25 pays. Rejoignez-nous aussi !
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
            <Link href="/votre-projet">
              <FileText className="mr-2 h-4 w-4" />
              Bilan Patrimonial
            </Link>
          </Button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-10 px-6 rounded-md text-sm font-medium transition-all border border-white bg-transparent text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Link>
        </div>
      </div>
      
    </div>
  )
}
