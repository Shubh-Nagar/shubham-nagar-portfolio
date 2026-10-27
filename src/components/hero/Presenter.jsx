import { motion, useReducedMotion } from 'framer-motion'

/**
 * A small illustrated presenter who stands under the hero preview and points
 * up at it. His eyes follow the compare handle, he blinks now and then, and
 * he does a happy hop the first time a visitor drags. Purely decorative —
 * the caption beside him carries the actual words.
 *
 * `pos` is the handle position (0–100), `played` flips once the visitor drags.
 */

const skin = '#c98b5e'
const skinShade = '#b07548'
const hair = '#2a2230'

export default function Presenter({ pos, played }) {
  const reduce = useReducedMotion()
  // Pupils drift left/right with the handle, and look up at the preview
  const look = ((pos ?? 50) / 100 - 0.5) * 3.2

  return (
    <motion.div
      aria-hidden="true"
      className="relative w-[88px] shrink-0 sm:w-[112px]"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, type: 'spring', stiffness: 220, damping: 18 }}
    >
      <motion.svg
        viewBox="0 0 120 140"
        className="block w-full overflow-visible"
        animate={played && !reduce ? { y: [0, -10, 0, -4, 0] } : { y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Resting arm, tucked behind the body */}
        <path d="M40 112 C32 120 30 130 31 140" stroke="var(--cobalt-deep)" strokeWidth="13" strokeLinecap="round" fill="none" />

        {/* Body */}
        <path d="M28 140 C28 110 42 97 60 97 C78 97 92 110 92 140 Z" fill="var(--cobalt)" />
        <path d="M52 98 L60 110 L68 98" fill="none" stroke="var(--paper)" strokeWidth="2.5" strokeLinejoin="round" opacity=".85" />
        <circle cx="74" cy="120" r="3.2" fill="var(--marigold)" />

        {/* Neck */}
        <rect x="54" y="82" width="12" height="18" rx="5" fill={skinShade} />

        {/* Head — tilts gently toward the preview */}
        <g className="presenter-head">
          <circle cx="36.5" cy="64" r="4.5" fill={skinShade} />
          <circle cx="83.5" cy="64" r="4.5" fill={skinShade} />
          <circle cx="60" cy="62" r="24" fill={skin} />
          <path d="M35 60 C33 40 46 33 60 33 C76 33 88 41 85 60 C81 50 73 45 63 47 C53 49 45 49 35 60 Z" fill={hair} />

          {/* Eyebrows */}
          <path d="M46 55 Q51 52.5 55 54.5" stroke={hair} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M65 54.5 Q69 52.5 74 55" stroke={hair} strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <g className="presenter-blink">
            <circle cx="51" cy="63" r="4.6" fill="#fff" />
            <circle cx="69" cy="63" r="4.6" fill="#fff" />
            <g style={{ transform: `translate(${look}px, -1.2px)`, transition: 'transform 120ms linear' }}>
              <circle cx="51" cy="63" r="2.5" fill="#1a1720" />
              <circle cx="69" cy="63" r="2.5" fill="#1a1720" />
              <circle cx="51.9" cy="62.1" r=".8" fill="#fff" />
              <circle cx="69.9" cy="62.1" r=".8" fill="#fff" />
            </g>
          </g>

          {/* Cheeks + smile */}
          <circle cx="45" cy="71" r="3.2" fill="#ff8a7a" opacity=".45" />
          <circle cx="75" cy="71" r="3.2" fill="#ff8a7a" opacity=".45" />
          <path d={played ? 'M52 72 Q60 81 68 72 Z' : 'M53 73 Q60 79 67 73'} stroke="#5a2e1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={played ? '#5a2e1e' : 'none'} />
        </g>

        {/* Pointing arm — taps upward at the preview */}
        <g className="presenter-point">
          <path d="M82 110 C92 104 98 96 102 86" stroke="var(--cobalt)" strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M102 86 C105 78 107 72 108 66" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
          <circle cx="108.5" cy="64" r="6.5" fill={skin} />
          <path d="M109 60 L111 48" stroke={skin} strokeWidth="4.6" strokeLinecap="round" />
          <path d="M104.5 62 Q107 59.5 110 61" stroke={skinShade} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </g>
      </motion.svg>
    </motion.div>
  )
}
