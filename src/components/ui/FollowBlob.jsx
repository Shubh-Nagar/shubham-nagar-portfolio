import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * A soft glowing blob that trails the pointer inside its parent and drifts
 * back to rest when the pointer leaves. The parent needs `relative overflow-hidden`.
 */
export default function FollowBlob({ className = '', size = 420 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 16, mass: 0.8 })
  const sy = useSpring(y, { stiffness: 60, damping: 16, mass: 0.8 })

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return

    // Resting spot: upper right of the panel
    const rest = () => {
      x.set(parent.clientWidth * 0.78 - size / 2)
      y.set(parent.clientHeight * 0.25 - size / 2)
    }
    rest()
    if (reduce) return

    const onMove = (e) => {
      const r = parent.getBoundingClientRect()
      x.set(e.clientX - r.left - size / 2)
      y.set(e.clientY - r.top - size / 2)
    }
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerleave', rest)
    window.addEventListener('resize', rest)
    return () => {
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerleave', rest)
      window.removeEventListener('resize', rest)
    }
  }, [reduce, size, x, y])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      style={{ x: sx, y: sy, width: size, height: size }}
    >
      <div className={`blob size-full blur-3xl ${className}`} />
    </motion.div>
  )
}
