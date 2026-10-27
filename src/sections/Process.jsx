import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { MonitorSmartphone, PhoneCall, Rocket, UsersRound } from 'lucide-react'
import { process } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'

/**
 * Four steps joined by a line that draws itself as you scroll through
 * the section (horizontal on desktop, vertical on mobile). Each step's
 * number lights up as the line reaches it.
 */
export default function Process() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section id="process" aria-labelledby="process-title" className="px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="process-title"
          title="How it works"
          intro="Pehle dekhiye, phir decide kijiye. You see a working preview before you pay a rupee — and only pay once you like it."
        />

        <ol ref={listRef} className="relative mt-16 grid gap-12 md:mt-24 lg:grid-cols-4 lg:gap-10">
          {/* Track + drawn line — desktop */}
          <div aria-hidden="true" className="absolute left-[32px] right-0 top-[32px] hidden h-px bg-line lg:block">
            <motion.div className="h-full origin-left bg-cobalt" style={{ scaleX: progress }} />
          </div>
          {/* Track + drawn line — mobile */}
          <div aria-hidden="true" className="absolute bottom-0 left-[32px] top-[32px] w-px bg-line lg:hidden">
            <motion.div className="h-full w-full origin-top bg-cobalt" style={{ scaleY: progress }} />
          </div>

          {process.map((step, i) => (
            <Step key={step.title} step={step} index={i} total={process.length} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  )
}

// One icon per step, in the same order as `process` in data/site.js
const stepIcons = [PhoneCall, MonitorSmartphone, UsersRound, Rocket]

function Step({ step, index, total, progress }) {
  const Icon = stepIcons[index]
  // Steps sit at roughly even intervals along the line
  const at = index / total
  const lit = useTransform(progress, [at, at + 0.06], [0, 1])
  const numberColor = useTransform(lit, (v) => (v > 0.5 ? 'var(--on-cobalt)' : 'var(--ink)'))

  return (
    <Reveal as="li" delay={index * 0.08} className="relative grid grid-cols-[64px_1fr] gap-6 lg:block">
      <span
        className={`relative z-10 grid size-16 place-items-center rounded-full border font-display text-lg font-semibold ${
          step.highlight ? 'border-marigold bg-marigold text-[#14171f]' : 'border-line bg-paper text-ink'
        }`}
      >
        {!step.highlight && (
          <motion.span
            aria-hidden="true"
            className="absolute -inset-px rounded-full bg-cobalt"
            style={{ opacity: lit }}
          />
        )}
        <motion.span className="relative" style={step.highlight ? undefined : { color: numberColor }}>
          {Icon ? <Icon aria-hidden="true" className="size-8" strokeWidth={1.75} /> : index + 1}
        </motion.span>
      </span>
      <div className="lg:mt-8 lg:pr-4">
        <p className="text-sm font-medium text-ink-soft">Step {index + 1}</p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">{step.title}</h3>
        <p className="mt-3 max-w-sm text-ink-soft">{step.body}</p>
      </div>
    </Reveal>
  )
}
