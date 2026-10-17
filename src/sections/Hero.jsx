import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero, previewMessage, whatsappLink } from '../data/site'
import { useGoToSection } from '../hooks/useGoToSection'
import Button from '../components/ui/Button'
import { SocialIcon } from '../components/ui/Brand'
import PreviewReveal from '../components/hero/PreviewReveal'
import FloatingStickers from '../components/hero/FloatingStickers'
import Blobs from '../components/ui/Blobs'

const ease = [0.16, 1, 0.3, 1]

// Ambient colour behind the hero — kept inside its bounds so nothing bleeds into Work
const heroBlobs = [
  { className: 'right-[-6%] top-[14%] size-[22rem] sm:size-[34rem]', color: 'bg-cobalt/25 blur-[90px] dark:bg-cobalt/20', depth: 70, duration: 18 },
  { className: 'left-[30%] top-[10%] size-[14rem] sm:size-[20rem]', color: 'bg-marigold/30 blur-[80px] dark:bg-marigold/15', depth: -45, duration: 14 },
  { className: 'left-[-8%] bottom-[18%] size-[16rem] sm:size-[24rem]', color: 'bg-cobalt-soft blur-[70px] dark:bg-cobalt/10', depth: 30, duration: 20 },
]

export default function Hero() {
  const goTo = useGoToSection()
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // As the hero scrolls away, the copy lifts and fades a touch faster than
  // the page while the preview sinks back — a gentle hand-off to the work.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15])
  const previewY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const previewScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate px-5 pb-20 pt-[112px] sm:px-8 md:pb-28 md:pt-[136px]">
      <Blobs blobs={heroBlobs} />

      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <motion.div className="lg:col-span-7" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          {/* Who, where */}
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
            {hero.eyebrow}
          </motion.p>

          {/* Headline — each line rises out of its own mask; the promise's second half in cobalt */}
          <h1 id="hero-title" className="display text-[clamp(3.5rem,calc(8vw+0.75rem),7.5rem)] leading-[0.92]">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === hero.headline.length - 1 ? 'text-cobalt' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.1 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            lang="hi-Latn"
            className="mt-5 font-display text-xl font-medium tracking-tight text-ink-soft md:text-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
          >
            <p className="mt-7 max-w-[36rem] text-lg text-ink-soft md:text-xl md:leading-relaxed">{hero.intro}</p>

            {/* WhatsApp first: most visitors arrive on a phone, from WhatsApp */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" href={whatsappLink(previewMessage)} target="_blank" rel="noreferrer">
                <span className="inline-flex items-center gap-2.5">
                  <SocialIcon name="whatsapp" className="size-5" />
                  Get your free preview
                </span>
              </Button>
              <Button size="lg" variant="ghost" href="/#work" onClick={(e) => goTo('work', e)} icon={ArrowDown} iconHover="down">
                See my work
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="relative lg:col-span-5" style={reduce ? undefined : { y: previewY, scale: previewScale }}>
          <PreviewReveal />
          <FloatingStickers constraintsRef={ref} />
        </motion.div>
      </div>
    </section>
  )
}
