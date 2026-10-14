import { useReducer } from 'react'
import { Button } from '../components/Button.jsx'
import { IceCream } from '../components/IceCream.jsx'
import { OptionCard } from '../components/OptionCard.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { defaultOrder, formats, sizes, toppings } from '../content/builder.js'
import { flavors } from '../content/flavors.js'
import { builderSection as copy, contact } from '../content/site.js'
import { formatPrice } from '../lib/format.js'
import { buildOrderMessage, orderReducer, summarizeOrder } from '../lib/order.js'
import { buildWhatsAppUrl } from '../lib/whatsapp.js'
import styles from './Builder.module.css'

const CATALOG = { sizes, formats, toppings, flavors }

function Step({ number, legend, hint, children }) {
  return (
    <fieldset className={styles.step}>
      <legend className={styles.legend}>
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        {legend}
        {hint && <span className={styles.hint}>{hint}</span>}
      </legend>
      <div className={styles.options}>{children}</div>
    </fieldset>
  )
}

export function Builder() {
  const [order, dispatch] = useReducer(orderReducer, defaultOrder)
  const summary = summarizeOrder(order, CATALOG)
  const maxFlavors = summary.size.maxFlavors
  const whatsappUrl = summary.isReady
    ? buildWhatsAppUrl(contact.whatsapp, buildOrderMessage(summary, copy.messageGreeting))
    : null

  return (
    <section id="monte" className={styles.section} aria-labelledby="monte-title">
      <div className="container">
        <SectionHeading
          id="monte-title"
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
        />

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
            <Step number={1} legend={copy.steps.size}>
              {sizes.map((size) => (
                <OptionCard
                  key={size.id}
                  name="tamanho"
                  value={size.id}
                  checked={order.sizeId === size.id}
                  onChange={() =>
                    dispatch({ type: 'setSize', id: size.id, maxFlavors: size.maxFlavors })
                  }
                  label={`${size.label} · ${formatPrice(size.price)}`}
                  detail={size.detail}
                />
              ))}
            </Step>

            <Step number={2} legend={copy.steps.format}>
              {formats.map((format) => (
                <OptionCard
                  key={format.id}
                  name="formato"
                  value={format.id}
                  checked={order.formatId === format.id}
                  onChange={() => dispatch({ type: 'setFormat', id: format.id })}
                  label={format.label}
                  detail={format.detail}
                />
              ))}
            </Step>

            <Step
              number={3}
              legend={copy.steps.flavors}
              hint={`${summary.flavors.length} de ${maxFlavors} escolhido${maxFlavors > 1 ? 's' : ''}`}
            >
              {flavors.map((flavor) => {
                const checked = order.flavorIds.includes(flavor.id)
                return (
                  <OptionCard
                    key={flavor.id}
                    type="checkbox"
                    name="sabores"
                    value={flavor.id}
                    checked={checked}
                    disabled={!checked && summary.remaining <= 0}
                    onChange={() => dispatch({ type: 'toggleFlavor', id: flavor.id, maxFlavors })}
                    label={flavor.name}
                    swatch={flavor.color}
                  />
                )
              })}
            </Step>

            <Step number={4} legend={copy.steps.topping}>
              {toppings.map((topping) => (
                <OptionCard
                  key={topping.id}
                  name="cobertura"
                  value={topping.id}
                  checked={order.toppingId === topping.id}
                  onChange={() => dispatch({ type: 'setTopping', id: topping.id })}
                  label={topping.label}
                  detail={
                    topping.price > 0 ? `+ ${formatPrice(topping.price)}` : 'grátis, mas sem graça'
                  }
                />
              ))}
            </Step>

            {/* Atalho fixo no mobile, onde o resumo fica lá embaixo do formulário. */}
            <a href="#seu-pedido" className={styles.mobileBar}>
              <span>
                {summary.flavors.length}/{maxFlavors} sabores ·{' '}
                <strong>{formatPrice(summary.total)}</strong>
              </span>
              <span className={styles.mobileBarCta}>Ver pedido</span>
            </a>
          </form>

          <aside id="seu-pedido" className={styles.summary} aria-labelledby="pedido-title">
            <div className={styles.preview}>
              <IceCream
                key={`${order.formatId}-${order.toppingId}`}
                scoops={summary.flavors}
                format={order.formatId}
                topping={order.toppingId}
                drips={summary.flavors.length > 0}
                fit={false}
              />
            </div>
            <h3 id="pedido-title" className={styles.summaryTitle}>
              {copy.summaryTitle}
            </h3>
            <div aria-live="polite">
              {summary.isReady ? (
                <ul className={styles.receipt} role="list">
                  <li>
                    <span>
                      {summary.size.label} ({summary.size.detail}) {summary.format.inline}
                    </span>
                    <span>{formatPrice(summary.size.price)}</span>
                  </li>
                  {summary.flavors.map((flavor) => (
                    <li key={flavor.id} className={styles.flavorLine}>
                      <span
                        className={styles.dot}
                        style={{ background: flavor.color }}
                        aria-hidden="true"
                      />
                      {flavor.name}
                    </li>
                  ))}
                  {summary.topping.price > 0 && (
                    <li>
                      <span>{summary.topping.label}</span>
                      <span>{formatPrice(summary.topping.price)}</span>
                    </li>
                  )}
                  <li className={styles.total}>
                    <span>Total estimado</span>
                    <strong data-testid="order-total">{formatPrice(summary.total)}</strong>
                  </li>
                </ul>
              ) : (
                <p className={styles.emptySummary}>{copy.emptySummary}</p>
              )}
            </div>

            <div className={styles.actions}>
              {whatsappUrl ? (
                <Button href={whatsappUrl} external variant="whatsapp" icon="whatsapp" size="lg">
                  {copy.cta}
                </Button>
              ) : (
                <Button variant="whatsapp" icon="whatsapp" size="lg" disabled>
                  {copy.cta}
                </Button>
              )}
              <button
                type="button"
                className={styles.reset}
                onClick={() => dispatch({ type: 'reset', initial: defaultOrder })}
              >
                {copy.reset}
              </button>
            </div>
            <p className={styles.note}>{copy.note}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
