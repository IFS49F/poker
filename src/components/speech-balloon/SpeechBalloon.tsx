import clsx from 'clsx'
import styles from './SpeechBalloon.module.css'

interface SpeechBalloonProps {
  ref?: React.Ref<HTMLQuoteElement>
  children: React.ReactNode
  color?: string
}

export default function SpeechBalloon({ ref, children, color }: SpeechBalloonProps) {
  return (
    <blockquote ref={ref} className={clsx(styles.speechBalloon, color && styles[color])}>
      {children}
    </blockquote>
  )
}
