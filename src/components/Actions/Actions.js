import React, { Component } from 'react';
import { validScores } from 'lib/constants';
import classNames from 'classnames';
import './Actions.css';

class Actions extends Component {
  checkSelectedValue(value, selectedValue) {
    if (typeof value === 'string') {
      return value === selectedValue;
    }

    return value === parseInt(selectedValue, 10);
  }

  render() {
    const { show, score, onVote, onToggleShow, onClear } = this.props;
    const listItems = validScores.map((item) => {
      const buttonClass = classNames({ 'selected': this.checkSelectedValue(item, score) });
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
            <li><button onClick={onToggleShow}>Show</button></li>
          )}
        </ul>
      </div>
    );
  }
}

export default Actions;
