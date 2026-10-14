import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Builder } from './Builder.jsx'

const orderLink = () => screen.getByRole('link', { name: /Pedir por WhatsApp/ })
const messageFromLink = () =>
  decodeURIComponent(orderLink().getAttribute('href').split('?text=')[1])

describe('<Builder />', () => {
  it('começa sem sabores e com o botão de pedido desativado', () => {
    render(<Builder />)
    expect(screen.getByText(/Escolhe pelo menos um sabor/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Pedir por WhatsApp/ })).toBeDisabled()
  })

  it('respeita o limite de sabores do tamanho', async () => {
    const user = userEvent.setup()
    render(<Builder />)
    await user.click(screen.getByRole('radio', { name: /Pequeno/ }))
    await user.click(screen.getByRole('checkbox', { name: 'Pistache Siciliano' }))

    expect(screen.getByRole('checkbox', { name: 'Açaí da Casa' })).toBeDisabled()
    expect(screen.getByText('1 de 1 escolhido')).toBeInTheDocument()
  })

  it('monta o pedido e gera o link do WhatsApp com a mensagem', async () => {
    const user = userEvent.setup()
    render(<Builder />)

    await user.click(screen.getByRole('radio', { name: /Grande/ }))
    await user.click(screen.getByRole('radio', { name: /Copinho/ }))
    await user.click(screen.getByRole('checkbox', { name: 'Doce de Leite da Nonna' }))
    await user.click(screen.getByRole('checkbox', { name: 'Morango com Manjericão' }))
    await user.click(screen.getByRole('radio', { name: /Chantilly/ }))

    expect(screen.getByTestId('order-total')).toHaveTextContent(/R\$\s30,00/)
    expect(orderLink().getAttribute('href')).toMatch(/^https:\/\/wa\.me\/\d+\?text=/)
    expect(orderLink()).toHaveAttribute('target', '_blank')

    const message = messageFromLink()
    expect(message).toContain('Grande (3 bolas) no copinho')
    expect(message).toContain('• Doce de Leite da Nonna\n• Morango com Manjericão')
    expect(message).toContain('Cobertura: Chantilly da casa')
  })

  it('"Começar de novo" limpa o pedido', async () => {
    const user = userEvent.setup()
    render(<Builder />)
    await user.click(screen.getByRole('checkbox', { name: 'Açaí da Casa' }))
    await user.click(screen.getByRole('button', { name: 'Começar de novo' }))
    expect(screen.getByRole('checkbox', { name: 'Açaí da Casa' })).not.toBeChecked()
  })
})
