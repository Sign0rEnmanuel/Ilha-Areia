import { useEffect, useRef, useState } from 'react'
import { contact, hero, nav } from '../content/site.js'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { useScrolled } from '../hooks/useScrolled.js'
import { buildWhatsAppUrl } from '../lib/whatsapp.js'
import { Button } from './Button.jsx'
import { Icon } from './Icon.jsx'
import { Logo } from './Logo.jsx'
import styles from './Navbar.module.css'

const SECTION_IDS = nav.map((item) => item.id)
const DESKTOP_QUERY = '(min-width: 60rem)'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(SECTION_IDS)
  const toggleRef = useRef(null)

  // Com o menu mobile aberto: trava o scroll, desativa o resto da página e fecha com Esc.
  useEffect(() => {
    if (!open) return undefined
    const background = document.querySelectorAll('main, footer')
    background.forEach((node) => node.setAttribute('inert', ''))
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onDesktop = (event) => event.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)

    return () => {
      background.forEach((node) => node.removeAttribute('inert'))
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`${styles.header} ${open ? styles.menuOpen : scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.bar}>
        {/* Nome acessível = texto visível do logo + destino (WCAG 2.5.3, "label in name") */}
        <a href="#inicio" className={styles.brand} onClick={close}>
          <Logo />
          <span className="visually-hidden"> – voltar ao início</span>
        </a>

        <nav aria-label="Principal" className={styles.nav}>
          <ul id="menu-principal" className={styles.links} data-open={open} role="list">
            {nav.map((item, index) => (
              <li key={item.id} style={{ '--i': index }}>
                <a
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={close}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className={styles.mobileCta} style={{ '--i': nav.length }}>
              <Button
                href={buildWhatsAppUrl(contact.whatsapp, hero.whatsappMessage)}
                external
                variant="whatsapp"
                icon="whatsapp"
                onClick={close}
              >
                {hero.ctas.whatsapp}
              </Button>
            </li>
          </ul>
        </nav>

        <Button
          href={buildWhatsAppUrl(contact.whatsapp, hero.whatsappMessage)}
          external
          variant="whatsapp"
          size="sm"
          icon="whatsapp"
          className={styles.desktopCta}
        >
          Pedir
        </Button>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
          <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </div>
    </header>
  )
}
