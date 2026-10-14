import { describe, expect, it } from 'vitest'
import { weekdayNames } from '../content/site.js'
import { describeOpenStatus, getOpenStatus, getZonedTime } from './openStatus.js'

// São Paulo está em UTC-3 (sem horário de verão desde 2019).
const sp = (iso) => new Date(`${iso}-03:00`)

const schedule = {
  timeZone: 'America/Sao_Paulo',
  days: {
    0: { open: '13:00', close: '22:00' },
    1: null,
    2: { open: '14:00', close: '22:00' },
    3: { open: '14:00', close: '22:00' },
    4: { open: '14:00', close: '22:00' },
    5: { open: '13:00', close: '00:30' },
    6: { open: '12:00', close: '00:30' },
  },
}

describe('getZonedTime', () => {
  it('usa o fuso da loja, não o do visitante', () => {
    // 01:00 UTC de quarta = 22:00 de terça em São Paulo
    expect(getZonedTime(new Date('2026-10-14T01:00:00Z'), schedule.timeZone)).toEqual({
      day: 2,
      minutes: 22 * 60,
    })
  })
})

describe('getOpenStatus', () => {
  it('está aberto dentro do horário', () => {
    // 2026-10-13 é uma terça-feira
    expect(getOpenStatus(sp('2026-10-13T15:30'), schedule)).toEqual({
      isOpen: true,
      closesAt: '22:00',
    })
  })

  it('fecha exatamente no horário de fechamento', () => {
    const status = getOpenStatus(sp('2026-10-13T22:00'), schedule)
    expect(status.isOpen).toBe(false)
    expect(status).toMatchObject({ opensAt: '14:00', daysUntilOpen: 1 })
  })

  it('antes de abrir avisa que abre hoje', () => {
    expect(getOpenStatus(sp('2026-10-13T10:00'), schedule)).toEqual({
      isOpen: false,
      opensAt: '14:00',
      daysUntilOpen: 0,
      opensDay: 2,
    })
  })

  it('pula o dia de folga (segunda) e aponta a terça', () => {
    // domingo 23h → segunda fechado → abre terça
    expect(getOpenStatus(sp('2026-10-11T23:00'), schedule)).toMatchObject({
      isOpen: false,
      daysUntilOpen: 2,
      opensDay: 2,
    })
  })

  it('continua aberto depois da meia-noite quando o expediente atravessa o dia', () => {
    // sábado 00:15 → ainda é o expediente de sexta
    expect(getOpenStatus(sp('2026-10-17T00:15'), schedule)).toEqual({
      isOpen: true,
      closesAt: '00:30',
    })
    // sábado 23:50 → aberto até 00:30
    expect(getOpenStatus(sp('2026-10-17T23:50'), schedule).isOpen).toBe(true)
  })

  it('fecha às 00:30 e reabre mais tarde no mesmo dia', () => {
    expect(getOpenStatus(sp('2026-10-17T00:30'), schedule)).toMatchObject({
      isOpen: false,
      opensAt: '12:00',
      daysUntilOpen: 0,
    })
  })

  it('lida com uma semana sem nenhum horário', () => {
    const closed = { timeZone: schedule.timeZone, days: {} }
    expect(getOpenStatus(sp('2026-10-13T15:00'), closed)).toMatchObject({
      isOpen: false,
      opensAt: null,
    })
  })
})

describe('describeOpenStatus', () => {
  it('descreve aberto', () => {
    expect(describeOpenStatus({ isOpen: true, closesAt: '00:30' }, weekdayNames)).toEqual({
      title: 'Aberto agora',
      detail: 'fecha às 0h30',
    })
  })

  it('usa "hoje", "amanhã" ou o nome do dia', () => {
    const base = { isOpen: false, opensAt: '14:00' }
    expect(
      describeOpenStatus({ ...base, daysUntilOpen: 0, opensDay: 2 }, weekdayNames).detail,
    ).toBe('abre hoje às 14h')
    expect(
      describeOpenStatus({ ...base, daysUntilOpen: 1, opensDay: 3 }, weekdayNames).detail,
    ).toBe('abre amanhã às 14h')
    expect(
      describeOpenStatus({ ...base, daysUntilOpen: 2, opensDay: 2 }, weekdayNames).detail,
    ).toBe('abre terça às 14h')
  })
})
