'use client'

import Link from 'next/link'
import { useState } from 'react'

// ─── Design tokens (inline so this page is fully self-contained) ──────────────

const S = {
  wrap: { maxWidth: 640, margin: '0 auto', padding: '0 20px' },
  eyebrow: {
    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase' as const,
    color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8,
  },
  eyebrowLine: { display: 'inline-block', width: 18, height: 1, background: 'var(--coral)', flexShrink: 0 as const },
  sectionHead: {
    fontFamily: 'var(--font-sans)', fontWeight: 800,
    fontSize: 'clamp(28px, 4vw, 40px)',
    letterSpacing: '-0.035em', lineHeight: 1.05, color: 'var(--ink)',
  },
  card: {
    background: 'var(--card)', border: '1px solid var(--hairline)',
    borderRadius: 16, padding: '18px 20px',
  },
  mono: { fontFamily: 'var(--font-mono)' },
}

// ─── Thesis reason card ───────────────────────────────────────────────────────

function ThesisCard({
  n, claim, measure, strength, status,
}: {
  n: number
  claim: string
  measure: string
  strength: 'Load-bearing' | 'Matters' | 'Worth tracking'
  status: 'holding' | 'wobbling'
}) {
  const statusColor = status === 'holding' ? 'var(--sage)' : 'var(--amber)'
  const statusBg    = status === 'holding' ? 'var(--sage-tint)' : 'var(--amber-tint)'
  const dots        = strength === 'Load-bearing' ? 3 : strength === 'Matters' ? 2 : 1

  return (
    <div style={{ ...S.card, display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: 'var(--ink)', color: 'var(--cream)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
      }}>{n}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.015em', lineHeight: 1.3, margin: '0 0 8px', color: 'var(--ink)' }}>
          {claim}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= dots ? 'var(--coral-deep)' : 'var(--hairline)' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {strength}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
          Tracks: {measure}
        </p>
      </div>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '3px 10px', borderRadius: 20,
        background: statusBg, color: statusColor,
        fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor }} />
        {status}
      </span>
    </div>
  )
}

// ─── News event card ──────────────────────────────────────────────────────────

function NewsEvent() {
  return (
    <div style={{
      background: 'var(--cream-deep)', border: '1px solid var(--hairline)',
      borderRadius: 14, padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Monday, June 16, 2026 · 5:30am IST
        </span>
      </div>
      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 8, letterSpacing: '-0.015em' }}>
        RBI quarterly data: HDFC Bank Net NPA rose to 0.42% in Q1 FY27, up from 0.31% last quarter. Agri loan stress in Maharashtra and Punjab districts cited. Urban portfolio stable.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {['RBI.org.in', 'Economic Times', 'Moneycontrol'].map(src => (
          <span key={src} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>· {src}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Digest story card ────────────────────────────────────────────────────────

function DigestCard() {
  const [feedback, setFeedback] = useState<string | null>(null)

  return (
    <div style={{ ...S.card }}>
      {/* Weight + ticker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 10px', borderRadius: 20,
          background: 'var(--amber-tint)', color: 'var(--amber)',
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)' }} />
          Worth knowing
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 10px', borderRadius: 20,
          background: 'var(--amber-tint)', border: '1px solid rgba(184,136,40,0.2)',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--amber)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--amber)', letterSpacing: '0.05em' }}>
            HDFCBANK
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5H8M6 3L8 5L6 7" stroke="var(--amber)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Headline */}
      <h3 style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 20,
        letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 12px',
        color: 'var(--ink)',
      }}>
        HDFC Bank&apos;s bad loans ticked up - agri stress, not a structural crack.
      </h3>

      {/* Shop voice with jargon tooltips simulated */}
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.55, marginBottom: 16 }}>
        Of every ₹100 HDFC lent out, <Tooltip term="42 paise" explain="42 paise = 0.42% of every ₹100 lent went bad. Sector average is around ₹1.50." /> went bad this quarter - up from 31 paise last quarter. The cause is farm loans in Maharashtra and Punjab, not the urban branch network you see on your street. One quarter does not move the needle on a bank built over 30 years. Worth watching the next two quarters to see if it is seasonal or something more.
      </p>

      {/* Thesis connection */}
      <div style={{
        background: 'var(--cream)', border: '1px solid var(--hairline)',
        borderRadius: 12, padding: '14px 16px', marginBottom: 14,
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          How this hits your HDFCBANK thesis
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--ink)', marginBottom: 8 }}>
          &ldquo;Best-in-class loan quality - NPA consistently lower than every peer.&rdquo;
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'var(--amber)', color: 'var(--cream)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}>~</span>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--amber)', fontWeight: 600 }}>Wobbling</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>· Net NPA 0.42%</span>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.4, marginTop: 8 }}>
          Still below sector average of ~0.9%. The reason is wobbling, not broken.
        </p>
      </div>

      {/* Price vs story */}
      <div style={{
        background: 'var(--cream)', border: '1px solid var(--hairline)',
        borderRadius: 12, padding: '12px 14px', marginBottom: 14,
      }}>
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
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          What we read to write this
        </p>
        {['RBI · Quarterly NPA data Q1 FY27', 'HDFC Bank investor relations · Q1 commentary', 'Moneycontrol · HDFC asset quality analysis'].map((s, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-soft)', marginBottom: 3 }}>· {s}</p>
        ))}
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, lineHeight: 1.4 }}>
          We read 2,400+ sources daily. You see only what touches your portfolio.
        </p>
      </div>

      {/* Feedback */}
      <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          How did this land for you?
        </p>
        {feedback ? (
          <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            ✓ Saved · teaches your filter
          </p>
        ) : (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { value: 'useful', label: 'Useful', color: 'var(--sage)', bg: 'var(--sage-tint)' },
              { value: 'knew',   label: 'Already knew', color: 'var(--amber)', bg: 'var(--amber-tint)' },
              { value: 'noise',  label: 'Noise', color: 'var(--rust)', bg: 'var(--rust-tint)' },
            ].map(o => (
              <button key={o.value} onClick={() => setFeedback(o.value)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 20,
                border: '1px solid var(--hairline)', background: 'transparent',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
                color: 'var(--muted)', cursor: 'pointer',
              }}>
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Inline tooltip ───────────────────────────────────────────────────────────

function Tooltip({ term, explain }: { term: string; explain: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit',
        color: 'var(--coral-deep)', borderBottom: '1px dotted var(--coral)',
        display: 'inline',
      }}>
        {term}
      </button>
      {open && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
          transform: 'translateX(-50%)', zIndex: 100,
          background: 'var(--ink)', color: 'var(--cream)',
          borderRadius: 10, padding: '8px 12px', width: 220,
          fontSize: 12, lineHeight: 1.45, pointerEvents: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        }}>
          <span style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, background: 'var(--ink)', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', display: 'block' }} />
          {explain}
        </span>
      )}
    </span>
  )
}

// ─── Marination card ──────────────────────────────────────────────────────────

function MarinationCard() {
  return (
    <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '18px 20px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(246,243,236,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
        The phrase of the day
      </p>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--cream)', marginBottom: 10 }}>
        Net NPA - the number that tells you how careful a bank really is.
      </h3>
      <p style={{ fontSize: 14, color: 'rgba(246,243,236,0.75)', lineHeight: 1.55, marginBottom: 10 }}>
        Every bank lends money. Some of it does not come back. Net NPA (Non-Performing Assets) is how much, as a percentage. If Net NPA is 0.42%, it means 42 paise of every ₹100 lent is in trouble. The &ldquo;net&rdquo; part means they have already set aside some money to cover it. The lower this number, the more careful the bank has been about who it lends to.
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
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        background: 'rgba(246,243,236,0.9)', borderBottom: '1px solid var(--hairline-soft)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>FT</div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)' }}>Fundamentally True</span>
        </Link>
        <Link href="/#waitlist" style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
          background: 'var(--coral)', color: '#fff',
          padding: '8px 16px', borderRadius: 999, textDecoration: 'none',
        }}>
          Get early access →
        </Link>
      </nav>

      <div style={{ ...S.wrap, paddingTop: 52, paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ ...S.eyebrow, marginBottom: 14 }}>
            <span style={S.eyebrowLine} />
            A real morning. A real stock. A real digest.
          </div>
          <h1 style={{ ...S.sectionHead, marginBottom: 16 }}>
            This is what your<br />
            <span style={{ color: 'var(--coral-deep)' }}>7am looks like.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.5, letterSpacing: '-0.005em', maxWidth: 520 }}>
            One stock. Three thesis reasons. One news event. Here is the complete journey from &ldquo;I own HDFC Bank&rdquo; to understanding exactly what happened and whether your reason still holds.
          </p>
        </div>

        {/* ── Step 1: The stock ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>1</div>
            <div>
              <div style={{ ...S.eyebrow, margin: 0 }}>The stock you own</div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', color: 'var(--ink)', marginTop: 2 }}>HDFC Bank</h2>
            </div>
          </div>

          <div style={{ ...S.card, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--sage)', letterSpacing: '0.04em' }}>HDFCBANK</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>NSE</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>· Banking</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.008em', color: 'var(--ink-soft)' }}>
              HDFC Bank is the bank with the queue outside on salary day — and the NRI counter that is always suspiciously calm. They take deposits from people who trust them and lend it out. The spread between what they pay depositors and what they charge borrowers is their entire business.
            </p>
          </div>
        </div>

        {/* ── Step 2: Your thesis ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>2</div>
            <div>
              <div style={{ ...S.eyebrow, margin: 0 }}>Your thesis — why you own it</div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', color: 'var(--ink)', marginTop: 2 }}>3 reasons you chose to keep</h2>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
            We wrote 3 plain-English reasons why someone might own HDFC Bank. You read them and kept the ones you actually believe. These become your contract with yourself.
          </p>

          <ThesisCard
            n={1}
            claim="Best-in-class loan quality — their NPA is consistently lower than every peer"
            measure="Net NPA ratio vs sector average each quarter"
            strength="Load-bearing"
            status="wobbling"
          />
          <ThesisCard
            n={2}
            claim="Low-cost deposits — 42% of deposits from current and savings accounts, keeping their cost of funds low"
            measure="CASA ratio each quarter"
            strength="Load-bearing"
            status="holding"
          />
          <ThesisCard
            n={3}
            claim="8,000+ branches across India — physical reach no neo-bank can replicate in a decade"
            measure="Branch count growth + loan growth year on year"
            strength="Matters"
            status="holding"
          />
        </div>

        {/* ── Step 3: The news event ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>3</div>
            <div>
              <div style={{ ...S.eyebrow, margin: 0 }}>Something happens in the world</div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', color: 'var(--ink)', marginTop: 2 }}>A news event we caught at 5:30am</h2>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
            We scan 2,400+ sources every morning before 6am. This is what we found — and connected to your thesis reason #1.
          </p>
          <NewsEvent />
        </div>

        {/* ── Step 4: The digest ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--coral)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>4</div>
            <div>
              <div style={{ ...S.eyebrow, margin: 0 }}>What lands on your phone at 7am</div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', color: 'var(--ink)', marginTop: 2 }}>Your morning digest — tap the underlined words</h2>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
            The feedback chips at the bottom are real — they teach your filter what matters to you. Try tapping one.
          </p>
          <DigestCard />
        </div>

        {/* ── Step 5: The marination ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>5</div>
            <div>
              <div style={{ ...S.eyebrow, margin: 0 }}>The wider world</div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', color: 'var(--ink)', marginTop: 2 }}>Two stories to keep you informed</h2>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>
            Every digest also includes two plain-English explainers — a finance term you will hear today and a company worth knowing about. No jargon left unexplained.
          </p>
          <MarinationCard />
        </div>

        {/* ── CTA ── */}
        <div style={{
          background: 'var(--ink)', borderRadius: 20, padding: '32px 28px',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.5)', marginBottom: 14 }}>
            Every weekday · 7am IST · NSE India
          </p>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 38px)', letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--cream)', marginBottom: 12 }}>
            This is what lands on your phone.<br />
            <span style={{ color: 'var(--coral)' }}>Every single morning.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(246,243,236,0.65)', maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.5 }}>
            First cohort opens June 24th. Free during beta.
          </p>
          <Link href="/#waitlist" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 999,
            background: 'var(--coral)', color: '#fff',
            fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
            textDecoration: 'none', letterSpacing: '-0.01em',
          }}>
            Get early access →
          </Link>
        </div>

      </div>
    </main>
  )
}
