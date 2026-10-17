/**
 * ------------------------------------------------------------------
 *  SEO — one source for every page's title, description, canonical
 *  URL, social image and structured data.
 *
 *  Used in two places:
 *   - at build time, by scripts/prerender.mjs, to write real <head>
 *     tags into each page's static HTML
 *   - in the browser, by <RouteMeta />, to keep them in sync as the
 *     visitor navigates between pages
 * ------------------------------------------------------------------
 */
import { profile, projects, services } from '../data/site'

export const SITE_URL = 'https://shubhamnagar.in'
export const SITE_NAME = 'Shubham Nagar'

const OG_IMAGE = { url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: 'Shubham Nagar — See it first, then decide' }

const home = {
  title: 'Shubham Nagar · Designer & developer in Indore',
  socialTitle: 'See it first, then decide — Shubham Nagar',
  description:
    'One person for your whole online presence: website, SEO, presentations, video and social. Based in Indore. Every project starts with a free working preview.',
}

const notFound = {
  title: 'Page not found — Shubham Nagar',
  description: 'This page doesn’t exist. Everything else is on the home page.',
  noindex: true,
}

/** Every URL that gets its own prerendered HTML file (and a sitemap entry). */
export function getRoutes() {
  return ['/', ...projects.map((p) => `/work/${p.slug}`)]
}

/** Head metadata for a pathname. Unknown paths get the 404 metadata. */
export function getRouteMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return withDefaults(home, '/')

  const work = path.match(/^\/work\/([^/]+)$/)
  const project = work && projects.find((p) => p.slug === work[1])
  if (project) {
    return withDefaults(
      {
        title: `${project.title} — Case study · Shubham Nagar`,
        socialTitle: `${project.title} — a case study by Shubham Nagar`,
        description: project.summary,
        type: 'article',
      },
      path,
    )
  }

  return withDefaults(notFound, null)
}

function withDefaults(meta, path) {
  return {
    type: 'website',
    socialTitle: meta.title,
    image: OG_IMAGE,
    ...meta,
    canonical: path ? SITE_URL + (path === '/' ? '/' : path) : null,
  }
}

/** Person + ProfessionalService, linked together, for Google's knowledge panel and local results. */
export function getStructuredData() {
  // Only real profile links (not bare platform home pages) count as sameAs
  const sameAs = profile.socials
    .map((s) => s.href)
    .filter((href) => {
      try {
        return new URL(href).pathname.length > 1
      } catch {
        return false
      }
    })

  const address = {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: profile.name,
        url: `${SITE_URL}/`,
        image: OG_IMAGE.url,
        jobTitle: 'Designer & developer',
        email: `mailto:${profile.email}`,
        address,
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'NMIMS Mukesh Patel School of Technology Management & Engineering',
        },
        knowsAbout: ['Web design', 'Web development', 'Search engine optimisation', 'Presentation design', 'Video editing', 'Social media management', 'Business process automation'],
        ...(sameAs.length && { sameAs }),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: `${profile.name} — Design & Development`,
        url: `${SITE_URL}/`,
        image: OG_IMAGE.url,
        description: home.description,
        email: profile.email,
        // telephone: add once the real number is in src/data/site.js
        address,
        geo: { '@type': 'GeoCoordinates', latitude: 22.7196, longitude: 75.8577 },
        areaServed: [
          { '@type': 'City', name: 'Indore' },
          { '@type': 'Country', name: 'India' },
        ],
        founder: { '@id': `${SITE_URL}/#person` },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.short },
          })),
        },
        ...(sameAs.length && { sameAs }),
      },
    ],
  }
}

/* ------------------------------------------------------------------
   Rendering helpers
------------------------------------------------------------------- */

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** The page-specific <head> tags, as an HTML string (build time). */
export function renderHeadTags(meta) {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    meta.noindex && `<meta name="robots" content="noindex" />`,
    meta.canonical && `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.socialTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    meta.canonical && `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:image" content="${meta.image.url}" />`,
    `<meta property="og:image:width" content="${meta.image.width}" />`,
    `<meta property="og:image:height" content="${meta.image.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.image.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.socialTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${meta.image.url}" />`,
    // "<" is escaped so the JSON can never close the script tag early
    `<script type="application/ld+json">${JSON.stringify(getStructuredData()).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}

/** Keeps the live document's head in step with the current route (browser). */
export function applyHeadTags(meta) {
  document.title = meta.title

  const set = (selector, create, value) => {
    let el = document.head.querySelector(selector)
    if (value == null) {
      el?.remove()
      return
    }
    if (!el) {
      el = create()
      document.head.appendChild(el)
    }
    el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value)
  }
  const meta_ = (attr, key) => () => {
    const el = document.createElement('meta')
    el.setAttribute(attr, key)
    return el
  }

  set('meta[name="description"]', meta_('name', 'description'), meta.description)
  set('meta[name="robots"]', meta_('name', 'robots'), meta.noindex ? 'noindex' : null)
  set(
    'link[rel="canonical"]',
    () => {
      const el = document.createElement('link')
      el.rel = 'canonical'
      return el
    },
    meta.canonical,
  )
  set('meta[property="og:type"]', meta_('property', 'og:type'), meta.type)
  set('meta[property="og:title"]', meta_('property', 'og:title'), meta.socialTitle)
  set('meta[property="og:description"]', meta_('property', 'og:description'), meta.description)
  set('meta[property="og:url"]', meta_('property', 'og:url'), meta.canonical)
  set('meta[name="twitter:title"]', meta_('name', 'twitter:title'), meta.socialTitle)
  set('meta[name="twitter:description"]', meta_('name', 'twitter:description'), meta.description)
}
