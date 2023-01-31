import { Share, SiteNotification } from '@poker4-fun/components';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import RoomContext from '../../contexts/room-context';
import PlayerList from '../player-list/player-list';
import styles from './room-page.module.css';

export type RoomPageProps = {
  remoteUrl: string;
};

export const RoomPage = ({ remoteUrl }: RoomPageProps) => {
  const { roomName } = useParams();

  if (!roomName) return null;

  return (
    <div className={styles['container']}>
      <RoomContext.Provider value={{ remoteUrl }}>
        <Helmet>
          <title>{roomName} ♠︎ Poker4Fun</title>
        </Helmet>
        <Share roomName={roomName} />
        <SiteNotification />
        <PlayerList />
      </RoomContext.Provider>
    </div>
  );
};

export default RoomPage;
