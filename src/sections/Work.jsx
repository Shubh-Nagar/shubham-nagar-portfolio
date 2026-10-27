import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { coverAlt, projects, workFilters } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'
import Cover from '../components/ui/Cover'
import Reveal from '../components/ui/Reveal'
import Fill from '../components/ui/Fill'

const ease = [0.16, 1, 0.3, 1]

// Alternating wide/narrow rhythm. Aspect ratios are paired so cards in the
// same row end up the same height.
const layout = [
  { span: 'md:col-span-7', aspect: 'aspect-[4/3]' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/3] md:aspect-[20/21]' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/3] md:aspect-[20/21]' },
  { span: 'md:col-span-7', aspect: 'aspect-[4/3]' },
  { span: 'md:col-span-6', aspect: 'aspect-[4/3] md:aspect-[8/7]' },
  { span: 'md:col-span-6', aspect: 'aspect-[4/3] md:aspect-[8/7]' },
]

export default function Work() {
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const c = { all: projects.length }
    projects.forEach((p) => (c[p.category] = (c[p.category] || 0) + 1))
    return c
  }, [])

  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" aria-labelledby="work-title" className="px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="work-title"
          title="Selected work"
          intro="Real projects, from clinic websites to AI tools. Each one: the problem, what I built, and what changed."
        />

        {/* Filters */}
        <Reveal delay={0.15} role="group" aria-label="Filter projects" className="mt-12 flex flex-wrap gap-2 md:mt-16">
          {/* Only categories that have projects get a chip */}
          {workFilters.filter((f) => counts[f.id]).map((f) => {
            const active = filter === f.id
            const count = counts[f.id]
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`relative isolate rounded-full border px-4 py-2 text-[0.95rem] transition-colors ${
                  active ? 'border-ink text-paper' : 'border-line text-ink hover:border-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {f.label}
                <span className={`ml-1.5 text-xs tabular-nums ${active ? 'text-paper/70' : 'text-ink-soft'}`}>{count}</span>
              </button>
            )
          })}
        </Reveal>

        {/* Grid */}
        <motion.ul layout className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-12 md:gap-y-16">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => {
              const { span, aspect } = layout[i % layout.length]
              return (
                <motion.li
                  layout
                  key={project.slug}
                  className={span}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <ProjectCard project={project} aspect={aspect} />
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}

function ProjectCard({ project, aspect }) {
  return (
    <Link to={`/work/${project.slug}`} className="group block rounded-[24px]">
      <div className="relative">
        <Cover
          src={project.cover}
          alt={project.cover ? coverAlt(project) : project.title}
          className={`rounded-[24px] ${aspect}`}
          scroll
          reveal
          parallax={7}
          sizes="(min-width: 768px) 55vw, 100vw"
        />
        <span className="absolute bottom-4 left-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/30 bg-[#14171f]/55 px-4 py-2 text-sm font-medium text-white opacity-0 backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Read the case study
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>

      {/* Details follow the cover as it opens */}
      <Reveal y={16} delay={0.2}>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-[1.6rem] font-semibold leading-tight tracking-tight transition-colors group-hover:text-cobalt">
              {project.title}
            </h3>
            <p className="mt-1 text-ink-soft">{project.categoryLabel}</p>
          </div>
          {project.year && <span className="pt-1.5 text-sm tabular-nums text-ink-soft">{project.year}</span>}
        </div>
        <p className="mt-4 flex items-center gap-2.5 text-[0.95rem]">
          <span className="size-1.5 shrink-0 rounded-full bg-marigold" aria-hidden="true" />
          <span>
            <Fill value={project.result} />
          </span>
        </p>
      </Reveal>
    </Link>
  )
}
