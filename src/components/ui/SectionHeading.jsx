import Reveal from './Reveal'
import SplitText from './SplitText'

/**
 * Section title + optional intro. Left-aligned, title set large in the
 * condensed display cut. `id` lets sections use it as aria-labelledby.
 * The title's words rise in one by one, then the intro follows.
 */
export default function SectionHeading({ id, title, intro, children, className = '' }) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`}>
      <h2 id={id} className="display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] md:col-span-7">
        {typeof title === 'string' ? <SplitText text={title} /> : title}
      </h2>
      {(intro || children) && (
        <Reveal delay={0.3} className="md:col-span-5 md:pb-2">
          {intro && <p className="max-w-md text-lg text-ink-soft">{intro}</p>}
          {children}
        </Reveal>
      )}
    </div>
  )
}
