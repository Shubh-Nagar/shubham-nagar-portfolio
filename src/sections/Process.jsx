import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { process } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'

/**
 * Four steps joined by a line that draws itself as you scroll through
 * the section (horizontal on desktop, vertical on mobile).
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
          title="How a project runs"
          intro="Four steps, no surprises. You only pay once you've seen something you like."
        />

        <ol ref={listRef} className="relative mt-16 grid gap-12 md:mt-24 lg:grid-cols-4 lg:gap-10">
          {/* Track + drawn line — desktop */}
          <div aria-hidden="true" className="absolute left-[22px] right-0 top-[22px] hidden h-px bg-line lg:block">
            <motion.div className="h-full origin-left bg-cobalt" style={{ scaleX: progress }} />
          </div>
          {/* Track + drawn line — mobile */}
          <div aria-hidden="true" className="absolute bottom-0 left-[22px] top-[22px] w-px bg-line lg:hidden">
            <motion.div className="h-full w-full origin-top bg-cobalt" style={{ scaleY: progress }} />
          </div>

          {process.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[44px_1fr] gap-6 lg:block">
              <span
                className={`relative z-10 grid size-11 place-items-center rounded-full border font-display text-lg font-semibold ${
                  step.highlight ? 'border-marigold bg-marigold text-[#14171f]' : 'border-line bg-paper text-ink'
                }`}
              >
                {i + 1}
              </span>
              <div className="lg:mt-8 lg:pr-4">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-[1.75rem]">{step.title}</h3>
                <p className="mt-3 max-w-sm text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
