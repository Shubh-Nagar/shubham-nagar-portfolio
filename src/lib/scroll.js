/**
 * Small bridge between the Lenis smooth-scroll instance (created in App)
 * and the rest of the app, so any component can scroll to a section.
 */

let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

/** Smoothly scroll to a section by id. Returns false if it isn't on the page. */
export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return false
  if (lenis) {
    // Lenis honours the CSS scroll-margin-top set on sections (clears the fixed nav)
    lenis.scrollTo(el, { immediate, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' })
  }
  return true
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

/** Pause/resume page scrolling (used while the mobile menu is open). */
export function lockScroll(locked) {
  if (lenis) {
    locked ? lenis.stop() : lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
