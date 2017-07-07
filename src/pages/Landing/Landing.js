import React, { Component } from 'react';
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      roomName: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(this.state.roomName);
  };

  render() {
    return (
      <div className="Landing">
        <form className="Form" onSubmit={this.handleSubmit}>
          <h1>Scrum<strong>Poker</strong></h1>
          <p>
            <label>cdifs-49f.poker /</label>
            <input
              type="text"
              value={this.state.roomName}
              onChange={this.handleChange}
              required
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
