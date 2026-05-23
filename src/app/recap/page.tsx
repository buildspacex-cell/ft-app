'use client'

import Link from 'next/link'
import FridayRecap from '@/components/digest/FridayRecap'

export default function RecapPage() {
  return (
    <>
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', paddingBottom: 80 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

          <div style={{ padding: '52px 0 24px' }}>
            <Link
              href="/digest"
              style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', textDecoration: 'none', marginBottom: 20 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Digest</span>
            </Link>

            <p className="eyebrow" style={{ marginBottom: 8 }}>Your week</p>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, color: 'var(--ink)', marginBottom: 10 }}>
              Weekly recap
            </h1>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>
              What you told us. What we changed.
            </p>
          </div>

          <FridayRecap />

          <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6, paddingBottom: 16 }}>
            Your feedback trains your personal filter only. We never share what you tap.
          </p>

        </div>
      </main>

      {/* Bottom nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'var(--cream)', borderTop: '1px solid var(--hairline)',
        display: 'flex', justifyContent: 'center',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)', zIndex: 100,
      }}>
        {[
          { href: '/digest', label: 'Digest', icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 10h8M4 14h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
          )},
          { href: '/stocks', label: 'Stocks', icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )},
        ].map(item => (
          <Link key={item.href} href={item.href} style={{
            flex: 1, maxWidth: 120, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, padding: '10px 0 6px',
            textDecoration: 'none', color: 'var(--muted-2)',
          }}>
            {item.icon}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </>
  )
}
