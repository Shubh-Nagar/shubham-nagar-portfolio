import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin cobalt bar along the top edge showing how far down the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-cobalt"
      style={{ scaleX }}
    />
  )
}
