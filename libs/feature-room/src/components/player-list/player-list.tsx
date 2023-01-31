import { partition } from 'lodash-es';
import { PropsWithChildren, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useRemoteGameState from '../../hooks/use-remote-game-state/use-remote-game-state';
import Player from '../player/player';
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
  currentPlayerId?: string;
};

export const PlayerList = ({ currentPlayerId }: PlayerListProps) => {
  const { players, isShowing } = useRemoteGameState();

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
              <Player id={id} show={isShowing} {...playerProps} />
            </li>
          </Fade>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PlayerList;
