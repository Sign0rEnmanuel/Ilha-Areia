import { useEffect, useRef, useState } from 'react'

/**
 * Marca o elemento como visível na primeira vez que ele entra na tela.
 * Sem IntersectionObserver (ex.: testes, navegadores antigos) já começa visível.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (visible || !node) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible, threshold, rootMargin])

  return [ref, visible]
}
