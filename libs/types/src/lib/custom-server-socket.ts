import { Server, Socket } from 'socket.io';
import { ClientToServerEvents } from './client-to-server-events';
import { InterServerEvents } from './inter-server-events';
import { ServerEvent } from './server-event';
import { ServerToClientEvents } from './server-to-client-events';

export type CustomServerSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerEvent
>;

export type CustomServerIo = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerEvent
>;
