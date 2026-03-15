import type { Score } from '@/types/poker'

interface ActionsProps {
  show: boolean
  myScore: Score
  onVote: (score: Score) => void
  onShow: () => void
  onClear: () => void
}

export default function Actions(_props: ActionsProps) {
  return null
}
