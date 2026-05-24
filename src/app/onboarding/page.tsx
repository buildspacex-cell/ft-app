'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LAUNCH_STOCKS } from '@/types'
import { THESIS_REASONS as SEED_REASONS } from '@/lib/stocks/thesis-seed'

const ONBOARDING_CARDS = [
  {
    step: 1,
    eyebrow: 'The promise',
    headline: 'We don\'t say buy.\nWe don\'t say sell.',
    body: 'We tell you whether the reasons you trusted are still true. Every morning at 7am IST — filtered to your portfolio, written in plain English.',
  },
  {
    step: 2,
    eyebrow: 'How it works',
    headline: 'Your thesis.\nNot ours.',
    body: 'We write 3–5 reasons you might own a stock. You keep the ones you believe. We track those specific reasons — and only those.',
  },
  {
    step: 3,
    eyebrow: 'The feedback loop',
    headline: 'Useful. Noise.\nAlready knew.',
    body: 'Three taps on every story. Your feedback teaches us what matters to you. After a week, your digest is genuinely personalised.',
  },
  {
    step: 4,
    eyebrow: 'The fine print',
    headline: 'This is education,\nnot advice.',
    body: 'We track whether your reasons still hold. We never tell you what to do. All decisions are yours.',
  },
]



export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])
  const [acceptedReasons, setAcceptedReasons] = useState<Record<string, string[]>>({})
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const totalSteps = ONBOARDING_CARDS.length + 2 // 4 info cards + stock pick + thesis

  function toggleStock(ticker: string) {
    setSelectedStocks(prev =>
      prev.includes(ticker)
        ? prev.filter(t => t !== ticker)
        : prev.length < 3 ? [...prev, ticker] : prev
    )
  }

  function toggleReason(ticker: string, reasonId: string) {
    setAcceptedReasons(prev => {
      const current = prev[ticker] || []
      return {
        ...prev,
        [ticker]: current.includes(reasonId)
          ? current.filter(id => id !== reasonId)
          : [...current, reasonId],
      }
    })
  }

  async function finishOnboarding() {
    setSaving(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth/login'); return }

    // Create thesis for each selected stock
    for (const ticker of selectedStocks) {
      const allReasons = SEED_REASONS[ticker] || []
      const accepted = acceptedReasons[ticker] || []

      const reasons = allReasons.map(r => ({
        ...r,
        target: '',
        strength: 'supporting' as const,
        status: 'holding' as const,
        accepted: accepted.includes(r.id),
      }))

      await supabase.from('theses').insert({
        user_id: user.id,
        ticker,
        reasons_json: reasons,
      })
    }

    // Mark waitlist entry as converted
    await supabase.from('waitlist')
      .update({ converted: true })
      .eq('email', user.email)

    // Update user timezone
    await supabase.from('users').upsert({
      id: user.id,
      email: user.email,
      timezone: 'Asia/Kolkata',
    })

    router.push('/digest')
  }

  // Info cards
  if (step < ONBOARDING_CARDS.length) {
    const card = ONBOARDING_CARDS[step]
    return (
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, maxWidth: 480, margin: '0 auto', padding: '60px 24px 32px', width: '100%' }}>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 48 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? 'var(--ink)' : 'var(--hairline)' }} />
            ))}
          </div>

          <p className="eyebrow" style={{ marginBottom: 20 }}>{card.eyebrow}</p>
          <h1 style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.035em', color: 'var(--ink)', whiteSpace: 'pre-line', marginBottom: 24 }}>
            {card.headline}
          </h1>
          <p className="lede" style={{ color: 'var(--muted)' }}>{card.body}</p>
        </div>

        <div style={{ padding: '24px', display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', width: '100%' }} className="safe-bottom">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: 16, borderRadius: 14, border: '1px solid var(--hairline)', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
              Back
            </button>
          )}
          <button onClick={() => setStep(s => s + 1)} style={{ flex: 2, padding: 16, borderRadius: 14, border: 'none', background: 'var(--ink)', color: 'var(--cream)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            {step === ONBOARDING_CARDS.length - 1 ? 'Pick my stocks →' : 'Next →'}
          </button>
        </div>
      </main>
    )
  }

  // Stock picker
  if (step === ONBOARDING_CARDS.length) {
    return (
      <main style={{ background: 'var(--cream)', minHeight: '100dvh' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '52px 24px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? 'var(--ink)' : 'var(--hairline)' }} />
            ))}
          </div>

          <p className="eyebrow" style={{ marginBottom: 12 }}>Choose up to 3 stocks</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>Which companies do you already own or follow?</h2>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>You can add more later.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LAUNCH_STOCKS.map(stock => {
              const selected = selectedStocks.includes(stock.ticker)
              return (
                <button
                  key={stock.ticker}
                  onClick={() => toggleStock(stock.ticker)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 14,
                    border: selected ? '1.5px solid var(--ink)' : '1px solid var(--hairline)',
                    background: selected ? 'var(--ink)' : 'var(--card)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: selected ? 'var(--coral)' : 'var(--coral-deep)' }}>
                      {stock.ticker}
                    </span>
                    <p style={{ fontSize: 14, fontWeight: 600, color: selected ? 'var(--cream)' : 'var(--ink)', marginTop: 2 }}>{stock.name}</p>
                  </div>
                  <span style={{ fontSize: 11, color: selected ? 'var(--muted)' : 'var(--muted-2)', background: selected ? 'rgba(255,255,255,0.1)' : 'var(--hairline-soft)', padding: '3px 8px', borderRadius: 8 }}>
                    {stock.sector}
                  </span>
                </button>
              )
            })}
          </div>

          <div style={{ padding: '24px 0 0', display: 'flex', gap: 12 }} className="safe-bottom">
            <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: 16, borderRadius: 14, border: '1px solid var(--hairline)', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>Back</button>
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={selectedStocks.length === 0}
              style={{ flex: 2, padding: 16, borderRadius: 14, border: 'none', background: selectedStocks.length > 0 ? 'var(--ink)' : 'var(--hairline)', color: selectedStocks.length > 0 ? 'var(--cream)' : 'var(--muted)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, cursor: selectedStocks.length > 0 ? 'pointer' : 'not-allowed' }}>
              See my thesis →
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Thesis builder
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '52px 24px 100px' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? 'var(--ink)' : 'var(--hairline)' }} />
          ))}
        </div>

        <p className="eyebrow" style={{ marginBottom: 12 }}>Your thesis</p>
        <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 8 }}>Keep the reasons you believe</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 32 }}>We'll track these specific reasons every morning.</p>

        {selectedStocks.map(ticker => {
          const stock = LAUNCH_STOCKS.find(s => s.ticker === ticker)!
          const reasons = SEED_REASONS[ticker] || []
          const accepted = acceptedReasons[ticker] || []

          return (
            <div key={ticker} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--coral-deep)' }}>{ticker}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{stock.name}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {reasons.map(r => {
                  const isAccepted = accepted.includes(r.id)
                  return (
                    <button
                      key={r.id}
                      onClick={() => toggleReason(ticker, r.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: 12,
                        border: isAccepted ? '1.5px solid var(--ink)' : '1px solid var(--hairline)',
                        background: isAccepted ? 'var(--ink)' : 'var(--card)',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <p style={{ fontSize: 13, fontWeight: 500, color: isAccepted ? 'var(--cream)' : 'var(--ink)', lineHeight: 1.45 }}>{r.claim}</p>
                      <p style={{ fontSize: 11, color: isAccepted ? 'var(--muted)' : 'var(--muted-2)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{r.measure}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        <div style={{ position: 'sticky', bottom: 0, background: 'linear-gradient(to top, var(--cream) 80%, transparent)', paddingTop: 20, paddingBottom: 16 }} className="safe-bottom">
          <button
            onClick={finishOnboarding}
            disabled={saving || selectedStocks.some(t => (acceptedReasons[t] || []).length === 0)}
            style={{ width: '100%', padding: 16, borderRadius: 14, border: 'none', background: 'var(--coral)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            {saving ? 'Setting up your account...' : 'Start my Morning Check →'}
          </button>
        </div>
      </div>
    </main>
  )
}
