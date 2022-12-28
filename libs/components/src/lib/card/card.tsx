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
    className={classNames(styles['container'], { highlighted, voted, show })}
  >
    <div className="front face">{show && (voted ? score : '😴')}</div>
    <div className="back face">{suit}</div>
  </div>
);

export default Card;
