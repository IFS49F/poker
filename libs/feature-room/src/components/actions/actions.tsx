import { cardScores } from '../../types/card-scores';
import styles from './actions.module.css';

export type ActionsProps = {
  show: boolean;
  myScore?: string;
  onVote: (score: string) => void;
  onShow: () => void;
  onClear: () => void;
};

export const Actions = ({
  show,
  myScore,
  onVote,
  onShow,
  onClear,
}: ActionsProps) => (
  <div className={styles['container']}>
    <ul role="radiogroup">
      {cardScores.map((score) => (
        <li key={score}>
          <button
            role="radio"
            aria-checked={score === myScore}
            onClick={() => onVote(score)}
          >
            {score}
          </button>
        </li>
      ))}
    </ul>
    <ul className={styles['operations']}>
      <li>
        <button onClick={onClear} className={styles['danger']} disabled={!show}>
          Clear
        </button>
      </li>
      <li>
        <button onClick={onShow} disabled={show}>
          Show
        </button>
      </li>
    </ul>
  </div>
);

export default Actions;
