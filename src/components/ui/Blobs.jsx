import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/**
 * Blurred, slowly morphing colour blobs that lean towards the pointer.
 * Each blob moves by its own `depth`, so they drift apart like layers.
 *
 * blobs: [{ className, color, depth?, duration? }] — className sets size and position,
 * color the fill and blur.
 */
export default function Blobs({ blobs, className = '' }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 30, damping: 18 })
  const sy = useSpring(py, { stiffness: 30, damping: 18 })

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, px, py])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      {blobs.map((b, i) => (
        <BlobLayer key={i} {...b} sx={sx} sy={sy} />
      ))}
    </div>
  )
}

function BlobLayer({ className, color, depth = 40, duration = 16, sx, sy }) {
  const x = useTransform(sx, (v) => v * depth)
  const y = useTransform(sy, (v) => v * depth)
  return (
    <motion.div className={`absolute ${className}`} style={{ x, y }}>
      <div className={`blob size-full ${color}`} style={{ animationDuration: `${duration}s` }} />
    </motion.div>
  )
}
