import { CardSuit, CardScore } from '@poker4-fun/types';
import { useEffect, useState } from 'react';
import { debounceTime, filter, map, merge } from 'rxjs';
import Card from '../../../../components/src/lib/card/card';
import SpeechBallon, {
  SpeechBallonProps,
} from '../../../../components/src/lib/speech-ballon/speech-ballon';
import useRemoteGameState from '../../hooks/use-remote-game-state/use-remote-game-state';
import styles from './player.module.css';

export type PlayerProps = {
  id: string;
  name: string;
  voted: boolean;
  show: boolean;
  suit: CardSuit;
  score?: CardScore;
};

export const Player = ({ id, name, ...cardProps }: PlayerProps) => {
  const { action$ } = useRemoteGameState();

  const [bouncing, setBouncing] = useState(false);
  useEffect(() => {
    const vote$ = action$.pipe(
      filter(({ playerId, type }) => playerId === id && type === 'vote')
    );
    const sub = merge(
      vote$.pipe(map(() => true)),
      vote$.pipe(
        debounceTime(1000),
        map(() => false)
      )
    ).subscribe(setBouncing);
    return () => sub.unsubscribe();
  }, [action$]);

  const [speech, setSpeech] = useState<string | null>(null);
  useEffect(() => {
    const speech$ = action$.pipe(
      filter(
        ({ playerId, type }) =>
          playerId === id && (type === 'show' || type === 'clear')
      )
    );
    const sub = merge(
      speech$.pipe(map(({ type }) => type)),
      speech$.pipe(
        debounceTime(3000),
        map(() => null)
      )
    ).subscribe(setSpeech);
    return () => sub.unsubscribe();
  }, [action$]);

  let speechBallonProps: SpeechBallonProps;
  switch (speech) {
    case 'show':
      speechBallonProps = {
        show: true,
        backgroundColor: 'green',
        children: 'Show!',
      };
      break;
    case 'clear':
      speechBallonProps = {
        show: true,
        backgroundColor: 'red',
        children: 'Clear!',
      };
      break;
    default:
      speechBallonProps = { show: false };
  }

  return (
    <div className={styles['container']}>
      <Card bouncing={bouncing} highlighted={false} {...cardProps} />
      <label>{name}</label>
      <div className={styles['speech']}>
        <SpeechBallon {...speechBallonProps} />
      </div>
    </div>
  );
};

export default Player;
