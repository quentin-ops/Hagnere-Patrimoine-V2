"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FlickeringGridProps {
  squareSize?: number
  gridGap?: number
  color?: string
  maxOpacity?: number
  flickerChance?: number
  height?: number | string
  width?: number | string
  className?: string
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  color = "#60A5FA",
  maxOpacity = 0.5,
  flickerChance = 0.1,
  height = "100%",
  width = "100%",
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      setCanvasSize({ width: rect.width, height: rect.height })
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const totalSize = squareSize + gridGap
    const cols = Math.ceil(canvasSize.width / totalSize)
    const rows = Math.ceil(canvasSize.height / totalSize)

    const squares: { opacity: number }[][] = []
    for (let i = 0; i < rows; i++) {
      squares[i] = []
      for (let j = 0; j < cols; j++) {
        squares[i][j] = { opacity: Math.random() * maxOpacity }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const square = squares[i][j]

          if (Math.random() < flickerChance) {
            square.opacity = Math.random() * maxOpacity
          }

          ctx.fillStyle = color
          ctx.globalAlpha = square.opacity
          ctx.fillRect(
            j * totalSize,
            i * totalSize,
            squareSize,
            squareSize
          )
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [canvasSize.width, canvasSize.height, color, flickerChance, gridGap, maxOpacity, squareSize])

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  )
}