import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatDate } from '../../lib/notes'
import { Stagger, StaggerItem } from './Stagger'

/** A ruled list of notes: date, title, summary. Used on the home page and /notes. */
export default function NoteList({ notes }) {
  return (
    <Stagger as="ul" className="border-t border-line">
      {notes.map((note) => (
        <StaggerItem as="li" key={note.slug} className="border-b border-line">
          <Link
            to={`/notes/${note.slug}`}
            className="group grid gap-2 py-8 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8 md:py-10"
          >
            <span className="flex items-center gap-2 text-sm text-ink-soft">
              {note.draft ? <span className="rounded-full border border-dashed border-ink-soft/50 px-2 py-0.5 text-xs">Draft</span> : formatDate(note.date)}
            </span>
            <span>
              <span className="block font-display text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-cobalt md:text-[1.9rem]">
                {note.title}
              </span>
              {note.summary && <span className="mt-2 block max-w-2xl text-ink-soft">{note.summary}</span>}
            </span>
            <ArrowUpRight
              className="hidden size-6 text-ink-soft transition-[transform,color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-cobalt md:block"
              aria-hidden="true"
            />
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
