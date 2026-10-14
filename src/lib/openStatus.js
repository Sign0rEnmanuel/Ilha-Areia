import { formatHour } from './format.js'

const MINUTES_PER_DAY = 24 * 60
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
const formatterCache = new Map()

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function getFormatter(timeZone) {
  if (!formatterCache.has(timeZone)) {
    formatterCache.set(
      timeZone,
      new Intl.DateTimeFormat('en-US', {
        timeZone,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }),
    )
  }
  return formatterCache.get(timeZone)
}

/** Dia da semana e minutos desde a meia-noite no fuso da loja (independe do fuso do visitante). */
export function getZonedTime(date, timeZone) {
  const parts = Object.fromEntries(
    getFormatter(timeZone)
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  )
  return {
    day: WEEKDAY_INDEX[parts.weekday],
    minutes: (Number(parts.hour) % 24) * 60 + Number(parts.minute),
  }
}

const isOvernight = (hours) => toMinutes(hours.close) <= toMinutes(hours.open)

/**
 * Calcula se a loja está aberta no instante `date`.
 * Retorna `{ isOpen: true, closesAt }` ou `{ isOpen: false, opensAt, daysUntilOpen, opensDay }`.
 */
export function getOpenStatus(date, schedule) {
  const { day, minutes } = getZonedTime(date, schedule.timeZone)
  const today = schedule.days[day]
  const yesterday = schedule.days[(day + 6) % 7]

  // Ainda dentro do expediente de ontem, que passou da meia-noite.
  if (yesterday && isOvernight(yesterday) && minutes < toMinutes(yesterday.close)) {
    return { isOpen: true, closesAt: yesterday.close }
  }

  if (today) {
    const open = toMinutes(today.open)
    const close = toMinutes(today.close) + (isOvernight(today) ? MINUTES_PER_DAY : 0)
    if (minutes >= open && minutes < close) return { isOpen: true, closesAt: today.close }
    if (minutes < open)
      return { isOpen: false, opensAt: today.open, daysUntilOpen: 0, opensDay: day }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (day + offset) % 7
    const hours = schedule.days[nextDay]
    if (hours)
      return { isOpen: false, opensAt: hours.open, daysUntilOpen: offset, opensDay: nextDay }
  }
  return { isOpen: false, opensAt: null, daysUntilOpen: null, opensDay: null }
}

/** Texto do selo de status, ex.: { title: 'Aberto agora', detail: 'fecha às 22h' }. */
export function describeOpenStatus(status, weekdayNames) {
  if (status.isOpen) {
    return { title: 'Aberto agora', detail: `fecha às ${formatHour(status.closesAt)}` }
  }
  if (status.opensAt == null) return { title: 'Fechado', detail: 'sem previsão de abertura' }
  const when = ['hoje', 'amanhã'][status.daysUntilOpen] ?? weekdayNames[status.opensDay]
  return { title: 'Fechado agora', detail: `abre ${when} às ${formatHour(status.opensAt)}` }
}
