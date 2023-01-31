import { ServerEvent } from './server-event';

export interface ServerToClientEvents {
  stateUpdate(payload: ServerEvent): void;
}
