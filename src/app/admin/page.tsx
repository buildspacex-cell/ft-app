import { createServiceClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

interface WaitlistRow {
  id: string
  email: string
  source: string | null
  created_at: string
  stock_interest: string | null
  wish_text: string | null
  phone: string | null
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ft-admin-2026'

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get('ft-admin-auth')?.value === ADMIN_PASSWORD
}

async function getSignups(): Promise<WaitlistRow[]> {
  const db = createServiceClient()
  const { data } = await db.from('waitlist').select('*').order('created_at', { ascending: false })
  return data || []
}

function getStats(rows: WaitlistRow[]) {
  const total = rows.length
  const india = rows.filter(r => r.source?.includes('landing-in')).length
  const us = rows.filter(r => r.source?.includes('landing-us')).length
  const hasStock = rows.filter(r => r.stock_interest).length
  const hasWish = rows.filter(r => r.wish_text).length
  const hasPhone = rows.filter(r => r.phone).length

  const byDay: Record<string, number> = {}
  rows.forEach(r => { const d = r.created_at.slice(0, 10); byDay[d] = (byDay[d] || 0) + 1 })
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (13 - i))
    const key = d.toISOString().slice(0, 10)
    return { date: key, count: byDay[key] || 0 }
  })

  const stockCounts: Record<string, number> = {}
  rows.forEach(r => { if (r.stock_interest) { const s = r.stock_interest.trim().toUpperCase(); stockCounts[s] = (stockCounts[s] || 0) + 1 } })
  const topStocks = Object.entries(stockCounts).sort((a, b) => b[1] - a[1]).slice(0, 12)

  const sources: Record<string, number> = {}
  rows.forEach(r => { const s = r.source || 'unknown'; sources[s] = (sources[s] || 0) + 1 })

  return { total, india, us, last14, topStocks, sources, hasStock, hasWish, hasPhone }
}

const CSS = `
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,system-ui,sans-serif;background:#f6f3ec;color:#171717;-webkit-font-smoothing:antialiased}
  .topbar{background:#171717;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}
  .tl{display:flex;align-items:center;gap:10px}
  .tl-badge{width:26px;height:26px;border-radius:7px;overflow:hidden;display:flex;flex-shrink:0}
  .tl-l{width:13px;height:26px;background:#f6f3ec}.tl-r{width:13px;height:26px;background:#d97757}
  .tl-name{font-size:13px;font-weight:700;color:rgba(246,243,236,.9)}
  .tl-sub{font-size:11px;color:rgba(246,243,236,.3);font-family:monospace;letter-spacing:.06em}
  .logout-btn{background:none;border:1px solid rgba(246,243,236,.15);border-radius:6px;padding:6px 12px;font-size:12px;color:rgba(246,243,236,.4);cursor:pointer}
  .wrap{max-width:1100px;margin:0 auto;padding:32px 24px}
  h2{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#777068;margin-bottom:14px;margin-top:32px}
  h2:first-child{margin-top:0}
  .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
  .stat{background:#fff;border:1px solid #ddd4c6;border-radius:14px;padding:16px}
  .stat-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#777068;margin-bottom:6px}
  .stat-val{font-size:30px;font-weight:800;letter-spacing:-.04em;color:#171717}
  .stat-sub{font-size:11px;color:#b0a899;margin-top:3px}
  .card{background:#fff;border:1px solid #ddd4c6;border-radius:14px;padding:20px;margin-top:12px}
  .spark{display:flex;align-items:flex-end;gap:3px;height:56px}
  .bar{flex:1;background:#d97757;border-radius:2px 2px 0 0;min-height:2px}
  .bar-labels{display:flex;gap:3px;margin-top:6px}
  .bar-label{flex:1;font-size:9px;color:#b0a899;text-align:center;overflow:hidden}
  .prog-wrap{background:#f0ebe3;border-radius:8px;height:10px;overflow:hidden;margin-top:8px}
  .prog-fill{height:100%;background:#d97757;border-radius:8px}
  .prog-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px}
  .funnel-row{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f0ebe3}
  .funnel-row:last-child{border:none}
  .f-label{font-size:13px;font-weight:600;color:#393632;width:100px;flex-shrink:0}
  .f-track{flex:1;background:#f0ebe3;border-radius:6px;height:8px;overflow:hidden}
  .f-fill{height:100%;background:#d97757;border-radius:6px}
  .f-num{font-family:monospace;font-size:13px;font-weight:700;color:#171717;width:36px;text-align:right}
  .f-pct{font-size:11px;color:#b0a899;width:36px;text-align:right}
  .stock-grid{display:flex;flex-wrap:wrap;gap:7px}
  .stock-tag{background:#f0ebe3;border:1px solid #ddd4c6;border-radius:8px;padding:5px 11px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px}
  .stock-n{font-family:monospace;font-size:11px;font-weight:700;color:#d97757}
  .src-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0ebe3;font-size:13px}
  .src-row:last-child{border:none}
  .src-key{font-family:monospace;color:#777068;font-size:12px}
  .wish-row{padding:12px 0;border-bottom:1px solid #f0ebe3}
  .wish-row:last-child{border:none}
  .wish-q{font-size:14px;color:#393632;line-height:1.55;margin-bottom:4px}
  .wish-meta{font-size:11px;color:#b0a899;font-family:monospace}
  .wish-stock{color:#d97757;font-weight:700}
  .table-wrap{overflow-x:auto}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#777068;padding:8px 12px;text-align:left;border-bottom:2px solid #eee7da;white-space:nowrap}
  td{padding:9px 12px;border-bottom:1px solid #f0ebe3;color:#393632;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  tr:hover td{background:#faf8f4}
  .b-in{background:#e7efe2;color:#5b7a55;font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;font-family:monospace}
  .b-us{background:#f1e3bd;color:#b88828;font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;font-family:monospace}
  .empty{color:#b0a899;font-size:13px;padding:16px 0}
  /* Login */
  .login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#111}
  .login-card{background:#1a1a1a;border:1px solid rgba(246,243,236,.1);border-radius:16px;padding:40px;width:320px}
  .login-logo{display:flex;align-items:center;gap:10px;margin-bottom:28px}
  .login-badge{width:28px;height:28px;border-radius:7px;overflow:hidden;display:flex;flex-shrink:0}
  .login-title{font-size:14px;font-weight:700;color:rgba(246,243,236,.9)}
  label{display:block;font-size:11px;font-weight:700;color:rgba(246,243,236,.4);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px}
  input[type=password]{width:100%;padding:10px 14px;background:rgba(246,243,236,.06);border:1px solid rgba(246,243,236,.12);border-radius:10px;font-size:14px;color:#f6f3ec;outline:none;margin-bottom:20px}
  .login-btn{width:100%;padding:12px;background:#d97757;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer}
`

export default async function AdminPage() {
  const authed = await isAuthenticated()

  if (!authed) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="login-wrap">
          <div className="login-card">
            <div className="login-logo">
              <div className="login-badge">
                <div className="tl-l" /><div className="tl-r" />
              </div>
              <span className="login-title">FT Admin</span>
            </div>
            <form action="/api/admin" method="POST">
              <label>Password</label>
              <input type="password" name="password" autoFocus placeholder="••••••••" />
              <button className="login-btn" type="submit">Enter</button>
            </form>
          </div>
        </div>
      </>
    )
  }

  const rows = await getSignups()
  const s = getStats(rows)
  const maxDay = Math.max(...s.last14.map(d => d.count), 1)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Topbar */}
      <div className="topbar">
        <div className="tl">
          <div className="tl-badge"><div className="tl-l" /><div className="tl-r" /></div>
          <span className="tl-name">Fundamentally True</span>
          <span className="tl-sub">· ADMIN</span>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button className="logout-btn" type="submit">Sign out</button>
        </form>
      </div>

      <div className="wrap">

        {/* Stats */}
        <h2>Overview</h2>
        <div className="stat-grid">
          {[
            { label: 'Total', val: s.total, sub: 'of 2,000 target' },
            { label: 'India', val: s.india, sub: `${s.total ? Math.round(s.india/s.total*100) : 0}% of total` },
            { label: 'US', val: s.us, sub: `${s.total ? Math.round(s.us/s.total*100) : 0}% of total` },
            { label: 'Gave stock', val: s.hasStock, sub: `${s.total ? Math.round(s.hasStock/s.total*100) : 0}% completion` },
            { label: 'Gave wish', val: s.hasWish, sub: `${s.total ? Math.round(s.hasWish/s.total*100) : 0}% completion` },
            { label: 'Gave phone', val: s.hasPhone, sub: `${s.total ? Math.round(s.hasPhone/s.total*100) : 0}% completion` },
          ].map(({ label, val, sub }) => (
            <div key={label} className="stat">
              <div className="stat-label">{label}</div>
              <div className="stat-val">{val}</div>
              <div className="stat-sub">{sub}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="card">
          <div className="prog-row">
            <span style={{ fontSize: 13, fontWeight: 600 }}>Progress to 2,000</span>
            <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#d97757' }}>{Math.round(s.total / 20)}%</span>
          </div>
          <div className="prog-wrap">
            <div className="prog-fill" style={{ width: `${Math.min(s.total / 20, 100)}%` }} />
          </div>
        </div>

        {/* Daily chart */}
        <h2>Signups — last 14 days</h2>
        <div className="card">
          <div className="spark">
            {s.last14.map(d => (
              <div key={d.date} className="bar" style={{ height: `${Math.max(d.count / maxDay * 100, 3)}%` }} title={`${d.date}: ${d.count}`} />
            ))}
          </div>
          <div className="bar-labels">
            {s.last14.map((d, i) => (
              <div key={d.date} className="bar-label">{i % 2 === 0 ? d.date.slice(5) : ''}</div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <h2>Signup funnel</h2>
        <div className="card">
          {[
            { label: 'Email', count: s.total },
            { label: 'Stock', count: s.hasStock },
            { label: 'Wish text', count: s.hasWish },
            { label: 'Phone', count: s.hasPhone },
          ].map(({ label, count }) => (
            <div key={label} className="funnel-row">
              <span className="f-label">{label}</span>
              <div className="f-track"><div className="f-fill" style={{ width: `${s.total ? count / s.total * 100 : 0}%` }} /></div>
              <span className="f-num">{count}</span>
              <span className="f-pct">{s.total ? Math.round(count / s.total * 100) : 0}%</span>
            </div>
          ))}
        </div>

        {/* Top stocks */}
        <h2>Most-named stocks</h2>
        <div className="card">
          {s.topStocks.length === 0
            ? <span className="empty">No stock data yet</span>
            : <div className="stock-grid">
              {s.topStocks.map(([stock, count]) => (
                <div key={stock} className="stock-tag">{stock}<span className="stock-n">{count}</span></div>
              ))}
            </div>
          }
        </div>

        {/* Sources */}
        <h2>By source</h2>
        <div className="card">
          {Object.keys(s.sources).length === 0
            ? <span className="empty">No data yet</span>
            : Object.entries(s.sources).sort((a, b) => b[1] - a[1]).map(([src, count]) => (
              <div key={src} className="src-row">
                <span className="src-key">{src}</span>
                <span style={{ fontWeight: 700 }}>{count}</span>
              </div>
            ))
          }
        </div>

        {/* Wish feed */}
        <h2>What they wish they understood ({rows.filter(r => r.wish_text).length} answers)</h2>
        <div className="card">
          {rows.filter(r => r.wish_text).length === 0
            ? <span className="empty">No wish text yet — this is the good stuff, it&apos;ll appear here</span>
            : rows.filter(r => r.wish_text).map(r => (
              <div key={r.id} className="wish-row">
                <div className="wish-q">&ldquo;{r.wish_text}&rdquo;</div>
                <div className="wish-meta">
                  {new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  {r.stock_interest && <> · <span className="wish-stock">{r.stock_interest}</span></>}
                  {' · '}{r.source?.includes('us') ? 'US' : 'India'}
                </div>
              </div>
            ))
          }
        </div>

        {/* Full table */}
        <h2>All signups ({rows.length})</h2>
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>Email</th><th>Market</th><th>Stock</th><th>Wish text</th><th>Phone</th><th>Source</th><th>Signed up</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0
                ? <tr><td colSpan={7} style={{ textAlign: 'center', color: '#b0a899', padding: 32 }}>No signups yet</td></tr>
                : rows.map(r => (
                  <tr key={r.id}>
                    <td>{r.email}</td>
                    <td><span className={r.source?.includes('us') ? 'b-us' : 'b-in'}>{r.source?.includes('us') ? 'US' : 'IN'}</span></td>
                    <td>{r.stock_interest || '—'}</td>
                    <td title={r.wish_text || ''}>{r.wish_text || '—'}</td>
                    <td>{r.phone || '—'}</td>
                    <td>{r.source?.replace('landing-', '') || '—'}</td>
                    <td>{new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}
