'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
    <main style={{ background: 'var(--cream)', minHeight: '100dvh' }}>

      {/* Nav */}
      <nav style={{
        maxWidth: 720, margin: '0 auto',
        padding: '22px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'var(--ink)', color: 'var(--cream)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800,
            letterSpacing: '-0.03em', flexShrink: 0,
          }}>FT</div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink)',
          }}>
            Fundamentally True
          </span>
        </div>
        <a href="/digest" style={{
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500,
          color: 'var(--muted)', textDecoration: 'none',
        }}>
          Sign in →
        </a>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '48px 28px 40px' }}>
        <p className="eyebrow" style={{ marginBottom: 22, color: 'var(--muted)' }}>
          The Morning Check · NSE India
        </p>

        <h1 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 800,
          fontSize: 'clamp(42px, 8vw, 64px)',
          lineHeight: 0.96, letterSpacing: '-0.045em',
          color: 'var(--ink)', marginBottom: 28,
        }}>
          We don&apos;t say{' '}
          <span style={{ color: 'var(--coral)' }}>buy.</span>
          <br />
          We don&apos;t say{' '}
          <span style={{ color: 'var(--coral)' }}>sell.</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700,
          fontSize: 'clamp(18px, 3vw, 24px)', lineHeight: 1.25,
          letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 20,
          maxWidth: 560,
        }}>
          We tell you whether the reasons you trusted are still true.
        </p>

        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 400,
          fontSize: 17, lineHeight: 1.5, letterSpacing: '-0.005em',
          color: 'var(--muted)', marginBottom: 40, maxWidth: 480,
        }}>
          Every morning at 7am IST — filtered to the specific reasons
          you chose to own each stock. Plain English. No jargon.
        </p>

        {/* Sign-up form */}
        {status === 'done' ? (
          <div style={{
            background: 'var(--sage-tint)', borderRadius: 16,
            padding: '20px 24px', maxWidth: 440,
            border: '1px solid rgba(91,122,85,0.25)',
          }}>
            <p style={{ color: 'var(--sage)', fontWeight: 600, fontSize: 15, lineHeight: 1.4 }}>
              Check your inbox — your magic link is on the way.
            </p>
            <p style={{ color: 'var(--sage)', fontSize: 13, marginTop: 6, opacity: 0.8 }}>
              {email}
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSignup} style={{ display: 'flex', gap: 10, maxWidth: 440 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1, padding: '15px 16px', borderRadius: 12,
                  border: '1.5px solid var(--hairline)',
                  background: 'var(--card)',
                  fontFamily: 'var(--font-sans)', fontSize: 15,
                  color: 'var(--ink)', outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                onBlur={e => e.target.style.borderColor = 'var(--hairline)'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '15px 24px', borderRadius: 12,
                  border: 'none', background: 'var(--coral)', color: '#fff',
                  fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700,
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  flexShrink: 0, letterSpacing: '-0.01em',
                  transition: 'opacity 0.15s',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? '...' : 'Get started'}
              </button>
            </form>
            {status === 'error' && (
              <p style={{ color: 'var(--rust)', fontSize: 13, marginTop: 10 }}>
                Something went wrong. Try again.
              </p>
            )}
            <p style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 12 }}>
              No credit card. Free during beta.
            </p>
          </>
        )}
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ height: 1, background: 'var(--hairline)' }} />
      </div>

      {/* How it works */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 28px' }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>How it works</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          {[
            {
              step: '01',
              title: 'Pick your stocks',
              body: '10 curated NSE companies — Reliance, HDFC Bank, TCS, Maruti and more.',
            },
            {
              step: '02',
              title: 'Accept your thesis',
              body: 'We write 3–5 plain-English reasons to own each. Keep the ones you believe.',
            },
            {
              step: '03',
              title: '7am every morning',
              body: 'We check if your reasons still hold. Only what touches the things you care about.',
            },
          ].map(({ step, title, body }) => (
            <div key={step} style={{
              background: 'var(--card)', borderRadius: 16, padding: '20px 20px',
              border: '1px solid var(--hairline-soft)',
            }}>
              <p className="eyebrow" style={{ marginBottom: 12, color: 'var(--coral-deep)' }}>{step}</p>
              <p style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.015em', marginBottom: 8, color: 'var(--ink)' }}>
                {title}
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof placeholder — swap for real numbers post-launch */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 28px 48px' }}>
        <div style={{
          background: 'var(--ink)', borderRadius: 18, padding: '28px 28px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700,
            letterSpacing: '-0.025em', lineHeight: 1.25, color: 'var(--cream)',
          }}>
            "I stopped checking Moneycontrol every 20 minutes.
            Now I check this at 7am and close the tab."
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(246,243,236,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Beta user · Bengaluru
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        maxWidth: 720, margin: '0 auto',
        padding: '24px 28px 40px',
        borderTop: '1px solid var(--hairline)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.06em' }}>
          © 2026 Fundamentally True
        </span>
        <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6, maxWidth: 480 }}>
          For informational and educational purposes only. Not investment advice. All decisions are yours.
        </p>
      </footer>

    </main>
  )
}
