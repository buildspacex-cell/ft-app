import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Analytics } from '@/components/Analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fundamentally True — Own the business. Track the price.',
  description: "5 questions about any stock. Plain English. One morning alert when something in the business or the price actually changes.",
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Fundamentally True' },
  openGraph: {
    title: 'Fundamentally True — Own the business. Track the price.',
    description: '5 questions. Plain English. One morning alert when something in the business or the price changes.',
    url: 'https://ft-app-beta.vercel.app',
    siteName: 'Fundamentally True',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundamentally True — Own the business. Track the price.',
    description: '5 questions. Plain English. One morning alert when something in the business or the price changes.',
  },
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 1, userScalable: false, themeColor: '#f6f3ec',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body><Suspense fallback={null}><Analytics /></Suspense>{children}</body>
    </html>
  )
}
