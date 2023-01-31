import { RemoteGameContextValue } from '@poker4-fun/types';
import { createContext } from 'react';
import { NEVER } from 'rxjs';

export const RemoteGameStateContext = createContext<RemoteGameContextValue>({
  remoteEvent$: NEVER,
});

export default RemoteGameStateContext;
