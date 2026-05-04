import type { PlayerActions, SpeakingAction } from "./types";

type AppStateWithPlayerActions = {
  playerAction: PlayerActions;
};

type SetState = (
  updater: (
    prevState: AppStateWithPlayerActions,
  ) => Pick<AppStateWithPlayerActions, "playerAction">,
) => void;

type TimeoutState = Record<
  string,
  Partial<Record<keyof PlayerActions[string], ReturnType<typeof setTimeout>>>
>;

class PlayerStatePinger {
  private setState: SetState;
  private timeouts: TimeoutState;

  constructor(props: { setState: SetState }) {
    this.setState = props.setState;
    this.timeouts = {};
  }

  pingPlayerState(playerId: string, state: "voting", value: boolean, timeout: number): void;
  pingPlayerState(
    playerId: string,
    state: "speaking",
    value: SpeakingAction,
    timeout: number,
  ): void;
  pingPlayerState(
    playerId: string,
    state: keyof PlayerActions[string],
    value: boolean | SpeakingAction,
    timeout: number,
  ) {
    this.setPlayerState(playerId, state, value);
    if (!this.timeouts[playerId]) this.timeouts[playerId] = {};
    if (this.timeouts[playerId][state]) clearTimeout(this.timeouts[playerId][state]);
    this.timeouts[playerId][state] = setTimeout(() => {
      this.setPlayerState(playerId, state, undefined);
      delete this.timeouts[playerId]?.[state];
    }, timeout);
  }

  setPlayerState(
    playerId: string,
    state: keyof PlayerActions[string],
    value: boolean | SpeakingAction | undefined,
  ) {
    this.setState((prevState) => ({
      ...prevState,
      playerAction: {
        ...prevState.playerAction,
        [playerId]: {
          ...prevState.playerAction[playerId],
          [state]: value,
        },
      },
    }));
  }

  clearTimeouts() {
    for (const playerTimeouts of Object.values(this.timeouts)) {
      for (const timeout of Object.values(playerTimeouts)) {
        clearTimeout(timeout);
      }
    }
    this.timeouts = {};
  }
}

export default PlayerStatePinger;
