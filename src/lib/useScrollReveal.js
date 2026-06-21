import { useEffect, useRef } from 'react'

/**
 * Attach to a container element — all children with .reveal, .reveal-left,
 * .reveal-right will animate in when they enter the viewport.
 */
export function useScrollReveal() {
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return containerRef
}
