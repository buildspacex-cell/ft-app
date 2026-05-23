'use client'

import { useEffect, useState } from 'react'
import type { RecapData } from '@/app/api/recap/route'

// ─── Placeholder shown until user has 10+ feedback taps ──────────────────────

function RecapPlaceholder({ feedbackCount }: { feedbackCount: number }) {
  const remaining = Math.max(0, 10 - feedbackCount)
  return (
    <div style={{
      background: 'linear-gradient(155deg, var(--coral-tint) 0%, var(--paper) 70%)',
      border: '1px solid rgba(217,119,87,0.4)',
      borderRadius: 18,
      padding: '20px 20px',
      marginBottom: 18,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{
          width: 18, height: 18, borderRadius: 5,
          background: 'var(--coral)', color: 'var(--cream)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
        }}>★</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--coral-deep)', fontWeight: 600,
        }}>
          Your week · Friday recap
        </span>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700,
        fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1.15,
        color: 'var(--ink)', marginBottom: 10,
      }}>
        Your filter is still learning.
      </h2>

      <p style={{
        fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.5,
        color: 'var(--muted)', marginBottom: 16,
      }}>
        Tap useful, noise, or "already knew" on {remaining} more{' '}
        {remaining === 1 ? 'story' : 'stories'} and we'll start showing you
        what we learned.
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            FEEDBACK TAPS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--coral-deep)' }}>
            {feedbackCount} / 10
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--hairline)', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.min(100, (feedbackCount / 10) * 100)}%`,
            background: 'var(--coral)',
            borderRadius: 3,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--coral-deep)', fontWeight: 500, marginTop: 14, lineHeight: 1.4 }}>
        The more you tell us, the more it disappears for you.
      </p>
    </div>
  )
}

// ─── Full recap card ──────────────────────────────────────────────────────────

function RecapCard({ recap }: { recap: RecapData }) {
  const { useful_count, noise_count, knew_count, total_count, week_label, changes } = recap
  const usefulPct = total_count > 0 ? (useful_count / total_count) * 100 : 0

  return (
    <div style={{
      background: 'linear-gradient(155deg, var(--coral-tint) 0%, var(--paper) 70%)',
      border: '1px solid var(--coral)',
      borderRadius: 18,
      padding: '20px 20px',
      marginBottom: 18,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{
          width: 18, height: 18, borderRadius: 5,
          background: 'var(--coral)', color: 'var(--cream)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
        }}>★</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--coral-deep)', fontWeight: 600,
        }}>
          Your week · Friday recap
        </span>
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--muted)', letterSpacing: '0.04em',
        }}>
          {week_label}
        </span>
      </div>

      {/* Big stat hero */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 800,
          fontSize: 64, lineHeight: 0.85, letterSpacing: '-0.05em',
          color: 'var(--ink)',
        }}>
          {useful_count}
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 400,
          fontSize: 22, letterSpacing: '-0.025em',
          color: 'var(--muted-2)',
        }}>
          of {total_count}
        </span>
      </div>

      <div style={{
        fontFamily: 'var(--font-sans)', fontWeight: 600,
        fontSize: 18, letterSpacing: '-0.025em', lineHeight: 1.2,
        margin: '6px 0 16px',
        color: 'var(--ink)',
      }}>
        {total_count === 0
          ? 'No stories rated this week.'
          : `${usefulPct >= 70 ? 'Most' : usefulPct >= 50 ? 'Over half the' : 'Some'} stories were useful to you this week.`}
      </div>

      {/* Bar viz */}
      {total_count > 0 && (
        <div style={{ display: 'flex', gap: 3, height: 8, borderRadius: 4, marginBottom: 20, overflow: 'hidden' }}>
          {useful_count > 0 && (
            <div style={{ flex: useful_count, height: '100%', borderRadius: 2, background: 'var(--sage)' }} />
          )}
          {knew_count > 0 && (
            <div style={{ flex: knew_count, height: '100%', borderRadius: 2, background: 'var(--amber)' }} />
          )}
          {noise_count > 0 && (
            <div style={{ flex: noise_count, height: '100%', borderRadius: 2, background: 'var(--rust)' }} />
          )}
        </div>
      )}

      {/* Legend */}
      {total_count > 0 && (
        <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
          {[
            { color: 'var(--sage)',  label: 'Useful',       count: useful_count },
            { color: 'var(--amber)', label: 'Already knew', count: knew_count },
            { color: 'var(--rust)',  label: 'Noise',        count: noise_count },
          ].filter(l => l.count > 0).map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: l.color }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.04em' }}>
                {l.count} {l.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* What we changed */}
      {changes.length > 0 && (
        <>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: 10,
          }}>
            What we changed for you
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {changes.map((row, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '12px 14px', borderRadius: 10,
                background: 'var(--paper)',
                border: '1px solid var(--hairline)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--cream)',
                  background: row.color,
                  padding: '3px 6px', borderRadius: 4,
                  whiteSpace: 'nowrap',
                  flexShrink: 0, marginTop: 2,
                }}>
                  {row.tag}
                </span>
                <div style={{
                  fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.42,
                  letterSpacing: '-0.005em', color: 'var(--ink-soft)',
                  fontWeight: 500,
                }}>
                  {row.text}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Footer line */}
      <div style={{
        paddingTop: 12,
        borderTop: '1px solid rgba(217,119,87,0.35)',
        fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500,
        lineHeight: 1.42, letterSpacing: '-0.005em',
        color: 'var(--coral-deep)',
      }}>
        Your filter is getting smarter. The more you tell us, the more it disappears for you.
      </div>
    </div>
  )
}

// ─── Exported component — handles loading, gate, and full render ──────────────

export default function FridayRecap() {
  const [recap, setRecap] = useState<RecapData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/recap')
      .then(r => r.json())
      .then(d => { setRecap(d.recap ?? null); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{
        background: 'var(--hairline-soft)', borderRadius: 18,
        padding: '20px', marginBottom: 18,
        height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Loading recap...
        </span>
      </div>
    )
  }

  if (!recap) return null

  // Gate: less than 10 total feedback taps ever → show placeholder
  if (recap.feedback_total_ever < 10) {
    return <RecapPlaceholder feedbackCount={recap.feedback_total_ever} />
  }

  return <RecapCard recap={recap} />
}
