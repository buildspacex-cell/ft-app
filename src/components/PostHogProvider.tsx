'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false,
    session_recording: {
      maskAllInputs: true,
      maskInputFn: (text, element) => {
        if (element?.tagName === 'INPUT' || element?.tagName === 'TEXTAREA') {
          return '*'.repeat(text.length)
        }
        return text
      },
    },
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

// ── PageviewTracker must be wrapped in Suspense because it uses useSearchParams
function PageviewTrackerInner() {
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

function PageviewTracker() {
  return (
    <Suspense fallback={null}>
      <PageviewTrackerInner />
    </Suspense>
  )
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }
  return (
    <PHProvider client={posthog}>
      <PageviewTracker />
      {children}
    </PHProvider>
  )
}

export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.__loaded) {
    posthog.capture(event, props)
  } else {
    console.log('[FT analytics]', event, props ?? '')
  }
}

export function identifyUser(email: string, props?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.__loaded) {
    posthog.identify(email, props)
  }
}
