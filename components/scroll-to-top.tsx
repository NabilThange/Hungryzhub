"use client"

import { useState, useEffect } from "react"
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== 'undefined') {
        setIsVisible(window.scrollY > 300)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleVisibility)
      return () => window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  if (!isVisible) return null

  return (
    <Button 
      onClick={scrollToTop} 
      variant="outline" 
      size="icon" 
      className="fixed bottom-4 right-4 z-50 rounded-full p-2 shadow-lg"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  )
}
