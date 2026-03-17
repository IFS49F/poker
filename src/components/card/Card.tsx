import clsx from 'clsx'
import type { Score, Suit } from '@/types/poker'
import styles from './Card.module.css'

interface CardProps {
  ref?: React.Ref<HTMLDivElement>
  highlight: boolean
  voted: boolean
  show: boolean
  suit: Suit
  score: Score
}

export default function Card({ ref, highlight, voted, show, suit, score }: CardProps) {
  return (
    <div
      ref={ref}
      className={clsx(styles.card, {
        [styles.highlight]: highlight,
        [styles.voted]: voted,
        [styles.show]: show,
      })}
    >
      <div className={clsx(styles.face, styles.front)}>
        {!show ? '' : !voted ? '😴' : score}
      </div>
      <div className={clsx(styles.face, styles.back)}>{suit}</div>
    </div>
  )
}
