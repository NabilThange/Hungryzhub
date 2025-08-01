"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import FloatingNavbar from "@/components/floating-navbar"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      {/* Floating Navigation */}
      <FloatingNavbar />

      {/* Back to Home */}
      <div className="pt-24 p-6">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-6 bg-black text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Have questions about HungryzHub? Want to partner with us or get a machine on your campus? We'd love to hear
            from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="border-2 border-white rounded-xl p-8 bg-black">
            <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    First Name <span className="text-gray-400">*</span>
                  </label>
                  <Input className="bg-black border-2 border-white focus:border-gray-400 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Last Name <span className="text-gray-400">*</span>
                  </label>
                  <Input className="bg-black border-2 border-white focus:border-gray-400 text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-gray-400">*</span>
                </label>
                <Input type="email" className="bg-black border-2 border-white focus:border-gray-400 text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">College/Organization</label>
                <Input className="bg-black border-2 border-white focus:border-gray-400 text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Subject <span className="text-gray-400">*</span>
                </label>
                <Input className="bg-black border-2 border-white focus:border-gray-400 text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message <span className="text-gray-400">*</span>
                </label>
                <Textarea
                  rows={6}
                  className="bg-black border-2 border-white focus:border-gray-400 text-white resize-none"
                />
              </div>

              <Button className="bg-white hover:bg-gray-200 text-black font-semibold w-full py-3">Send Message</Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Get in touch</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                We're here to help students and colleges create better campus dining experiences. Reach out to us
                through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-400">Hungryzhub@gmail.com</p>
                  <p className="text-gray-400">Hungryzhub@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">Mon-Fri, 9am-6pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Office</h3>
                  <p className="text-gray-400">123 Innovation Drive</p>
                  <p className="text-gray-400">San Francisco, CA 94105</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Response Time</h3>
                  <p className="text-gray-400">We typically respond within 24 hours</p>
                  <p className="text-gray-400 text-sm">Emergency support available 24/7</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="border border-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/vote">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Vote for your college
                  </Button>
                </Link>
                <Link href="/colleges">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Partnership inquiry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
