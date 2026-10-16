import { motion } from 'framer-motion'

/**
 * Fades + lifts its children the first time they scroll into view.
 * Used deliberately on section headings and key blocks — not on everything.
 */
export default function Reveal({ children, delay = 0, y = 28, as = 'div', className = '', ...rest }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </Component>
  )
}
