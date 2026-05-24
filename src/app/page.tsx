'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

// ─── Phone mockup ─────────────────────────────────────────────────────────────

function PhoneMockup({ screen = 'digest' }: { screen?: 'digest' | 'detail' }) {
  return (
    <div style={{
      width: 313, height: 681, borderRadius: 48, overflow: 'hidden',
      position: 'relative',
      background: 'var(--paper)',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.1)',
    }}>
      {/* Dynamic island */}
      <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 98, height: 29, borderRadius: 18, background: '#000', zIndex: 20 }} />

      {/* Status bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px 0', paddingTop: 18, position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 18, height: 18, borderRadius: 5, background: 'var(--ink)', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 7, fontWeight: 800 }}>FT</div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--muted)', letterSpacing: '0.06em' }}>·9:41 MORNING</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="14" height="10" viewBox="0 0 16 11"><rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="var(--ink)"/><rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="var(--ink)"/><rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" fill="var(--ink)"/><rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="var(--ink)"/></svg>
          <svg width="22" height="11" viewBox="0 0 24 12"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="var(--ink)" strokeOpacity="0.4"/><rect x="2" y="2" width="16" height="8" rx="1.5" fill="var(--ink)"/><path d="M22 4v4" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>

      {screen === 'digest' ? <DigestScreen /> : <DetailScreen />}
    </div>
  )
}

function DigestScreen() {
  return (
    <div style={{ padding: '10px 14px 20px', overflowY: 'hidden', height: 'calc(100% - 48px)' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>TUESDAY, JUNE 3, 2026</p>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 5 }}>
        Good morning.<br/><span style={{ color: 'var(--coral)' }}>Three for your portfolio.</span><br/>Two for your education.
      </h2>
      <p style={{ fontSize: 9.5, color: 'var(--muted)', marginBottom: 11, lineHeight: 1.4 }}>Quick read. No panic. Nothing in here tells you what to do.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>FOR YOUR PORTFOLIO</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)' }}>3 stories</span>
      </div>
      <div style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '10px 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--rust-tint)', color: 'var(--rust)', fontFamily: 'var(--font-mono)', fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 20 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--rust)' }}/>WORTH YOUR ATTENTION
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--muted)' }}>↗ Open</span>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing: '-0.018em', lineHeight: 1.2, color: 'var(--ink)', marginBottom: 5 }}>Brazil's coffee belt got hit by a second frost.</p>
        <p style={{ fontSize: 9, color: 'var(--ink-soft)', lineHeight: 1.4, marginBottom: 8 }}>Bean futures jumped another 8% overnight. This is the same problem your Brewline thesis already flagged last quarter — and it's getting worse, not better.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--muted)', letterSpacing: '0.08em' }}>AFFECTS</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--rust-tint)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, color: 'var(--rust)' }}>BRWL <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--rust)' }}/></span>
        </div>
        <div style={{ background: 'var(--cream)', borderRadius: 8, padding: '7px 8px', border: '1px solid var(--hairline)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>PRICE VS. STORY · BRWL SINCE YOUR LAST QUARTERLY CHECK</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 6 }}>
            <div style={{ paddingRight: 8, borderRight: '1px solid var(--hairline)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', marginBottom: 2, letterSpacing: '0.06em' }}>THE STORY</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, color: 'var(--amber)', letterSpacing: '-0.015em' }}>Wobbling</p>
            </div>
            <div style={{ paddingLeft: 8 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', marginBottom: 2, letterSpacing: '0.06em' }}>THE PRICE</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, color: 'var(--rust)', letterSpacing: '-0.015em' }}>↓ 2.4%</p>
            </div>
          </div>
          <p style={{ fontSize: 8.5, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.35 }}>Market started to notice what your thesis already knew.</p>
        </div>
        <div style={{ display: 'flex', gap: 5, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--hairline)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.06em', alignSelf: 'center' }}>HOW DID THIS LAND?</span>
          {['Useful','Noise','Knew'].map(l => <span key={l} style={{ fontSize: 7.5, fontFamily: 'var(--font-sans)', fontWeight: 500, padding: '3px 7px', borderRadius: 20, border: '1px solid var(--hairline)', color: 'var(--muted)' }}>{l}</span>)}
        </div>
      </div>
    </div>
  )
}

function DetailScreen() {
  return (
    <div style={{ padding: '8px 14px 20px', overflowY: 'hidden', height: 'calc(100% - 48px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 999, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>← Digest</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--muted)' }}>BRWL thesis ↗</span>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--rust-tint)', color: 'var(--rust)', fontFamily: 'var(--font-mono)', fontSize: 7, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 20, marginBottom: 8 }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--rust)' }}/>WORTH YOUR ATTENTION
      </span>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: 10 }}>Brazil's coffee belt got hit by a second frost.</h2>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--rust-tint)', padding: '3px 8px 3px 6px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, color: 'var(--rust)' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--rust)' }}/>BRWL · broken-already
        </span>
      </div>
      <p style={{ fontSize: 10.5, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 12 }}>Bean futures jumped another 8% overnight. This is the same problem your Brewline thesis already flagged last quarter — and it's getting worse, not better. Worth watching what management says on the next call.</p>
      <div style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 11, padding: '10px 10px', marginBottom: 10 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>HOW THIS HITS YOUR BREWLINE THESIS</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--ink)', marginBottom: 8 }}>"Coffee bean costs stay under 22% of revenue."</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--rust)', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>✕</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink)' }}>Already broken · 24.5%</span>
        </div>
        <p style={{ fontSize: 9, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.4 }}>This frost makes that reason less likely to recover soon.</p>
      </div>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 10, padding: '9px 10px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 7 }}>WHAT WE READ TO WRITE THIS</p>
        {['Reuters · Brazil frost damages 2026 arabica harvest', 'ICE Futures · arabica May contract +8.2%', 'Bloomberg · roasters warn of price hikes'].map((s, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--ink-soft)', marginBottom: 3, letterSpacing: '-0.005em' }}>· {s}</p>
        ))}
      </div>
    </div>
  )
}

// ─── Email form ───────────────────────────────────────────────────────────────

function EmailForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
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

  if (status === 'done') return (
    <div style={{ background: dark ? 'rgba(91,122,85,0.2)' : 'var(--sage-tint)', borderRadius: 999, padding: '14px 22px', maxWidth: 480, display: 'inline-block' }}>
      <p style={{ color: dark ? '#7fb87a' : 'var(--sage)', fontWeight: 600, fontSize: 15 }}>✓ You&apos;re on the list — check your inbox.</p>
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', background: dark ? 'rgba(246,243,236,0.08)' : 'var(--card)',
        padding: '6px 6px 6px 18px', borderRadius: 999,
        border: dark ? '1px solid rgba(246,243,236,0.16)' : '1px solid var(--hairline)',
        maxWidth: 480, alignItems: 'center',
      }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" required
          style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 15, color: dark ? 'var(--cream)' : 'var(--ink)', outline: 'none', letterSpacing: '-0.005em' }}
        />
        <button type="submit" disabled={status === 'loading'} style={{
          background: dark ? 'var(--coral)' : 'var(--ink)', color: 'var(--cream)',
          border: 'none', padding: '12px 22px', borderRadius: 999,
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
          letterSpacing: '-0.005em', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          {status === 'loading' ? '...' : <>Get early access <span>→</span></>}
        </button>
      </form>
      {status === 'error' && <p style={{ color: 'var(--rust)', fontSize: 13, marginTop: 8 }}>Something went wrong. Try again.</p>}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: dark ? 'rgba(246,243,236,0.45)' : 'var(--muted)' }}>
        <div style={{ display: 'flex' }}>
          {['#d97757','#5b7a55','#b88828','#1a1a1a','#6b6358'].map((c,i) => (
            <span key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: `2px solid ${dark ? 'var(--ink)' : 'var(--cream)'}`, marginLeft: i === 0 ? 0 : -8, display: 'inline-block' }} />
          ))}
        </div>
        <span>Private beta opening soon · join the first cohort</span>
      </div>
    </div>
  )
}

// ─── Landing page ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: 'var(--cream)', fontFamily: 'var(--font-sans)', color: 'var(--ink)', fontSize: 17, lineHeight: 1.5, letterSpacing: '-0.005em', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px) saturate(170%)', WebkitBackdropFilter: 'blur(14px) saturate(170%)', background: 'rgba(246,243,236,0.82)', borderBottom: '1px solid var(--hairline-soft)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 36 }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', textDecoration: 'none', color: 'var(--ink)' }}>
            <span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--ink)', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>FT</span>
            Fundamentally True
          </a>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {[['#moments','The journey'],['#how','How it works'],['#voice','The voice'],['#morning','The Morning Check'],['#never','Our promises']].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '-0.005em' }}>{label}</a>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <a href="#waitlist" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '-0.005em', background: 'var(--ink)', color: 'var(--cream)', border: 'none', padding: '10px 16px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Get early access <span style={{ fontSize: 14 }}>→</span>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: '60px 0 110px', position: 'relative' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, margin: '0 0 18px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />
              For people who don&apos;t speak finance
            </div>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(48px, 6.5vw, 84px)', lineHeight: 0.93, letterSpacing: '-0.052em', margin: '18px 0 28px', color: 'var(--ink)' }}>
              We don&apos;t say buy.<br />
              We don&apos;t say sell.<br />
              <span style={{ color: 'var(--coral-deep)' }}>We tell you whether the reasons you trusted are still true.</span>
            </h1>
            <p style={{ fontSize: 21, fontWeight: 400, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--ink-soft)', margin: '0 0 36px', maxWidth: 520 }}>
              Every morning, get a 60-second read on the companies you own: what changed, why it matters, and whether your original reason for owning them still holds.
            </p>
            <div id="waitlist"><EmailForm /></div>
          </div>
          <div style={{ justifySelf: 'center' }}>
            <PhoneMockup screen="digest" />
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', padding: '110px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />Why we exist
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.02, margin: '14px auto 22px', maxWidth: 900, color: 'var(--ink)' }}>
            Every other stock app tells you what to <i>buy</i>.<br />
            <span style={{ color: 'var(--coral-deep)' }}>We tell you what you bought.</span>
          </h2>
          <p style={{ maxWidth: 540, margin: '0 auto', fontSize: 18, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
            Most retail investors can name the ticker but can&apos;t explain the business. Whether you already own it or you&apos;re trying to decide, you deserve to actually understand what&apos;s in front of you.
          </p>
        </div>
      </section>

      {/* ── FIVE MOMENTS ── */}
      <section id="moments" style={{ padding: '130px 0', borderTop: '1px solid var(--hairline)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />Built for the whole journey
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 60px)', letterSpacing: '-0.045em', lineHeight: 0.96, margin: '0 0 18px', maxWidth: 820 }}>
            Five moments of holding a stock.<br />
            <span style={{ color: 'var(--coral-deep)' }}>We&apos;re built for every one of them.</span>
          </h2>
          <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: 640, margin: '0 0 70px', lineHeight: 1.45 }}>
            Whether you&apos;ve already bought, you&apos;re thinking about it, or you&apos;ve held for years — here&apos;s how we help at each moment.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {[
              { n: '01', when: 'Before you buy', q: '"What does this company actually do?"', a: 'The shop story. Plain English, no jargon.', current: false },
              { n: '02', when: 'After you buy', q: '"Why exactly did I buy this?"', a: '3–5 reasons we write. You keep what fits.', current: false },
              { n: '03', when: 'While you hold', q: '"Is my reason still true?"', a: 'The Morning Check, every weekday at 7am.', current: true },
              { n: '04', when: 'When news breaks', q: '"Does this affect me?"', a: 'News filtered against your thesis, not the market\'s.', current: false },
              { n: '05', when: 'During earnings', q: '"What just changed?"', a: 'A 60-second check on each reason, one by one.', current: false },
            ].map(m => (
              <div key={m.n} style={{ padding: '26px 18px 24px', background: 'var(--card)', border: `1px solid ${m.current ? 'var(--coral)' : 'var(--hairline)'}`, borderRadius: 18, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.current ? 'var(--coral)' : 'var(--ink)', boxShadow: m.current ? '0 0 0 4px var(--coral-tint)' : 'none', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, margin: '0 auto 14px' }}>{m.n}</div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, textAlign: 'center', marginBottom: 12 }}>{m.when}</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', lineHeight: 1.22, margin: '0 0 16px', color: 'var(--ink)', textAlign: 'center' }}>{m.q}</p>
                <p style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--hairline-soft)', fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.45, color: 'var(--coral-deep)', fontWeight: 500, letterSpacing: '-0.005em', textAlign: 'center' }}>{m.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ background: 'var(--cream)', padding: '100px 0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />How it works
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 20px', maxWidth: 720 }}>Three things we do.<br />Nothing else.</h2>
          <p style={{ fontSize: 19, color: 'var(--muted)', maxWidth: 580, margin: '0 0 60px', lineHeight: 1.5 }}>No charts to read. No trading you can do here. No &quot;AI stock picks.&quot; Just three things, well.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
            {[
              { n: '01', h: 'Explain the business like a shop on the street.', p: 'What they sell, who buys it, how much they keep. The numbers always come paired with an English sentence — never on their own.', badge: 'No jargon, ever' },
              { n: '02', h: 'Write the 3–5 reasons you might want to own it.', p: 'You read them, decide which ones you actually believe, keep those. The reasons you keep become your thesis — a contract with yourself, in words you understand.', badge: 'You curate · we draft' },
              { n: '03', h: 'Check whether those reasons still hold.', p: 'Every quarter when results come out. Every morning when news affects them. One by one. We never tell you what to do — only whether what you bought into is still true.', badge: 'You decide · we notice' },
            ].map(s => (
              <div key={s.n} style={{ position: 'relative', padding: '32px 28px 36px', borderRadius: 22, background: 'var(--card)', border: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', minHeight: 320 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--coral-deep)', lineHeight: 1, marginBottom: 18 }}>{s.n}</div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 12px' }}>{s.h}</h3>
                <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>{s.p}</p>
                <p style={{ marginTop: 'auto', paddingTop: 18, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral-deep)' }}>{s.badge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOICE GALLERY ── */}
      <section id="voice" style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.55)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />The voice
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.98, color: 'var(--cream)', margin: '0 0 18px', maxWidth: 760 }}>
            Every number gets a sentence<br /><span style={{ color: 'var(--coral)' }}>that means something.</span>
          </h2>
          <p style={{ fontSize: 19, color: 'rgba(246,243,236,0.72)', maxWidth: 580, margin: '0 0 60px', lineHeight: 1.5 }}>Pure metrics are just trivia. The product is the translation — the moment a number becomes a thing you actually understand.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { from: 'Net margin', metric: '18%', to: '18¢ from every $1 of coffee they sell is theirs to keep.' },
              { from: 'Net debt / EBITDA', metric: '1.8×', to: 'They owe less than two years of earnings — comfortable cushion.' },
              { from: 'Same-store sales', metric: '+4%', to: 'People paid more without grumbling. The brand still has pull.' },
              { from: 'Net interest margin', metric: '3.8%', to: '₹3.80 of every ₹100 they lend stays with them — that\'s how a bank breathes.' },
              { from: 'Bean cost % of revenue', metric: '24.5%', to: 'Frost in Brazil hit their suppliers. Worth knowing — not forever.' },
              { from: 'Volume growth', metric: '+7%', to: '7% more packets of biscuits walked out the door this year than last.' },
              { from: 'Dividend yield', metric: '1.8%', to: 'For every $100 of stock, $1.80 lands in your account each year.' },
            ].map((t, i) => (
              <div key={i} style={{ background: 'rgba(246,243,236,0.04)', border: '1px solid rgba(246,243,236,0.08)', borderRadius: 18, padding: '24px 24px 22px', position: 'relative' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'rgba(246,243,236,0.55)', fontWeight: 600, marginBottom: 4 }}>{t.from}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--cream)', marginBottom: 18 }}>{t.metric}</p>
                <div style={{ width: 36, height: 1, background: 'var(--coral)', marginBottom: 18, position: 'relative' }}>
                  <span style={{ position: 'absolute', right: -4, top: -3, width: 7, height: 7, borderRight: '1px solid var(--coral)', borderTop: '1px solid var(--coral)', transform: 'rotate(45deg)', display: 'block' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 19, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--coral)' }}>{t.to}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE SPOTLIGHT ── */}
      <section id="morning" style={{ padding: '130px 0', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />The launch feature
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 4.5vw, 54px)', letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 22px' }}>
              A 7am push.<br />A 60-second read.<br /><span style={{ color: 'var(--coral-deep)' }}>Then it leaves you alone.</span>
            </h2>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)', margin: '0 0 32px', lineHeight: 1.5, maxWidth: 520 }}>Every morning, we scan news, filings, and trusted sources — then send only what matters to what you own.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: 'Connected to your thesis', text: 'When Brazil\'s coffee belt frosts, we don\'t tell you about coffee — we tell you which reason in your thesis just got worse.' },
                { label: 'Price vs. story', text: 'When the market moves but your thesis hasn\'t, we notice — and explain in one sentence what the disconnect means.' },
                { label: '"How did this land?"', text: 'One tap per card teaches the system what you find useful. Friday\'s digest shows what changed because of you.' },
                { label: 'Quiet days are a feature', text: 'When nothing affects your portfolio, we tell you so. We never invent urgency.' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--coral-tint)', color: 'var(--coral-deep)', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 700, fontSize: 14 }}>✓</div>
                  <div style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.45, letterSpacing: '-0.005em' }}>
                    <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{item.label}</strong> — {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ justifySelf: 'center' }}>
            <PhoneMockup screen="detail" />
          </div>
        </div>
      </section>

      {/* ── THREE PROMISES ── */}
      <section id="never" style={{ background: 'var(--paper)', padding: '130px 0', borderTop: '1px solid var(--hairline)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />Three things we&apos;ll never do
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 60px)', letterSpacing: '-0.045em', lineHeight: 0.96, margin: '0 0 20px', maxWidth: 820 }}>
            Three promises that <span style={{ color: 'var(--coral-deep)' }}>define this product.</span>
          </h2>
          <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: 620, margin: '0 0 64px', lineHeight: 1.45 }}>These three rules are enforced in code, not just in spirit.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
            {[
              { tag: 'Promise 01', h: 'We never tell you what to buy.', p: 'No price targets. No "strong buy" calls. No predictions. We describe whether the reasons you bought a company still hold — and the decision is always yours.' },
              { tag: 'Promise 02', h: 'We never hide the source.', p: 'Every story shows you exactly what we read to write it — the filing, the earnings call, the article. If we can\'t cite a source, we don\'t write the story.' },
              { tag: 'Promise 03', h: 'We never manufacture urgency.', p: 'Most financial media is built to make you panic. We do the opposite. Urgency is reserved for moments a reason in your thesis actually breaks — and that\'s rare.' },
            ].map(n => (
              <div key={n.tag} style={{ position: 'relative', padding: '36px 30px 34px', background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 22, display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rust-tint)', color: 'var(--rust)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 700, marginBottom: 24 }}>×</div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--coral-deep)', fontWeight: 700, marginBottom: 8 }}>{n.tag}</p>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 14px' }}>{n.h}</h3>
                <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.5, letterSpacing: '-0.005em', margin: 0 }}>{n.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAT BAND ── */}
      <section style={{ background: 'var(--coral-tint)', padding: '100px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 14, display: 'block' }}>Built right</div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 4.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1, margin: '14px 0 60px', color: 'var(--ink)' }}>Designed for people, not portfolios.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, maxWidth: 980, margin: '0 auto' }}>
            {[
              { n: '100%', l: 'Of sources cited', s: 'Every story shows where it came from.' },
              { n: '0', l: 'Times we say "buy" or "sell"', s: 'The decision stays yours.' },
              { n: '60s', l: 'To read your daily check', s: 'Faster than your coffee.' },
            ].map(s => (
              <div key={s.n}>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(64px, 7vw, 96px)', lineHeight: 0.9, letterSpacing: '-0.05em', color: 'var(--coral-deep)' }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 17, letterSpacing: '-0.015em', color: 'var(--ink)', marginTop: 12 }}>{s.l}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.4 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR / NOT FOR ── */}
      <section style={{ padding: '120px 0', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />Is this for you?
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 4.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 60px', maxWidth: 760 }}>Honest about who we&apos;re built for.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {[
              { yes: true, h: 'Built for you if', items: ['You own a few stocks and don\'t fully understand what they do.','You bought based on a headline and want a better reason.','You hold for years, not days.','You want to be informed, not entertained.','You\'d rather understand one company well than guess at ten.'] },
              { yes: false, h: 'Not for you if', items: ['You day-trade and want chart patterns.','You want someone to tell you what to buy.','You\'re hunting for the next 10×.','You like financial jargon and want more of it.','You think feelings have no place in investing.'] },
            ].map(col => (
              <div key={col.h} style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 22, padding: '32px 32px' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: col.yes ? 'var(--sage)' : 'var(--rust)', display: 'grid', placeItems: 'center', color: 'var(--cream)', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{col.yes ? '✓' : '✕'}</span>
                  {col.h}
                </h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {col.items.map((item, i) => (
                    <li key={i} style={{ padding: '14px 0', borderTop: '1px solid var(--hairline-soft)', fontSize: 16, lineHeight: 1.45, letterSpacing: '-0.005em', color: 'var(--ink-soft)', display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ color: col.yes ? 'var(--coral)' : 'var(--muted-2)', fontWeight: 700, fontSize: 22, lineHeight: 1, flexShrink: 0 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '120px 0', background: 'var(--paper)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />Common questions
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5vw, 56px)', letterSpacing: '-0.04em', margin: '0 0 50px' }}>Things worth asking.</h2>
          <div style={{ maxWidth: 820 }}>
            {[
              { q: 'Is this investment advice?', a: 'No. We never say buy or sell. We explain businesses, help you write down why you\'d own them, and tell you whether those reasons still hold. Every action is yours.' },
              { q: 'Who writes the stories and theses?', a: 'A two-stage AI pipeline grounded in real filings and news sources, refined with a hand-written voice. Every story shows its sources. You can flag anything that doesn\'t sound right.' },
              { q: 'What markets do you cover?', a: 'At launch, a hand-picked set of stocks listed on the NSE and BSE — across FMCG, banks, IT services, pharma, energy, and auto. We expand based on what the waitlist tells us they own.' },
              { q: 'Will you sell my data?', a: 'No. Your feedback trains your filter, never anyone else\'s. We charge users for a paid tier eventually — that\'s it.' },
              { q: 'Is there a mobile app?', a: 'At launch, we ship as a web app that installs to your home screen — push notifications and all. Native iOS and Android come once we know exactly what to build.' },
              { q: 'Free or paid?', a: 'Free at launch. The daily check stays free forever. A future paid tier will add unlimited theses and a Sunday "deep dive" — nothing that hurts the core habit.' },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '26px 0', borderTop: '1px solid var(--hairline)', ...(i === 5 ? { borderBottom: '1px solid var(--hairline)' } : {}) }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 21, letterSpacing: '-0.025em', margin: '0 0 10px' }}>{faq.q}</h3>
                <p style={{ fontSize: 16.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0, maxWidth: 720 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '140px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.5)', fontWeight: 600, marginBottom: 18, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />Get early access
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '-0.05em', lineHeight: 0.95, margin: '0 0 28px', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', color: 'var(--cream)' }}>
            Stop guessing<br />at what you <span style={{ color: 'var(--coral)' }}>own.</span>
          </h2>
          <p style={{ fontSize: 19, color: 'rgba(246,243,236,0.72)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.4 }}>Join the private beta. We&apos;ll email you when the first cohort opens.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EmailForm dark />
          </div>
          <div style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'rgba(246,243,236,0.45)' }}>
            No spam. No &quot;growth hacks.&quot; One email when we launch.
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--cream)', padding: '56px 0 80px', borderTop: '1px solid var(--hairline)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 56 }}>
          <div>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', textDecoration: 'none', color: 'var(--ink)', marginBottom: 16 }}>
              <span style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--ink)', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>FT</span>
              Fundamentally True
            </a>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 380, letterSpacing: 0 }}>
              For informational and educational purposes only. We do not provide investment advice, recommendations, or solicitations. All investment decisions are yours.
            </p>
          </div>
          {[
            { h: 'Product', links: [['#how','How it works'],['#morning','The Morning Check'],['#voice','The voice'],['#faq','FAQ']] },
            { h: 'Company', links: [['#','About'],['#','Manifesto'],['#','Careers'],['#','Contact']] },
            { h: 'Follow', links: [['#','Twitter / X'],['#','Instagram'],['#','LinkedIn'],['#','Substack']] },
          ].map(col => (
            <div key={col.h}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 14px', fontWeight: 600 }}>{col.h}</h4>
              {col.links.map(([href, label]) => (
                <a key={label} href={href} style={{ display: 'block', fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none', padding: '4px 0' }}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 28px 0', borderTop: '1px solid var(--hairline)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.04em' }}>
          <span>© 2026 Fundamentally True · Built for clarity.</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>

    </div>
  )
}
