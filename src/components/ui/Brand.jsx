/**
 * Wordmark + monogram, and the small brand icons lucide doesn't ship.
 */

export function Monogram({ className = 'size-8' }) {
  // A rounded "window" with a split: wireframe on one side, filled on the other —
  // the same idea as the hero preview.
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--cobalt)" />
      <path d="M16 1.5h5.5a9 9 0 0 1 9 9v11a9 9 0 0 1-9 9H16z" fill="var(--marigold)" />
      <path
        d="M11.6 20.4c.9 1 2.3 1.6 3.9 1.6 2 0 3.4-1 3.4-2.6 0-3.6-7-2.2-7-6 0-1.6 1.4-2.8 3.4-2.8 1.4 0 2.6.5 3.4 1.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SocialIcon({ name, className = 'size-5' }) {
  const common = { className, 'aria-hidden': true, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'linkedin':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8 10.5V16M8 7.6v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6V16" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5.5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.2 6.8v.01" />
        </svg>
      )
    case 'github':
      return (
        <svg className={className} aria-hidden="true" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg {...common}>
          <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z" />
          <path d="M9.2 9.3c.2 2.4 3 5.2 5.5 5.5l1-1.1-1.6-1-1 .6c-.9-.4-1.6-1.1-2-2l.6-1-1-1.6z" />
        </svg>
      )
    default:
      return null
  }
}
