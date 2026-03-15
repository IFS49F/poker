export type Suit = '♤' | '♧' | '♡' | '♢'

// Score is a string from VALID_SCORES, or null (not voted / hidden by server)
export type Score = string | null

export interface Player {
  id: string
  name: string
  suit: Suit
  score: Score
  voted: boolean
}

export interface PlayerActionMap {
  [playerId: string]: {
    voting?: boolean
    speaking?: { color: string; content: string }
  }
}

export interface RoomState {
  me: Player | null
  myScore: Score
  team: Player[]
  show: boolean
  disconnected: boolean
  reconnCountdown: number
  playerAction: PlayerActionMap
}

export interface PokerRoomActions {
  play: (name: string) => void
  vote: (score: Score) => void
  show: () => void
  clear: () => void
}

// Shape of the stateUpdate event payload from the server
export interface ServerStateUpdate {
  team: Player[]
  show: boolean
  action?: {
    type: 'vote' | 'show' | 'clear'
    playerId: string
  }
}
