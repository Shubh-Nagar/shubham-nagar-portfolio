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
| Name, email, phone, WhatsApp, socials, availability line | `profile` |
| Hero headline (one string per line) and intro | `hero` |
| Story, quick facts, skills | `about` |
| The five services, deliverables, timelines | `services` |
| Projects and case studies (`/work/:slug`) | `projects` |
| Process steps | `process` |
| Testimonials | `testimonials` |

Placeholders to replace before going live:

- `profile.email`, `profile.phone`, `profile.whatsapp` and the social URLs.
- **Your photo:** add `public/me.jpg` and set `profile.photo: '/me.jpg'`.
- **Project images:** covers are SVG illustrations in `public/work/`. Drop in real screenshots
  (JPG/PNG/WebP, ~1600×1200, 4:3 works best) and update each project's `cover` path.
- Projects and testimonials are realistic placeholders — swap them for real ones as you collect them.

## Contact form

- **Default:** the form validates, then opens the visitor's email app with the message pre-filled.
- **Direct delivery:** create a free form endpoint (Formspree, Web3Forms, Getform…) and paste the URL into
  `profile.formEndpoint`. The form will then POST JSON to it and show a "Message sent" state.

## Project structure

```
src/
  App.jsx                 routes, page transitions, Lenis smooth scroll
  index.css               design tokens (light + dark), base styles
  data/site.js            ← all content
  components/
    hero/PreviewReveal    the drag-to-compare wireframe/finished preview
    layout/               Navbar, Footer, ScrollProgress, PageTransition
    ui/                   Button, Reveal, SectionHeading, Cover, ThemeToggle, Brand icons
  sections/               Hero, Work, Services, About, Process, Testimonials, Contact
  pages/                  Home, ProjectPage (case study), NotFound
  hooks/                  theme, active nav section, section scrolling
public/
  work/*.svg              project cover illustrations
  .htaccess               SPA routing for Apache/LiteSpeed (Hostinger, cPanel)
  _redirects              SPA routing for Netlify
vercel.json               SPA routing for Vercel
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

## Deploying

**Vercel / Netlify:** import the repo — build command `npm run build`, output `dist`. Routing configs are included.

**Hostinger / cPanel:** run `npm run build` and upload the *contents* of `dist/` to `public_html`.
The included `.htaccess` is copied into `dist/` automatically so `/work/...` URLs survive a refresh.

## Accessibility & motion

- Semantic landmarks, skip link, visible keyboard focus, labelled controls, `aria-expanded`/`aria-pressed` states.
- The hero preview can be operated with the keyboard (Tab to it, then arrow keys).
- Visitors with **reduced motion** turned on get no smooth scrolling, transforms or tilt — content just appears.
- Light mode by default; the dark-mode choice is remembered per browser.
