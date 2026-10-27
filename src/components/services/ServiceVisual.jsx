import { motion, useReducedMotion } from 'framer-motion'
import { Captions, Heart, MapPin, Play, Search, Star } from 'lucide-react'
import Screen from '../ui/Screen'

const ease = [0.16, 1, 0.3, 1]

/**
 * A small picture of each service, shown when its row opens. Drawn with the
 * site's colour tokens so it follows light/dark mode. Pieces animate in on
 * mount (the panel opening) with plain initial/animate values, so they don't
 * pick up the surrounding Stagger's variants.
 */
export default function ServiceVisual({ id }) {
  const Visual = visuals[id]
  return Visual ? (
    <div className="relative aspect-square overflow-hidden rounded-[24px] bg-surface sm:aspect-[4/3]" aria-hidden="true">
      <div className="dot-grid absolute inset-0 opacity-60" />
      <Visual />
    </div>
  ) : null
}

// Fades + lifts a piece into place, `i` steps after the panel opens
function Pop({ i = 0, className = '', children, x = 0, y = 14, scale = 1 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y, scale }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.09 }}
    >
      {children}
    </motion.div>
  )
}

// Device frames stay dark in both themes, with a hairline so they read on dark surfaces
const frame = 'border-[#14171f] ring-1 ring-line'

const Bar = ({ w = '100%', className = 'bg-line' }) => <span className={`block h-1.5 rounded-full ${className}`} style={{ width: w }} />

/* Website: a laptop and a phone showing real client sites. Hover scrolls them. */
function Web() {
  return (
    <div className="group absolute inset-0">
      <Pop i={0} className="absolute left-[7%] top-[12%] w-[72%]">
        <div className="overflow-hidden rounded-t-[14px] border border-line bg-paper shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)]">
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
            {[0, 1, 2].map((d) => <span key={d} className="size-2 rounded-full bg-line" />)}
            <span className="ml-3 h-3 flex-1 rounded-full bg-paper-2" />
          </div>
          <div className="aspect-[16/10]">
            <Screen src="/work/dental-clinic.jpg" width={420} />
          </div>
        </div>
        <div className="mx-[-6%] h-3 rounded-b-xl bg-[#2b2f3a] ring-1 ring-line" />
      </Pop>
      <Pop i={2} x={20} className="absolute bottom-[8%] right-[7%] w-[23%]">
        <div className={`overflow-hidden rounded-[18px] border-[5px] bg-[#14171f] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.55)] ${frame}`}>
          <div className="aspect-[9/19] overflow-hidden rounded-[12px]">
            <Screen src="/work/medical-conference.jpg" width={160} />
          </div>
        </div>
      </Pop>
      <Pop i={4} className="absolute bottom-[12%] left-[10%] flex items-center gap-2 rounded-full bg-[#25d366] px-3 py-2 text-xs font-semibold text-white shadow-lg">
        <span className="size-2 rounded-full bg-white" /> WhatsApp
      </Pop>
    </div>
  )
}

/* SEO: a local search where your business sits in the top spot with a map pin */
function Seo() {
  const rows = [
    { you: true, w: '62%' },
    { w: '48%' },
    { w: '55%' },
  ]
  return (
    <div className="absolute inset-0 p-[7%]">
      <Pop i={0} className="flex items-center gap-3 rounded-full border border-line bg-paper px-4 py-3 shadow-sm">
        <Search className="size-4 text-ink-soft" />
        <span className="text-sm text-ink">dentist near me</span>
        <span className="ml-auto h-4 w-px animate-pulse bg-cobalt" />
      </Pop>
      <div className="mt-4 grid grid-cols-[1fr_0.8fr] gap-4">
        <div className="space-y-3">
          {rows.map((r, i) => (
            <Pop
              key={i}
              i={i + 1}
              x={-12}
              className={`rounded-2xl border p-3.5 ${i === 2 ? 'hidden sm:block' : ''} ${r.you ? 'border-cobalt bg-cobalt-soft' : 'border-line bg-paper'}`}
            >
              <div className="flex items-center gap-2">
                <span className={`grid size-5 place-items-center rounded-full text-[10px] font-bold ${r.you ? 'bg-cobalt text-on-cobalt' : 'bg-line text-ink-soft'}`}>
                  {i + 1}
                </span>
                {r.you ? <span className="text-sm font-semibold text-cobalt">Your business</span> : <Bar w={r.w} />}
              </div>
              <div className="mt-2.5 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className={`size-3 ${r.you ? 'fill-marigold text-marigold' : 'fill-line text-line'}`} />
                ))}
              </div>
              <div className="mt-2 space-y-1.5">
                <Bar w="90%" />
                <Bar w="60%" />
              </div>
            </Pop>
          ))}
        </div>
        <Pop i={2} scale={0.94} className="relative overflow-hidden rounded-2xl border border-line bg-cobalt-soft/60">
          <svg className="absolute inset-0 size-full text-line" viewBox="0 0 100 140" preserveAspectRatio="none">
            <path d="M0 40 L100 20 M0 95 L100 110 M30 0 L45 140 M75 0 L65 140" stroke="currentColor" strokeWidth="5" fill="none" />
          </svg>
          {[[22, 70], [70, 40], [62, 92]].map(([l, t], i) => (
            <MapPin key={i} className="absolute size-5 -translate-x-1/2 -translate-y-full fill-paper text-ink-soft" style={{ left: `${l}%`, top: `${t}%` }} />
          ))}
          <motion.span
            className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-full"
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 14, delay: 0.7 }}
          >
            <MapPin className="size-9 fill-cobalt text-on-cobalt" strokeWidth={1.6} />
          </motion.span>
        </Pop>
      </div>
    </div>
  )
}

/* Presentations: a fanned stack of slides, the front one carrying one idea */
function Decks() {
  return (
    <div className="absolute inset-0">
      <Pop i={0} className="absolute left-[16%] top-[10%] w-[62%] rotate-[-7deg]">
        <div className="aspect-video rounded-xl border border-line bg-paper-2" />
      </Pop>
      <Pop i={1} className="absolute left-[22%] top-[15%] w-[62%] rotate-[-2deg]">
        <div className="aspect-video rounded-xl bg-cobalt p-[7%] text-on-cobalt">
          <span className="block h-2 w-1/4 rounded-full bg-marigold" />
          <span className="mt-3 block h-3.5 w-3/4 rounded-full bg-on-cobalt/90" />
          <span className="mt-2 block h-3.5 w-1/2 rounded-full bg-on-cobalt/90" />
        </div>
      </Pop>
      <Pop i={2} y={24} className="absolute bottom-[9%] right-[8%] w-[64%] rotate-[3deg]">
        <div className="aspect-video rounded-xl border border-line bg-paper p-[6%] shadow-[0_24px_50px_-26px_rgb(0_0_0/0.45)]">
          <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-[8%]">
            <div className="space-y-2 pt-1">
              <span className="block h-2.5 w-full rounded-full bg-ink/80" />
              <span className="block h-2.5 w-2/3 rounded-full bg-ink/80" />
              <span className="mt-4 block h-1.5 w-full rounded-full bg-line" />
              <span className="block h-1.5 w-4/5 rounded-full bg-line" />
            </div>
            <div className="flex items-end gap-[8%] border-b border-line">
              {[34, 52, 46, 70, 92].map((h, i) => (
                <motion.span
                  key={i}
                  className={`flex-1 origin-bottom rounded-t-[3px] ${i === 4 ? 'bg-cobalt' : 'bg-cobalt/30'}`}
                  style={{ height: `${h}%` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.5 + i * 0.08 }}
                />
              ))}
            </div>
          </div>
        </div>
      </Pop>
    </div>
  )
}

/* Video: a preview frame over an editing timeline, plus the three crop sizes */
function Video() {
  const clips = [
    ['18%', 'bg-cobalt'],
    ['26%', 'bg-cobalt/60'],
    ['14%', 'bg-marigold'],
    ['30%', 'bg-cobalt/80'],
  ]
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-[7%]">
      <div className="flex min-h-0 flex-1 items-end gap-3">
        <Pop i={0} className="relative grid h-full flex-[1.8] place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-cobalt to-cobalt-deep">
          <span className="grid size-11 place-items-center rounded-full bg-on-cobalt/90 text-cobalt">
            <Play className="ml-0.5 size-5 fill-current" />
          </span>
          <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 text-[10px] font-medium text-white">
            <Captions className="size-3" /> Captions on
          </span>
        </Pop>
        <div className="flex h-full flex-1 items-end gap-2">
          {[['9:16', 'aspect-[9/16] w-[34%]'], ['1:1', 'aspect-square w-[30%]'], ['16:9', 'aspect-video w-[36%]']].map(([label, cls], i) => (
            <Pop key={label} i={i + 1} className={`${cls} grid place-items-center rounded-md border border-line bg-paper text-[10px] font-semibold text-ink-soft`}>
              {label}
            </Pop>
          ))}
        </div>
      </div>
      <Pop i={3} className="rounded-xl border border-line bg-paper p-3">
        <div className="relative space-y-2">
          <div className="flex gap-1">
            {clips.map(([w, c], i) => <span key={i} className={`h-5 rounded ${c}`} style={{ width: w }} />)}
          </div>
          <div className="flex h-5 items-center gap-[2px]">
            {Array.from({ length: 48 }, (_, i) => (
              <span key={i} className="w-full rounded-full bg-ink-soft/40" style={{ height: `${25 + Math.abs(Math.sin(i * 1.7)) * 75}%` }} />
            ))}
          </div>
          <motion.span
            className="absolute -top-1 bottom-[-4px] w-0.5 rounded-full bg-marigold"
            initial={{ left: '6%' }}
            animate={{ left: '72%' }}
            transition={{ duration: 3.2, ease: 'easeInOut', delay: 0.6 }}
          />
        </div>
      </Pop>
    </div>
  )
}

/* Social: a phone with a consistent post grid, and the month's schedule beside it */
function Social() {
  const tiles = ['bg-cobalt', 'bg-marigold', 'bg-cobalt-soft', 'bg-cobalt-soft', 'bg-cobalt', 'bg-marigold/70', 'bg-marigold/70', 'bg-cobalt-soft', 'bg-cobalt', 'bg-cobalt', 'bg-marigold', 'bg-cobalt-soft']
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[6%] p-[7%]">
      <Pop i={0} className="h-full w-[38%]">
        <div className={`flex h-full flex-col overflow-hidden rounded-[22px] border-[5px] bg-paper p-2.5 ${frame}`}>
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-full bg-gradient-to-br from-marigold to-cobalt p-[2px]">
              <span className="block size-full rounded-full border-2 border-paper bg-cobalt-soft" />
            </span>
            <div className="flex-1 space-y-1">
              <Bar w="55%" className="bg-ink/70" />
              <Bar w="35%" />
            </div>
          </div>
          <div className="mt-2.5 flex justify-around border-y border-line py-1.5">
            {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1/5 rounded-full bg-line" />)}
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-[3px]">
            {tiles.map((c, i) => (
              <motion.span
                key={i}
                className={`aspect-square ${c}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.05 }}
              />
            ))}
          </div>
          <div className="mt-auto flex items-center gap-1 pt-2 text-cobalt">
            <Heart className="size-3.5 fill-current" />
            <Bar w="30%" className="bg-line" />
          </div>
        </div>
      </Pop>
      <Pop i={2} x={16} className="w-[46%] rounded-2xl border border-line bg-paper p-3">
        <Bar w="40%" className="bg-ink/70" />
        <div className="mt-3 grid grid-cols-7 gap-1">
          {Array.from({ length: 28 }, (_, i) => {
            const post = [2, 5, 9, 12, 16, 19, 23, 26].indexOf(i)
            return (
              <span key={i} className={`grid aspect-square place-items-center rounded-[4px] ${post >= 0 ? (post % 3 === 1 ? 'bg-marigold' : 'bg-cobalt') : 'bg-paper-2'}`}>
                {post >= 0 && <span className="size-1 rounded-full bg-on-cobalt" />}
              </span>
            )
          })}
        </div>
        <div className="mt-3 flex gap-3 text-[10px] text-ink-soft">
          <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-cobalt" />Post</span>
          <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-marigold" />Reel</span>
        </div>
      </Pop>
    </div>
  )
}

const visuals = { web: Web, seo: Seo, decks: Decks, video: Video, social: Social }
