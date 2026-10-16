import { about, profile } from '../data/site'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'

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
            <Reveal className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-[28px] bg-cobalt-soft">
              {profile.photo ? (
                <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="size-full object-cover" loading="lazy" />
              ) : (
                // Placeholder until /public/me.jpg is added (see README)
                <div className="dot-grid grid size-full place-items-center" role="img" aria-label={`${profile.name} monogram`}>
                  <span className="display text-[9rem] leading-none text-cobalt">{initials}</span>
                </div>
              )}
            </Reveal>

            <dl className="mt-10 max-w-sm divide-y divide-line border-y border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-[0.95rem]">
                  <dt className="text-ink-soft">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Story + skills */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-6 text-xl leading-relaxed md:text-[1.4rem] md:leading-[1.55]">
              {about.story.map((para, i) => (
                <p key={i} className={i === 0 ? 'text-ink' : 'text-ink-soft'}>
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {about.skills.map((group) => (
                <div key={group.group}>
                  <h3 className="font-display text-xl font-semibold">{group.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-cobalt hover:text-cobalt"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
