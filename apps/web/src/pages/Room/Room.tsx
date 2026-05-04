import { cloneElement, Component, createRef, type MouseEvent, type ReactElement } from "react";
import { useParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import type { CSSTransitionProps } from "react-transition-group/CSSTransition";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import Actions from "components/Actions/Actions";
import DonationBanner from "components/DonationBanner/DonationBanner";
import Join from "components/Join/Join";
import Notification from "components/Notification/Notification";
import Share from "components/Share/Share";
import Summary from "components/Summary/Summary";
import Votes from "components/Votes/Votes";
import PlayerStatePinger from "lib/player-state-pinger";
import type {
  Action,
  ClientToServerEvents,
  Player,
  PlayerActions,
  ServerToClientEvents,
} from "lib/types";
import "./Room.css";

type TransitionProps = {
  children: ReactElement;
} & Omit<CSSTransitionProps<HTMLElement>, "children" | "classNames" | "nodeRef" | "timeout">;

class Fade extends Component<TransitionProps> {
  private nodeRef = createRef<HTMLElement>();

  override render() {
    const { children, ...transitionProps } = this.props;

    return (
      <CSSTransition {...transitionProps} nodeRef={this.nodeRef} timeout={500} classNames="fade">
        {cloneElement(children as any, { ref: this.nodeRef })}
      </CSSTransition>
    );
  }
}

class SlideOut extends Component<TransitionProps> {
  private nodeRef = createRef<HTMLElement>();

  override render() {
    const { children, ...transitionProps } = this.props;

    return (
      <CSSTransition
        {...transitionProps}
        nodeRef={this.nodeRef}
        timeout={200}
        classNames="slideOut"
      >
        {cloneElement(children as any, { ref: this.nodeRef })}
      </CSSTransition>
    );
  }
}

type RoomProps = {
  room: string;
};

type RoomState = {
  me: Player | null;
  myScore: string | null;
  highlightScore: string | null;
  team: Player[];
  playerAction: PlayerActions;
  show: boolean;
  disconnected: boolean;
  reconnCountdown: number;
};

type PokerSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

class RoomView extends Component<RoomProps, RoomState> {
  private readonly room: string;
  private playing = false;
  private playerStatePinger: PlayerStatePinger;
  private socket: PokerSocket | null = null;

  constructor(props: RoomProps) {
    super(props);
    this.state = {
      me: null,
      myScore: null,
      highlightScore: null,
      team: [],
      playerAction: {},
      show: false,
      disconnected: false,
      reconnCountdown: 0,
    };
    // put this line in `constructor` instead of `componentDidMount`
    // to avoid `undefined` room link in first render.
    this.room = this.props.room;
    this.playerStatePinger = new PlayerStatePinger({ setState: this.setState.bind(this) });
  }

  override componentDidMount() {
    document.title = `${this.room} ♠︎ Poker4Fun`;

    const serverBaseUrl = process.env.BUN_PUBLIC_SERVER_BASE_URL;

    if (!serverBaseUrl) {
      throw new Error("BUN_PUBLIC_SERVER_BASE_URL is required");
    }

    this.socket = io(serverBaseUrl);

    this.socket.on("stateUpdate", (response, isClearAction) => {
      const socketId = this.socket?.id;
      const me = response.team.find((client) => client.id === socketId) ?? null;
      const team = response.team.filter((client) => client.id !== socketId);
      const { show, action } = response;

      this.setState((prevState) => ({
        me,
        myScore: isClearAction ? null : prevState.myScore,
        team,
        show,
      }));

      if (action) this.handleAction(action);
    });

    const socket = this.socket;

    socket.on("connect_error", () => {
      this.setState({
        me: null,
        disconnected: true,
        reconnCountdown: Math.floor(socket.io.reconnectionDelayMax() / 1000),
      });
    });

    socket.on("connect", () => {
      this.setState({
        disconnected: false,
      });
    });

    socket.io.on("reconnect", () => {
      socket.emit("join", this.room);
      const playerName = localStorage.getItem("playerName");
      if (this.playing && playerName) {
        this.handlePlayerJoin(playerName);
      }
    });

    socket.emit("join", this.room);
  }

  override componentWillUnmount() {
    this.socket?.disconnect();
    this.playerStatePinger.clearTimeouts();
  }

  handleAction({ type, playerId }: Action) {
    switch (type) {
      case "vote":
        this.playerStatePinger.pingPlayerState(playerId, "voting", true, 1000);
        break;
      case "show":
        this.playerStatePinger.pingPlayerState(
          playerId,
          "speaking",
          { color: "green", content: "Show!" },
          4000,
        );
        break;
      case "clear":
        this.playerStatePinger.pingPlayerState(
          playerId,
          "speaking",
          { color: "red", content: "Clear!" },
          4000,
        );
        break;
      default:
    }
  }

  handleReconn = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.socket?.open();
  };

  handlePlayerJoin = (name: string) => {
    const socket = this.socket;
    const socketId = socket?.id;

    if (!socket || !socketId) {
      return;
    }

    const suits = ["♤", "♧", "♡", "♢"] as const;
    const suit = suits[Math.floor(Math.random() * suits.length)] ?? "♤";
    this.playing = true;
    this.setState({
      me: {
        id: socketId,
        name,
        suit,
        score: null,
        voted: false,
      },
    });
    localStorage.setItem("playerName", name);
    socket.emit("play", { name, suit });
  };

  handleVote = (e: MouseEvent<HTMLButtonElement>) => {
    const score = e.currentTarget.value;
    this.setState((prevState) => ({
      me: prevState.me ? { ...prevState.me, score, voted: true } : null,
      myScore: score,
    }));
    this.socket?.emit("vote", score);
  };

  handleShow = () => {
    // eslint-disable-line
    this.socket?.emit("show");
  };

  handleClear = () => {
    // eslint-disable-line
    this.setState((prevState) => ({
      me: prevState.me ? { ...prevState.me, score: null, voted: false } : null,
      myScore: null,
      highlightScore: null,
      team: prevState.team.map((player) =>
        Object.assign({}, player, { score: null, voted: false }),
      ),
      show: false,
    }));
    this.socket?.emit("clear");
  };

  handleHighlightScore = (highlightScore: string | null) => {
    this.setState({
      highlightScore,
    });
  };

  override render() {
    const { me, myScore, highlightScore, team, playerAction, show, disconnected, reconnCountdown } =
      this.state;
    const playerName = localStorage.getItem("playerName") || "";

    return (
      <div className="Room">
        <Share roomName={this.room} />
        <DonationBanner />
        {me ? (
          <Actions
            show={show}
            myScore={myScore}
            onVote={this.handleVote}
            onShow={this.handleShow}
            onClear={this.handleClear}
          />
        ) : (
          <Join playerName={playerName} onSubmit={this.handlePlayerJoin} />
        )}
        <Votes
          me={me}
          myScore={myScore}
          highlightScore={highlightScore}
          team={team}
          playerAction={playerAction}
          show={show}
        />
        <TransitionGroup component={null}>
          {show && (
            <Fade key="summary">
              <Summary me={me} team={team} onChangeHighlight={this.handleHighlightScore} />
            </Fade>
          )}
          {disconnected && (
            <SlideOut key="notification">
              <Notification reconnCountdown={reconnCountdown} onReconn={this.handleReconn} />
            </SlideOut>
          )}
        </TransitionGroup>
      </div>
    );
  }
}

const Room = () => {
  const { room } = useParams();

  return <RoomView room={room ?? ""} />;
};

export default Room;
