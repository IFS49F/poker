import classNames from 'classnames';
import styles from './card.module.css';

export type CardProps = {
  bouncing: boolean;
  highlighted: boolean;
  voted: boolean;
  show: boolean;
  suit: string;
  score?: string;
};

export const Card = ({
  bouncing,
  highlighted,
  voted,
  show,
  suit,
  score,
}: CardProps) => (
  <div
    className={classNames(styles['container'], {
      [styles['bouncing']]: bouncing,
      [styles['highlighted']]: highlighted,
      [styles['voted']]: voted,
      [styles['show']]: show,
    })}
  >
    <div className={classNames(styles['front'], styles['face'])}>
      {show && (voted ? score : '😴')}
    </div>
    <div className={classNames(styles['back'], styles['face'])}>{suit}</div>
  </div>
);

export default Card;
