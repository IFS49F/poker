import type { Suit } from '@/types/poker'

export const VALID_SCORES = [
  '0',
  '½',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
  '❓',
  '🐞',
  '☕',
] as const

export const SUITS: Suit[] = ['♤', '♧', '♡', '♢']

export const TRANSIENT_DURATIONS = {
  voting: 1000,
  speaking: 4000,
} as const
