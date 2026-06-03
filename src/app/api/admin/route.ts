import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ft-admin-2026'
const MAX_AGE = 60 * 60 * 8 // 8 hours

export async function POST(request: NextRequest) {
  const body = await request.formData()
  const password = body.get('password')?.toString() ?? ''

  if (password === ADMIN_PASSWORD) {
    const res = NextResponse.redirect(new URL('/admin', request.url))
    res.cookies.set('ft-admin-auth', ADMIN_PASSWORD, {
      maxAge: MAX_AGE,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    return res
  }

  return NextResponse.redirect(new URL('/admin?error=1', request.url))
}
