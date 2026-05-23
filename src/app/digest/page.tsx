'use client'

import { useEffect, useState, useCallback } from 'react'
import type { DigestPayload, PortfolioStory, MarinationStory } from '@/types'

const WEIGHT_LABEL: Record<string, string> = {
  alarm: 'Heads up',
  'heads-up': 'Worth knowing',
  tailwind: 'Good sign',
  quiet: 'For context',
}

function WeightBadge({ weight }: { weight: string }) {
  const cls = `weight-${weight}`
  return (
    <span className={`pill ${cls}`} style={{ fontSize: 10, padding: '2px 8px' }}>
      {WEIGHT_LABEL[weight] || weight}
    </span>
  )
}

function FeedbackRow({
  digestId,
  storyIndex,
}: {
  digestId: string
  storyIndex: number
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function tap(rating: string) {
    if (saving) return
    setSaving(true)
    setSelected(rating)

    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ digest_id: digestId, story_index: storyIndex, rating }),
    })

    setSaving(false)
  }

  return (
    <div style={{ display: 'flex', gap: 8, paddingTop: 14, borderTop: '1px solid var(--hairline)' }}>
      {(['useful', 'noise', 'knew'] as const).map(r => (
        <button
          key={r}
          onClick={() => tap(r)}
          className={`feedback-chip ${selected === r ? `selected ${r}` : ''}`}
          style={{ fontSize: 12, padding: '6px 12px', minHeight: 36 }}
        >
          {r === 'useful' ? 'Useful' : r === 'noise' ? 'Noise' : 'Already knew'}
        </button>
      ))}
    </div>
  )
}

function PortfolioCard({
  story,
  index,
  digestId,
}: {
  story: PortfolioStory
  index: number
  digestId: string
}) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <WeightBadge weight={story.weight} />
        {story.affects.map(a => (
          <span key={a.ticker} className="eyebrow" style={{ color: 'var(--coral)' }}>
            {a.ticker}
          </span>
        ))}
      </div>

      <h2 className="card-headline" style={{ marginBottom: 10, color: 'var(--ink)' }}>
        {story.headline}
      </h2>

      <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: 14 }}>
        {story.shop_voice}
      </p>

      {story.price_vs_story && (
        <div style={{
          background: 'var(--hairline-soft)',
          borderRadius: 10,
          padding: '10px 14px',
          marginBottom: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Price since {story.price_vs_story.since}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            fontSize: 14,
            color: story.price_vs_story.pricePct >= 0 ? 'var(--sage)' : 'var(--rust)',
          }}>
            {story.price_vs_story.pricePct >= 0 ? '+' : ''}
            {story.price_vs_story.pricePct.toFixed(1)}%
          </span>
        </div>
      )}

      <FeedbackRow digestId={digestId} storyIndex={index} />
    </div>
  )
}

function MarinationCard({ story }: { story: MarinationStory }) {
  return (
    <div className="card-dark" style={{ marginBottom: 12 }}>
      <p className="eyebrow" style={{ color: 'var(--muted)', marginBottom: 10 }}>
        {story.label}
      </p>
      <h2 className="card-headline" style={{ marginBottom: 10, color: 'var(--cream)' }}>
        {story.headline}
      </h2>
      <p style={{ fontSize: 14, color: 'var(--cream-deep)', lineHeight: 1.55, marginBottom: 10 }}>
        {story.body}
      </p>
      <p style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>
        {story.why_care}
      </p>
    </div>
  )
}

export default function DigestPage() {
  const [digest, setDigest] = useState<{ id: string; payload: DigestPayload } | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchDigest = useCallback(async () => {
    const res = await fetch('/api/digest')
    const data = await res.json()
    if (data.digest) {
      setDigest(data.digest)
    } else {
      setMessage(data.message || 'Your digest is being prepared.')
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchDigest() }, [fetchDigest])

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning.' : now.getHours() < 17 ? 'Good afternoon.' : 'Good evening.'

  if (loading) {
    return (
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="eyebrow">Loading your morning check...</p>
      </main>
    )
  }

  if (!digest) {
    return (
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', padding: '80px 24px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>The Morning Check</p>
          <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>{greeting}</p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{message}</p>
        </div>
      </main>
    )
  }

  const { portfolio_stories, marination_stories } = digest.payload
  const totalStories = portfolio_stories.length

  return (
    <main style={{ background: 'var(--cream)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div style={{ padding: '52px 0 24px' }}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>The Morning Check</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
            {greeting}
          </p>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>
            {totalStories === 0
              ? 'Quiet morning for your portfolio.'
              : `${totalStories} thing${totalStories > 1 ? 's' : ''} for your portfolio.`}
          </p>
        </div>

        {/* Portfolio stories */}
        {portfolio_stories.map((story, i) => (
          <PortfolioCard key={i} story={story} index={i} digestId={digest.id} />
        ))}

        {/* Marination divider */}
        {marination_stories.length > 0 && (
          <div style={{ padding: '16px 0 12px' }}>
            <p className="eyebrow" style={{ color: 'var(--muted-2)' }}>The wider world</p>
          </div>
        )}

        {/* Marination stories */}
        {marination_stories.map((story, i) => (
          <MarinationCard key={i} story={story} />
        ))}

        {/* Footer */}
        <div style={{ padding: '24px 0 48px' }} className="safe-bottom">
          <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6 }}>
            Fundamentally True is for informational and educational purposes only. We do not provide investment advice. All decisions are yours.
          </p>
        </div>
      </div>
    </main>
  )
}
