class PlayerStatePinger {
  constructor(props) {
    this.setState = props.setState;
    this.timeouts = {};
  }

  pingPlayerState(playerId, state, value = true, timeout) {
    this.setPlayerState(playerId, state, value);
    if (!this.timeouts[playerId]) this.timeouts[playerId] = {};
    if (this.timeouts[playerId][state]) clearTimeout(this.timeouts[playerId][state]);
    this.timeouts[playerId][state] = setTimeout(() => {
      this.setPlayerState(playerId, state, undefined);
      delete this.timeouts[playerId][state];
    }, timeout);
  }

  setPlayerState(playerId, state, value) {
    this.setState(prevState => ({
      ...prevState,
      playerAction: {
        ...prevState.playerAction,
        [playerId]: {
          ...prevState.playerAction[playerId],
          [state]: value
        }
      }
    }));
  }

  clearTimeouts(timeouts = this.timeouts) {
    for (let elm in timeouts) {
      if (typeof elm === 'object') this.clearTimeouts(elm);
      else clearTimeout(elm);
    }
  }
}

export default PlayerStatePinger;
