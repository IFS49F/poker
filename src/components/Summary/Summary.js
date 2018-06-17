import React from 'react';
import './Summary.css';

const Summary = ({ me, team, onChangeHighlight }) => {
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
          onMouseLeave={() => { onChangeHighlight(null) }}
          onTouchStart={() => { onChangeHighlight(score[0]) }}
          onTouchEnd={() => { onChangeHighlight(null) }}>
          {score[0]}
        </dd>
        <dt>× {score[1]}</dt>
      </li>
    );

  return (
    <div className="Summary">
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

export default Summary;
