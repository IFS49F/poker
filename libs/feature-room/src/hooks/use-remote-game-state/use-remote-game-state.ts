import { PlayerAction, PlayerState } from '@poker4-fun/types';
import { useContext, useEffect, useState } from 'react';
import { filter, map, NEVER, Observable } from 'rxjs';
import RemoteGameStateContext from '../../contexts/remote-game-state-context';

export function useRemoteGameState() {
  const { socket, remoteEvent$ } = useContext(RemoteGameStateContext);
  const [players, setPlayers] = useState<PlayerState[]>([]);
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [action$, setAction$] = useState<Observable<PlayerAction>>(NEVER);

  useEffect(() => {
    const sub = remoteEvent$.subscribe(({ team, show }) => {
      setPlayers(team);
      setIsShowing(show);
    });

    setAction$(
      remoteEvent$.pipe(
        map(({ action }) => action),
        filter(Boolean)
      )
    );

    return () => {
      sub.unsubscribe();
    };
  }, [remoteEvent$]);

  return {
    socket,
    players,
    isShowing,
    action$,
  };
}

export default useRemoteGameState;
