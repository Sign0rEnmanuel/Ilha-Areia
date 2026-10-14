import { Button } from '../components/Button.jsx'
import { IceCream } from '../components/IceCream.jsx'
import { OpenBadge } from '../components/OpenBadge.jsx'
import { contact, hero } from '../content/site.js'
import { buildWhatsAppUrl } from '../lib/whatsapp.js'
import styles from './Hero.module.css'

const HERO_SCOOPS = [
  { color: '#c98a4b' },
  { color: '#a8c66c', speckle: '#6b8a3a' },
  { color: '#e8536b' },
]

// Granulados flutuando ao fundo: [x%, y%, rotação, cor, atraso em s]
const SPRINKLES = [
  [3, 96, 30, '#c22656', 0],
  [46, 95, -20, '#ffb547', 1.2],
  [52, 8, 70, '#fff6e9', 0.6],
  [60, 88, 15, '#a8c66c', 2],
  [88, 14, -45, '#ffb547', 0.3],
  [96, 58, 60, '#cdb4e8', 1.6],
  [62, 30, -10, '#fff6e9', 2.4],
  [80, 94, 50, '#cdb4e8', 0.9],
]

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.sprinkles} aria-hidden="true">
        {SPRINKLES.map(([x, y, rot, color, delay]) => (
          <span
            key={`${x}-${y}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: color,
              '--rot': `${rot}deg`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <OpenBadge />
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.eyebrow}>{hero.eyebrow}</span>
            <span className={styles.line}>{hero.titleLines[0]}</span>
            <span className={`${styles.line} ${styles.accent}`}>
              {hero.titleLines[1]}
              <svg
                className={styles.swoosh}
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M4 16 C 60 4, 120 22, 180 10 S 270 8, 296 14" />
              </svg>
            </span>
          </h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <div className={styles.ctas}>
            <Button href="#sabores" size="lg" iconEnd="arrow">
              {hero.ctas.flavors}
            </Button>
            <Button href="#visita" variant="secondary" size="lg" icon="pin">
              {hero.ctas.directions}
            </Button>
            <Button
              href={buildWhatsAppUrl(contact.whatsapp, hero.whatsappMessage)}
              external
              variant="whatsapp"
              size="lg"
              icon="whatsapp"
            >
              {hero.ctas.whatsapp}
            </Button>
          </div>
        </div>

        <div className={styles.art}>
          <div className={styles.blob} aria-hidden="true" />
          <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="hero-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
            </defs>
            <text>
              <textPath href="#hero-ring" textLength="486" lengthAdjust="spacing">
                batido hoje ✺ batido hoje ✺
              </textPath>
            </text>
          </svg>
          <div className={styles.parallax}>
            <div className={styles.float}>
              <IceCream
                scoops={HERO_SCOOPS}
                topping="granulado"
                cherry
                title="Casquinha com três bolas: doce de leite, pistache e morango, com granulado e uma cereja"
              />
            </div>
          </div>
          <ul className={styles.stickers} role="list">
            {hero.stickers.map((sticker) => (
              <li key={sticker}>{sticker}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
