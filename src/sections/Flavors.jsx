import { useMemo, useState } from 'react'
import { FlavorCard } from '../components/FlavorCard.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { flavorCategories, flavors } from '../content/flavors.js'
import { flavorsSection } from '../content/site.js'
import { ALL_CATEGORY, countByCategory, filterFlavors } from '../lib/flavors.js'
import styles from './Flavors.module.css'

const COUNTS = countByCategory(flavors, flavorCategories)

export function Flavors() {
  const [category, setCategory] = useState(ALL_CATEGORY)
  const visible = useMemo(() => filterFlavors(flavors, category), [category])
  const label = flavorCategories.find((item) => item.id === category)?.label

  return (
    <section id="sabores" className={styles.section} aria-labelledby="sabores-title">
      <div className="container">
        <SectionHeading
          id="sabores-title"
          eyebrow={flavorsSection.eyebrow}
          title={flavorsSection.title}
          intro={flavorsSection.intro}
        />

        <div className={styles.filters} role="group" aria-label="Filtrar sabores por categoria">
          {flavorCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.filter}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
              <span className={styles.count} aria-hidden="true">
                {COUNTS[item.id]}
              </span>
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          {`${visible.length} sabores em ${label}`}
        </p>

        {visible.length === 0 ? (
          <p className={styles.empty}>{flavorsSection.empty}</p>
        ) : (
          <ul className={styles.grid} role="list">
            {visible.map((flavor, index) => (
              <Reveal as="li" key={flavor.id} delay={(index % 3) * 70} className={styles.item}>
                <FlavorCard flavor={flavor} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
