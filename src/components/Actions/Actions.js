import React from 'react';
import { validScores } from 'lib/constants';
import classNames from 'classnames';
import './Actions.css';

const Actions = ({ show, myScore, onVote, onShow, onClear }) =>
  <div className="Actions">
    <ul className="scores">
      {validScores.map(item =>
        <li key={item}>
          <button
            onClick={onVote}
            className={classNames({ 'selected': item === myScore })}
            value={item}>
            {item}
          </button>
        </li>
      )}
    </ul>
    <ul className="operations">
      {show ? (
        <li><button onClick={onClear} className="danger">Clear</button></li>
      ) : (
        <li><button onClick={onShow}>Show</button></li>
      )}
    </ul>
  </div>

export default Actions;
