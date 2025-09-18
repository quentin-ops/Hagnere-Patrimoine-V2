"use client"

import { useEffect, useRef, useState } from "react"
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

export default function StripeGlobe() {
  const globeRef = useRef<any>(null)
  const [arcs, setArcs] = useState<Arc[]>([])
  const [points, setPoints] = useState<Point[]>([])
  const [globeReady, setGlobeReady] = useState(false)

  // Cities with Hagnéré Patrimoine presence
  const cities = [
    { lat: 48.8566, lng: 2.3522, label: "Paris", size: 0.8, hq: true },
    { lat: 45.5646, lng: 5.9178, label: "Chambéry", size: 0.4 },
    { lat: 45.5017, lng: -73.5673, label: "Montréal", size: 0.5 },
    { lat: 1.3521, lng: 103.8198, label: "Singapour", size: 0.5 },
    { lat: 40.7128, lng: -74.0060, label: "New York", size: 0.6 },
    { lat: 51.5074, lng: -0.1278, label: "Londres", size: 0.6 },
    { lat: 35.6762, lng: 139.6503, label: "Tokyo", size: 0.5 },
    { lat: -33.8688, lng: 151.2093, label: "Sydney", size: 0.4 },
    { lat: 25.2048, lng: 55.2708, label: "Dubai", size: 0.5 },
    { lat: 47.3769, lng: 8.5417, label: "Zurich", size: 0.5 },
  ]

  useEffect(() => {
    // Create points from cities
    const cityPoints = cities.map(city => ({
      lat: city.lat,
      lng: city.lng,
      size: city.size,
      color: city.hq ? "#60a5fa" : "#ffffff",
      label: city.label
    }))

    // Add random dots around the globe for ambient effect
    const randomPoints = Array.from({ length: 300 }, () => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() * 0.2,
      color: "#1e3a8a",
    }))

    setPoints([...cityPoints, ...randomPoints])

    // Create arcs between Paris (HQ) and other cities
    const parisCoords = cities.find(c => c.label === "Paris")!
    const connectionArcs = cities
      .filter(city => city.label !== "Paris")
      .map(city => ({
        startLat: parisCoords.lat,
        startLng: parisCoords.lng,
        endLat: city.lat,
        endLng: city.lng,
        color: "#60a5fa"
      }))

    // Animate arcs appearance
    const timer = setTimeout(() => {
      setArcs(connectionArcs)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (globeRef.current && !globeReady) {
      // Configure globe
      const globe = globeRef.current
      
      // Set initial position
      globe.pointOfView({ lat: 45, lng: 10, altitude: 2.5 }, 0)
      
      // Auto-rotate
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.5
      globe.controls().enableZoom = false
      
      setGlobeReady(true)
    }
  }, [globeRef.current])

  return (
    <div className="relative w-full h-[520px] bg-black rounded-2xl overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {/* Static stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
        
        {/* Twinkling stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`twinkle-${i}`}
            className="absolute rounded-full bg-blue-200 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Globe */}
      <Globe
        ref={globeRef}
        width={typeof window !== 'undefined' ? window.innerWidth : 1000}
        height={520}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        showGraticules={false}
        
        // Points layer
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.01}
        pointRadius="size"
        pointResolution={4}
        
        // Arcs layer
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={3000}
        arcStroke={0.5}
        arcAltitudeAutoScale={0.3}
        
        // Atmosphere
        atmosphereColor="#1e3a8a"
        atmosphereAltitude={0.15}
        
        // Labels
        labelsData={cities.filter(c => c.hq)}
        labelLat="lat"
        labelLng="lng"
        labelText="label"
        labelSize={1.5}
        labelColor={() => "#60a5fa"}
        labelDotRadius={0.8}
        labelAltitude={0.02}
        labelResolution={2}
      />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />
      
      {/* Info text */}
      <div className="absolute bottom-6 left-6 text-white/60 text-sm">
        <p className="font-medium text-white/80 mb-1">Réseau mondial</p>
        <p className="text-xs">Accompagnement patrimonial dans 10+ pays</p>
      </div>
    </div>
  )
}