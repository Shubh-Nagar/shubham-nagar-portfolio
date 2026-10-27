import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/**
 * The scene behind the services scroll story. It stays pinned to the screen
 * while the services scroll past, and changes with the active one: a tinted
 * glow, a huge faint word, and floating props on that topic. Props rise in
 * from below and leave upward, so the whole scene moves with the scroll
 * (reversed when scrolling back up). Purely decorative.
 */

// Where props sit: screen edges, the gap between the columns, and the bands
// above and below the pinned panel, so they rarely land behind text.
// Props alternate emoji tile / text chip, so the narrow edge spots get the
// small tiles. On phones there is no room beside the text: only the glow
// and the word show. `wide` spots wait for large screens.
const spots = [
  { left: '2%', top: '16%' },
  { left: '28%', top: '5%' },
  { left: '2.5%', top: '70%' },
  { left: '34%', top: '91%' },
  { left: '48.5%', top: '30%', wide: true },
  { left: '62%', top: '92%', wide: true },
  { left: '48%', top: '66%', wide: true },
  { left: '76%', top: '4%', wide: true },
]

const scenes = {
  web: {
    word: 'Websites',
    glow: '#2a3bd9',
    props: ['🖥️', { text: '</>' }, '📱', { text: 'Book now', tone: 'cobalt' }, '🖱️', { text: 'Fast on 4G' }, '✨', { text: 'WhatsApp', tone: 'green' }],
  },
  seo: {
    word: 'Search',
    glow: '#1f9d6b',
    props: ['🔍', { text: '#1 on Google', tone: 'green' }, '📍', { text: '★ 4.9' }, '📈', { text: 'near me' }, '🗺️', { text: 'More calls', tone: 'green' }],
  },
  decks: {
    word: 'Slides',
    glow: '#f2b33d',
    props: ['📊', { text: 'Slide 07' }, '💡', { text: 'Problem → Proof → Price', tone: 'marigold' }, '🎯', { text: 'Q&A' }, '🗂️', { text: 'Deal won', tone: 'cobalt' }],
  },
  video: {
    word: 'Video',
    glow: '#ff5a6e',
    props: ['🎬', { text: '00:15' }, '🎞️', { text: '▶ Play', tone: 'pink' }, '🔊', { text: 'CC' }, '📹', { text: '9:16 reel', tone: 'cobalt' }],
  },
  social: {
    word: 'Social',
    glow: '#a855f7',
    props: ['❤️', { text: '+128 followers', tone: 'pink' }, '💬', { text: '#indore' }, '📸', { text: 'Posted · 2m' }, '🔥', { text: '1.2k likes', tone: 'purple' }],
  },
}

const tones = {
  cobalt: 'bg-cobalt text-on-cobalt',
  green: 'bg-[#1f9d6b] text-white',
  marigold: 'bg-marigold text-[#14171f]',
  pink: 'bg-[#ff5a6e] text-white',
  purple: 'bg-[#a855f7] text-white',
}

export default function ServiceBackdrop({ id, direction }) {
  const reduce = useReducedMotion()
  const scene = scenes[id]
  if (!scene) return null

  const rise = reduce ? 0 : 90
  const enter = { opacity: 0, y: direction > 0 ? rise : -rise }
  const exit = { opacity: 0, y: direction > 0 ? -rise : rise }

  return (
    <div aria-hidden="true" className="sticky top-0 h-screen overflow-hidden">
      {/* Tinted glow that shifts colour with the topic */}
      <motion.div
        className="absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[110px] dark:opacity-[0.22]"
        animate={{ backgroundColor: scene.glow }}
        transition={{ duration: 0.9, ease }}
      />

      <AnimatePresence initial={false}>
        <motion.div key={id} className="absolute inset-0" initial={enter} animate={{ opacity: 1, y: 0 }} exit={exit} transition={{ duration: 0.9, ease }}>
          {/* Huge faint word along the bottom */}
          <span className="display absolute bottom-[-0.12em] left-1/2 -translate-x-1/2 whitespace-nowrap text-[clamp(6rem,20vw,19rem)] leading-none text-ink opacity-[0.045]">
            {scene.word}
          </span>

          {scene.props.map((prop, i) => {
            const spot = spots[i]
            return (
              <motion.div
                key={i}
                className={`absolute hidden ${spot.wide ? 'lg:block' : 'md:block'}`}
                style={{ left: spot.left, top: spot.top }}
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 220, damping: 16 }}
              >
                {/* Idle float on an inner layer */}
                <motion.div
                  animate={reduce ? undefined : { y: [0, -12, 0], rotate: [i % 2 ? -6 : 6, i % 2 ? -2 : 10, i % 2 ? -6 : 6] }}
                  transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  <Prop prop={prop} />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Prop({ prop }) {
  if (typeof prop === 'string') {
    return (
      <span className="grid size-14 place-items-center rounded-2xl border border-line bg-surface/70 text-[1.7rem] shadow-[0_14px_30px_-16px_rgba(20,23,31,.35)] backdrop-blur-sm md:size-16 md:text-[2rem]">
        {prop}
      </span>
    )
  }
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-[0_14px_30px_-16px_rgba(20,23,31,.35)] ${
        prop.tone ? tones[prop.tone] : 'border border-line bg-surface/80 text-ink backdrop-blur-sm'
      }`}
    >
      {prop.text}
    </span>
  )
}
