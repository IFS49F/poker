'use client'

import { useState } from 'react'
import styles from './Join.module.css'

interface JoinProps {
  onSubmit: (name: string) => void
}

export default function Join({ onSubmit }: JoinProps) {
  const [name, setName] = useState(
    () => (typeof window !== 'undefined' ? (localStorage.getItem('playerName') ?? '') : '')
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name)
  }

  return (
    <div className={styles.join}>
      <form onSubmit={handleSubmit}>
        Observe or
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="type in your name"
          required
          autoFocus
        />
        to
        <button type="submit">Play</button>
      </form>
    </div>
  )
}
