'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Thesis, ThesisReason } from '@/types'

const DISPLAY_NAMES: Record<string, string> = {
  RELIANCE:    'Reliance Industries',
  HDFCBANK:    'HDFC Bank',
  TCS:         'Tata Consultancy Services',
  INFY:        'Infosys',
  HINDUNILVR:  'Hindustan Unilever',
  ONGC:        'ONGC',
  SUNPHARMA:   'Sun Pharmaceutical',
  MARUTI:      'Maruti Suzuki',
  BAJFINANCE:  'Bajaj Finance',
  WIPRO:       'Wipro',
}

const SECTOR_COLORS: Record<string, string> = {
  RELIANCE:    'var(--ink)',
  HDFCBANK:    'var(--sage)',
  TCS:         'var(--coral)',
  INFY:        'var(--coral)',
  HINDUNILVR:  'var(--amber)',
  ONGC:        'var(--muted)',
  SUNPHARMA:   '#3c7a8a',
  MARUTI:      '#5a4a8a',
  BAJFINANCE:  'var(--rust)',
  WIPRO:       'var(--coral-deep)',
}

// ─── Thesis health bar ────────────────────────────────────────────────────────

function ThesisHealthBar({ reasons }: { reasons: ThesisReason[] }) {
  const accepted = reasons.filter(r => r.accepted)
  const holding  = accepted.filter(r => r.status === 'holding').length
  const wobbling = accepted.filter(r => r.status === 'wobbling').length
  const broken   = accepted.filter(r => r.status === 'broken').length
  const total    = accepted.length

  if (total === 0) return null

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden', gap: 2 }}>
        {holding  > 0 && <div style={{ flex: holding,  background: 'var(--sage)',  borderRadius: 2 }} />}
        {wobbling > 0 && <div style={{ flex: wobbling, background: 'var(--amber)', borderRadius: 2 }} />}
        {broken   > 0 && <div style={{ flex: broken,   background: 'var(--rust)',  borderRadius: 2 }} />}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
        {holding  > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--sage)',  letterSpacing: '0.06em' }}>{holding} HOLDING</span>}
        {wobbling > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--amber)', letterSpacing: '0.06em' }}>{wobbling} WOBBLING</span>}
        {broken   > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--rust)',  letterSpacing: '0.06em' }}>{broken} BROKE</span>}
      </div>
    </div>
  )
}

// ─── Thesis card ──────────────────────────────────────────────────────────────

function ThesisCard({ thesis }: { thesis: Thesis }) {
  const accepted = thesis.reasons_json.filter(r => r.accepted)
  const broken   = accepted.filter(r => r.status === 'broken').length
  const wobbling = accepted.filter(r => r.status === 'wobbling').length
  const accentColor = SECTOR_COLORS[thesis.ticker] ?? 'var(--coral)'

  const statusLabel =
    broken   > 0 ? 'Review' :
    wobbling > 0 ? 'Wobbling' : 'Holding'
  const statusColor =
    broken   > 0 ? 'var(--rust)'  :
    wobbling > 0 ? 'var(--amber)' : 'var(--sage)'
  const statusBg =
    broken   > 0 ? 'var(--rust-tint)'  :
    wobbling > 0 ? 'var(--amber-tint)' : 'var(--sage-tint)'

  return (
    <Link href={`/stocks/${thesis.ticker.toLowerCase()}?tab=thesis`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--hairline)',
        borderRadius: 16,
        padding: '16px 18px',
        marginBottom: 10,
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        transition: 'border-color 0.15s',
      }}>
        {/* Colour bar */}
        <div style={{ width: 4, borderRadius: 2, background: accentColor, flexShrink: 0, alignSelf: 'stretch', minHeight: 44 }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: accentColor, letterSpacing: '0.04em' }}>
              {thesis.ticker}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: 10,
              background: statusBg, color: statusColor,
            }}>
              {statusLabel}
            </span>
          </div>

          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: 0, lineHeight: 1.2 }}>
            {DISPLAY_NAMES[thesis.ticker] ?? thesis.ticker}
          </p>

          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {accepted.length} reason{accepted.length !== 1 ? 's' : ''} in thesis
          </p>

          {/* Health bar */}
          <ThesisHealthBar reasons={thesis.reasons_json} />

          {/* Top accepted reasons (first 2, abbreviated) */}
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {accepted.slice(0, 2).map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%', flexShrink: 0, marginTop: 5,
                  background:
                    r.status === 'holding'  ? 'var(--sage)'  :
                    r.status === 'wobbling' ? 'var(--amber)' : 'var(--rust)',
                }} />
                <span style={{
                  fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.4,
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
                } as React.CSSProperties}>
                  {r.claim}
                </span>
              </div>
            ))}
            {accepted.length > 2 && (
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                +{accepted.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
          <path d="M6 4L10 8L6 12" stroke="var(--muted-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  )
}

// ─── Stats strip ─────────────────────────────────────────────────────────────

function StatsStrip({ theses, feedbackCount }: { theses: Thesis[]; feedbackCount: number }) {
  const allAccepted = theses.flatMap(t => t.reasons_json.filter(r => r.accepted))
  const holding  = allAccepted.filter(r => r.status === 'holding').length
  const wobbling = allAccepted.filter(r => r.status === 'wobbling').length
  const broken   = allAccepted.filter(r => r.status === 'broken').length

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
      {[
        { label: 'Stocks',    value: theses.length,    color: 'var(--ink)' },
        { label: 'Holding',   value: holding,          color: 'var(--sage)' },
        { label: 'Wobbling',  value: wobbling,         color: 'var(--amber)' },
        { label: 'Feedback',  value: feedbackCount,    color: 'var(--coral-deep)' },
      ].map(s => (
        <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '12px 10px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1 }}>
            {s.value}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Bottom nav ───────────────────────────────────────────────────────────────

function BottomNav() {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--cream)', borderTop: '1px solid var(--hairline)',
      display: 'flex', justifyContent: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)', zIndex: 100,
    }}>
      {[
        { href: '/digest', label: 'Digest', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 10h8M4 14h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg> },
        { href: '/stocks', label: 'Stocks', icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg> },
        { href: '/recap',  label: 'Recap',  icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v6l3.5 2M10 4a7 7 0 100 14A7 7 0 0010 4z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg> },
        { href: '/me',     label: 'Me',     icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg> },
      ].map(item => (
        <Link key={item.href} href={item.href} style={{
          flex: 1, maxWidth: 80,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 3, padding: '10px 0 6px', textDecoration: 'none',
          color: item.href === '/me' ? 'var(--ink)' : 'var(--muted-2)',
        }}>
          {item.icon}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: item.href === '/me' ? 700 : 400 }}>
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MePage() {
  const router = useRouter()
  const [theses, setTheses] = useState<Thesis[]>([])
  const [email, setEmail] = useState<string | null>(null)
  const [feedbackCount, setFeedbackCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }

      setEmail(user.email ?? null)

      const [thesisRes, feedbackRes] = await Promise.all([
        supabase.from('theses').select('*').eq('user_id', user.id),
        supabase.from('feedback').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      ])

      setTheses((thesisRes.data ?? []) as Thesis[])
      setFeedbackCount(feedbackRes.count ?? 0)
      setLoading(false)
    }
    load()
  }, [router])

  async function signOut() {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Loading...</p>
      </main>
    )
  }

  return (
    <>
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', paddingBottom: 90 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

          {/* Header */}
          <div style={{ padding: '52px 0 24px' }}>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Your account</p>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 4 }}>
              My theses
            </h1>
            {email && (
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>{email}</p>
            )}
          </div>

          {/* Stats */}
          <StatsStrip theses={theses} feedbackCount={feedbackCount} />

          {/* Theses list */}
          {theses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 20 }}>
                No theses yet. Pick a stock and accept the reasons you believe.
              </p>
              <Link
                href="/stocks"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 20px', borderRadius: 12,
                  background: 'var(--ink)', color: 'var(--cream)',
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Browse stocks
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M8 4L11 7L8 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 8 }}>
                <p className="eyebrow">
                  {theses.length} stock{theses.length !== 1 ? 's' : ''} tracked
                </p>
              </div>
              {theses.map(t => (
                <ThesisCard key={t.ticker} thesis={t} />
              ))}

              {/* Add more stocks CTA */}
              <Link
                href="/stocks"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px', borderRadius: 14, marginTop: 4,
                  border: '1.5px dashed var(--hairline)',
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
                  color: 'var(--muted)', textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add another stock
              </Link>
            </>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--hairline)', margin: '28px 0' }} />

          {/* Account actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            <Link href="/recap" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 12 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>Weekly recap</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>What we learned from your feedback</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--muted-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </Link>

            <Link href="/stocks" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 12 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>Browse stocks</p>
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>10 NSE companies with shop stories</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="var(--muted-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </Link>
          </div>

          {/* Sign out */}
          <button
            onClick={signOut}
            disabled={signingOut}
            style={{
              width: '100%', padding: '14px', borderRadius: 12,
              border: '1px solid var(--hairline)', background: 'transparent',
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
              color: 'var(--muted)', cursor: 'pointer',
            }}
          >
            {signingOut ? 'Signing out...' : 'Sign out'}
          </button>

          <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6, marginTop: 20 }}>
            Fundamentally True is for informational and educational purposes only. We do not provide investment advice. All decisions are yours.
          </p>
        </div>
      </main>

      <BottomNav />
    </>
  )
}
