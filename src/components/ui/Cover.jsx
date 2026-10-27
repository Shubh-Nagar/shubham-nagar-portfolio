import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

/**
 * Image that fades in once loaded, with a soft placeholder underneath —
 * the "loading state" for project covers.
 *
 * `reveal`   opens the frame from the centre (and settles the zoom) the first
 *            time it scrolls into view. Meant for 24–28px rounded frames.
 * `parallax` lets the picture drift slower than the page, in % of its height.
 * `scroll`   for full-page screenshots: shows the top of the page, and glides
 *            down to the bottom while the card (a `group`) is hovered or
 *            focused. Taller pages scroll for longer, so the pace stays even.
 * Without a `src` it shows a neutral placeholder panel until a real screenshot is added.
 *
 * JPG/PNG sources are served as WebP at 800/1600 px (made by
 * scripts/optimize-images.mjs at build time); `sizes` tells the browser how
 * wide the image will be shown so a phone downloads the small one.
 */
export default function Cover({ src, alt = '', className = '', imgClassName = '', eager = false, reveal = false, parallax = 0, scroll = false, sizes = '100vw' }) {
  const [loaded, setLoaded] = useState(false)
  const [glide, setGlide] = useState(6)
  // The WebP copies only exist after scripts/optimize-images.mjs has run;
  // if one is missing, drop the <source> so the original file loads instead
  const [webpMissing, setWebpMissing] = useState(false)
  const imgRef = useRef(null)
  const frameRef = useRef(null)
  const reduce = useReducedMotion()

  // Cached images can finish before React attaches onLoad
  useEffect(() => {
    if (imgRef.current?.complete) onLoad()
  }, [src])

  // ~1.1s per screen of page height, measured from the image itself
  function onLoad() {
    setLoaded(true)
    const img = imgRef.current
    if (scroll && img?.naturalWidth) setGlide(Math.min(12, Math.max(2.5, (img.naturalHeight / img.naturalWidth) * 1.1)))
  }

  // The image layer is oversized by `parallax`% top and bottom, so it never travels past its edges
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const travel = parallax / (1 + (2 * parallax) / 100)
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`])
  const drift = parallax > 0 && !reduce

  // my-shot.jpg → my-shot-800.webp 800w, my-shot-1600.webp 1600w
  const responsive = src && /\.(jpe?g|png)$/i.test(src)
    ? [800, 1600].map((w) => `${src.replace(/\.(jpe?g|png)$/i, '')}-${w}.webp ${w}w`).join(', ')
    : null

  const revealProps =
    reveal && !reduce
      ? {
          initial: 'hidden',
          whileInView: 'show',
          viewport: { once: true, margin: '0px 0px -10% 0px' },
          variants: {
            hidden: { clipPath: 'inset(8% 8% 8% 8% round 24px)' },
            show: { clipPath: 'inset(0% 0% 0% 0% round 24px)', transition: { duration: 1.2, ease } },
          },
        }
      : {}

  if (!src) {
    return (
      <motion.div ref={frameRef} className={`relative overflow-hidden bg-cobalt-soft ${className}`} {...revealProps}>
        <div className="dot-grid absolute inset-0 grid place-items-center p-6">
          <span className="placeholder bg-paper/70 text-sm">{alt ? `[PLACEHOLDER: screenshot — ${alt}]` : '[PLACEHOLDER: screenshot]'}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div ref={frameRef} className={`relative overflow-hidden bg-paper-2 ${className}`} {...revealProps}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-line/40" aria-hidden="true" />}
      <motion.div
        className="absolute inset-x-0"
        style={drift ? { top: `-${parallax}%`, bottom: `-${parallax}%`, y } : { top: 0, bottom: 0 }}
      >
        <motion.div
          className="size-full"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1, transition: { duration: 1.4, ease } } }}
        >
          <picture>
            {responsive && !webpMissing && <source type="image/webp" srcSet={responsive} sizes={sizes} />}
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              loading={eager ? 'eager' : 'lazy'}
              // lowercase: React 18 passes it straight through as the HTML attribute
              {...(eager && { fetchpriority: 'high' })}
              decoding="async"
              onLoad={onLoad}
              onError={() => responsive && setWebpMissing(true)}
              style={scroll ? { '--glide': `${glide}s` } : undefined}
              className={`size-full object-cover ${
                scroll
                  ? 'object-top transition-[opacity,object-position] duration-700 ease-in-out motion-safe:group-hover:object-bottom motion-safe:group-hover:duration-(--glide) motion-safe:group-focus-visible:object-bottom motion-safe:group-focus-visible:duration-(--glide)'
                  : 'transition-[opacity,transform] duration-700 ease-out-expo'
              } ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
            />
          </picture>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
