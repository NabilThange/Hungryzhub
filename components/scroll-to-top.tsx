"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0)

    // Also reset any scrollable containers if they exist
    const scrollableElements = document.querySelectorAll("[data-scrollable]")
    scrollableElements.forEach((el) => {
      el.scrollTop = 0
    })
  }, [pathname])

  return null
}
