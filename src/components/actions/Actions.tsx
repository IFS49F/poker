import clsx from 'clsx'
import { VALID_SCORES } from '@/lib/constants'
import type { Score } from '@/types/poker'
import styles from './Actions.module.css'

interface ActionsProps {
  show: boolean
  myScore: Score
  onVote: (score: Score) => void
  onShow: () => void
  onClear: () => void
}

export default function Actions({ show, myScore, onVote, onShow, onClear }: ActionsProps) {
  return (
    <div className={styles.actions}>
      <ul className={styles.scores}>
        {VALID_SCORES.map((item) => (
          <li key={item}>
            <button
              onClick={() => onVote(item)}
              className={clsx({ [styles.selected]: item === myScore })}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <ul className={styles.operations}>
        {show ? (
          <li>
            <button onClick={onClear} className={styles.danger}>
              Clear
            </button>
          </li>
        ) : (
          <li>
            <button onClick={onShow}>Show</button>
          </li>
        )}
      </ul>
    </div>
  )
}
