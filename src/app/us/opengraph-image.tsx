import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Fundamentally True — Own the business. Track the price.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '80px',
        background: '#111111',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        {/* Mark + wordmark row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32 }}>
          {/* SVG mark inline as img */}
          <div style={{
            width: 96, height: 96, borderRadius: 22,
            background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid rgba(246,243,236,0.1)',
          }}>
            {/* Simplified mark using divs */}
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              border: '3px solid #d97757',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: '#d97757',
              }} />
            </div>
          </div>
          {/* Wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 72, fontWeight: 700, color: '#f6f3ec', letterSpacing: '-2px', lineHeight: 1 }}>Fundamentally</span>
            <span style={{ fontSize: 72, fontWeight: 800, color: '#d97757', letterSpacing: '-2px', lineHeight: 1 }}>True.</span>
          </div>
        </div>
        {/* Tagline */}
        <div style={{
          fontSize: 28, fontWeight: 500,
          color: 'rgba(246,243,236,0.45)',
          letterSpacing: '3px', textTransform: 'uppercase',
        }}>
          Own the business. Track the price.
        </div>
      </div>
    ),
    { ...size }
  )
}
