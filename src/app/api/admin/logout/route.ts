import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin', request.url))
  res.cookies.delete('ft-admin-auth')
  return res
}
