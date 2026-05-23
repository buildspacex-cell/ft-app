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
      <nav style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>FUNDAMENTALLY TRUE</span>
        <a href="/auth/login" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>Sign in</a>
      </nav>
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px 40px' }}>
        <p className="eyebrow" style={{ marginBottom: 20 }}>The Morning Check · NSE India</p>
        <h1 className="hero-headline" style={{ marginBottom: 32 }}>
          We don&apos;t say <span style={{ color: 'var(--coral)' }}>buy.</span><br />
          We don&apos;t say <span style={{ color: 'var(--coral)' }}>sell.</span>
        </h1>
        <p style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, marginBottom: 32, letterSpacing: '-0.02em' }}>
          We tell you whether the reasons you trusted are still true.
        </p>
        <p className="lede" style={{ color: 'var(--muted)', marginBottom: 48, maxWidth: 500 }}>
          Every morning at 7am IST, your phone gets a plain-English summary — filtered to the specific reasons you chose to own each stock.
        </p>
        {status === 'done' ? (
          <div style={{ background: 'var(--sage-tint)', borderRadius: 14, padding: '20px 24px' }}>
            <p style={{ color: 'var(--sage)', fontWeight: 600, fontSize: 15 }}>Check your inbox — your magic link is on the way.</p>
          </div>
        ) : (
          <form onSubmit={handleSignup} style={{ display: 'flex', gap: 10, maxWidth: 420 }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
              style={{ flex: 1, padding: '14px 16px', borderRadius: 12, border: '1px solid var(--hairline)', background: 'var(--card)', fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--ink)', outline: 'none' }} />
            <button type="submit" disabled={status === 'loading'}
              style={{ padding: '14px 22px', borderRadius: 12, border: 'none', background: 'var(--coral)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              {status === 'loading' ? '...' : 'Get started'}
            </button>
          </form>
        )}
        {status === 'error' && <p style={{ color: 'var(--rust)', fontSize: 13, marginTop: 10 }}>Something went wrong. Try again.</p>}
        <p style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 14 }}>No credit card. Free during beta.</p>
      </section>
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { step: '01', title: 'Pick your stocks', body: '10 curated NSE companies — Reliance, HDFC Bank, TCS, Maruti and more.' },
            { step: '02', title: 'Accept your thesis', body: 'We write 3–5 plain-English reasons to own each. Keep the ones you believe.' },
            { step: '03', title: '7am every morning', body: 'We check if your reasons still hold. Only what touches the things you care about.' },
          ].map(({ step, title, body }) => (
            <div key={step} style={{ background: 'var(--card)', borderRadius: 16, padding: 20 }}>
              <p className="eyebrow" style={{ marginBottom: 10 }}>{step}</p>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <footer style={{ padding: '40px 24px', borderTop: '1px solid var(--hairline)', maxWidth: 680, margin: '0 auto' }}>
        <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6 }}>
          Fundamentally True is for informational and educational purposes only. We do not provide investment advice. All decisions are yours.
        </p>
      </footer>
    </main>
  )
}
