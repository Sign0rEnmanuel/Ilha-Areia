import { brand } from '../content/site.js'
import styles from './Logo.module.css'

/** Marca: um conezinho + "Gelato artesanal / Ilha & Areia" em duas alturas. */
export function Logo({ tone = 'dark' }) {
  return (
    <span className={`${styles.logo} ${styles[tone]}`}>
      <svg className={styles.mark} viewBox="0 0 40 48" aria-hidden="true" focusable="false">
        <path
          d="M10 22 L30 22 L21 45 Q20 47 19 45 Z"
          fill="#e7a95b"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M6 23 A14 14 0 0 1 34 23 a3.5 3 0 0 1 -7 0 a3.5 3 0 0 1 -6.5 0 a3.5 3 0 0 1 -7 0 a3.5 3 0 0 1 -7.5 0 Z"
          fill="#f6a6b9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="5" r="3.5" fill="#c22656" stroke="currentColor" strokeWidth="2.5" />
      </svg>
      <span className={styles.words}>
        <span className={styles.small}>{brand.logoTagline}</span>{' '}
        <span className={styles.big}>{brand.name}</span>
      </span>
    </span>
  )
}
