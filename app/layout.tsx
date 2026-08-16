import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { ToastContainer } from '@/components/shared/Toast'

export const metadata: Metadata = {
  title: 'NewsDesk',
  description: 'AI-powered news publishing platform for journalists and solo publishers',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}