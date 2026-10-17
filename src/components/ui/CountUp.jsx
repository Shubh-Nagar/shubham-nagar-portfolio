import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

const NUMBER = /\d[\d,]*(?:\.\d+)?/g

/**
 * Counts the numbers inside a metric ("2.8×", "+4,100", "Top 3") up from
 * zero when it scrolls into view, keeping prefixes, suffixes, commas and
 * decimals intact. Ranges like "41 → 22" are shown as-is.
 */
export default function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const countable = !value.includes('→') && /\d/.test(value)

  useEffect(() => {
    if (!inView || reduce || !countable) return
    const controls = animate(0, 1, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setProgress })
    return () => controls.stop()
  }, [inView, reduce, countable])

  const shown =
    reduce || !countable || progress >= 1
      ? value
      : value.replace(NUMBER, (match) => {
          const decimals = (match.split('.')[1] || '').length
          const current = parseFloat(match.replace(/,/g, '')) * progress
          const formatted = current.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
          return match.includes(',') ? formatted : formatted.replace(/,/g, '')
        })

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  )
}
