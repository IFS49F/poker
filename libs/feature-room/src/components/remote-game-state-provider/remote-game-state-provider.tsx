import { CustomClientSocket, ServerEvent } from '@poker4-fun/types';
import { ReactNode, useEffect, useState } from 'react';
import { fromEventPattern, NEVER, Observable, share } from 'rxjs';
import { io } from 'socket.io-client';
import RemoteGameStateContext from '../../contexts/remote-game-state-context';

export type RemoteGameStateProviderProps = {
  remoteUrl: string;
  children?: ReactNode;
};

export const RemoteGameStateProvider = ({
  remoteUrl,
  children,
}: RemoteGameStateProviderProps) => {
  const [socket, setSocket] = useState<CustomClientSocket>();
  const [remoteEvent$, setRemoteEvent$] =
    useState<Observable<ServerEvent>>(NEVER);

  useEffect(() => {
    const socket: CustomClientSocket = io(remoteUrl);
    setSocket(socket);

    setRemoteEvent$(
      fromEventPattern<ServerEvent>(
        (h) => socket.on('stateUpdate', h),
        (h) => socket.off('stateUpdate', h)
      ).pipe(share())
    );

    return () => {
      setSocket(undefined);
      socket.close();
    };
  }, [remoteUrl]);

  return (
    <RemoteGameStateContext.Provider value={{ socket, remoteEvent$ }}>
      {children}
    </RemoteGameStateContext.Provider>
  );
};

export default RemoteGameStateProvider;
