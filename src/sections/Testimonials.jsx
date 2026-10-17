import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../data/site'
import Reveal from '../components/ui/Reveal'
import Blobs from '../components/ui/Blobs'

const ease = [0.16, 1, 0.3, 1]

/**
 * One large quote at a time. Arrow buttons, arrow keys and (on touch)
 * a horizontal swipe move between them.
 */
export default function Testimonials() {
  const [[index, direction], setState] = useState([0, 1])
  const total = testimonials.length
  const t = testimonials[index]
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // The dark card grows to full width as it rises into view
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 35%'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1])

  const go = (dir) => setState(([i]) => [(i + dir + total) % total, dir])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <motion.section
      ref={ref}
      style={reduce ? undefined : { scale }}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative isolate mx-3 overflow-hidden rounded-[32px] bg-[#14171f] px-5 py-24 text-[#eceef2] dark:bg-surface sm:mx-4 sm:px-8 md:py-32"
    >
      <Blobs
        blobs={[
          { className: '-right-24 -top-28 size-[26rem]', color: 'bg-marigold/20 blur-[80px]', depth: -50, duration: 15 },
          { className: '-left-28 -bottom-32 size-[30rem]', color: 'bg-[#2a3bd9]/35 blur-[90px]', depth: 40, duration: 19 },
        ]}
      />

      <div className="mx-auto max-w-[1320px]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="testimonials-title" className="display text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
            What clients say
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm tabular-nums text-white/60" aria-live="polite">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-12 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-[#14171f]"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-12 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-[#14171f]"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </Reveal>

        <div
          className="relative mt-14 min-h-[22rem] md:mt-20 md:min-h-[20rem]"
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.figure
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
              className="grid cursor-grab gap-10 active:cursor-grabbing md:grid-cols-12"
            >
              <blockquote className="md:col-span-10">
                <p className="font-display text-[clamp(1.6rem,3.4vw,3rem)] font-medium leading-[1.18] tracking-[-0.02em]">
                  <span aria-hidden="true" className="text-marigold">
                    “
                  </span>
                  {t.quote}
                  <span aria-hidden="true" className="text-marigold">
                    ”
                  </span>
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-4 md:col-span-10">
                <span className="grid size-12 place-items-center rounded-full bg-white/10 font-display text-lg font-semibold">
                  {t.name
                    .replace('Dr. ', '')
                    .split(' ')
                    .map((w) => w[0])
                    .filter((ch) => /[A-Z]/.test(ch))
                    .slice(0, 2)
                    .join('')}
                </span>
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-sm text-white/60">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-12 flex gap-2" aria-hidden="true">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-marigold' : 'w-4 bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
