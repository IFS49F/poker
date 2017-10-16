import React, { Component } from 'react';
import './Share.css';

const defaultTooltip = 'Click to copy link';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: defaultTooltip
    };
  }

  handleCopy = (e) => { // eslint-disable-line
    e.preventDefault();
    this.textInput.select();
    document.execCommand('copy');
    this.setState({ tooltip: 'Copied!' });
  };

  handleDone = (e) => { // eslint-disable-line
    this.setState({ tooltip: defaultTooltip });
  };
  
  render() {
    const { roomName } = this.props;
    const caption = `${process.env.REACT_APP_DOMAIN}/${roomName}`;
    const link = `${window.location.protocol}//${caption}`;

    return (
      <div className="Share">
        <h1>Poker4<strong>Fun</strong></h1>
        <input type="text" value={link} ref={(input) => { this.textInput = input; }} readOnly />
        <a
          href={link}
          onClick={this.handleCopy}
          onMouseLeave={this.handleDone}
          aria-label={this.state.tooltip}>
          {caption}
        </a>
      </div>
    );
  }
}

export default Share;
