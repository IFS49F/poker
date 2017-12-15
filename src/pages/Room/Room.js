import React, { Component } from 'react';
import Share from 'components/Share/Share';
import Notification from 'components/Notification/Notification';
import Join from 'components/Join/Join';
import Actions from 'components/Actions/Actions';
import Votes from 'components/Votes/Votes';
import Summary from 'components/Summary/Summary';
import './Room.css';
import io from 'socket.io-client';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: null,
      myScore: null,
      team: [],
      show: false,
      disconnected: false,
      reconnCountdown: 0
    };
    // put this line in `constructor` instead of `componentDidMount`
    // to avoid `undefined` room link in first render.
    this.room = this.props.match.params.room;
    this.playing = false;
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);

    this.socket.on('stateUpdate', (response, isClearAction) => {
      const me = response.team.find(client => client.id === this.socket.id);
      const team = response.team.filter(client => client.id !== this.socket.id);
      const show = response.show;

      this.setState(prevState => ({
        me,
        myScore: isClearAction ? null : prevState.myScore,
        team,
        show
      }));
    });

    this.socket.on('connect_error', (reason) => {
      this.setState({
        me: null,
        disconnected: true,
        reconnCountdown: Math.floor(this.socket.io.reconnectionDelayMax() / 1000)
      });
    });

    this.socket.on('connect', () => {
      this.setState({
        disconnected: false
      });
    });

    this.socket.on('reconnect', () => {
      this.socket.emit('join', this.room);
      const playerName = localStorage.getItem('playerName');
      if (this.playing && playerName) {
        this.handlePlayerJoin(playerName);
      }
    });

    this.socket.emit('join', this.room);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleReconn = (e) => { // eslint-disable-line
    e.preventDefault();
    this.socket.open();
  };

  handlePlayerJoin = (name) => { // eslint-disable-line
    const suit = "♤♧♡♢"[Math.floor(Math.random() * 4)];
    this.playing = true;
    this.setState({
      me: {
        id: this.socket.id,
        name,
        suit,
        score: null,
        voted: false
      }
    });
    localStorage.setItem('playerName', name);
    this.socket.emit('play', { name, suit });
  };

  handleVote = (e) => { // eslint-disable-line
    const score = e.target.value;
    this.setState(prevState => ({
      me: Object.assign({}, prevState.me, { score, voted: true }),
      myScore: score
    }));
    this.socket.emit('vote', score);
  };

  handleShow = () => { // eslint-disable-line
    this.socket.emit('show');
  };

  handleClear = () => { // eslint-disable-line
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
    const { me, myScore, team, show, disconnected, reconnCountdown } = this.state;
    const playerName = localStorage.getItem('playerName') || '';
    return (
      <div className="Room">
        <Share
          roomName={this.room} />
        <Notification
          active={disconnected}
          reconnCountdown={reconnCountdown}
          onReconn={this.handleReconn} />
        {me ? (
          <Actions
            show={show}
            myScore={myScore}
            onVote={this.handleVote}
            onShow={this.handleShow}
            onClear={this.handleClear} />
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
