import React, { Component } from 'react';
import Votes from 'components/Votes/Votes';
import Summary from 'components/Summary/Summary';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {
        id: '1',
        name: 'James',
        score: 8,
        voted: true
      },
      team: [{
        id: '2',
        name: 'Hiveer',
        score: 8,
        voted: true
      }, {
        id: '3',
        name: 'Langping',
        score: 13,
        voted: true
      }, {
        id: '4',
        name: 'Zoro',
        score: '🤔',
        voted: true
      }, {
        id: '5',
        name: 'Elvis',
        score: null,
        voted: false
      }],
      show: false
    };
  }

  handleChangeScore = (e) => {
    const score = e.target.value
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score })
    }));
  };

  handleToggleVoted = () => {
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { voted: !prevState.me.voted })
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
        <select
          value={this.state.me.score}
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
        <Votes
          me={this.state.me}
          team={this.state.team}
          show={this.state.show} />
        <Summary
            me={this.state.me}
            team={this.state.team}
            show={this.state.show} />
      </div>
    );
  }
}

export default App;
