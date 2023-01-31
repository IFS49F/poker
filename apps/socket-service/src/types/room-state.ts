import type { PlayerState } from './player-state';

type PlayerStateWithScoreRedacted = Omit<PlayerState, 'score'>;

export type RoomState =
  | {
      show: false;
      team: PlayerStateWithScoreRedacted[];
    }
  | {
      show: true;
      team: PlayerState[];
    };
