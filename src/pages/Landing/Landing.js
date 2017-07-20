import React, { Component } from 'react';
import { hri } from 'human-readable-ids';
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      randomRoomName: hri.random()
    };
  }

  handleChange = (e) => {
    this.setState({
      roomName: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const roomName = this.state.roomName || this.state.randomRoomName;
    this.props.history.push(roomName);
  };

  render() {
    return (
      <div className="Landing">
        <form className="Form" onSubmit={this.handleSubmit}>
          <h1>Scrum<strong>Poker</strong></h1>
          <p>
            <label>{process.env.REACT_APP_DOMAIN} /</label>
            <input
              type="text"
              value={this.state.roomName}
              placeholder={this.state.randomRoomName}
              onChange={this.handleChange}
              autoFocus />
          </p>
          <p>
            <button type="submit">Start or Join a session</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Landing;
