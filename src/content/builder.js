/**
 * Opções do "Monte o seu". Preços em reais (BRL).
 * `maxFlavors` limita quantos sabores podem ser escolhidos no tamanho.
 */

export const sizes = [
  { id: 'pequeno', label: 'Pequeno', detail: '1 bola', maxFlavors: 1, price: 14 },
  { id: 'medio', label: 'Médio', detail: '2 bolas', maxFlavors: 2, price: 21 },
  { id: 'grande', label: 'Grande', detail: '3 bolas', maxFlavors: 3, price: 27 },
]

export const formats = [
  { id: 'casquinha', label: 'Casquinha', inline: 'na casquinha', detail: 'crocante, feita aqui' },
  { id: 'copinho', label: 'Copinho', inline: 'no copinho', detail: 'pra não pingar' },
]

export const toppings = [
  { id: 'nenhuma', label: 'Sem cobertura', price: 0 },
  { id: 'calda-chocolate', label: 'Calda quente de chocolate', price: 4 },
  { id: 'farofa-castanha', label: 'Farofa de castanha-do-pará', price: 4 },
  { id: 'chantilly', label: 'Chantilly da casa', price: 3 },
  { id: 'granulado', label: 'Granulado colorido', price: 2 },
]

export const defaultOrder = {
  sizeId: 'medio',
  formatId: 'casquinha',
  flavorIds: [],
  toppingId: 'nenhuma',
}
