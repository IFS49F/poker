import React, { Component } from 'react';
import classNames from 'classnames';
import './Card.css';

class Card extends Component {
  render() {
    let { voted, show } = this.props;
    let cardClass = classNames('Card', { voted, show });
    return (
      <div className={cardClass}>
        <div className="front face">{this.props.score}</div>
        <div className="back face">♤</div>
      </div>
    );
  }
}

export default Card;
