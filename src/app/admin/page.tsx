import { createServiceClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers, cookies } from 'next/headers'

// ── Types ─────────────────────────────────────────────────────────────────────
interface WaitlistRow {
  id: string
  email: string
  source: string | null
  created_at: string
  stock_interest: string | null
  wish_text: string | null
  phone: string | null
}

// ── Auth helper ───────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ft-admin-2026'

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get('ft-admin-auth')?.value === ADMIN_PASSWORD
}

// ── Data fetchers ─────────────────────────────────────────────────────────────
async function getSignups(): Promise<WaitlistRow[]> {
  const db = createServiceClient()
  const { data, error } = await db
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('[admin] fetch error:', error)
    return []
  }
  return data || []
}

function getStats(rows: WaitlistRow[]) {
  // Total
  const total = rows.length
  const india = rows.filter(r => r.source?.includes('landing-in')).length
  const us = rows.filter(r => r.source?.includes('landing-us')).length

  // Signups by day (last 14 days)
  const byDay: Record<string, number> = {}
  rows.forEach(r => {
    const day = r.created_at.slice(0, 10)
    byDay[day] = (byDay[day] || 0) + 1
  })
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    const key = d.toISOString().slice(0, 10)
    return { date: key, count: byDay[key] || 0 }
  })

  // Top stocks
  const stockCounts: Record<string, number> = {}
  rows.forEach(r => {
    if (r.stock_interest) {
      const s = r.stock_interest.trim().toUpperCase()
      stockCounts[s] = (stockCounts[s] || 0) + 1
    }
  })
  const topStocks = Object.entries(stockCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)

  // Source breakdown
  const sources: Record<string, number> = {}
  rows.forEach(r => {
    const s = r.source || 'unknown'
    sources[s] = (sources[s] || 0) + 1
  })

  // Completion funnel — how many gave each field
  const hasStock = rows.filter(r => r.stock_interest).length
  const hasWish = rows.filter(r => r.wish_text).length
  const hasPhone = rows.filter(r => r.phone).length

  return { total, india, us, last14, topStocks, sources, hasStock, hasWish, hasPhone }
}

// ── Login page ─────────────────────────────────────────────────────────────────
function LoginPage() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FT Admin</title>
        <style>{`
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:system-ui,sans-serif;background:#111;min-height:100vh;display:flex;align-items:center;justify-content:center}
          .card{background:#1a1a1a;border:1px solid rgba(246,243,236,.1);border-radius:16px;padding:40px;width:340px}
          .logo{display:flex;align-items:center;gap:10px;margin-bottom:32px}
          .badge{width:32px;height:32px;border-radius:8px;background:#d97757;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff}
          .name{font-size:14px;font-weight:700;color:rgba(246,243,236,.9);letter-spacing:-.01em}
          label{display:block;font-size:12px;font-weight:600;color:rgba(246,243,236,.5);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}
          input{width:100%;padding:10px 14px;background:rgba(246,243,236,.06);border:1px solid rgba(246,243,236,.12);border-radius:10px;font-size:14px;color:#f6f3ec;outline:none;margin-bottom:20px}
          button{width:100%;padding:12px;background:#d97757;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer}
        `}</style>
      </head>
      <body>
        <div className="card">
          <div className="logo">
            <div className="badge">FT</div>
            <span className="name">Admin Dashboard</span>
          </div>
          <form action="/api/admin" method="POST">
            <label>Password</label>
            <input type="password" name="password" autoFocus placeholder="••••••••" />
            <button type="submit">Enter</button>
          </form>
        </div>
      </body>
    </html>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const isAuthed = await isAuthenticated()

  if (!isAuthed) {
    return <LoginPage />
  }

  const rows = await getSignups()
  const stats = getStats(rows)
  const maxDay = Math.max(...stats.last14.map(d => d.count), 1)

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FT Admin — {stats.total} signups</title>
        <style>{`
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:-apple-system,system-ui,sans-serif;background:#f6f3ec;color:#171717;-webkit-font-smoothing:antialiased}
          .topbar{background:#171717;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}
          .topbar-left{display:flex;align-items:center;gap:10px}
          .tl-badge{width:26px;height:26px;border-radius:7px;overflow:hidden;display:flex}
          .tl-half-l{width:13px;height:26px;background:#f6f3ec}
          .tl-half-r{width:13px;height:26px;background:#d97757}
          .tl-name{font-size:13px;font-weight:700;color:rgba(246,243,236,.9);letter-spacing:-.01em}
          .tl-sub{font-family:monospace;font-size:11px;color:rgba(246,243,236,.35);letter-spacing:.06em}
          .logout{font-size:12px;color:rgba(246,243,236,.4);text-decoration:none;padding:6px 12px;border:1px solid rgba(246,243,236,.15);border-radius:6px}
          .wrap{max-width:1100px;margin:0 auto;padding:32px 24px}
          h2{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#777068;margin-bottom:14px;margin-top:32px}
          h2:first-child{margin-top:0}
          .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:8px}
          .stat{background:#fff;border:1px solid #ddd4c6;border-radius:14px;padding:16px}
          .stat-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#777068;margin-bottom:6px}
          .stat-val{font-size:32px;font-weight:800;letter-spacing:-.04em;color:#171717}
          .stat-sub{font-size:12px;color:#b0a899;margin-top:3px}
          .card{background:#fff;border:1px solid #ddd4c6;border-radius:14px;padding:20px;margin-bottom:12px}
          /* Spark chart */
          .spark{display:flex;align-items:flex-end;gap:4px;height:60px}
          .spark-bar{flex:1;background:#d97757;border-radius:3px 3px 0 0;min-height:2px;transition:height .2s}
          .spark-labels{display:flex;gap:4px;margin-top:6px}
          .spark-label{flex:1;font-size:9px;color:#b0a899;text-align:center;white-space:nowrap;overflow:hidden}
          /* Funnel */
          .funnel-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #eee7da}
          .funnel-row:last-child{border:none}
          .funnel-label{font-size:13px;font-weight:600;color:#393632;width:120px;flex-shrink:0}
          .funnel-bar-wrap{flex:1;background:#f0ebe3;border-radius:6px;height:10px;overflow:hidden}
          .funnel-bar{height:100%;background:#d97757;border-radius:6px}
          .funnel-num{font-family:monospace;font-size:13px;font-weight:700;color:#171717;width:40px;text-align:right}
          .funnel-pct{font-size:11px;color:#b0a899;width:40px;text-align:right}
          /* Stocks */
          .stock-grid{display:flex;flex-wrap:wrap;gap:8px}
          .stock-tag{background:#f0ebe3;border:1px solid #ddd4c6;border-radius:8px;padding:6px 12px;font-size:13px;font-weight:600;color:#171717;display:flex;align-items:center;gap:6px}
          .stock-count{font-size:11px;font-weight:700;color:#d97757;font-family:monospace}
          /* Source */
          .source-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee7da;font-size:13px}
          .source-row:last-child{border:none}
          .source-key{font-family:monospace;color:#777068;font-size:12px}
          .source-val{font-weight:700;color:#171717}
          /* Wish feed */
          .wish-row{padding:12px 0;border-bottom:1px solid #eee7da}
          .wish-row:last-child{border:none}
          .wish-text{font-size:14px;color:#393632;line-height:1.5;margin-bottom:4px}
          .wish-meta{font-size:11px;color:#b0a899;font-family:monospace}
          .wish-stock{color:#d97757;font-weight:700}
          /* Table */
          .table-wrap{overflow-x:auto}
          table{width:100%;border-collapse:collapse;font-size:13px}
          th{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#777068;padding:8px 12px;text-align:left;border-bottom:2px solid #eee7da;white-space:nowrap}
          td{padding:9px 12px;border-bottom:1px solid #f0ebe3;color:#393632;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
          tr:hover td{background:#faf8f4}
          .badge-in{background:#e7efe2;color:#5b7a55;font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;font-family:monospace}
          .badge-us{background:#f1e3bd;color:#b88828;font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;font-family:monospace}
          .badge-o{background:#f0ebe3;color:#777068;font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;font-family:monospace}
        `}</style>
      </head>
      <body>
        <div className="topbar">
          <div className="topbar-left">
            <div className="tl-badge">
              <div className="tl-half-l"/>
              <div className="tl-half-r"/>
            </div>
            <span className="tl-name">Fundamentally True</span>
            <span className="tl-sub">· ADMIN · EARLY ACCESS</span>
          </div>
          <form action="/api/admin/logout" method="POST" style={{display:"inline"}}><button type="submit" style={{background:"none",border:"1px solid rgba(246,243,236,.15)",borderRadius:6,padding:"6px 12px",fontSize:12,color:"rgba(246,243,236,.4)",cursor:"pointer"}}>Sign out</button></form>
        </div>

        <div className="wrap">

          {/* ── Stats ── */}
          <h2>Overview</h2>
          <div className="stat-grid">
            <div className="stat">
              <div className="stat-label">Total signups</div>
              <div className="stat-val">{stats.total}</div>
              <div className="stat-sub">of 2,000 target</div>
            </div>
            <div className="stat">
              <div className="stat-label">India (NSE)</div>
              <div className="stat-val">{stats.india}</div>
              <div className="stat-sub">{stats.total ? Math.round(stats.india/stats.total*100) : 0}% of total</div>
            </div>
            <div className="stat">
              <div className="stat-label">US</div>
              <div className="stat-val">{stats.us}</div>
              <div className="stat-sub">{stats.total ? Math.round(stats.us/stats.total*100) : 0}% of total</div>
            </div>
            <div className="stat">
              <div className="stat-label">Gave stock</div>
              <div className="stat-val">{stats.hasStock}</div>
              <div className="stat-sub">{stats.total ? Math.round(stats.hasStock/stats.total*100) : 0}% completion</div>
            </div>
            <div className="stat">
              <div className="stat-label">Gave wish</div>
              <div className="stat-val">{stats.hasWish}</div>
              <div className="stat-sub">{stats.total ? Math.round(stats.hasWish/stats.total*100) : 0}% completion</div>
            </div>
            <div className="stat">
              <div className="stat-label">Gave phone</div>
              <div className="stat-val">{stats.hasPhone}</div>
              <div className="stat-sub">{stats.total ? Math.round(stats.hasPhone/stats.total*100) : 0}% completion</div>
            </div>
          </div>

          {/* ── Progress to 2000 ── */}
          <div className="card" style={{marginTop:12}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
              <span style={{fontSize:13,fontWeight:600,color:'#393632'}}>Progress to 2,000</span>
              <span style={{fontFamily:'monospace',fontSize:13,fontWeight:700,color:'#d97757'}}>{Math.round(stats.total/20)}%</span>
            </div>
            <div style={{background:'#f0ebe3',borderRadius:8,height:12,overflow:'hidden'}}>
              <div style={{height:'100%',background:'#d97757',borderRadius:8,width:`${Math.min(stats.total/20,100)}%`}}/>
            </div>
          </div>

          {/* ── Daily signups ── */}
          <h2>Signups — last 14 days</h2>
          <div className="card">
            <div className="spark">
              {stats.last14.map(d => (
                <div key={d.date} className="spark-bar" style={{height:`${Math.max(d.count/maxDay*100,3)}%`}} title={`${d.date}: ${d.count}`}/>
              ))}
            </div>
            <div className="spark-labels">
              {stats.last14.map((d, i) => (
                <div key={d.date} className="spark-label">
                  {i % 2 === 0 ? d.date.slice(5) : ''}
                </div>
              ))}
            </div>
          </div>

          {/* ── Funnel ── */}
          <h2>Signup funnel</h2>
          <div className="card">
            {[
              { label: 'Email', count: stats.total },
              { label: 'Stock', count: stats.hasStock },
              { label: 'Wish text', count: stats.hasWish },
              { label: 'Phone', count: stats.hasPhone },
            ].map(({ label, count }) => (
              <div key={label} className="funnel-row">
                <span className="funnel-label">{label}</span>
                <div className="funnel-bar-wrap">
                  <div className="funnel-bar" style={{width:`${stats.total ? count/stats.total*100 : 0}%`}}/>
                </div>
                <span className="funnel-num">{count}</span>
                <span className="funnel-pct">{stats.total ? Math.round(count/stats.total*100) : 0}%</span>
              </div>
            ))}
          </div>

          {/* ── Top stocks ── */}
          <h2>Most-named stocks</h2>
          <div className="card">
            <div className="stock-grid">
              {stats.topStocks.length === 0
                ? <span style={{color:'#b0a899',fontSize:13}}>No stock data yet</span>
                : stats.topStocks.map(([stock, count]) => (
                  <div key={stock} className="stock-tag">
                    {stock}
                    <span className="stock-count">{count}</span>
                  </div>
                ))
              }
            </div>
          </div>

          {/* ── Source breakdown ── */}
          <h2>By source</h2>
          <div className="card">
            {Object.entries(stats.sources).sort((a,b)=>b[1]-a[1]).map(([src, count]) => (
              <div key={src} className="source-row">
                <span className="source-key">{src}</span>
                <span className="source-val">{count}</span>
              </div>
            ))}
            {Object.keys(stats.sources).length === 0 && <span style={{color:'#b0a899',fontSize:13}}>No data yet</span>}
          </div>

          {/* ── Wish text feed ── */}
          <h2>What they wish they understood — every answer</h2>
          <div className="card">
            {rows.filter(r => r.wish_text).length === 0
              ? <span style={{color:'#b0a899',fontSize:13}}>No wish text yet</span>
              : rows.filter(r => r.wish_text).map(r => (
                <div key={r.id} className="wish-row">
                  <div className="wish-text">&ldquo;{r.wish_text}&rdquo;</div>
                  <div className="wish-meta">
                    {new Date(r.created_at).toLocaleDateString('en-IN', {day:'numeric',month:'short'})}
                    {r.stock_interest && <> · <span className="wish-stock">{r.stock_interest}</span></>}
                    {' · '}{r.source?.includes('us') ? 'US' : 'India'}
                  </div>
                </div>
              ))
            }
          </div>

          {/* ── Full list ── */}
          <h2>All signups ({rows.length})</h2>
          <div className="card table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Market</th>
                  <th>Stock</th>
                  <th>Phone</th>
                  <th>Source</th>
                  <th>Signed up</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id}>
                    <td>{r.email}</td>
                    <td>
                      <span className={r.source?.includes('us') ? 'badge-us' : r.source?.includes('in') ? 'badge-in' : 'badge-o'}>
                        {r.source?.includes('us') ? 'US' : r.source?.includes('in') ? 'IN' : '?'}
                      </span>
                    </td>
                    <td>{r.stock_interest || '—'}</td>
                    <td>{r.phone || '—'}</td>
                    <td title={r.source || ''}>{r.source?.replace('landing-','') || '—'}</td>
                    <td>{new Date(r.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={6} style={{textAlign:'center',color:'#b0a899',padding:32}}>No signups yet</td></tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </body>
    </html>
  )
}
