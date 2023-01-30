import { SyntheticEvent } from 'react';
import styles from './join.module.css';

export type JoinProps = {
  defaultPlayerName: string;
  onJoin: (playName: string) => void;
};

export const Join = ({ defaultPlayerName, onJoin }: JoinProps) => (
  <div className={styles['container']}>
    <form
      onSubmit={(e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onJoin(formData.get('playerName') as string);
      }}
    >
      Observe or
      <input
        type="text"
        name="playerName"
        defaultValue={defaultPlayerName}
        aria-label="Player Name"
        placeholder="type in your name"
        required
        autoFocus
      />
      to
      <button type="submit">Play</button>
    </form>
  </div>
);

export default Join;
