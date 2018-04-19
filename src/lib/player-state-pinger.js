class PlayerStatePinger {
  constructor(props) {
    this.setState = props.setState;
    this.timeouts = {};
  }

  pingPlayerState(playerId, state, timeout) {
    this.setPlayerState(playerId, state, true);
    if (!this.timeouts[playerId]) this.timeouts[playerId] = {};
    if (this.timeouts[playerId][state]) clearTimeout(this.timeouts[playerId][state]);
    this.timeouts[playerId][state] = setTimeout(() => {
      this.setPlayerState(playerId, state, false);
      delete this.timeouts[playerId][state];
    }, timeout);
  }

  setPlayerState(playerId, state, value) {
    this.setState(prevState => {
      const nextState = { ...prevState, playerAction: { ...prevState.playerAction } };
      if (nextState.playerAction[playerId] === undefined)
        nextState.playerAction[playerId] = {};
      nextState.playerAction[playerId][state] = value;
      return nextState;
    });
  }

  clearTimeouts(timeouts = this.timeouts) {
    for (let elm in timeouts) {
      if (typeof elm === 'object') this.clearTimeouts(elm);
      else clearTimeout(elm);
    }
  }
}

export default PlayerStatePinger;
