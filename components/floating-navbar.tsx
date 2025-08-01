"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Enhanced Burger Icon Component with smoother morphing animation
const BurgerIcon = ({ isOpen }) => {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center relative">
      <span
        className={`block h-0.5 w-6 bg-current transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
        }`}
        style={{
          transformOrigin: "center",
        }}
      />
      <span
        className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0"
        }`}
        style={{
          transitionDelay: isOpen ? "100ms" : "0ms",
        }}
      />
      <span
        className={`block h-0.5 w-6 bg-current transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-2"
        }`}
        style={{
          transformOrigin: "center",
        }}
      />
    </div>
  )
}

export default function EnhancedFloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [burgerPosition, setBurgerPosition] = useState({ x: 50, y: 50 })
  const [isAnimating, setIsAnimating] = useState(false)
  const burgerRef = useRef(null)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", controlNavbar)
    return () => window.removeEventListener("scroll", controlNavbar)
  }, [lastScrollY])

  // Enhanced burger menu position calculation
  useEffect(() => {
    if (burgerRef.current) {
      const updatePosition = () => {
        const rect = burgerRef.current.getBoundingClientRect()
        const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100
        const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100
        setBurgerPosition({ x, y })
      }

      updatePosition()
      window.addEventListener("resize", updatePosition)
      return () => window.removeEventListener("resize", updatePosition)
    }
  }, [isVisible])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setIsMobileMenuOpen(!isMobileMenuOpen)

      // Reset animation lock after animation completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 800)
    }
  }

  const closeMobileMenu = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setIsMobileMenuOpen(false)

      setTimeout(() => {
        setIsAnimating(false)
      }, 800)
    }
  }

  return (
    <>
      {/* Main Floating Navbar */}
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 bg-black/85 backdrop-blur-xl border border-white/25 rounded-full px-6 py-3 shadow-2xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image src="/images/logohh.png" alt="HungryzHub Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">HungryzHub</span>
          </Link>

          {/* Navigation Links */}
          <Link href="/vote">
            <Button
              variant="ghost"
              className="text-white/90 hover:text-black hover:bg-white rounded-full px-6 py-2 transition-all duration-300 font-medium tracking-wide text-sm"
            >
              VOTE
            </Button>
          </Link>

          <Link href="/colleges">
            <Button
              variant="ghost"
              className="text-white/90 hover:text-black hover:bg-white rounded-full px-6 py-2 transition-all duration-300 font-medium tracking-wide text-sm"
            >
              FOR COLLEGES
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="ghost"
              className="text-white/90 hover:text-black hover:bg-white rounded-full px-6 py-2 transition-all duration-300 font-medium tracking-wide text-sm"
            >
              CONTACT US
            </Button>
          </Link>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className="md:hidden flex items-center bg-black/85 backdrop-blur-xl border border-white/25 rounded-full px-4 py-3 shadow-2xl">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mr-auto">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image src="/images/logohh.png" alt="HungryzHub Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">HungryzHub</span>
          </Link>

          {/* Enhanced Burger Menu Button */}
          <button
            ref={burgerRef}
            onClick={toggleMobileMenu}
            className="text-white hover:text-white/80 rounded-full p-3 transition-all duration-300 relative z-50 hover:bg-white/10"
            aria-label="Toggle mobile menu"
            disabled={isAnimating}
          >
            <BurgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay with Improved Animations */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: isMobileMenuOpen
            ? `circle(150% at ${burgerPosition.x}% ${burgerPosition.y}%)`
            : `circle(0% at ${burgerPosition.x}% ${burgerPosition.y}%)`,
          background: `
            radial-gradient(circle at ${burgerPosition.x}% ${burgerPosition.y}%, 
              rgba(0, 0, 0, 0.98) 0%, 
              rgba(0, 0, 0, 0.95) 70%, 
              rgba(0, 0, 0, 0.92) 100%
            )
          `,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Backdrop for closing */}
        <div className="absolute inset-0" onClick={closeMobileMenu} aria-hidden="true" />

        {/* Menu Content with Enhanced Typography */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-8">
          <div className="w-full max-w-sm space-y-8">
            {/* Navigation Items with Enhanced Staggered Animation */}
            {[
              { label: "Vote", href: "/vote", delay: 0 },
              { label: "For Colleges", href: "/colleges", delay: 1 },
              { label: "Contact Us", href: "/contact", delay: 2 },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`transform transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${300 + index * 150}ms` : `${(2 - index) * 100}ms`,
                }}
              >
                <Link href={item.href} onClick={closeMobileMenu}>
                  <button className="w-full group relative overflow-hidden">
                    {/* Button Background with Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl transition-all duration-500 ease-out group-hover:from-white/20 group-hover:to-white/30 group-active:scale-95"></div>

                    {/* Button Border */}
                    <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300"></div>

                    {/* Button Text */}
                    <div className="relative px-8 py-6">
                      <span className="text-white font-light text-2xl tracking-wider transition-all duration-300 group-hover:text-white group-hover:tracking-widest">
                        {item.label}
                      </span>

                      {/* Subtle underline effect */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-500 group-hover:w-16"></div>
                    </div>

                    {/* Ripple effect on click */}
                    <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
                  </button>
                </Link>
              </div>
            ))}

            {/* Enhanced Footer Element */}
            <div
              className={`transform transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] mt-12 ${
                isMobileMenuOpen ? "translate-y-0 opacity-60 scale-100" : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? "750ms" : "0ms",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4"></div>
                <p className="text-white/40 text-sm font-light tracking-widest">HUNGRY? WE'VE GOT YOU</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced ripple effects */}
        <div
          className={`absolute rounded-full border border-white/20 transition-all duration-1000 ease-out ${
            isMobileMenuOpen ? "scale-200 opacity-0" : "scale-0 opacity-100"
          }`}
          style={{
            left: `${burgerPosition.x}%`,
            top: `${burgerPosition.y}%`,
            transform: "translate(-50%, -50%)",
            width: "30px",
            height: "30px",
            transitionDelay: isMobileMenuOpen ? "200ms" : "0ms",
          }}
        />

        {/* Secondary ripple */}
        <div
          className={`absolute rounded-full border border-white/10 transition-all duration-1200 ease-out ${
            isMobileMenuOpen ? "scale-300 opacity-0" : "scale-0 opacity-100"
          }`}
          style={{
            left: `${burgerPosition.x}%`,
            top: `${burgerPosition.y}%`,
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
          }}
        />
      </div>

      {/* Enhanced CSS for reduced motion and custom animations */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Custom scrollbar for mobile menu if needed */
        .menu-content::-webkit-scrollbar {
          display: none;
        }
        .menu-content {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}
