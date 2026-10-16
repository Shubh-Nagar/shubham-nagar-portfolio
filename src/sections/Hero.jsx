import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { hero, profile } from '../data/site'
import { useGoToSection } from '../hooks/useGoToSection'
import Button from '../components/ui/Button'
import PreviewReveal from '../components/hero/PreviewReveal'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const goTo = useGoToSection()

  return (
    <section aria-labelledby="hero-title" className="relative px-5 pb-20 pt-[112px] sm:px-8 md:pb-28 md:pt-[136px]">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          {/* Availability */}
          <motion.p
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink-soft"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-marigold opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-marigold" />
            </span>
            {profile.availability}
          </motion.p>

          {/* Headline — each line rises out of its own mask */}
          <h1 id="hero-title" className="display text-[clamp(3.25rem,calc(7.2vw+0.75rem),6.75rem)] leading-[0.94]">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
          >
            <p className="mt-8 max-w-[34rem] text-lg text-ink-soft md:text-xl md:leading-relaxed">{hero.intro}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" href="/#work" onClick={(e) => goTo('work', e)} icon={ArrowDown} iconHover="down">
                View work
              </Button>
              <Button size="lg" variant="ghost" href="/#contact" onClick={(e) => goTo('contact', e)} icon={ArrowUpRight}>
                Start a project
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <PreviewReveal />
        </div>
      </div>
    </section>
  )
}
