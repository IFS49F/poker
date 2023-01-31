import { createContext } from 'react';
import { RoomContextValue } from '../types/room-context-value';

export const RoomContext = createContext<RoomContextValue>({ remoteUrl: '' });

export default RoomContext;
