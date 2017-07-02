import React, { Component } from 'react';
import { validScores } from 'lib/constants';
import './Actions.css';

class Actions extends Component {
  render() {
    const { show, onVote, onToggleShow, onClear } = this.props;
    const listItems = validScores.map((score) =>
      <li key={score}>
        <button onClick={onVote} value={score}>{score}</button>
      </li>
    );
    return (
      <div className="Actions">
        <ul className="scores">
          {listItems}
        </ul>
        <ul className="operations">
          <li><button onClick={onToggleShow}>{show ? 'Hide' : 'Show'}</button></li>
          <li><button onClick={onClear} className="danger">Clear</button></li>
        </ul>
      </div>
    );
  }
}

export default Actions;
