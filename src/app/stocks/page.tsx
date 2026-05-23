'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { LAUNCH_STOCKS } from '@/types'

const SECTOR_COLORS: Record<string, string> = {
  'Conglomerate': 'var(--ink)',
  'Banking':      'var(--sage)',
  'IT Services':  'var(--coral)',
  'FMCG':         'var(--amber)',
  'Energy':       '#6b6358',
  'Pharma':       '#3c7a8a',
  'Auto':         '#5a4a8a',
  'NBFC':         'var(--rust)',
}

export default function StocksPage() {
  const [ownedTickers, setOwnedTickers] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('theses').select('ticker').eq('user_id', user.id)
      if (data) setOwnedTickers(data.map((r: { ticker: string }) => r.ticker))
    }
    load()
  }, [])

  return (
    <main style={{ background: 'var(--cream)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ padding: '52px 0 24px' }}>
          <Link href="/digest" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', textDecoration: 'none', marginBottom: 20 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Digest</span>
          </Link>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>10 companies</p>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 6 }}>The curated list</h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
            NSE India. Each with a shop story, revenue breakdown, and pre-written thesis.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 60 }}>
          {LAUNCH_STOCKS.map(stock => {
            const isOwned = ownedTickers.includes(stock.ticker)
            const accentColor = SECTOR_COLORS[stock.sector] || 'var(--ink)'
            return (
              <Link
                key={stock.ticker}
                href={`/stocks/${stock.ticker.toLowerCase()}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--card)',
                  border: `1px solid ${isOwned ? 'var(--hairline)' : 'var(--hairline-soft)'}`,
                  borderRadius: 16,
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  transition: 'border-color 0.15s',
                }}>
                  {/* Color bar */}
                  <div style={{ width: 4, height: 44, borderRadius: 2, background: accentColor, flexShrink: 0 }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: accentColor }}>
                        {stock.ticker}
                      </span>
                      {isOwned && <span className="pill holding" style={{ fontSize: 9, padding: '1px 7px' }}>In thesis</span>}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: 0, lineHeight: 1.2 }}>{stock.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{stock.sector}</p>
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="var(--muted-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
