import { Icon } from './Icon.jsx'
import styles from './Button.module.css'

/**
 * Botão "adesivo". Vira `<a>` quando recebe `href`.
 * Links externos abrem em nova aba com `rel` seguro.
 */
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconEnd,
  external = false,
  className = '',
  children,
  ...props
}) {
  const classes = [styles.button, styles[variant], styles[size], className].join(' ')
  const content = (
    <>
      {icon && <Icon name={icon} size={20} />}
      <span>{children}</span>
      {iconEnd && <Icon name={iconEnd} size={20} className={styles.iconEnd} />}
    </>
  )

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {content}
        {external && <span className="visually-hidden"> (abre em nova aba)</span>}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
