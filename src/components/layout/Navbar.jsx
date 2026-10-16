import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

import { navLinks, profile } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useGoToSection } from '../../hooks/useGoToSection'
import { lockScroll, scrollToTop } from '../../lib/scroll'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'
import { Monogram, SocialIcon } from '../ui/Brand'

const sectionIds = navLinks.map((l) => l.id)
const ease = [0.16, 1, 0.3, 1]

export default function Navbar() {
  const { pathname } = useLocation()
  const goTo = useGoToSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds, pathname === '/')

  // Glass background once the page has scrolled a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change; lock page scroll while it's open
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    lockScroll(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleLink = (id) => (e) => {
    setOpen(false)
    // Let the menu start closing before we scroll
    setTimeout(() => goTo(id), open ? 250 : 0)
    e.preventDefault()
  }

  const handleLogo = (e) => {
    if (pathname === '/') {
      e.preventDefault()
      scrollToTop()
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-line/70 bg-glass backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
          <Link to="/" onClick={handleLogo} className="flex items-center gap-2.5 rounded-lg" aria-label={`${profile.name}, home`}>
            <Monogram className="size-8" />
            <span className="font-display text-[1.05rem] font-semibold tracking-tight">{profile.name}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  onClick={handleLink(link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`relative isolate block rounded-full px-4 py-2 text-[0.95rem] transition-colors ${
                    active === link.id ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-paper-2"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <span className="hidden sm:block">
              <Button href="/#contact" onClick={handleLink('contact')} icon={ArrowUpRight}>
                Start a project
              </Button>
            </span>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative grid size-11 place-items-center rounded-full bg-ink text-paper lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 top-0 h-[2px] w-5 rounded bg-current"
                  animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] w-5 rounded bg-current"
                  animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease }}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col overflow-y-auto bg-paper px-5 pb-8 pt-6 sm:px-8 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
            data-lenis-prevent
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li key={link.id} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={`/#${link.id}`}
                    onClick={handleLink(link.id)}
                    className="display flex items-baseline justify-between py-4 text-[2.6rem] leading-none"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.6, ease, delay: 0.12 + i * 0.05 }}
                  >
                    {link.label}
                    <ArrowUpRight className="size-6 text-ink-soft" aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="mt-auto flex flex-col gap-5 pt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${profile.email}`} className="text-xl font-medium underline decoration-line underline-offset-4">
                {profile.email}
              </a>
              <div className="flex gap-2">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-line"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
