import { schedule, weekdayNames } from '../content/site.js'
import { useOpenStatus } from '../hooks/useOpenStatus.js'
import { describeOpenStatus } from '../lib/openStatus.js'
import styles from './OpenBadge.module.css'

/** Selo "Aberto agora / Fechado" calculado com o horário real da loja. */
export function OpenBadge({ className = '' }) {
  const status = useOpenStatus(schedule)
  const { title, detail } = describeOpenStatus(status, weekdayNames)

  return (
    <p
      className={`${styles.badge} ${status.isOpen ? styles.open : styles.closed} ${className}`}
      role="status"
    >
      <span className={styles.dot} aria-hidden="true" />
      <strong>{title}</strong>
      <span className={styles.detail}>· {detail}</span>
    </p>
  )
}
