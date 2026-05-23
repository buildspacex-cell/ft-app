import Anthropic from '@anthropic-ai/sdk'
import { buildFilterPrompt, buildWritePrompt, buildMarinationPrompt } from './prompts'
import type { PortfolioStory, MarinationStory, Thesis, DigestPayload } from '@/types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Regex compliance check — never say buy/sell
const FORBIDDEN = /\b(buy|sell|accumulate|trim|exit|enter|reduce|add to|dump|pick up|offload)\b/gi

function failsCompliance(text: string): boolean {
  return FORBIDDEN.test(text)
}

// ─── Stage 1: Filter ──────────────────────────────────────────────────────────

export async function filterRelevantNews(
  portfolioTickers: string[],
  thesisReasons: Record<string, string[]>,
  headlines: string[]
): Promise<{ headline: string; index: number; ticker: string | null; reason_hint: string | null }[]> {
  const prompt = buildFilterPrompt(portfolioTickers, thesisReasons, headlines)

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : '[]'
  
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    console.error('Filter stage JSON parse failed:', text)
    return []
  }
}

// ─── Stage 2: Write portfolio story ──────────────────────────────────────────

export async function writePortfolioStory(
  articleBody: string,
  thesis: Thesis,
  matchedTicker: string | null,
  retries = 2
): Promise<PortfolioStory | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const prompt = buildWritePrompt(articleBody, thesis.reasons_json, matchedTicker)

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: 'Output only valid JSON. No preamble, no markdown, no explanation.',
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    try {
      const story: PortfolioStory = JSON.parse(text.replace(/```json|```/g, '').trim())
      
      // Compliance check — reject and retry if forbidden words found
      const fullText = `${story.headline} ${story.shop_voice}`
      if (failsCompliance(fullText)) {
        console.warn(`Compliance failure attempt ${attempt + 1}, regenerating...`)
        continue
      }
      
      return story
    } catch {
      console.error(`Write stage parse failed attempt ${attempt + 1}:`, text)
    }
  }
  return null
}

// ─── Stage 3: Marination stories ─────────────────────────────────────────────

export async function writeMarinationStory(
  articleBody: string,
  isPhrase: boolean
): Promise<MarinationStory | null> {
  const prompt = buildMarinationPrompt(articleBody, isPhrase)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: 'Output only valid JSON. No preamble, no markdown, no explanation.',
    messages: [{ role: 'user', content: prompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim()) as MarinationStory
  } catch {
    console.error('Marination stage parse failed:', text)
    return null
  }
}

// ─── Full digest pipeline ─────────────────────────────────────────────────────

export async function buildDigestForUser(
  userId: string,
  theses: Thesis[],
  newsArticles: { headline: string; body: string; url: string }[],
  marinationArticles: { body: string; url: string; isPhrase: boolean }[]
): Promise<DigestPayload> {
  const portfolioTickers = theses.map(t => t.ticker)
  const thesisReasons: Record<string, string[]> = {}

  theses.forEach(t => {
    thesisReasons[t.ticker] = t.reasons_json
      .filter(r => r.accepted)
      .map(r => r.claim)
  })

  // Stage 1: Filter news to top 5 relevant
  const headlines = newsArticles.map(a => a.headline)
  const relevant = await filterRelevantNews(portfolioTickers, thesisReasons, headlines)

  // Stage 2: Write portfolio stories (parallel for speed)
  const portfolioStoryPromises = relevant.slice(0, 5).map(async (item) => {
    const article = newsArticles[item.index]
    if (!article) return null

    const thesis = item.ticker
      ? theses.find(t => t.ticker === item.ticker) ?? theses[0]
      : theses[0]

    return writePortfolioStory(article.body || article.headline, thesis, item.ticker)
  })

  const portfolioResults = await Promise.all(portfolioStoryPromises)
  const portfolio_stories = portfolioResults.filter((s): s is PortfolioStory => s !== null)

  // Stage 3: 2 marination stories
  const marinationPromises = marinationArticles.slice(0, 2).map(a =>
    writeMarinationStory(a.body, a.isPhrase)
  )
  const marinationResults = await Promise.all(marinationPromises)
  const marination_stories = marinationResults.filter((s): s is MarinationStory => s !== null)

  return { portfolio_stories, marination_stories }
}
