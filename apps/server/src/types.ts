export type Player = {
  id: string;
  name: string;
  suit?: string;
  score: string | null;
  voted: boolean;
};

export type RoomState = {
  team: Player[];
  show: boolean;
};

export type Action = {
  type: "vote" | "show" | "clear";
  playerId: string;
};

export type StateUpdatePayload = RoomState & {
  action?: Action;
};

export type PlayPayload =
  | string
  | {
      name: string;
      suit?: string;
    };

export interface ClientToServerEvents {
  join: (room?: string) => void;
  play: (player: PlayPayload) => void;
  vote: (score: string) => void;
  show: () => void;
  clear: () => void;
}

export interface ServerToClientEvents {
  stateUpdate: (state: StateUpdatePayload, isClearAction?: boolean) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  currentRoom?: string;
}
