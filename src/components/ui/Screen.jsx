/**
 * A full-page screenshot inside a device or browser frame. Shows the top of
 * the page and glides to the bottom while the nearest `group` is hovered.
 * Serves the WebP copies made by scripts/optimize-images.mjs.
 */
export default function Screen({ src, width, className = '' }) {
  const base = src.replace(/\.jpe?g$/i, '')
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes={`${width}px`} />
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`block size-full object-cover object-top transition-[object-position] duration-700 ease-in-out motion-safe:group-hover:object-bottom motion-safe:group-hover:duration-[7s] ${className}`}
      />
    </picture>
  )
}
