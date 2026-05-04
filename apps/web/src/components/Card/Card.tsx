import { forwardRef } from "react";
import classNames from "classnames";
import "./Card.css";

type CardProps = {
  highlight: boolean;
  voted: boolean;
  show: boolean;
  suit?: string;
  score: string | null;
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ highlight, voted, show, suit, score }, ref) => {
    const cardClass = classNames("Card", { highlight, voted, show });

    return (
      <div className={cardClass} ref={ref}>
        <div className="front face">{!show ? "" : !voted ? "😴" : score}</div>
        <div className="back face">{suit}</div>
      </div>
    );
  },
);

export default Card;
