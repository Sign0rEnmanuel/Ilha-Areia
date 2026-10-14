import { Marquee } from './components/Marquee.jsx'
import { Navbar } from './components/Navbar.jsx'
import { flavors } from './content/flavors.js'
import { Builder } from './sections/Builder.jsx'
import { Flavors } from './sections/Flavors.jsx'
import { Footer } from './sections/Footer.jsx'
import { Gallery } from './sections/Gallery.jsx'
import { Hero } from './sections/Hero.jsx'
import { Story } from './sections/Story.jsx'
import { Testimonials } from './sections/Testimonials.jsx'
import { Visit } from './sections/Visit.jsx'

const MARQUEE_ITEMS = flavors.map((flavor) => flavor.name)

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} label="Sabores do dia" />
        <Flavors />
        <Builder />
        <Story />
        <Gallery />
        <Testimonials />
        <Visit />
      </main>
      <Footer />
    </>
  )
}
