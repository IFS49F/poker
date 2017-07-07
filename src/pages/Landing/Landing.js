import React, { Component } from 'react';
import './Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null
    };
  }

  handleChange = (e) => {
    this.setState({
      url: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(this.state.url);
  };

  render() {
    return (
      <div className="Landing">
        <form className="Form" onSubmit={this.handleSubmit}>
          <h1>Scrum<strong>Poker</strong></h1>
          <p>
            <label>cdifs-49f.poker /</label>
            <input type="text" required onChange={this.handleChange} />
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
