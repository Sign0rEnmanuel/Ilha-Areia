import styles from './Marquee.module.css'

/** Faixa rolando com palavras. O texto é lido uma vez só por leitores de tela. */
export function Marquee({ items, label }) {
  const row = (hidden) => (
    <ul className={styles.row} aria-hidden={hidden || undefined} role="list">
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
          <span className={styles.star} aria-hidden="true">
            ✺
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={styles.clip}>
      <div className={styles.marquee} role="region" aria-label={label}>
        <div className={styles.track}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  )
}
