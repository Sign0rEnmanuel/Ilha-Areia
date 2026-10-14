import styles from './OptionCard.module.css'

/** Rádio ou checkbox nativo com cara de cartão. Mantém o teclado e os leitores de tela do input real. */
export function OptionCard({
  type = 'radio',
  name,
  value,
  checked,
  disabled = false,
  onChange,
  label,
  detail,
  swatch,
}) {
  return (
    <label className={`${styles.option} ${disabled ? styles.disabled : ''}`}>
      <input
        className={styles.input}
        type={type}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {swatch && (
        <span className={styles.swatch} style={{ background: swatch }} aria-hidden="true" />
      )}
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        {detail && <span className={styles.detail}>{detail}</span>}
      </span>
    </label>
  )
}
