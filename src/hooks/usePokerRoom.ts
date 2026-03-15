'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { usePlayerName } from './usePlayerName'
import { useTransientAction } from './useTransientAction'
import { SUITS, TRANSIENT_DURATIONS } from '@/lib/constants'
import type {
  Player,
  PlayerActionMap,
  RoomState,
  PokerRoomActions,
  ServerStateUpdate,
  Score,
} from '@/types/poker'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? 'http://localhost:4000'

// Default reconnection delay from socket.io (5s), used for countdown display
const DEFAULT_RECONN_DELAY_MAX_MS = 5000

export function usePokerRoom(room: string): { state: RoomState; actions: PokerRoomActions } {
  const [me, setMe] = useState<Player | null>(null)
  const [myScore, setMyScore] = useState<Score>(null)
  const [team, setTeam] = useState<Player[]>([])
  const [show, setShow] = useState(false)
  const [disconnected, setDisconnected] = useState(false)
  const [reconnCountdown, setReconnCountdown] = useState(0)
  const [playerAction, setPlayerAction] = useState<PlayerActionMap>({})

  const { playerName, setPlayerName } = usePlayerName()
  const { ping, clearAll } = useTransientAction(setPlayerAction)

  // Refs to avoid stale closures in socket event handlers
  const socketRef = useRef<Socket | null>(null)
  const playingRef = useRef(false)
  const playerNameRef = useRef(playerName)
  playerNameRef.current = playerName

  const handleAction = useCallback(
    (action: NonNullable<ServerStateUpdate['action']>) => {
      switch (action.type) {
        case 'vote':
          ping(action.playerId, 'voting', true, TRANSIENT_DURATIONS.voting)
          break
        case 'show':
          ping(action.playerId, 'speaking', { color: 'green', content: 'Show!' }, TRANSIENT_DURATIONS.speaking)
          break
        case 'clear':
          ping(action.playerId, 'speaking', { color: 'red', content: 'Clear!' }, TRANSIENT_DURATIONS.speaking)
          break
      }
    },
    [ping]
  )

  useEffect(() => {
    const socket = io(SOCKET_URL)
    socketRef.current = socket

    socket.on('stateUpdate', (response: ServerStateUpdate, isClearAction?: boolean) => {
      const updatedMe = response.team.find((p) => p.id === socket.id) ?? null
      const updatedTeam = response.team.filter((p) => p.id !== socket.id)

      setMe(updatedMe)
      setTeam(updatedTeam)
      setShow(response.show)
      if (isClearAction) setMyScore(null)
      if (response.action) handleAction(response.action)
    })

    socket.on('connect_error', () => {
      setMe(null)
      setDisconnected(true)
      const delayMax =
        (socket.io as { opts?: { reconnectionDelayMax?: number } }).opts?.reconnectionDelayMax ??
        DEFAULT_RECONN_DELAY_MAX_MS
      setReconnCountdown(Math.floor(delayMax / 1000))
    })

    socket.on('connect', () => {
      setDisconnected(false)
      // Re-join room on every connect (handles both initial connect and reconnect)
      socket.emit('join', room)
      // Re-register as player if we were already playing
      if (playingRef.current && playerNameRef.current) {
        const suit = SUITS[Math.floor(Math.random() * SUITS.length)]
        socket.emit('play', { name: playerNameRef.current, suit })
      }
    })

    return () => {
      clearAll()
      socket.disconnect()
    }
  }, [room, handleAction, clearAll])

  const play = useCallback((name: string) => {
    const socket = socketRef.current
    if (!socket) return
    const suit = SUITS[Math.floor(Math.random() * SUITS.length)]
    playingRef.current = true
    setMe({ id: socket.id ?? '', name, suit, score: null, voted: false })
    setPlayerName(name)
    socket.emit('play', { name, suit })
  }, [setPlayerName])

  const vote = useCallback((score: Score) => {
    const socket = socketRef.current
    if (!socket) return
    setMe((prev) => (prev ? { ...prev, score, voted: true } : prev))
    setMyScore(score)
    socket.emit('vote', score)
  }, [])

  const handleShow = useCallback(() => {
    socketRef.current?.emit('show')
  }, [])

  const handleClear = useCallback(() => {
    socketRef.current?.emit('clear')
  }, [])

  return {
    state: {
      me,
      myScore,
      team,
      show,
      disconnected,
      reconnCountdown,
      playerAction,
    },
    actions: {
      play,
      vote,
      show: handleShow,
      clear: handleClear,
    },
  }
}
