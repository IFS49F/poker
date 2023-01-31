import { CardScore } from './card-scores';
import { PlayerState } from './player-state';

export interface ClientToServerEvents {
  join(room: string): void;
  play(player: Pick<PlayerState, 'name' | 'suit'> | string): void;
  vote(score: CardScore): void;
  show(): void;
  clear(): void;
  disconnect(): void;
}
