import { IceCream } from './IceCream.jsx'

const INK = '#2a1712'
const stroke = { stroke: INK, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' }

function Tub({ color }) {
  return (
    <svg viewBox="0 0 240 150" aria-hidden="true" focusable="false">
      <path
        d="M20 60 Q50 30 80 52 T140 48 T220 56 L214 130 Q212 138 204 138 L36 138 Q28 138 26 130 Z"
        fill={color}
        {...stroke}
      />
      <path
        d="M44 70 q20 -14 40 0 q20 14 40 0 q20 -14 40 0"
        fill="none"
        stroke="#6b8a3a"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="10" y="96" width="220" height="44" rx="8" fill="#d9dde3" {...stroke} />
      <path d="M150 40 L196 4" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <path d="M150 40 L196 4" stroke="#c22656" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="146" cy="44" rx="16" ry="10" fill="#d9dde3" {...stroke} />
    </svg>
  )
}

function Pop({ color }) {
  return (
    <svg viewBox="0 0 120 200" aria-hidden="true" focusable="false">
      <rect x="50" y="120" width="20" height="70" rx="10" fill="#e7c08a" {...stroke} />
      <path
        d="M22 50 A38 38 0 0 1 98 50 L98 120 Q98 132 86 132 L34 132 Q22 132 22 120 Z"
        fill={color}
        {...stroke}
      />
      <path d="M22 96 L98 80 L98 102 L22 118 Z" fill="#c22656" opacity="0.85" />
      <ellipse
        cx="44"
        cy="44"
        rx="7"
        ry="13"
        fill="#fff"
        opacity="0.5"
        transform="rotate(20 44 44)"
      />
    </svg>
  )
}

function Book({ color }) {
  return (
    <svg viewBox="0 0 240 150" aria-hidden="true" focusable="false">
      <path
        d="M120 30 Q80 14 20 22 L20 132 Q80 124 120 140 Q160 124 220 132 L220 22 Q160 14 120 30 Z"
        fill="#fff6e9"
        {...stroke}
      />
      <path d="M120 30 L120 140" {...stroke} fill="none" />
      {[48, 66, 84, 102].map((y) => (
        <g key={y} stroke={color} strokeWidth="3" strokeLinecap="round">
          <path d={`M36 ${y} q20 -6 40 0 t28 0`} fill="none" />
          <path d={`M136 ${y} q20 -6 40 0 t28 0`} fill="none" />
        </g>
      ))}
      <circle cx="186" cy="118" r="10" fill="#c22656" opacity="0.6" />
    </svg>
  )
}

/** Ilustrações da galeria "Momentos" — tudo SVG, nada de foto. */
export function MomentArt({ variant, colors }) {
  switch (variant) {
    case 'tub':
      return <Tub color={colors[0]} />
    case 'pop':
      return <Pop color={colors[0]} />
    case 'book':
      return <Book color={colors[0]} />
    case 'cup':
      return (
        <IceCream
          scoops={colors.map((color) => ({ color }))}
          format="copinho"
          topping="chantilly"
        />
      )
    default:
      return <IceCream scoops={colors.map((color) => ({ color }))} topping="calda-chocolate" />
  }
}
