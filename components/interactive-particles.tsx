'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  radius: number
  hue: number
  pulsePhase: number
  orbitRadius: number
  orbitSpeed: number
  orbitAngle: number
}

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, isOver: false })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles with 3D properties
    const particleCount = 40
    const particles: Particle[] = []
    const canvasW = canvas.width / window.devicePixelRatio
    const canvasH = canvas.height / window.devicePixelRatio

    // Position particles on the right side
    const centerX = canvasW * 0.85 // Position on right
    const centerY = canvasH / 2

    for (let i = 0; i < particleCount; i++) {
      // Spread particles more randomly on the right side
      const x = centerX + (Math.random() - 0.5) * 200
      const y = (Math.random() * canvasH * 0.8) + canvasH * 0.1

      particles.push({
        x,
        y,
        z: Math.random() * 100 - 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: 0,
        radius: Math.random() * 2.5 + 1,
        hue: 220 + Math.random() * 40, // Blue to purple range
        pulsePhase: Math.random() * Math.PI * 2,
        orbitRadius: 0,
        orbitSpeed: 0,
        orbitAngle: 0
      })
    }

    particlesRef.current = particles

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isOver: true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.isOver = false
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Create explosion effect
      particlesRef.current.forEach(particle => {
        const dx = particle.x - clickX
        const dy = particle.y - clickY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = (200 - distance) / 200
          particle.vx += (dx / distance) * force * 25
          particle.vy += (dy / distance) * force * 25
          particle.vz += (Math.random() - 0.5) * force * 20

          // Add new particles at click point
          if (Math.random() < 0.3 && particlesRef.current.length < 60) {
            particlesRef.current.push({
              x: clickX + (Math.random() - 0.5) * 20,
              y: clickY + (Math.random() - 0.5) * 20,
              z: 0,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              vz: Math.random() * 5,
              radius: Math.random() * 2 + 0.5,
              hue: 220 + Math.random() * 40,
              pulsePhase: Math.random() * Math.PI * 2,
              orbitRadius: 0,
              orbitSpeed: 0,
              orbitAngle: 0
            })
          }
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Sort particles by z-depth for proper rendering
      const sortedParticles = [...particlesRef.current].sort((a, b) => a.z - b.z)

      sortedParticles.forEach((particle, index) => {
        // 3D to 2D projection
        const perspective = 500
        const scale = perspective / (perspective + particle.z)

        // Floating motion
        particle.vy += Math.sin(timeRef.current + particle.pulsePhase) * 0.05
        particle.vx += Math.cos(timeRef.current * 0.5 + particle.pulsePhase) * 0.03

        // Mouse interaction with 3D effect
        if (mouseRef.current.isOver) {
          const dx = particle.x - mouseRef.current.x
          const dy = particle.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const force = (150 - distance) / 150
            particle.vx += (dx / distance) * force * 2
            particle.vy += (dy / distance) * force * 2
            particle.vz += Math.sin(timeRef.current * 2) * force
          }
        }

        // Apply physics
        particle.vx *= 0.96
        particle.vy *= 0.96
        particle.vz *= 0.96

        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Pulsing effect
        const pulse = Math.sin(timeRef.current * 2 + particle.pulsePhase) * 0.3 + 1

        // Draw glowing particle
        const particleRadius = particle.radius * scale * pulse
        const alpha = (0.3 + scale * 0.7) * (1 - Math.abs(particle.z) / 200)

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particleRadius * 4
        )
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alpha * 0.8})`)
        glowGradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 60%, ${alpha * 0.3})`)
        glowGradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particleRadius * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 85%, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections with depth
        sortedParticles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const dz = particle.z - otherParticle.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 120) {
            const lineAlpha = (1 - distance / 120) * 0.3 * alpha

            // Create gradient line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            lineGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${lineAlpha})`)
            lineGradient.addColorStop(0.5, `hsla(${(particle.hue + otherParticle.hue) / 2}, 100%, 60%, ${lineAlpha * 0.8})`)
            lineGradient.addColorStop(1, `hsla(${otherParticle.hue}, 100%, 70%, ${lineAlpha})`)

            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 0.5 * scale
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      // Remove excess particles
      if (particlesRef.current.length > 50) {
        particlesRef.current = particlesRef.current.slice(0, 50)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        mixBlendMode: 'screen',
        opacity: 0.9
      }}
    />
  )
}