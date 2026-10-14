const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** Formata um valor em reais, ex.: 21 → "R$ 21,00". */
export function formatPrice(value) {
  return brl.format(value)
}

/** "22:00" → "22h", "00:30" → "0h30". */
export function formatHour(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}
