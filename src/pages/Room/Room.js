import React, { Component } from 'react';
import Join from 'components/Join/Join';
import Actions from 'components/Actions/Actions';
import Votes from 'components/Votes/Votes';
import Summary from 'components/Summary/Summary';
import './Room.css';
import io from 'socket.io-client';

class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = this.initSocketConnection();
    this.room = this.props.match.params.room;
    this.socket.emit('join', this.room);
    this.state = {
      me: null,
      myScore: null,
      team: [],
      show: false
    };
  }
  
  initSocketConnection = () => {
    const socket = io(`https://afternoon-gorge-59515.herokuapp.com/`);

    socket.on('connect', () => {
      this.socketId = socket.id;
    });
    socket.on('stateUpdate', (response, isClearAction) => {
      const me = response.team.find(client => client.id === this.socketId);
      const team = response.team.filter(client => client.id !== this.socketId);
      const show = response.show;

      this.setState(prevState => ({
        me,
        myScore: isClearAction ? null : prevState.myScore,
        team,
        show
      }));
    });

    return socket;
  };

  handlePlayerJoin = (name) => {
    this.setState({
      me: {
        id: this.socketId,
        name,
        score: null,
        voted: false
      }
    });
    localStorage.setItem('playerName', name);
    this.socket.emit('play', name);
  };

  handleVote = (e) => {
    const score = e.target.value;
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score, voted: true }),
      myScore: score
    }));
    this.socket.emit('vote', score);
  };

  handleShow = () => {
    this.socket.emit('show');
  };

  handleClear = () => {
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score: null, voted: false }),
      myScore: null,
      team: prevState.team.map(player => (
        Object.assign({}, player, { score: null, voted: false })
      )),
      show: false
    }));
    this.socket.emit('clear');
  };

  render() {
    const { me, myScore, team, show } = this.state;
    const playerName = localStorage.getItem('playerName') || '';
    return (
      <div className="Room">
        {me ? (
          <Actions
            show={show}
            myScore={myScore}
            onVote={this.handleVote}
            onShow={this.handleShow}
            onClear={this.handleClear}/>
        ) : (
          <Join
            playerName={playerName}
            onSubmit={this.handlePlayerJoin} />
        )}
        <Votes
          me={me}
          myScore={myScore}
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

export default Room;
