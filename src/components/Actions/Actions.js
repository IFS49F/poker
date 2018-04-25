import React from 'react';
import { validScores } from 'lib/constants';
import classNames from 'classnames';
import './Actions.css';

const checkSelectedValue = (value, selectedValue) => (
  typeof value === 'string'
    ? value === selectedValue
    : value === parseInt(selectedValue, 10)
);

const Actions = ({ show, myScore, onVote, onShow, onClear }) => {
  const listItems = validScores.map((item) => {
    const buttonClass = classNames({ 'selected': checkSelectedValue(item, myScore) });
    return (
      <li key={item}>
        <button onClick={onVote} className={buttonClass} value={item}>{item}</button>
      </li>
    );
  });

  return (
    <div className="Actions">
      <ul className="scores">
        {listItems}
      </ul>
      <ul className="operations">
        {show ? (
          <li><button onClick={onClear} className="danger">Clear</button></li>
        ) : (
          <li><button onClick={onShow}>Show</button></li>
        )}
      </ul>
    </div>
  );
};

export default Actions;
