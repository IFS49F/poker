export const cardSuits = ['♤', '♧', '♡', '♢'] as const;

export const pickRandomCardSuit = () =>
  cardSuits[Math.floor(Math.random() * 4)];

export type CardSuit = typeof cardSuits[number];
