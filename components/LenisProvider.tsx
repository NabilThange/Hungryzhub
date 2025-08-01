'use client'
import dynamic from 'next/dynamic'

const LenisWrapper = dynamic(() => import('./LenisWrapper'), {
  ssr: false
})

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <LenisWrapper>{children}</LenisWrapper>
}