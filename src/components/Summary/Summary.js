import React, { Component } from 'react';
import classNames from 'classnames';
import './Summary.css';

class Summary extends Component {
  render() {
    const { me, team, show, onChangeHighlight } = this.props;
    const summaryClass = classNames('Summary', { show });

    // we want the summary could be displayed from opacity: 0
    // to opacity: 1 with transition (`show` class), so we pass
    // `show` property down instead of checking it in Room component
    // like {show && <Summary />}.
    if (!show) {
      return (
        <div className={summaryClass}></div>
      );
    }

    let votes = {};
    team
      .concat([me])
      .forEach((val) => {
        if (!val || !val.voted || val.score === null) return;
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
          <dd
            onMouseEnter={() => { onChangeHighlight(score[0]) }}
            onMouseLeave={() => { onChangeHighlight(null) }}>
            {score[0]}
          </dd>
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
