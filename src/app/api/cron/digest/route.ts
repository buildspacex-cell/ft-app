import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { buildDigestForUser } from '@/lib/llm/pipeline'
import { fetchNSENews, fetchMarinationArticles } from '@/lib/news'
import { sendDigestPush } from '@/lib/push'
import type { Thesis, User } from '@/types'

// Protect this route with a secret — only Vercel cron or your own scheduler
function isAuthorised(req: NextRequest): boolean {
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${process.env.CRON_SECRET}`
}

export async function GET(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const started = Date.now()
  const today = new Date().toISOString().split('T')[0]
  const supabase = createServiceClient()

  console.log(`[CRON] Digest build starting for ${today} at IST 6am`)

  try {
    // 1. Fetch all users who have at least one accepted thesis
    const { data: allUsers, error: usersError } = await supabase
      .from('theses')
      .select('user_id, users!inner(id, email, onesignal_player_id, timezone)')
      .not('reasons_json', 'eq', '[]')

    if (usersError) throw usersError

    const uniqueUserIds = [...new Set((allUsers || []).map((r: any) => r.user_id))]
    console.log(`[CRON] Processing ${uniqueUserIds.length} users`)

    // 2. Fetch news once — shared across all users
    const [newsArticles, marinationArticles] = await Promise.all([
      fetchNSENews(),
      fetchMarinationArticles(),
    ])
    console.log(`[CRON] Fetched ${newsArticles.length} news articles`)

    // 3. Build digest per user (sequential to avoid rate limits)
    const results = { success: 0, failed: 0, skipped: 0 }

    for (const userId of uniqueUserIds as string[]) {
      try {
        // Check if digest already exists for today
        const { data: existing } = await supabase
          .from('digests')
          .select('id')
          .eq('user_id', userId)
          .eq('date', today)
          .single()

        if (existing) {
          results.skipped++
          continue
        }

        // Fetch user's theses
        const { data: theses } = await supabase
          .from('theses')
          .select('*')
          .eq('user_id', userId)

        if (!theses?.length) {
          results.skipped++
          continue
        }

        // Build the digest
        const payload = await buildDigestForUser(
          userId,
          theses as Thesis[],
          newsArticles,
          marinationArticles
        )

        // Store in DB
        const { data: digest, error: insertError } = await supabase
          .from('digests')
          .insert({
            user_id: userId,
            date: today,
            payload,
            generated_at: new Date().toISOString(),
          })
          .select('id')
          .single()

        if (insertError) throw insertError

        // Send push notification
        const { data: userRow } = await supabase
          .from('users')
          .select('onesignal_player_id')
          .eq('id', userId)
          .single()

        if (userRow?.onesignal_player_id) {
          await sendDigestPush([userRow.onesignal_player_id], payload, digest.id)

          await supabase
            .from('digests')
            .update({ sent_at: new Date().toISOString() })
            .eq('id', digest.id)
        }

        results.success++
        console.log(`[CRON] ✓ User ${userId} — ${payload.portfolio_stories.length} stories`)

        // Small delay between users to avoid LLM rate limits
        await new Promise(r => setTimeout(r, 500))
      } catch (err) {
        console.error(`[CRON] ✗ User ${userId}:`, err instanceof Error ? err.message : err)
        results.failed++
      }
    }

    const elapsed = ((Date.now() - started) / 1000).toFixed(1)
    console.log(`[CRON] Done in ${elapsed}s:`, results)

    return NextResponse.json({ ok: true, elapsed, results, date: today })
  } catch (err) {
    console.error('[CRON] Fatal error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
