export const ALL_CATEGORY = 'todos'

/** Retorna os sabores da categoria pedida (ou todos, para `ALL_CATEGORY`). */
export function filterFlavors(flavors, categoryId) {
  if (!categoryId || categoryId === ALL_CATEGORY) return flavors
  return flavors.filter((flavor) => flavor.categories.includes(categoryId))
}

/** Conta quantos sabores existem em cada categoria, para mostrar nos filtros. */
export function countByCategory(flavors, categories) {
  return Object.fromEntries(categories.map(({ id }) => [id, filterFlavors(flavors, id).length]))
}
