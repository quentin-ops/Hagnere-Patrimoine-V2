"use client"

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function GalaxyPoints() {
  const pointsRef = useRef<THREE.Points>(null!)
  const particlesCount = 3000

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3

      // Create spiral galaxy shape
      const radius = Math.random() * 4
      const spinAngle = radius * 3
      const branchAngle = ((i % 3) / 3) * Math.PI * 2

      const randomX = (Math.random() - 0.5) * 0.5
      const randomY = (Math.random() - 0.5) * 0.2
      const randomZ = (Math.random() - 0.5) * 0.5

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Color gradient from center (blue) to edges (purple)
      const insideColor = new THREE.Color(0x4a90e2)
      const outsideColor = new THREE.Color(0x9b59b6)
      const mixedColor = insideColor.clone()
      mixedColor.lerp(outsideColor, radius / 4)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return [positions, colors]
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Galaxy3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 6], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true
        }}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <GalaxyPoints />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}