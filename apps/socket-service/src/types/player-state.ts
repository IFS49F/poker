export type PlayerState = {
  id: string;
  name: string;
  suit: string;
} & (
  | {
      voted: true;
      score: string;
    }
  | {
      voted: false;
    }
);
