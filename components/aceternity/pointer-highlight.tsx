"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface PointerHighlightProps {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  duration?: number
}

export const PointerHighlight: React.FC<PointerHighlightProps> = ({
  children,
  containerClassName = "",
  className = "",
  duration = 3,
}) => {
  const [showPointer, setShowPointer] = useState(false)
  const [showClick, setShowClick] = useState(false)
  const [isHighlighted, setIsHighlighted] = useState(false)

  useEffect(() => {
    const runAnimation = () => {
      // Reset tout
      setShowPointer(false)
      setShowClick(false)
      setIsHighlighted(false)

      // Montre le curseur après un délai
      setTimeout(() => setShowPointer(true), 800)

      // Montre l'effet de double-clic
      setTimeout(() => setShowClick(true), 1500)

      // Active la surbrillance
      setTimeout(() => setIsHighlighted(true), 1800)

      // Cache tout
      setTimeout(() => {
        setShowPointer(false)
        setShowClick(false)
        setIsHighlighted(false)
      }, 4000)
    }

    // Lance l'animation immédiatement
    runAnimation()

    // Relance l'animation en boucle
    const interval = setInterval(runAnimation, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={cn("relative inline-block", containerClassName)}>
      {/* Curseur animé */}
      <AnimatePresence>
        {showPointer && (
          <motion.div
            className="pointer-events-none absolute z-50"
            initial={{ 
              opacity: 0,
              scale: 0.5,
              left: "50%",
              top: "50%",
              x: 20,
              y: -20,
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
              left: "50%",
              top: "50%",
              x: 0,
              y: 0,
            }}
            exit={{ 
              opacity: 0,
              scale: 0.5,
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="drop-shadow-lg"
            >
              <path
                d="M4 2L16 8L10 10L6 16L4 2Z"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effet de double-clic */}
      <AnimatePresence>
        {showClick && (
          <>
            <motion.span
              className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/40"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: 2,
                opacity: 0,
              }}
              transition={{ 
                duration: 0.4,
                ease: "easeOut",
              }}
            />
            <motion.span
              className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/40"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: 2.5,
                opacity: 0,
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeOut",
                delay: 0.1,
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Effet de surbrillance */}
      <AnimatePresence>
        {isHighlighted && (
          <motion.span
            className={cn(
              "absolute inset-0 -z-10 block",
              className
            )}
            initial={{ 
              scaleX: 0,
              opacity: 0,
            }}
            animate={{ 
              scaleX: 1,
              opacity: 1,
            }}
            exit={{ 
              scaleX: 1,
              opacity: 0,
            }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut",
            }}
            style={{
              background: "rgba(59, 130, 246, 0.4)",
              transformOrigin: "center",
              padding: "2px 8px",
              margin: "-2px -8px",
              borderRadius: "2px",
            }}
          />
        )}
      </AnimatePresence>

      {/* Le texte */}
      <span 
        className={cn(
          "relative z-10 transition-colors duration-200",
          isHighlighted ? "text-white" : ""
        )}
      >
        {children}
      </span>
    </span>
  )
}