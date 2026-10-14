import { DripDivider } from '../components/DripDivider.jsx'
import { Icon } from '../components/Icon.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { brand, story } from '../content/site.js'
import styles from './Story.module.css'

const PROCESS_ICONS = { leite: 'milk', fruta: 'leaf', lote: 'whisk', dia: 'sun' }

export function Story() {
  return (
    <section id="historia" className={styles.section} aria-labelledby="historia-title">
      <DripDivider color="var(--pistachio-light)" />
      <div className={`container ${styles.layout}`}>
        <div className={styles.text}>
          <SectionHeading
            id="historia-title"
            eyebrow={story.eyebrow}
            title={story.title}
            tone="light"
          />
          {story.paragraphs.map((paragraph) => (
            <Reveal as="p" key={paragraph.slice(0, 20)} className={styles.paragraph}>
              {paragraph}
            </Reveal>
          ))}
          <p className={styles.signature}>{story.signature}</p>
        </div>

        <Reveal className={styles.notebook} rotate={-3} aria-hidden="true">
          <p className={styles.notebookTitle}>Gelato della domenica</p>
          <ul role="list">
            <li>1 L di latte fresco</li>
            <li>300 g di panna</li>
            <li>zucchero, quanto basta</li>
            <li>tanta pazienza ♥</li>
          </ul>
          <p className={styles.notebookYear}>Genova, {brand.since - 41}</p>
        </Reveal>
      </div>

      <ol className={`container ${styles.process}`} role="list">
        {story.process.map((step, index) => (
          <Reveal as="li" key={step.id} delay={index * 90} className={styles.processItem}>
            <span className={styles.processIcon}>
              <Icon name={PROCESS_ICONS[step.id]} size={28} />
            </span>
            <span className={styles.processNumber} aria-hidden="true">
              0{index + 1}
            </span>
            <h3 className={styles.processTitle}>{step.title}</h3>
            <p>{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
