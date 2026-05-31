import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Fundamentally True — Own the stock, not just the ticker'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#171717',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* FT badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: '#d97757',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, fontWeight: 800,
            letterSpacing: '-0.02em',
          }}>
            FT
          </div>
          <span style={{
            fontSize: 18, fontWeight: 700, color: 'rgba(246,243,236,0.6)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            FUNDAMENTALLY TRUE
          </span>
        </div>

        {/* Main headline */}
        <div style={{
          fontSize: 72, fontWeight: 900,
          letterSpacing: '-0.055em', lineHeight: 0.92,
          color: '#f6f3ec', marginBottom: 28,
        }}>
          Own the stock,<br />
          <span style={{ color: '#d97757' }}>not just the ticker.</span>
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 26, fontWeight: 500,
          color: 'rgba(246,243,236,0.55)',
          letterSpacing: '-0.01em', lineHeight: 1.4,
          maxWidth: 700,
        }}>
          5 questions. Plain English. One morning alert when something actually changes.
        </div>

        {/* URL */}
        <div style={{
          marginTop: 48,
          fontSize: 18, fontWeight: 600,
          color: 'rgba(246,243,236,0.3)',
          letterSpacing: '0.06em',
          fontFamily: 'monospace',
        }}>
          ft-app-beta.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
