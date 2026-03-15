import { useState, useCallback } from 'react'

const STORAGE_KEY = 'playerName'

export function usePlayerName() {
  const [playerName, setPlayerNameState] = useState<string>(
    () => (typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) ?? '') : '')
  )

  const setPlayerName = useCallback((name: string) => {
    localStorage.setItem(STORAGE_KEY, name)
    setPlayerNameState(name)
  }, [])

  return { playerName, setPlayerName }
}
