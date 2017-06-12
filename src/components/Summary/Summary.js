import React, { Component } from 'react';
import classNames from 'classnames';
import './Summary.css';

class Summary extends Component {
  render() {
    const { me, team, show } = this.props;
    const summaryClass = classNames('Summary', { show });
    if (!show) return (
      <div className={summaryClass}></div>
    );
    let votes = {};
    team
      .concat([me])
      .forEach((val) => {
        if (!val.voted || val.score === null) return;
        if (votes[val.score]) {
          votes[val.score]++;
        } else {
          votes[val.score] = 1;
        }
      });
    const listItems = Object
      .entries(votes)
      .sort((a, b) => (b[1] - a[1]))
      .map((score) =>
        <li key={score[0]}>
          <dd>{score[0]}</dd>
          <dt>× {score[1]}</dt>
        </li>
      );
    return (
      <div className={summaryClass}>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default Summary;
