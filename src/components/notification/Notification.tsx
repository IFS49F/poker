import styles from './Notification.module.css'

interface NotificationProps {
  reconnCountdown: number
  onReconn: (e: React.MouseEvent) => void
}

export default function Notification({ reconnCountdown, onReconn }: NotificationProps) {
  return (
    <div className={styles.notification}>
      <span>Your seems offline, </span>
      <span className={styles.countdown}>we will try reconnecting in {reconnCountdown}s... </span>
      <a href="#reconnect" onClick={onReconn}>
        Reconnect Now
      </a>
    </div>
  )
}
