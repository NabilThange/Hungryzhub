"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Enhanced Burger Icon Component with smoother morphing animation
const BurgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="w-6 h-6 flex flex-col justify-center items-center relative">
      <span
        className={`block h-0.5 w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
        }`}
        style={{
          transformOrigin: "center",
        }}
      />
      <span
        className={`block h-0.5 w-6 bg-current transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0"
        }`}
        style={{
          transitionDelay: isOpen ? "100ms" : "0ms",
        }}
      />
      <span
        className={`block h-0.5 w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
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
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [burgerPosition, setBurgerPosition] = useState({ x: 50, y: 50 })
  const [isAnimating, setIsAnimating] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleLenisScroll = (e: any) => {
      if (typeof window !== 'undefined') {
        const currentScrollY = e.scroll

        // More robust scroll direction detection
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setScrollDirection('down')
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY) {
          setScrollDirection('up')
          setIsVisible(true)
        }
        
        setLastScrollY(currentScrollY)
      }
    }

    // Use Lenis scroll event if available
    const initLenis = () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.on('scroll', handleLenisScroll)
        return () => window.lenis.off('scroll', handleLenisScroll)
      } else {
        // Fallback to window scroll event
        const fallbackScrollHandler = () => {
          if (typeof window !== 'undefined') {
            const currentScrollY = window.scrollY
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
              setScrollDirection('down')
              setIsVisible(false)
            } else if (currentScrollY < lastScrollY) {
              setScrollDirection('up')
              setIsVisible(true)
            }
            
            setLastScrollY(currentScrollY)
          }
        }

        window.addEventListener('scroll', fallbackScrollHandler)
        return () => window.removeEventListener('scroll', fallbackScrollHandler)
      }
    }

    const cleanup = initLenis()
    return cleanup
  }, [lastScrollY])

  // Enhanced burger menu position calculation
  useEffect(() => {
    if (typeof window !== 'undefined' && burgerRef.current) {
      const updatePosition = () => {
        const rect = burgerRef.current?.getBoundingClientRect()
        if (rect) {
          const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100
          const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100
          setBurgerPosition({ x, y })
        }
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
      {/* Main Floating Navbar with Enhanced Slide Animation */}
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isVisible 
            ? "translate-y-0 opacity-100 scale-100" 
            : "-translate-y-20 opacity-0 scale-95"
        }`}
        style={{
          transform: `translateX(-50%) ${
            isVisible 
              ? 'translateY(0) scale(1)' 
              : 'translateY(-80px) scale(0.95)'
          }`,
          // Add subtle shadow and backdrop filter for better visibility
          boxShadow: isVisible 
            ? '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' 
            : 'none',
          backdropFilter: isVisible ? 'blur(10px)' : 'none',
        }}
        aria-label="Main Navigation"
      >
        {/* Desktop Navigation with Enhanced Background */}
        <div className="hidden md:flex items-center gap-2 bg-black/90 backdrop-blur-2xl border border-white/30 rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black/95 hover:border-white/40">
          {/* Logo with Smooth Hover Effect */}
          <Link href="/" className="flex items-center gap-2 mr-4 group">
            <div className="w-8 h-8 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:rotate-3">
              <Image src="/images/logohh.png" alt="HungryzHub Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover:tracking-wider">HungryzHub</span>
          </Link>

          {/* Navigation Links with Enhanced Pill Animation */}
          <Link href="/vote">
            <Button
              variant="ghost"
              className="relative text-white/90 hover:text-black rounded-full px-6 py-2 font-medium tracking-wide text-sm overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:tracking-wider"
            >
              {/* Animated background pill */}
              <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:opacity-100"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:opacity-50 blur-sm"></div>
              
              <span className="relative z-10">VOTE</span>
            </Button>
          </Link>

          <Link href="/colleges">
            <Button
              variant="ghost"
              className="relative text-white/90 hover:text-black rounded-full px-6 py-2 font-medium tracking-wide text-sm overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:tracking-wider"
            >
              {/* Animated background pill */}
              <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:opacity-100"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:opacity-50 blur-sm"></div>
              
              <span className="relative z-10">FOR COLLEGES</span>
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="ghost"
              className="relative text-white/90 hover:text-black rounded-full px-6 py-2 font-medium tracking-wide text-sm overflow-hidden group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 hover:tracking-wider"
            >
              {/* Animated background pill */}
              <div className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:opacity-100"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] opacity-0 group-hover:opacity-50 blur-sm"></div>
              
              <span className="relative z-10">CONTACT US</span>
            </Button>
          </Link>
        </div>

        {/* Enhanced Mobile Navigation with Smooth Morph */}
        <div className="md:hidden flex items-center bg-black/90 backdrop-blur-2xl border border-white/30 rounded-full px-4 py-3 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black/95 hover:border-white/40">
          {/* Mobile Logo with Enhanced Hover */}
          <Link href="/" className="flex items-center gap-2 mr-auto group">
            <div className="w-8 h-8 flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:rotate-3">
              <Image src="/images/logohh.png" alt="HungryzHub Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover:tracking-wider">HungryzHub</span>
          </Link>

          {/* Enhanced Burger Menu Button with Smooth Morphing */}
          <button
            ref={burgerRef}
            onClick={toggleMobileMenu}
            className="text-white hover:text-white/90 rounded-full p-3 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-50 hover:bg-white/15 hover:scale-110 active:scale-95"
            aria-label="Toggle mobile menu"
            disabled={isAnimating}
          >
            <BurgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay with Smooth Morphing Transition */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] ${
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
          backdropFilter: "blur(25px)",
        }}
      >
        {/* Backdrop for closing */}
        <div className="absolute inset-0" onClick={closeMobileMenu} aria-hidden="true" />

        {/* Menu Content with Enhanced Typography and Animations */}
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
                className={`transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-90"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${350 + index * 120}ms` : `${(2 - index) * 80}ms`,
                }}
              >
                <Link href={item.href} onClick={closeMobileMenu}>
                  <button className="w-full group relative overflow-hidden">
                    {/* Enhanced Button Background with Smooth Morph */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/8 to-white/12 rounded-2xl transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:from-white/25 group-hover:to-white/35 group-active:scale-98 scale-100 group-hover:scale-105"></div>

                    {/* Enhanced Button Border with Glow */}
                    <div className="absolute inset-0 rounded-2xl border border-white/25 group-hover:border-white/50 transition-all duration-400 group-hover:shadow-lg group-hover:shadow-white/20"></div>

                    {/* Button Text with Enhanced Typography */}
                    <div className="relative px-8 py-6">
                      <span className="text-white font-light text-2xl tracking-wider transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-white group-hover:tracking-widest group-hover:font-normal">
                        {item.label}
                      </span>

                      {/* Enhanced underline effect with smooth morph */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-white/70 to-white/90 rounded-full transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-20 group-hover:h-1"></div>
                    </div>

                    {/* Enhanced ripple effect on click */}
                    <div className="absolute inset-0 rounded-2xl bg-white/15 opacity-0 group-active:opacity-100 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] scale-95 group-active:scale-100"></div>
                  </button>
                </Link>
              </div>
            ))}

            {/* Enhanced Footer Element with Smooth Slide */}
            <div
              className={`transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] mt-12 ${
                isMobileMenuOpen ? "translate-y-0 opacity-60 scale-100" : "translate-y-12 opacity-0 scale-90"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? "800ms" : "0ms",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-4 transition-all duration-500"></div>
                <p className="text-white/50 text-sm font-light tracking-widest transition-all duration-300">HUNGRY? WE'VE GOT YOU</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced ripple effects with smoother animation */}
        <div
          className={`absolute rounded-full border border-white/30 transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMobileMenuOpen ? "scale-300 opacity-0" : "scale-0 opacity-100"
          }`}
          style={{
            left: `${burgerPosition.x}%`,
            top: `${burgerPosition.y}%`,
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            transitionDelay: isMobileMenuOpen ? "150ms" : "0ms",
          }}
        />

        {/* Secondary ripple with enhanced timing */}
        <div
          className={`absolute rounded-full border border-white/20 transition-all duration-1400 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMobileMenuOpen ? "scale-400 opacity-0" : "scale-0 opacity-100"
          }`}
          style={{
            left: `${burgerPosition.x}%`,
            top: `${burgerPosition.y}%`,
            transform: "translate(-50%, -50%)",
            width: "30px",
            height: "30px",
            transitionDelay: isMobileMenuOpen ? "300ms" : "0ms",
          }}
        />

        {/* Third ripple for extra smoothness */}
        <div
          className={`absolute rounded-full border border-white/10 transition-all duration-1600 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMobileMenuOpen ? "scale-500 opacity-0" : "scale-0 opacity-100"
          }`}
          style={{
            left: `${burgerPosition.x}%`,
            top: `${burgerPosition.y}%`,
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
            transitionDelay: isMobileMenuOpen ? "450ms" : "0ms",
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

        /* Enhanced shadow utilities */
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  )
}