import { useEffect, useRef, useState } from 'react'
import { animate, motion, useReducedMotion, useSpring } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'

/**
 * The signature hero piece: a browser window showing the same page twice —
 * a grey wireframe and the finished design — with a handle you can drag to
 * compare them. It plays one reveal on load, then hands control to the visitor.
 *
 * Everything inside is sized in container-query units (cqw), so the mini
 * site scales cleanly from phone to desktop.
 */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

export default function PreviewReveal() {
  const [pos, setPos] = useState(4)
  const reduce = useReducedMotion()
  const areaRef = useRef(null)
  const dragging = useRef(false)
  const touched = useRef(false)

  // One orchestrated reveal on load (skipped for reduced motion)
  useEffect(() => {
    if (reduce) {
      setPos(56)
      return
    }
    const controls = animate(4, 56, {
      duration: 1.9,
      delay: 1.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => !touched.current && setPos(v),
    })
    return () => controls.stop()
  }, [reduce])

  // Gentle 3D tilt that follows the pointer (desktop only)
  const rotateX = useSpring(0, { stiffness: 120, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 120, damping: 18 })
  const onTilt = (e) => {
    if (reduce || e.pointerType !== 'mouse' || dragging.current) return
    const r = e.currentTarget.getBoundingClientRect()
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 7)
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 7)
  }
  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  // Dragging: mouse can grab anywhere; touch only from the handle so the
  // page can still scroll when a thumb lands on the preview.
  const setFromPointer = (clientX) => {
    const r = areaRef.current.getBoundingClientRect()
    setPos(clamp(((clientX - r.left) / r.width) * 100, 0, 100))
  }
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' && !e.target.closest('[data-handle]')) return
    touched.current = true
    dragging.current = true
    resetTilt()
    e.currentTarget.setPointerCapture(e.pointerId)
    setFromPointer(e.clientX)
  }
  const onPointerMove = (e) => dragging.current && setFromPointer(e.clientX)
  const endDrag = () => (dragging.current = false)

  return (
    <figure className="hero-fade-up relative" style={{ animationDelay: '0.45s', animationDuration: '1.2s', '--rise': '48px' }}>
      {/* Design-canvas dot grid behind the window */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute -inset-8 sm:-inset-12"
        style={{ maskImage: 'radial-gradient(closest-side, #000 55%, transparent)', WebkitMaskImage: 'radial-gradient(closest-side, #000 55%, transparent)' }}
      />

      <div style={{ perspective: 1400 }} onPointerMove={onTilt} onPointerLeave={resetTilt}>
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_1px_0_rgba(255,255,255,.6)_inset,0_30px_60px_-28px_rgba(29,43,168,.45),0_12px_24px_-16px_rgba(20,23,31,.25)] dark:shadow-[0_30px_70px_-30px_rgba(0,0,0,.8)]"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff6159]" />
              <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex h-7 w-full max-w-[60%] items-center justify-center rounded-full bg-paper-2 text-xs text-ink-soft">
              preview.yourclinic.in
            </div>
            <span className="w-[42px]" aria-hidden="true" />
          </div>

          {/* Compare area */}
          <div
            ref={areaRef}
            className="@container relative aspect-[4/3.3] cursor-ew-resize select-none overflow-hidden"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <MiniSite wire />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <MiniSite />
            </div>

            {/* Corner labels */}
            <span className="pointer-events-none absolute left-[2.6cqw] top-[2.4cqw] rounded-full bg-[#0b2b2a]/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
              Finished
            </span>
            <span className="pointer-events-none absolute right-[2.6cqw] top-[2.4cqw] rounded-full border border-line bg-glass px-2.5 py-1 text-[11px] font-medium text-ink-soft backdrop-blur-md">
              Wireframe
            </span>

            {/* Divider + handle */}
            <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-marigold" style={{ left: `${pos}%` }}>
              <div
                data-handle
                className="pointer-events-auto absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none place-items-center rounded-full bg-marigold text-[#14171f] shadow-lg ring-4 ring-marigold/30 active:cursor-grabbing"
              >
                <ChevronsLeftRight className="size-5" aria-hidden="true" />
              </div>
            </div>

            {/* Keyboard / screen-reader control for the same value */}
            <label className="sr-only" htmlFor="preview-compare">
              Compare wireframe and finished design
            </label>
            <input
              id="preview-compare"
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(pos)}
              onChange={(e) => {
                touched.current = true
                setPos(Number(e.target.value))
              }}
              className="peer sr-only"
            />
            <div className="pointer-events-none absolute inset-0 rounded-b-[22px] ring-2 ring-inset ring-cobalt opacity-0 peer-focus-visible:opacity-100" />
          </div>
        </motion.div>
      </div>

      <figcaption className="relative mt-5 flex items-start gap-3 text-sm text-ink-soft">
        <span className="mt-[7px] h-px w-6 shrink-0 bg-ink-soft/50" aria-hidden="true" />
        Drag the handle. This is how every project starts: a working preview you can click through before you commit.
      </figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------
   The mini site — one layout, two renderings (wireframe / finished)
------------------------------------------------------------------- */

const c = {
  bg: '#f3f9f7',
  ink: '#0b2b2a',
  teal: '#0e5e59',
  mint: '#cfe9e2',
  coral: '#c4502f', // deep enough for white text to pass AA contrast
  soft: '#557270',
}

function Box({ label, className = '', children }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[1cqw] border border-dashed border-ink/25 bg-paper-2 text-[1.8cqw] text-ink-soft dark:border-ink/30 ${className}`}
    >
      {label}
      {children}
    </div>
  )
}

function MiniSite({ wire = false }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 flex flex-col px-[4cqw] pb-[4cqw] pt-[10cqw] ${wire ? 'bg-surface' : ''}`}
      style={wire ? undefined : { background: c.bg, color: c.ink }}
    >
      {/* Nav */}
      <div className="flex h-[6cqw] items-center justify-between">
        {wire ? (
          <Box label="Logo" className="h-[5cqw] w-[19cqw]" />
        ) : (
          <div className="flex items-center gap-[1.2cqw] text-[2.5cqw] font-semibold tracking-tight">
            <span className="grid size-[4.6cqw] place-items-center rounded-full" style={{ background: c.teal }}>
              <span className="size-[1.8cqw] rounded-full" style={{ background: c.mint }} />
            </span>
            Your Clinic
          </div>
        )}
        {wire ? (
          <Box label="Menu" className="h-[4cqw] w-[26cqw]" />
        ) : (
          <div className="flex gap-[2.6cqw] text-[2cqw]" style={{ color: c.soft }}>
            <span>Treatments</span>
            <span>Prices</span>
            <span>Visit</span>
          </div>
        )}
        {wire ? (
          <Box label="Button" className="h-[5cqw] w-[16cqw]" />
        ) : (
          <span className="grid h-[5cqw] w-[16cqw] place-items-center rounded-full text-[1.9cqw] font-medium text-white" style={{ background: c.teal }}>
            Book now
          </span>
        )}
      </div>

      {/* Hero */}
      <div className="mt-[4.5cqw] grid grid-cols-[1.12fr_1fr] gap-[4cqw]">
        <div className="flex flex-col">
          {wire ? (
            <Box label="Tagline" className="h-[3cqw] w-[22cqw]" />
          ) : (
            <span className="h-[3cqw] text-[2cqw] font-medium leading-[3cqw]" style={{ color: c.teal }}>
              Vijay Nagar, Indore
            </span>
          )}

          {wire ? (
            <div className="mt-[2cqw] flex flex-col gap-[1.2cqw]">
              <Box label="Headline" className="h-[4.8cqw] w-full" />
              <Box className="h-[4.8cqw] w-[90%]" />
              <Box className="h-[4.8cqw] w-[55%]" />
            </div>
          ) : (
            <p className="mt-[2cqw] font-display text-[5.3cqw] font-semibold leading-[1.13] tracking-[-0.03em]">
              Gentle dentistry, booked in one tap.
            </p>
          )}

          {wire ? (
            <div className="mt-[2.6cqw] flex flex-col gap-[1cqw]">
              <Box className="h-[2.2cqw] w-full" />
              <Box className="h-[2.2cqw] w-[78%]" />
            </div>
          ) : (
            <p className="mt-[2.6cqw] text-[2.05cqw] leading-[1.6]" style={{ color: c.soft }}>
              Painless treatment, clear prices and evening appointments, six days a week.
            </p>
          )}

          <div className="mt-[3.2cqw] flex gap-[1.6cqw]">
            {wire ? (
              <>
                <Box label="Button" className="h-[6cqw] w-[22cqw]" />
                <Box label="Button" className="h-[6cqw] w-[15cqw]" />
              </>
            ) : (
              <>
                <span className="grid h-[6cqw] w-[22cqw] place-items-center rounded-full text-[1.9cqw] font-semibold text-white" style={{ background: c.coral }}>
                  Book on WhatsApp
                </span>
                <span
                  className="grid h-[6cqw] w-[15cqw] place-items-center rounded-full border text-[1.9cqw] font-medium"
                  style={{ borderColor: c.ink + '33' }}
                >
                  See prices
                </span>
              </>
            )}
          </div>
        </div>

        {/* Hero image */}
        {wire ? (
          <Box className="relative overflow-hidden">
            <svg className="absolute inset-0 size-full text-ink/15" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 0L100 100M100 0L0 100" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="relative rounded bg-paper-2 px-[1cqw]">Image</span>
          </Box>
        ) : (
          <div className="relative overflow-hidden rounded-[3cqw]" style={{ background: c.teal }}>
            <svg viewBox="0 0 100 110" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
              <circle cx="78" cy="18" r="38" fill="#167a73" />
              <circle cx="20" cy="100" r="30" fill="#0a4c48" />
              <path
                d="M32 42c0-15 15-18 18-10 3-8 18-5 18 10 0 15-6 22-8 40-1 8-7 8-8 0l-2-14c-1-4-3-4-4 0l-2 14c-1 8-7 8-8 0-2-18-8-25-8-40z"
                fill={c.mint}
              />
              <path d="M40 36c2-4 7-5 10-1" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".8" />
              <path d="M76 52l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" opacity=".9" />
            </svg>
            <span
              className="absolute bottom-[2.4cqw] left-[2.4cqw] rounded-full bg-white px-[1.8cqw] py-[0.9cqw] text-[1.7cqw] font-semibold shadow-sm"
              style={{ color: c.ink }}
            >
              Open today till 8pm
            </span>
          </div>
        )}
      </div>

      {/* Treatment cards */}
      <div className="mt-auto grid h-[12.5cqw] grid-cols-3 gap-[2.4cqw]">
        {['Root canal|from ₹3,500', 'Braces & aligners|from ₹38,000', 'Whitening|from ₹6,000'].map((item) => {
          const [name, price] = item.split('|')
          return wire ? (
            <Box key={name} label="Card" />
          ) : (
            <div key={name} className="flex flex-col justify-between rounded-[1.8cqw] bg-white p-[2cqw] shadow-[0_1px_2px_rgba(11,43,42,.08)]">
              <span className="size-[2.6cqw] rounded-full" style={{ background: c.mint }} />
              <div>
                <div className="text-[2cqw] font-semibold leading-tight">{name}</div>
                <div className="text-[1.7cqw]" style={{ color: c.soft }}>
                  {price}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
