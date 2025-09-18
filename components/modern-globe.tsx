"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import Globe from "react-globe.gl"

interface Arc {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: string
}

interface Point {
  lat: number
  lng: number
  size: number
  color: string
  label?: string
}

export default function ModernGlobe() {
  const globeRef = useRef<any>(null)
  const [arcs, setArcs] = useState<Arc[]>([])
  const [globeReady, setGlobeReady] = useState(false)

  // Cities with Hagnéré Patrimoine presence
  const cities = [
    { lat: 48.8566, lng: 2.3522, label: "Paris", size: 1.2, hq: true },
    { lat: 45.5646, lng: 5.9178, label: "Chambéry", size: 0.6 },
    { lat: 45.5017, lng: -73.5673, label: "Montréal", size: 0.7 },
    { lat: 1.3521, lng: 103.8198, label: "Singapour", size: 0.7 },
    { lat: 40.7128, lng: -74.0060, label: "New York", size: 0.8 },
    { lat: 51.5074, lng: -0.1278, label: "Londres", size: 0.8 },
    { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.7 },
    { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.6 },
    { lat: 25.2048, lng: 55.2708, label: "Dubai", size: 0.7 },
    { lat: 47.3769, lng: 8.5417, label: "Zurich", size: 0.7 },
  ]

  // Create hexbin data for land masses
  const hexData = useMemo(() => {
    const data = []
    // Create a grid of hexagons
    for (let lat = -80; lat <= 80; lat += 3) {
      for (let lng = -180; lng <= 180; lng += 3) {
        // Simple land detection based on approximate continent positions
        const isLand = 
          // Europe/Africa
          (lng > -20 && lng < 50 && lat > -35 && lat < 70) ||
          // Asia
          (lng > 50 && lng < 150 && lat > -10 && lat < 70) ||
          // North America
          (lng > -170 && lng < -50 && lat > 15 && lat < 70) ||
          // South America
          (lng > -85 && lng < -35 && lat > -55 && lat < 15) ||
          // Australia
          (lng > 110 && lng < 155 && lat > -45 && lat < -10)
        
        if (isLand) {
          data.push({
            lat,
            lng,
            weight: Math.random() * 0.5 + 0.3
          })
        }
      }
    }
    return data
  }, [])

  useEffect(() => {
    // Create arcs between Paris (HQ) and other cities
    const parisCoords = cities.find(c => c.label === "Paris")!
    const connectionArcs = cities
      .filter(city => city.label !== "Paris")
      .map(city => ({
        startLat: parisCoords.lat,
        startLng: parisCoords.lng,
        endLat: city.lat,
        endLng: city.lng,
        color: ["#60a5fa", "#38bdf8", "#0ea5e9"][Math.floor(Math.random() * 3)]
      }))

    // Animate arcs appearance
    let currentArcs: Arc[] = []
    connectionArcs.forEach((arc, index) => {
      setTimeout(() => {
        currentArcs = [...currentArcs, arc]
        setArcs([...currentArcs])
      }, index * 200)
    })
  }, [])

  useEffect(() => {
    if (globeRef.current && !globeReady) {
      const globe = globeRef.current
      
      // Set initial position - more zoomed out
      globe.pointOfView({ lat: 30, lng: 10, altitude: 3.5 }, 0)
      
      // Configure controls
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.3
      globe.controls().enableZoom = true
      globe.controls().minDistance = 2
      globe.controls().maxDistance = 5
      
      setGlobeReady(true)
    }
  }, [globeRef.current])

  return (
    <div className="relative w-full h-[520px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
      
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-blue-950/20 animate-gradient-x" />
      </div>
      
      {/* Stars with glow effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              background: `radial-gradient(circle, rgba(255,255,255,${Math.random() * 0.8 + 0.2}) 0%, transparent 70%)`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255,255,255,${Math.random() * 0.3})`,
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Globe with custom material */}
      <div className="w-full h-full flex items-center justify-center">
        <Globe
          ref={globeRef}
          width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 100, 900) : 900}
          height={520}
          backgroundColor="rgba(0,0,0,0)"
        
        // Globe appearance - Using higher quality NASA texture
        globeImageUrl="https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_8k.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        
        // Hexbin layer for continents
        hexBinPointsData={hexData}
        hexBinPointLat="lat"
        hexBinPointLng="lng"
        hexBinPointWeight="weight"
        hexAltitude={0.01}
        hexBinResolution={3}
        hexTopColor={() => "#1e3a8a"}
        hexSideColor={() => "#0f172a"}
        hexBinMerge={true}
        
        // Points for cities
        pointsData={cities}
        pointLat="lat"
        pointLng="lng"
        pointColor={d => d.hq ? "#60a5fa" : "#ffffff"}
        pointAltitude={0.01}
        pointRadius={d => d.size * 0.3}
        pointResolution={6}
        
        // Arcs between cities
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.3}
        arcDashGap={0.15}
        arcDashAnimateTime={2000}
        arcStroke={0.3}
        arcAltitudeAutoScale={0.3}
        arcsTransitionDuration={0}
        
        // Atmosphere
        atmosphereColor="#38bdf8"
        atmosphereAltitude={0.2}
        
        // Labels for major cities
        labelsData={cities.filter(c => c.hq || c.size > 0.7)}
        labelLat="lat"
        labelLng="lng"
        labelText="label"
        labelSize={1.2}
        labelColor={() => "#94a3b8"}
        labelDotRadius={0.4}
        labelAltitude={0.01}
        labelResolution={2}
        labelIncludeDot={false}
        />
      </div>
      
      {/* Premium overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      {/* Info text */}
      <div className="absolute bottom-6 left-6 z-20">
        <div className="backdrop-blur-md bg-black/40 rounded-lg px-4 py-3 border border-white/10">
          <p className="font-semibold text-white mb-1">Présence Mondiale</p>
          <p className="text-xs text-white/70">10+ pays • 24/7 Support • Expertise locale</p>
        </div>
      </div>
    </div>
  )
}