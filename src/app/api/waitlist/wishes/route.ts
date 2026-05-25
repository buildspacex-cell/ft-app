import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 300 // revalidate every 5 minutes

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ wishes: [], count: 0 })
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey)

    const [wishResult, countResult] = await Promise.all([
      supabase
        .from('waitlist')
        .select('wish_text')
        .not('wish_text', 'is', null)
        .neq('wish_text', '')
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true }),
    ])

    return NextResponse.json({
      wishes: wishResult.data?.map(r => r.wish_text) ?? [],
      count: countResult.count ?? 0,
    })
  } catch {
    return NextResponse.json({ wishes: [], count: 0 })
  }
}
