'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Stock, Thesis, ThesisReason } from '@/types'
import { THESIS_REASONS as SEED_REASONS } from '@/lib/stocks/thesis-seed'

// ─── Types ────────────────────────────────────────────────────────────────────

type Chapter = 'story' | 'money' | 'thesis'

interface RevenueStream {
  name: string
  percentage: number
  description: string
}

interface StoryParagraph {
  h: string
  body: string
  tx?: { num: string; says: string }
}

// ─── NSE-specific shop stories (hand-written, the highest-value content) ─────

const SHOP_STORIES: Record<string, { lede: string; paragraphs: StoryParagraph[] }> = {
  RELIANCE: {
    lede: "Reliance is the shop at the end of every street in India — and the pipe that brings the internet into your home.",
    paragraphs: [
      { h: "What they do", body: "They refine oil, run the largest retail chain in India (Reliance Retail), and own Jio — the mobile network that gave hundreds of millions of Indians their first smartphone internet. Three completely different businesses, one holding company." },
      { h: "How the money lands", body: "Petrol margins fund everything else. Jio collects ₹180–200 from each subscriber every month — multiply that by 480 million users. Retail takes a small cut on every product sold in their 18,000+ stores.", tx: { num: "Net margin ~8%", says: "₹8 from every ₹100 in sales stays with the company" } },
      { h: "Where the profit goes", body: "Mukesh Ambani announced a ₹75,000 crore green energy bet — solar panels, green hydrogen, battery storage. Whether you believe it pays off in 10 years is a thesis question. The traditional businesses fund the bet.", tx: { num: "FY24 revenue: ₹9.4L crore", says: "roughly the GDP of a medium-sized country" } },
    ],
  },
  HDFCBANK: {
    lede: "HDFC Bank is the bank with the queue outside on salary day — and the NRI counter that's always suspiciously calm.",
    paragraphs: [
      { h: "What they do", body: "They take deposits from people who trust them and lend it out to people who need it — home loans, car loans, business loans, personal loans. The spread between what they pay depositors and what they charge borrowers is their income." },
      { h: "How the money lands", body: "40% of their deposits are low-cost current and savings accounts — people park money there, not for returns but for convenience. That cheap funding lets HDFC lend at higher rates and keep the spread fat.", tx: { num: "Net Interest Margin ~3.5%", says: "for every ₹100 lent, ₹3.50 is their profit after paying depositors" } },
      { h: "The loan quality story", body: "Of every ₹100 they've ever lent, less than 40 paise has gone bad. That's their moat — not just the branches, the discipline. Two decades of not lending to bad credits.", tx: { num: "Net NPA ~0.3%", says: "₹30 in bad loans per ₹10,000 lent — sector average is ₹150" } },
    ],
  },
  TCS: {
    lede: "TCS is the company that keeps the world's banks, airlines, and retailers running — mostly invisibly, from Chennai and Pune.",
    paragraphs: [
      { h: "What they do", body: "They write, maintain, and upgrade the software that large companies run on. When a British bank wants a new app, they hire TCS. When an American retailer's checkout system breaks at Christmas, TCS fixes it.", },
      { h: "How the money lands", body: "600,000 engineers. A client pays TCS per project or per hour of work. The model is simple: hire engineers at ₹8–15 lakh, bill clients at $60–100/hr, keep the middle.", tx: { num: "EBIT margin ~24%", says: "₹24 profit from every ₹100 in revenue — remarkably consistent for 10 years" } },
      { h: "The deal machine", body: "Every quarter they announce 'deal wins' — ₹500 crore, ₹2,000 crore, ₹10,000 crore contracts. These are promises of future revenue. The pipeline is how you see tomorrow.", tx: { num: "Deal TCV Q4 FY24: $13.2B", says: "future work already contracted — roughly 2 quarters of revenue locked" } },
    ],
  },
  INFY: {
    lede: "Infosys taught India's software industry to think in systems — and then built one of the stickiest client relationships in the business.",
    paragraphs: [
      { h: "What they do", body: "Like TCS — IT services for global enterprises. The difference: Infosys bet earlier on cloud and built Cobalt, their proprietary cloud migration platform. Clients who move onto it rarely leave." },
      { h: "How the money lands", body: "Two-thirds of revenue comes from North America. Financial services, manufacturing, and retail are the big spenders. When US companies have budget, Infosys wins. When they freeze, Infosys guides down.", tx: { num: "EBIT margin ~20%", says: "₹20 from every ₹100 — slightly below TCS but improving" } },
      { h: "The Cobalt bet", body: "Moving a bank's entire IT to the cloud takes 3–5 years. Once you start, you can't switch vendors mid-move. That stickiness is what the Cobalt thesis is really about.", tx: { num: "Cloud revenue: growing 30%+ YoY", says: "the fastest-growing piece, and the one clients can't easily walk away from" } },
    ],
  },
  HINDUNILVR: {
    lede: "HUL is the company that gets into your bathroom before you brush your teeth — and stays until after you wash the dishes.",
    paragraphs: [
      { h: "What they do", body: "They make and sell Dove, Lifebuoy, Surf Excel, Rin, Horlicks, Kissan jam, Kwality Wall's ice cream. Roughly half of all Indian homes use at least one HUL product daily. That reach took 90 years to build." },
      { h: "How the money lands", body: "Scale and distribution. When Unilever develops a formula in Rotterdam, HUL manufactures and sells it across 8 million Indian retail outlets — the smallest kirana in the smallest town. No competitor can match that last-mile.", tx: { num: "EBIT margin ~24%", says: "premium for a consumer goods company — reflects pricing power, not just volume" } },
      { h: "The premiumisation story", body: "Someone who started with Lifebuoy trades up to Dove when their income rises. HUL makes both. That's the compounding story — rural recovery lifts the base, income growth lifts the mix.", tx: { num: "Premium portfolio growing at 2x mass", says: "people spending more per unit — better for margins" } },
    ],
  },
  ONGC: {
    lede: "ONGC is the company that has been pulling oil out of the ground under India's oceans for 60 years.",
    paragraphs: [
      { h: "What they do", body: "They explore for and produce crude oil and natural gas — mostly offshore in the Mumbai High fields, partly onshore. They refine some of it themselves (through HPCL, which they own), and sell the rest to refiners." },
      { h: "How the money lands", body: "Mostly crude oil. They produce ~600,000 barrels a day. Every $1 rise in Brent crude adds roughly ₹500 crore to annual profit. This is the single biggest variable in the business.", tx: { num: "Realised crude price ~$80/bbl", says: "their netback after government levies — what they actually keep per barrel" } },
      { h: "The government factor", body: "The government owns 58% of ONGC. That means consistent dividends (government needs the cash), occasional policy risk, and a structural discount vs private peers. The PSU premium is a known trade-off.", tx: { num: "Dividend yield ~4–5%", says: "paid consistently — government ensures it" } },
    ],
  },
  SUNPHARMA: {
    lede: "Sun Pharma started as one man and one product in 1983. Today it's India's most valuable pharmaceutical company.",
    paragraphs: [
      { h: "What they do", body: "They make medicines — generics (copies of off-patent drugs), branded generics (same molecule, their brand), and a growing portfolio of specialty drugs where they own the original research." },
      { h: "How the money lands", body: "India branded generics is the stable engine — doctors prescribe Sun by name. US generics fund growth but are price-competitive and lumpy. US specialty (Ilumya for psoriasis, Cequa for dry eye) is the bet.", tx: { num: "US specialty revenue growing 30%+ YoY", says: "small base, but doctors are adopting — each new prescription is recurring" } },
      { h: "The R&D story", body: "They file more NDAs and ANDAs in the US than any Indian peer. The pipeline is a proxy for future earnings. More novel molecules = more pricing power = more durable margins.", tx: { num: "R&D spend ~7% of revenue", says: "higher than most Indian pharma — the price of the specialty bet" } },
    ],
  },
  MARUTI: {
    lede: "Maruti is still the first car for most Indian families — and the last name they consider when they want a second.",
    paragraphs: [
      { h: "What they do", body: "They design, make, and sell cars across every price point from ₹5 lakh to ₹25 lakh. Alto for the first-time buyer, Baleno for the office-goer, Grand Vitara for the family upgrader. They sold 2.1 million cars last year — more than the next three brands combined." },
      { h: "How the money lands", body: "Volume is the engine. At 2 million cars a year, every ₹500 cut in cost per car is ₹1,000 crore in savings. The service network — Maruti has more workshops than any competitor — adds a second revenue stream.", tx: { num: "EBIT margin ~10%", says: "thin by global standards, but consistent — scale absorbs fixed costs" } },
      { h: "The distribution moat", body: "4,000+ dealerships across India, including Tier 3 and Tier 4 towns where Tata and Hyundai don't have a showroom. That footprint took 40 years. A new entrant can't replicate it in 5.", tx: { num: "Rural sales: 45% of total", says: "no other car brand sells as much outside the top 30 cities" } },
    ],
  },
  BAJFINANCE: {
    lede: "Bajaj Finance is the company that made ₹0 down EMI normal — and got 80 million Indians to borrow from them in the process.",
    paragraphs: [
      { h: "What they do", body: "They lend money for consumer durables, two-wheelers, personal loans, home loans, business loans, and anything else in between. Their customers are urban and semi-urban, income-earning, credit-thin. 86 million customers is a company the size of a medium country." },
      { h: "How the money lands", body: "They borrow at ~7–8% (AA-rated bonds) and lend at 14–22%. The spread, multiplied by ₹3.5 lakh crore of loans outstanding, is the profit engine.", tx: { num: "NIM ~10%", says: "for every ₹100 lent, ₹10 is gross profit before costs and provisions" } },
      { h: "The cross-sell engine", body: "First product: EMI for a TV. Next year: personal loan. Year after: FD. Average customer now holds 5+ products. CAC is paid once; revenue compounds. That's the moat.", tx: { num: "Products per customer: 5.2", says: "each new product is near-zero marginal cost to acquire" } },
    ],
  },
  WIPRO: {
    lede: "Wipro was founded as a vegetable oil company. It became an IT services giant by accident — and is now trying to grow back into relevance.",
    paragraphs: [
      { h: "What they do", body: "IT services — same model as TCS and Infosys. They write code, manage systems, and run digital transformation projects for global enterprises. Historically strongest in Europe and in BFSI clients." },
      { h: "How the money lands", body: "240,000 employees. Revenue per employee is the key metric — it tells you whether you're doing commodity work or consulting work. Wipro has been trying to raise it for 5 years.", tx: { num: "EBIT margin ~16%", says: "lower than TCS (24%) and Infosys (20%) — the gap they're trying to close" } },
      { h: "The turnaround story", body: "Thierry Delaporte restructured the company into four strategic business units. Rishad Premji has been more direct: grow or get out. The thesis question is whether the restructure translates into deal wins.", tx: { num: "Deal TCV: improving after weak FY23", says: "large deals (₹1000cr+) are the signal to watch each quarter" } },
    ],
  },
}

const REVENUE_STREAMS: Record<string, RevenueStream[]> = {
  RELIANCE:    [{ name: 'O2C (Oil-to-Chemicals)', percentage: 58, description: 'Refining crude oil into petrol, diesel, and chemicals. The cash engine that funds everything else.' }, { name: 'Jio Platforms', percentage: 22, description: 'Mobile internet and broadband. 480M subscribers paying ₹180–200/month.' }, { name: 'Retail', percentage: 16, description: '18,000+ stores across India. Fashion, grocery, electronics, and pharmacy.' }, { name: 'Other / New Energy', percentage: 4, description: 'Media (Network18), media rights, and early green energy investments.' }],
  HDFCBANK:    [{ name: 'Net Interest Income', percentage: 62, description: 'The spread between what they charge borrowers and what they pay depositors. The core of banking.' }, { name: 'Fee Income', percentage: 22, description: 'Credit card fees, processing charges, forex, and third-party product distribution.' }, { name: 'Treasury', percentage: 10, description: 'Returns from their investment portfolio — bonds, government securities.' }, { name: 'Other', percentage: 6, description: 'Insurance, mutual fund distribution, and miscellaneous services.' }],
  TCS:         [{ name: 'BFSI', percentage: 32, description: 'Banks, insurance companies, capital markets. The biggest engine — US and European financial firms.' }, { name: 'Consumer & Retail', percentage: 16, description: 'Supermarkets, e-commerce, consumer brands running IT on TCS systems.' }, { name: 'Manufacturing', percentage: 10, description: 'Auto, industrial, and aerospace companies modernising their factories.' }, { name: 'Other verticals', percentage: 42, description: 'Telecom, media, life sciences, energy, utilities — spread globally.' }],
  INFY:        [{ name: 'Financial Services', percentage: 28, description: 'Banks and insurers. When they have budget, Infosys is busy.' }, { name: 'Retail & Consumer', percentage: 15, description: 'Global retailers transforming supply chains and e-commerce.' }, { name: 'Manufacturing', percentage: 13, description: 'Engineering and auto companies — digital factory projects.' }, { name: 'Other', percentage: 44, description: 'Life sciences, energy, communication, and hi-tech spread across geographies.' }],
  HINDUNILVR:  [{ name: 'Home Care', percentage: 38, description: 'Surf Excel, Rin, Vim, Comfort. Products you use to clean your clothes and kitchen.' }, { name: 'Beauty & Personal Care', percentage: 36, description: 'Dove, Lifebuoy, Ponds, Lakme, TRESemmé. The shelf at every chemist.' }, { name: 'Foods & Refreshment', percentage: 26, description: 'Horlicks, Kissan, Kwality Walls, Knorr. The kitchen shelf.' }],
  ONGC:        [{ name: 'Crude Oil', percentage: 68, description: 'The core. ~600,000 barrels a day from offshore Mumbai High and onshore fields.' }, { name: 'Natural Gas', percentage: 18, description: 'Sold to fertiliser plants and power companies at government-regulated prices.' }, { name: 'Value-added products', percentage: 9, description: 'LPG, naphtha, and other refinery outputs from their subsidiary HPCL.' }, { name: 'Other', percentage: 5, description: 'Pipeline transmission, services, and other upstream activities.' }],
  SUNPHARMA:   [{ name: 'India Branded', percentage: 30, description: 'Doctors prescribe Sun by name. Chronic disease medicines — cardiology, CNS, dermatology.' }, { name: 'US Generics', percentage: 28, description: 'Off-patent medicines sold to US pharmacy chains. Competitive pricing, high volume.' }, { name: 'US Specialty', percentage: 17, description: 'Ilumya (psoriasis), Cequa (dry eye) — novel drugs with their own data, patent protection.' }, { name: 'Emerging Markets', percentage: 25, description: 'Russia, Romania, Africa, rest of world branded generics.' }],
  MARUTI:      [{ name: 'Vehicles', percentage: 85, description: '2.1 million cars a year across Alto, Swift, Baleno, Ertiga, Brezza, Grand Vitara, Jimny.' }, { name: 'Spares & Service', percentage: 9, description: '4,500 service network touchpoints. Recurring revenue from every car sold.' }, { name: 'Accessories & Financials', percentage: 6, description: 'Maruti Insurance, Maruti Finance — fees on every financed purchase.' }],
  BAJFINANCE:  [{ name: 'Consumer B2C', percentage: 35, description: 'EMI for electronics, furniture, two-wheelers. The original business — still the largest.' }, { name: 'SME Lending', percentage: 28, description: 'Business loans to small and mid-size companies. Growing fastest.' }, { name: 'Mortgage (Home Loans)', percentage: 20, description: 'Home and loan-against-property. Lowest yield but ultra-sticky customers.' }, { name: 'Deposits & Other', percentage: 17, description: 'Fixed deposits from retail customers — cheap, stable funding source.' }],
  WIPRO:       [{ name: 'IT Services', percentage: 88, description: 'Application development, cloud migration, infrastructure management, consulting.' }, { name: 'ISRE (Wipro Infrastructure)', percentage: 8, description: 'IT products and solutions for enterprise infrastructure.' }, { name: 'Other', percentage: 4, description: 'BPS (Business Process Services) and non-IT operations.' }],
}

const STREAM_COLORS = ['var(--ink)', 'var(--coral)', 'var(--sage)', 'var(--amber)']

// ─── Sub-components ───────────────────────────────────────────────────────────

function BackButton({ label }: { label: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0 }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
    </button>
  )
}

function ChapterTabs({ active, onChange }: { active: Chapter; onChange: (c: Chapter) => void }) {
  const tabs: { id: Chapter; label: string }[] = [
    { id: 'story', label: 'The Shop' },
    { id: 'money', label: 'Revenue' },
    { id: 'thesis', label: 'Thesis' },
  ]
  return (
    <div style={{ display: 'flex', gap: 4, background: 'var(--hairline-soft)', borderRadius: 12, padding: 4 }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1, padding: '9px 0', borderRadius: 9, border: 'none',
            background: active === t.id ? 'var(--card)' : 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: active === t.id ? 600 : 500,
            color: active === t.id ? 'var(--ink)' : 'var(--muted)',
            cursor: 'pointer', transition: 'all 0.15s',
            boxShadow: active === t.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

function StockHeader({ ticker, name, chapter }: { ticker: string; name: string; chapter: Chapter }) {
  const chapterLabel = chapter === 'story' ? 'The shop story' : chapter === 'money' ? 'Where the money comes from' : 'Why you might hold'
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--coral-deep)', letterSpacing: '0.04em' }}>{ticker}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>NSE</span>
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 4 }}>{name}</h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Chapter {chapter === 'story' ? '1' : chapter === 'money' ? '2' : '3'} · {chapterLabel}
      </p>
    </div>
  )
}

// ─── Chapter 1: Shop Story ────────────────────────────────────────────────────

function ChapterStory({ ticker }: { ticker: string }) {
  const data = SHOP_STORIES[ticker]
  if (!data) return <p style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Shop story coming soon.</p>

  return (
    <div>
      <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.008em', color: 'var(--ink-soft)', marginBottom: 20 }}>
        {data.lede}
      </p>

      {data.paragraphs.map((p, i) => (
        <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 16, padding: '16px', marginBottom: 12 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, letterSpacing: '-0.015em', marginBottom: 8, color: 'var(--ink)' }}>
            {p.h}
          </h3>
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>{p.body}</p>
          {p.tx && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--hairline)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                {p.tx.num}
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13, color: 'var(--coral-deep)', lineHeight: 1.35, letterSpacing: '-0.005em' }}>
                "{p.tx.says}"
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Next chapter CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 14, background: 'var(--ink)', color: 'var(--cream)', marginTop: 4 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.55)', marginBottom: 4 }}>Next chapter</div>
          <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em' }}>Where the money comes from →</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--coral)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <p style={{ fontSize: 11, color: 'var(--muted-2)', lineHeight: 1.6, marginTop: 20 }}>
        This is a plain-English description of what this company does. It is not a recommendation to buy or sell.
      </p>
    </div>
  )
}

// ─── Chapter 2: Revenue Streams ───────────────────────────────────────────────

function ChapterMoney({ ticker, name }: { ticker: string; name: string }) {
  const streams = REVENUE_STREAMS[ticker]
  if (!streams) return <p style={{ color: 'var(--muted)', fontSize: 14, textAlign: 'center', padding: '40px 0' }}>Revenue breakdown coming soon.</p>

  // The biggest stream tells the story
  const biggest = streams.reduce((a, b) => a.percentage > b.percentage ? a : b)
  const biggestPct = biggest.percentage

  return (
    <div>
      <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.008em', color: 'var(--ink-soft)', marginBottom: 20 }}>
        Every rupee {name} made last year came from one of {streams.length} places.
      </p>

      {/* Stacked bar */}
      <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', border: '1px solid var(--hairline)', marginBottom: 8 }}>
        {streams.map((s, i) => (
          <div key={i} style={{ width: `${s.percentage}%`, background: STREAM_COLORS[i] }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>0%</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>100% of revenue</span>
      </div>

      {/* Stream cards */}
      {streams.map((s, i) => (
        <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--hairline)', borderRadius: 14, padding: '14px 16px', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 40, borderRadius: 3, background: STREAM_COLORS[i], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.15, color: 'var(--ink)' }}>{s.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, lineHeight: 1.4 }}>{s.description}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', flexShrink: 0 }}>
              {s.percentage}<span style={{ fontSize: 12, color: 'var(--muted)' }}>%</span>
            </div>
          </div>
        </div>
      ))}

      {/* Takeaway */}
      <div style={{ marginTop: 8, padding: '14px 16px', borderRadius: 14, background: 'var(--coral-tint)', border: '1px solid rgba(217,119,87,0.3)', color: 'var(--ink-soft)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--coral-deep)', marginBottom: 6 }}>The takeaway</div>
        <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
          {biggestPct}% of the money comes from {biggest.name.toLowerCase()}. If that engine slows, the company slows. Watch that engine.
        </div>
      </div>
    </div>
  )
}

// ─── Chapter 3: Thesis ────────────────────────────────────────────────────────

function StrengthDots({ strength }: { strength: 'core' | 'supporting' | 'speculative' }) {
  const count = strength === 'core' ? 3 : strength === 'supporting' ? 2 : 1
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i <= count ? 'var(--coral-deep)' : 'var(--hairline)' }} />
        ))}
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {strength === 'core' ? 'Load-bearing' : strength === 'supporting' ? 'Matters' : 'Worth tracking'}
      </span>
    </div>
  )
}

function StatusPill({ status }: { status: ThesisReason['status'] }) {
  const map = { holding: { label: 'Holding', cls: 'holding' }, wobbling: { label: 'Wobbling', cls: 'wobbling' }, broken: { label: 'Broke', cls: 'broken' } }
  const s = map[status]
  return <span className={`pill ${s.cls}`}>{s.label}</span>
}

function ThesisReasonCard({
  reason,
  index,
  isOwned,
  onToggle,
}: {
  reason: ThesisReason
  index: number
  isOwned: boolean
  onToggle: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      background: 'var(--card)',
      border: `1px solid ${reason.accepted ? 'var(--hairline)' : 'var(--hairline-soft)'}`,
      borderRadius: 14, padding: '14px 14px', marginBottom: 10,
      opacity: reason.accepted ? 1 : 0.5,
      transition: 'opacity 0.2s',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {/* Index badge */}
        <div style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
          background: reason.accepted ? 'var(--ink)' : 'var(--muted-2)',
          color: 'var(--cream)',
        }}>
          {index + 1}
        </div>

        {/* Claim */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.015em', lineHeight: 1.3, margin: '0 0 8px', color: 'var(--ink)' }}>
            {reason.claim}
          </p>
          <StrengthDots strength={reason.strength} />
        </div>

        {/* Toggle / status */}
        {isOwned ? (
          <StatusPill status={reason.status} />
        ) : (
          <button
            onClick={onToggle}
            style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              border: `1px solid ${reason.accepted ? 'var(--sage)' : 'var(--hairline)'}`,
              background: reason.accepted ? 'var(--sage)' : 'transparent',
              color: reason.accepted ? 'var(--cream)' : 'var(--muted)',
              display: 'grid', placeItems: 'center', cursor: 'pointer', padding: 0,
            }}
          >
            {reason.accepted ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* "Why we picked this" — expandable */}
      {(reason.verdict || reason.actual) && (
        <div style={{
          marginTop: 12, paddingTop: 10, borderTop: '1px dashed var(--hairline)',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1 }}>
            {reason.actual && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', minWidth: 60, flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Actual</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: 'var(--ink)' }}>{reason.actual}</span>
              </div>
            )}
            {reason.verdict && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--coral-deep)', lineHeight: 1.4, margin: 0 }}>
                "{reason.verdict}"
              </p>
            )}
          </div>
        </div>
      )}

      {/* Expandable detail */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          marginTop: 10, padding: '7px 10px', background: 'var(--cream)', borderRadius: 8,
          fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em', border: 'none', width: '100%', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
        }}
      >
        <span style={{ flex: 1 }}>{expanded ? 'Hide detail' : 'What we watch for this'}</span>
        <span style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>›</span>
      </button>

      {expanded && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--hairline)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px', fontSize: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 2 }}>Measure</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)' }}>{reason.measure}</span>
            {reason.target && (
              <>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 2 }}>Holds if</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-soft)' }}>{reason.target}</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ChapterThesis({
  ticker,
  name,
  existingThesis,
  userId,
}: {
  ticker: string
  name: string
  existingThesis: Thesis | null
  userId: string | null
}) {
  const router = useRouter()
  const seedReasons = SEED_REASONS[ticker] || []
  const [reasons, setReasons] = useState<ThesisReason[]>(() => {
    if (existingThesis) return existingThesis.reasons_json
    return seedReasons.map(r => ({
      id: r.id,
      claim: r.claim,
      measure: r.measure,
      target: '',
      strength: 'supporting' as const,
      status: 'holding' as const,
      accepted: true,
    }))
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const isOwned = !!existingThesis
  const acceptedCount = reasons.filter(r => r.accepted).length

  function toggleReason(index: number) {
    setReasons(prev => prev.map((r, i) => i === index ? { ...r, accepted: !r.accepted } : r))
    setSaved(false)
  }

  async function saveThesis() {
    if (!userId) { router.push('/auth/login'); return }
    setSaving(true)

    const supabase = createClient()

    if (existingThesis) {
      await supabase.from('theses').update({ reasons_json: reasons }).eq('id', existingThesis.id)
    } else {
      await supabase.from('theses').insert({ user_id: userId, ticker, reasons_json: reasons })
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => router.push('/digest'), 1000)
  }

  const holdingCount = reasons.filter(r => r.accepted && r.status === 'holding').length
  const wobblingCount = reasons.filter(r => r.accepted && r.status === 'wobbling').length
  const brokenCount = reasons.filter(r => r.accepted && r.status === 'broken').length

  return (
    <div>
      {isOwned && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {holdingCount > 0 && <div style={{ background: 'var(--sage-tint)', borderRadius: 10, padding: '8px 14px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--sage)' }}>{holdingCount}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sage)', marginTop: 2 }}>Holding</div></div>}
          {wobblingCount > 0 && <div style={{ background: 'var(--amber-tint)', borderRadius: 10, padding: '8px 14px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--amber)' }}>{wobblingCount}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--amber)', marginTop: 2 }}>Wobbling</div></div>}
          {brokenCount > 0 && <div style={{ background: 'var(--rust-tint)', borderRadius: 10, padding: '8px 14px', textAlign: 'center' }}><div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--rust)' }}>{brokenCount}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--rust)', marginTop: 2 }}>Broke</div></div>}
        </div>
      )}

      <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.008em', color: 'var(--ink-soft)', marginBottom: 20 }}>
        {isOwned
          ? `${acceptedCount} reason${acceptedCount !== 1 ? 's' : ''} in your thesis for ${name}.`
          : `We wrote ${reasons.length} reasons to own ${name}. Keep the ones you believe.`}
      </p>

      {reasons.map((reason, i) => (
        <ThesisReasonCard
          key={reason.id}
          reason={reason}
          index={i}
          isOwned={isOwned}
          onToggle={() => toggleReason(i)}
        />
      ))}

      {/* Save CTA */}
      <div style={{ marginTop: 14, padding: '16px 18px', background: 'var(--ink)', color: 'var(--cream)', borderRadius: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(246,243,236,0.55)', marginBottom: 4 }}>
              {isOwned ? 'Update thesis' : `Save thesis · ${acceptedCount} of ${reasons.length} kept`}
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em' }}>
              {saved ? '✓ Saved — back to digest.' : acceptedCount >= 2 ? 'Track this. We\'ll check it every morning.' : acceptedCount > 0 ? 'Keep at least 2 reasons to track.' : 'Skip this one for now.'}
            </div>
          </div>
          <button
            onClick={saveThesis}
            disabled={saving || acceptedCount < 2}
            style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: acceptedCount >= 2 && !saving ? 'var(--coral)' : 'rgba(246,243,236,0.15)',
              color: 'var(--cream)', border: 'none', cursor: acceptedCount >= 2 ? 'pointer' : 'not-allowed',
              display: 'grid', placeItems: 'center',
            }}
          >
            {saving ? '...' : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(246,243,236,0.12)', fontSize: 11, color: 'rgba(246,243,236,0.45)', lineHeight: 1.5 }}>
          We don't say buy or sell — that's your call. We tell you each morning whether the reasons still make sense.
        </div>
      </div>
    </div>
  )
}


// ─── Bottom nav ───────────────────────────────────────────────────────────────

function BottomNav({ active }: { active: 'digest' | 'stocks' }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--cream)', borderTop: '1px solid var(--hairline)',
      display: 'flex', justifyContent: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)', zIndex: 100,
    }}>
      {[
        { href: '/digest', label: 'Digest', id: 'digest', icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 10h8M4 14h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        )},
        { href: '/stocks', label: 'Stocks', id: 'stocks', icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )},
      ].map(item => (
        <Link key={item.id} href={item.href} style={{
          flex: 1, maxWidth: 120, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 3, padding: '10px 0 6px',
          textDecoration: 'none',
          color: active === item.id ? 'var(--ink)' : 'var(--muted-2)',
        }}>
          {item.icon}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: active === item.id ? 700 : 400 }}>
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function StockDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ ticker: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { ticker } = use(params)
  const { tab } = use(searchParams)
  const tickerUpper = ticker.toUpperCase()

  const initialChapter: Chapter =
    tab === 'thesis' ? 'thesis' :
    tab === 'money'  ? 'money'  : 'story'

  const [chapter, setChapter] = useState<Chapter>(initialChapter)
  const [thesis, setThesis] = useState<Thesis | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const stockName = SHOP_STORIES[tickerUpper] ? tickerUpper : tickerUpper
  const displayName = getDisplayName(tickerUpper)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        const { data } = await supabase.from('theses').select('*').eq('user_id', user.id).eq('ticker', tickerUpper).single()
        if (data) setThesis(data as Thesis)
      }
      setLoading(false)
    }
    load()
  }, [tickerUpper])

  if (loading) {
    return (
      <main style={{ background: 'var(--cream)', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Loading...</p>
      </main>
    )
  }

  return (
    <>
    <main style={{ background: 'var(--cream)', minHeight: '100dvh', paddingBottom: 80 }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

        {/* Nav */}
        <div style={{ padding: '52px 0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackButton label="Back" />
          {thesis && (
            <span className="pill holding">In my thesis</span>
          )}
        </div>

        {/* Stock header */}
        <StockHeader ticker={tickerUpper} name={displayName} chapter={chapter} />

        {/* Chapter tabs */}
        <div style={{ marginBottom: 24 }}>
          <ChapterTabs active={chapter} onChange={c => setChapter(c)} />
        </div>

        {/* Chapter content */}
        {chapter === 'story' && <ChapterStory ticker={tickerUpper} />}
        {chapter === 'money' && <ChapterMoney ticker={tickerUpper} name={displayName} />}
        {chapter === 'thesis' && (
          <ChapterThesis
            ticker={tickerUpper}
            name={displayName}
            existingThesis={thesis}
            userId={userId}
          />
        )}

        <div style={{ height: 60 }} className="safe-bottom" />
      </div>
    </main>
    <BottomNav active="stocks" />
    </>
  )
}

function getDisplayName(ticker: string): string {
  const names: Record<string, string> = {
    RELIANCE: 'Reliance Industries', HDFCBANK: 'HDFC Bank', TCS: 'Tata Consultancy Services',
    INFY: 'Infosys', HINDUNILVR: 'Hindustan Unilever', ONGC: 'ONGC',
    SUNPHARMA: 'Sun Pharmaceutical', MARUTI: 'Maruti Suzuki', BAJFINANCE: 'Bajaj Finance', WIPRO: 'Wipro',
  }
  return names[ticker] || ticker
}
