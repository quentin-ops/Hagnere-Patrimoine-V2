"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LineShadowTextProps {
  children: React.ReactNode
  className?: string
}

export const LineShadowText: React.FC<LineShadowTextProps> = ({ 
  children, 
  className 
}) => {
  return (
    <span className={cn("relative inline-block", className)}>
      {/* Ligne verticale qui scanne le texte */}
      <motion.span
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-black/50 to-transparent z-20"
        initial={{ left: "-5%" }}
        animate={{ 
          left: ["-5%", "105%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 1,
        }}
      />
      
      {/* Texte principal */}
      <span className="relative z-10 font-bold text-black">
        {children}
      </span>
      
      {/* Ombre subtile du texte */}
      <span 
        className="absolute inset-0 font-bold text-black/10 blur-sm -z-10"
        style={{ transform: "translateY(2px)" }}
      >
        {children}
      </span>
    </span>
  )
}