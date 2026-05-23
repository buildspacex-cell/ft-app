import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { digest_id, story_index, rating, note } = await req.json()

  if (!['useful', 'noise', 'knew'].includes(rating)) {
    return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
  }

  // Upsert — one feedback per story per user
  const { error } = await supabase.from('feedback').upsert({
    user_id: user.id,
    digest_id,
    story_index,
    rating,
    note: note || null,
  }, { onConflict: 'user_id,digest_id,story_index' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
