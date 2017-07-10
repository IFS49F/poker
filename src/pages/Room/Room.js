import React, { Component } from 'react';
import Join from 'components/Join/Join';
import Actions from 'components/Actions/Actions';
import Votes from 'components/Votes/Votes';
import Summary from 'components/Summary/Summary';
import './Room.css';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

class Room extends Component {
  constructor(props) {
    super(props);
    this.socket = this.initSocketConnection();
    this.room = this.props.match.params.room;
    this.socket.emit('join', this.room);
    this.state = {
      me: null,
      team: [],
      show: false
    };
  }
  
  initSocketConnection = () => {
    const socket = io(`https://afternoon-gorge-59515.herokuapp.com/`);

    socket.on('connect', () => {
      this.socketId = socket.id;
    });
    socket.on('stateUpdate', (response) => {
      const me = response.team.find(client => client.id === this.socketId);
      const team = response.team.filter(client => client.id !== this.socketId);
      const show = response.show;

      this.setState({
        me,
        team,
        show
      });
    });

    return socket;
  };

  handlePlayerJoin = (name) => {
    Cookies.set('playerName', name);
    this.setState({
      me: {
        id: this.socketId,
        name,
        score: null,
        voted: false
      }
    });
    this.socket.emit('play', name);
  };

  handleVote = (e) => {
    const score = e.target.value;
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score, voted: true })
    }));
    this.socket.emit('vote', score);
  };

  handleShow = () => {
    this.setState(prevState => ({
      show: true
    }));
    this.socket.emit('show', true);
  };

  handleClear= () => {
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score: null, voted: false }),
      team: prevState.team.map(player => (
        Object.assign({}, player, { score: null, voted: false })
      )),
      show: false
    }));
    this.socket.emit('clear');
  };

  render() {
    const { me, team, show } = this.state;
    return (
      <div className="Room">
        {me ? (
          <Actions
            show={show}
            score={me.score}
            onVote={this.handleVote}
            onShow={this.handleShow}
            onClear={this.handleClear}/>
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

export default Room;
