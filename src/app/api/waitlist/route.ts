import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {}

  try {
    body = await req.json()
  } catch (e) {
    console.error('[waitlist] Failed to parse request body:', e)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, source = 'landing-in', stock_interest, wish_text, phone, sendLink = true } = body as {
    email?: string
    source?: string
    stock_interest?: string
    wish_text?: string
    phone?: string
    sendLink?: boolean
  }

  console.log('[waitlist] Submission received:', { email, source, stock_interest })

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    console.error('[waitlist] Invalid email:', email)
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // Check env vars are present
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  console.log('[waitlist] Env check:', {
    hasSupabaseUrl: !!supabaseUrl,
    hasServiceKey: !!serviceKey,
    hasAnonKey: !!anonKey,
    hasAppUrl: !!appUrl,
  })

  if (!supabaseUrl) {
    console.error('[waitlist] Missing Supabase env vars')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  // ─── Step 1: Store in waitlist ─────────────────────────────────────────────
  if (serviceKey) {
    try {
      const supabase = createClient(supabaseUrl, serviceKey)
      const { error: waitlistError } = await supabase
        .from('waitlist')
        .upsert(
          {
            email,
            source,
            ...(stock_interest ? { stock_interest } : {}),
            ...(wish_text ? { wish_text } : {}),
            ...(phone ? { phone } : {}),
          },
          { onConflict: 'email', ignoreDuplicates: false }
        )

      if (waitlistError) {
        // Log the full error but don't fail — still send the magic link
        console.error('[waitlist] DB insert error:', {
          code: waitlistError.code,
          message: waitlistError.message,
          details: waitlistError.details,
          hint: waitlistError.hint,
        })
      } else {
        console.log('[waitlist] Stored in DB:', email)
      }
    } catch (dbError) {
      console.error('[waitlist] Unexpected DB error:', dbError)
    }
  } else {
    console.warn('[waitlist] No service key — skipping DB write, still sending magic link')
  }

  // ─── Step 2: Return success ──────────────────────────────────────────────────
  // No magic link for early access — the in-page confirmation is enough.
  // Magic link auth is for when users log into the product post-launch.
  // Adding email verification here creates a drop-off point on a waitlist
  // where all we need is intent, not a verified session.
  console.log('[waitlist] Signup complete:', email)
  return NextResponse.json({ ok: true })
}

// GET — waitlist count for social proof
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ count: 0 })
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey)
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    if (error) console.error('[waitlist] Count error:', error)
    return NextResponse.json({ count: count ?? 0 })
  } catch (e) {
    console.error('[waitlist] Count unexpected error:', e)
    return NextResponse.json({ count: 0 })
  }
}
