import { useReveal } from '../hooks/useReveal.js'

/** Envolve conteúdo que entra suavemente ao aparecer na tela. */
export function Reveal({ as: Tag = 'div', delay = 0, rotate = 0, style, children, ...props }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      data-reveal={visible ? 'visible' : 'hidden'}
      style={{ '--reveal-delay': `${delay}ms`, '--reveal-rotate': `${rotate}deg`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
