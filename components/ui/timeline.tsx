"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    const items = ref.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    // Handle scroll progress
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementHeight = rect.height
        const scrolled = Math.max(0, windowHeight - rect.top)
        const progress = Math.min(1, scrolled / (elementHeight + windowHeight))
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="w-full bg-black font-sans" ref={ref}>
      <div className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10" data-index={index}>
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black border-2 border-white flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full border border-white/20 p-2 transition-all duration-500 ${
                    visibleItems.includes(index) ? "bg-white scale-110" : "bg-white/20"
                  }`}
                />
              </div>
              <h3
                className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? "text-white opacity-100 translate-x-0"
                    : "text-white/50 opacity-70 translate-x-4"
                }`}
              >
                {item.title}
              </h3>
            </div>

            <div
              className={`relative pl-20 pr-4 md:pl-4 w-full transition-all duration-700 delay-200 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white/90">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Animated timeline line */}
        <div className="absolute md:left-8 left-8 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent">
          <div
            className="w-[2px] bg-gradient-to-t from-white via-gray-300 to-transparent transition-all duration-1000 ease-out"
            style={{
              height: `${scrollProgress * 100}%`,
              opacity: scrollProgress > 0.1 ? 1 : 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}
