import { Button } from '../components/Button.jsx'
import { Icon } from '../components/Icon.jsx'
import { OpenBadge } from '../components/OpenBadge.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { contact, hero, schedule, visit, weekdayNames } from '../content/site.js'
import { formatHour } from '../lib/format.js'
import { getZonedTime } from '../lib/openStatus.js'
import { buildWhatsAppUrl } from '../lib/whatsapp.js'
import styles from './Visit.module.css'

// Semana começando na segunda, como se lê num cartaz de loja.
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]

/** Mapa ilustrado (SVG) — leve, sem iframe de terceiros, e leva ao Google Maps de verdade. */
function MapArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={styles.mapArt}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="300" fill="#e2efc9" />
      <path d="M-10 210 Q120 170 200 190 T410 150" stroke="#fff6e9" strokeWidth="26" fill="none" />
      <path d="M90 -10 L150 310" stroke="#fff6e9" strokeWidth="22" />
      <path d="M260 -10 Q240 140 300 310" stroke="#fff6e9" strokeWidth="18" fill="none" />
      <path d="M-10 70 L410 100" stroke="#fff6e9" strokeWidth="16" />
      <rect
        x="170"
        y="20"
        width="60"
        height="50"
        rx="10"
        fill="#b9d58a"
        stroke="#2a1712"
        strokeWidth="3"
      />
      <circle cx="40" cy="140" r="22" fill="#b9d58a" stroke="#2a1712" strokeWidth="3" />
      {/* A Lagoa da Conceição — perto do centro para aparecer em qualquer recorte do mapa */}
      <path
        d="M236 196 C238 160 284 146 306 168 C328 190 320 248 288 262 C258 276 234 236 236 196 Z"
        fill="#9ed4e6"
        stroke="#2a1712"
        strokeWidth="3"
      />
      <g stroke="#fff6e9" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M252 232 q6 -5 12 0 t12 0" />
        <path d="M270 250 q6 -5 12 0 t12 0" />
      </g>
      <text x="278" y="208" textAnchor="middle" fontSize="14" fontWeight="700" fill="#2a1712">
        Lagoa
      </text>
      <path
        d="M262 160 Q252 124 218 112"
        stroke="#2a1712"
        strokeWidth="3"
        strokeDasharray="6 7"
        fill="none"
      />
    </svg>
  )
}

export function Visit() {
  const today = getZonedTime(new Date(), schedule.timeZone).day
  const { address } = contact

  return (
    <section id="visita" className={styles.section} aria-labelledby="visita-title">
      <div className="container">
        <SectionHeading id="visita-title" eyebrow={visit.eyebrow} title={visit.title} />

        <div className={styles.layout}>
          <Reveal className={styles.mapCard}>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              <MapArt />
              <span className={styles.pin} aria-hidden="true">
                <Icon name="pin" size={34} strokeWidth={2.2} />
              </span>
              <span className={styles.mapLabel}>
                <Icon name="arrow" size={18} />
                {visit.mapCta}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </span>
            </a>
          </Reveal>

          <Reveal className={styles.info} delay={100}>
            <OpenBadge />
            <address className={styles.address}>
              <strong>{address.street}</strong>
              <span>
                {address.district} · {address.city} – {address.region}
              </span>
              <span>CEP {address.postalCode}</span>
            </address>

            <ul className={styles.transport} role="list">
              {visit.transport.map((line) => (
                <li key={line}>
                  <Icon name="check" size={18} />
                  {line}
                </li>
              ))}
            </ul>

            <h3 className={styles.hoursTitle}>
              <Icon name="clock" size={22} /> {visit.hoursTitle}
            </h3>
            <dl className={styles.hours}>
              {WEEK_ORDER.map((day) => {
                const hours = schedule.days[day]
                return (
                  <div key={day} className={day === today ? styles.today : undefined}>
                    <dt>
                      {weekdayNames[day]}
                      {day === today && <span className={styles.todayTag}>hoje</span>}
                    </dt>
                    <dd>
                      {hours ? `${formatHour(hours.open)} – ${formatHour(hours.close)}` : 'fechado'}
                    </dd>
                  </div>
                )
              })}
            </dl>

            <div className={styles.actions}>
              <Button href={contact.mapsUrl} external icon="pin">
                {hero.ctas.directions}
              </Button>
              <Button
                href={buildWhatsAppUrl(contact.whatsapp, hero.whatsappMessage)}
                external
                variant="whatsapp"
                icon="whatsapp"
              >
                {hero.ctas.whatsapp}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
