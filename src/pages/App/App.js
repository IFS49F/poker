import React, { Component } from 'react';
import Actions from 'components/Actions/Actions';
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
        score: null,
        voted: false
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

  handleVote = (e) => {
    const score = e.target.value
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score, voted: true })
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
        <Actions
          show={this.state.show}
          onVote={this.handleVote}
          onToggleShow={this.handleToggleShow} />
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
