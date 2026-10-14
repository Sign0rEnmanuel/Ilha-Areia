import styles from './DripDivider.module.css'

// [posição x, meia-largura, comprimento] de cada gota, num viewBox de 1440 de largura.
const DRIPS = [
  [70, 22, 38],
  [210, 30, 64],
  [330, 18, 30],
  [520, 26, 52],
  [690, 34, 80],
  [860, 20, 34],
  [1010, 28, 58],
  [1170, 18, 28],
  [1320, 30, 70],
]
const BASE = 18

function buildPath() {
  let d = `M0 0 H1440 V${BASE} `
  // Desenha da direita para a esquerda, gota por gota.
  ;[...DRIPS].reverse().forEach(([x, w, len]) => {
    const bottom = BASE + len
    d += `L${x + w} ${BASE} `
    d += `C${x + w * 0.6} ${BASE + 6} ${x + w} ${bottom} ${x} ${bottom} `
    d += `C${x - w} ${bottom} ${x - w * 0.6} ${BASE + 6} ${x - w} ${BASE} `
  })
  return `${d}L0 ${BASE} Z`
}

const PATH = buildPath()

/** Faixa de "sorvete derretendo" que escorre da seção anterior para a próxima. */
export function DripDivider({ color, flip = false }) {
  return (
    <svg
      className={`${styles.divider} ${flip ? styles.flip : ''}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATH} fill={color} />
    </svg>
  )
}
