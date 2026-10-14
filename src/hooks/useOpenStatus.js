import { useEffect, useState } from 'react'
import { getOpenStatus } from '../lib/openStatus.js'

const REFRESH_MS = 30_000

/** Status "aberto/fechado" que se atualiza sozinho enquanto a página está aberta. */
export function useOpenStatus(schedule) {
  const [status, setStatus] = useState(() => getOpenStatus(new Date(), schedule))

  useEffect(() => {
    const update = () => setStatus(getOpenStatus(new Date(), schedule))
    const id = setInterval(update, REFRESH_MS)
    return () => clearInterval(id)
  }, [schedule])

  return status
}
