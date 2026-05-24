'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

// ─── Phone mockup showing the live digest screen ──────────────────────────────

function PhoneMockup() {
  return (
    <div style={{
      width: 320, flexShrink: 0,
      background: 'var(--paper)',
      borderRadius: 40,
      boxShadow: '0 40px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Dynamic island */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 32, borderRadius: 20,
        background: '#000', zIndex: 20,
      }} />

      {/* Status bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 22px 0', paddingTop: 20,
        position: 'relative', zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: 'var(--ink)', color: 'var(--cream)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 800,
          }}>FT</div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em' }}>·9:41</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>MORNING</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {/* Signal bars */}
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="var(--ink)"/>
            <rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="var(--ink)"/>
            <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" fill="var(--ink)"/>
            <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="var(--ink)"/>
          </svg>
          {/* Battery */}
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="var(--ink)" strokeOpacity="0.4"/>
            <rect x="2" y="2" width="16" height="8" rx="1.5" fill="var(--ink)"/>
            <path d="M22 4v4" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Digest content */}
      <div style={{ padding: '12px 16px 24px' }}>

        {/* Date */}
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          TUESDAY, JUNE 3, 2026
        </p>

        {/* Greeting */}
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700,
          fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.025em',
          color: 'var(--ink)', marginBottom: 6,
        }}>
          Good morning.<br />
          <span style={{ color: 'var(--coral)' }}>Three for your portfolio.</span><br />
          Two for your education.
        </h2>

        <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.4 }}>
          Quick read. No panic. Nothing in here tells you what to do.
        </p>

        {/* Section label */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>FOR YOUR PORTFOLIO</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--muted)', letterSpacing: '0.06em' }}>3 stories</span>
        </div>

        {/* Story card */}
        <div style={{
          background: 'var(--card)', border: '1px solid var(--hairline)',
          borderRadius: 14, padding: '12px 12px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'var(--rust-tint)', color: 'var(--rust)',
              fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '3px 7px', borderRadius: 20,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--rust)', flexShrink: 0 }} />
              WORTH YOUR ATTENTION
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--muted)' }}>↗ Open</span>
          </div>

          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 14, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--ink)', marginBottom: 6 }}>
            Brazil's coffee belt got hit by a second frost.
          </p>

          <p style={{ fontSize: 10.5, color: 'var(--ink-soft)', lineHeight: 1.45, marginBottom: 10 }}>
            Bean futures jumped another 8% overnight. This is the same problem your Brewline thesis already flagged last quarter — and it's getting worse, not better. Worth watching what management says on the next call.
          </p>

          {/* Affects row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--muted)', letterSpacing: '0.08em' }}>AFFECTS</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'var(--rust-tint)', padding: '2px 7px', borderRadius: 5,
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: 'var(--rust)',
            }}>
              BRWL
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--rust)' }} />
            </span>
          </div>

          {/* Price vs story */}
          <div style={{
            background: 'var(--cream)', borderRadius: 10,
            padding: '8px 10px', border: '1px solid var(--hairline)',
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>
              PRICE VS. STORY · BRWL SINCE YOUR LAST QUARTERLY CHECK
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 7 }}>
              <div style={{ paddingRight: 10, borderRight: '1px solid var(--hairline)' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)', marginBottom: 3, letterSpacing: '0.06em' }}>THE STORY</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, color: 'var(--amber)', letterSpacing: '-0.015em' }}>Wobbling</p>
              </div>
              <div style={{ paddingLeft: 10 }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)', marginBottom: 3, letterSpacing: '0.06em' }}>THE PRICE</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13, color: 'var(--rust)', letterSpacing: '-0.015em' }}>↓ 2.4%</p>
              </div>
            </div>
            <p style={{ fontSize: 10, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.35 }}>
              Market started to notice what your thesis already knew. Price catching up to the story.
            </p>
          </div>

          {/* Feedback chips */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--hairline)' }}>
            {['HOW DID THIS LAND?', 'Useful', 'Noise', 'Knew'].map((label, i) => (
              i === 0 ? (
                <span key={label} style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)', letterSpacing: '0.06em', alignSelf: 'center' }}>{label}</span>
              ) : (
                <span key={label} style={{
                  fontSize: 9, fontFamily: 'var(--font-sans)', fontWeight: 500,
                  padding: '4px 8px', borderRadius: 20,
                  border: '1px solid var(--hairline)', color: 'var(--muted)',
                }}>
                  {label}
                </span>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main landing page ────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/onboarding` },
    })
    setStatus(error ? 'error' : 'done')
  }

  return (
    <main style={{ background: 'var(--cream)', minHeight: '100dvh', overflowX: 'hidden' }}>

      {/* ── Nav ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 40px',
        borderBottom: '1px solid var(--hairline)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'var(--ink)', color: 'var(--cream)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, letterSpacing: '-0.02em',
          }}>FT</div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)',
          }}>Fundamentally True</span>
        </div>

        {/* Sign in */}
        <a href="/digest" style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
          color: 'var(--ink)', textDecoration: 'none',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Sign in →
        </a>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '60px 40px 0',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 60,
        alignItems: 'flex-start',
      }}>
        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 28, height: 2, background: 'var(--coral)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)',
            }}>
              For people who don&apos;t speak finance
            </span>
          </div>

          {/* Giant headline */}
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 800,
            fontSize: 'clamp(56px, 8vw, 96px)',
            lineHeight: 0.96, letterSpacing: '-0.04em',
            color: 'var(--ink)', marginBottom: 0,
          }}>
            We don&apos;t<br />
            say buy.<br />
            We don&apos;t say<br />
            sell.<br />
            <span style={{ color: 'var(--coral)' }}>
              We tell you<br />
              whether the<br />
              reasons you<br />
              trusted are still
            </span>
          </h1>

          {/* Scroll hint — this hero scrolls */}
          <div style={{ height: 32 }} />
        </div>

        {/* Right: phone mockup */}
        <div style={{ position: 'sticky', top: 40, paddingTop: 8 }}>
          <PhoneMockup />
        </div>
      </section>

      {/* ── "true." continuation line ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px 60px' }}>
        <h1 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 800,
          fontSize: 'clamp(56px, 8vw, 96px)',
          lineHeight: 0.96, letterSpacing: '-0.04em',
          color: 'var(--coral)', marginBottom: 48,
        }}>
          true.
        </h1>

        {/* Signup form */}
        {status === 'done' ? (
          <div style={{
            background: 'var(--sage-tint)', borderRadius: 16,
            padding: '20px 24px', maxWidth: 520,
            border: '1px solid rgba(91,122,85,0.25)',
          }}>
            <p style={{ color: 'var(--sage)', fontWeight: 600, fontSize: 16 }}>
              Check your inbox — your magic link is on the way.
            </p>
            <p style={{ color: 'var(--sage)', fontSize: 13, marginTop: 4, opacity: 0.8 }}>{email}</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSignup} style={{ display: 'flex', gap: 12, maxWidth: 520 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1, padding: '16px 20px',
                  borderRadius: 14, border: '1.5px solid var(--hairline)',
                  background: 'var(--card)', fontFamily: 'var(--font-sans)',
                  fontSize: 16, color: 'var(--ink)', outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                onBlur={e => e.target.style.borderColor = 'var(--hairline)'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '16px 28px', borderRadius: 14,
                  border: 'none', background: 'var(--coral)', color: '#fff',
                  fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
                  cursor: 'pointer', flexShrink: 0, letterSpacing: '-0.01em',
                  display: 'flex', alignItems: 'center', gap: 8,
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? '...' : <>Get early access <span style={{ fontSize: 18 }}>→</span></>}
              </button>
            </form>
            {status === 'error' && <p style={{ color: 'var(--rust)', fontSize: 13, marginTop: 10 }}>Something went wrong. Try again.</p>}
            <p style={{ fontSize: 13, color: 'var(--muted-2)', marginTop: 12 }}>No credit card. Free during beta.</p>
          </>
        )}
      </section>

      {/* ── Divider ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ height: 1, background: 'var(--hairline)' }} />
      </div>

      {/* ── How it works ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 40px' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)',
          marginBottom: 32,
        }}>
          How it works
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { step: '01', title: 'Pick your stocks', body: '10 curated NSE companies — Reliance, HDFC Bank, TCS, Maruti and more.' },
            { step: '02', title: 'Accept your thesis', body: 'We write 3–5 plain-English reasons to own each. Keep the ones you believe.' },
            { step: '03', title: '7am every morning', body: 'We check if your reasons still hold. Only what touches the things you care about.' },
          ].map(({ step, title, body }) => (
            <div key={step} style={{
              background: 'var(--card)', borderRadius: 18, padding: '24px 22px',
              border: '1px solid var(--hairline-soft)',
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--coral)', letterSpacing: '0.08em', marginBottom: 14 }}>
                {step}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 10, lineHeight: 1.2 }}>
                {title}
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.55 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid var(--hairline)',
        maxWidth: 1200, margin: '0 auto',
        padding: '24px 40px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.06em' }}>
          © 2026 Fundamentally True
        </span>
        <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6, maxWidth: 520 }}>
          For informational and educational purposes only. Not investment advice. All decisions are yours.
        </p>
      </footer>

    </main>
  )
}
