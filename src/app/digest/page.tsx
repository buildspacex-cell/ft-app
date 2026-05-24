'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import type { DigestPayload, PortfolioStory, MarinationStory } from '@/types'
import JargonText from '@/components/digest/JargonText'
import FridayRecap from '@/components/digest/FridayRecap'

// ─── Weight badge ─────────────────────────────────────────────────────────────

const WEIGHT_LABEL: Record<string, string> = {
  alarm:       'Heads up',
  'heads-up':  'Worth knowing',
  tailwind:    'Good sign',
  quiet:       'For context',
}

function WeightBadge({ weight }: { weight: string }) {
  return (
    <span className={`pill weight-${weight}`} style={{ fontSize: 10, padding: '2px 8px' }}>
      {WEIGHT_LABEL[weight] || weight}
    </span>
  )
}

// ─── Ticker chip — tappable, links to thesis tab ──────────────────────────────

function TickerChip({
  ticker,
  status,
}: {
  ticker: string
  status: 'holding' | 'wobbling' | 'broken-already'
}) {
  const statusColor =
    status === 'holding'        ? 'var(--sage)'  :
    status === 'wobbling'       ? 'var(--amber)' :
    status === 'broken-already' ? 'var(--rust)'  : 'var(--coral)'

  const statusBg =
    status === 'holding'        ? 'var(--sage-tint)'  :
    status === 'wobbling'       ? 'var(--amber-tint)' :
    status === 'broken-already' ? 'var(--rust-tint)'  : 'var(--coral-tint)'

  return (
    <Link
      href={`/stocks/${ticker.toLowerCase()}?tab=thesis`}
      style={{ textDecoration: 'none' }}
    >
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px 3px 8px',
        borderRadius: 20,
        background: statusBg,
        border: `1px solid ${statusColor}22`,
        cursor: 'pointer',
        transition: 'opacity 0.15s',
      }}>
        {/* Status dot */}
        <span style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: statusColor,
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 700,
          color: statusColor,
          letterSpacing: '0.05em',
        }}>
          {ticker}
        </span>
        {/* Arrow hint */}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.6 }}>
          <path d="M2 5H8M6 3L8 5L6 7" stroke={statusColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  )
}

// ─── Feedback row ─────────────────────────────────────────────────────────────

function FeedbackRow({ digestId, storyIndex }: { digestId: string; storyIndex: number }) {
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

// ─── Portfolio story card ─────────────────────────────────────────────────────

function PortfolioCard({
  story,
  index,
  digestId,
}: {
  story: PortfolioStory
  index: number
  digestId: string
}) {
  const primaryTicker = story.affects?.[0]?.ticker
  const primaryStatus = story.affects?.[0]?.status ?? 'holding'
  const detailHref = `/digest/story/p${index}?digest=${digestId}&index=${index}`

  return (
    <div className="card" style={{ marginBottom: 12 }}>

      {/* Top row: weight badge + ticker chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <WeightBadge weight={story.weight} />
        {story.affects.map(a => (
          <TickerChip key={a.ticker} ticker={a.ticker} status={a.status} />
        ))}
      </div>

      {/* Headline — tappable, opens detail */}
      <Link href={detailHref} style={{ textDecoration: 'none', display: 'block', marginBottom: 10 }}>
        <h2 className="card-headline" style={{ color: 'var(--ink)' }}>
          {story.headline}
        </h2>
      </Link>

      {/* Body — tappable too */}
      <Link href={detailHref} style={{ textDecoration: 'none', display: 'block', marginBottom: 14 }}>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
          {story.shop_voice.length > 200 ? story.shop_voice.slice(0, 200) + '…' : story.shop_voice}
        </p>
      </Link>

      {/* Price vs story row */}
      {story.price_vs_story && (
        <div style={{
          background: 'var(--hairline-soft)', borderRadius: 10,
          padding: '10px 14px', marginBottom: 14,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            Price since {story.price_vs_story.since}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 14,
            color: story.price_vs_story.pricePct >= 0 ? 'var(--sage)' : 'var(--rust)',
          }}>
            {story.price_vs_story.pricePct >= 0 ? '+' : ''}
            {story.price_vs_story.pricePct.toFixed(1)}%
          </span>
        </div>
      )}

      {/* "See full thesis" footer — only for portfolio stories */}
      {primaryTicker && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingBottom: 12, marginBottom: 12,
          borderBottom: '1px solid var(--hairline)',
        }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
            {primaryStatus === 'holding'        && 'Your thesis is holding.'}
            {primaryStatus === 'wobbling'       && 'One reason is wobbling.'}
            {primaryStatus === 'broken-already' && 'A reason broke.'}
          </span>
          <Link
            href={`/stocks/${primaryTicker.toLowerCase()}?tab=thesis`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
              color: 'var(--ink)', textDecoration: 'none',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}
          >
            See thesis
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6H9.5M7 3.5L9.5 6L7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      )}

      <FeedbackRow digestId={digestId} storyIndex={index} />
    </div>
  )
}

// ─── Marination card ──────────────────────────────────────────────────────────

function MarinationCard({ story, index, digestId }: { story: MarinationStory; index: number; digestId: string }) {
  const detailHref = `/digest/story/m${index}?digest=${digestId}&index=${index}`
  return (
    <Link href={detailHref} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="card-dark" style={{ marginBottom: 12 }}>
        <p className="eyebrow" style={{ color: 'rgba(246,243,236,0.5)', marginBottom: 10 }}>
          {story.label}
        </p>
        <h2 className="card-headline" style={{ marginBottom: 10, color: 'var(--cream)' }}>
          {story.headline}
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(246,243,236,0.75)', lineHeight: 1.55, marginBottom: 10 }}>
          {story.body.length > 160 ? story.body.slice(0, 160) + '…' : story.body}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(246,243,236,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Read more</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6H9.5M7 3.5L9.5 6L7 8.5" stroke="rgba(246,243,236,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </Link>
  )
}

// ─── Nav bar ──────────────────────────────────────────────────────────────────

function BottomNav({ active }: { active: 'digest' | 'stocks' }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--cream)', borderTop: '1px solid var(--hairline)',
      display: 'flex', justifyContent: 'center', gap: 0,
      paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      zIndex: 100,
    }}>
      {[
        { href: '/digest', label: 'Digest', id: 'digest', icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 6h12M4 10h8M4 14h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )},
        { href: '/stocks', label: 'Stocks', id: 'stocks', icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )},
      ].map(item => (
        <Link
          key={item.id}
          href={item.href}
          style={{
            flex: 1, maxWidth: 120,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, padding: '10px 0 6px',
            textDecoration: 'none',
            color: active === item.id ? 'var(--ink)' : 'var(--muted-2)',
          }}
        >
          {item.icon}
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            fontWeight: active === item.id ? 700 : 400,
          }}>
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DigestPage() {
  const [digest, setDigest] = useState<{ id: string; payload: DigestPayload } | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const fetchDigest = useCallback(async () => {
    const res = await fetch('/api/digest')
    const data = await res.json()
    if (data.digest) setDigest(data.digest)
    else setMessage(data.message || 'Your digest is being prepared.')
    setLoading(false)
  }, [])

  useEffect(() => { fetchDigest() }, [fetchDigest])

  const now = new Date()
  const isFriday = now.getDay() === 5
  const greeting = isFriday
    ? 'Good morning. Let\'s see how the week landed.'
    : now.getHours() < 12 ? 'Good morning.'
    : now.getHours() < 17 ? 'Good afternoon.'
    : 'Good evening.'

  if (loading) {
    return (
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="eyebrow">Loading your morning check...</p>
      </main>
    )
  }

  if (!digest) {
    return (
      <>
        <main style={{ background: 'var(--cream)', minHeight: '100dvh', padding: '80px 24px 100px' }}>
          <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>The Morning Check</p>
            <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>{greeting}</p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32 }}>{message}</p>
            <Link href="/stocks" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 20px', borderRadius: 12,
              background: 'var(--ink)', color: 'var(--cream)',
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, textDecoration: 'none',
            }}>
              Browse stocks & build your thesis
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M8 4L11 7L8 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </main>
        <BottomNav active="digest" />
      </>
    )
  }

  const { portfolio_stories, marination_stories } = digest.payload
  const totalStories = portfolio_stories.length

  return (
    <>
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', paddingBottom: 80 }}>
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
                : `${totalStories} thing${totalStories > 1 ? 's' : ''} for your portfolio today.`}
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
            <MarinationCard key={i} story={story} index={i} digestId={digest.id} />
          ))}

          {/* Footer */}
          <div style={{ padding: '24px 0 8px' }}>
            <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6 }}>
              Fundamentally True is for informational and educational purposes only. We do not provide investment advice. All decisions are yours.
            </p>
          </div>

        </div>
      </main>

      <BottomNav active="digest" />
    </>
  )
}
