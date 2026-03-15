import { VALID_SCORES } from '@/lib/constants'
import type { Player, Score } from '@/types/poker'
import styles from './Summary.module.css'

interface SummaryProps {
  me: Player | null
  team: Player[]
  onChangeHighlight: (score: Score) => void
}

export default function Summary({ me, team, onChangeHighlight }: SummaryProps) {
  const votes: Record<string, number> = {}
  VALID_SCORES.forEach((score) => (votes[score] = 0))

  let validVotesCount = 0
  ;[...team, me].forEach((player) => {
    if (!player || !player.voted || player.score === null) return
    validVotesCount++
    votes[player.score] = (votes[player.score] ?? 0) + 1
  })

  const items = Object.entries(votes)
    .map(([score, count]) => {
      if (count === 0) return null
      const percentage = (1 - count / validVotesCount) * 100
      return (
        <li
          key={score}
          onMouseEnter={() => onChangeHighlight(score)}
          onMouseLeave={() => onChangeHighlight(null)}
          onTouchStart={() => onChangeHighlight(score)}
          onTouchEnd={() => onChangeHighlight(null)}
        >
          <dd>
            <i style={{ maxHeight: `${percentage}%` }} />
          </dd>
          <dt>
            <small>&times; {count}</small>
            {score}
          </dt>
        </li>
      )
    })
    .filter(Boolean)

  return (
    <div className={styles.summary}>
      <ul>{items}</ul>
    </div>
  )
}
