import { describe, expect, it } from 'vitest'
import { seo } from '../content/seo.js'
import { brand, contact, schedule } from '../content/site.js'
import { buildStructuredData } from './structuredData.js'

describe('buildStructuredData', () => {
  const data = buildStructuredData({ brand, contact, schedule, seo })

  it('é um IceCreamShop com endereço', () => {
    expect(data['@type']).toBe('IceCreamShop')
    expect(data.address.streetAddress).toBe(contact.address.street)
  })

  it('tem nome da marca, coordenadas e cidade atendida (SEO local)', () => {
    expect(data.name).toBe(brand.name)
    expect(data.geo).toMatchObject({ '@type': 'GeoCoordinates' })
    expect(data.areaServed.name).toBe(contact.address.city)
  })

  it('só lista os dias em que a loja abre', () => {
    expect(data.openingHoursSpecification).toHaveLength(6)
    expect(data.openingHoursSpecification.map((spec) => spec.dayOfWeek)).not.toContain(
      'https://schema.org/Monday',
    )
  })
})
