import { DripDivider } from '../components/DripDivider.jsx'
import { Icon } from '../components/Icon.jsx'
import { Logo } from '../components/Logo.jsx'
import { brand, contact, footer, nav } from '../content/site.js'
import { buildWhatsAppUrl } from '../lib/whatsapp.js'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <DripDivider color="var(--pink-light)" flip />
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo tone="light" />
          <p className={styles.slogan}>{brand.slogan}</p>
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>

        <nav aria-label="Rodapé" className={styles.column}>
          <h2 className={styles.heading}>Navegar</h2>
          <ul role="list">
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.heading}>Contato</h2>
          <ul role="list">
            <li>
              <a
                href={buildWhatsAppUrl(contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} /> {contact.whatsappDisplay}
                <span className="visually-hidden"> no WhatsApp (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>
                <Icon name="phone" size={18} /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>
                <Icon name="mail" size={18} /> {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>Siga a gente</h2>
          <ul role="list" className={styles.social}>
            {contact.social.map((network) => (
              <li key={network.id}>
                <a
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${network.label} ${network.handle} (abre em nova aba)`}
                >
                  <Icon name={network.id} size={22} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {brand.name}. {footer.rights}
        </p>
        <p>{footer.fictional}</p>
        <a href="#inicio" className={styles.top}>
          <Icon name="arrowUp" size={18} /> {footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
