import { CardScore, cardScores } from '@poker4-fun/types';
import { useEffect, useState } from 'react';
import { filter } from 'rxjs';
import useRemoteGameState from '../../hooks/use-remote-game-state/use-remote-game-state';
import styles from './actions.module.css';

export const Actions = () => {
  const [myScore, setMyScore] = useState<CardScore>();
  const { isShowing, action$, socket } = useRemoteGameState();

  useEffect(() => {
    const sub = action$
      .pipe(filter(({ type }) => type === 'clear'))
      .subscribe(() => setMyScore(undefined));
    return () => sub.unsubscribe();
  });

  return (
    <div className={styles['container']}>
      <ul role="radiogroup">
        {cardScores.map((score) => (
          <li key={score}>
            <button
              role="radio"
              aria-checked={score === myScore}
              onClick={() => {
                setMyScore(score);
                socket?.emit('vote', score);
              }}
            >
              {score}
            </button>
          </li>
        ))}
      </ul>
      <ul className={styles['operations']}>
        <li>
          <button
            onClick={() => {
              setMyScore(undefined);
              socket?.emit('clear');
            }}
            className={styles['danger']}
            disabled={!isShowing}
          >
            Clear
          </button>
        </li>
        <li>
          <button onClick={() => socket?.emit('show')} disabled={isShowing}>
            Show
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Actions;
