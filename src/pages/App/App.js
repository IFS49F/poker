import React, { Component } from 'react';
import Join from 'components/Join/Join';
import Actions from 'components/Actions/Actions';
import Votes from 'components/Votes/Votes';
import Summary from 'components/Summary/Summary';
import './App.css';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: null,
      team: [{
        id: 1,
        name: 'James',
        score: null,
        voted: false
      }, {
        id: 2,
        name: 'Hiveer',
        score: 8,
        voted: true
      }, {
        id: 3,
        name: 'Langping',
        score: 13,
        voted: true
      }, {
        id: 4,
        name: 'Zoro',
        score: '🤔',
        voted: true
      }, {
        id: 5,
        name: 'Elvis',
        score: null,
        voted: false
      }],
      show: false
    };
  }

  handlePlayerJoin = (e) => {
    e.preventDefault();
    const { team } = this.state;
    const formData = new FormData(e.target);
    const name = formData.get('myName');
    const id = team[team.length - 1].id + 1;

    Cookies.set('playerName', name);

    this.setState({
      me: {
        id,
        name,
        score: null,
        voted: false
      }
    });
  };

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
    const { me, team, show } = this.state;
    return (
      <div className="App">
        {me ? (
          <Actions
            show={show}
            onVote={this.handleVote}
            onToggleShow={this.handleToggleShow} />
        ) : (
          <Join
            playerName={Cookies.get('playerName')}
            onSubmit={this.handlePlayerJoin} />
        )}
        <Votes
          me={me}
          team={team}
          show={show} />
        <Summary
            me={me}
            team={team}
            show={show} />
      </div>
    );
  }
}

export default App;
