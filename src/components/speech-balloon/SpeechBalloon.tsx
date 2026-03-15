import clsx from 'clsx'
import styles from './SpeechBalloon.module.css'

interface SpeechBalloonProps {
  children: React.ReactNode
  color?: string
}

export default function SpeechBalloon({ children, color }: SpeechBalloonProps) {
  return (
    <blockquote className={clsx(styles.speechBalloon, color && styles[color])}>
      {children}
    </blockquote>
  )
}
