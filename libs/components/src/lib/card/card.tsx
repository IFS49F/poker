import classNames from 'classnames';
import { CardScore } from './card-scores';
import { CardSuit } from './card-suits';
import styles from './card.module.css';

export type CardProps = {
  highlighted: boolean;
  voted: boolean;
  show: boolean;
  suit: CardSuit;
  score?: CardScore;
};

export const Card = ({ highlighted, voted, show, suit, score }: CardProps) => (
  <div
    className={classNames(styles['container'], {
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
