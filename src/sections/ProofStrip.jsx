import { proof } from '../data/site'
import Fill from '../components/ui/Fill'
import { Stagger, StaggerItem } from '../components/ui/Stagger'

/**
 * Quick proof right under the hero: who the work is for, three facts,
 * and a slow marquee of what it's built with.
 */
export default function ProofStrip() {
  return (
    <section aria-label="Who I work with" className="border-y border-line bg-paper-2">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 sm:px-8 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <p className="text-sm text-ink-soft">Built for</p>
          <Stagger as="ul" stagger={0.05} className="mt-3 flex flex-wrap gap-2">
            {proof.sectors.map((s) => (
              <StaggerItem as="li" key={s} y={10} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.95rem]">
                {s}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Stagger as="dl" stagger={0.1} className="grid grid-cols-3 gap-4 lg:col-span-6 lg:gap-8">
          {proof.stats.map((s) => (
            <StaggerItem key={s.label} className="flex flex-col-reverse gap-1.5">
              <dt className="text-sm leading-snug text-ink-soft">{s.label}</dt>
              <dd className="display text-[clamp(2rem,4.5vw,3.25rem)] leading-none text-cobalt">
                <Fill value={s.value} className="placeholder-sm" />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Tools — decorative motion, the list itself is readable once */}
      <div className="relative overflow-hidden border-t border-line py-5" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)' }}>
        <p className="sr-only">Tools I work with: {proof.tools.join(', ')}</p>
        <div className="marquee flex w-max gap-10 pr-10" aria-hidden="true">
          {[...proof.tools, ...proof.tools].map((tool, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-ink-soft">
              {tool}
              <span className="size-1.5 rounded-full bg-marigold" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
