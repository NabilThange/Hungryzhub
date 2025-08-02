"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Zap, Users, TrendingUp, GraduationCap, Building2, BarChart3, Clock, Star } from "lucide-react"
import FloatingNavbar from "@/components/floating-navbar"
import Link from "next/link"
import Image from "next/image"

const HungryzHubModern = () => {
  const [activeMetric, setActiveMetric] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [heroVideoZIndex, setHeroVideoZIndex] = useState(999)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleLenisScroll = (e: any) => {
      setScrollY(e.scroll)
    }

    const initLenis = () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.on('scroll', handleLenisScroll)
      } else {
        setTimeout(initLenis, 100)
      }
    }

    initLenis()

    return () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.off('scroll', handleLenisScroll)
      }
    }
  }, [])

  // Optimized video loading with intersection observer
  useEffect(() => {
    const videoElement = heroVideoRef.current
    if (!videoElement) return

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldPlayVideo(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(videoElement)

    const handleVideoEnd = () => {
      setHeroVideoZIndex(-9999)
    }

    const handleVideoLoad = () => {
      setVideoLoaded(true)
    }

    const handleVideoError = (e: Event) => {
      console.error('Video error:', e)
      setHeroVideoZIndex(-9999)
    }

    videoElement.addEventListener('ended', handleVideoEnd)
    videoElement.addEventListener('loadeddata', handleVideoLoad)
    videoElement.addEventListener('error', handleVideoError)

    return () => {
      observer.disconnect()
      videoElement.removeEventListener('ended', handleVideoEnd)
      videoElement.removeEventListener('loadeddata', handleVideoLoad)
      videoElement.removeEventListener('error', handleVideoError)
    }
  }, [])

  const metrics = [
    { value: "47K+", label: "Student Votes", icon: Users },
    { value: "150+", label: "Colleges", icon: Building2 },
    { value: "99.2%", label: "Satisfaction", icon: Star },
    { value: "24/7", label: "Availability", icon: Clock },
  ]

  const liveRequests = [
    { student: "Nabil T.", item: "Red Bull Energy", votes: 47, trending: true },
    { student: "Aniket Y.", item: "Protein Bars", votes: 34, trending: false },
    { student: "Piyush Y.", item: "Starbucks Coffee", votes: 28, trending: true },
    { student: "Gaurav Y.", item: "Takis Chips", votes: 23, trending: false },
  ]

  const features = [
    {
      icon: Zap,
      title: "Instant Gratification",
      description: "No more empty machines. AI-powered inventory ensures your favorites are always stocked.",
    },
    {
      icon: TrendingUp,
      title: "Trending Insights",
      description: "Real-time campus trends drive our stocking decisions. Popular items stay available.",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Choices",
      description: "Student voting data creates the perfect vending experience for your campus.",
    },
  ]

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Floating Navigation */}
      <FloatingNavbar />
      
      {/* BACKGROUND 1 - HERO SECTION */}
      <div
        id="hero-bg"
        className="fixed-smooth fixed inset-0 z-0 bg-black"
        style={{
          height: "100vh",
          width: "100%",
          zIndex: heroVideoZIndex,
          backgroundColor: 'black',
          backgroundImage: 'linear-gradient(to bottom right, #1a1a1a, #000000)',
        }}
      >
        {/* Optimized Video container */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            contain: 'layout style paint',
          }}
        >
          <video 
            ref={heroVideoRef}
            autoPlay={shouldPlayVideo}
            muted 
            playsInline 
            preload="none"
            poster="/images/video-poster.jpg" // Add a poster image
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              imageRendering: 'optimizeSpeed',
              objectPosition: window.innerWidth < 768 ? 'center 30%' : 'center 50%',
              transform: window.innerWidth < 768 ? 'translateY(-10%) translateZ(0)' : 'translateY(-1%) translateZ(0)',
            }}
          >
            {shouldPlayVideo && (
              <>
                <source src="/mock1.webm" type="video/webm" />
                <source src="/mock1.mp4" type="video/mp4" />
              </>
            )}
            Your browser does not support the video tag.
          </video>
          
          {/* Simple Logo placeholder */}
          {!videoLoaded && shouldPlayVideo && (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Image 
                  src="/images/logohh.png" 
                  alt="HungryzHub Logo" 
                  width={150} 
                  height={150} 
                  className="object-contain" 
                />
              </div>
            </div>
          )}
          
          {/* Show logo before video starts loading */}
          {!shouldPlayVideo && (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <Image 
                    src="/images/logohh.png" 
                    alt="HungryzHub Logo" 
                    width={150} 
                    height={150} 
                    className="object-contain transition-all duration-1000 ease-out hover:scale-110 active:scale-95" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BACKGROUND 2 - MAIN CONTENT SECTIONS */}
      <div
        id="main-bg"
        className="fixed inset-0 z-0"
        style={{
          height: "100vh",
          width: "100%",
          backgroundColor: '#000000',
          opacity: Math.min(Math.max((scrollY - window.innerHeight * 0.7) / (window.innerHeight * 0.3), 0), 1),
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="relative z-20 flex items-center justify-center hidden">
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center transition-all duration-1000 ease-out transform hover:scale-110 active:scale-95">
            <Image 
              src="/images/logohh.png" 
              alt="HungryzHub Logo" 
              width={192} 
              height={192} 
              className="object-contain transition-transform duration-300 ease-in-out" 
            />
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-share-tech text-5xl font-bold text-white mb-4">HungryzHub</h1>
          <p className="font-montagu-slab text-xl text-zinc-300">Smart Vending. Student-Driven Choices.</p>
        </div>
      </section>

      {/* Features Section - Refined Cards */}
      <section id="features" className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-montagu-slab font-bold text-white mb-8 leading-tight">Why Students Choose Us</h2>
            <p className="text-lg font-montaga text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              We solve the real problems students face with campus vending every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <article
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/8"
                >
                  {/* Card Content */}
                  <div className="p-8 space-y-6">
                    {/* Icon Container */}
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-black" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-share-tech font-bold text-white leading-tight tracking-wide uppercase">
                        {feature.title}
                      </h3>
                      <p className="text-base font-montaga text-zinc-300 leading-relaxed font-normal">{feature.description}</p>
                    </div>
                  </div>

                  {/* Subtle Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Live Demo Section - Refined Student Cards */}
      <section id="demo" className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 bg-zinc-800/80 backdrop-blur-sm"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montagu-slab font-bold text-white mb-8 leading-tight">Live Student Requests</h2>
            <p className="text-lg font-montaga text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              See real students voting for real snacks across campuses right now.
            </p>
          </div>

          <div className="space-y-4">
            {liveRequests.map((request, index) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Left Section - Student Info */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-black font-bold text-base">{request.student.charAt(0)}</span>
                      </div>

                      {/* Student Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-base leading-none">{request.student}</span>
                          {request.trending && (
                            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 px-2.5 py-1 rounded-full">
                              <TrendingUp className="w-3 h-3 text-white" />
                              <span className="text-xs text-white font-medium leading-none">Trending</span>
                            </div>
                          )}
                        </div>
                        <p className="text-base font-montaga text-zinc-300 leading-tight">
                          voted for{" "}
                          <span className="font-medium text-white bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg">
                            {request.item}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right Section - Vote Count */}
                    <div className="flex-shrink-0">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center min-w-16">
                        <div className="text-lg font-bold text-white leading-none mb-1">{request.votes}</div>
                        <div className="text-xs text-zinc-400 leading-none">votes</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-zinc-300 text-sm font-medium leading-none">Updates every few seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Refined Testimonial Card */}
      <section className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-montagu-slab font-bold text-white leading-tight">Trusted by Leading Colleges</h2>
              <p className="text-lg font-montaga text-zinc-300 leading-relaxed">
                From community colleges to major universities, HungryzHub is transforming campus dining experiences
                nationwide.
              </p>

              {/* Refined Testimonial Card */}
              <article className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border-l-4 border-white border-r border-t border-b border-white/10">
                <div className="p-8 space-y-6">
                  {/* Quote */}
                  <blockquote className="text-base font-montaga text-white leading-relaxed">
                    "HungryzHub completely transformed our campus experience. Students love having their favorites
                    available 24/7."
                  </blockquote>

                  {/* Attribution */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-black font-bold text-base">MD</span>
                    </div>
                    <div className="space-y-1">
                      <div className="font-montagu-slab font-bold text-white text-base leading-none">Manjusha Deshmukh</div>
                      <div className="font-montaga text-zinc-400 text-sm leading-none">President, SCOE</div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="relative">
              <div className="aspect-square bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-center">
                <Image 
                  src="/scoe.jpg" 
                  alt="SCOE Campus Preview" 
                  width={600} 
                  height={600} 
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Refined Action Cards */}
      <section id="colleges" className="relative py-24 px-6 z-10">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl font-montagu-slab font-bold text-white leading-tight">Ready to Transform Your Campus?</h2>
            <p className="text-lg font-montaga text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Join the future of campus dining with intelligent vending solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Students CTA Card */}
            <article className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/8 p-8 text-center space-y-6">
              <GraduationCap className="w-16 h-16 mx-auto text-white" />
              <div className="space-y-6">
                <h3 className="text-lg font-share-tech font-bold text-white leading-tight">For Students</h3>
                <p className="text-base font-montaga text-zinc-300 leading-relaxed min-h-[3rem]">
                  Vote for your favorite snacks and bring HungryzHub to your college campus.
                </p>
              </div>
              <Link href="/vote" className="block">
                <button className="bg-white text-black px-8 py-4 rounded-2xl font-montagu-slab font-bold hover:bg-zinc-100 transition-all duration-300 flex items-center gap-3 mx-auto group-hover:scale-105">
                  Vote for Your College
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </article>

            {/* Colleges CTA Card */}
            <article className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/8 p-8 text-center space-y-6">
              <Building2 className="w-16 h-16 mx-auto text-white" />
              <div className="space-y-6">
                <h3 className="text-lg font-share-tech font-bold text-white leading-tight">For Colleges</h3>
                <p className="text-base font-montaga text-zinc-300 leading-relaxed min-h-[3rem]">
                  Partner with us to enhance your campus dining experience and student satisfaction.
                </p>
              </div>
              <Link href="/colleges" className="block">
                <button className="bg-white text-black px-8 py-4 rounded-2xl font-montagu-slab font-bold hover:bg-zinc-100 transition-all duration-300 flex items-center gap-3 mx-auto group-hover:scale-105">
                  Partner With Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 z-10 border-t border-zinc-800">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 space-y-4">
            <div className="w-16 h-16 flex items-center justify-center mx-auto">
              <Image src="/images/logohh.png" alt="HungryzHub Logo" width={64} height={64} className="object-contain" />
            </div>
            <h3 className="text-2xl font-montagu-slab font-bold text-white leading-tight">HungryzHub</h3>
            <p className="font-montaga text-zinc-400 text-base">Smart Vending. Student-Driven Choices.</p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://twitter.com/hungryzhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/hungryzhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.185-1.537-.737-.94-1.125-2.184-1.125-3.451s.388-2.511 1.125-3.451c.737-.94 1.888-1.537 3.185-1.537s2.448.596 3.185 1.537c.737.94 1.125 2.184 1.125 3.451s-.388 2.511-1.125 3.451c-.737.94-1.888 1.537-3.185 1.537zm7.138 0c-1.297 0-2.448-.596-3.185-1.537-.737-.94-1.125-2.184-1.125-3.451s.388-2.511 1.125-3.451c.737-.94 1.888-1.537 3.185-1.537s2.448.596 3.185 1.537c.737.94 1.125 2.184 1.125 3.451s-.388 2.511-1.125 3.451c-.737.94-1.888 1.537-3.185 1.537z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/company/hungryzhub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:Hungryzhub@gmail.com"
              className="text-zinc-400 hover:text-white transition-colors hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <Link href="/vote" className="text-zinc-400 hover:text-white transition-colors text-base">
              Vote
            </Link>
            <Link href="/colleges" className="text-zinc-400 hover:text-white transition-colors text-base">
              For Colleges
            </Link>
            <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors text-base">
              Contact
            </Link>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-base">
              Privacy
            </a>
            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-base">
              Terms
            </a>
          </div>

          <div className="text-center text-zinc-500 text-sm font-montaga">
            <p>&copy; 2024 HungryzHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HungryzHubModern