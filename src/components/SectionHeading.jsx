import { Reveal } from './Reveal.jsx'
import styles from './SectionHeading.module.css'

export function SectionHeading({ id, eyebrow, title, intro, align = 'start', tone = 'dark' }) {
  return (
    <Reveal as="header" className={[styles.heading, styles[align], styles[tone]].join(' ')}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </Reveal>
  )
}
