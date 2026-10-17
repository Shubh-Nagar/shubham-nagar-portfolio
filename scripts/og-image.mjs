/**
 * Generates the social share image (public/og.png, 1200×630) and the
 * home-screen icon (public/apple-touch-icon.png, 180×180) by screenshotting
 * small HTML layouts in headless Chrome or Edge, using the site's own fonts.
 *
 *   npm run og
 *
 * Run it again after changing the copy below. Set CHROME_PATH if your
 * browser isn't found automatically.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const font = (pkg, file) => pathToFileURL(join(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).href

const browser = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p))

if (!browser) throw new Error('No Chrome or Edge found — set CHROME_PATH to your browser executable.')

const monogram = `<svg viewBox="0 0 32 32"><rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="#2a3bd9"/><path d="M16 1.5h5.5a9 9 0 0 1 9 9v11a9 9 0 0 1-9 9H16z" fill="#f2b33d"/><path d="M11.6 20.4c.9 1 2.3 1.6 3.9 1.6 2 0 3.4-1 3.4-2.6 0-3.6-7-2.2-7-6 0-1.6 1.4-2.8 3.4-2.8 1.4 0 2.6.5 3.4 1.4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>`

const base = `
  @font-face { font-family: Display; src: url(${font('bricolage-grotesque', 'bricolage-grotesque-latin-standard-normal.woff2')}); font-weight: 200 800; font-stretch: 75% 100%; }
  @font-face { font-family: Sans; src: url(${font('instrument-sans', 'instrument-sans-latin-wght-normal.woff2')}); font-weight: 400 700; }
  * { box-sizing: border-box; margin: 0; }
  html, body { overflow: hidden; }
`

const og = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${base}
  body { width: 1200px; height: 630px; background: #f3f4f1; color: #14171f; font-family: Sans; position: relative; }
  .dots { position: absolute; inset: 0; background-image: radial-gradient(rgb(20 23 31 / .12) 1.4px, transparent 1.4px); background-size: 26px 26px;
          mask-image: radial-gradient(60% 80% at 82% 50%, #000 30%, transparent 75%); }
  .blob { position: absolute; border-radius: 50%; filter: blur(70px); }
  .left { position: absolute; left: 72px; top: 64px; bottom: 60px; width: 640px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 14px; font-family: Display; font-weight: 600; font-size: 26px; letter-spacing: -.02em; }
  .brand svg { width: 44px; height: 44px; }
  h1 { margin-top: 64px; font-family: Display; font-weight: 600; font-stretch: 88%; font-size: 104px; line-height: .92; letter-spacing: -.035em; }
  h1 span { color: #2a3bd9; }
  .hindi { margin-top: 26px; font-size: 27px; color: #4a5060; }
  .services { margin-top: auto; font-size: 22px; color: #4a5060; display: flex; align-items: center; gap: 12px; }
  .services b { width: 9px; height: 9px; border-radius: 50%; background: #f2b33d; display: inline-block; }
  .win { position: absolute; right: 64px; top: 112px; width: 390px; height: 400px; border-radius: 22px; background: #fff; border: 1px solid #d4d8d0;
         box-shadow: 0 30px 60px -28px rgba(29,43,168,.45), 0 12px 24px -16px rgba(20,23,31,.25); overflow: hidden; transform: rotate(3deg); }
  .chrome { height: 40px; border-bottom: 1px solid #d4d8d0; display: flex; align-items: center; gap: 7px; padding: 0 16px; }
  .chrome i { width: 10px; height: 10px; border-radius: 50%; }
  .page { position: absolute; top: 40px; left: 0; right: 0; bottom: 0; padding: 26px; }
  .wire { background: #fff; }
  .wire div { border: 1.5px dashed rgba(20,23,31,.25); border-radius: 8px; background: #e8eae5; }
  .done { background: #eef0ff; clip-path: inset(0 45% 0 0); }
  .done div { border-radius: 8px; }
  .divider { position: absolute; top: 40px; bottom: 0; left: 55%; width: 3px; background: #f2b33d; }
  .handle { position: absolute; top: 50%; left: 50%; width: 40px; height: 40px; margin: -20px; border-radius: 50%; background: #f2b33d; box-shadow: 0 0 0 6px rgb(242 179 61 / .3); }
  .url { position: absolute; right: 72px; bottom: 60px; font-size: 22px; font-weight: 600; color: #2a3bd9; }
</style></head><body>
  <div class="blob" style="width:420px;height:420px;right:40px;top:80px;background:rgb(42 59 217 / .22)"></div>
  <div class="blob" style="width:260px;height:260px;left:420px;top:-60px;background:rgb(242 179 61 / .28)"></div>
  <div class="dots"></div>

  <div class="left">
    <div class="brand">${monogram} Shubham Nagar</div>
    <h1>See it first,<br><span>then decide.</span></h1>
    <p class="hindi">Pehle dekhiye, phir decide kijiye.</p>
    <p class="services"><b></b> Websites · SEO · Decks · Video · Social — Indore</p>
  </div>

  <div class="win">
    <div class="chrome"><i style="background:#ff6159"></i><i style="background:#ffbd2e"></i><i style="background:#28c840"></i></div>
    ${['wire', 'done']
      .map((k) => {
        const fill = k === 'done'
        const c = (wire, done) => (fill ? done : wire)
        return `<div class="page ${k}">
          <div style="height:22px;width:42%;${c('', 'background:#2a3bd9')}"></div>
          <div style="height:30px;width:100%;margin-top:26px;${c('', 'background:#14171f')}"></div>
          <div style="height:30px;width:78%;margin-top:10px;${c('', 'background:#14171f')}"></div>
          <div style="height:12px;width:90%;margin-top:22px;${c('', 'background:#a3a9b8')}"></div>
          <div style="height:12px;width:70%;margin-top:8px;${c('', 'background:#a3a9b8')}"></div>
          <div style="height:40px;width:44%;margin-top:24px;border-radius:999px;${c('', 'background:#2a3bd9')}"></div>
          <div style="display:flex;gap:12px;margin-top:30px;border:0;background:none">
            ${[0, 1, 2].map(() => `<div style="flex:1;height:84px;${c('', 'background:#fff;box-shadow:0 2px 6px rgba(20,23,31,.08)')}"></div>`).join('')}
          </div>
        </div>`
      })
      .join('')}
    <div class="divider"><div class="handle"></div></div>
  </div>

  <div class="url">shubhamnagar.in</div>
</body></html>`

const icon = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${base}
  body { width: 180px; height: 180px; background: #f3f4f1; display: grid; place-items: center; }
  svg { width: 150px; height: 150px; }
</style></head><body>${monogram}</body></html>`

const tmp = mkdtempSync(join(tmpdir(), 'og-'))
try {
  for (const [name, html, w, h] of [
    ['og.png', og, 1200, 630],
    ['apple-touch-icon.png', icon, 180, 180],
  ]) {
    const page = join(tmp, name + '.html')
    writeFileSync(page, html)
    const out = join(root, 'public', name)
    execFileSync(browser, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--allow-file-access-from-files',
      '--virtual-time-budget=3000',
      `--window-size=${w},${h}`,
      `--screenshot=${out}`,
      pathToFileURL(page).href,
    ], { stdio: 'ignore' })
    console.log(`  wrote public/${name}`)
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
