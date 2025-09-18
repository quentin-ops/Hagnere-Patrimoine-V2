"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Html } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useRef } from "react"

// Atmosphere shader component
function Atmosphere() {
  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      uniforms: { 
        c: { value: 0.5 }, 
        p: { value: 4.0 }, 
        glowColor: { value: new THREE.Color(0x1e3a8a) } // Bleu nuit
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize( normalMatrix * normal );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        void main() {
          float intensity = pow( c - dot(vNormal, vec3(0.0, 0.0, 1.0)), p );
          gl_FragColor = vec4( glowColor, 0.35 * intensity );
        }
      `,
    })
    return m
  }, [])
  
  return (
    <mesh scale={1.08}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

type Marker = { lat: number; lon: number; label: string; type?: string }

function latLonToVector3(lat: number, lon: number, radius = 1, height = 0) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const r = radius + height
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

function CityMarkers({ markers }: { markers: Marker[] }) {
  return (
    <group>
      {markers.map((m, i) => {
        const pos = latLonToVector3(m.lat, m.lon, 1, 0.01)
        const isHeadquarter = m.type === 'hq'
        return (
          <group key={i} position={pos}>
            {/* Pulse effect for HQ */}
            {isHeadquarter && (
              <mesh>
                <ringGeometry args={[0.02, 0.025, 16]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} />
              </mesh>
            )}
            <mesh>
              <sphereGeometry args={[isHeadquarter ? 0.01 : 0.006, 16, 16]} />
              <meshBasicMaterial color={isHeadquarter ? "#60a5fa" : "#ffffff"} />
            </mesh>
            <Html 
              position={[0, 0.03, 0]} 
              style={{ 
                pointerEvents: "none", 
                fontSize: isHeadquarter ? 14 : 11, 
                fontWeight: isHeadquarter ? 600 : 400,
                whiteSpace: "nowrap", 
                color: "white", 
                textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                background: "rgba(0,0,0,0.5)",
                padding: "2px 6px",
                borderRadius: "4px"
              }}
            >
              {m.label}
            </Html>
          </group>
        )
      })}
    </group>
  )
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!)
  const cloudRef = useRef<THREE.Mesh>(null!)
  
  // Using public domain Earth textures from NASA or procedural approach
  const earthTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    // Using a public Earth texture URL - NASA Blue Marble
    return loader.load(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1024px-Blue_Marble_2002.png',
      undefined,
      undefined,
      () => {
        // Fallback to procedural earth if texture fails
        console.log('Using procedural earth texture')
      }
    )
  }, [])

  // Create a detailed procedural earth material
  const earthMaterial = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    
    // Create gradient for oceans
    const oceanGradient = ctx.createLinearGradient(0, 0, 512, 256)
    oceanGradient.addColorStop(0, '#0a1628')
    oceanGradient.addColorStop(0.5, '#1e3a8a')
    oceanGradient.addColorStop(1, '#0a1628')
    ctx.fillStyle = oceanGradient
    ctx.fillRect(0, 0, 512, 256)
    
    // Add continent shapes (simplified)
    ctx.fillStyle = '#2a4a2a'
    
    // Africa/Europe
    ctx.beginPath()
    ctx.ellipse(256, 100, 40, 60, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Americas
    ctx.beginPath()
    ctx.ellipse(150, 128, 30, 70, -0.2, 0, Math.PI * 2)
    ctx.fill()
    
    // Asia
    ctx.beginPath()
    ctx.ellipse(350, 90, 60, 40, 0, 0, Math.PI * 2)
    ctx.fill()
    
    // Australia
    ctx.beginPath()
    ctx.ellipse(380, 180, 25, 20, 0, 0, Math.PI * 2)
    ctx.fill()
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    
    return new THREE.MeshPhongMaterial({
      map: earthTexture.image ? earthTexture : texture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    })
  }, [earthTexture])

  // Create dots for landmass
  const dotsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = []
    const colors = []
    
    // Create dots on sphere surface
    for (let i = 0; i < 10000; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      
      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.sin(phi) * Math.sin(theta)
      const z = Math.cos(phi)
      
      positions.push(x * 1.005, y * 1.005, z * 1.005)
      
      // Color based on position (simulate continents)
      const isLand = (
        (x > -0.3 && x < 0.3 && z > -0.5) || // Africa/Europe
        (x < -0.5 && Math.abs(y) < 0.3) || // Americas
        (x > 0.3 && z > -0.3) // Asia
      )
      
      if (isLand && Math.random() > 0.7) {
        colors.push(0.2, 0.5, 0.2) // Green for land
      } else {
        colors.push(0, 0, 0) // Transparent for ocean
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    
    return geometry
  }, [])

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.03
  })

  return (
    <group>
      {/* Main earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>
      
      {/* Dots overlay for continents */}
      <points>
        <primitive object={dotsGeometry} attach="geometry" />
        <pointsMaterial 
          size={0.003} 
          vertexColors 
          transparent 
          opacity={0.6}
          sizeAttenuation={false}
        />
      </points>
      
      {/* Grid lines for geographic reference */}
      <mesh>
        <sphereGeometry args={[1.002, 36, 18]} />
        <meshBasicMaterial 
          color={new THREE.Color(0x1e3a8a)}
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.015, 32, 32]} />
        <meshPhongMaterial 
          color={new THREE.Color(0xffffff)}
          transparent
          opacity={0.08}
        />
      </mesh>
      
      <Atmosphere />
    </group>
  )
}

export default function Globe3D() {
  const markers: Marker[] = [
    { lat: 48.8566, lon: 2.3522, label: "Paris", type: "hq" },
    { lat: 45.5646, lon: 5.9178, label: "Chambéry" },
    { lat: 45.5017, lon: -73.5673, label: "Montréal" },
    { lat: 1.3521, lon: 103.8198, label: "Singapour" },
    { lat: 40.7128, lon: -74.0060, label: "New York" },
    { lat: 51.5074, lon: -0.1278, label: "Londres" },
    { lat: 35.6762, lon: 139.6503, label: "Tokyo" },
    { lat: -33.8688, lon: 151.2093, label: "Sydney" },
    { lat: 25.2048, lon: 55.2708, label: "Dubai" },
    { lat: 47.3769, lon: 8.5417, label: "Zurich" },
  ]

  return (
    <div className="w-full h-[520px] rounded-2xl overflow-hidden bg-transparent relative">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none z-10" />
      
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ 
          alpha: true, 
          antialias: true, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} color="#60a5fa" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#1e3a8a" />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        
        {/* Stars background */}
        <Stars 
          radius={100} 
          depth={50} 
          count={3000} 
          factor={3} 
          fade 
          saturation={0.5}
        />
        
        {/* Earth and markers */}
        <Earth />
        <CityMarkers markers={markers} />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          minDistance={1.8}
          maxDistance={3.5}
          enablePan={false}
          rotateSpeed={0.4}
          zoomSpeed={0.5}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 text-white/60 text-xs">
        <p>🌍 Présence mondiale • 10+ pays</p>
      </div>
    </div>
  )
}