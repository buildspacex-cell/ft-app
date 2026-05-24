import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { email, source = 'landing-in', stock_interest } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // 1. Store in waitlist immediately — even if they never click the magic link
  const { error: waitlistError } = await supabase
    .from('waitlist')
    .upsert(
      { email, source, ...(stock_interest ? { stock_interest } : {}) },
      { onConflict: 'email', ignoreDuplicates: false }
    )

  if (waitlistError) {
    console.error('Waitlist insert error:', waitlistError)
    // Don't block — still send the magic link even if DB write fails
  }

  // 2. Send magic link via Supabase auth
  const { error: otpError } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding`,
    },
  })

  // If admin generateLink not available, fall back to signInWithOtp
  if (otpError) {
    // Use anon client for OTP as fallback
    const { createClient } = await import('@supabase/supabase-js')
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { error: fallbackError } = await anonClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding`,
      },
    })

    if (fallbackError) {
      console.error('OTP error:', fallbackError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  }

  return NextResponse.json({ ok: true })
}

// GET — returns waitlist count (for social proof on landing page)
export async function GET() {
  const supabase = createServiceClient()
  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ count: count ?? 0 })
}
