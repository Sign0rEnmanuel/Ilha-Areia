import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { flavors } from '../content/flavors.js'
import { Flavors } from './Flavors.jsx'

const cardNames = () =>
  screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)

describe('<Flavors />', () => {
  it('mostra todos os sabores e o filtro "Todos" ativo', () => {
    render(<Flavors />)
    expect(cardNames()).toHaveLength(flavors.length)
    expect(screen.getByRole('button', { name: /Todos/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('filtra ao clicar numa categoria e anuncia o resultado', async () => {
    const user = userEvent.setup()
    render(<Flavors />)
    const group = screen.getByRole('group', { name: /Filtrar sabores/ })

    await user.click(within(group).getByRole('button', { name: /Premium/ }))

    expect(cardNames()).toEqual(['Pistache Siciliano', 'Gianduia Tostada', 'Romeu & Julieta'])
    expect(within(group).getByRole('button', { name: /Premium/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByText('3 sabores em Premium')).toBeInTheDocument()
  })

  it('o filtro vegano só mostra sabores veganos', async () => {
    const user = userEvent.setup()
    render(<Flavors />)
    await user.click(screen.getByRole('button', { name: /Veganos/ }))
    const cards = screen.getAllByRole('article')
    cards.forEach((card) => expect(within(card).getByText('Vegano')).toBeInTheDocument())
  })
})
