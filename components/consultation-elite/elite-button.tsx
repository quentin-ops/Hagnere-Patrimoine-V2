"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import EligibilityModal from "./eligibility-modal"

interface EliteButtonProps {
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

export default function EliteButton({
  className,
  variant = "default",
  size = "default",
  children = "Consultation Elite"
}: EliteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsModalOpen(true)}
      >
        {children}
      </Button>

      <EligibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}