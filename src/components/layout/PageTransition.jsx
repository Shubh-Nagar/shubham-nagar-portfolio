import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

// The very first page load gets the hero's own intro instead of the curtain
let isFirstLoad = true

/**
 * Route transition: a cobalt panel sweeps up over the outgoing page,
 * then lifts away to reveal the incoming one.
 */
export default function PageTransition({ children }) {
  const first = useRef(isFirstLoad).current

  useEffect(() => {
    isFirstLoad = false
  }, [])

  return (
    <>
      <motion.main
        id="main"
        initial={first ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
      </motion.main>

      {/* Uncovers the incoming page */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-cobalt"
        style={{ transformOrigin: 'top' }}
        initial={{ scaleY: first ? 0 : 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.6, ease, delay: 0.05 } }}
      />
      {/* Covers the outgoing page */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-cobalt"
        style={{ transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.45, ease } }}
      />
    </>
  )
}
