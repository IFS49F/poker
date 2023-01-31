import { RoomAction } from './room-action';
import { RoomState } from './room-state';

export interface ServerToClientEvents {
  stateUpdate(payload: RoomState & { action?: RoomAction }): void;
}
