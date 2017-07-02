import React, { Component } from 'react';
import './Join.css';

class Join extends Component {
  render() {
    const { onSubmit, playerName } = this.props;

    return (
      <div className="Join">
        <form onSubmit={onSubmit}>
          Observe or
          <input type="text" name="myName" defaultValue={playerName} placeholder="type in your name" required />
          to
          <button type="submit">Play</button>
        </form>
      </div>
    );
  }
}

export default Join;
