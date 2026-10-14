import { describe, expect, it } from 'vitest'
import { defaultOrder, formats, sizes, toppings } from '../content/builder.js'
import { flavors } from '../content/flavors.js'
import { builderSection } from '../content/site.js'
import { buildOrderMessage, orderReducer, summarizeOrder } from './order.js'
import { buildWhatsAppUrl } from './whatsapp.js'

const catalog = { sizes, formats, toppings, flavors }
const toggle = (state, id, maxFlavors = 3) =>
  orderReducer(state, { type: 'toggleFlavor', id, maxFlavors })

describe('orderReducer', () => {
  it('adiciona e remove sabores', () => {
    let state = toggle(defaultOrder, 'pistache')
    expect(state.flavorIds).toEqual(['pistache'])
    state = toggle(state, 'pistache')
    expect(state.flavorIds).toEqual([])
  })

  it('não passa do limite de sabores do tamanho', () => {
    let state = toggle(defaultOrder, 'pistache', 2)
    state = toggle(state, 'acai', 2)
    const full = toggle(state, 'gianduia', 2)
    expect(full).toBe(state)
    expect(full.flavorIds).toEqual(['pistache', 'acai'])
  })

  it('corta os sabores excedentes ao diminuir o tamanho', () => {
    let state = { ...defaultOrder, sizeId: 'grande', flavorIds: ['pistache', 'acai', 'gianduia'] }
    state = orderReducer(state, { type: 'setSize', id: 'pequeno', maxFlavors: 1 })
    expect(state).toMatchObject({ sizeId: 'pequeno', flavorIds: ['pistache'] })
  })

  it('troca formato, cobertura e reinicia', () => {
    let state = orderReducer(defaultOrder, { type: 'setFormat', id: 'copinho' })
    state = orderReducer(state, { type: 'setTopping', id: 'chantilly' })
    expect(state).toMatchObject({ formatId: 'copinho', toppingId: 'chantilly' })
    expect(orderReducer(state, { type: 'reset', initial: defaultOrder })).toBe(defaultOrder)
  })
})

describe('summarizeOrder', () => {
  it('soma tamanho + cobertura e diz quantos sabores faltam', () => {
    const summary = summarizeOrder(
      {
        sizeId: 'grande',
        formatId: 'casquinha',
        flavorIds: ['pistache'],
        toppingId: 'calda-chocolate',
      },
      catalog,
    )
    expect(summary.total).toBe(27 + 4)
    expect(summary.remaining).toBe(2)
    expect(summary.isReady).toBe(true)
  })

  it('não está pronto sem sabores', () => {
    expect(summarizeOrder(defaultOrder, catalog).isReady).toBe(false)
  })
})

describe('buildOrderMessage', () => {
  const summary = summarizeOrder(
    {
      sizeId: 'medio',
      formatId: 'copinho',
      flavorIds: ['pistache', 'doce-de-leite'],
      toppingId: 'calda-chocolate',
    },
    catalog,
  )

  it('monta a mensagem com tamanho, sabores, cobertura e total', () => {
    const message = buildOrderMessage(summary, builderSection.messageGreeting)
    expect(message).toContain('Oi, Ilha & Areia! Quero pedir:')
    expect(message).toContain('🍦 Médio (2 bolas) no copinho')
    expect(message).toContain('• Pistache Siciliano\n• Doce de Leite da Nonna')
    expect(message).toContain('✨ Cobertura: Calda quente de chocolate')
    expect(message).toMatch(/Total estimado: R\$\s25,00/)
  })

  it('omite a linha de cobertura quando não há cobertura', () => {
    const plain = buildOrderMessage(
      { ...summary, topping: toppings[0], total: 21 },
      builderSection.messageGreeting,
    )
    expect(plain).not.toContain('Cobertura')
  })

  it('gera um link wa.me com a mensagem codificada', () => {
    const message = buildOrderMessage(summary, builderSection.messageGreeting)
    const url = buildWhatsAppUrl('+55 (11) 98765-0987', message)
    expect(url.startsWith('https://wa.me/5511987650987?text=')).toBe(true)
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(message)
  })
})
