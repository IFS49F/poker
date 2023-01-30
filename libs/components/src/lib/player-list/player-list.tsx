import { partition } from 'lodash-es';
import { PropsWithChildren, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { filter, Observable } from 'rxjs';
import Player from '../player/player';
import { PlayerAction } from '../player/player-action';
import { PlayerState } from '../player/player-state';
import styles from './player-list.module.css';

const Fade = ({ children, ...props }: PropsWithChildren) => (
  <CSSTransition
    {...props}
    timeout={500}
    classNames={{
      enter: styles['fade-enter'],
      enterActive: styles['fade-enter-active'],
      exit: styles['fade-exit'],
      exitActive: styles['fade-exit-active'],
    }}
  >
    {children}
  </CSSTransition>
);

export type PlayerListProps = {
  players: PlayerState[];
  currentPlayerId?: string;
  show: boolean;
  action$: Observable<PlayerAction>;
};

export const PlayerList = ({
  players,
  currentPlayerId,
  show,
  action$,
}: PlayerListProps) => {
  const [currentPlayer, otherPlayers] = partition(players, {
    id: currentPlayerId,
  });
  const { compare } = useMemo(() => new Intl.Collator(), []);
  otherPlayers.sort((a, b) => compare(a.name, b.name));

  return (
    <div className={styles['container']}>
      <TransitionGroup component="ul">
        {[...currentPlayer, ...otherPlayers].map(({ id, ...playerProps }) => (
          <Fade key={id}>
            <li>
              <Player
                show={show}
                action$={action$.pipe(
                  filter(({ playerId }) => playerId === id)
                )}
                {...playerProps}
              />
            </li>
          </Fade>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PlayerList;
