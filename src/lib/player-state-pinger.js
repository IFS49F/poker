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
      const nextState = Object.assign({}, prevState);
      const { me, team } = nextState;
      const player = [me, ...team].find(client => client && client.id === playerId);
      player[state] = value;
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
