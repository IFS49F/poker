'use client'

import { useState } from 'react'
import styles from './Share.module.css'

interface ShareProps {
  roomName: string
}

const DEFAULT_TOOLTIP = 'Click to copy link'

export default function Share({ roomName }: ShareProps) {
  const [tooltip, setTooltip] = useState(DEFAULT_TOOLTIP)

  const link = typeof window !== 'undefined' ? `${window.location.origin}/${roomName}` : `/${roomName}`
  const caption = link.replace(/^https?:\/\//, '')

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      // fallback for older browsers
      const input = document.createElement('input')
      input.value = link
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
    }
    setTooltip('Copied!')
  }

  return (
    <div className={styles.share}>
      <h1>
        Poker4<strong>Fun</strong>
      </h1>
      <a
        href={link}
        onClick={handleCopy}
        onMouseLeave={() => setTooltip(DEFAULT_TOOLTIP)}
        aria-label={tooltip}
      >
        {caption}
      </a>
    </div>
  )
}
