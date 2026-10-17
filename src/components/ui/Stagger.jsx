import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/**
 * A group whose StaggerItem children fade + lift in sequence when the group
 * scrolls into view. Used for lists of facts, chips, metrics and links.
 */
export function Stagger({ children, as = 'div', stagger = 0.08, delay = 0, className = '', ...rest }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({ children, as = 'div', y = 20, className = '', ...rest }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}
