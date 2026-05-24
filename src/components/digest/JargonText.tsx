'use client'

import { useState, useRef, useEffect } from 'react'

// Parses [[TERM|plain explanation]] tokens from LLM output
// Returns array of { type: 'text' | 'jargon', content, explanation? }
function parseJargon(text: string): { type: 'text' | 'jargon'; content: string; explanation?: string }[] {
  const parts: { type: 'text' | 'jargon'; content: string; explanation?: string }[] = []
  const regex = /\[\[([^\]|]+)\|([^\]]+)\]\]/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'jargon', content: match[1], explanation: match[2] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }]
}

// Single jargon term with tap-to-reveal tooltip
function JargonTerm({ term, explanation }: { term: string; explanation: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
          fontWeight: 'inherit',
          color: 'var(--coral-deep)',
          borderBottom: '1px dotted var(--coral)',
          display: 'inline',
        }}
      >
        {term}
      </button>

      {open && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'var(--ink)',
          color: 'var(--cream)',
          borderRadius: 10,
          padding: '8px 12px',
          width: 220,
          fontSize: 12,
          lineHeight: 1.45,
          fontFamily: 'var(--font-sans)',
          fontWeight: 400,
          letterSpacing: '-0.005em',
          pointerEvents: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        }}>
          {/* Arrow */}
          <span style={{
            position: 'absolute',
            bottom: -5,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 10,
            height: 10,
            background: 'var(--ink)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            display: 'block',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--coral)',
            display: 'block',
            marginBottom: 4,
          }}>
            {term}
          </span>
          {explanation}
        </span>
      )}
    </span>
  )
}

// Main component — drop-in replacement for any text block in the digest
export default function JargonText({
  text,
  style,
}: {
  text: string
  style?: React.CSSProperties
}) {
  const parts = parseJargon(text)

  return (
    <span style={style}>
      {parts.map((part, i) =>
        part.type === 'jargon' ? (
          <JargonTerm key={i} term={part.content} explanation={part.explanation!} />
        ) : (
          <span key={i}>{part.content}</span>
        )
      )}
    </span>
  )
}
