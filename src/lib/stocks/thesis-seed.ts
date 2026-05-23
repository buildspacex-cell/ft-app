// Pre-written thesis reasons for all 10 NSE launch stocks.
// Shared between /onboarding and /stocks/[ticker]
// Each reason includes: claim (plain English), measure (what to track), target (what "holding" means)

export interface SeedReason {
  id: string
  claim: string
  measure: string
  target: string
  strength: 'core' | 'supporting' | 'speculative'
}

export const THESIS_REASONS: Record<string, SeedReason[]> = {
  RELIANCE: [
    { id: 'jio-pricing', claim: 'Jio has pricing power — once you\'re on their network, you pay more without switching', measure: 'Jio ARPU QoQ', target: 'ARPU growing, churn below 2%', strength: 'core' },
    { id: 'retail-growth', claim: 'Reliance Retail is the largest retailer in India — physical footprint no competitor can replicate fast', measure: 'Retail revenue growth YoY', target: '≥ 15% YoY growth', strength: 'core' },
    { id: 'new-energy', claim: 'Green energy bet — ₹75,000 crore committed to solar and hydrogen over 5 years', measure: 'New energy capex vs stated plan', target: 'Capex on track annually', strength: 'speculative' },
  ],
  HDFCBANK: [
    { id: 'npa-quality', claim: 'Best-in-class loan quality — their NPA is consistently lower than every peer', measure: 'Net NPA ratio vs sector avg', target: 'Net NPA ≤ 0.5%, below sector avg', strength: 'core' },
    { id: 'casa-ratio', claim: 'Low-cost deposits — 40%+ from current and savings accounts, keeping cost of funds low', measure: 'CASA ratio QoQ', target: 'CASA ≥ 38%', strength: 'core' },
    { id: 'branch-moat', claim: '8,000+ branches across India — physical reach neo-banks cannot replicate in a decade', measure: 'Branch count growth + loan growth', target: 'Loan growth ≥ 14% YoY', strength: 'supporting' },
  ],
  TCS: [
    { id: 'us-bfsi', claim: 'US banking and financial services is their biggest revenue engine — when Wall Street spends on IT, TCS wins', measure: 'BFSI vertical revenue growth YoY', target: 'BFSI growth ≥ 8% YoY', strength: 'core' },
    { id: 'attrition', claim: 'Falling attrition restores margins — at peak they were losing 21% of staff; back to normal means less training cost', measure: 'Quarterly attrition rate', target: 'Attrition ≤ 12%', strength: 'supporting' },
    { id: 'deal-wins', claim: 'Large AI transformation deals that only TCS and Infosys can execute at scale', measure: 'Deal TCV QoQ', target: 'Deal TCV ≥ $9B per quarter', strength: 'core' },
  ],
  INFY: [
    { id: 'cobalt-platform', claim: 'Cobalt cloud platform gives Infosys sticky revenue — clients who migrate onto it rarely leave', measure: 'Cloud segment revenue growth', target: 'Cloud growing ≥ 20% YoY', strength: 'core' },
    { id: 'margin-expansion', claim: 'Operating margins have room to expand as offshore mix increases and attrition normalises', measure: 'EBIT margin QoQ', target: 'EBIT margin ≥ 20%', strength: 'supporting' },
    { id: 'europe-diversification', claim: 'Strong European client base diversifies away from US macro risk', measure: 'Europe revenue share', target: 'Europe ≥ 25% of total revenue', strength: 'speculative' },
  ],
  HINDUNILVR: [
    { id: 'rural-recovery', claim: 'Rural India is recovering — HUL\'s mass-market products are first to benefit when rural wages rise', measure: 'Rural volume growth vs urban', target: 'Rural volume growth ≥ urban', strength: 'core' },
    { id: 'premiumisation', claim: 'Premium product mix is growing — people trading up from Lifebuoy to Dove is structural', measure: 'Premium segment revenue share', target: 'Premium share growing QoQ', strength: 'supporting' },
    { id: 'distribution', claim: 'Reaches 8 million retail outlets — distribution built over 90 years that no startup can replicate', measure: 'Direct reach expansion', target: 'Direct reach ≥ 3.5M outlets', strength: 'core' },
  ],
  ONGC: [
    { id: 'crude-price', claim: 'Every $10 rise in crude oil prices adds ~₹5,000 crore to ONGC\'s profit', measure: 'Brent crude price vs ONGC netback', target: 'Brent ≥ $70/bbl for profitability', strength: 'core' },
    { id: 'domestic-production', claim: 'Domestic production volumes stabilising after years of natural decline at ageing fields', measure: 'Domestic oil production volumes', target: 'Production ≥ 20 MMT per year', strength: 'supporting' },
    { id: 'govt-dividend', claim: 'PSU with consistent dividend payout — government needs the cash, so they pay', measure: 'Dividend yield vs sector', target: 'Dividend yield ≥ 4%', strength: 'supporting' },
  ],
  SUNPHARMA: [
    { id: 'us-specialty', claim: 'US specialty pharma is the growth engine — Ilumya and Cequa are carving real market share', measure: 'US specialty revenue growth', target: 'US specialty growing ≥ 20% YoY', strength: 'core' },
    { id: 'india-branded', claim: 'India branded generics has pricing power — doctors ask for Sun by name, not the generic', measure: 'India branded growth vs IPM', target: 'India branded growing above IPM', strength: 'core' },
    { id: 'rd-pipeline', claim: 'Strongest R&D pipeline among Indian pharma — more novel drug candidates than any peer', measure: 'NDA/ANDA filings per year', target: 'R&D spend ≥ 7% of revenue', strength: 'supporting' },
  ],
  MARUTI: [
    { id: 'dealer-moat', claim: 'Dealer network moat — 4,000+ outlets that Tata and Hyundai cannot replicate in 5 years', measure: 'Dealer count vs competition', target: 'Market share ≥ 40%', strength: 'core' },
    { id: 'rural-penetration', claim: 'Rural and Tier 3 market penetration — the car brand Indians in small towns buy first', measure: 'Rural sales as % of total', target: 'Rural sales ≥ 40% of total', strength: 'supporting' },
    { id: 'suv-pivot', claim: 'SUV pivot is working — Brezza, Grand Vitara, Jimny are recovering lost share', measure: 'SUV market share QoQ', target: 'SUV share ≥ 20% of segment', strength: 'supporting' },
  ],
  BAJFINANCE: [
    { id: 'cross-sell', claim: 'Best cross-sell engine in Indian finance — average customer holds 5+ products', measure: 'Products per customer', target: 'Products per customer ≥ 5', strength: 'core' },
    { id: 'aum-growth', claim: 'AUM growing 25%+ YoY consistently for a decade — rare compounding at scale', measure: 'AUM growth YoY', target: 'AUM growing ≥ 22% YoY', strength: 'core' },
    { id: 'digital-first', claim: 'App-first lending reduces branch cost and reaches younger borrowers with thin credit files', measure: 'Digital disbursals as % of total', target: 'Digital disbursals ≥ 60% of total', strength: 'supporting' },
  ],
  WIPRO: [
    { id: 'europe-recovery', claim: 'Europe business recovery — transformation deals are returning as IT budgets unfreeze', measure: 'Europe revenue growth QoQ', target: 'Europe growing ≥ 5% QoQ', strength: 'core' },
    { id: 'restructure', claim: 'New management restructuring — four-segment re-org is showing early margin improvement', measure: 'EBIT margin trend', target: 'EBIT margin ≥ 17%', strength: 'supporting' },
    { id: 'consulting-premium', claim: 'Consulting-led deals command higher margins — differentiation from pure staff augmentation', measure: 'Consulting revenue as % of total', target: 'Consulting revenue growing faster than total', strength: 'speculative' },
  ],
}
