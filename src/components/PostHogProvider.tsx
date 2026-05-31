'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// ── Init ─────────────────────────────────────────────────────────────────────
// Only initialises once, only in browser, only when key is present
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Capture pageviews manually so we control the timing
    capture_pageview: false,
    // Session replay — records real sessions so you can watch what people do
    session_recording: {
      maskAllInputs: true,       // masks email/phone fields in recordings
      maskInputFn: (text, element) => {
        // Only mask input/textarea — leave other elements visible
        if (element?.tagName === 'INPUT' || element?.tagName === 'TEXTAREA') {
          return '*'.repeat(text.length)
        }
        return text
      },
    },
    // Don't capture individual keystrokes — only element clicks and page events
    autocapture: {
      dom_event_allowlist: ['click'],
      url_allowlist: ['ft-app-beta.vercel.app', 'localhost'],
    },
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') ph.debug()
    },
  })
}

// ── Pageview tracker ─────────────────────────────────────────────────────────
function PageviewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ph = usePostHog()
  const lastPath = useRef('')

  useEffect(() => {
    if (!ph) return
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '')
    if (url === lastPath.current) return
    lastPath.current = url

    ph.capture('$pageview', {
      $current_url: window.location.href,
      market: pathname.startsWith('/us') ? 'us' : 'in',
      path: pathname,
    })
  }, [pathname, searchParams, ph])

  return null
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    // No key — just render children, no tracking
    return <>{children}</>
  }
  return (
    <PHProvider client={posthog}>
      <PageviewTracker />
      {children}
    </PHProvider>
  )
}

// ── trackEvent — use this everywhere ─────────────────────────────────────────
// Drop-in replacement for the old trackEvent in Analytics.tsx
export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.__loaded) {
    posthog.capture(event, props)
  } else {
    // Dev fallback — log to console
    console.log('[FT analytics]', event, props ?? '')
  }
}

// ── identifyUser — call when you know who the user is ────────────────────────
export function identifyUser(email: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.__loaded) {
    posthog.identify(email, props)
  }
}
