import styles from './room-page.module.css';

/* eslint-disable-next-line */
export interface RoomPageProps {}

export function RoomPage(props: RoomPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RoomPage!</h1>
    </div>
  );
}

export default RoomPage;
