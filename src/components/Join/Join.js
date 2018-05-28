import React, { Component } from 'react';
import './Join.css';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: this.props.playerName
    };
  }

  handleChange = (e) => { // eslint-disable-line
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => { // eslint-disable-line
    e.preventDefault();
    // The player name could be started with whitespaces, but it's invalid
    // if there are only whitespaces.
    if (!this.state.myName.trim()) {
      this.setState({
        myName: ''
      });
      return;
    }
    this.props.onSubmit(this.state.myName);
  };

  render() {
    return (
      <div className="Join">
        <form onSubmit={this.handleSubmit}>
          Observe or
          <input
            type="text"
            name="myName"
            value={this.state.myName}
            onChange={this.handleChange}
            placeholder="type in your name"
            required
            autoFocus />
          to
          <button type="submit">Play</button>
        </form>
      </div>
    );
  }
}

export default Join;
