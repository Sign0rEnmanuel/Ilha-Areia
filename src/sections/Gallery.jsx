import { MomentArt } from '../components/MomentArt.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { gallery } from '../content/site.js'
import styles from './Gallery.module.css'

export function Gallery() {
  return (
    <section id="momentos" className={styles.section} aria-labelledby="momentos-title">
      <div className="container">
        <SectionHeading
          id="momentos-title"
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          align="center"
        />
        <ul className={styles.mosaic} role="list">
          {gallery.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              delay={(index % 3) * 80}
              className={`${styles.tile} ${styles[item.size]}`}
            >
              <figure className={styles.figure}>
                <div className={styles.art}>
                  <MomentArt variant={item.variant} colors={item.colors} />
                </div>
                <figcaption className={styles.caption}>{item.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
