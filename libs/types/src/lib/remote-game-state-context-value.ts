import { Observable } from 'rxjs';
import { CustomClientSocket } from './custom-client-socket';
import { ServerEvent } from './server-event';

export type RemoteGameContextValue = {
  socket?: CustomClientSocket;
  remoteEvent$: Observable<ServerEvent>;
};
