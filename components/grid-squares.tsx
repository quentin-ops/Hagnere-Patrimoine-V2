"use client"

import { useEffect, useRef, useState } from 'react'

interface SquareMeta {
  left: number
  top: number
  duration: number
  delay: number
}

export function GridSquares() {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [squares, setSquares] = useState<SquareMeta[]>([])

  useEffect(() => {
    const CELL = 32
    const update = () => {
      const element = overlayRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const cols = Math.max(1, Math.floor(rect.width / CELL))
      const rows = Math.max(1, Math.floor(rect.height / CELL))
      const count = Math.min(120, Math.floor(cols * rows * 0.04))

      const next: SquareMeta[] = []
      for (let index = 0; index < count; index++) {
        const column = Math.floor(Math.random() * cols)
        const row = Math.floor(Math.random() * rows)
        next.push({
          left: column * CELL,
          top: row * CELL,
          duration: 2 + Math.random() * 4,
          delay: Math.random() * 4,
        })
      }
      setSquares(next)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 block dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
        }}
      />
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
        }}
      >
        {squares.map((square, index) => (
          <span
            key={`${square.left}-${square.top}-${index}`}
            className="absolute bg-zinc-400/40 dark:bg-white/20"
            style={{
              left: square.left,
              top: square.top,
              width: 32,
              height: 32,
              animation: `gridFlicker ${square.duration}s ease-in-out ${square.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
