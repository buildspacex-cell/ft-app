'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Lightweight analytics — fires funnel events without requiring a PostHog key
// When NEXT_PUBLIC_POSTHOG_KEY is set, events go to PostHog
// When not set, events are logged to console (dev mode)

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void
      identify: (id: string, props?: Record<string, unknown>) => void
    }
  }
}

export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (window.posthog) {
    window.posthog.capture(event, props)
  } else {
    console.log('[FT analytics]', event, props ?? '')
  }
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    trackEvent('page_view', {
      path: pathname,
      market: pathname.startsWith('/us') ? 'us' : 'in',
    })
  }, [pathname, searchParams])

  return null
}
