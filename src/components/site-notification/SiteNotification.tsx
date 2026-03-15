import clsx from 'clsx'
import styles from './SiteNotification.module.css'

export default function SiteNotification() {
  const expiryDateStr = process.env.NEXT_PUBLIC_DOMAIN_EXPIRY_DATE
  if (!expiryDateStr) return null

  const expiryDate = new Date(expiryDateStr)
  const today = new Date()
  const daysUntilExpiry = (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  const isUrgent = daysUntilExpiry < 90

  return (
    <div className={styles.siteNotification}>
      <p>
        Poker4Fun costs{' '}
        <a href="https://github.com/IFS49F/poker/#cost">USD $90</a> to run every year.
      </p>
      <p>
        Currently the domain is available until{' '}
        <span className={clsx(styles.expiryDate, { [styles.expiryDateClose]: isUrgent })}>
          {expiryDateStr}
        </span>
        .
      </p>
      <p>
        Please{' '}
        <a href="https://github.com/IFS49F/poker#donate" target="_blank" rel="noopener noreferrer">
          help us
        </a>{' '}
        keeping Poker4Fun free and sustainable.
      </p>
    </div>
  )
}
