import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Fundamentally True — Own the business, Track the ticker.'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32 }}>
          {/* Split circle mark */}
          <div style={{ display: 'flex', width: 96, height: 96, position: 'relative' }}>
            <div style={{
              width: 44, height: 88, marginTop: 4,
              background: '#f6f3ec',
              borderRadius: '88px 0 0 88px',
            }} />
            <div style={{
              width: 44, height: 88, marginTop: 4, marginLeft: 8,
              background: '#d97757',
              borderRadius: '0 88px 88px 0',
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 72, fontWeight: 700, color: '#f6f3ec', letterSpacing: '-2px', lineHeight: 1 }}>Fundamentally</span>
            <span style={{ fontSize: 72, fontWeight: 800, color: '#d97757', letterSpacing: '-2px', lineHeight: 1 }}>True.</span>
          </div>
        </div>
        <div style={{
          fontSize: 28, fontWeight: 500,
          color: 'rgba(246,243,236,0.45)',
          letterSpacing: '3px', textTransform: 'uppercase',
        }}>
          Own the business, Track the ticker.
        </div>
      </div>
    ),
    { ...size }
  )
}
