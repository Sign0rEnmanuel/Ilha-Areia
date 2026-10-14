import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { OpenBadge } from './OpenBadge.jsx'

describe('<OpenBadge />', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('mostra "Aberto agora" no horário de funcionamento', () => {
    vi.setSystemTime(new Date('2026-10-13T16:00:00-03:00')) // terça, 16h
    render(<OpenBadge />)
    expect(screen.getByRole('status')).toHaveTextContent('Aberto agora· fecha às 22h')
  })

  it('mostra "Fechado agora" na segunda (folga)', () => {
    vi.setSystemTime(new Date('2026-10-12T16:00:00-03:00')) // segunda, 16h
    render(<OpenBadge />)
    expect(screen.getByRole('status')).toHaveTextContent('Fechado agora· abre amanhã às 14h')
  })
})
