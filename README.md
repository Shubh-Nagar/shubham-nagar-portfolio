# Shubham Nagar — Portfolio

Personal portfolio for websites, SEO, corporate presentations, video editing and social media management.
Built around one idea: **clients see a working preview before they pay**.

**Stack:** React 18 · Vite 6 · Tailwind CSS 4 · Framer Motion · React Router · Lenis (smooth scroll) · lucide-react icons · self-hosted variable fonts (Bricolage Grotesque + Instrument Sans).

## Run it

Requires **Node.js 20 or newer**.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

> Windows PowerShell: if `npm` is blocked by the execution policy, run
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once, or use Command Prompt.

## Edit the content

Almost everything lives in **`src/data/site.js`**:

| What | Where |
| --- | --- |
| Name, email, WhatsApp number, socials | `profile` |
| Hero eyebrow, headline (one string per line), Hindi tagline, intro | `hero` |
| Sectors, stats and tools in the strip under the hero | `proof` |
| Story, quick facts, skills | `about` |
| The five services (outcome first), deliverables, timelines | `services` |
| "Because I'm an engineer" band | `engineering` |
| Case studies (`/work/:slug`) — set `hidden: true` to keep one off the site | `allProjects` |
| Process steps | `process` |
| Testimonials — delete them all to hide the section | `testimonials` |

**Notes** are Markdown files in `src/content/notes/` — the file name becomes the URL
(`my-note.md` → `/notes/my-note`). Frontmatter needs `title`, `date` and ideally `summary`;
`draft: true` shows a Draft badge and keeps the note out of search results and the sitemap.

**Placeholders:** anything written as `ph('…')` shows on the site as a dashed `[PLACEHOLDER: …]` tag,
and `npm run build` lists every one still left. Replace them with real content — never with invented
numbers or quotes. Bios and the full pre-launch checklist are in [`BRAND.md`](BRAND.md).

**Images:** your photo goes in `public/me.jpg` (then set `profile.photo: '/me.jpg'`).
Project screenshots go in `public/work/` (JPG/WebP, ~1600×1200, 4:3) — set each project's `cover`.

## Contact form

- **Default:** the form validates, then opens the visitor's email app with the message pre-filled.
- **Direct delivery:** create a free form endpoint (Formspree, Web3Forms, Getform…) and paste the URL into
  `profile.formEndpoint`. The form will then POST JSON to it and show a "Message sent" state.

## Project structure

```
src/
  App.jsx                 routes, page transitions, Lenis smooth scroll
  entry-server.jsx        renders a route to HTML at build time (prerendering)
  lib/seo.js              titles, descriptions, canonical URLs, structured data
  index.css               design tokens (light + dark), base styles
  data/site.js            ← all content
  components/
    hero/PreviewReveal    the drag-to-compare wireframe/finished preview
    layout/               Navbar, Footer, ScrollProgress, PageTransition
    ui/                   Button, Reveal, SectionHeading, Cover, ThemeToggle, Brand icons
  content/notes/*.md      notes (Markdown)
  lib/notes.js            loads and parses the notes
  sections/               Hero, ProofStrip, Work, Process, Services, About, Testimonials, Notes, Contact
  pages/                  Home, ProjectPage, NotesIndex, NotePage, NotFound
  hooks/                  theme, active nav section, section scrolling
public/
  work/                   project screenshots (add your own)
  og.png                  social share image (npm run og)
  .htaccess               clean URLs + 404 for Apache/LiteSpeed (Hostinger, cPanel)
  _redirects              404 handling for Netlify
scripts/
  prerender.mjs           writes static HTML per route, sitemap.xml, robots.txt
  og-image.mjs            renders og.png and apple-touch-icon.png
vercel.json               clean URLs + asset caching for Vercel
```

## Design system

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| Paper | `#F3F4F1` | `#0E1119` | page background |
| Ink | `#14171F` | `#ECEEF2` | text |
| Cobalt | `#2A3BD9` | `#8591FF` | primary actions, links, page-transition curtain |
| Marigold | `#F2B33D` | `#F5C062` | small highlights only: availability dot, preview handle, the "free preview" step |

Colours are CSS variables in `src/index.css`, exposed to Tailwind as `bg-paper`, `text-ink`, `bg-cobalt`, etc.
Change them there and the whole site (including dark mode) follows.

## SEO & prerendering

`npm run build` does three things:

1. `vite build` — the normal client bundle in `dist/`.
2. `vite build --ssr src/entry-server.jsx` — a server bundle that can render any route to HTML.
3. `node scripts/prerender.mjs` — writes real HTML for every route (`dist/index.html`,
   `dist/work/<slug>.html`, `dist/404.html`) plus `sitemap.xml` and `robots.txt`.

So crawlers, WhatsApp/LinkedIn link previews and visitors without JavaScript all get the actual page
content; React then attaches to that HTML in the browser (hydration).

| What | Where |
| --- | --- |
| Domain used for canonical URLs, sitemap, OG tags | `SITE_URL` in `src/lib/seo.js` |
| Page titles, descriptions, structured data (Person + ProfessionalService) | `src/lib/seo.js` |
| Which URLs get prerendered | `getRoutes()` in `src/lib/seo.js` — new projects are picked up automatically |
| Social share image + home-screen icon | `public/og.png`, `public/apple-touch-icon.png` — regenerate with `npm run og` (needs Chrome or Edge installed) |

Check a build the way a crawler sees it:

```bash
npm run build && npm run preview
curl -s http://localhost:4173/work/cleanlabel-ai | grep "<title>"
```

## Deploying

**Vercel (recommended):** import the repo — build command `npm run build`, output `dist`.
`vercel.json` turns on clean URLs (`/work/slug` → `work/slug.html`) and long-term caching for `/assets`.
Unknown URLs get the prerendered `404.html` with a real 404 status.

**Netlify:** same build settings; `public/_redirects` sends unknown URLs to `404.html`.

**Hostinger / cPanel:** run `npm run build` and upload the *contents* of `dist/` to `public_html`.
The included `.htaccess` maps clean URLs to their `.html` files and serves `404.html` for anything else.

## Accessibility & motion

- Semantic landmarks, skip link, visible keyboard focus, labelled controls, `aria-expanded`/`aria-pressed` states.
- The hero preview can be operated with the keyboard (Tab to it, then arrow keys).
- Visitors with **reduced motion** turned on get no smooth scrolling, transforms or tilt — content just appears.
- Light mode by default; the dark-mode choice is remembered per browser.
