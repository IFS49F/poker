import { Share, SiteNotification } from '@poker4-fun/components';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Game from '../game/game';
import RemoteGameStateProvider from '../remote-game-state-provider/remote-game-state-provider';
import styles from './room-page.module.css';

export type RoomPageProps = {
  remoteUrl: string;
};

export const RoomPage = ({ remoteUrl }: RoomPageProps) => {
  const { roomName } = useParams();

  if (!roomName) return null;

  return (
    <div className={styles['container']}>
      <RemoteGameStateProvider remoteUrl={remoteUrl}>
        <Helmet>
          <title>{roomName} ♠︎ Poker4Fun</title>
        </Helmet>
        <Share roomName={roomName} />
        <SiteNotification />
        <Game roomName={roomName} />
      </RemoteGameStateProvider>
    </div>
  );
};

export default RoomPage;
