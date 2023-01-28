import { clone, constant, map, pickBy, times, zipObject } from 'lodash-es';
import { PropsWithChildren } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CardScore, cardScores } from '../card/card-scores';
import { PlayerState } from '../player/player-state';
import styles from './summary.module.css';

export type SummaryProps = {
  show: boolean;
  players: PlayerState[];
  onChangeHighlight: (score: CardScore | null) => void;
};

const pluralRules = new Intl.PluralRules('en');

const formatVotesCount = (count: number) => {
  switch (pluralRules.select(count)) {
    case 'one':
      return 'one person';
    default:
      return `${count} people`;
  }
};

const Fade = ({ children, ...props }: PropsWithChildren) => (
  <CSSTransition
    {...props}
    timeout={500}
    classNames={{
      enter: styles['fade-enter'],
      enterActive: styles['fade-enter-active'],
      exit: styles['fade-exit'],
    }}
  >
    {children}
  </CSSTransition>
);

const emptyTally = zipObject(
  cardScores,
  times(cardScores.length, constant(0))
) as Record<CardScore, number>;

export function Summary({ show, players, onChangeHighlight }: SummaryProps) {
  let tally = clone(emptyTally);
  let votesCount = 0;
  for (const player of players) {
    if (player.voted) {
      tally[player.score] += 1;
      votesCount += 1;
    }
  }
  tally = pickBy(tally, (count) => count > 0) as Record<CardScore, number>;

  return (
    <div className={styles['container']} aria-live="assertive">
      <TransitionGroup component={null}>
        {show && votesCount && (
          <Fade>
            <ul aria-label="Result">
              {map(tally, (count, score: CardScore) => (
                <li
                  key={score}
                  onMouseEnter={() => onChangeHighlight(score)}
                  onMouseLeave={() => onChangeHighlight(null)}
                  onTouchStart={() => onChangeHighlight(score)}
                  onTouchEnd={() => onChangeHighlight(null)}
                  aria-label={`${formatVotesCount(count)} voted ${score}`}
                >
                  <dd aria-hidden>
                    <i
                      style={{
                        maxHeight: `${(1 - count / votesCount) * 100}%`,
                      }}
                    />
                  </dd>
                  <dt aria-hidden>
                    <small>&times; {count}</small>
                    {score}
                  </dt>
                </li>
              ))}
            </ul>
          </Fade>
        )}
      </TransitionGroup>
    </div>
  );
}

export default Summary;
