import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToId } from '../lib/scroll'

/**
 * Returns a function that scrolls to a home-page section.
 * From another page (e.g. a case study) it navigates home first and
 * Home scrolls to the section once it has mounted.
 */
export function useGoToSection() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id, event) => {
      event?.preventDefault()
      if (pathname === '/') scrollToId(id)
      else navigate('/', { state: { scrollTo: id } })
    },
    [navigate, pathname],
  )
}
