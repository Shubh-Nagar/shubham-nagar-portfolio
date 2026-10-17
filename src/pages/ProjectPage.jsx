import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import { isPlaceholder, ph, projects } from '../data/site'
import { useGoToSection } from '../hooks/useGoToSection'
import Cover from '../components/ui/Cover'
import Reveal from '../components/ui/Reveal'
import Fill from '../components/ui/Fill'
import Button from '../components/ui/Button'
import SplitText from '../components/ui/SplitText'
import CountUp from '../components/ui/CountUp'
import { Stagger, StaggerItem } from '../components/ui/Stagger'
import NotFound from './NotFound'

const ease = [0.16, 1, 0.3, 1]

/** Case study page: /work/:slug */
export default function ProjectPage() {
  const { slug } = useParams()
  const goTo = useGoToSection()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  if (!project) return <NotFound />

  const next = projects[(index + 1) % projects.length]

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Services', value: project.services.join(', ') },
    { label: 'Year', value: project.year },
    { label: 'Timeline', value: project.duration },
  ].filter((m) => m.value)

  // Until real results are in, show three marked slots rather than invented numbers
  const metrics = project.metrics.length
    ? project.metrics
    : [1, 2, 3].map((n) => ({ value: ph('number'), label: ph(`result ${n}`) }))

  const story = [
    { label: 'The problem', text: project.challenge },
    { label: 'What I built', text: project.approach },
    { label: 'What changed', text: project.outcome },
  ]

  return (
    <article className="px-5 pt-[112px] sm:px-8 md:pt-[136px]">
      <div className="mx-auto max-w-[1320px]">
        <a
          href="/#work"
          onClick={(e) => goTo('work', e)}
          className="group inline-flex items-center gap-2 rounded-full text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          All work
        </a>

        <header className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal as="p" y={12} delay={0.3} className="text-cobalt">
              {project.categoryLabel}
            </Reveal>
            <h1 className="display mt-3 text-[clamp(2.75rem,7vw,6rem)] leading-[0.95]">
              <SplitText key={project.slug} text={project.title} delay={0.35} stagger={0.07} />
            </h1>
            <Reveal as="p" delay={0.6} className="mt-6 max-w-2xl text-xl text-ink-soft md:text-2xl md:leading-snug">
              {project.summary}
            </Reveal>
            {project.url && (
              <Reveal delay={0.7} className="mt-8">
                <Button href={project.url} target="_blank" rel="noreferrer" variant="ghost" icon={ExternalLink} iconHover="right">
                  Visit the live site
                </Button>
              </Reveal>
            )}
          </div>
          <Stagger as="dl" delay={0.6} className="grid grid-cols-2 gap-x-6 gap-y-5 self-end text-[0.95rem] lg:col-span-4 lg:grid-cols-1">
            {meta.map((m) => (
              <StaggerItem key={m.label} y={12}>
                <dt className="text-ink-soft">{m.label}</dt>
                <dd className="mt-0.5">
                  <Fill value={m.value} />
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </header>

        <motion.div
          className="mt-14 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
        >
          <Cover src={project.cover} alt={`${project.title} project visual`} eager parallax={6} className="aspect-[4/3] rounded-[28px] md:aspect-[3/2]" />
        </motion.div>

        {/* Results */}
        <Stagger as="ul" stagger={0.1} className="mt-6 grid gap-3 sm:grid-cols-3">
          {metrics.map((m) => (
            <StaggerItem as="li" key={m.label} className="rounded-[22px] bg-paper-2 px-6 py-7">
              {isPlaceholder(m.value) ? (
                <span className="block text-cobalt">
                  <Fill value={m.value} />
                </span>
              ) : (
                <CountUp value={m.value} className="display block text-[2.75rem] leading-none tabular-nums text-cobalt" />
              )}
              <span className="mt-2 block text-ink-soft">
                <Fill value={m.label} />
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Story */}
        <div className="mt-24 space-y-16 md:mt-32 md:space-y-20">
          {story.map((s) => (
            <Reveal key={s.label} className="grid gap-4 border-t border-line pt-8 md:grid-cols-12 md:gap-10">
              <h2 className="font-display text-2xl font-semibold md:col-span-4">{s.label}</h2>
              <p className="max-w-[62ch] text-xl leading-relaxed text-ink-soft md:col-span-8 md:text-[1.35rem] md:leading-[1.6]">
                <Fill value={s.text} />
              </p>
            </Reveal>
          ))}
        </div>

        {/* Next project */}
        <Reveal y={40}>
          <Link
            to={`/work/${next.slug}`}
            className="group mt-28 grid items-center gap-8 rounded-[28px] border border-line p-5 transition-colors hover:border-ink sm:p-6 md:mt-36 md:grid-cols-12"
          >
            <Cover src={next.cover} className="aspect-[4/3] rounded-[20px] md:col-span-4" imgClassName="group-hover:scale-[1.04]" />
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-ink-soft">Next project</p>
              <p className="display mt-2 text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] transition-colors group-hover:text-cobalt">
                {next.title}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium">
                Read the case study
                <ArrowUpRight className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
