import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { navLinks, profile } from '../../data/site'
import { useGoToSection } from '../../hooks/useGoToSection'
import { scrollToTop } from '../../lib/scroll'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'
import FollowBlob from '../ui/FollowBlob'
import { Monogram, SocialIcon } from '../ui/Brand'

export default function Footer() {
  const goTo = useGoToSection()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-cobalt text-white dark:text-[#0e1119]">
        {/* Glow that trails the pointer across the panel */}
        <FollowBlob className="bg-white/20 dark:bg-white/30" />

        {/* Closing call to action */}
        <div className="relative mx-auto max-w-[1320px] px-6 pb-14 pt-20 sm:px-10 md:pt-28">
          <p className="display max-w-[14ch] text-[clamp(2.75rem,8vw,7rem)] leading-[0.92]">
            <SplitText text="Have something in mind? See it first." stagger={0.07} />
          </p>
          <p lang="hi-Latn" className="mt-6 font-display text-xl font-medium opacity-80 md:text-2xl">
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
