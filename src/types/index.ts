// ─── Database row types ───────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  created_at: string
  push_token: string | null
  timezone: string
  onesignal_player_id: string | null
}

export interface Stock {
  ticker: string
  name: string
  exchange: string
  sector: string
  shop_story_json: ShopStory | null
  revenue_streams_json: RevenueStream[] | null
  updated_at: string
}

export interface Thesis {
  id: string
  user_id: string
  ticker: string
  reasons_json: ThesisReason[]
  created_at: string
}

export interface Digest {
  id: string
  user_id: string
  date: string
  payload: DigestPayload
  generated_at: string | null
  sent_at: string | null
}

export interface Feedback {
  id: string
  user_id: string
  digest_id: string
  story_index: number
  rating: 'useful' | 'noise' | 'knew'
  note: string | null
  created_at: string
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface ThesisReason {
  id: string
  claim: string
  measure: string
  target: string
  strength: 'core' | 'supporting' | 'speculative'
  status: 'holding' | 'wobbling' | 'broken'
  actual?: string
  verdict?: string
  accepted: boolean
}

export interface ShopStory {
  headline: string
  lede: string
  body: string
  metrics: TranslationPair[]
  source_updated: string
}

export interface TranslationPair {
  label: string
  value: string
  translation: string
}

export interface RevenueStream {
  name: string
  percentage: number
  description: string
}

// ─── LLM output types ─────────────────────────────────────────────────────────

export interface PortfolioStory {
  kind: 'your-portfolio'
  weight: 'alarm' | 'heads-up' | 'tailwind' | 'quiet'
  headline: string
  affects: { ticker: string; status: 'holding' | 'wobbling' | 'broken-already' }[]
  shop_voice: string
  thesis_reason_id?: string
  price_vs_story?: {
    ticker: string
    story: 'holding' | 'wobbling' | 'broken'
    since: string
    pricePct: number
    reading: string
  }
  sources: string[]
}

export interface MarinationStory {
  kind: 'marinate'
  label: string
  headline: string
  body: string
  why_care: string
  sources: string[]
}

export type Story = PortfolioStory | MarinationStory

export interface DigestPayload {
  portfolio_stories: PortfolioStory[]
  marination_stories: MarinationStory[]
  recap?: WeeklyRecap
}

export interface WeeklyRecap {
  useful_count: number
  total_count: number
  changes: string[]
}

// ─── NSE India — 10 launch stocks ────────────────────────────────────────────
// Hand-picked: mix of consumer, bank, tech, pharma, FMCG, energy, auto
// Familiar to a typical urban Indian retail investor

export const LAUNCH_STOCKS: Pick<Stock, 'ticker' | 'name' | 'exchange' | 'sector'>[] = [
  { ticker: 'RELIANCE', name: 'Reliance Industries',      exchange: 'NSE', sector: 'Conglomerate' },
  { ticker: 'HDFCBANK',  name: 'HDFC Bank',               exchange: 'NSE', sector: 'Banking' },
  { ticker: 'TCS',       name: 'Tata Consultancy Services',exchange: 'NSE', sector: 'IT Services' },
  { ticker: 'INFY',      name: 'Infosys',                  exchange: 'NSE', sector: 'IT Services' },
  { ticker: 'HINDUNILVR',name: 'Hindustan Unilever',       exchange: 'NSE', sector: 'FMCG' },
  { ticker: 'ONGC',      name: 'ONGC',                     exchange: 'NSE', sector: 'Energy' },
  { ticker: 'SUNPHARMA', name: 'Sun Pharmaceutical',       exchange: 'NSE', sector: 'Pharma' },
  { ticker: 'MARUTI',    name: 'Maruti Suzuki',            exchange: 'NSE', sector: 'Auto' },
  { ticker: 'BAJFINANCE',name: 'Bajaj Finance',            exchange: 'NSE', sector: 'NBFC' },
  { ticker: 'WIPRO',     name: 'Wipro',                    exchange: 'NSE', sector: 'IT Services' },
]
