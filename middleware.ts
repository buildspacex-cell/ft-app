import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'ft-market'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only handle root path — don't interfere with /us, /sample, /api, etc.
  if (pathname !== '/') return NextResponse.next()

  // ── Priority 1: existing cookie ──────────────────────────────────────────
  const cookieMarket = request.cookies.get(COOKIE_NAME)?.value

  if (cookieMarket === 'us') {
    // User has previously chosen / been routed to US — send them there
    const response = NextResponse.redirect(new URL('/us', request.url))
    // Refresh cookie expiry on each visit
    response.cookies.set(COOKIE_NAME, 'us', { maxAge: COOKIE_MAX_AGE, path: '/' })
    return response
  }

  if (cookieMarket === 'in') {
    // User has previously chosen India — stay, just refresh cookie
    const response = NextResponse.next()
    response.cookies.set(COOKIE_NAME, 'in', { maxAge: COOKIE_MAX_AGE, path: '/' })
    return response
  }

  // ── Priority 2: geo detection (no cookie yet) ────────────────────────────
  const country = request.headers.get('x-vercel-ip-country') ?? ''

  if (country === 'US') {
    const response = NextResponse.redirect(new URL('/us', request.url))
    response.cookies.set(COOKIE_NAME, 'us', { maxAge: COOKIE_MAX_AGE, path: '/' })
    return response
  }

  // ── Priority 3: default to India ─────────────────────────────────────────
  const response = NextResponse.next()
  response.cookies.set(COOKIE_NAME, 'in', { maxAge: COOKIE_MAX_AGE, path: '/' })
  return response
}

export const config = {
  matcher: '/',
}
