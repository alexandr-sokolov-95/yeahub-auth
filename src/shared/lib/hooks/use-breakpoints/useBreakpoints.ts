import { useEffect, useState } from 'react'

export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
} as const

const useMediaQuery = (query: string) => {
  const [matchMedia, setMatchMedia] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const m = window.matchMedia(query)
    const handleChange = () => setMatchMedia(m.matches)

    handleChange()
    m.addEventListener('change', handleChange)

    return () => m.removeEventListener('change', handleChange)
  }, [query])

  return matchMedia
}

export const useBreakpoints = () => {
  const isTablet = useMediaQuery(`(min-width: ${BREAKPOINTS.tablet}px)`)
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`)

  return {
    isMobile: !isTablet,
    isTablet: !isDesktop && isTablet,
    isDesktop: isDesktop,
  }
}
