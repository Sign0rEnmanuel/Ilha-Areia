const DAY_URIS = [
  'https://schema.org/Sunday',
  'https://schema.org/Monday',
  'https://schema.org/Tuesday',
  'https://schema.org/Wednesday',
  'https://schema.org/Thursday',
  'https://schema.org/Friday',
  'https://schema.org/Saturday',
]

/** Gera o JSON-LD `IceCreamShop` a partir do conteúdo do site (usado no build, ver vite.config.js). */
export function buildStructuredData({ brand, contact, schedule, seo }) {
  const { address } = contact
  return {
    '@context': 'https://schema.org',
    '@type': 'IceCreamShop',
    name: brand.name,
    slogan: brand.slogan,
    description: seo.description,
    url: seo.siteUrl,
    image: `${seo.siteUrl}/og-image.png`,
    logo: `${seo.siteUrl}/favicon.svg`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: seo.priceRange,
    foundingDate: String(brand.since),
    servesCuisine: ['Gelato', 'Sorvete artesanal'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    areaServed: { '@type': 'City', name: address.city },
    hasMap: contact.mapsUrl,
    hasMenu: `${seo.siteUrl}/#sabores`,
    keywords: seo.keywords.join(', '),
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Dinheiro, cartão de crédito, cartão de débito, Pix',
    acceptsReservations: false,
    sameAs: contact.social.map((network) => network.url),
    openingHoursSpecification: Object.entries(schedule.days)
      .filter(([, hours]) => hours)
      .map(([day, hours]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: DAY_URIS[day],
        opens: hours.open,
        closes: hours.close,
      })),
  }
}
