export type Player = {
  id: string;
  name: string;
  suit?: string;
  score: string | null;
  voted: boolean;
};

export type Action = {
  type: "vote" | "show" | "clear";
  playerId: string;
};

export type StateUpdatePayload = {
  team: Player[];
  show: boolean;
  action?: Action;
};

export type PlayPayload = {
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

export type SpeakingAction = {
  color: "green" | "red";
  content: string;
};

export type PlayerAction = {
  voting?: boolean;
  speaking?: SpeakingAction;
};

export type PlayerActions = Record<string, PlayerAction>;
