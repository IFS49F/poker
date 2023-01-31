import { useEffect, useState } from 'react';
import { filter, fromEventPattern, map, NEVER, Observable } from 'rxjs';
import io from 'socket.io-client';
import { PlayerAction } from '../../types/player-action';
import { PlayerState } from '../../types/player-state';

const cache = new Map<string, ReturnType<typeof io>>();
const refCounter = new Map<string, number>();

export function useRemoteGameState(remoteUrl: string) {
  const [players, setPlayers] = useState<PlayerState[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [action$, setAction$] = useState<Observable<PlayerAction>>(NEVER);

  useEffect(() => {
    if (!remoteUrl) return;

    const refCount = refCounter.get(remoteUrl) ?? 0;
    const socket = cache.has(remoteUrl)
      ? (cache.get(remoteUrl) as ReturnType<typeof io>)
      : io(remoteUrl);
    cache.set(remoteUrl, socket);
    refCounter.set(remoteUrl, refCount + 1);

    const conn$ = fromEventPattern<{
      team: PlayerState[];
      show: boolean;
      action?: PlayerAction;
    }>(
      (h) => socket.on('stateUpdate', h),
      (h) => socket.off('stateUpdate', h)
    );

    const sub = conn$.subscribe(({ team, show }) => {
      setPlayers(team);
      setShow(show);
    });

    setAction$(
      conn$.pipe(
        map(({ action }) => action),
        filter(Boolean)
      )
    );

    return () => {
      sub.unsubscribe();
      const refCount = refCounter.get(remoteUrl) ?? 1;
      if (refCount === 1) {
        socket.close();
        cache.delete(remoteUrl);
        refCounter.delete(remoteUrl);
      } else {
        refCounter.set(remoteUrl, refCount - 1);
      }
    };
  }, [remoteUrl]);

  return {
    players,
    show,
    action$,
  };
}

export default useRemoteGameState;
