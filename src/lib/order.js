import { formatPrice } from './format.js'

const findById = (list, id) => list.find((item) => item.id === id)

/** Reducer do "Monte o seu". Mantém o pedido sempre válido para o tamanho escolhido. */
export function orderReducer(state, action) {
  switch (action.type) {
    case 'setSize':
      return {
        ...state,
        sizeId: action.id,
        flavorIds: state.flavorIds.slice(0, action.maxFlavors ?? Infinity),
      }
    case 'setFormat':
      return { ...state, formatId: action.id }
    case 'setTopping':
      return { ...state, toppingId: action.id }
    case 'toggleFlavor':
      if (state.flavorIds.includes(action.id)) {
        return { ...state, flavorIds: state.flavorIds.filter((id) => id !== action.id) }
      }
      if (state.flavorIds.length >= action.maxFlavors) return state
      return { ...state, flavorIds: [...state.flavorIds, action.id] }
    case 'reset':
      return action.initial
    default:
      return state
  }
}

/** Resolve os ids do pedido em itens do catálogo e calcula o total. */
export function summarizeOrder(state, catalog) {
  const size = findById(catalog.sizes, state.sizeId)
  const format = findById(catalog.formats, state.formatId)
  const topping = findById(catalog.toppings, state.toppingId)
  const flavors = state.flavorIds.map((id) => findById(catalog.flavors, id)).filter(Boolean)
  return {
    size,
    format,
    topping,
    flavors,
    total: (size?.price ?? 0) + (topping?.price ?? 0),
    remaining: (size?.maxFlavors ?? 0) - flavors.length,
    isReady: Boolean(size && format && flavors.length > 0),
  }
}

/** Mensagem do pedido que vai pré-preenchida no WhatsApp. `greeting` vem de src/content. */
export function buildOrderMessage({ size, format, topping, flavors, total }, greeting) {
  const lines = [
    greeting,
    `🍦 ${size.label} (${size.detail}) ${format.inline}`,
    ...flavors.map((flavor) => `• ${flavor.name}`),
  ]
  if (topping?.price > 0) lines.push(`✨ Cobertura: ${topping.label}`)
  lines.push(`💰 Total estimado: ${formatPrice(total)}`, '', 'Pode confirmar? Obrigado!')
  return lines.join('\n')
}
