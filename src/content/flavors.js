/**
 * Catálogo de sabores.
 * - `color`: cor da bola na ilustração.
 * - `speckle` (opcional): cor dos pedacinhos (chocolate, castanhas...).
 * - `categories`: ids de `flavorCategories` em que o sabor aparece no filtro.
 * - `tags`: etiquetas exibidas no card.
 */

export const flavorCategories = [
  { id: 'todos', label: 'Todos' },
  { id: 'classicos', label: 'Clássicos' },
  { id: 'frutados', label: 'Frutados' },
  { id: 'premium', label: 'Premium' },
  { id: 'veganos', label: 'Veganos & sem glúten' },
]

export const flavors = [
  {
    id: 'doce-de-leite',
    name: 'Doce de Leite da Nonna',
    description: 'Cozido por seis horas no tacho de cobre, com uma pitada de flor de sal.',
    color: '#c98a4b',
    categories: ['classicos'],
    tags: ['Mais pedido', 'Sem glúten'],
  },
  {
    id: 'chocolate-70',
    name: 'Chocolate 70%',
    description: 'Cacau baiano de origem única. Intenso, pouco doce, nada de enrolação.',
    color: '#4a2a1e',
    categories: ['classicos', 'veganos'],
    tags: ['Vegano', 'Sem glúten'],
  },
  {
    id: 'creme-da-casa',
    name: 'Creme da Casa',
    description: 'Fior di latte com raspas de limão-siciliano. O sabor que abriu a loja.',
    color: '#f5e9d0',
    categories: ['classicos'],
    tags: ['Receita original', 'Sem glúten'],
  },
  {
    id: 'stracciatella',
    name: 'Stracciatella',
    description: 'Creme de leite fresco com lascas de chocolate derretido na hora.',
    color: '#f2ede3',
    speckle: '#3a2219',
    categories: ['classicos'],
    tags: ['Sem glúten'],
  },
  {
    id: 'morango-manjericao',
    name: 'Morango com Manjericão',
    description: 'Sorbet de morango de Rancho Queimado com folhinhas frescas da nossa horta.',
    color: '#e8536b',
    categories: ['frutados', 'veganos'],
    tags: ['Vegano', 'Sem glúten'],
  },
  {
    id: 'maracuja-pimenta',
    name: 'Maracujá & Pimenta-Rosa',
    description: 'Azedinho, perfumado e com um calorzinho no final. Vicia.',
    color: '#f5b82e',
    speckle: '#c2405a',
    categories: ['frutados', 'veganos'],
    tags: ['Vegano', 'Sem glúten', 'Novo'],
  },
  {
    id: 'manga-limao',
    name: 'Manga & Limão',
    description: 'Manga palmer bem madura com um toque cítrico pra acordar.',
    color: '#ffa23a',
    categories: ['frutados', 'veganos'],
    tags: ['Vegano', 'Sem glúten'],
  },
  {
    id: 'acai',
    name: 'Açaí da Casa',
    description: 'Açaí puro do Pará, batido cremoso, sem xarope de guaraná.',
    color: '#5b2a5e',
    categories: ['frutados', 'veganos'],
    tags: ['Vegano', 'Sem glúten'],
  },
  {
    id: 'pistache',
    name: 'Pistache Siciliano',
    description: 'Pasta 100% pistache de Bronte. Verde de verdade, não de corante.',
    color: '#a8c66c',
    speckle: '#6b8a3a',
    categories: ['premium'],
    tags: ['Premium', 'Sem glúten'],
  },
  {
    id: 'gianduia',
    name: 'Gianduia Tostada',
    description: 'Avelãs do Piemonte tostadas aqui e chocolate ao leite. Pura Itália.',
    color: '#8b5a3c',
    speckle: '#4a2a1e',
    categories: ['premium'],
    tags: ['Premium', 'Contém castanhas'],
  },
  {
    id: 'romeu-julieta',
    name: 'Romeu & Julieta',
    description: 'Gelato de queijo minas curado com veios de goiabada cascão.',
    color: '#f6e3c3',
    speckle: '#c2405a',
    categories: ['premium'],
    tags: ['Premium', 'Mais pedido'],
  },
  {
    id: 'coco-queimado',
    name: 'Coco Queimado',
    description: 'Leite de coco e coco tostado no maçarico. Cremoso sem nada de leite.',
    color: '#eadbc8',
    speckle: '#8b5a3c',
    categories: ['veganos'],
    tags: ['Vegano', 'Sem glúten', 'Sem lactose'],
  },
]
