import { CardScore } from './card-scores';
import { CardSuit } from './card-suits';

export type PlayerState = {
  id: string;
  name: string;
  suit: CardSuit;
} & (
  | {
      voted: true;
      score: CardScore;
    }
  | {
      voted: false;
    }
);
