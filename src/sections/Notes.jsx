import { ArrowRight } from 'lucide-react'
import { notes } from '../lib/notes'
import SectionHeading from '../components/ui/SectionHeading'
import NoteList from '../components/ui/NoteList'
import Button from '../components/ui/Button'

/** Latest notes on the home page, with a link to the full list. */
export default function Notes() {
  if (!notes.length) return null

  return (
    <section id="notes" aria-labelledby="notes-title" className="px-5 py-24 sm:px-8 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeading
          id="notes-title"
          title="Notes"
          intro="Short, practical pieces for business owners — website teardowns, local SEO, and what actually brings in enquiries."
        />
        <div className="mt-14 md:mt-20">
          <NoteList notes={notes.slice(0, 3)} />
        </div>
        {notes.length > 3 && (
          <Button to="/notes" variant="ghost" icon={ArrowRight} iconHover="right" className="mt-10">
            All notes
          </Button>
        )}
      </div>
    </section>
  )
}
