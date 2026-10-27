import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, MousePointer2 } from 'lucide-react'
import { navLinks, profile } from '../../data/site'
import { useGoToSection } from '../../hooks/useGoToSection'
import { scrollToTop } from '../../lib/scroll'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'
import FollowBlob from '../ui/FollowBlob'
import { Monogram, SocialIcon } from '../ui/Brand'
import Screen from '../ui/Screen'

const ease = [0.16, 1, 0.3, 1]

export default function Footer() {
  const goTo = useGoToSection()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-cobalt text-white dark:text-[#0e1119]">
        {/* Glow that trails the pointer across the panel */}
        <FollowBlob className="bg-white/20 dark:bg-white/30" />

        {/* Closing call to action */}
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-6 pb-14 pt-20 sm:px-10 md:pt-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="display max-w-[14ch] text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.92]">
              <SplitText text="Have something in mind? See it first." stagger={0.07} />
            </p>
            <p lang="hi-Latn" className="mt-6 font-display text-xl font-medium md:text-2xl">
              Pehle dekhiye, phir decide kijiye.
            </p>
            <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                variant="light"
                size="lg"
                href="/#contact"
                onClick={(e) => goTo('contact', e)}
                icon={ArrowUpRight}
              >
                Get your free preview
              </Button>
              <a
                href={`mailto:${profile.email}`}
                className="text-lg underline decoration-current/40 underline-offset-[6px] transition-colors hover:decoration-current"
              >
                {profile.email}
              </a>
            </Reveal>
          </div>

          <PreviewStack className="lg:col-span-5" />
        </div>

        {/* Bottom bar */}
        <div className="relative mx-auto flex max-w-[1320px] flex-col gap-8 border-t border-current/20 px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-[10px] bg-white p-0.5">
              <Monogram className="size-7" />
            </span>
            <span className="text-sm opacity-80">
              © {year} {profile.name}. {profile.location}.
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`/#${l.id}`} onClick={(e) => goTo(l.id, e)} className="opacity-80 transition-opacity hover:opacity-100">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-current/25 transition-colors hover:bg-white/15"
              >
                <SocialIcon name={s.icon} className="size-[18px]" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollToTop()}
              aria-label="Back to top"
              className="ml-2 grid size-10 place-items-center rounded-full bg-white text-[#14171f] transition-transform hover:-translate-y-0.5"
            >
              <ArrowUp className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

/**
 * The promise as a picture: real client sites in browser windows, with the
 * front one marked as a free preview. Hovering scrolls both pages.
 */
function PreviewStack({ className = '' }) {
  const reduce = useReducedMotion()
  const enter = (i, rotate) => ({
    initial: reduce ? false : { opacity: 0, y: 50, rotate: 0 },
    whileInView: { opacity: 1, y: 0, rotate },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 1.1, ease, delay: 0.2 + i * 0.15 },
  })

  return (
    <div className={`group relative mx-auto aspect-[5/4] w-full max-w-[560px] ${className}`} aria-hidden="true">
      <motion.div className="absolute right-0 top-0 w-[78%]" {...enter(0, 5)}>
        <Browser src="/work/medical-conference.jpg" url="icaaicon2026.com" />
      </motion.div>
      <motion.div className="absolute bottom-0 left-0 w-[82%]" {...enter(1, -3)}>
        <Browser src="/work/dental-clinic.jpg" url="your-business.in" />
      </motion.div>

      <motion.span
        className="absolute left-[2%] top-[2%] rotate-[-8deg] rounded-full bg-marigold px-4 py-2 font-display text-base sm:left-[4%] sm:top-[12%] sm:px-5 sm:py-2.5 sm:text-lg font-semibold text-[#14171f] shadow-[0_14px_30px_-12px_rgb(0_0_0/0.5)] md:text-xl"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.8 }}
      >
        Free preview
      </motion.span>

      <motion.span
        className="absolute bottom-[14%] right-[10%] text-white drop-shadow-[0_6px_10px_rgb(0_0_0/0.35)]"
        initial={reduce ? false : { opacity: 0, x: 40, y: 30 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay: 1.1 }}
      >
        <MousePointer2 className="size-9 fill-[#14171f] text-white" strokeWidth={1.5} />
      </motion.span>
    </div>
  )
}

function Browser({ src, url }) {
  return (
    <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_30px_60px_-24px_rgb(0_0_0/0.55)] ring-1 ring-black/5">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f3f4f1] px-3.5 py-2.5">
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} className="size-2.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="ml-3 flex-1 truncate rounded-full bg-white px-3 py-1 text-[11px] text-[#4a5060]">{url}</span>
      </div>
      <div className="aspect-[16/10]">
        <Screen src={src} width={460} />
      </div>
    </div>
  )
}
