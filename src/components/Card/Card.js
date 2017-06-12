import React, { Component } from 'react';
import classNames from 'classnames';
import './Card.css';

class Card extends Component {
  render() {
    const { score, voted, show } = this.props;
    const cardClass = classNames('Card', { voted, show: (voted && show) });
    return (
      <div className={cardClass}>
        <div className="front face">{score}</div>
        <div className="back face">♤</div>
      </div>
    );
  }
}

export default Card;
