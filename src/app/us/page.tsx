'use client'
import { useState } from 'react'

// ─── US Phone mockup - NYSE/NASDAQ stocks ─────────────────────────────────────

function PhoneMockup({ screen = 'digest' }: { screen?: 'digest' | 'detail' }) {
  return (
    <div style={{
      width: 280, height: 580, borderRadius: 42, overflow: 'hidden',
      position: 'relative', background: 'var(--paper)',
      boxShadow: '0 32px 64px rgba(0,0,0,0.16), 0 0 0 1.5px rgba(0,0,0,0.1)',
      flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 42, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)', zIndex: 30, pointerEvents: 'none' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 20px 0', position: 'relative', zIndex: 10 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>9:41</span>
        <div style={{ width: 100, height: 30, borderRadius: 20, background: '#000', margin: '0 auto' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
          <svg width="15" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="var(--ink)"/><rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="var(--ink)"/><rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" fill="var(--ink)"/><rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="var(--ink)"/></svg>
          <svg width="14" height="11" viewBox="0 0 20 15" fill="none"><path d="M10 13h.01M6.5 10.5c.95-.95 2.24-1.5 3.5-1.5s2.55.55 3.5 1.5M3 7.5C4.9 5.6 7.35 4.5 10 4.5s5.1 1.1 7 3M0 4.5C2.85 1.65 6.75 0 10 0s7.15 1.65 10 4.5" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <svg width="22" height="11" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="var(--ink)" strokeOpacity="0.35"/><rect x="2" y="2" width="15" height="8" rx="1.5" fill="var(--ink)"/><path d="M22 4v4" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px 0' }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 800, flexShrink: 0 }}>FT</div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>· MORNING CHECK · 7AM</span>
      </div>
      {screen === 'digest' ? <USDigestScreen /> : <USDetailScreen />}
    </div>
  )
}

function USDigestScreen() {
  return (
    <div style={{ padding: '8px 16px 20px', overflow: 'hidden', height: 'calc(100% - 78px)' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>TUESDAY, JUNE 3, 2026</p>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 17, lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 5 }}>
        Good morning.<br /><span style={{ color: 'var(--coral)' }}>Two for your portfolio.</span><br />Two for your education.
      </h2>
      <p style={{ fontSize: 9.5, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.4 }}>Quick read. No panic. Nothing in here tells you what to do.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>FOR YOUR PORTFOLIO</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--muted)' }}>2 stories</span>
      </div>
      <div style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--amber-tint)', color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: 6.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 20 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />WORTH KNOWING
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: 'var(--muted)' }}>↗ Open</span>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing: '-0.018em', lineHeight: 1.2, color: 'var(--ink)', marginBottom: 5 }}>The Fed held rates - but the tone shifted. Two of your stocks noticed.</p>
        <p style={{ fontSize: 9, color: 'var(--ink-soft)', lineHeight: 1.4, marginBottom: 8 }}>Powell said "patient" three more times than last meeting. That word is doing a lot of work - banks earn more when rates stay high, and your JPM thesis depends on exactly that.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.08em' }}>AFFECTS</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--sage-tint)', padding: '1px 7px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, color: 'var(--sage)' }}>
            JPM <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
          </span>
        </div>
        <div style={{ background: 'var(--cream)', borderRadius: 8, padding: '7px 8px', border: '1px solid var(--hairline)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>PRICE VS. STORY · JPM</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 5 }}>
            <div style={{ paddingRight: 8, borderRight: '1px solid var(--hairline)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--muted)', marginBottom: 2 }}>THE STORY</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, color: 'var(--sage)', letterSpacing: '-0.015em' }}>Holding</p>
            </div>
            <div style={{ paddingLeft: 8 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--muted)', marginBottom: 2 }}>THE PRICE</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, color: 'var(--sage)', letterSpacing: '-0.015em' }}>↑ 1.4%</p>
            </div>
          </div>
          <p style={{ fontSize: 8, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.35 }}>Story and price agree. The reason you own JPM is intact.</p>
        </div>
        <div style={{ display: 'flex', gap: 5, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--hairline)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--muted)', letterSpacing: '0.06em', alignSelf: 'center' }}>HOW DID THIS LAND?</span>
          {['Useful', 'Noise', 'Knew'].map(l => (
            <span key={l} style={{ fontSize: 7.5, fontFamily: 'var(--font-sans)', fontWeight: 500, padding: '3px 7px', borderRadius: 20, border: '1px solid var(--hairline)', color: 'var(--muted)' }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function USDetailScreen() {
  return (
    <div style={{ padding: '8px 16px 20px', overflow: 'hidden', height: 'calc(100% - 78px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 999, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>← Digest</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)' }}>AAPL thesis ↗</span>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--sage-tint)', color: 'var(--sage)', fontFamily: 'var(--font-mono)', fontSize: 6.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 20, marginBottom: 8 }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />GOOD SIGN
      </span>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--ink)', margin: '8px 0 8px' }}>Apple&apos;s services revenue hit a new record - the shift away from hardware is working.</h2>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--sage-tint)', padding: '3px 8px 3px 6px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: 7.5, fontWeight: 700, color: 'var(--sage)' }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />AAPL · holding
        </span>
      </div>
      <p style={{ fontSize: 10, color: 'var(--ink-soft)', lineHeight: 1.45, marginBottom: 10 }}>Services - App Store, iCloud, Apple Pay - grew 14% this quarter. That&apos;s the reason you own Apple: recurring revenue that doesn&apos;t depend on someone buying a new phone.</p>
      <div style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 11, padding: '10px', marginBottom: 8 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>HOW THIS HITS YOUR AAPL THESIS</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--ink)', marginBottom: 7 }}>&ldquo;Services becoming the growth engine - less dependent on iPhone cycles.&rdquo;</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--sage)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>✓</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--ink)' }}>Holding · Services +14% YoY</span>
        </div>
        <p style={{ fontSize: 8.5, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.35 }}>The reason you own Apple got stronger this quarter.</p>
      </div>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 10, padding: '9px 10px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>WHAT WE READ</p>
        {['Apple Q2 FY26 earnings · investor relations', 'WSJ · Apple services growth analysis', 'Bloomberg · App Store revenue record'].map((s, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--ink-soft)', marginBottom: 2 }}>· {s}</p>
        ))}
      </div>
    </div>
  )
}

// ─── Country switcher ─────────────────────────────────────────────────────────

function CountrySwitcher({ active }: { active: 'in' | 'us' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--hairline-soft)', borderRadius: 999, padding: 3 }}>
      <a href="/" style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 999,
        background: active === 'in' ? 'var(--card)' : 'transparent',
        boxShadow: active === 'in' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: active === 'in' ? 600 : 500,
        color: active === 'in' ? 'var(--ink)' : 'var(--muted)',
        textDecoration: 'none', transition: 'all 0.15s',
      }}>
        🇮🇳 India
      </a>
      <a href="/us" style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 999,
        background: active === 'us' ? 'var(--card)' : 'transparent',
        boxShadow: active === 'us' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: active === 'us' ? 600 : 500,
        color: active === 'us' ? 'var(--ink)' : 'var(--muted)',
        textDecoration: 'none', transition: 'all 0.15s',
      }}>
        🇺🇸 US
      </a>
    </div>
  )
}


// ─── Wish question — shown after stock pick ───────────────────────────────────

function WishQuestion({ dark = false }: { dark?: boolean }) {
  const [wish, setWish] = useState('')
  const [saved, setSaved] = useState(false)

  function saveWish() {
    if (!wish.trim() || saved) return
    setSaved(true)
    // will POST once env vars set
  }

  const label = dark ? 'rgba(246,243,236,0.7)' : 'var(--muted)'
  const strong = dark ? 'var(--cream)' : 'var(--ink)'

  if (saved) return (
    <p style={{ fontSize: 14, color: label, lineHeight: 1.5 }}>
      Thank you. That is exactly the kind of thing we are building for.
    </p>
  )

  return (
    <div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? 'rgba(246,243,236,0.45)' : 'var(--muted)', marginBottom: 10 }}>
        One more
      </p>
      <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: strong, marginBottom: 6, lineHeight: 1.4 }}>
        What is one thing you wish you understood better about a stock you own?
      </p>
      <p style={{ fontSize: 12.5, color: label, marginBottom: 12, lineHeight: 1.45 }}>
        Not features — just tell us where you feel lost. &ldquo;I never know if bad news actually matters.&rdquo; &ldquo;I bought it but I can&apos;t explain why.&rdquo; Anything like that.
      </p>
      <textarea
        value={wish}
        onChange={e => setWish(e.target.value)}
        placeholder="e.g. I never know if a news story is actually relevant to what I own..."
        rows={3}
        style={{
          width: '100%', padding: '10px 12px', borderRadius: 10,
          border: dark ? '1px solid rgba(246,243,236,0.16)' : '1px solid var(--hairline)',
          background: dark ? 'rgba(246,243,236,0.06)' : 'var(--paper)',
          fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.5,
          color: dark ? 'var(--cream)' : 'var(--ink)',
          outline: 'none', resize: 'none', marginBottom: 10,
          boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'center' }}>
        <button
          onClick={() => setSaved(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: label, padding: 0 }}
        >
          Skip
        </button>
        <button
          onClick={saveWish}
          disabled={!wish.trim()}
          style={{
            padding: '9px 18px', borderRadius: 10, border: 'none',
            background: wish.trim() ? 'var(--coral)' : (dark ? 'rgba(246,243,236,0.1)' : 'var(--hairline)'),
            color: wish.trim() ? '#fff' : label,
            fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600,
            cursor: wish.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

// ─── Email form ───────────────────────────────────────────────────────────────

function EmailForm({ dark = false, source = 'landing-us' }: { dark?: boolean; source?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // TODO: re-enable once env vars are set in Vercel
    // fetch('/api/waitlist', { method: 'POST', ... })
    setStatus('done')
  }

  const [stock, setStock] = useState('')
  const [stockSaved, setStockSaved] = useState(false)

  async function saveStock() {
    if (!stock || stockSaved) return
    setStockSaved(true)
    // will POST to API once env vars set
  }

  if (status === 'done') return (
    <div style={{
      background: dark ? 'rgba(246,243,236,0.06)' : 'var(--card)',
      border: dark ? '1px solid rgba(246,243,236,0.14)' : '1px solid var(--hairline)',
      borderRadius: 18, padding: '20px 22px', maxWidth: 480,
    }}>
      {/* Confirm + date */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 18, paddingBottom: 18, borderBottom: dark ? '1px solid rgba(246,243,236,0.1)' : '1px solid var(--hairline)' }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', flexShrink: 0, background: 'var(--sage)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>✓</div>
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.015em', color: dark ? 'var(--cream)' : 'var(--ink)', marginBottom: 5 }}>
            You&apos;re on the list.
          </p>
          <p style={{ fontSize: 13.5, lineHeight: 1.5, color: dark ? 'rgba(246,243,236,0.65)' : 'var(--muted)', margin: 0 }}>
            The first cohort opens <strong style={{ color: 'var(--coral)', fontWeight: 600 }}>June 6th</strong>. We&apos;ll email you that morning with your magic link.
          </p>
        </div>
      </div>

      {/* One question */}
      {!stockSaved ? (
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: dark ? 'rgba(246,243,236,0.45)' : 'var(--muted)', marginBottom: 10 }}>
            One quick question
          </p>
          <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: dark ? 'var(--cream)' : 'var(--ink)', marginBottom: 12, lineHeight: 1.4 }}>
            Which stock do you most want us to cover first?
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <select
              value={stock} onChange={e => setStock(e.target.value)}
              style={{
                flex: 1, padding: '10px 12px', borderRadius: 10,
                border: dark ? '1px solid rgba(246,243,236,0.16)' : '1px solid var(--hairline)',
                background: dark ? 'rgba(246,243,236,0.08)' : 'var(--paper)',
                fontFamily: 'var(--font-sans)', fontSize: 14,
                color: dark ? 'var(--cream)' : 'var(--ink)',
                outline: 'none', cursor: 'pointer',
              }}
            >
              
              <option value="">Pick a stock...</option>
              <optgroup label="NYSE / NASDAQ">
                <option value="AAPL">Apple</option>
                <option value="MSFT">Microsoft</option>
                <option value="GOOGL">Alphabet (Google)</option>
                <option value="AMZN">Amazon</option>
                <option value="NVDA">Nvidia</option>
                <option value="JPM">JPMorgan Chase</option>
                <option value="TSLA">Tesla</option>
                <option value="META">Meta</option>
              </optgroup>
              <option value="OTHER">Something else</option>
            </select>
            <button
              onClick={saveStock} disabled={!stock}
              style={{
                padding: '10px 16px', borderRadius: 10, border: 'none',
                background: stock ? 'var(--coral)' : (dark ? 'rgba(246,243,236,0.1)' : 'var(--hairline)'),
                color: stock ? '#fff' : (dark ? 'rgba(246,243,236,0.3)' : 'var(--muted)'),
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                cursor: stock ? 'pointer' : 'not-allowed', flexShrink: 0,
              }}
            >
              Tell us
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <p style={{ fontSize: 14, color: dark ? 'rgba(246,243,236,0.7)' : 'var(--muted)', margin: 0, lineHeight: 1.4 }}>
            Got it. We&apos;ll make sure <strong style={{ color: dark ? 'var(--cream)' : 'var(--ink)', fontWeight: 600 }}>{stock}</strong> is ready on day one.
          </p>
        </div>
      )}
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexWrap: 'wrap', gap: 8,
        background: dark ? 'rgba(246,243,236,0.08)' : 'var(--card)',
        padding: '6px 6px 6px 18px', borderRadius: 999,
        border: dark ? '1px solid rgba(246,243,236,0.16)' : '1px solid var(--hairline)',
        maxWidth: 480,
      }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
          style={{ flex: '1 1 180px', border: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 15, color: dark ? 'var(--cream)' : 'var(--ink)', outline: 'none', letterSpacing: '-0.005em', minWidth: 0 }} />
        <button type="submit" disabled={status === 'loading'} style={{
          background: dark ? 'var(--coral)' : 'var(--ink)', color: 'var(--cream)',
          border: 'none', padding: '12px 20px', borderRadius: 999,
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
          letterSpacing: '-0.005em', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {status === 'loading' ? '...' : <>Get early access <span>→</span></>}
        </button>
      </form>
      {status === 'error' && <p style={{ color: 'var(--rust)', fontSize: 13, marginTop: 8, margin: '8px 0 0' }}>Something went wrong. Try again.</p>}
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: dark ? 'rgba(246,243,236,0.45)' : 'var(--muted)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex' }}>
          {['#d97757', '#5b7a55', '#b88828', '#1a1a1a', '#6b6358'].map((c, i) => (
            <span key={i} style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: `2px solid ${dark ? 'var(--ink)' : 'var(--cream)'}`, marginLeft: i === 0 ? 0 : -8, display: 'inline-block', flexShrink: 0 }} />
          ))}
        </div>
        <span>Private beta opening soon · join the first cohort</span>
      </div>
    </div>
  )
}

function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: dark ? 'rgba(246,243,236,0.55)' : 'var(--muted)', fontWeight: 600, margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)', flexShrink: 0 }} />
      {label}
    </div>
  )
}

// ─── US Landing page ──────────────────────────────────────────────────────────

export default function USPage() {
  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .ft-landing { background: var(--cream); font-family: var(--font-sans); color: var(--ink); overflow-x: hidden; }
        .ft-nav-links { display: flex; }
        .ft-hero-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 40px; align-items: flex-start; }
        .ft-hero-phone { justify-self: center; }
        .ft-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .ft-moments { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .ft-translations { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ft-feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .ft-never-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .ft-stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; max-width: 980px; margin: 0 auto; }
        .ft-fit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .ft-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 36px; margin-bottom: 56px; }
        .ft-section { padding: 100px 0; }
        .ft-wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }
        .ft-step { padding: 32px 28px 36px; border-radius: 22px; background: var(--card); border: 1px solid var(--hairline); display: flex; flex-direction: column; min-height: 280px; }
        .ft-moment { padding: 26px 18px 24px; background: var(--card); border: 1px solid var(--hairline); border-radius: 18px; display: flex; flex-direction: column; }
        .ft-moment.current { border-color: var(--coral); }
        .ft-translation { background: rgba(246,243,236,0.04); border: 1px solid rgba(246,243,236,0.08); border-radius: 18px; padding: 24px; }
        .ft-never-item { padding: 36px 30px 34px; background: var(--card); border: 1px solid var(--hairline); border-radius: 22px; display: flex; flex-direction: column; }
        .ft-fit-col { background: var(--card); border: 1px solid var(--hairline); border-radius: 22px; padding: 32px; }
        .ft-faq-item { padding: 26px 0; border-top: 1px solid var(--hairline); }
        .ft-nav-link { font-size: 14px; font-weight: 500; color: var(--muted); text-decoration: none; transition: color 0.15s; }
        .ft-nav-link:hover { color: var(--ink); }
        .ft-footer-link { display: block; font-size: 14px; color: var(--ink-soft); text-decoration: none; padding: 4px 0; }
        .ft-footer-link:hover { color: var(--coral-deep); }
        @media (max-width: 960px) {
          .ft-hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .ft-steps, .ft-never-grid { grid-template-columns: 1fr; gap: 16px; }
          .ft-moments { grid-template-columns: repeat(2, 1fr); }
          .ft-translations { grid-template-columns: 1fr 1fr; }
          .ft-feature-grid, .ft-fit-grid { grid-template-columns: 1fr; }
          .ft-stat-row { grid-template-columns: 1fr; gap: 36px; }
          .ft-footer-grid { grid-template-columns: 1fr 1fr; }
          .ft-section { padding: 64px 0; }
          .ft-wrap { padding: 0 20px; }
        }
        @media (max-width: 600px) {
          .ft-nav-links { display: none; }
          .ft-moments, .ft-translations, .ft-footer-grid { grid-template-columns: 1fr; }
          .ft-section { padding: 48px 0; }
          .ft-wrap { padding: 0 16px; }
        }
      `}</style>

      <div className="ft-landing">

        {/* ── NAV ── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px) saturate(170%)', WebkitBackdropFilter: 'blur(14px) saturate(170%)', background: 'rgba(246,243,236,0.82)', borderBottom: '1px solid var(--hairline-soft)' }}>
          <div className="ft-wrap" style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '14px 28px' }}>
            <a href="/us" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', textDecoration: 'none', color: 'var(--ink)', flexShrink: 0 }}>
              <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>FT</span>
              Fundamentally True
            </a>
            <div className="ft-nav-links" style={{ gap: 24, alignItems: 'center' }}>
              {[['#moments','The journey'],['#how','How it works'],['#voice','The voice'],['#morning','The Morning Check'],['#never','Our promises']].map(([href,label]) => (
                <a key={href} href={href} className="ft-nav-link">{label}</a>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <CountrySwitcher active="us" />
            <a href="#waitlist" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, background: 'var(--ink)', color: 'var(--cream)', padding: '10px 18px', borderRadius: 999, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, whiteSpace: 'nowrap' }}>
              Get early access <span>→</span>
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="ft-section" style={{ padding: '48px 0 72px' }}>
          <div className="ft-wrap">
            <div className="ft-hero-grid">
              <div>
                <Eyebrow label="For people who don't speak finance" />
                <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 0.93, letterSpacing: '-0.052em', margin: '14px 0 22px', color: 'var(--ink)' }}>
                  We don&apos;t say buy.<br />
                  We don&apos;t say sell.<br />
                  <span style={{ color: 'var(--coral-deep)', fontSize: 'clamp(26px, 3.4vw, 46px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.042em', display: 'block', marginTop: '0.2em' }}>
                    We tell you whether the reasons you trusted are still true - and help you find reasons worth trusting in the first place.
                  </span>
                </h1>
                <p style={{ fontSize: 18, fontWeight: 400, lineHeight: 1.4, letterSpacing: '-0.01em', color: 'var(--ink-soft)', margin: '0 0 28px', maxWidth: 520 }}>
                  Anything that happens in the world - Fed rate decisions, earnings misses, supply chain shocks - we connect it to the stocks in your portfolio and explain what it means for the specific reason you own them.
                </p>
                <div id="waitlist"><EmailForm source="landing-us-hero" /></div>
              </div>
              <div className="ft-hero-phone" style={{ paddingTop: 8 }}>
                <PhoneMockup screen="digest" />
              </div>
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE ── */}
        <section className="ft-section" style={{ background: 'var(--paper)', borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
          <div className="ft-wrap" style={{ textAlign: 'center' }}>
            <Eyebrow label="Why we exist" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.04em', lineHeight: 1.02, margin: '14px auto 22px', maxWidth: 900, color: 'var(--ink)' }}>
              Every other app gives you a tip.<br />
              <span style={{ color: 'var(--coral-deep)' }}>We give you an understanding.</span>
            </h2>
            <p style={{ maxWidth: 540, margin: '0 auto', fontSize: 18, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
              Most investors can name the ticker but can&apos;t explain what they own. You deserve to understand exactly what your money is backing.
            </p>
          </div>
        </section>

        {/* ── FIVE MOMENTS ── */}
        <section id="moments" className="ft-section" style={{ borderTop: '1px solid var(--hairline)' }}>
          <div className="ft-wrap">
            <Eyebrow label="Built for the whole journey" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.045em', lineHeight: 0.96, margin: '0 0 18px', maxWidth: 820 }}>
              Five moments of owning a stock.<br />
              <span style={{ color: 'var(--coral-deep)' }}>We&apos;re built for every one of them.</span>
            </h2>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: 640, margin: '0 0 56px', lineHeight: 1.45 }}>Whether you&apos;re researching, just bought, or have held for years.</p>
            <div className="ft-moments">
              {[
                { n: '01', when: 'Before you own', q: '"What does this company actually do?"', a: 'The shop story. Plain English, no jargon.', current: false },
                { n: '02', when: 'After you buy', q: '"Why exactly did I own this?"', a: '3–5 reasons we write. You keep what fits.', current: false },
                { n: '03', when: 'While you hold', q: '"Is my reason still true?"', a: 'The Morning Check, every weekday at 7am ET.', current: true },
                { n: '04', when: 'When news breaks', q: '"Does this affect me?"', a: "News filtered against your thesis, not the market's.", current: false },
                { n: '05', when: 'During earnings', q: '"What just changed?"', a: 'A 60-second check on each reason, one by one.', current: false },
              ].map(m => (
                <div key={m.n} className={`ft-moment${m.current ? ' current' : ''}`}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.current ? 'var(--coral)' : 'var(--ink)', boxShadow: m.current ? '0 0 0 4px var(--coral-tint)' : 'none', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, margin: '0 auto 14px', flexShrink: 0 }}>{m.n}</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 600, textAlign: 'center', marginBottom: 12 }}>{m.when}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', lineHeight: 1.22, margin: '0 0 16px', color: 'var(--ink)', textAlign: 'center' }}>{m.q}</p>
                  <p style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--hairline-soft)', fontSize: 13, lineHeight: 1.45, color: 'var(--coral-deep)', fontWeight: 500, textAlign: 'center' }}>{m.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="ft-section">
          <div className="ft-wrap">
            <Eyebrow label="How it works" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 20px', maxWidth: 720 }}>Three things we do.<br />Nothing else.</h2>
            <p style={{ fontSize: 19, color: 'var(--muted)', maxWidth: 580, margin: '0 0 56px', lineHeight: 1.5 }}>No charts to read. No trading you can do here. No &ldquo;AI stock picks.&rdquo; Just three things, well.</p>
            <div className="ft-steps">
              {[
                { n: '01', h: 'Explain the business like a shop on your street.', p: 'What they sell, who buys it, how much they keep. Numbers always come paired with a plain sentence - never on their own.', badge: 'No jargon, ever' },
                { n: '02', h: 'Write the 3–5 reasons you might want to own it.', p: "You read them, decide which you actually believe, keep those. The reasons you keep become your thesis - a contract with yourself, in words you understand.", badge: 'You curate · we draft' },
                { n: '03', h: 'Check whether those reasons still hold.', p: "When the Fed moves, when earnings drop, when a supply chain story breaks - we check if any of it touches a reason in your thesis. Every morning. Not just on earnings day.", badge: 'You decide · we notice' },
              ].map(s => (
                <div key={s.n} className="ft-step">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--coral-deep)', lineHeight: 1, marginBottom: 18 }}>{s.n}</div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 12px' }}>{s.h}</h3>
                  <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>{s.p}</p>
                  <p style={{ marginTop: 'auto', paddingTop: 18, fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral-deep)' }}>{s.badge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VOICE GALLERY ── */}
        <section id="voice" className="ft-section" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
          <div className="ft-wrap">
            <Eyebrow label="The voice" dark />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.98, color: 'var(--cream)', margin: '0 0 18px', maxWidth: 760 }}>
              Every number gets a sentence<br /><span style={{ color: 'var(--coral)' }}>that means something.</span>
            </h2>
            <p style={{ fontSize: 19, color: 'rgba(246,243,236,0.72)', maxWidth: 580, margin: '0 0 56px', lineHeight: 1.5 }}>Pure metrics are just trivia. The product is the translation.</p>
            <div className="ft-translations">
              {[
                { from: 'Net interest margin · JPMorgan', metric: '2.7%', to: '27¢ of every $10 JPMorgan lends stays with them after paying depositors. That gap is how a bank makes money.' },
                { from: 'Net margin · Apple', metric: '26%', to: '26¢ from every dollar Apple takes in is theirs to keep. That\'s what a software-like margin looks like on a hardware company.' },
                { from: 'Same-store sales · Starbucks', metric: '+4%', to: 'People paid more for the same latte without grumbling. The brand still has enough pull to raise prices.' },
                { from: 'Services revenue · Apple', metric: '+14%', to: 'App Store, iCloud, Apple Pay - growing 14% while iPhone sales were flat. That\'s the reason people own Apple in 2026.' },
                { from: 'Operating leverage · Microsoft', metric: '43%', to: 'Revenue grew 17%. Profit grew 23%. The gap between those two numbers is why software businesses compound.' },
                { from: 'Free cash flow yield · Alphabet', metric: '5.2%', to: 'For every $100 of market value, Alphabet generates $5.20 in free cash each year. That\'s the real return on owning it.' },
                { from: 'Debt-to-equity · Tesla', metric: '0.08×', to: 'Tesla owes just 8 cents for every dollar of shareholder equity. A company this lightly leveraged can survive a rough year.' },
              ].map((t, i) => (
                <div key={i} className="ft-translation">
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'rgba(246,243,236,0.55)', fontWeight: 600, marginBottom: 4 }}>{t.from}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--cream)', marginBottom: 18 }}>{t.metric}</p>
                  <div style={{ width: 36, height: 1, background: 'var(--coral)', marginBottom: 18, position: 'relative' }}>
                    <span style={{ position: 'absolute', right: -4, top: -3, width: 7, height: 7, borderRight: '1px solid var(--coral)', borderTop: '1px solid var(--coral)', transform: 'rotate(45deg)', display: 'block' }} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 18, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--coral)', margin: 0 }}>{t.to}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURE SPOTLIGHT ── */}
        <section id="morning" className="ft-section" style={{ padding: '120px 0' }}>
          <div className="ft-wrap">
            <div className="ft-feature-grid">
              <div>
                <Eyebrow label="The launch feature" />
                <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 22px' }}>
                  A 7am push.<br />A 60-second read.<br /><span style={{ color: 'var(--coral-deep)' }}>Then it leaves you alone.</span>
                </h2>
                <p style={{ fontSize: 19, color: 'var(--ink-soft)', margin: '0 0 32px', lineHeight: 1.5, maxWidth: 520 }}>
                  The world doesn&apos;t stop moving just because you&apos;re not watching. Every morning we scan everything - Fed decisions, earnings, macro moves - and filter it down to what touches the specific reasons you chose to own each stock.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    { label: 'Connected to your thesis', text: "When the Fed holds rates and Powell sounds hawkish, we don't send you a rate story - we tell you which reason in your JPM or BofA thesis just got stronger." },
                    { label: 'Price vs. story', text: "When the market moves but your thesis hasn't changed, we notice - and explain the disconnect in one sentence." },
                    { label: '"How did this land?"', text: 'One tap per card teaches the system what you find useful. Friday\'s digest shows what changed because of you.' },
                    { label: 'Quiet days are a feature', text: 'When nothing affects your portfolio, we tell you so. We never invent urgency.' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--coral-tint)', color: 'var(--coral-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 14 }}>✓</div>
                      <div style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.45 }}>
                        <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{item.label}</strong> - {item.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ justifySelf: 'center', display: 'flex', justifyContent: 'center' }}>
                <PhoneMockup screen="detail" />
              </div>
            </div>
          </div>
        </section>

        {/* ── THREE PROMISES ── */}
        <section id="never" className="ft-section" style={{ background: 'var(--paper)', borderTop: '1px solid var(--hairline)' }}>
          <div className="ft-wrap">
            <Eyebrow label="Three things we'll never do" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.045em', lineHeight: 0.96, margin: '0 0 20px', maxWidth: 820 }}>
              Three promises that <span style={{ color: 'var(--coral-deep)' }}>define this product.</span>
            </h2>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)', maxWidth: 620, margin: '0 0 56px', lineHeight: 1.45 }}>These rules are enforced in code, not just in spirit.</p>
            <div className="ft-never-grid">
              {[
                { tag: 'Promise 01', h: 'We never tell you what to buy.', p: 'No price targets. No "strong buy" calls. No predictions. We describe whether the reasons you own a company still hold - the decision is always yours.' },
                { tag: 'Promise 02', h: 'We never hide the source.', p: "Every story shows exactly what we read to write it - the SEC filing, the earnings call, the article. If we can't cite a source, we don't write the story." },
                { tag: 'Promise 03', h: 'We never manufacture urgency.', p: 'Most financial media is built to make you panic. Urgency here is reserved for moments a reason in your thesis actually breaks - and that\'s rare.' },
              ].map(n => (
                <div key={n.tag} className="ft-never-item">
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--rust-tint)', color: 'var(--rust)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 700, marginBottom: 24, flexShrink: 0 }}>×</div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--coral-deep)', fontWeight: 700, marginBottom: 8 }}>{n.tag}</p>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 14px' }}>{n.h}</h3>
                  <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>{n.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STAT BAND ── */}
        <section className="ft-section" style={{ background: 'var(--coral-tint)', textAlign: 'center' }}>
          <div className="ft-wrap">
            <Eyebrow label="Built right" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: 1, margin: '14px 0 56px', color: 'var(--ink)' }}>Designed for owners, not traders.</h2>
            <div className="ft-stat-row">
              {[
                { n: '100%', l: 'Of sources cited', s: 'Every story shows where it came from.' },
                { n: '0', l: 'Times we say "buy" or "sell"', s: 'The decision stays yours.' },
                { n: '60s', l: 'To read your daily check', s: 'Faster than your coffee.' },
              ].map(s => (
                <div key={s.n}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.9, letterSpacing: '-0.05em', color: 'var(--coral-deep)' }}>{s.n}</div>
                  <div style={{ fontWeight: 600, fontSize: 17, letterSpacing: '-0.015em', color: 'var(--ink)', marginTop: 12 }}>{s.l}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.4 }}>{s.s}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOR / NOT FOR ── */}
        <section className="ft-section">
          <div className="ft-wrap">
            <Eyebrow label="Is this for you?" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 56px', maxWidth: 760 }}>Honest about who we&apos;re built for.</h2>
            <div className="ft-fit-grid">
              {[
                { yes: true, h: 'Built for you if', items: ["You own a few stocks and can't fully explain what they do.", "You bought based on a headline and want a better reason.", "You hold for years, not days.", "You want to be informed, not entertained.", "You'd rather understand one company well than guess at ten."] },
                { yes: false, h: 'Not for you if', items: ["You day-trade and want chart patterns.", "You want someone to tell you what to buy.", "You're hunting for the next 10×.", "You like financial jargon and want more of it.", "You think understanding a business is unnecessary."] },
              ].map(col => (
                <div key={col.h} className="ft-fit-col">
                  <h3 style={{ fontWeight: 700, fontSize: 22, letterSpacing: '-0.025em', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: col.yes ? 'var(--sage)' : 'var(--rust)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream)', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>{col.yes ? '✓' : '✕'}</span>
                    {col.h}
                  </h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {col.items.map((item, i) => (
                      <li key={i} style={{ padding: '14px 0', borderTop: '1px solid var(--hairline-soft)', fontSize: 16, lineHeight: 1.45, color: 'var(--ink-soft)', display: 'flex', gap: 10, alignItems: 'baseline' }}>
                        <span style={{ color: col.yes ? 'var(--coral)' : 'var(--muted-2)', fontWeight: 700, fontSize: 22, lineHeight: 1, flexShrink: 0 }}>·</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="ft-section" style={{ background: 'var(--paper)' }}>
          <div className="ft-wrap">
            <Eyebrow label="Common questions" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.04em', margin: '0 0 50px' }}>Things worth asking.</h2>
            <div style={{ maxWidth: 820 }}>
              {[
                { q: 'Is this investment advice?', a: 'No. We never say buy or sell. We explain businesses, help you write down why you\'d own them, and tell you whether those reasons still hold. Every action is yours.' },
                { q: 'Who writes the stories and theses?', a: 'A two-stage AI pipeline grounded in real SEC filings, earnings calls, and news sources - refined with a hand-written voice. Every story shows its sources.' },
                { q: 'What stocks do you cover at launch?', a: 'A hand-picked set of NYSE and NASDAQ stocks across consumer, tech, financials, healthcare, and industrials. We expand based on what the waitlist tells us they own.' },
                { q: 'Will you sell my data?', a: 'No. Your feedback trains your filter, never anyone else\'s. We charge users for a paid tier eventually - that\'s it.' },
                { q: 'Is there a mobile app?', a: 'At launch, we ship as a web app that installs to your home screen - push notifications and all. Native iOS and Android come next.' },
                { q: 'Free or paid?', a: 'Free at launch. The daily check stays free forever. A future paid tier adds unlimited theses and a Sunday deep dive.' },
              ].map((faq, i, arr) => (
                <div key={i} className="ft-faq-item" style={i === arr.length - 1 ? { borderBottom: '1px solid var(--hairline)' } : {}}>
                  <h3 style={{ fontWeight: 700, fontSize: 21, letterSpacing: '-0.025em', margin: '0 0 10px' }}>{faq.q}</h3>
                  <p style={{ fontSize: 16.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0, maxWidth: 720 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="ft-section" style={{ background: 'var(--ink)', color: 'var(--cream)', textAlign: 'center' }}>
          <div className="ft-wrap">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.5)', fontWeight: 600, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)' }} />Get early access
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(44px, 6vw, 80px)', letterSpacing: '-0.05em', lineHeight: 0.95, margin: '0 0 28px', color: 'var(--cream)' }}>
              Stop guessing<br />at what you <span style={{ color: 'var(--coral)' }}>own.</span>
            </h2>
            <p style={{ fontSize: 19, color: 'rgba(246,243,236,0.72)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.4 }}>
              Join the private beta. We&apos;ll email you when the first cohort opens.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}><EmailForm dark source="landing-us-cta" /></div>
            <p style={{ marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'rgba(246,243,236,0.45)' }}>
              No spam. No &ldquo;growth hacks.&rdquo; One email when we launch.
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: 'var(--cream)', padding: '56px 0 80px', borderTop: '1px solid var(--hairline)' }}>
          <div className="ft-wrap">
            <div className="ft-footer-grid">
              <div>
                <a href="/us" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', textDecoration: 'none', color: 'var(--ink)', marginBottom: 16 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ink)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>FT</span>
                  Fundamentally True
                </a>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 380 }}>
                  For informational and educational purposes only. We do not provide investment advice. All investment decisions are yours.
                </p>
                <div style={{ marginTop: 16 }}><CountrySwitcher active="us" /></div>
              </div>
              {[
                { h: 'Product', links: [['#how','How it works'],['#morning','The Morning Check'],['#voice','The voice'],['#faq','FAQ']] },
                { h: 'Company', links: [['#','About'],['#','Manifesto'],['#','Careers'],['#','Contact']] },
                { h: 'Follow', links: [['#','Twitter / X'],['#','Instagram'],['#','LinkedIn'],['#','Substack']] },
              ].map(col => (
                <div key={col.h}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 14px', fontWeight: 600 }}>{col.h}</h4>
                  {col.links.map(([href, label]) => (
                    <a key={label} href={href} className="ft-footer-link">{label}</a>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-2)', letterSpacing: '0.04em' }}>
              <span>© 2026 Fundamentally True · Built for clarity.</span>
              <span>Privacy · Terms</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
