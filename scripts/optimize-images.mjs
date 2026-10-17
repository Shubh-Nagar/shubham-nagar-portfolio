/**
 * Makes phone-friendly versions of your screenshots and photo.
 *
 * For every .jpg / .jpeg / .png in public/work/ (and public/me.*), writes
 * WebP copies at 800 and 1600 px wide next to the original:
 *   public/work/my-project.jpg → my-project-800.webp, my-project-1600.webp
 *
 * <Cover> picks these up automatically, so a phone downloads the 800 px file
 * instead of the full-size screenshot. Runs at the start of `npm run build`;
 * unchanged images are skipped. The generated files are git-ignored.
 */
import { readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

export const WIDTHS = [800, 1600]

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const isSource = (name) => /\.(jpe?g|png)$/i.test(name)

async function sources() {
  const list = []
  const workDir = join(pub, 'work')
  if (existsSync(workDir)) {
    for (const name of await readdir(workDir)) if (isSource(name)) list.push(join(workDir, name))
  }
  for (const name of await readdir(pub)) if (isSource(name) && name.startsWith('me.')) list.push(join(pub, name))
  return list
}

let made = 0
for (const file of await sources()) {
  const base = file.slice(0, -extname(file).length)
  const srcTime = (await stat(file)).mtimeMs
  const meta = await sharp(file).metadata()

  for (const width of WIDTHS) {
    const out = `${base}-${width}.webp`
    if (existsSync(out) && (await stat(out)).mtimeMs >= srcTime) continue
    await sharp(file)
      .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(out)
    made++
  }
}
console.log(made ? `  optimized images: ${made} file(s) written` : '  optimized images: up to date')
