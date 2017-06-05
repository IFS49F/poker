import React, { Component } from 'react';
import Card from 'components/Card/Card';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 8,
      voted: false,
      show: false
    };
  }

  handleChangeScore = (e) => {
    let score = e.target.value
    this.setState(prevState => ({
      score
    }));
  };

  handleToggleVoted = () => {
    this.setState(prevState => ({
      voted: !prevState.voted
    }));
  };

  handleToggleShow = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  };

  render() {
    return (
      <div className="App">
        <Card
          score={this.state.score}
          voted={this.state.voted}
          show={this.state.show} />
        <br />
        <select
          value={this.state.score}
          onChange={this.handleChangeScore}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>5</option>
          <option>8</option>
          <option>13</option>
          <option>20</option>
          <option>40</option>
          <option>100</option>
          <option>?</option>
        </select>
        <br />
        <button
          onClick={this.handleToggleVoted}>
          Toggle Voted</button>
        <br />
        <button
          onClick={this.handleToggleShow}>
          Show / Hide</button>
      </div>
    );
  }
}

export default App;
