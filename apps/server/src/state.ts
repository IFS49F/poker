import type { Action, Player, RoomState, StateUpdatePayload } from "./types";

export const defaultState = (): RoomState => ({
  team: [],
  show: false,
});

export const maskScores = (state: RoomState | null): RoomState => {
  if (!state) {
    return defaultState();
  }

  if (state.show) {
    return state;
  }

  return {
    team: state.team.map((player) => ({
      ...player,
      score: null,
    })),
    show: state.show,
  };
};

export const buildStateUpdate = (
  state: RoomState,
  action?: Action,
  revealScores = false,
): StateUpdatePayload => {
  const payload = revealScores ? state : maskScores(state);
  return action ? { ...payload, action } : payload;
};

export const addPlayer = (
  state: RoomState,
  player: Omit<Player, "score" | "voted">,
): RoomState => ({
  ...state,
  team: state.team.concat({
    ...player,
    score: null,
    voted: false,
  }),
});

export const updatePlayerVote = (
  state: RoomState,
  socketId: string,
  score: string,
): RoomState | null => {
  let hasMatch = false;

  const team = state.team.map((player) => {
    if (player.id !== socketId) {
      return player;
    }

    hasMatch = true;
    return {
      ...player,
      score,
      voted: true,
    };
  });

  if (!hasMatch) {
    return null;
  }

  return {
    ...state,
    team,
  };
};

export const showScores = (state: RoomState): RoomState => ({
  ...state,
  show: true,
});

export const clearVotes = (state: RoomState): RoomState => ({
  ...state,
  show: false,
  team: state.team.map((player) => ({
    ...player,
    score: null,
    voted: false,
  })),
});

export const removePlayer = (state: RoomState, socketId: string): RoomState => ({
  ...state,
  team: state.team.filter((player) => player.id !== socketId),
});
