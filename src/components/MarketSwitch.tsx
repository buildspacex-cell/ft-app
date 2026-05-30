'use client'

interface MarketSwitchProps {
  currentMarket: 'in' | 'us'
  dark?: boolean
}

export function MarketSwitch({ currentMarket, dark = false }: MarketSwitchProps) {
  function switchMarket() {
    const target = currentMarket === 'in' ? 'us' : 'in'
    // Set cookie for 30 days
    const maxAge = 60 * 60 * 24 * 30
    document.cookie = `ft-market=${target};max-age=${maxAge};path=/`
    // Navigate to the correct page
    window.location.href = target === 'us' ? '/us' : '/'
  }

  const label = currentMarket === 'in'
    ? 'Viewing India (NSE) · Switch to US →'
    : 'Viewing United States · Switch to India →'

  return (
    <button
      onClick={switchMarket}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        color: dark ? 'rgba(246,243,236,0.35)' : 'var(--muted)',
        padding: 0,
        textDecoration: 'underline',
        textDecorationColor: dark ? 'rgba(246,243,236,0.15)' : 'var(--hairline)',
        textUnderlineOffset: 3,
        transition: 'color 0.15s',
      }}
      onMouseEnter={e => {
        (e.target as HTMLButtonElement).style.color = dark
          ? 'rgba(246,243,236,0.7)'
          : 'var(--ink)'
      }}
      onMouseLeave={e => {
        (e.target as HTMLButtonElement).style.color = dark
          ? 'rgba(246,243,236,0.35)'
          : 'var(--muted)'
      }}
    >
      {label}
    </button>
  )
}
