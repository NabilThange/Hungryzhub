'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      // Make lenis accessible globally for video scrubbing
      window.lenis = lenis

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
        delete window.lenis
      }
    }
  }, [])

  return <>{children}</>
}