import type { DigestPayload } from '@/types'

const ONESIGNAL_API = 'https://onesignal.com/api/v1'

function summariseDigest(payload: DigestPayload): string {
  const count = payload.portfolio_stories.length
  if (count === 0) {
    return 'Quiet morning. Nothing for your portfolio today. Two stories worth knowing about anyway.'
  }

  const topStory = payload.portfolio_stories[0]
  const rest = count > 1 ? ` + ${count - 1} more` : ''
  return `${topStory.headline}${rest}`
}

export async function sendDigestPush(
  playerIds: string[],
  payload: DigestPayload,
  digestId: string
): Promise<void> {
  if (!playerIds.length) return

  const appId = process.env.ONESIGNAL_APP_ID
  const apiKey = process.env.ONESIGNAL_API_KEY
  if (!appId || !apiKey) {
    console.error('OneSignal env vars missing')
    return
  }

  const storyCount = payload.portfolio_stories.length
  const title = 'The Morning Check'
  const body = storyCount === 0
    ? 'Quiet morning. Nothing for your portfolio today. Two stories worth knowing about anyway.'
    : `Good morning. ${storyCount} thing${storyCount > 1 ? 's' : ''} for your portfolio. ${summariseDigest(payload)} →`

  const notification = {
    app_id: appId,
    include_player_ids: playerIds,
    headings: { en: title },
    contents: { en: body },
    url: `${process.env.NEXT_PUBLIC_APP_URL}/digest`,
    data: { digest_id: digestId },
    // IST 7am is UTC 1:30am — but we fire the cron at 6am IST (12:30am UTC)
    // and send push immediately after digest is ready
    ttl: 14400, // 4 hours — expires if not opened by 11am IST
    ios_sound: 'default',
    android_sound: 'default',
    android_channel_id: 'morning-check',
    ios_interruption_level: 'time-sensitive',
  }

  try {
    const res = await fetch(`${ONESIGNAL_API}/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify(notification),
    })

    const data = await res.json()
    if (data.errors) {
      console.error('OneSignal error:', data.errors)
    } else {
      console.log(`Push sent to ${playerIds.length} users, id: ${data.id}`)
    }
  } catch (err) {
    console.error('OneSignal fetch error:', err)
  }
}
