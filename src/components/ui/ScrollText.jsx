import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * A paragraph that "reads itself": each word brightens from faint to full
 * as the paragraph moves up the viewport. Tied to scroll, so it plays at
 * the visitor's own reading pace.
 */
export default function ScrollText({ text, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={reduce}>
            {word}
            {i < words.length - 1 && ' '}
          </Word>
        ))}
      </span>
    </p>
  )
}

function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={still ? undefined : { opacity }}>{children}</motion.span>
}
