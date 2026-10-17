import { about, profile } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Cover from '../components/ui/Cover'
import ScrollText from '../components/ui/ScrollText'
import { Stagger, StaggerItem } from '../components/ui/Stagger'

export default function About() {
  const initials = profile.name
    .split(' ')
    .map((p) => p[0])
    .join('')

  return (
    <section id="about" aria-labelledby="about-title" className="px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading id="about-title" title={about.title} />

        <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Portrait + quick facts */}
          <div className="lg:col-span-4">
            {profile.photo ? (
              <Cover
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                className="aspect-[4/5] max-w-sm rounded-[28px]"
                reveal
                parallax={6}
              />
            ) : (
              // Placeholder until /public/me.jpg is added (see README)
              <Reveal className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[28px] bg-cobalt-soft">
                <div className="dot-grid grid size-full place-items-center" role="img" aria-label={`${profile.name} monogram`}>
                  <span className="display text-[9rem] leading-none text-cobalt">{initials}</span>
                </div>
              </Reveal>
            )}

            <Stagger as="dl" className="mt-10 max-w-sm divide-y divide-line border-y border-line">
              {about.facts.map((f) => (
                <StaggerItem key={f.label} y={12} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-[0.95rem]">
                  <dt className="text-ink-soft">{f.label}</dt>
                  <dd>{f.value}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Story + skills */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6 text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.55]">
              {about.story.map((para, i) =>
                // The opening line reads itself in as you scroll; the rest simply rise in
                i === 0 ? (
                  <ScrollText key={i} text={para} className="text-ink" />
                ) : (
                  <Reveal key={i} as="p" y={20} className="text-ink-soft">
                    {para}
                  </Reveal>
                ),
              )}
            </div>

            <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {about.skills.map((group) => (
                <div key={group.group}>
                  <Reveal as="h3" y={14} className="font-display text-xl font-semibold">
                    {group.group}
                  </Reveal>
                  <Stagger as="ul" stagger={0.04} delay={0.1} className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <StaggerItem
                        as="li"
                        key={item}
                        y={10}
                        className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-cobalt hover:text-cobalt"
                      >
                        {item}
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
