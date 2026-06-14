'use client'
import { MarketSwitch } from '@/components/MarketSwitch'
import { trackEvent, identifyUser } from '@/components/PostHogProvider'
import { useState, useEffect } from 'react'

// ─── Phone mockup - fixed status bar, proper iOS layout ──────────────────────

function PhoneMockup({ screen = 'digest' }: { screen?: 'digest' | 'detail' }) {
  return (
    <div style={{ position: 'relative', width: 300, flexShrink: 0 }}>
      {/* Side buttons left */}
      <div style={{ position: 'absolute', left: -3, top: 110, width: 3, height: 30, background: 'linear-gradient(180deg,#c0c0c0,#909090)', borderRadius: '3px 0 0 3px', zIndex: 10 }} />
      <div style={{ position: 'absolute', left: -3, top: 154, width: 3, height: 52, background: 'linear-gradient(180deg,#c0c0c0,#909090)', borderRadius: '3px 0 0 3px', zIndex: 10 }} />
      <div style={{ position: 'absolute', left: -3, top: 218, width: 3, height: 52, background: 'linear-gradient(180deg,#c0c0c0,#909090)', borderRadius: '3px 0 0 3px', zIndex: 10 }} />
      {/* Power button right */}
      <div style={{ position: 'absolute', right: -3, top: 162, width: 3, height: 72, background: 'linear-gradient(180deg,#c0c0c0,#909090)', borderRadius: '0 3px 3px 0', zIndex: 10 }} />

      {/* Titanium outer shell */}
      <div style={{
        borderRadius: 52,
        padding: 3,
        background: 'linear-gradient(145deg,#d8d8d8 0%,#a8a8a8 25%,#c8c8c8 50%,#969696 75%,#b8b8b8 100%)',
        boxShadow: '0 48px 96px rgba(0,0,0,0.30), 0 16px 32px rgba(0,0,0,0.18), 0 4px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(0,0,0,0.25)',
      }}>
        {/* Inner black bezel */}
        <div style={{ borderRadius: 50, padding: 2, background: '#111', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
          {/* Screen */}
          <div style={{ borderRadius: 48, overflow: 'hidden', background: 'var(--paper)', position: 'relative', height: 620 }}>
            {/* Screen glare overlay */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: 48, zIndex: 40, pointerEvents: 'none', background: 'linear-gradient(135deg,rgba(255,255,255,0.14) 0%,rgba(255,255,255,0.04) 35%,transparent 55%)' }} />
            {/* Status bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 22px 0', position: 'relative', zIndex: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>9:41</span>
              <div style={{ width: 106, height: 32, borderRadius: 20, background: '#000', margin: '0 auto', boxShadow: '0 0 0 1px rgba(255,255,255,0.07)' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
                <svg width="15" height="11" viewBox="0 0 16 11" fill="none">
                  <rect x="0" y="7" width="2.5" height="4" rx="0.5" fill="var(--ink)"/>
                  <rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="var(--ink)"/>
                  <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" fill="var(--ink)"/>
                  <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="var(--ink)"/>
                </svg>
                <svg width="14" height="11" viewBox="0 0 20 15" fill="none">
                  <path d="M10 13h.01M6.5 10.5c.95-.95 2.24-1.5 3.5-1.5s2.55.55 3.5 1.5M3 7.5C4.9 5.6 7.35 4.5 10 4.5s5.1 1.1 7 3M0 4.5C2.85 1.65 6.75 0 10 0s7.15 1.65 10 4.5" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <svg width="22" height="11" viewBox="0 0 24 12" fill="none">
                  <rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="var(--ink)" strokeOpacity="0.35"/>
                  <rect x="2" y="2" width="15" height="8" rx="1.5" fill="var(--ink)"/>
                  <path d="M22 4v4" stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            {/* App bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 22px 0' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" style={{flexShrink:0,display:'block'}} xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" rx="5" fill="#171717"/><path d="M10.0 3.2 A6.8 6.8 0 0 0 10.0 16.8 Z" transform="translate(-0.80 0)" fill="#f6f3ec"/><path d="M10.0 3.2 A6.8 6.8 0 0 1 10.0 16.8 Z" transform="translate(0.80 0)" fill="#d97757"/></svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>· MORNING CHECK · 7AM</span>
            </div>
            {screen === 'digest' ? <DigestScreen /> : <DetailScreen />}
            {/* Home indicator */}
            <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 120, height: 5, background: 'rgba(0,0,0,0.18)', borderRadius: 3 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function DigestScreen() {
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
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 12, letterSpacing: '-0.018em', lineHeight: 1.2, color: 'var(--ink)', marginBottom: 5 }}>HDFC Bank&apos;s bad loans ticked up - agri stress, not a structural crack.</p>
        <p style={{ fontSize: 9, color: 'var(--ink-soft)', lineHeight: 1.4, marginBottom: 8 }}>Net NPA rose to 0.39% from 0.31% last quarter. The cause is farm loans in stressed districts, not the urban branch network you see on your street.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.08em' }}>AFFECTS</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--amber-tint)', padding: '1px 7px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 8, fontWeight: 700, color: 'var(--amber)' }}>
            HDFCBANK <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
          </span>
        </div>
        <div style={{ background: 'var(--cream)', borderRadius: 8, padding: '7px 8px', border: '1px solid var(--hairline)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>PRICE VS. STORY · HDFCBANK</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginBottom: 5 }}>
            <div style={{ paddingRight: 8, borderRight: '1px solid var(--hairline)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--muted)', marginBottom: 2 }}>THE STORY</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, color: 'var(--amber)', letterSpacing: '-0.015em' }}>Wobbling</p>
            </div>
            <div style={{ paddingLeft: 8 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'var(--muted)', marginBottom: 2 }}>THE PRICE</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, color: 'var(--rust)', letterSpacing: '-0.015em' }}>↓ 1.8%</p>
            </div>
          </div>
          <p style={{ fontSize: 8, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.35 }}>One quarter doesn&apos;t move a bank built over 30 years. Watch the next two.</p>
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

function DetailScreen() {
  return (
    <div style={{ padding: '8px 16px 20px', overflow: 'hidden', height: 'calc(100% - 78px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 999, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>← Digest</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--muted)' }}>HDFCBANK thesis ↗</span>
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--rust-tint)', color: 'var(--rust)', fontFamily: 'var(--font-mono)', fontSize: 6.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 20, marginBottom: 8 }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />WORTH YOUR ATTENTION
      </span>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.025em', lineHeight: 1.15, color: 'var(--ink)', margin: '8px 0 8px' }}>HDFC Bank&apos;s bad loans ticked up - agri stress, not a structural crack.</h2>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--rust-tint)', padding: '3px 8px 3px 6px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: 7.5, fontWeight: 700, color: 'var(--rust)' }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />HDFCBANK · wobbling
        </span>
      </div>
      <p style={{ fontSize: 10, color: 'var(--ink-soft)', lineHeight: 1.45, marginBottom: 10 }}>Net NPA rose to 0.39% from 0.31% last quarter. The cause is farm loans in stressed districts - not the urban branch network. That&apos;s the specific reason you owned HDFC Bank.</p>
      <div style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 11, padding: '10px', marginBottom: 8 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>HOW THIS HITS YOUR HDFCBANK THESIS</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--ink)', marginBottom: 7 }}>&ldquo;Best-in-class loan quality - NPA consistently below every peer.&rdquo;</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--amber)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>~</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--ink)' }}>Wobbling · Net NPA 0.39%</span>
        </div>
        <p style={{ fontSize: 8.5, color: 'var(--coral-deep)', fontWeight: 500, lineHeight: 1.35 }}>One quarter of agri stress. Watch if it persists next quarter.</p>
      </div>
      <div style={{ background: 'var(--cream-deep)', borderRadius: 10, padding: '9px 10px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 6.5, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>WHAT WE READ</p>
        {['HDFC Bank Q4 FY25 results · investor presentation', 'RBI · district-level agri NPA data Q4', 'Moneycontrol · HDFC asset quality analysis'].map((s, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 7.5, color: 'var(--ink-soft)', marginBottom: 2 }}>· {s}</p>
        ))}
      </div>
    </div>
  )
}



// ─── Wishes bar - rotating real quotes from waitlist ─────────────────────────

// ─── Country switcher ─────────────────────────────────────────────────────────


// ── Scroll depth tracker ──────────────────────────────────────────────────────
function useScrollDepth(market: string) {
  useEffect(() => {
    const milestones = [25, 50, 75, 90]
    const reached = new Set<number>()
    function onScroll() {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      milestones.forEach(m => {
        if (pct >= m && !reached.has(m)) {
          reached.add(m)
          trackEvent('scroll_depth', { depth: m, market })
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [market])
}

// ── Section visibility tracker ───────────────────────────────────────────────
function useSectionTracking(market: string) {
  useEffect(() => {
    const seen = new Set<string>()
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.id && !seen.has(e.target.id)) {
          seen.add(e.target.id)
          trackEvent('section_viewed', { section: e.target.id, market })
        }
      })
    }, { threshold: 0.3 })
    document.querySelectorAll('section[id], div[id]').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [market])
}

function CountrySwitcher({ active }: { active: 'in' | 'us' }) {
  function go(market: 'in' | 'us') {
    trackEvent('market_switched', { to: market, from: 'in' })
    document.cookie = `ft-market=${market};max-age=${60 * 60 * 24 * 30};path=/`
    window.location.href = market === 'us' ? '/us' : '/'
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'var(--hairline-soft)', borderRadius: 999, padding: 3 }}>
      <button onClick={() => go('in')} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
        background: active === 'in' ? 'var(--card)' : 'transparent',
        boxShadow: active === 'in' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: active === 'in' ? 600 : 500,
        color: active === 'in' ? 'var(--ink)' : 'var(--muted)',
        transition: 'all 0.15s',
      }}>
        🇮🇳 India
      </button>
      <button onClick={() => go('us')} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
        background: active === 'us' ? 'var(--card)' : 'transparent',
        boxShadow: active === 'us' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: active === 'us' ? 600 : 500,
        color: active === 'us' ? 'var(--ink)' : 'var(--muted)',
        transition: 'all 0.15s',
      }}>
        🇺🇸 US
      </button>
    </div>
  )
}


// ─── Module-level email store — set on first submit, read by child steps ─────
let _submittedEmail = ''
function getSubmittedEmail() { return _submittedEmail }

// ─── Wish question - shown after stock pick ──────────────────────────────────

function WishQuestion({ dark = false }: { dark?: boolean }) {
  const [wish, setWish] = useState('')
  const [saved, setSaved] = useState(false)

  function saveWish() {
    if (!wish.trim() || saved) return
    setSaved(true)
    const em = getSubmittedEmail()
    if (!em) return
    fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: em, wish_text: wish.trim(), sendLink: false }),
    }).catch(() => {})
  }

  const label = dark ? 'rgba(246,243,236,0.7)' : 'var(--muted)'
  const strong = dark ? 'var(--cream)' : 'var(--ink)'

  if (saved) return (
    <div>
      <p style={{ fontSize: 14, color: label, lineHeight: 1.5, marginBottom: 0 }}>
        Thank you. That is exactly the kind of thing we are building for.
      </p>
      <PhoneStep dark={dark} />
    </div>
  )

  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: strong, marginBottom: 6, lineHeight: 1.4 }}>
        What is one thing you wish you understood better about a stock you own?
      </p>
      <p style={{ fontSize: 12.5, color: label, marginBottom: 12, lineHeight: 1.45 }}>
        Not features - just tell us where you feel lost. &ldquo;I never know if bad news actually matters.&rdquo; &ldquo;I bought it but I can&apos;t explain why.&rdquo; Anything like that.
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


// ─── Phone step - with country selector and validation ───────────────────────

const COUNTRIES = [
  { code: 'IN', flag: '🇮🇳', name: 'India',          dial: '+91',  pattern: /^[6-9]\d{9}$/ },
  { code: 'US', flag: '🇺🇸', name: 'United States',  dial: '+1',   pattern: /^[2-9]\d{9}$/ },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dial: '+44',  pattern: /^\d{10}$/ },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore',      dial: '+65',  pattern: /^[689]\d{7}$/ },
  { code: 'AE', flag: '🇦🇪', name: 'UAE',             dial: '+971', pattern: /^[5]\d{8}$/ },
  { code: 'AU', flag: '🇦🇺', name: 'Australia',       dial: '+61',  pattern: /^[4]\d{8}$/ },
  { code: 'CA', flag: '🇨🇦', name: 'Canada',          dial: '+1',   pattern: /^[2-9]\d{9}$/ },
  { code: 'DE', flag: '🇩🇪', name: 'Germany',         dial: '+49',  pattern: /^\d{10,11}$/ },
  { code: 'OTHER', flag: '🌍', name: 'Other',         dial: '+',    pattern: /^\d{6,15}$/ },
]

function PhoneStep({ dark = false, defaultCountry = 'IN' }: { dark?: boolean; defaultCountry?: string }) {
  const [countryCode, setCountryCode] = useState(defaultCountry)
  const [phone, setPhone] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const country = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0]

  function validate(num: string) {
    const digits = num.replace(/\D/g, '')
    if (!digits) return ''
    if (!country.pattern.test(digits)) {
      return countryCode === 'OTHER'
        ? 'Enter a valid number (6-15 digits)'
        : `Enter a valid ${country.name} number`
    }
    return ''
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^0-9\s\-()]/g, '')
    setPhone(val)
    if (error) setError(validate(val))
  }

  function handleBlur() {
    if (phone.trim()) setError(validate(phone))
  }

  async function savePhone() {
    const err = validate(phone)
    if (err) { setError(err); return }
    if (!phone.trim() || saved) return
    setSaved(true)
    const full = `${country.dial} ${phone.trim()}`
    const em = getSubmittedEmail()
    if (em) {
      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: em, phone: full, sendLink: false }),
      }).catch(() => {})
    }
  }

  const subtle = dark ? 'rgba(246,243,236,0.6)' : 'var(--muted)'
  const strong = dark ? 'var(--cream)' : 'var(--ink)'
  const inputBg = dark ? 'rgba(246,243,236,0.06)' : 'var(--paper)'
  const inputBorder = dark ? '1px solid rgba(246,243,236,0.16)' : '1px solid var(--hairline)'
  const isValid = !validate(phone) && phone.trim().length > 0

  if (saved) return (
    <p style={{ fontSize: 14, color: subtle, lineHeight: 1.5, marginTop: 16 }}>
      Perfect. We&apos;ll WhatsApp you before June 24th.
    </p>
  )

  return (
    <div style={{ marginTop: 20, paddingTop: 18, borderTop: dark ? '1px solid rgba(246,243,236,0.1)' : '1px solid var(--hairline)' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: subtle, marginBottom: 10 }}>
        One more thing
      </p>
      <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: strong, marginBottom: 6, lineHeight: 1.4 }}>
        We&apos;d love to call you.
      </p>
      <p style={{ fontSize: 13.5, color: subtle, marginBottom: 16, lineHeight: 1.5 }}>
        Not a sales call - 15 minutes where you talk and we listen. What stocks do you own? What confuses you about them? Your answers will shape what we build. WhatsApp number if you&apos;re open to it.
      </p>

      {/* Country + number row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: error ? 6 : 10 }}>
        {/* Country selector */}
        <select
          value={countryCode}
          onChange={e => { setCountryCode(e.target.value); setPhone(''); setError('') }}
          style={{
            padding: '10px 10px', borderRadius: 10, flexShrink: 0,
            border: inputBorder, background: inputBg,
            fontFamily: 'var(--font-sans)', fontSize: 14,
            color: dark ? 'var(--cream)' : 'var(--ink)',
            outline: 'none', cursor: 'pointer',
            minWidth: 80,
          }}
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.flag} {c.dial}</option>
          ))}
        </select>

        {/* Number input */}
        <input
          type="tel"
          value={phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={countryCode === 'IN' ? '98765 43210' : countryCode === 'US' ? '(555) 000-0000' : 'your number'}
          style={{
            flex: 1, padding: '10px 12px', borderRadius: 10, minWidth: 0,
            border: error ? '1px solid var(--rust)' : isValid ? '1px solid var(--sage)' : inputBorder,
            background: inputBg,
            fontFamily: 'var(--font-sans)', fontSize: 14,
            color: dark ? 'var(--cream)' : 'var(--ink)',
            outline: 'none', transition: 'border-color 0.15s',
          }}
        />

        {/* Send button */}
        <button
          onClick={savePhone}
          style={{
            padding: '10px 16px', borderRadius: 10, border: 'none',
            background: isValid ? 'var(--coral)' : (dark ? 'rgba(246,243,236,0.1)' : 'var(--hairline)'),
            color: isValid ? '#fff' : subtle,
            fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
            cursor: isValid ? 'pointer' : 'not-allowed', flexShrink: 0,
            transition: 'background 0.15s',
          }}
        >
          Send
        </button>
      </div>

      {/* Validation error */}
      {error && (
        <p style={{ fontSize: 12, color: 'var(--rust)', marginBottom: 8, letterSpacing: '-0.005em' }}>
          {error}
        </p>
      )}

      <button
        onClick={() => setSaved(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: subtle, padding: '2px 0', display: 'block' }}
      >
        Skip
      </button>
    </div>
  )
}


// ─── Email form ───────────────────────────────────────────────────────────────

function EmailForm({ dark = false, source = 'landing-in', compact = false }: { dark?: boolean; source?: string; compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, sendLink: true }),
      })
      if (!res.ok) { setStatus('error'); return }
      _submittedEmail = email
      trackEvent('waitlist_signup', { source, market: 'in' })
      identifyUser(email, { market: 'in', source })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const [stock, setStock] = useState('')
  const [stockSaved, setStockSaved] = useState(false)

  async function saveStock() {
    if (!stock || stockSaved) return
    setStockSaved(true)
    const em = getSubmittedEmail()
    if (!em) return
    fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: em, source, stock_interest: stock, sendLink: false }),
    }).catch(() => {})
    trackEvent('waitlist_stock_saved', { stock })
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
            The first cohort opens <strong style={{ color: 'var(--coral)', fontWeight: 600 }}>June 24th</strong>. We&apos;ll email you that morning with your magic link.
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
            <input
              type="text"
              value={stock}
              onChange={e => setStock(e.target.value)}
              placeholder="e.g. HDFC Bank, the one you're unsure about"
              style={{
                flex: 1, padding: '10px 12px', borderRadius: 10,
                border: dark ? '1px solid rgba(246,243,236,0.16)' : '1px solid var(--hairline)',
                background: dark ? 'rgba(246,243,236,0.08)' : 'var(--paper)',
                fontFamily: 'var(--font-sans)', fontSize: 14,
                color: dark ? 'var(--cream)' : 'var(--ink)',
                outline: 'none',
              }}
            />
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
        <div>
          <p style={{ fontSize: 13, color: dark ? 'rgba(246,243,236,0.6)' : 'var(--muted)', marginBottom: 16, lineHeight: 1.4 }}>
            Got it. We&apos;ll make sure <strong style={{ color: dark ? 'var(--cream)' : 'var(--ink)', fontWeight: 600 }}>{stock || 'your pick'}</strong> is ready on day one.
          </p>
          <WishQuestion dark={dark} />
        </div>
      )}
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit} className={compact ? 'ft-inline-form' : undefined} style={{
        display: 'flex', flexWrap: 'wrap', gap: 8,
        background: dark ? 'rgba(246,243,236,0.08)' : 'var(--card)',
        padding: '6px 6px 6px 18px', borderRadius: 999,
        border: dark ? '1px solid rgba(246,243,236,0.16)' : '1px solid var(--hairline)',
        maxWidth: 480,
      }}>
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" required
          style={{
            flex: '1 1 180px', border: 'none', background: 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: 15,
            color: dark ? 'var(--cream)' : 'var(--ink)', outline: 'none',
            letterSpacing: '-0.005em', minWidth: 0,
          }}
        />
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

// ─── Eyebrow helper ───────────────────────────────────────────────────────────

function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: dark ? 'rgba(246,243,236,0.55)' : 'var(--muted)',
      fontWeight: 600, margin: '0 0 18px',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--coral)', flexShrink: 0 }} />
      {label}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* Responsive styles injected inline - works in all browsers without PostCSS */}
      <style>{`
        * { box-sizing: border-box; }
        .ft-landing { background: var(--cream); font-family: var(--font-sans); color: var(--ink); overflow-x: hidden; }
        .ft-nav-links { display: flex; }
        .ft-hero-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 40px; align-items: flex-start; }
        .ft-hero-phone { justify-self: center; }
        .ft-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .ft-moments { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; position: relative; }
        @media (max-width: 768px) {
          .ft-hero-split { grid-template-columns: 1fr !important; }
          .ft-hero-phone { display: none !important; }
        }
        @media (max-width: 960px) {
          .ft-steps { grid-template-columns: 1fr 1fr !important; }
          .ft-hero-split { gap: 32px !important; }
        }
        .ft-translations { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ft-feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .ft-never-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .ft-stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; max-width: 980px; margin: 0 auto; }
        .ft-fit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .ft-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 36px; margin-bottom: 56px; }
        .ft-section { padding: 100px 0; }
        .ft-wrap { max-width: 1180px; margin: 0 auto; padding: 0 28px; }
        @media (max-width: 960px) {
          .ft-hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .ft-hero-phone { justify-self: center; }
          .ft-steps { grid-template-columns: 1fr; gap: 16px; }
          .ft-moments { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .ft-translations { grid-template-columns: 1fr 1fr; }
          .ft-feature-grid { grid-template-columns: 1fr; gap: 48px; }
          .ft-never-grid { grid-template-columns: 1fr; gap: 16px; }
          .ft-stat-row { grid-template-columns: 1fr; gap: 36px; }
          .ft-fit-grid { grid-template-columns: 1fr; }
          .ft-footer-grid { grid-template-columns: 1fr 1fr; }
          .ft-section { padding: 64px 0; }
          .ft-wrap { padding: 0 20px; }
        }
        @media (max-width: 600px) {
          .ft-steps { grid-template-columns: 1fr !important; }
          .ft-hero-questions { gap: 0 !important; }
          .ft-inline-form { flex-direction: column !important; }
          .ft-inline-form input { border-radius: 12px !important; margin-bottom: 8px; }
          .ft-inline-form button { border-radius: 12px !important; width: 100% !important; }
          .ft-nav-links { display: none; }
          .ft-moments { grid-template-columns: 1fr; }
          .ft-translations { grid-template-columns: 1fr; }
          .ft-footer-grid { grid-template-columns: 1fr; }
          .ft-hero-grid h1 { font-size: 44px !important; }
          .ft-section { padding: 48px 0; }
          .ft-wrap { padding: 0 16px; }
        }
        .ft-nav-link { font-size: 14px; font-weight: 500; color: var(--muted); text-decoration: none; letter-spacing: -0.005em; transition: color 0.15s; }
        .ft-nav-link:hover { color: var(--ink); }
        .ft-inline-form { display: flex; gap: 8px; align-items: stretch; }
        .ft-inline-form input { flex: 1; min-width: 0; }
        .ft-inline-form button { flex-shrink: 0; white-space: nowrap; }
        .ft-footer-link { display: block; font-size: 14px; color: var(--ink-soft); text-decoration: none; padding: 4px 0; transition: color 0.15s; }
        .ft-footer-link:hover { color: var(--coral-deep); }
        .ft-step { position: relative; padding: 32px 28px 36px; border-radius: 22px; background: var(--card); border: 1px solid var(--hairline); display: flex; flex-direction: column; min-height: 280px; }
        .ft-moment { position: relative; z-index: 1; padding: 26px 18px 24px; background: var(--card); border: 1px solid var(--hairline); border-radius: 18px; display: flex; flex-direction: column; }
        .ft-moment.current { border-color: var(--coral); }
        .ft-translation { background: rgba(246,243,236,0.04); border: 1px solid rgba(246,243,236,0.08); border-radius: 18px; padding: 24px; }
        .ft-never-item { padding: 36px 30px 34px; background: var(--card); border: 1px solid var(--hairline); border-radius: 22px; display: flex; flex-direction: column; }
        .ft-fit-col { background: var(--card); border: 1px solid var(--hairline); border-radius: 22px; padding: 32px; }
        .ft-faq-item { padding: 26px 0; border-top: 1px solid var(--hairline); }
      `}</style>

      <div className="ft-landing">

        {/* ── NAV ── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 50,
          backdropFilter: 'blur(14px) saturate(170%)',
          WebkitBackdropFilter: 'blur(14px) saturate(170%)',
          background: 'rgba(246,243,236,0.82)',
          borderBottom: '1px solid var(--hairline-soft)',
        }}>
          <div className="ft-wrap" style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '14px 28px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', textDecoration: 'none', color: 'var(--ink)', flexShrink: 0 }}>
              <svg width="36" height="36" viewBox="0 0 36 36" style={{flexShrink:0,display:'block'}} xmlns="http://www.w3.org/2000/svg"><path d="M18.0 5.0 A13.0 13.0 0 0 0 18.0 31.0 Z" transform="translate(-1.26 0)" fill="#1a1a1a"/><path d="M18.0 5.0 A13.0 13.0 0 0 1 18.0 31.0 Z" transform="translate(1.26 0)" fill="#d97757"/></svg>
              Fundamentally True
            </a>
            <div className="ft-nav-links" style={{ gap: 24, alignItems: 'center' }}>
              {[['#moments','The lifecycle'],['#how','How it works'],['#morning','The Morning Check'],['#never','Our promises']].map(([href,label]) => (
                <a key={href} href={href} className="ft-nav-link">{label}</a>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <CountrySwitcher active="in" />
            <a href="#waitlist" onClick={() => trackEvent('cta_clicked', { location: 'hero', market: 'in' })} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, letterSpacing: '-0.005em', background: 'var(--ink)', color: 'var(--cream)', padding: '10px 18px', borderRadius: 999, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0, whiteSpace: 'nowrap' }}>
              Get early access <span>→</span>
            </a>
          </div>
        </nav>

                {/* ── HERO ── */}
        <section className="ft-section" style={{ padding: '56px 0 72px' }}>
          <div className="ft-wrap">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="ft-hero-split">

              {/* Left — headline + three questions only + form */}
              <div>
                <Eyebrow label="For people who don't speak finance" />
                <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(40px, 5.5vw, 68px)', lineHeight: 0.93, letterSpacing: '-0.052em', margin: '14px 0 28px', color: 'var(--ink)' }}>
                  We&apos;re with you<br />
                  <span style={{ color: 'var(--coral-deep)' }}>for the whole ride.</span>
                </h1>

                {/* Delivery mechanism — one line clarity */}
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral-deep)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'inline-block', width: 16, height: 1.5, background: 'var(--coral-deep)' }} />
                  A 7am app notification. 60 seconds. Plain English.
                </p>

                {/* Inline form — above the fold */}
                <div style={{ marginBottom: 32 }}>
                  <EmailForm source="landing-in-inline" compact />
                </div>

                {/* Three questions — clean, no body copy */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 36 }} className="ft-hero-questions">
                  {[
                    { n: '01', phase: 'Before you buy',  q: 'Should I even own this?' },
                    { n: '02', phase: 'While you hold',  q: 'Is my reason to hold this still true?', active: true },
                    { n: '03', phase: 'When to leave',   q: 'Is it time to go?' },
                  ].map((item, i) => (
                    <div key={item.n} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 0',
                      borderBottom: i < 2 ? '1px solid var(--hairline)' : 'none',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
                        color: 'var(--coral-deep)', letterSpacing: '0.08em', flexShrink: 0, width: 20,
                      }}>{item.n}</span>
                      <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', margin: '0 0 3px' }}>{item.phase}</p>
                        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', lineHeight: 1.2, color: item.active ? 'var(--coral-deep)' : 'var(--ink)', margin: 0 }}>{item.q}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 28px', lineHeight: 1.5 }}>
                  Plain English. No tips. Just your reason to own, watched every morning.
                </p>

                <div id="waitlist"><EmailForm source="landing-in-hero" /></div>
              </div>

              {/* Right — phone showing the morning check */}
              <div className="ft-hero-phone" style={{ display: 'flex', justifyContent: 'center' }}>
                <PhoneMockup screen="digest" />
              </div>

            </div>
          </div>
        </section>


        {/* ── SEE HOW IT WORKS ── */}
        <section style={{ background: 'var(--ink)', padding: '0' }}>
          <div className="ft-wrap" style={{ padding: '0 28px' }}>
            <a href="/sample" onClick={() => trackEvent('sample_opened', { market: 'in' })} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '22px 0', textDecoration: 'none', borderBottom: '1px solid rgba(246,243,236,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9H15M10 4L15 9L10 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.5)', marginBottom: 3 }}>
                    See the full experience - no signup required
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.025em', color: 'var(--cream)', margin: 0, lineHeight: 1.2 }}>
                    Can you answer 5 questions about a stock you own? Most people can answer the first one. Almost nobody can answer the last.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0, marginLeft: 24 }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14, color: 'var(--coral)', whiteSpace: 'nowrap' }}>
                  Walk through it →
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(246,243,236,0.4)', letterSpacing: '0.06em' }}>
                  Data Patterns · NSE
                </span>
              </div>
            </a>
          </div>
        </section>


        {/* Lifecycle phases moved to hero above */}

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="ft-section">
          <div className="ft-wrap">
            <Eyebrow label="How it works" />
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 56px)', letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 20px', maxWidth: 720 }}>Three things we do.<br />Nothing else.</h2>
            <p style={{ fontSize: 19, color: 'var(--muted)', maxWidth: 580, margin: '0 0 56px', lineHeight: 1.5 }}>No charts to read. No trading you can do here. No &ldquo;AI stock picks.&rdquo; Just three things, well.</p>
            <div className="ft-steps">
              {[
                { n: '01', h: 'We explain the business in plain English so you actually understand what you own.', p: 'What the company does, how it makes money, what the numbers actually mean. No charts to decode, no jargon to Google. By the end you know exactly what you are buying into.', badge: 'Plain English · no jargon' },
                { n: '02', h: 'We build the investment thesis for you.', p: 'We draft the investment thesis instantly, the core reasons most investors own this stock, in plain English. One tap to confirm it. One tap to swap a reason if something does not fit. Once saved, every morning update is measured against it. No writing required.', badge: 'We build · you refine' },
                { n: '03', h: 'We track everything and keep you updated when something touches your reason.', p: 'Every morning we scan results, RBI decisions, headlines and sector moves. We check each one against your saved reason to own. If something touches it, we tell you in plain English. If nothing does, we stay quiet. Most mornings, we stay quiet.', badge: 'We track · we update' },
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
                  The world doesn't stop moving just because you're not watching. Every morning we scan everything - macro moves, earnings, policy decisions, commodity prices - and filter it down to what touches the specific reasons you chose to own each stock.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    { label: 'Connected to your thesis', text: "When the RBI changes rates, we don't send you a macro story - we tell you which reason in your HDFC Bank or Bajaj Finance thesis just got stronger or weaker." },
                    { label: 'Price vs. story', text: "When the market moves but your thesis hasn't, we notice - and explain the disconnect in one sentence." },
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <EmailForm dark />
            </div>
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
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 16, letterSpacing: '-0.025em', textDecoration: 'none', color: 'var(--ink)', marginBottom: 16 }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" style={{flexShrink:0,display:'block'}} xmlns="http://www.w3.org/2000/svg"><path d="M14.0 3.9 A10.1 10.1 0 0 0 14.0 24.1 Z" transform="translate(-0.98 0)" fill="#1a1a1a"/><path d="M14.0 3.9 A10.1 10.1 0 0 1 14.0 24.1 Z" transform="translate(0.98 0)" fill="#d97757"/></svg>
                  Fundamentally True
                </a>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-soft)', maxWidth: 340, marginBottom: 14 }}>
                  Built by people who held stocks for years and realised they couldn&apos;t explain why. We got tired of mistaking price movement for business change.
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 380 }}>
                  For informational and educational purposes only. We do not provide investment advice. All investment decisions are yours.
                </p>
                <div style={{ marginTop: 16 }}><CountrySwitcher active="in" /></div>
              </div>
              {[
                { h: 'Product', links: [['#how','How it works'],['#morning','The Morning Check'],] },
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
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--hairline)' }}>
            <MarketSwitch currentMarket="in" />
          </div>
          </div>
        </footer>

      </div>
    </>
  )
}
