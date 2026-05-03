import { forwardRef } from "react";
import { validScores } from "lib/constants";
import type { Player } from "lib/types";
import "./Summary.css";

type SummaryProps = {
  me: Player | null;
  team: Player[];
  onChangeHighlight: (score: string | null) => void;
};

const Summary = forwardRef<HTMLDivElement, SummaryProps>(({ me, team, onChangeHighlight }, ref) => {
  const votes: Record<string, number> = {};
  validScores.forEach((score) => (votes[score] = 0));
  let validVotesCount = 0;
  const players = me ? [...team, me] : team;
  players.forEach((val) => {
    if (!val || !val.voted || val.score === null) return;
    validVotesCount++;
    votes[val.score] = (votes[val.score] ?? 0) + 1;
  });
  const listItems = Object.entries(votes).map(([score, count]) => {
    if (count === 0) return null;
    const percentage = (1 - count / validVotesCount) * 100;
    const onMouseEnter = () => {
      onChangeHighlight(score);
    };
    const onMouseLeave = () => {
      onChangeHighlight(null);
    };
    return (
      <li
        key={score}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTouchStart={onMouseEnter}
        onTouchEnd={onMouseLeave}
      >
        <dd>
          <i style={{ maxHeight: `${percentage}%` }}></i>
        </dd>
        <dt>
          <small>&times; {count}</small>
          {score}
        </dt>
      </li>
    );
  });

  return (
    <div className="Summary" ref={ref}>
      <ul>{listItems}</ul>
    </div>
  );
});

export default Summary;
