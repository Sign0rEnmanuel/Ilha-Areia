import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { seo } from './src/content/seo.js'
import { brand, contact, schedule } from './src/content/site.js'
import { buildStructuredData } from './src/lib/structuredData.js'

/**
 * Preenche os metadados do index.html a partir de src/content e injeta o JSON-LD.
 * Assim o SEO fica no HTML estático (visível para crawlers) e o conteúdo tem uma única fonte.
 */
const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

function seoFromContent() {
  const { address, geo } = contact
  const replacements = {
    '%SEO_TITLE%': seo.title,
    '%SEO_DESCRIPTION%': seo.description,
    '%SEO_URL%': seo.siteUrl,
    '%SEO_SITE_NAME%': brand.name,
    '%SEO_IMAGE_ALT%': seo.imageAlt,
    '%SEO_GEO_REGION%': `${address.country}-${address.region}`,
    '%SEO_GEO_PLACENAME%': address.city,
    '%SEO_GEO_POSITION%': `${geo.latitude};${geo.longitude}`,
    '%SEO_NOSCRIPT%': `${brand.name} · ${seo.description} Endereço: ${address.street}, ${address.district}, ${address.city} – ${address.region}.`,
  }
  const jsonLd = JSON.stringify(buildStructuredData({ brand, contact, schedule, seo }))

  return {
    name: 'seo-from-content',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const filled = Object.entries(replacements).reduce(
          (result, [token, value]) => result.replaceAll(token, escapeHtml(value)),
          html,
        )
        return {
          html: filled,
          tags: [
            {
              tag: 'script',
              attrs: { type: 'application/ld+json' },
              children: jsonLd.replaceAll('<', '\\u003c'),
              injectTo: 'head',
            },
          ],
        }
      },
    },
  }
}

/**
 * Pré-carrega só as fontes usadas acima da dobra (subconjunto latino).
 * Sem isso o navegador só descobre as fontes depois de baixar e ler o CSS.
 */
const CRITICAL_FONTS = /(fraunces-latin-soft-(normal|italic)|dm-sans-latin-wght-normal)-.*\.woff2$/

function preloadCriticalFonts() {
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      return Object.keys(ctx.bundle ?? {})
        .filter((file) => CRITICAL_FONTS.test(file))
        .map((file) => ({
          tag: 'link',
          attrs: {
            rel: 'preload',
            href: `/${file}`,
            as: 'font',
            type: 'font/woff2',
            crossorigin: '',
          },
          injectTo: 'head',
        }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFromContent(), preloadCriticalFonts()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
})
