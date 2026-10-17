import { notes } from '../lib/notes'
import NoteList from '../components/ui/NoteList'
import SplitText from '../components/ui/SplitText'
import Reveal from '../components/ui/Reveal'

/** All notes: /notes */
export default function NotesIndex() {
  return (
    <section aria-labelledby="notes-index-title" className="px-5 pb-24 pt-[112px] sm:px-8 md:pb-36 md:pt-[136px]">
      <div className="mx-auto max-w-[1320px]">
        <h1 id="notes-index-title" className="display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
          <SplitText text="Notes" delay={0.35} />
        </h1>
        <Reveal as="p" delay={0.5} className="mt-6 max-w-2xl text-xl text-ink-soft md:text-2xl md:leading-snug">
          Short, practical pieces for business owners — website teardowns, local SEO, and what actually brings in enquiries.
        </Reveal>
        <div className="mt-16 md:mt-24">
          {notes.length ? <NoteList notes={notes} /> : <p className="text-ink-soft">The first note is on its way.</p>}
        </div>
      </div>
    </section>
  )
}
