import { useEffect, useState } from 'react'

/** Retorna o id da seção que está no meio da tela (para destacar o link no menu). */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}
