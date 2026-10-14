import { ScoopShape } from './IceCream.jsx'
import styles from './FlavorCard.module.css'

export function FlavorCard({ flavor }) {
  return (
    <article className={styles.card} style={{ '--flavor': flavor.color }}>
      <div className={styles.art} aria-hidden="true">
        <svg viewBox="0 0 120 96" className={styles.scoop} focusable="false">
          <ScoopShape cx={60} cy={56} r={46} color={flavor.color} speckle={flavor.speckle} />
        </svg>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{flavor.name}</h3>
        <p className={styles.description}>{flavor.description}</p>
        <ul className={styles.tags} role="list" aria-label="Etiquetas">
          {flavor.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
