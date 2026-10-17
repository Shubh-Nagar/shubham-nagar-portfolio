import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyHeadTags, getRouteMeta } from '../../lib/seo'

/**
 * Updates the title, description, canonical and social tags on client-side
 * navigation. The first page load already has them baked into its HTML.
 */
export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    applyHeadTags(getRouteMeta(pathname))
  }, [pathname])

  return null
}
