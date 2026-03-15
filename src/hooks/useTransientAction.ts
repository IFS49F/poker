import { useCallback, useRef } from 'react'
import type { PlayerActionMap } from '@/types/poker'

type SetPlayerAction = (updater: (prev: PlayerActionMap) => PlayerActionMap) => void

/**
 * Replaces PlayerStatePinger. Returns a `ping` function that sets a transient
 * state key on a player (e.g. voting, speaking) and clears it after `durationMs`.
 * All timers are tracked via ref and cleaned up automatically.
 */
export function useTransientAction(setPlayerAction: SetPlayerAction) {
  // timeouts[playerId][stateKey] = TimeoutId
  const timeouts = useRef<Record<string, Record<string, ReturnType<typeof setTimeout>>>>({})

  const ping = useCallback(
    <K extends keyof PlayerActionMap[string]>(
      playerId: string,
      key: K,
      value: PlayerActionMap[string][K],
      durationMs: number
    ) => {
      // Set the value immediately
      setPlayerAction((prev) => ({
        ...prev,
        [playerId]: {
          ...prev[playerId],
          [key]: value,
        },
      }))

      // Clear any existing timer for this player+key
      if (!timeouts.current[playerId]) timeouts.current[playerId] = {}
      clearTimeout(timeouts.current[playerId][key as string])

      // Schedule removal
      timeouts.current[playerId][key as string] = setTimeout(() => {
        setPlayerAction((prev) => ({
          ...prev,
          [playerId]: {
            ...prev[playerId],
            [key]: undefined,
          },
        }))
        delete timeouts.current[playerId][key as string]
      }, durationMs)
    },
    [setPlayerAction]
  )

  const clearAll = useCallback(() => {
    for (const playerTimers of Object.values(timeouts.current)) {
      for (const id of Object.values(playerTimers)) {
        clearTimeout(id)
      }
    }
    timeouts.current = {}
  }, [])

  return { ping, clearAll }
}
