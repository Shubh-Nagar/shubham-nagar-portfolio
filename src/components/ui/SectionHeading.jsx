import Reveal from './Reveal'

/**
 * Section title + optional intro. Left-aligned, title set large in the
 * condensed display cut. `id` lets sections use it as aria-labelledby.
 */
export default function SectionHeading({ id, title, intro, children, className = '' }) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`}>
      <Reveal className="md:col-span-7">
        <h2 id={id} className="display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
          {title}
        </h2>
      </Reveal>
      {(intro || children) && (
        <Reveal delay={0.1} className="md:col-span-5 md:pb-2">
          {intro && <p className="max-w-md text-lg text-ink-soft">{intro}</p>}
          {children}
        </Reveal>
      )}
    </div>
  )
}
