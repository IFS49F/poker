import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from './client-to-server-events';
import { ServerToClientEvents } from './server-to-client-events';

export type CustomClientSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
