import React from 'react';
import { validScores } from 'lib/constants';
import './Summary.css';

const Summary = ({ me, team, onChangeHighlight }) => {
  let votes = {};
  validScores.forEach(score => votes[score] = 0);
  let validVotesCount = 0;
  team.concat([me]).forEach((val) => {
    if (!val || !val.voted || val.score === null) return;
    validVotesCount++;
    votes[val.score]++;
  });
  const listItems = Object
    .entries(votes)
    .map(([score, count]) => {
      if (count === 0) return null;
      const percentage = (1 - count / validVotesCount) * 100;
      const onMouseEnter = () => { onChangeHighlight(score) };
      const onMouseLeave = () => { onChangeHighlight(null) };
      return (
        <li 
          key={score}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onTouchStart={onMouseEnter}
          onTouchEnd={onMouseLeave}>
          <dd>
            <i style={{maxHeight: `${percentage}%`}}></i>
          </dd>
          <dt>
            <small>&times; {count}</small>
            {score}
          </dt>
        </li>
      );
    });

  return (
    <div className="Summary">
      <ul>
        {listItems}
      </ul>
    </div>
  );
};

export default Summary;
