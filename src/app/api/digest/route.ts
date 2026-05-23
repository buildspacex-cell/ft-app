import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const today = new Date().toISOString().split('T')[0]

  const { data: digest, error } = await supabase
    .from('digests')
    .select('*')
    .eq('user_id', user.id)
    .eq('date', today)
    .single()

  if (error || !digest) {
    return NextResponse.json({ digest: null, message: 'No digest yet today. Check back at 7am IST.' })
  }

  return NextResponse.json({ digest })
}
