"use client"
import { Input } from "@/components/ui/input"
import type React from "react"

import { Textarea } from "@/components/ui/textarea"
import { Timeline } from "@/components/ui/timeline"
import { useState, useEffect } from "react"
import Link from "next/link"
import FloatingNavbar from "@/components/floating-navbar"

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

const processSteps = [
  {
    number: "01",
    week: "Week 1",
    title: "Initial Consultation",
    description: "Connect with our team to discuss requirements and revenue goals",
  },
  {
    number: "02",
    week: "Week 2",
    title: "Campus Survey",
    description: "Technical assessment and location analysis of your campus",
  },
  {
    number: "03",
    week: "Week 3",
    title: "Agreement & Planning",
    description: "Contract finalization and installation scheduling",
  },
  {
    number: "04",
    week: "Week 4",
    title: "Deployment & Launch",
    description: "Professional installation and system activation",
  },
]

// Convert data to Timeline format
const processTimelineData: TimelineEntry[] = processSteps.map((step) => ({
  title: step.title,
  content: (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/5 cursor-pointer transform-gpu">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
          {step.number}
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
          <span className="text-sm text-white/80 font-medium">{step.week}</span>
        </div>
      </div>
      <p className="text-white/70 leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-300">
        {step.description}
      </p>
    </div>
  ),
}))

export default function CollegesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    instituteName: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setFormData({
      instituteName: "",
      contactPerson: "",
      email: "",
      phone: "",
      message: "",
    })

    setIsSubmitting(false)
    alert("Thank you! We'll be in touch within 24 hours.")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
      {/* Floating Navigation */}
      <FloatingNavbar />

      {/* HERO SECTION - Clean Monochromatic with Gradient Blob */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        {/* Gradient Blob Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-zinc-800/30 via-gray-800/20 to-black/40 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[400px] bg-gradient-to-tl from-zinc-700/20 via-gray-900/30 to-black/50 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div
          className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1200 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          {/* Main Headline */}
          <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-[0.9] text-white tracking-tight">
            Transform
            <br />
            Campus Revenue
          </h1>

          {/* Subheadline */}
          <p
            className={`text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Simple partnership. Proven results.
          </p>

          {/* CTA Button */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <button
              onClick={() => scrollToSection("contact-form")}
              className="group bg-white text-black px-12 py-6 text-lg font-semibold rounded-2xl hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-white/20 transform-gpu"
            >
              <span className="flex items-center">
                Start Partnership
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE SECTION */}
      <section id="process" className="py-32 px-6 bg-black relative">
        <div className="max-w-4xl mx-auto relative z-10 mb-20">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-white/90 font-medium">4-Week Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">From Inquiry to Revenue</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our proven methodology that transforms campus partnerships into sustainable revenue streams
            </p>
          </div>
        </div>

        <Timeline data={processTimelineData} />
      </section>

      {/* CONTACT FORM - Simplified Monochromatic with Rounded Inputs */}
      <section id="contact-form" className="py-32 px-6 bg-black relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm text-white/90 font-medium">Free Consultation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Transform Your Campus?</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Start your partnership journey with a comprehensive consultation
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label className="block text-white mb-3 font-medium group-hover:text-white/90 transition-colors duration-300">
                Institution Name
              </label>
              <Input
                placeholder="e.g., Indian Institute of Technology Delhi"
                value={formData.instituteName}
                onChange={(e) => handleInputChange("instituteName", e.target.value)}
                className="bg-black border-white text-white h-14 rounded-xl focus:border-white hover:border-white/70 transition-all duration-300 hover:scale-[1.01] focus:scale-[1.01] placeholder:text-white/40"
                required
              />
            </div>

            <div className="group">
              <label className="block text-white mb-3 font-medium group-hover:text-white/90 transition-colors duration-300">
                Contact Person
              </label>
              <Input
                placeholder="e.g., Dr. Rajesh Kumar"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                className="bg-black border-white text-white h-14 rounded-xl focus:border-white hover:border-white/70 transition-all duration-300 hover:scale-[1.01] focus:scale-[1.01] placeholder:text-white/40"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-white mb-3 font-medium group-hover:text-white/90 transition-colors duration-300">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="rajesh.kumar@iitd.ac.in"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-black border-white text-white h-14 rounded-xl focus:border-white hover:border-white/70 transition-all duration-300 hover:scale-[1.01] focus:scale-[1.01] placeholder:text-white/40"
                  required
                />
              </div>
              <div className="group">
                <label className="block text-white mb-3 font-medium group-hover:text-white/90 transition-colors duration-300">
                  Phone Number
                </label>
                <Input
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-black border-white text-white h-14 rounded-xl focus:border-white hover:border-white/70 transition-all duration-300 hover:scale-[1.01] focus:scale-[1.01] placeholder:text-white/40"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-white mb-3 font-medium group-hover:text-white/90 transition-colors duration-300">
                Additional Details
              </label>
              <Textarea
                rows={5}
                placeholder="Tell us about your campus size, student count, current food services, and revenue expectations..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-black border-white text-white resize-none rounded-xl focus:border-white hover:border-white/70 transition-all duration-300 hover:scale-[1.01] focus:scale-[1.01] placeholder:text-white/40"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full bg-white text-black py-5 text-lg font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Partnership Inquiry
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            </button>
          </form>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 px-6 bg-black border-t border-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2 text-white">HungryzHub</h3>
            <p className="text-white/70">Smart Vending. Student-Driven Choices.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <Link
              href="/vote"
              className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 transform"
            >
              Vote
            </Link>
            <Link
              href="/colleges"
              className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 transform"
            >
              For Colleges
            </Link>
            <Link
              href="/contact"
              className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 transform"
            >
              Contact
            </Link>
          </div>

          <div className="text-white/50 text-sm">
            <p>&copy; 2024 HungryzHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
