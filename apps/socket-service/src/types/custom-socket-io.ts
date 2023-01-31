import { Socket, Server } from 'socket.io';
import { ClientToServerEvents } from './client-to-server-events';
import { InterServerEvents } from './inter-server-events';
import { RoomState } from './room-state';
import { ServerToClientEvents } from './server-to-client-events';

export type CustomSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  RoomState
>;

export type CustomIo = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  RoomState
>;
