'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import type { DigestPayload, PortfolioStory, MarinationStory, Thesis, ThesisReason } from '@/types'

// ─── Weight badge ─────────────────────────────────────────────────────────────

const WEIGHT_META: Record<string, { label: string; cls: string }> = {
  alarm:       { label: 'Heads up',     cls: 'weight-alarm' },
  'heads-up':  { label: 'Worth knowing', cls: 'weight-heads-up' },
  tailwind:    { label: 'Good sign',    cls: 'weight-tailwind' },
  quiet:       { label: 'For context',  cls: 'weight-quiet' },
}

function WeightBadge({ weight }: { weight: string }) {
  const meta = WEIGHT_META[weight] ?? { label: weight, cls: 'weight-quiet' }
  return (
    <span className={`pill ${meta.cls}`} style={{ fontSize: 10, padding: '3px 10px' }}>
      {meta.label}
    </span>
  )
}

// ─── Affects row ──────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  holding:        'var(--sage)',
  wobbling:       'var(--amber)',
  'broken-already': 'var(--rust)',
}
const STATUS_BG: Record<string, string> = {
  holding:        'var(--sage-tint)',
  wobbling:       'var(--amber-tint)',
  'broken-already': 'var(--rust-tint)',
}

function AffectsRow({ affects }: { affects: PortfolioStory['affects'] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
      {affects.map(a => (
        <Link
          key={a.ticker}
          href={`/stocks/${a.ticker.toLowerCase()}?tab=thesis`}
          style={{ textDecoration: 'none' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 11px 4px 8px',
            borderRadius: 20,
            background: STATUS_BG[a.status] ?? 'var(--coral-tint)',
            border: `1px solid ${STATUS_COLOR[a.status] ?? 'var(--coral)'}22`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_COLOR[a.status] ?? 'var(--coral)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: STATUS_COLOR[a.status] ?? 'var(--coral)', letterSpacing: '0.04em' }}>
              {a.ticker}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: STATUS_COLOR[a.status] ?? 'var(--coral)', textTransform: 'capitalize', opacity: 0.8 }}>
              · {a.status.replace('-already', '')}
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}

// ─── Price vs Story module ────────────────────────────────────────────────────

function PriceVsStory({ data }: { data: NonNullable<PortfolioStory['price_vs_story']> }) {
  const isUp = data.pricePct > 0
  const storyColor =
    data.story === 'holding'  ? 'var(--sage)'  :
    data.story === 'wobbling' ? 'var(--amber)' : 'var(--rust)'

  return (
    <div style={{
      marginTop: 18, padding: '14px 16px',
      background: 'var(--cream)',
      border: '1px solid var(--hairline)',
      borderRadius: 12,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
      }}>
        Price vs. story · {data.ticker} since {data.since}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 12 }}>
        <div style={{ paddingRight: 16, borderRight: '1px solid var(--hairline)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: storyColor }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>The story</span>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 17, letterSpacing: '-0.02em', color: storyColor, textTransform: 'capitalize' }}>
            {data.story}
          </div>
        </div>
        <div style={{ paddingLeft: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 5 }}>
            The price
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 17, letterSpacing: '-0.02em', color: isUp ? 'var(--sage)' : 'var(--rust)' }}>
            {isUp ? '↑' : '↓'} {Math.abs(data.pricePct).toFixed(1)}%
          </div>
        </div>
      </div>

      <div style={{
        paddingTop: 10, borderTop: '1px solid var(--hairline)',
        fontFamily: 'var(--font-sans)', fontWeight: 500,
        fontSize: 13, lineHeight: 1.4, letterSpacing: '-0.005em',
        color: 'var(--coral-deep)',
      }}>
        {data.reading}
      </div>
    </div>
  )
}

// ─── Thesis connection card ───────────────────────────────────────────────────

function ThesisConnection({
  ticker,
  reasonId,
  theses,
}: {
  ticker: string
  reasonId?: string
  theses: Thesis[]
}) {
  const thesis = theses.find(t => t.ticker === ticker)
  if (!thesis) return null

  const acceptedReasons = thesis.reasons_json.filter(r => r.accepted)
  const matchedReason = reasonId
    ? acceptedReasons.find(r => r.id === reasonId)
    : acceptedReasons[0]

  if (!matchedReason) return null

  const statusColor =
    matchedReason.status === 'holding'  ? 'var(--sage)'  :
    matchedReason.status === 'wobbling' ? 'var(--amber)' : 'var(--rust)'

  const statusIcon =
    matchedReason.status === 'holding'  ? '✓' :
    matchedReason.status === 'wobbling' ? '~' : '✕'

  const statusBg =
    matchedReason.status === 'holding'  ? 'var(--sage)'  :
    matchedReason.status === 'wobbling' ? 'var(--amber)' : 'var(--rust)'

  return (
    <div style={{
      marginTop: 18, padding: '16px 16px',
      background: 'var(--card)',
      border: '1px solid var(--hairline)',
      borderRadius: 14,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10,
      }}>
        How this hits your {ticker} thesis
      </div>

      <div style={{
        fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15,
        letterSpacing: '-0.015em', lineHeight: 1.32, marginBottom: 12,
        color: 'var(--ink)',
      }}>
        "{matchedReason.claim}"
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%',
          background: statusBg, color: 'var(--cream)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, flexShrink: 0,
        }}>
          {statusIcon}
        </span>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: statusColor, textTransform: 'capitalize' }}>
            {matchedReason.status}
          </span>
          {matchedReason.actual && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>
              · {matchedReason.actual}
            </span>
          )}
        </div>
      </div>

      {matchedReason.verdict && (
        <div style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13,
          color: 'var(--coral-deep)', lineHeight: 1.4, letterSpacing: '-0.005em',
        }}>
          {matchedReason.verdict}
        </div>
      )}

      <Link
        href={`/stocks/${ticker.toLowerCase()}?tab=thesis`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 10,
          fontWeight: 600, color: 'var(--ink)', textDecoration: 'none',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}
      >
        See full thesis
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6H9.5M7 3.5L9.5 6L7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}

// ─── Sources panel ────────────────────────────────────────────────────────────

function SourcesPanel({ sources }: { sources: string[] }) {
  if (!sources?.length) return null
  return (
    <div style={{
      marginTop: 18, padding: '14px 16px',
      background: 'var(--cream-deep)', borderRadius: 12,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10,
      }}>
        What we read to write this
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sources.map((src, i) => (
          <a
            key={i}
            href={src.startsWith('http') ? src : undefined}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: src.startsWith('http') ? 'var(--coral-deep)' : 'var(--ink-soft)',
              letterSpacing: '-0.005em',
              textDecoration: src.startsWith('http') ? 'underline' : 'none',
              textUnderlineOffset: 3,
            }}
          >
            · {src}
          </a>
        ))}
      </div>
      <div style={{
        marginTop: 12, fontFamily: 'var(--font-sans)', fontSize: 11.5,
        color: 'var(--muted)', lineHeight: 1.45, letterSpacing: '-0.005em',
      }}>
        Our system reads ~2,400 sources daily. You see only what touches your portfolio — or teaches something useful.
      </div>
    </div>
  )
}

// ─── Inline feedback (full options, not chips) ────────────────────────────────

function FeedbackPanel({ digestId, storyIndex }: { digestId: string; storyIndex: number }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  async function tap(rating: string) {
    setSelected(rating)
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ digest_id: digestId, story_index: storyIndex, rating }),
    })
    setSaved(true)
  }

  const options = [
    { value: 'useful', label: 'Useful',       sub: 'Helped me see something',         color: 'var(--sage)',  bg: 'var(--sage-tint)' },
    { value: 'knew',   label: 'Already knew', sub: 'Saw this elsewhere',              color: 'var(--amber)', bg: 'var(--amber-tint)' },
    { value: 'noise',  label: 'Noise',        sub: 'Didn\'t need this in my morning', color: 'var(--rust)',  bg: 'var(--rust-tint)' },
  ]

  if (saved) {
    return (
      <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--hairline-soft)', borderRadius: 12, textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
          ✓ Saved · teaches your filter
        </span>
      </div>
    )
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
      }}>
        How did this land for you?
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(o => {
          const sel = o.value === selected
          return (
            <button
              key={o.value}
              onClick={() => tap(o.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 14px', borderRadius: 12,
                background: sel ? o.bg : 'var(--card)',
                border: sel ? `1.5px solid ${o.color}` : '1px solid var(--hairline)',
                textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-sans)',
                transition: 'all 0.15s',
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: sel ? o.color : 'transparent',
                border: sel ? 'none' : '1.5px solid var(--hairline)',
                display: 'grid', placeItems: 'center',
                color: 'var(--cream)', fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>
                {sel ? '✓' : ''}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.015em', color: 'var(--ink)' }}>{o.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{o.sub}</div>
              </div>
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: 11, color: 'var(--muted-2)', marginTop: 10, textAlign: 'center' }}>
        Trains your filter only. We never share what you tap.
      </p>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function StoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ storyId: string }>
  searchParams: Promise<{ digest?: string; index?: string }>
}) {
  const { storyId } = use(params)
  const { digest: digestId, index: indexStr } = use(searchParams)
  const storyIndex = parseInt(indexStr ?? '0', 10)
  const isMarination = storyId.startsWith('m')

  const router = useRouter()
  const [story, setStory] = useState<PortfolioStory | MarinationStory | null>(null)
  const [theses, setTheses] = useState<Thesis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      // Load digest for today
      const res = await fetch('/api/digest')
      const data = await res.json()
      if (!data.digest) { setLoading(false); return }

      const payload: DigestPayload = data.digest.payload
      const s = isMarination
        ? payload.marination_stories[storyIndex]
        : payload.portfolio_stories[storyIndex]

      setStory(s ?? null)

      // Load theses for thesis-connection card
      const { data: thesisData } = await supabase
        .from('theses')
        .select('*')
        .eq('user_id', user.id)

      setTheses((thesisData ?? []) as Thesis[])
      setLoading(false)
    }
    load()
  }, [storyIndex, isMarination, router])

  if (loading) {
    return (
      <main style={{ background: 'var(--paper)', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Loading...</p>
      </main>
    )
  }

  if (!story) {
    return (
      <main style={{ background: 'var(--paper)', minHeight: '100dvh', padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: 'var(--muted)' }}>Story not found.</p>
        <Link href="/digest" style={{ color: 'var(--coral)', fontWeight: 600 }}>← Back to digest</Link>
      </main>
    )
  }

  const isPortfolio = story.kind === 'your-portfolio'
  const portfolioStory = isPortfolio ? (story as PortfolioStory) : null
  const primaryTicker = portfolioStory?.affects?.[0]?.ticker

  return (
    <main style={{ background: 'var(--paper)', minHeight: '100dvh' }}>
      {/* Top bar */}
      <div style={{
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: 'var(--paper)',
        borderBottom: '1px solid var(--hairline)', zIndex: 10,
      }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'var(--card)', border: '1px solid var(--hairline)',
            borderRadius: 999, padding: '6px 14px',
            fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em',
            color: 'var(--ink)', textTransform: 'uppercase', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Digest
        </button>

        {primaryTicker && (
          <Link
            href={`/stocks/${primaryTicker.toLowerCase()}?tab=thesis`}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {primaryTicker} thesis ↗
          </Link>
        )}
      </div>

      {/* Body */}
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 20px 80px' }}>

        {/* Weight + kind */}
        <div style={{ marginBottom: 14 }}>
          {isPortfolio && portfolioStory ? (
            <WeightBadge weight={portfolioStory.weight} />
          ) : (
            <span className="pill weight-quiet" style={{ fontSize: 10, padding: '3px 10px' }}>
              {(story as MarinationStory).label}
            </span>
          )}
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 28,
          letterSpacing: '-0.035em', lineHeight: 1.07, margin: '6px 0 16px',
          color: 'var(--ink)',
        }}>
          {story.headline}
        </h1>

        {/* Affects row for portfolio stories */}
        {isPortfolio && portfolioStory && (
          <AffectsRow affects={portfolioStory.affects} />
        )}

        {/* Body text */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 16.5, lineHeight: 1.52,
          letterSpacing: '-0.005em', color: 'var(--ink-soft)',
          margin: '0 0 6px',
        }}>
          {isPortfolio ? (story as PortfolioStory).shop_voice : (story as MarinationStory).body}
        </p>

        {/* Why care (marination) */}
        {!isPortfolio && (story as MarinationStory).why_care && (
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.45,
            color: 'var(--muted)', fontStyle: 'italic', marginTop: 14,
          }}>
            {(story as MarinationStory).why_care}
          </p>
        )}

        {/* Thesis connection (portfolio only) */}
        {isPortfolio && portfolioStory && primaryTicker && (
          <ThesisConnection
            ticker={primaryTicker}
            reasonId={portfolioStory.thesis_reason_id}
            theses={theses}
          />
        )}

        {/* Price vs story (portfolio only) */}
        {isPortfolio && portfolioStory?.price_vs_story && (
          <PriceVsStory data={portfolioStory.price_vs_story} />
        )}

        {/* Sources */}
        <SourcesPanel sources={story.sources ?? []} />

        {/* Feedback (portfolio stories only — marination doesn't need it) */}
        {isPortfolio && digestId && (
          <FeedbackPanel digestId={digestId} storyIndex={storyIndex} />
        )}

        {/* Disclaimer */}
        <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6, marginTop: 28 }}>
          Fundamentally True is for informational and educational purposes only. We do not provide investment advice. All decisions are yours.
        </p>
      </div>
    </main>
  )
}
