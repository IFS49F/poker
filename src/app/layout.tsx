import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Poker4Fun',
    template: '%s ♠︎ Poker4Fun',
  },
  description: 'Free, real-time Scrum planning poker for your team.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
