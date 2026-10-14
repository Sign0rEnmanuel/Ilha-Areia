import { useId } from 'react'
import styles from './IceCream.module.css'

/*
 * Ilustração de sorvete em SVG, montada a partir de dados:
 * bolas (cores), formato (casquinha/copinho) e cobertura.
 * É a mesma peça usada no hero, no "Monte o seu" e na galeria.
 */

const INK = '#2a1712'
const SPECKLE_SPOTS = [
  [-22, -10, 20],
  [12, -28, -35],
  [28, -2, 60],
  [-4, 12, 10],
  [-30, -30, -60],
  [6, -8, 80],
  [24, -24, 15],
]
const SPRINKLE_COLORS = ['#c22656', '#ffb547', '#7cc6e8', '#a8c66c', '#fff6e9', '#cdb4e8']

function scoopPath(cx, cy, r = 54) {
  const bump = (2 * r) / 5
  const bumps = Array.from({ length: 5 }, () => `a ${bump / 2} ${bump * 0.5} 0 0 1 -${bump} 0`)
  return `M ${cx - r} ${cy + 6} A ${r} ${r} 0 0 1 ${cx + r} ${cy + 6} ${bumps.join(' ')} Z`
}

/** Uma bola de sorvete com brilho e pedacinhos opcionais. */
export function ScoopShape({ cx, cy, color, speckle, r = 54 }) {
  return (
    <g>
      <path
        d={scoopPath(cx, cy, r)}
        fill={color}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {speckle &&
        SPECKLE_SPOTS.map(([dx, dy, rot]) => (
          <rect
            key={`${dx}${dy}`}
            x={cx + dx * (r / 54)}
            y={cy + dy * (r / 54)}
            width="7"
            height="3.5"
            rx="1.75"
            fill={speckle}
            transform={`rotate(${rot} ${cx + dx} ${cy + dy})`}
          />
        ))}
      <ellipse
        cx={cx - r * 0.42}
        cy={cy - r * 0.48}
        rx={r * 0.2}
        ry={r * 0.1}
        fill="#fff"
        opacity="0.55"
        transform={`rotate(-35 ${cx - r * 0.42} ${cy - r * 0.48})`}
      />
    </g>
  )
}

function Topping({ type, cx, cy }) {
  switch (type) {
    case 'calda-chocolate':
      return (
        <path
          className={styles.syrup}
          d={`M ${cx - 51} ${cy - 2} A 51 46 0 0 1 ${cx + 51} ${cy - 2} q -4 12 -11 2 q -5 18 -13 0 q -6 8 -13 -2 q -5 22 -14 0 q -6 9 -13 -2 q -5 15 -13 0 q -6 7 -13 -2 q -3 9 -12 4 Z`}
          fill="#4a2a1e"
          stroke={INK}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )
    case 'chantilly':
      return (
        <g fill="#fffdf8" stroke={INK} strokeWidth="4" strokeLinejoin="round">
          <ellipse cx={cx} cy={cy - 46} rx="34" ry="13" />
          <ellipse cx={cx + 2} cy={cy - 60} rx="24" ry="11" />
          <path d={`M ${cx - 12} ${cy - 66} Q ${cx} ${cy - 92} ${cx + 14} ${cy - 66} Z`} />
        </g>
      )
    case 'granulado':
      return (
        <g>
          {SPECKLE_SPOTS.concat([
            [-12, -40, 40],
            [18, -42, -20],
            [-38, -14, 70],
          ]).map(([dx, dy, rot], i) => (
            <rect
              key={`${dx}${dy}`}
              x={cx + dx}
              y={cy + dy}
              width="10"
              height="4"
              rx="2"
              fill={SPRINKLE_COLORS[i % SPRINKLE_COLORS.length]}
              stroke={INK}
              strokeWidth="1.2"
              transform={`rotate(${rot} ${cx + dx} ${cy + dy})`}
            />
          ))}
        </g>
      )
    case 'farofa-castanha':
      return (
        <g fill="#d9a066" stroke={INK} strokeWidth="1.5">
          {SPECKLE_SPOTS.concat([
            [-14, -42, 0],
            [16, -40, 0],
            [-40, -12, 0],
            [38, -16, 0],
          ]).map(([dx, dy]) => (
            <circle key={`${dx}${dy}`} cx={cx + dx} cy={cy + dy - 6} r="3.6" />
          ))}
        </g>
      )
    default:
      return null
  }
}

function Cone({ patternId }) {
  return (
    <g>
      <defs>
        <pattern
          id={patternId}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="18" height="18" fill="#e7a95b" />
          <path d="M0 0v18M0 0h18" stroke="#b9763a" strokeWidth="3" />
        </pattern>
      </defs>
      <path
        d="M48 168 L152 168 L106 318 Q100 332 94 318 Z"
        fill={`url(#${patternId})`}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect
        x="40"
        y="160"
        width="120"
        height="20"
        rx="10"
        fill="#d9944a"
        stroke={INK}
        strokeWidth="4"
      />
    </g>
  )
}

function Cup({ patternId }) {
  return (
    <g>
      <defs>
        <pattern id={patternId} width="26" height="20" patternUnits="userSpaceOnUse">
          <rect width="26" height="20" fill="#fff6e9" />
          <rect width="13" height="20" fill="#f6a6b9" />
        </pattern>
      </defs>
      <path
        d="M38 170 L162 170 L148 312 Q146 322 136 322 L64 322 Q54 322 52 312 Z"
        fill={`url(#${patternId})`}
        stroke={INK}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect
        x="30"
        y="160"
        width="140"
        height="22"
        rx="11"
        fill="#c22656"
        stroke={INK}
        strokeWidth="4"
      />
      <path d="M150 120 L178 40" stroke={INK} strokeWidth="12" strokeLinecap="round" />
      <path d="M150 120 L178 40" stroke="#ffb547" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

/** Gota que escorre da bola de baixo: fina em cima, com uma "pérola" na ponta. */
function dripPath(x, length) {
  const end = 180 + length
  return `M ${x} 150 C ${x} 172 ${x - 3} ${end - 12} ${x - 3} ${end - 6} a 9 9 0 0 0 18 0 C ${x + 15} ${end - 12} ${x + 12} 172 ${x + 12} 150 Z`
}

const SCOOP_OFFSETS = [0, -5, 4]

/**
 * @param {{color: string, speckle?: string}[]} scoops  de baixo para cima (até 3)
 * @param {'casquinha'|'copinho'} format
 * @param {string} [topping] id da cobertura
 * @param {boolean} [drips] mostra gotas derretendo
 * @param {boolean} [cherry] cereja no topo
 * @param {boolean} [fit] recorta o espaço vazio acima das bolas (desligue quando o tamanho não pode mudar)
 */
export function IceCream({
  scoops,
  format = 'casquinha',
  topping,
  drips = true,
  cherry = false,
  fit = true,
  title,
  className = '',
}) {
  const patternId = `ic${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const baseY = 146
  const placed = scoops.slice(0, 3).map((scoop, i) => ({
    ...scoop,
    cx: 100 + SCOOP_OFFSETS[i],
    cy: baseY - i * 58,
  }))
  const top = placed.at(-1)
  const base = placed[0]
  // Topo do desenho: bola mais alta + espaço para cobertura alta (chantilly) ou cereja.
  const tallTopping = cherry || topping === 'chantilly'
  const viewTop = fit && top ? top.cy - (tallTopping ? 100 : 60) : -100

  return (
    <svg
      className={`${styles.iceCream} ${className}`}
      viewBox={`0 ${viewTop} 200 ${330 - viewTop}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {format === 'copinho' ? <Cup patternId={patternId} /> : <Cone patternId={patternId} />}

      {drips && base && (
        <g fill={base.color} stroke={INK} strokeWidth="4" strokeLinejoin="round">
          <path className={styles.drip} d={dripPath(base.cx - 36, 10)} />
          <path className={`${styles.drip} ${styles.dripSlow}`} d={dripPath(base.cx + 16, 32)} />
        </g>
      )}

      {!base && (
        <g>
          <path
            d={scoopPath(100, 146)}
            fill="#fff"
            stroke={INK}
            strokeWidth="3"
            strokeDasharray="9 8"
            opacity="0.7"
          />
          <text x="100" y="140" textAnchor="middle" fontSize="44" fontWeight="800" fill={INK}>
            ?
          </text>
        </g>
      )}

      {placed.map((scoop, i) => (
        <g key={`${scoop.color}-${i}`} className={styles.scoop} style={{ '--i': i }}>
          <ScoopShape cx={scoop.cx} cy={scoop.cy} color={scoop.color} speckle={scoop.speckle} />
        </g>
      ))}

      {top && <Topping type={topping} cx={top.cx} cy={top.cy} />}

      {cherry && top && (
        <g className={styles.cherry}>
          <path
            d={`M ${top.cx + 4} ${top.cy - 62} q 6 -24 22 -30`}
            fill="none"
            stroke={INK}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx={top.cx} cy={top.cy - 52} r="15" fill="#c22656" stroke={INK} strokeWidth="4" />
          <ellipse cx={top.cx - 5} cy={top.cy - 57} rx="4" ry="2.5" fill="#fff" opacity="0.7" />
        </g>
      )}
    </svg>
  )
}
