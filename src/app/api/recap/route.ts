import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export interface RecapData {
  week_label: string          // e.g. "Week of May 19"
  useful_count: number
  noise_count: number
  knew_count: number
  total_count: number
  feedback_total_ever: number // for <10 gate
  changes: RecapChange[]
}

export interface RecapChange {
  tag: 'MORE OF' | 'LESS OF' | 'BETTER LINKS'
  color: string
  text: string
}

// Build human-readable changes from feedback patterns
function buildChanges(
  topUseful: string[],
  topNoise: string[],
  thesisTickers: string[]
): RecapChange[] {
  const changes: RecapChange[] = []

  if (topUseful.length > 0) {
    const ticker = topUseful[0]
    changes.push({
      tag: 'MORE OF',
      color: 'var(--sage)',
      text: ticker
        ? `${ticker} stories. You marked these useful consistently this week.`
        : 'Stories that connect directly to your thesis reasons. You engaged with these most.',
    })
  }

  if (topNoise.length > 0) {
    const ticker = topNoise[0]
    changes.push({
      tag: 'LESS OF',
      color: 'var(--rust)',
      text: ticker
        ? `${ticker} noise. You skipped or marked these as noise this week.`
        : 'General market commentary. You told us this week you don\'t need the wider picture — just your stocks.',
    })
  }

  if (thesisTickers.length >= 2) {
    changes.push({
      tag: 'BETTER LINKS',
      color: 'var(--coral-deep)',
      text: `We now connect macro moves across your ${thesisTickers.slice(0, 2).join(' and ')} holdings, not just the directly named stock.`,
    })
  } else {
    changes.push({
      tag: 'BETTER LINKS',
      color: 'var(--coral-deep)',
      text: 'We are learning which macro signals matter to your specific thesis reasons, not just your tickers.',
    })
  }

  return changes
}

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Date window: Mon–Fri of current week
  const now = new Date()
  const dayOfWeek = now.getDay() // 0 Sun, 5 Fri
  const monday = new Date(now)
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  monday.setHours(0, 0, 0, 0)

  const weekLabel = monday.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })

  // All feedback this week
  const { data: weekFeedback } = await supabase
    .from('feedback')
    .select('rating, digest_id, story_index, created_at, digests!inner(payload)')
    .eq('user_id', user.id)
    .gte('created_at', monday.toISOString())

  // All-time feedback count (for the <10 gate)
  const { count: feedbackTotalEver } = await supabase
    .from('feedback')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const fb = weekFeedback || []
  const useful_count = fb.filter(f => f.rating === 'useful').length
  const noise_count  = fb.filter(f => f.rating === 'noise').length
  const knew_count   = fb.filter(f => f.rating === 'knew').length
  const total_count  = fb.length

  // Extract ticker mentions from digest payloads to find patterns
  const usefulTickers: Record<string, number> = {}
  const noiseTickers: Record<string, number> = {}

  for (const f of fb) {
    const digest = (f as any).digests
    const payload = digest?.payload
    if (!payload) continue
    const stories = payload.portfolio_stories || []
    const story = stories[f.story_index]
    if (!story?.affects) continue

    for (const affect of story.affects) {
      const t = affect.ticker
      if (f.rating === 'useful') usefulTickers[t] = (usefulTickers[t] || 0) + 1
      if (f.rating === 'noise')  noiseTickers[t]  = (noiseTickers[t]  || 0) + 1
    }
  }

  const topUseful = Object.entries(usefulTickers).sort((a, b) => b[1] - a[1]).map(([t]) => t)
  const topNoise  = Object.entries(noiseTickers).sort((a, b) => b[1] - a[1]).map(([t]) => t)

  // Get user's thesis tickers
  const { data: theses } = await supabase
    .from('theses')
    .select('ticker')
    .eq('user_id', user.id)

  const thesisTickers = (theses || []).map((t: { ticker: string }) => t.ticker)

  const changes = buildChanges(topUseful, topNoise, thesisTickers)

  const recap: RecapData = {
    week_label:          `Week of ${weekLabel}`,
    useful_count,
    noise_count,
    knew_count,
    total_count,
    feedback_total_ever: feedbackTotalEver ?? 0,
    changes,
  }

  return NextResponse.json({ recap })
}
