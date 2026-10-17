import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/layout/ScrollProgress'
import PageTransition from './components/layout/PageTransition'
import RouteMeta from './components/layout/RouteMeta'
import Home from './pages/Home'
import { scrollToTop, setLenis } from './lib/scroll'

// Case-study and 404 pages are split into their own chunks
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()

  // Smooth scrolling (skipped for visitors who prefer reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    setLenis(lenis)
    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    // reducedMotion="user" turns transform animations off for visitors who ask for it
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cobalt focus:px-4 focus:py-2 focus:text-on-cobalt"
      >
        Skip to content
      </a>
      <RouteMeta />
      <ScrollProgress />
      <Navbar />

      {/* Exit animation finishes, then we jump to the top before the next page enters */}
      <AnimatePresence mode="wait" onExitComplete={() => scrollToTop({ immediate: true })}>
        <PageTransition key={location.pathname}>
          <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work/:slug" element={<ProjectPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </AnimatePresence>

      <Footer />
    </MotionConfig>
  )
}
