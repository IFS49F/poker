import { PlayerAction } from './player-action';
import { PlayerState } from './player-state';

export type ServerEvent = {
  team: PlayerState[];
  show: boolean;
  action?: PlayerAction;
};
