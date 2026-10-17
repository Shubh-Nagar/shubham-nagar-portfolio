/**
 * Static HTML for every route, so search engines, link previews (WhatsApp,
 * LinkedIn) and visitors without JavaScript get the real page content.
 *
 * Runs after the client and server builds (see "build" in package.json):
 *   dist/index.html            → template (already has the hashed CSS/JS links)
 *   dist-ssr/entry-server.js   → render(url) + route metadata
 * and writes dist/<route>.html, dist/404.html, sitemap.xml and robots.txt.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render, getRoutes, getRouteMeta, getSitemapRoutes, renderHeadTags, SITE_URL } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
)

const template = await readFile(join(dist, 'index.html'), 'utf8')
const SEO_BLOCK = /<!-- seo -->[\s\S]*?<!-- \/seo -->/

if (!SEO_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!-- seo --> block or the empty #root element')
}

// The stylesheet is small (~12 KB compressed), so it's inlined into every page:
// the first paint no longer waits for a separate CSS request.
const STYLESHEET = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/
const cssHref = template.match(STYLESHEET)?.[1]
if (!cssHref) throw new Error('Could not find the built stylesheet <link> in dist/index.html')
const css = await readFile(join(dist, cssHref), 'utf8')
const shell = template.replace(STYLESHEET, () => `<style>${css}</style>`)

const placeholders = new Map() // page → count, reported at the end

async function writePage(url, file) {
  const appHtml = await render(url)
  const found = appHtml.match(/\[PLACEHOLDER/g)
  if (found) placeholders.set(url, found.length)
  const html = shell
    .replace(SEO_BLOCK, renderHeadTags(getRouteMeta(url)))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  console.log(`  prerendered ${url.padEnd(32)} → ${file.slice(dist.length + 1).replace(/\\/g, '/')}`)
}

const routes = getRoutes()
for (const url of routes) {
  // Flat files (work/slug.html) are what Vercel cleanUrls, Netlify and the .htaccess rule map /work/slug to
  await writePage(url, url === '/' ? join(dist, 'index.html') : join(dist, `${url}.html`))
}
await writePage('/404', join(dist, '404.html'))

// Sitemap + robots
const today = new Date().toISOString().slice(0, 10)
const indexable = getSitemapRoutes()
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((url) => `  <url><loc>${SITE_URL}${url}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`
await writeFile(join(dist, 'sitemap.xml'), sitemap)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`  wrote sitemap.xml (${indexable.length} URLs) and robots.txt`)

// Unfinished content must not go live unnoticed
if (placeholders.size) {
  const total = [...placeholders.values()].reduce((a, b) => a + b, 0)
  console.warn(`
  ⚠ ${total} [PLACEHOLDER] items still on the site — replace them in src/data/site.js before launch:`)
  for (const [url, count] of placeholders) console.warn(`      ${url.padEnd(32)} ${count}`)
}

await rm(ssrDir, { recursive: true, force: true })
