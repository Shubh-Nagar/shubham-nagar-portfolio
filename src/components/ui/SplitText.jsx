import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/**
 * Headline text whose words rise out of their own masks, one after another,
 * the first time it scrolls into view. Screen readers get the plain string.
 */
export default function SplitText({ text, delay = 0, stagger = 0.06, className = '' }) {
  const words = text.split(' ')

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </motion.span>
  )
}
