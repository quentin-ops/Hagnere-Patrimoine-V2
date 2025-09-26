"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"

const Header3 = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#", label: "Accueil" },
    { href: "#", label: "Services" },
    { href: "#", label: "À propos" },
    { href: "#", label: "Portfolio" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-black">Logo</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <AnimatedThemeToggler />
            <Button variant="outline" className="border-black text-black hover:bg-gray-100">Se connecter</Button>
            <Button className="bg-black hover:bg-gray-800 text-white">Commencer</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <div className="flex justify-center py-2">
                  <AnimatedThemeToggler />
                </div>
                <Button variant="outline" className="w-full justify-start border-black text-black hover:bg-gray-100">
                  Se connecter
                </Button>
                <Button className="w-full bg-black hover:bg-gray-800 text-white">
                  Commencer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export { Header3 }
