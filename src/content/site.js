/**
 * Textos e dados gerais do site.
 * Edite aqui para mudar o conteúdo sem mexer nos componentes.
 */

export const brand = {
  name: 'Ilha & Areia',
  // Linha pequena que aparece acima do nome no logo
  logoTagline: 'Gelato artesanal',
  slogan: 'Feito devagar. Saboreado sem pressa.',
  since: 1987,
}

export const contact = {
  // Número fictício, no formato internacional sem símbolos (usado pelo wa.me)
  whatsapp: '5548991870987',
  whatsappDisplay: '(48) 99187-0987',
  phone: '+55 48 3232-1987',
  email: 'oi@ilhaeareia.com.br',
  address: {
    street: 'Avenida das Rendeiras, 1450',
    district: 'Lagoa da Conceição',
    city: 'Florianópolis',
    region: 'SC',
    postalCode: '88062-400',
    country: 'BR',
  },
  // Coordenadas aproximadas (usadas no JSON-LD e nas meta tags de geolocalização)
  geo: { latitude: -27.6031, longitude: -48.4678 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Avenida+das+Rendeiras+1450+Lagoa+da+Concei%C3%A7%C3%A3o+Florian%C3%B3polis',
  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@ilhaeareia',
      url: 'https://instagram.com/ilhaeareia',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      handle: '@ilhaeareia',
      url: 'https://www.tiktok.com/@ilhaeareia',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: '/ilhaeareia',
      url: 'https://facebook.com/ilhaeareia',
    },
  ],
}

/**
 * Horário de funcionamento no fuso da loja.
 * Dia: 0 = domingo ... 6 = sábado. `null` = fechado.
 * Um horário de fechamento menor que o de abertura significa que passa da meia-noite.
 */
export const schedule = {
  timeZone: 'America/Sao_Paulo',
  days: {
    0: { open: '13:00', close: '22:00' },
    1: null,
    2: { open: '14:00', close: '22:00' },
    3: { open: '14:00', close: '22:00' },
    4: { open: '14:00', close: '22:00' },
    5: { open: '13:00', close: '00:30' },
    6: { open: '12:00', close: '00:30' },
  },
}

export const nav = [
  { id: 'sabores', label: 'Sabores' },
  { id: 'monte', label: 'Monte o seu' },
  { id: 'historia', label: 'Nossa história' },
  { id: 'momentos', label: 'Momentos' },
  { id: 'visita', label: 'Como chegar' },
]

export const hero = {
  // Fica dentro do <h1>: é a frase que diz ao Google o que somos e onde estamos.
  eyebrow: 'Sorveteria artesanal na Lagoa da Conceição, Florianópolis',
  titleLines: ['Feito devagar.', 'Saboreado sem pressa.'],
  subtitle:
    'Batemos em pequenos lotes, todo santo dia, com leite fresco, fruta da estação e a paciência da Nonna Teresa. Chega com fome, sai com bigode de chocolate.',
  ctas: {
    flavors: 'Ver sabores',
    directions: 'Como chegar',
    whatsapp: 'Pedir por WhatsApp',
  },
  whatsappMessage: 'Oi, Ilha & Areia! Quero fazer um pedido 🍦',
  stickers: ['Massa batida hoje', '12 sabores', '4 veganos'],
}

export const flavorsSection = {
  eyebrow: 'O balcão de hoje',
  title: 'Doze sabores, nenhum tédio',
  intro:
    'Clássicos que a gente não ousa mudar, frutas que mudam com a feira e uns premium pra quem gosta de se exibir. Filtra aí:',
  empty: 'Nenhum sabor nessa categoria hoje. Volta amanhã, a feira muda!',
}

export const builderSection = {
  eyebrow: 'Monte o seu',
  title: 'Seu gelato, do seu jeito',
  intro:
    'Escolhe o tamanho, até três sabores e a cobertura. A gente manda o pedido pronto pro nosso WhatsApp — é só apertar enviar.',
  steps: {
    size: 'Tamanho',
    format: 'Casquinha ou copinho?',
    flavors: 'Sabores',
    topping: 'Cobertura',
  },
  summaryTitle: 'Seu pedido',
  emptySummary: 'Escolhe pelo menos um sabor pra montar seu pedido.',
  cta: 'Pedir por WhatsApp',
  messageGreeting: 'Oi, Ilha & Areia! Quero pedir:',
  reset: 'Começar de novo',
  note: 'Retirada no balcão ou entrega via app parceiro. Preço final confirmado pelo WhatsApp.',
}

export const story = {
  eyebrow: 'Nossa história',
  title: 'Uma receita que atravessou o oceano num caderno',
  paragraphs: [
    'A Nonna Teresa chegou de Gênova à Ilha de Santa Catarina com uma mala pequena e um caderno grande. Nele, entre receitas de pesto e contas da feira, estava o segredo do gelato que ela fazia aos domingos pra família inteira.',
    'Nos verões, ela atravessava a ilha com uma caixa de isopor e vendia picolé na areia da praia. Em 1987, o caderno virou balcão numa portinha da Lagoa da Conceição — e o caminho de todo dia virou nome: Ilha & Areia.',
    'Hoje quem bate o gelato são os netos, com as mesmas regras de sempre: nada de pó pronto, nada de pressa, nada de sabor que a gente não comeria de colher na frente da Nonna.',
  ],
  signature: '— Os netos da Nonna Teresa',
  process: [
    {
      id: 'leite',
      title: 'Leite da serra',
      text: 'Leite e creme frescos de uma cooperativa da Serra Catarinense, entregues três vezes por semana.',
    },
    {
      id: 'fruta',
      title: 'Fruta da feira',
      text: 'Compramos o que está no ponto. Se o morango não está bom, o sorbet de morango tira folga.',
    },
    {
      id: 'lote',
      title: 'Lotes pequenos',
      text: 'Batemos de 5 em 5 litros, devagar, pra entrar pouco ar e muita cremosidade.',
    },
    {
      id: 'dia',
      title: 'Servido no dia',
      text: 'O que sobra vira milkshake da equipe. Na vitrine, só massa batida hoje.',
    },
  ],
}

export const gallery = {
  eyebrow: 'Momentos',
  title: 'O que acontece no balcão',
  items: [
    {
      id: 'fila',
      caption: 'A fila de sábado depois da praia, que anda rápido e vale cada minuto',
      variant: 'cone',
      colors: ['#f2a3b6', '#a8c66c'],
      size: 'tall',
    },
    {
      id: 'lote',
      caption: 'Pistache saindo da máquina às 11h',
      variant: 'tub',
      colors: ['#a8c66c'],
      size: 'wide',
    },
    {
      id: 'picole',
      caption: 'Picolé de maracujá pra encarar o verão da ilha',
      variant: 'pop',
      colors: ['#f5b82e'],
      size: 'small',
    },
    {
      id: 'casal',
      caption: 'Duas colheres, um copo, zero divisão justa',
      variant: 'cup',
      colors: ['#5b2a5e', '#e8536b'],
      size: 'small',
    },
    {
      id: 'nonna',
      caption: 'O caderno da Nonna, guardado atrás do balcão',
      variant: 'book',
      colors: ['#c98a4b'],
      size: 'wide',
    },
    {
      id: 'cachorro',
      caption: 'Até o Biscoito ganha uma bola (de iogurte sem açúcar)',
      variant: 'cone',
      colors: ['#f5e9d0'],
      size: 'wide',
    },
    {
      id: 'domingo',
      caption: 'Domingo é dia de copão de três bolas pra dividir com a família',
      variant: 'cup',
      colors: ['#4a2a1e', '#f5b82e', '#a8c66c'],
      size: 'wide',
    },
  ],
}

export const testimonials = {
  eyebrow: 'Quem já lambeu a colher',
  title: 'O bairro fala por nós',
  items: [
    {
      id: 't1',
      name: 'Marina Okada',
      detail: 'Vizinha, cliente desde 2009',
      rating: 5,
      text: 'O doce de leite tem gosto de casa de avó. Já levei amigo de fora que mudou o roteiro da viagem pra voltar no dia seguinte.',
    },
    {
      id: 't2',
      name: 'Rafael Antunes',
      detail: 'Via Google',
      rating: 5,
      text: 'Maracujá com pimenta-rosa é ousado na medida certa. E vegano! Minha namorada não acreditou que não tinha leite.',
    },
    {
      id: 't3',
      name: 'Dona Cida Ferreira',
      detail: 'Frequentadora de domingo',
      rating: 5,
      text: 'Venho todo domingo depois da missa. O atendimento é um carinho e o pistache não economiza no pistache.',
    },
    {
      id: 't4',
      name: 'Lucas e Bia',
      detail: 'Pais do Theo, 6 anos',
      rating: 4,
      text: 'O Theo monta o próprio gelato pelo site e chega aqui mandando no pedido. Só tiramos uma estrela porque a fila de sábado é grande — mas anda.',
    },
  ],
}

export const visit = {
  eyebrow: 'Como chegar',
  title: 'Vem que a casquinha tá crocante',
  transport: [
    'A 3 minutos a pé do centrinho da Lagoa da Conceição',
    'Bicicletário na porta e suporte pra prancha',
    'Acessível para cadeira de rodas',
  ],
  mapCta: 'Abrir no Google Maps',
  hoursTitle: 'Horários',
}

export const footer = {
  tagline:
    'Sorveteria e gelato artesanal batido todo dia na Lagoa da Conceição, em Florianópolis, com receita de família desde 1987.',
  rights: 'Todos os direitos reservados.',
  fictional: 'Ilha & Areia é uma marca fictícia criada para fins de demonstração.',
  backToTop: 'Voltar ao topo',
}

export const weekdayNames = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
