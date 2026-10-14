/**
 * Ícones de traço desenhados à mão (24×24). Decorativos por padrão:
 * se precisarem ser lidos, passe `title`.
 */
const PATHS = {
  whatsapp: (
    <>
      <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
      <path d="M9.2 8.6c.3-.6.9-.6 1.2 0l.6 1.4c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.6.3.6.9 0 1.2-.8.5-1.8.6-2.7.2a8 8 0 0 1-3.6-3.6c-.4-.9-.3-1.9.2-2.7Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  arrowUp: <path d="M12 19V5m-5 5 5-5 5 5" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: (
    <path d="M7.5 3.5h-2a1.5 1.5 0 0 0-1.5 1.6A16 16 0 0 0 18.9 20a1.5 1.5 0 0 0 1.6-1.5v-2.3a1 1 0 0 0-.8-1l-3.1-.7a1 1 0 0 0-1 .3l-1.3 1.4a12 12 0 0 1-5.5-5.5l1.4-1.3a1 1 0 0 0 .3-1l-.7-3.1a1 1 0 0 0-1-.8Z" />
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  tiktok: <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.4 2.6 2.3 4.4 5 4.6" />,
  facebook: (
    <path d="M14.5 8H17V4.5h-2.5A3.5 3.5 0 0 0 11 8v2.5H8.5V14H11v6.5h3.5V14H17l.5-3.5h-3V9a1 1 0 0 1 1-1Z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  sparkle: (
    <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" />
  ),
  milk: (
    <>
      <path d="M8.5 3.5h7v3l2 3.5v10.5h-11V10l2-3.5Z" />
      <path d="M6.5 13c2-1 4-1 5.5 0s3.5 1 5.5 0" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
      <path d="M5 19 13 11" />
    </>
  ),
  whisk: (
    <>
      <path d="M12 21v-6" />
      <path d="M12 15c-3.5 0-5-4-5-7.5C7 4.5 9.2 3 12 3s5 1.5 5 4.5C17 11 15.5 15 12 15Z" />
      <path d="M12 3v12M9.5 4c-1 3-.5 8 2.5 11M14.5 4c1 3 .5 8-2.5 11" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2m0 15v2M2.5 12h2m15 0h2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
}

export function Icon({ name, size = 22, title, className, strokeWidth = 2 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  )
}
