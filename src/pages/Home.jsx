import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import Work from '../sections/Work'
import Services from '../sections/Services'
import About from '../sections/About'
import Process from '../sections/Process'
import Testimonials from '../sections/Testimonials'
import Contact from '../sections/Contact'
import { scrollToId } from '../lib/scroll'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    document.title = 'Shubham Nagar — Websites, SEO, decks, video & social'
  }, [])

  // Arriving from another page with a section to jump to (e.g. "Work" from a case study),
  // or with a #hash in the URL.
  useEffect(() => {
    const target = location.state?.scrollTo || location.hash.replace('#', '')
    if (!target) return
    const t = setTimeout(() => scrollToId(target), 450)
    // Clear the request so a page refresh doesn't scroll again (without re-rendering)
    if (location.state?.scrollTo) window.history.replaceState({ ...window.history.state, usr: null }, '')
    return () => clearTimeout(t)
  }, [location.state, location.hash])

  return (
    <>
      <Hero />
      <Work />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <Contact />
    </>
  )
}
