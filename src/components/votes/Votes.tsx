import type { Player, PlayerActionMap, Score } from '@/types/poker'

interface VotesProps {
  me: Player | null
  myScore: Score
  team: Player[]
  playerAction: PlayerActionMap
  show: boolean
}

export default function Votes(_props: VotesProps) {
  return null
}
