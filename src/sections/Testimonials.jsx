import { Reveal } from '../components/Reveal.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { testimonials } from '../content/site.js'
import styles from './Testimonials.module.css'

const ROTATIONS = [-2, 1.5, -1, 2]

function Stars({ rating }) {
  return (
    <div className={styles.stars} role="img" aria-label={`Nota ${rating} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < rating ? styles.on : styles.off}>
          ★
        </span>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="depoimentos-title">
      <div className="container">
        <SectionHeading
          id="depoimentos-title"
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
        />
        <ul className={styles.grid} role="list">
          {testimonials.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              delay={index * 80}
              rotate={ROTATIONS[index % ROTATIONS.length]}
            >
              <figure
                className={styles.card}
                style={{ '--tilt': `${ROTATIONS[index % ROTATIONS.length]}deg` }}
              >
                <Stars rating={item.rating} />
                <blockquote className={styles.quote}>
                  <p>{item.text}</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <span className={styles.detail}>{item.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
