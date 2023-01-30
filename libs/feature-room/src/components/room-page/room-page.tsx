import { Share } from '@poker4-fun/components';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import styles from './room-page.module.css';

export const RoomPage = () => {
  const { roomName } = useParams();

  if (!roomName) return null;

  return (
    <div className={styles['container']}>
      <Helmet>
        <title>{roomName} ♠︎ Poker4Fun</title>
      </Helmet>
      <Share roomName={roomName} />
    </div>
  );
};

export default RoomPage;
