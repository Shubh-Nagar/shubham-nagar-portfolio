/**
 * Notes — short posts written as Markdown files in src/content/notes/.
 *
 * Each file starts with a frontmatter block:
 *
 *   ---
 *   title: Your title
 *   summary: One sentence shown in lists and search results
 *   date: 2026-10-17
 *   draft: true        ← optional; drafts show a "Draft" badge, are noindexed
 *   ---                   and left out of the sitemap
 *
 * The file name becomes the URL: my-note.md → /notes/my-note
 */

const files = import.meta.glob('../content/notes/*.md', { query: '?raw', import: 'default', eager: true })

function parse(path, raw) {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const match = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) throw new Error(`Note "${slug}" is missing its --- frontmatter --- block`)

  const data = {}
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':')
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  if (!data.title || !data.date) throw new Error(`Note "${slug}" needs a title and a date`)

  return {
    slug,
    title: data.title,
    summary: data.summary || '',
    date: data.date,
    draft: data.draft === 'true',
    body: match[2].trim(),
  }
}

/** All notes, newest first. */
export const notes = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))

export const getNote = (slug) => notes.find((n) => n.slug === slug)

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
