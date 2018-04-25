import React from 'react';
import classNames from 'classnames';
import './Card.css';

const Card = ({ highlight, voted, show, suit, score }) => {
  const cardClass = classNames('Card', { highlight, voted, show });

  return (
    <div className={cardClass}>
      <div className="front face">
        {
          !show
          ? ''
          : !voted
            ? '😴'
            : score
        }
      </div>
      <div className="back face">{suit}</div>
    </div>
  );
};

export default Card;
