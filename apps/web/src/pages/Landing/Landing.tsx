import { Component, type ChangeEvent, type FormEvent } from "react";
import { hri } from "human-readable-ids";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import bgImg from "./bram-naus-200967.jpg";

type LandingProps = {
  navigate: (to: string) => void;
};

type LandingState = {
  roomName: string;
  randomRoomName: string;
};

class LandingView extends Component<LandingProps, LandingState> {
  constructor(props: LandingProps) {
    super(props);
    this.state = {
      roomName: "",
      randomRoomName: hri.random(),
    };
  }

  override componentDidMount() {
    document.title = "Poker4Fun";
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      roomName: e.target.value,
    });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomName = this.state.roomName || this.state.randomRoomName;
    this.props.navigate(`/${roomName}`);
  };

  override render() {
    const styles = {
      backgroundImage: `url(${bgImg})`,
    };
    const domain = window.location.host;

    return (
      <div className="Landing" style={styles}>
        <form className="Form" onSubmit={this.handleSubmit}>
          <h1>
            Poker4<strong>Fun</strong>
          </h1>
          <p>
            <label>{domain} /</label>
            <input
              type="text"
              value={this.state.roomName}
              placeholder={this.state.randomRoomName}
              onChange={this.handleChange}
              autoFocus
            />
          </p>
          <p>
            <button type="submit">Start or Join a session</button>
          </p>
        </form>
        <div className="unsplash-credit">
          <a
            href="https://unsplash.com/@bramnaus?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
            target="_blank"
            rel="noopener noreferrer"
            title="Download free do whatever you want high-resolution photos from Bram Naus"
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <title></title>
                <path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path>
              </svg>
            </span>
            <span>Bram Naus</span>
          </a>
        </div>
      </div>
    );
  }
}

const Landing = () => {
  const navigate = useNavigate();

  return <LandingView navigate={navigate} />;
};

export default Landing;
