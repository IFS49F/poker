import styles from './Notification.module.css'

interface NotificationProps {
  ref?: React.Ref<HTMLDivElement>
  reconnCountdown: number
  onReconn: (e: React.MouseEvent) => void
}

export default function Notification({ ref, reconnCountdown, onReconn }: NotificationProps) {
  return (
    <div ref={ref} className={styles.notification}>
      <span>Your seems offline, </span>
      <span className={styles.countdown}>we will try reconnecting in {reconnCountdown}s... </span>
      <a href="#reconnect" onClick={onReconn}>
        Reconnect Now
      </a>
    </div>
  )
}
