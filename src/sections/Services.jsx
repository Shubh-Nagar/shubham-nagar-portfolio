import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clapperboard, Megaphone, MonitorSmartphone, Plus, Presentation, Search, Check } from 'lucide-react'
import { services } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'

const icons = {
  web: MonitorSmartphone,
  seo: Search,
  decks: Presentation,
  video: Clapperboard,
  social: Megaphone,
}

const ease = [0.16, 1, 0.3, 1]

/**
 * Services as an expanding list rather than a grid of identical cards:
 * one row per service, click to open the detail.
 */
export default function Services() {
  const [openId, setOpenId] = useState(services[0].id)

  return (
    <section id="services" aria-labelledby="services-title" className="bg-paper-2 px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="services-title"
          title="Five things, done properly."
          intro="Most clients start with one and add the rest once they've seen the first one work."
        />

        <ul className="mt-16 border-t border-line md:mt-20">
          {services.map((service) => {
            const Icon = icons[service.icon]
            const open = openId === service.id
            return (
              <li key={service.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : service.id)}
                    aria-expanded={open}
                    aria-controls={`service-${service.id}`}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-7 text-left md:grid-cols-[auto_minmax(0,5fr)_minmax(0,4fr)_auto] md:gap-8 md:py-9"
                  >
                    <span
                      className={`grid size-12 place-items-center rounded-2xl transition-colors duration-300 md:size-14 ${
                        open ? 'bg-cobalt text-on-cobalt' : 'bg-surface text-ink group-hover:text-cobalt'
                      }`}
                    >
                      <Icon className="size-5 md:size-6" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="font-display text-[1.6rem] font-semibold leading-tight tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-1 md:text-[2.4rem]">
                      {service.title}
                    </span>
                    <span className="hidden font-sans text-base font-normal tracking-normal text-ink-soft md:block">{service.short}</span>
                    <span
                      className={`grid size-11 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-out-expo ${
                        open ? 'rotate-45 border-ink bg-ink text-paper' : 'border-line group-hover:border-ink'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="size-5" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`service-${service.id}`}
                      role="region"
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[3.5rem_minmax(0,5fr)_minmax(0,4fr)_2.75rem] md:gap-8">
                        <p className="text-ink-soft md:hidden">{service.short}</p>
                        <div className="md:col-start-2">
                          <p className="max-w-xl text-lg leading-relaxed">{service.description}</p>
                          <p className="mt-6 text-sm text-ink-soft">
                            Typical timeline: <span className="text-ink">{service.timeline}</span>
                          </p>
                        </div>
                        <ul className="space-y-3 md:col-start-3">
                          {service.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-3">
                              <Check className="mt-1 size-4 shrink-0 text-cobalt" aria-hidden="true" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
