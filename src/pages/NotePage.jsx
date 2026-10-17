import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { marked } from 'marked'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { formatDate, getNote } from '../lib/notes'
import { previewMessage, profile, whatsappLink } from '../data/site'
import SplitText from '../components/ui/SplitText'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import NotFound from './NotFound'

/** A single note: /notes/:slug. The Markdown is your own content, rendered at build time and in the browser. */
export default function NotePage() {
  const { slug } = useParams()
  const note = getNote(slug)
  const html = useMemo(() => (note ? marked.parse(note.body, { gfm: true }) : ''), [note])

  if (!note) return <NotFound />

  return (
    <article className="px-5 pb-12 pt-[112px] sm:px-8 md:pt-[136px]">
      <div className="mx-auto max-w-[760px]">
        <Link to="/notes" className="group inline-flex items-center gap-2 rounded-full text-ink-soft transition-colors hover:text-ink">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          All notes
        </Link>

        <header className="mt-10">
          <Reveal as="p" y={12} delay={0.3} className="flex items-center gap-3 text-sm text-ink-soft">
            {note.draft ? (
              <span className="rounded-full border border-dashed border-ink-soft/50 px-2 py-0.5 text-xs">Draft</span>
            ) : (
              <time dateTime={note.date}>{formatDate(note.date)}</time>
            )}
            <span aria-hidden="true">·</span>
            {profile.name}
          </Reveal>
          <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4.25rem)] leading-[0.98]">
            <SplitText key={note.slug} text={note.title} delay={0.35} stagger={0.04} />
          </h1>
          {note.summary && (
            <Reveal as="p" delay={0.55} className="mt-6 text-xl text-ink-soft md:text-[1.4rem] md:leading-snug">
              {note.summary}
            </Reveal>
          )}
        </header>

        <Reveal delay={0.65} className="note-body mt-14 border-t border-line pt-10" dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mt-20 rounded-[28px] bg-paper-2 p-8 sm:p-10">
          <p className="display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1]">Want this done for your business?</p>
          <p className="mt-3 max-w-md text-ink-soft">See a working preview first. You only pay if you like it.</p>
          <Button href={whatsappLink(previewMessage)} target="_blank" rel="noreferrer" size="lg" icon={ArrowUpRight} className="mt-7">
            Get your free preview
          </Button>
        </div>
      </div>
    </article>
  )
}
