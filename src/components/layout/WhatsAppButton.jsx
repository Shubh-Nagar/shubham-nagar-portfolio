import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { previewMessage, whatsappLink } from '../../data/site'
import { SocialIcon } from '../ui/Brand'

const ease = [0.16, 1, 0.3, 1]

/**
 * Sticky WhatsApp button, bottom-right on every page.
 *
 * Appears once the visitor scrolls past the top of the page (the hero has its
 * own WhatsApp button) and steps aside while the contact section or footer is
 * on screen — both already offer WhatsApp, and on phones the button would
 * otherwise sit on top of the form's send button.
 */
export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [covered, setCovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Re-find the contact section and footer on every page change
  useEffect(() => {
    const targets = [document.getElementById('contact'), document.querySelector('footer')].filter(Boolean)
    if (!targets.length) return
    const visible = new Set()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      setCovered(visible.size > 0)
    })
    targets.forEach((t) => observer.observe(t))
    return () => {
      observer.disconnect()
      setCovered(false)
    }
  }, [pathname])

  const show = scrolled && !covered

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="whatsapp"
          href={whatsappLink(previewMessage)}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 flex h-14 items-center rounded-full bg-[#157a43] pl-4 pr-4 text-white shadow-[0_12px_32px_-10px_rgba(21,122,67,.7),0_4px_12px_-4px_rgba(20,23,31,.3)] transition-colors hover:bg-[#10663a] sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          transition={{ duration: 0.5, ease }}
          whileTap={{ scale: 0.92 }}
        >
          {/* One soft pulse when it arrives, to catch the eye without nagging */}
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#157a43] motion-safe:animate-[ping_1.2s_ease-out_2]" />
          <SocialIcon name="whatsapp" className="relative size-6 shrink-0" />
          {/* Label slides out on hover / keyboard focus (desktop) */}
          <span className="relative grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-out-expo group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
            <span className="overflow-hidden whitespace-nowrap">
              <span className="pl-2.5 font-medium">Chat on WhatsApp</span>
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
