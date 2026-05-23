import { LAUNCH_STOCKS } from '@/types'

const NSE_TICKERS = LAUNCH_STOCKS.map(s => s.ticker)
const NSE_COMPANY_NAMES = LAUNCH_STOCKS.map(s => s.name)

// NewsAPI: free tier gives 100 req/day, paid gives 500/day
// We call this at 5:30am IST, 30 min before digest build

interface NewsArticle {
  headline: string
  body: string
  url: string
  source: string
  publishedAt: string
}

export async function fetchNSENews(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) throw new Error('NEWS_API_KEY not set')

  // Query 1: company name searches for our 10 stocks
  const queries = [
    'RELIANCE OR "HDFC Bank" OR TCS OR Infosys OR "Hindustan Unilever"',
    'ONGC OR "Sun Pharma" OR Maruti OR "Bajaj Finance" OR Wipro',
    'NSE OR "Nifty 50" OR BSE OR RBI OR SEBI',
  ]

  const allArticles: NewsArticle[] = []

  for (const q of queries) {
    const url = new URL('https://newsapi.org/v2/everything')
    url.searchParams.set('q', q)
    url.searchParams.set('language', 'en')
    url.searchParams.set('sortBy', 'publishedAt')
    url.searchParams.set('pageSize', '20')
    url.searchParams.set('from', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    url.searchParams.set('apiKey', apiKey)

    try {
      const res = await fetch(url.toString())
      const data = await res.json()

      if (data.articles) {
        allArticles.push(
          ...data.articles.map((a: any) => ({
            headline: a.title || '',
            body: a.description || a.content || a.title || '',
            url: a.url,
            source: a.source?.name || '',
            publishedAt: a.publishedAt,
          }))
        )
      }
    } catch (err) {
      console.error('NewsAPI fetch error:', err)
    }
  }

  // Deduplicate by URL
  const seen = new Set<string>()
  return allArticles.filter(a => {
    if (seen.has(a.url)) return false
    seen.add(a.url)
    return true
  })
}

// Finnhub: earnings calendar and basic stock data
export async function fetchEarningsCalendar(): Promise<{ ticker: string; date: string; time: string }[]> {
  const apiKey = process.env.FINNHUB_API_KEY
  if (!apiKey) return []

  const from = new Date().toISOString().split('T')[0]
  const to = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/calendar/earnings?from=${from}&to=${to}&token=${apiKey}`
    )
    const data = await res.json()
    return (data.earningsCalendar || [])
      .filter((e: any) => NSE_TICKERS.includes(e.symbol?.replace('.NS', '')))
      .map((e: any) => ({
        ticker: e.symbol.replace('.NS', ''),
        date: e.date,
        time: e.hour,
      }))
  } catch {
    return []
  }
}

// Pick 2 marination articles (wider world — IPOs, macro, RBI events)
export async function fetchMarinationArticles(): Promise<
  { body: string; url: string; isPhrase: boolean }[]
> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return []

  const marinationQueries = [
    { q: 'RBI "repo rate" OR "inflation" OR "monetary policy" India', isPhrase: true },
    { q: 'IPO India OR "quarterly results" OR "merger acquisition" India OR "Sensex"', isPhrase: false },
  ]

  const results = []

  for (const { q, isPhrase } of marinationQueries) {
    const url = new URL('https://newsapi.org/v2/everything')
    url.searchParams.set('q', q)
    url.searchParams.set('language', 'en')
    url.searchParams.set('sortBy', 'publishedAt')
    url.searchParams.set('pageSize', '3')
    url.searchParams.set('apiKey', apiKey)

    try {
      const res = await fetch(url.toString())
      const data = await res.json()
      const first = data.articles?.[0]
      if (first) {
        results.push({
          body: first.description || first.title,
          url: first.url,
          isPhrase,
        })
      }
    } catch {
      // skip
    }
  }

  return results
}
