# Ilha & Areia 🍦

Landing page de **Ilha & Areia**, una heladería (sorveteria) artesanal _ficticia_ de la Lagoa da Conceição, en Florianópolis ("a Ilha").
Eslogan: **"Feito devagar. Saboreado sem pressa."** — gelato batido en lotes chicos, con receta de la Nonna Teresa desde 1987.
El nombre sale de la historia de la marca: la Nonna cruzaba la isla para vender picolé en la arena de la playa.

El objetivo de la página es que quien la visite quiera ir **ya**: los tres llamados a la acción son
**Ver sabores**, **Cómo llegar** y **Pedir por WhatsApp**.

- Sitio 100 % estático (sin backend). Los pedidos se arman en el navegador y abren WhatsApp con el mensaje ya escrito.
- Contenido en portugués (pt-BR), centralizado en `src/content/`.
- Todo lo visual vive en el repo: ilustraciones SVG propias, formas y gradientes CSS. Cero imágenes de terceros.

## Requisitos

- Node.js 20.19+ (probado con Node 24) y npm.

## Instalación y scripts

```bash
npm install
npm run dev          # servidor de desarrollo en http://localhost:5173
npm run build        # build de producción en dist/
npm run preview      # sirve dist/ en http://localhost:4173
npm run lint         # ESLint (falla con cualquier warning)
npm run format       # Prettier sobre todo el proyecto
npm run format:check # verifica formato sin escribir
npm test             # Vitest + React Testing Library (una corrida)
npm run test:watch   # Vitest en modo watch
```

## Estructura

```
├── index.html               # metadatos con placeholders %SEO_*% (se completan en el build)
├── vite.config.js           # plugins: SEO desde src/content, JSON-LD, preload de fuentes + config de Vitest
├── public/                  # favicon.svg, apple-touch-icon.png, og-image.png, robots.txt, sitemap.xml
└── src/
    ├── main.jsx             # punto de entrada: fuentes + estilos globales
    ├── App.jsx              # orden de las secciones
    ├── content/             # ✏️ TODOS los textos y datos editables
    │   ├── site.js          #   marca, contacto, horarios, navegación, textos de cada sección
    │   ├── flavors.js       #   catálogo de sabores y categorías del filtro
    │   ├── builder.js       #   tamaños, formatos, coberturas y precios del "Monte o seu"
    │   └── seo.js           #   título, descripción y URL canónica
    ├── lib/                 # lógica pura (sin React), 100 % testeada
    │   ├── openStatus.js    #   ¿abierto ahora? (zona horaria de la tienda, turnos que pasan medianoche)
    │   ├── order.js         #   reducer del armador, resumen, total y mensaje de WhatsApp
    │   ├── whatsapp.js      #   link wa.me con texto codificado
    │   ├── flavors.js       #   filtro y conteo por categoría
    │   ├── structuredData.js#   JSON-LD IceCreamShop
    │   └── format.js        #   precios en BRL y horas ("22h", "0h30")
    ├── hooks/               # useReveal, useOpenStatus, useActiveSection, useScrolled
    ├── components/          # piezas reutilizables (Button, Icon, IceCream, OpenBadge, Navbar, …)
    ├── sections/            # Hero, Flavors, Builder, Story, Gallery, Testimonials, Visit, Footer
    ├── styles/              # tokens.css (variables de diseño) + base.css (reset, utilidades, reduced motion)
    ├── assets/              # reservado para assets importados (hoy todo es SVG inline)
    └── test/setup.js        # jest-dom + cleanup
```

Los tests viven junto al código que prueban (`*.test.js` / `*.test.jsx`).

## Cómo editar el contenido

Todo se edita en `src/content/`, sin tocar componentes:

| Quiero cambiar…                         | Archivo                     | Qué editar                                                                      |
| --------------------------------------- | --------------------------- | ------------------------------------------------------------------------------- |
| Textos del hero, historia, testimonios  | `site.js`                   | `hero`, `story`, `testimonials`, …                                              |
| Teléfono / WhatsApp / dirección / redes | `site.js`                   | `contact` (`whatsapp` va sin símbolos: `55489…`)                                |
| Horarios                                | `site.js`                   | `schedule.days` (0 = domingo; `null` = cerrado)                                 |
| Agregar o sacar un sabor                | `flavors.js`                | un objeto con `color`, `categories` y `tags`                                    |
| Precios, tamaños, coberturas            | `builder.js`                | `sizes`, `formats`, `toppings`                                                  |
| Título / descripción para Google        | `seo.js`                    | se aplica al `index.html` y al JSON-LD en el build                              |
| Momentos de la galería                  | `site.js` → `gallery.items` | `variant`: `cone`, `cup`, `tub`, `pop`, `book`; `size`: `tall`, `wide`, `small` |

Notas:

- **Horarios que pasan la medianoche**: si `close` es menor que `open` (ej. `'13:00'` → `'00:30'`), se entiende que cierra al día siguiente. El indicador "Aberto agora / Fechado" usa siempre la zona horaria de la tienda (`schedule.timeZone`), no la del visitante.
- Los colores de cada sabor se usan en la ilustración, en la tarjeta (con `color-mix`) y en el armador.
- `og-image.png` y `apple-touch-icon.png` son PNG generados a partir del SVG de la marca; si cambia la identidad, hay que regenerarlos.

## Decisiones técnicas (y por qué)

**React + Vite, JavaScript y ES Modules.** Vite da dev server instantáneo y un build optimizado sin configuración. Todo el proyecto (incluida la config) es ESM; no hay `require` en ningún archivo.

**CSS Modules + variables CSS (una sola estrategia).** Cada componente tiene su `.module.css` con clases con scope local (cero colisiones) y todos consumen los mismos tokens de `styles/tokens.css` (colores, tipografía, espaciado, sombras, curvas de animación). Sin runtime de CSS-in-JS y sin dependencias extra. Se usan features modernas con buen soporte: `clamp()`, `color-mix()`, `:has()`, `text-wrap: balance`.

**Animaciones solo con CSS (sin Framer Motion ni GSAP).** Todo lo que pide la página (entradas al hacer scroll, gotas que se derriten, flotación, marquesina, micro-interacciones) se resuelve con `@keyframes`, transiciones y un `IntersectionObserver` de ~20 líneas (`useReveal`). Una librería sumaría 30–60 KB de JS sin aportar nada que el CSS no haga, y empeoraría el rendimiento en mobile. El parallax del cono usa `animation-timeline: scroll()` como mejora progresiva: donde no hay soporte, simplemente no se aplica. `prefers-reduced-motion` desactiva animaciones, transiciones, scroll suave y revelados.

**Solo animaciones compuestas en loop.** Las animaciones infinitas usan únicamente `transform`/`opacity` sobre elementos HTML (flotación del cono, anillo, marquesina, pulso del "Aberto agora"), que corren en la GPU. Las animaciones **dentro** de un SVG (gotas, bolas, cereza) no se componen en Chrome y recalculan el layout en cada frame, así que son solo de entrada y finitas (la gota "escurre" una vez). Medido: pasar las gotas de un loop a una animación finita bajó el TBT de Lighthouse de ~400 ms a ~50 ms. Por la misma razón no se usa `content-visibility: auto` en las secciones: aceleraba el render pero hacía que los links del menú aterrizaran en el lugar equivocado.

**Ilustraciones como componentes SVG parametrizados.** `IceCream` dibuja el helado a partir de datos (bolas, formato, cobertura). La misma pieza se usa en el hero, en la vista previa del armador (que se actualiza en vivo) y en la galería. Pesan casi nada, escalan perfecto y no hay imágenes con copyright.

**Mapa ilustrado en lugar de iframe de Google Maps.** Un iframe trae cientos de KB de terceros, cookies y penaliza Performance y Best Practices. El bloque de dirección con mapa SVG enlaza a Google Maps real.

**Pedidos sin servidor.** El armador usa un `useReducer` cuya lógica vive en `lib/order.js` (pura y testeada). Genera el mensaje y lo abre con `https://wa.me/<número>?text=…`, que funciona en mobile y desktop.

**Lógica separada de la UI.** Todo lo que tiene reglas (horario, filtro, pedido, JSON-LD) son funciones puras en `src/lib/`, fáciles de testear sin DOM. Los componentes solo componen y muestran.

**SEO en el HTML estático.** Un plugin chico en `vite.config.js` completa título, descripción, Open Graph, Twitter Card, meta tags de geolocalización y `<noscript>` en `index.html`, y agrega el JSON-LD `IceCreamShop` **a partir de `src/content`**. Una sola fuente de verdad, los crawlers lo ven sin ejecutar JS y los valores se escapan correctamente (el "&" de la marca sale como `&amp;`).

**SEO local (lo que busca la gente es "sorveteria em Florianópolis").**

- `<title>` con qué + dónde + marca: _"Sorveteria artesanal em Florianópolis | Ilha & Areia"_ (52 caracteres, no se corta en Google).
- `meta description` de ~150 caracteres con barrio, ciudad y diferenciales (vegano, sin gluten, pedido por WhatsApp).
- El `<h1>` incluye la frase _"Sorveteria artesanal na Lagoa da Conceição, Florianópolis"_ (con estilo de sobretítulo) además del eslogan, así el encabezado principal dice qué es y dónde está.
- JSON-LD `IceCreamShop` con dirección, coordenadas (`geo`), `areaServed`, horarios, `hasMenu`, medios de pago y redes (`sameAs`).
- `geo.region`/`geo.placename`/`geo.position`, URL canónica, `robots.txt`, `sitemap.xml` con `lastmod`, `lang="pt-BR"`, `og:locale` e imagen OG de 1200×630 con texto alternativo.
- Lo que no depende del código: dar de alta el **Perfil de Empresa en Google** con el mismo nombre, dirección y teléfono (NAP) que la página.

**Fuentes self-hosted.** Fraunces (variable, eje `SOFT` al máximo para un trazo "cremoso") para títulos y DM Sans para texto, vía `@fontsource-variable` con `font-display: swap`. Se cargan solo las variantes usadas, `unicode-range` evita bajar subsets innecesarios y un plugin hace `preload` de las tres fuentes críticas (subset latino) para que no esperen al CSS.

**Accesibilidad.** HTML semántico (`header/nav/main/section/footer`, `fieldset/legend`, `figure/figcaption`, `dl` para horarios), skip link, foco visible personalizado, filtros con `aria-pressed`, resultados anunciados con `aria-live`, checkboxes y radios **nativos** (con estética de tarjeta) en el armador, menú mobile con `aria-expanded`, cierre con Esc, devolución de foco y `inert` sobre el resto de la página. Contraste AA verificado.

**Sin modo oscuro.** La identidad es una heladería retro, luminosa y "de papel de crema"; una versión oscura diluiría la marca sin un beneficio claro para quien busca un helado.

**Calidad.** ESLint (flat config, reglas de hooks) + Prettier integrados con `eslint-config-prettier`. `npm run lint` corre con `--max-warnings=0`.

## Tests

`npm test` corre 36 tests (Vitest + React Testing Library + jsdom):

- `lib/openStatus.test.js`: abierto/cerrado, borde exacto de cierre, día libre (lunes), turnos que pasan la medianoche y zona horaria de la tienda vs. la del visitante.
- `lib/order.test.js`: límite de sabores por tamaño, recorte al bajar de tamaño, total, mensaje de WhatsApp y URL codificada.
- `lib/flavors.test.js`: filtro por categoría y conteos.
- `sections/Flavors.test.jsx`: el filtro en la UI, `aria-pressed` y el anuncio para lectores de pantalla.
- `sections/Builder.test.jsx`: flujo completo del armador hasta el link de WhatsApp con el mensaje correcto.
- `components/OpenBadge.test.jsx`: el selo con fecha simulada.
- `lib/structuredData.test.js`: JSON-LD válido.

## Resultados de verificación

Lighthouse (mobile, sobre `npm run build` + `npm run preview`):

| Performance | Accessibility | Best Practices | SEO |
| :---------: | :-----------: | :------------: | :-: |
|     97      |      100      |      100       | 100 |

CLS 0 · FCP ≈ 1,4 s · LCP ≈ 2,4 s · TBT ≈ 30–60 ms (con el throttling simulado de Lighthouse).
Layout revisado en 375, 768 y 1440 px, sin scroll horizontal; consola del navegador sin errores ni warnings.

---

_Ilha & Areia es una marca ficticia creada con fines de demostración. Dirección, teléfonos y reseñas son inventados._
