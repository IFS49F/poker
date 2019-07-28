import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Share from 'components/Share/Share';
import Notification from 'components/Notification/Notification';
import SiteNotification from 'components/SiteNotification/SiteNotification';
import Join from 'components/Join/Join';
import Actions from 'components/Actions/Actions';
import Votes from 'components/Votes/Votes';
import Summary from 'components/Summary/Summary';
import './Room.css';
import io from 'socket.io-client';
import PlayerStatePinger from 'lib/player-state-pinger';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={500}
    classNames="fade">
    {children}
  </CSSTransition>
);

const SlideOut = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={200}
    classNames="slideOut">
    {children}
  </CSSTransition>
);

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: null,
      myScore: null,
      highlightScore: null,
      team: [],
      playerAction: {},
      show: false,
      disconnected: false,
      reconnCountdown: 0
    };
    // put this line in `constructor` instead of `componentDidMount`
    // to avoid `undefined` room link in first render.
    this.room = this.props.match.params.room;
    this.playing = false;
    this.playerStatePinger = new PlayerStatePinger({ setState: this.setState.bind(this) });
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);

    this.socket.on('stateUpdate', (response, isClearAction) => {
      const me = response.team.find(client => client.id === this.socket.id);
      const team = response.team.filter(client => client.id !== this.socket.id);
      const { show, action } = response;

      this.setState(prevState => ({
        me,
        myScore: isClearAction ? null : prevState.myScore,
        team,
        show
      }));

      if (action) this.handleAction(action);
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
    this.playerStatePinger.clearTimeouts();
  }

  handleAction({ type, playerId }) {
    switch (type) {
      case 'vote':
        this.playerStatePinger.pingPlayerState(playerId, 'voting', true, 1000);
        break;
      case 'show':
        this.playerStatePinger.pingPlayerState(playerId, 'speaking', { color: 'green', content: 'Show!' }, 4000);
        break;
      case 'clear':
        this.playerStatePinger.pingPlayerState(playerId, 'speaking', { color: 'red', content: 'Clear!' }, 4000);
        break;
      default:
    }
  }

  handleReconn = (e) => { // eslint-disable-line
    e.preventDefault();
    this.socket.open();
  };

  handlePlayerJoin = (name) => { // eslint-disable-line
    const suit = '♤♧♡♢'[Math.floor(Math.random() * 4)];
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
      highlightScore: null,
      team: prevState.team.map(player => (
        Object.assign({}, player, { score: null, voted: false })
      )),
      show: false
    }));
    this.socket.emit('clear');
  };

  handleHighlightScore = (highlightScore) => { // eslint-disable-line
    this.setState({
      highlightScore
    });
  };

  render() {
    const { me, myScore, highlightScore, team, playerAction, show, disconnected, reconnCountdown } = this.state;
    const playerName = localStorage.getItem('playerName') || '';

    return (
      <div className="Room">
        <Helmet>
          <title>{this.room}</title>
        </Helmet>
        <Share
          roomName={this.room} />
        <SiteNotification />  
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
          highlightScore={highlightScore}
          team={team}
          playerAction={playerAction}
          show={show} />
        <TransitionGroup component={null}>
          {show && (
            <Fade>
              <Summary
                me={me}
                team={team}
                onChangeHighlight={this.handleHighlightScore} />
            </Fade>
          )}
          {disconnected && (
            <SlideOut>
              <Notification
                reconnCountdown={reconnCountdown}
                onReconn={this.handleReconn} />
            </SlideOut>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

export default Room;
