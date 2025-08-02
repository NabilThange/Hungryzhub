import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import LenisProvider from "@/components/LenisProvider"

export const metadata: Metadata = {
  title: "Hungryzhub - College Vending Machine",
  description: "Discover and review campus dining experiences. Share, rate, and explore food options at your college.",
  
  // Favicon and Browser Tab Icons
  icons: {
    icon: [
      { url: '/images/logohh.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logohh.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: ['/images/logohh.png'],
    apple: [
      { url: '/images/logohh.png', sizes: '180x180' }
    ],
  },

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hungryzhub.com",
    title: "HungryZhub - College Food Review Platform",
    description: "Discover and review campus dining experiences. Share, rate, and explore food options at your college.",
    images: [
      {
        url: '/images/HHSC.png',
        width: 1200,
        height: 630,
        alt: "HungryZhub Logo"
      }
    ],
    siteName: "HungryZhub"
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "HungryZhub - College Food Review Platform",
    description: "Discover and review campus dining experiences. Share, rate, and explore food options at your college.",
    images: ['/images/HHSC.png']
  },

  // WhatsApp Card
  other: {
    'og:type': 'website',
    'og:url': 'https://hungryzhub.com',
    'og:title': 'HungryZhub - College Food Review Platform',
    'og:description': 'Discover and review campus dining experiences. Share, rate, and explore food options at your college.',
    'og:image': '/images/HHSC.png',
    'og:site_name': 'HungryZhub',
    
    // Instagram-specific Open Graph tags
    'instagram:card': 'summary_large_image',
    'instagram:site': '@hungryzhub',
    'instagram:title': 'HungryZhub - College Food Review Platform',
    'instagram:description': 'Discover and review campus dining experiences. Share, rate, and explore food options at your college.',
    'instagram:image': '/images/HHSC.png'
  },

  // Mobile-specific meta tags
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  
  // Theme color for mobile browsers
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],

  // Additional mobile and PWA meta tags
  manifest: "/manifest.json",
  applicationName: "HungryZhub",
  appleWebApp: {
    capable: true,
    title: "HungryZhub",
    statusBarStyle: "default"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts Links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montaga&family=Montagu+Slab:opsz,wght@16..144,100..700&family=Share+Tech&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            {children}
            <Toaster />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
