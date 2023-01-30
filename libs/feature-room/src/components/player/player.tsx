import { useEffect, useState } from 'react';
import { delay, filter, Observable, of, startWith, switchMap } from 'rxjs';
import Card from '../../../../components/src/lib/card/card';
import SpeechBallon, {
  SpeechBallonProps,
} from '../../../../components/src/lib/speech-ballon/speech-ballon';
import { CardScore } from '../../types/card-scores';
import { CardSuit } from '../../types/card-suits';
import { PlayerAction } from '../../types/player-action';
import styles from './player.module.css';

export type PlayerProps = {
  name: string;
  action$: Observable<PlayerAction>;
  voted: boolean;
  show: boolean;
  suit: CardSuit;
  score?: CardScore;
};

export const Player = ({ name, action$, ...cardProps }: PlayerProps) => {
  const [bouncing, setBouncing] = useState(false);
  useEffect(() => {
    const sub = action$
      .pipe(
        filter(({ type }) => type === 'vote'),
        switchMap(() => of(false).pipe(delay(1000), startWith(true)))
      )
      .subscribe(setBouncing);
    return () => sub.unsubscribe();
  }, [action$]);

  const [speech, setSpeech] = useState<string | null>(null);
  useEffect(() => {
    const sub = action$
      .pipe(
        filter(({ type }) => type === 'show' || type === 'clear'),
        switchMap(({ type }) => of(null).pipe(delay(3000), startWith(type)))
      )
      .subscribe(setSpeech);
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
