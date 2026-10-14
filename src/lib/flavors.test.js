import { describe, expect, it } from 'vitest'
import { flavorCategories, flavors } from '../content/flavors.js'
import { ALL_CATEGORY, countByCategory, filterFlavors } from './flavors.js'

describe('filterFlavors', () => {
  it('"todos" devolve o catálogo inteiro', () => {
    expect(filterFlavors(flavors, ALL_CATEGORY)).toHaveLength(flavors.length)
  })

  it('filtra por categoria', () => {
    const premium = filterFlavors(flavors, 'premium')
    expect(premium.length).toBeGreaterThan(0)
    expect(premium.every((flavor) => flavor.categories.includes('premium'))).toBe(true)
  })

  it('um sabor pode estar em mais de uma categoria', () => {
    const ids = (category) => filterFlavors(flavors, category).map((flavor) => flavor.id)
    expect(ids('frutados')).toContain('acai')
    expect(ids('veganos')).toContain('acai')
  })

  it('categoria desconhecida devolve lista vazia', () => {
    expect(filterFlavors(flavors, 'inexistente')).toEqual([])
  })
})

describe('countByCategory', () => {
  it('conta os sabores de cada filtro', () => {
    const counts = countByCategory(flavors, flavorCategories)
    expect(counts.todos).toBe(12)
    expect(counts.premium).toBe(filterFlavors(flavors, 'premium').length)
  })
})
