'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { hri } from 'human-readable-ids'
import styles from './page.module.css'

const domain = process.env.NEXT_PUBLIC_DOMAIN ?? 'poker4.fun'

export default function LandingForm() {
  const router = useRouter()
  const [roomName, setRoomName] = useState('')
  const [randomRoomName] = useState(() => hri.random())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const room = (roomName || randomRoomName).toLowerCase()
    router.push(`/${room}`)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>
        Poker4<strong>Fun</strong>
      </h1>
      <p className={styles.row}>
        <label>{domain} /</label>
        <input
          className={styles.roomInput}
          type="text"
          value={roomName}
          placeholder={randomRoomName}
          onChange={(e) => setRoomName(e.target.value)}
          autoFocus
        />
      </p>
      <p className={styles.row}>
        <button className={styles.submitButton} type="submit">
          Start or Join a session
        </button>
      </p>
    </form>
  )
}
