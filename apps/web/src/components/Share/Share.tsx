import { Component, type MouseEvent } from "react";
import "./Share.css";

const defaultTooltip = "Click to copy link";

type ShareProps = {
  roomName: string;
};

type ShareState = {
  tooltip: string;
};

class Share extends Component<ShareProps, ShareState> {
  private textInput: HTMLInputElement | null = null;

  constructor(props: ShareProps) {
    super(props);
    this.state = {
      tooltip: defaultTooltip,
    };
  }

  handleCopy = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.textInput?.select();
    document.execCommand("copy");
    this.setState({ tooltip: "Copied!" });
  };

  handleDone = () => {
    this.setState({ tooltip: defaultTooltip });
  };

  override render() {
    const { roomName } = this.props;
    const link = new URL(`/${roomName}`, window.location.origin).toString();
    const caption = link.replace(/^https?:\/\//, "");

    return (
      <div className="Share">
        <h1>
          Poker4<strong>Fun</strong>
        </h1>
        <input
          type="text"
          value={link}
          ref={(input) => {
            this.textInput = input;
          }}
          readOnly
        />
        <a
          href={link}
          onClick={this.handleCopy}
          onMouseLeave={this.handleDone}
          aria-label={this.state.tooltip}
        >
          {caption}
        </a>
      </div>
    );
  }
}

export default Share;
