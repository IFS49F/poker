import styles from './player.module.css';

/* eslint-disable-next-line */
export interface PlayerProps {}

export function Player(props: PlayerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Player!</h1>
    </div>
  );
}

export default Player;
