import React, { Component } from 'react';
import classNames from 'classnames';
import './Card.css';

class Card extends Component {
  showVoteValue() {
    const { score, voted, show } = this.props;

    if (!show) { return ''; }

    if (!voted) { return '😴'; }

    return score;
  }

  render() {
    const { voted, show, suit } = this.props;
    const cardClass = classNames('Card', { voted, show });

    return (
      <div className={cardClass}>
        <div className="front face">{this.showVoteValue()}</div>
        <div className="back face">{suit}</div>
      </div>
    );
  }
}

export default Card;
