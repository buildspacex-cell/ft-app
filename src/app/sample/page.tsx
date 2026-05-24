'use client'

import Link from 'next/link'
import { useState } from 'react'

// ─── Shared atoms ─────────────────────────────────────────────────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)', flexShrink: 0 as const }} />
      {label}
    </div>
  )
}

function StepBadge({ n, active = false }: { n: number; active?: boolean }) {
  return (
    <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: active ? 'var(--coral)' : 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>{n}</div>
  )
}

function StepHeader({ n, eyebrow, title, active = false }: { n: number; eyebrow: string; title: string; active?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
      <StepBadge n={n} active={active} />
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 4px' }}>{eyebrow}</p>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', color: 'var(--ink)', margin: 0 }}>{title}</h2>
      </div>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--hairline)', margin: '52px 0' }} />
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tip({ term, explain }: { term: string; explain: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit', color: 'var(--coral-deep)', borderBottom: '1px dotted var(--coral)', display: 'inline' }}>
        {term}
      </button>
      {open && (
        <span style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)', zIndex: 100, background: 'var(--ink)', color: 'var(--cream)', borderRadius: 10, padding: '8px 12px', width: 230, fontSize: 12, lineHeight: 1.5, pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, background: 'var(--ink)', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', display: 'block' }} />
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--coral)', display: 'block', marginBottom: 3 }}>{term}</strong>
          {explain}
        </span>
      )}
    </span>
  )
}

// ─── Chapter 1: Shop story ────────────────────────────────────────────────────

function ShopStory() {
  return (
    <div>
      <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.008em', color: 'var(--ink-soft)', marginBottom: 20 }}>
        HDFC Bank is the bank with the queue outside on salary day — and the NRI counter that is always suspiciously calm.
      </p>

      {[
        {
          h: 'What they do',
          body: 'They take deposits from people who trust them and lend it out to people who need it — home loans, car loans, business loans, personal loans. The gap between what they pay depositors and what they charge borrowers is their entire business.',
          tx: null,
        },
        {
          h: 'How the money lands',
          body: '40% of their deposits come from current and savings accounts — people who park money there for convenience, not returns. That cheap funding lets HDFC lend at higher rates and keep the gap fat.',
          tx: { num: 'Net Interest Margin 3.5%', says: 'for every ₹100 lent, ₹3.50 is their profit after paying depositors' },
        },
        {
          h: 'The loan quality story',
          body: 'Of every ₹100 they have ever lent, less than 40 paise has gone bad. That is their real moat — not just the branches, the discipline. Two decades of not lending to bad credits.',
          tx: { num: 'Net NPA ~0.31%', says: '31 paise in bad loans per ₹100 lent — sector average is ₹1.50' },
        },
      ].map((p, i) => (
        <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 16, padding: '16px 18px', marginBottom: 10 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, letterSpacing: '-0.015em', marginBottom: 8, color: 'var(--ink)' }}>{p.h}</h3>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>{p.body}</p>
          {p.tx && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--hairline)', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', flexShrink: 0 }}>{p.tx.num}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13, color: 'var(--coral-deep)', lineHeight: 1.35, letterSpacing: '-0.005em' }}>&ldquo;{p.tx.says}&rdquo;</span>
            </div>
          )}
        </div>
      ))}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: 14, background: 'var(--ink)', color: 'var(--cream)', marginTop: 4 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.5)', marginBottom: 4 }}>Next chapter</p>
          <p style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em' }}>Where the money comes from →</p>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  )
}

// ─── Chapter 2: Revenue streams ───────────────────────────────────────────────

function RevenueStreams() {
  const streams = [
    { label: 'Net Interest Income', pct: 62, color: 'var(--ink)', sub: 'The spread between what they charge borrowers and what they pay depositors.', what: 'The core of banking. This is their salary.' },
    { label: 'Fee Income', pct: 22, color: 'var(--coral)', sub: 'Credit card fees, processing charges, forex, third-party product distribution.', what: 'Pure profit — no capital at risk.' },
    { label: 'Treasury', pct: 10, color: 'var(--sage)', sub: 'Returns from their investment portfolio — bonds, government securities.', what: 'Steady, boring, reliable.' },
    { label: 'Other', pct: 6, color: 'var(--amber)', sub: 'Insurance, mutual fund distribution, and miscellaneous services.', what: 'Small but growing.' },
  ]

  return (
    <div>
      <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.45, color: 'var(--ink-soft)', marginBottom: 20 }}>
        Every rupee HDFC Bank made last year came from one of four places.
      </p>

      {/* Stacked bar */}
      <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', border: '1px solid var(--hairline)', marginBottom: 6 }}>
        {streams.map((s, i) => <div key={i} style={{ width: `${s.pct}%`, background: s.color }} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>0%</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>100% of revenue</span>
      </div>

      {streams.map((s, i) => (
        <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 14, padding: '14px 16px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 40, borderRadius: 3, background: s.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--ink)', marginBottom: 2 }}>{s.label}</p>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{s.sub}</p>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', flexShrink: 0 }}>{s.pct}<span style={{ fontSize: 12, color: 'var(--muted)' }}>%</span></p>
          </div>
          <p style={{ fontSize: 13, color: 'var(--coral-deep)', fontWeight: 500, marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--hairline)' }}>&ldquo;{s.what}&rdquo;</p>
        </div>
      ))}

      <div style={{ marginTop: 8, padding: '14px 16px', borderRadius: 14, background: 'var(--coral-tint)', border: '1px solid rgba(217,119,87,0.3)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral-deep)', marginBottom: 6 }}>The takeaway</p>
        <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--ink-soft)' }}>
          62% of the money comes from the lending spread. If loan quality deteriorates or deposit costs rise, the whole business feels it. That is why NPA matters so much to this thesis.
        </p>
      </div>
    </div>
  )
}

// ─── Chapter 3: Thesis builder ────────────────────────────────────────────────

const REASONS = [
  { id: 1, claim: "Best-in-class loan quality — their NPA is consistently lower than every peer", measure: "Net NPA ratio vs sector average each quarter", strength: "Load-bearing" as const, dots: 3 },
  { id: 2, claim: "Low-cost deposits — 42% from current and savings accounts keeps their cost of funds low", measure: "CASA ratio each quarter", strength: "Load-bearing" as const, dots: 3 },
  { id: 3, claim: "8,000+ branches across India — physical reach no neo-bank can replicate in a decade", measure: "Branch count growth + loan growth YoY", strength: "Matters" as const, dots: 2 },
]

function ThesisBuilder() {
  const [accepted, setAccepted] = useState<boolean[]>([true, true, true])
  const [saved, setSaved] = useState(false)
  const count = accepted.filter(Boolean).length

  function toggle(i: number) {
    if (saved) return
    setAccepted(prev => prev.map((v, idx) => idx === i ? !v : v))
  }

  return (
    <div>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 20 }}>
        We wrote 3 reasons why someone might own HDFC Bank. Toggle off the ones you do not believe. The ones you keep become your thesis — we track those specific reasons every morning.
      </p>

      {REASONS.map((r, i) => (
        <button key={r.id} onClick={() => toggle(i)} style={{
          display: 'flex', gap: 14, alignItems: 'flex-start',
          padding: '14px 16px', borderRadius: 14, marginBottom: 10, width: '100%',
          background: accepted[i] ? 'var(--ink)' : 'var(--card)',
          border: accepted[i] ? '1.5px solid var(--ink)' : '1px solid var(--hairline)',
          cursor: saved ? 'default' : 'pointer', textAlign: 'left',
          transition: 'all 0.15s',
        }}>
          {/* Number badge */}
          <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: accepted[i] ? 'var(--cream)' : 'var(--ink)', color: accepted[i] ? 'var(--ink)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}>{r.id}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.015em', lineHeight: 1.3, margin: '0 0 8px', color: accepted[i] ? 'var(--cream)' : 'var(--ink)' }}>{r.claim}</p>
            {/* Strength dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3].map(d => <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: d <= r.dots ? (accepted[i] ? 'var(--coral)' : 'var(--coral-deep)') : (accepted[i] ? 'rgba(246,243,236,0.2)' : 'var(--hairline)') }} />)}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: accepted[i] ? 'rgba(246,243,236,0.5)' : 'var(--muted)' }}>{r.strength}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: accepted[i] ? 'rgba(246,243,236,0.45)' : 'var(--muted)', marginTop: 6 }}>Tracks: {r.measure}</p>
          </div>
          {/* Check / plus */}
          <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, border: `1.5px solid ${accepted[i] ? 'var(--sage)' : 'var(--hairline)'}`, background: accepted[i] ? 'var(--sage)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {accepted[i] ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M2 6H10" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" /></svg>
            )}
          </div>
        </button>
      ))}

      {/* Save CTA */}
      {!saved ? (
        <div style={{ marginTop: 14, padding: '16px 18px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.5)', marginBottom: 4 }}>
              {count >= 2 ? `${count} of 3 reasons kept` : 'Keep at least 2 reasons'}
            </p>
            <p style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em' }}>
              {count >= 2 ? 'Track this. We\'ll check it every morning.' : 'Toggle at least 2 reasons to continue.'}
            </p>
          </div>
          <button onClick={() => count >= 2 && setSaved(true)} style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: count >= 2 ? 'var(--coral)' : 'rgba(246,243,236,0.1)', border: 'none', cursor: count >= 2 ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 14, padding: '16px 18px', background: 'var(--sage-tint)', border: '1px solid rgba(91,122,85,0.3)', borderRadius: 16 }}>
          <p style={{ color: 'var(--sage)', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>✓ Thesis saved. {count} reasons tracked.</p>
          <p style={{ fontSize: 13, color: 'var(--sage)', opacity: 0.8 }}>Tomorrow at 7am — we check if these still hold.</p>
        </div>
      )}
    </div>
  )
}

// ─── News event ───────────────────────────────────────────────────────────────

function NewsEvent() {
  return (
    <div style={{ background: 'var(--cream-deep)', border: '1px solid var(--hairline)', borderRadius: 14, padding: '16px 18px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
        Monday, June 16, 2026 · 5:30am IST · Caught by our scanner
      </p>
      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 10, letterSpacing: '-0.015em' }}>
        RBI quarterly data: HDFC Bank Net NPA rose to 0.42% in Q1 FY27, up from 0.31% last quarter. Agri loan stress in Maharashtra and Punjab districts cited. Urban portfolio stable.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--amber)', background: 'var(--amber-tint)', padding: '2px 8px', borderRadius: 5 }}>Connects to reason #1</span>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Best-in-class loan quality</span>
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {['RBI.org.in', 'Economic Times', 'Moneycontrol'].map(src => (
          <span key={src} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>· {src}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Digest card ──────────────────────────────────────────────────────────────

function DigestCard() {
  const [feedback, setFeedback] = useState<string | null>(null)

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 16, padding: '18px 20px' }}>
      {/* Weight + ticker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, background: 'var(--amber-tint)', color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />Worth knowing
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, background: 'var(--amber-tint)', border: '1px solid rgba(184,136,40,0.2)' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.05em' }}>HDFCBANK</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5H8M6 3L8 5L6 7" stroke="var(--amber)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>

      {/* Headline */}
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 12px', color: 'var(--ink)' }}>
        HDFC Bank&apos;s bad loans ticked up - agri stress, not a structural crack.
      </h3>

      {/* Shop voice */}
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: 16 }}>
        Of every ₹100 HDFC lent out, <Tip term="42 paise" explain="0.42% expressed in rupee terms. Of every ₹100 lent, 42 paise went bad. Sector average is around ₹1.50 — so HDFC is still well below peers." /> went bad this quarter - up from 31 paise last quarter. The cause is farm loans in Maharashtra and Punjab, not the urban branch network you see on your street. One quarter does not move the needle on a bank built over 30 years. Worth watching the next two quarters to see if it is seasonal or something more.
      </p>

      {/* Thesis connection */}
      <div style={{ background: 'var(--cream)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '14px 16px', marginBottom: 12 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>How this hits your HDFCBANK thesis</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--ink)', marginBottom: 10 }}>
          &ldquo;Best-in-class loan quality - NPA consistently lower than every peer.&rdquo;
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--amber)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>~</span>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--amber)', fontWeight: 600 }}>Wobbling</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>· Net NPA 0.42%</span>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.4, marginTop: 8 }}>Still well below sector average of ~0.9%. The reason is wobbling, not broken.</p>
      </div>

      {/* Price vs story */}
      <div style={{ background: 'var(--cream)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          Price vs. story · HDFCBANK since last quarter
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ paddingRight: 14, borderRight: '1px solid var(--hairline)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', marginBottom: 4 }}>THE STORY</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, color: 'var(--amber)', letterSpacing: '-0.02em' }}>Wobbling</p>
          </div>
          <div style={{ paddingLeft: 14 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', marginBottom: 4 }}>THE PRICE</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, color: 'var(--rust)', letterSpacing: '-0.02em' }}>↓ 2.1%</p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.4, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--hairline)' }}>
          Market noticed before you did. Price catching up to the story - not ahead of it.
        </p>
      </div>

      {/* Sources */}
      <div style={{ background: 'var(--cream-deep)', borderRadius: 10, padding: '10px 12px', marginBottom: 14 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>What we read to write this</p>
        {['RBI · Quarterly NPA data Q1 FY27', 'HDFC Bank investor relations · Q1 commentary', 'Moneycontrol · HDFC asset quality analysis'].map((s, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', marginBottom: 3 }}>· {s}</p>
        ))}
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, lineHeight: 1.4 }}>We scan 2,400+ sources daily. You see only what touches your portfolio.</p>
      </div>

      {/* Feedback */}
      <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>How did this land for you?</p>
        {feedback ? (
          <p style={{ fontSize: 13, color: 'var(--sage)', fontFamily: 'var(--font-mono)' }}>✓ Saved · teaches your filter</p>
        ) : (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { v: 'useful', l: 'Useful' },
              { v: 'knew', l: 'Already knew' },
              { v: 'noise', l: 'Noise' },
            ].map(o => (
              <button key={o.v} onClick={() => setFeedback(o.v)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 20, border: '1px solid var(--hairline)', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--muted)', cursor: 'pointer' }}>
                {o.l}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Marination card ──────────────────────────────────────────────────────────

function MarinationCard() {
  return (
    <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '18px 20px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(246,243,236,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>The phrase of the day</p>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--cream)', marginBottom: 10 }}>
        Net NPA - the number that tells you how careful a bank really is.
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(246,243,236,0.75)', lineHeight: 1.55, marginBottom: 10 }}>
        Every bank lends money. Some of it does not come back. <Tip term="Net NPA" explain="Non-Performing Assets — loans that have stopped being repaid. 'Net' means after the bank has set aside money to cover the loss. Lower is better." /> is how much, as a percentage. If Net NPA is 0.42%, it means 42 paise of every ₹100 lent is in trouble. The lower this number, the more careful the bank has been about who it lends to. HDFC Bank&apos;s 0.42% compares to a sector average of around 0.9%.
      </p>
      <p style={{ fontSize: 12, color: 'rgba(246,243,236,0.4)', fontStyle: 'italic', lineHeight: 1.4 }}>
        Knowing what this means is enough. You do not need to do anything with it.
      </p>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SamplePage() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100dvh' }}>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', background: 'rgba(246,243,236,0.9)', borderBottom: '1px solid var(--hairline-soft)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>FT</div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)' }}>Fundamentally True</span>
        </Link>
        <Link href="/#waitlist" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, background: 'var(--coral)', color: '#fff', padding: '8px 16px', borderRadius: 999, textDecoration: 'none' }}>
          Get early access →
        </Link>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '52px 20px 80px' }}>

        {/* Page header */}
        <div style={{ marginBottom: 52 }}>
          <Eyebrow label="A real morning. A real stock." />
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.04em', lineHeight: 1.0, color: 'var(--ink)', marginBottom: 16 }}>
            This is what your<br />
            <span style={{ color: 'var(--coral-deep)' }}>7am looks like.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.5, maxWidth: 520 }}>
            Follow one stock — HDFC Bank — from understanding the business, to building your thesis, to waking up and knowing exactly what changed overnight and whether your reason still holds.
          </p>
        </div>

        {/* ── Step 1: Shop Story ── */}
        <StepHeader n={1} eyebrow="Chapter 1 · The shop story" title="What HDFC Bank actually does" />
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.5 }}>
          We explain every business as if it were a shop you walk past every day. No jargon left unexplained.
        </p>
        <ShopStory />

        <Divider />

        {/* ── Step 2: Revenue ── */}
        <StepHeader n={2} eyebrow="Chapter 2 · Where the money comes from" title="How HDFC Bank makes money" />
        <RevenueStreams />

        <Divider />

        {/* ── Step 3: Thesis builder ── */}
        <StepHeader n={3} eyebrow="Chapter 3 · Your thesis" title="Pick the reasons you believe" />
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.5 }}>
          Try it — toggle off any reason you do not believe. Only the ones you keep get tracked. This is interactive.
        </p>
        <ThesisBuilder />

        <Divider />

        {/* ── Step 4: News event ── */}
        <StepHeader n={4} eyebrow="Something happens at 5:30am" title="A news event we caught" />
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
          We scan 2,400+ sources every morning before 6am. This is what we found — and connected to your thesis reason #1.
        </p>
        <NewsEvent />

        <Divider />

        {/* ── Step 5: Digest ── */}
        <StepHeader n={5} eyebrow="What lands on your phone at 7am" title="Your morning digest" active />
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
          The underlined words are tappable — they explain any jargon inline. The feedback chips at the bottom are real. Try tapping one.
        </p>
        <DigestCard />

        <Divider />

        {/* ── Step 6: Marination ── */}
        <StepHeader n={6} eyebrow="Two stories every morning" title="The wider world" />
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
          Every digest also includes two plain-English explainers — a finance term you will hear today and a company worth knowing about.
        </p>
        <MarinationCard />

        {/* ── CTA ── */}
        <div style={{ background: 'var(--ink)', borderRadius: 20, padding: '32px 28px', textAlign: 'center', marginTop: 52 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.5)', marginBottom: 14 }}>Every weekday · 7am IST · NSE India</p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 38px)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--cream)', marginBottom: 12 }}>
            This is what lands on your phone.<br />
            <span style={{ color: 'var(--coral)' }}>Every single morning.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(246,243,236,0.65)', maxWidth: 380, margin: '0 auto 24px', lineHeight: 1.5 }}>
            First cohort opens June 24th. Free during beta.
          </p>
          <Link href="/#waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 999, background: 'var(--coral)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em' }}>
            Get early access →
          </Link>
        </div>

      </div>
    </main>
  )
}
