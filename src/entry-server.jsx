import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import App from './App'

export { getRoutes, getRouteMeta, getSitemapRoutes, renderHeadTags, SITE_URL } from './lib/seo'

/**
 * Renders the app for one URL to an HTML string. Used only at build time
 * (scripts/prerender.mjs). Streaming + onAllReady lets the lazily loaded
 * pages (case studies, 404) finish rendering instead of their fallback.
 */
export function render(url) {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk
        done()
      },
    })
    sink.on('finish', () => resolve(html))

    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StaticRouter>,
      {
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    )
  })
}
