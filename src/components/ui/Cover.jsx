import { useEffect, useRef, useState } from 'react'

/**
 * Image that fades in once loaded, with a soft placeholder underneath —
 * the "loading state" for project covers.
 */
export default function Cover({ src, alt = '', className = '', imgClassName = '', eager = false }) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  // Cached images can finish before React attaches onLoad
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [src])

  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-line/40" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`size-full object-cover transition-[opacity,transform] duration-700 ease-out-expo ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
