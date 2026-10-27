import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { Bot, ChartColumn, Check, Clapperboard, Megaphone, MonitorSmartphone, Presentation, Search, Workflow } from 'lucide-react'
import { engineering, services } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'
import { Stagger, StaggerItem } from '../components/ui/Stagger'
import Reveal from '../components/ui/Reveal'
import ServiceVisual from '../components/services/ServiceVisual'
import ServiceBackdrop from '../components/services/ServiceBackdrop'

const icons = {
  web: MonitorSmartphone,
  seo: Search,
  decks: Presentation,
  video: Clapperboard,
  social: Megaphone,
}

const engineeringIcons = {
  automate: Workflow,
  dashboards: ChartColumn,
  ai: Bot,
}

const ease = [0.16, 1, 0.3, 1]

const fadeEnds = 'linear-gradient(transparent, #000 18vh, #000 calc(100% - 30vh), transparent)'

// The pinned picture leaves upward and the next one rises from below
// (reversed when scrolling back up)
const slide = {
  enter: (dir) => ({ y: dir > 0 ? '100%' : '-100%', opacity: 0.4, scale: 0.94 }),
  center: { y: '0%', opacity: 1, scale: 1 },
  exit: (dir) => ({ y: dir > 0 ? '-100%' : '100%', opacity: 0.4, scale: 0.94 }),
}

/**
 * Services as a scroll story: on desktop the text for each service scrolls
 * past on the left while a pinned panel on the right swaps its picture
 * upward to match. On smaller screens each service stacks with its picture.
 * Below: what the engineering background adds.
 */
export default function Services() {
  const [[active, direction], setActive] = useState([0, 1])
  const listRef = useRef(null)
  const reduce = useReducedMotion()

  // Whichever service's slice of the list is crossing the middle of the screen
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length)))
    setActive(([prev, dir]) => (next === prev ? [prev, dir] : [next, next > prev ? 1 : -1]))
  })

  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate overflow-x-clip bg-paper-2 px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="services-title"
          title="Your whole online presence. One person."
          intro="Most owners juggle a web agency, an SEO freelancer, a video editor and someone for Instagram. I do all five, so nothing falls through the cracks and you have one number to call."
        />

        <div ref={listRef} className="relative mt-16 md:mt-20 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Full-width scene behind the story, pinned while it scrolls */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
            // Fade in/out at the story's ends instead of a hard edge
            style={{ maskImage: fadeEnds, WebkitMaskImage: fadeEnds }}
          >
            <ServiceBackdrop id={services[active].id} direction={direction} />
          </div>

          {/* Text: scrolls normally; the one passing the middle of the screen is "active" */}
          <ol className="lg:col-span-6">
            {services.map((service, i) => {
              const Icon = icons[service.icon]
              const isActive = active === i
              return (
                <li
                  key={service.id}
                  className={`border-t border-line py-12 transition-opacity duration-500 first:border-t-0 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0 ${
                    isActive ? 'lg:opacity-100' : 'lg:opacity-25'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`grid size-12 place-items-center rounded-2xl transition-colors duration-500 md:size-14 ${
                        isActive ? 'bg-cobalt text-on-cobalt' : 'bg-surface text-ink'
                      }`}
                    >
                      <Icon className="size-5 md:size-6" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="font-display text-sm font-semibold tabular-nums text-ink-soft">
                      {String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[2rem] font-semibold leading-[1.05] tracking-tight md:text-[2.8rem]">{service.title}</h3>
                  <p className="mt-3 text-lg text-cobalt">{service.short}</p>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{service.description}</p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3">
                        <Check className="mt-1 size-4 shrink-0 text-cobalt" aria-hidden="true" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 text-sm text-ink-soft">
                    Typical timeline: <span className="text-ink">{service.timeline}</span>
                  </p>

                  {/* Phones and tablets: the picture sits under its text */}
                  <Reveal className="mt-10 lg:hidden">
                    <ServiceVisual id={service.id} />
                  </Reveal>
                </li>
              )
            })}
          </ol>

          {/* Desktop: a pinned panel whose picture slides up to the next service */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[14vh] h-[72vh]">
              <div className="relative h-full overflow-hidden rounded-[28px]">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reduce ? 0 : 0.8, ease }}
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full">
                      <ServiceVisual id={services[active].id} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress rail */}
              <div className="absolute -right-6 top-1/2 flex -translate-y-1/2 flex-col gap-2" aria-hidden="true">
                {services.map((s, i) => (
                  <span
                    key={s.id}
                    className={`w-1 rounded-full transition-all duration-500 ${i === active ? 'h-10 bg-cobalt' : 'h-4 bg-line'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What the engineering background adds */}
        <div className="mt-20 grid gap-10 rounded-[28px] bg-surface p-6 sm:p-10 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <h3 className="display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1]">{engineering.title}</h3>
            <p className="mt-4 max-w-sm text-ink-soft">{engineering.intro}</p>
          </Reveal>
          <Stagger as="ul" className="grid gap-8 sm:grid-cols-3 lg:col-span-8 lg:gap-6">
            {engineering.items.map((item) => {
              const Icon = engineeringIcons[item.icon]
              return (
                <StaggerItem as="li" key={item.title}>
                  <span className="grid size-12 place-items-center rounded-2xl bg-cobalt-soft text-cobalt">
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h4 className="mt-5 font-display text-xl font-semibold tracking-tight">{item.title}</h4>
                  <p className="mt-2 text-[0.98rem] text-ink-soft">{item.body}</p>
                </StaggerItem>
              )
            })}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
