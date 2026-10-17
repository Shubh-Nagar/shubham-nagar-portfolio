import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MousePointer2, Play, Presentation, TrendingUp } from 'lucide-react'

/**
 * Little stickers that bob around the hero preview — one per service.
 * Visitors can grab and fling them anywhere inside the hero; they bounce
 * off its edges and keep floating wherever they land. Purely decorative.
 */

const stickers = [
  {
    id: 'cursor',
    className: 'left-2 top-[16%] sm:-left-10',
    tilt: -6,
    float: 7,
    duration: 5.2,
    render: (played) => (
      <div className="flex items-start">
        <MousePointer2 className="size-7 fill-cobalt text-cobalt drop-shadow-md" strokeWidth={1.5} />
        <span className="mt-5 -ml-1 whitespace-nowrap rounded-full rounded-tl-sm bg-cobalt px-3 py-1.5 text-xs font-semibold text-on-cobalt shadow-lg">
          {played ? 'Wheee — keep going' : 'Drag us around'}
        </span>
      </div>
    ),
  },
  {
    id: 'social',
    className: 'right-3 -top-5 sm:-right-6',
    tilt: 8,
    float: 9,
    duration: 4.6,
    render: () => (
      <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-semibold shadow-[0_12px_30px_-12px_rgba(20,23,31,.35)]">
        <Heart className="size-4 fill-[#ff5a6e] text-[#ff5a6e]" />
        2.4k
      </div>
    ),
  },
  {
    id: 'seo',
    className: 'hidden sm:block -right-8 bottom-[26%]',
    tilt: -4,
    float: 6,
    duration: 6,
    render: () => (
      <div className="rounded-2xl border border-line bg-surface px-4 py-3 shadow-[0_16px_36px_-14px_rgba(20,23,31,.4)]">
        <div className="flex items-center gap-2 text-[#1f9d6b]">
          <TrendingUp className="size-4" />
          <span className="font-display text-lg font-semibold leading-none">+212%</span>
        </div>
        <span className="mt-1 block text-xs text-ink-soft">organic traffic</span>
      </div>
    ),
  },
  {
    id: 'video',
    className: 'left-4 bottom-[20%] sm:-left-7',
    tilt: 10,
    float: 8,
    duration: 5.6,
    render: () => (
      <div className="grid size-14 place-items-center rounded-full bg-marigold text-[#14171f] shadow-[0_14px_30px_-10px_rgba(242,179,61,.7)] ring-4 ring-marigold/25">
        <Play className="ml-0.5 size-6 fill-current" />
      </div>
    ),
  },
  {
    id: 'deck',
    className: 'hidden sm:block left-[22%] -top-9',
    tilt: -9,
    float: 5,
    duration: 6.4,
    render: () => (
      <div className="flex items-center gap-2 rounded-xl bg-ink px-3 py-2 text-xs font-medium text-paper shadow-xl">
        <Presentation className="size-4" />
        Slide 1 / 22
      </div>
    ),
  },
]

export default function FloatingStickers({ constraintsRef }) {
  const [played, setPlayed] = useState(false)

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {stickers.map((s, i) => (
        <motion.div
          key={s.id}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          dragTransition={{ power: 0.35, timeConstant: 260, bounceStiffness: 320, bounceDamping: 14 }}
          onDragStart={() => setPlayed(true)}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 1.8 + i * 0.12, type: 'spring', stiffness: 260, damping: 16 } }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 1.15, rotate: -s.tilt }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className={`pointer-events-auto absolute cursor-grab touch-none select-none active:cursor-grabbing ${s.className}`}
        >
          {/* Idle bobbing lives on an inner layer so it never fights the drag */}
          <motion.div
            animate={{ y: [0, -s.float, 0], rotate: [s.tilt, s.tilt + 3, s.tilt] }}
            transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
          >
            {s.render(played)}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
