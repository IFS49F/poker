import { Component, type ChangeEvent, type FormEvent } from "react";
import "./Join.css";

type JoinProps = {
  playerName: string;
  onSubmit: (name: string) => void;
};

type JoinState = {
  myName: string;
};

class Join extends Component<JoinProps, JoinState> {
  constructor(props: JoinProps) {
    super(props);
    this.state = {
      myName: this.props.playerName,
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      myName: e.target.value,
    });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.myName);
  };

  override render() {
    return (
      <div className="Join">
        <form onSubmit={this.handleSubmit}>
          Observe or
          <input
            type="text"
            name="myName"
            value={this.state.myName}
            onChange={this.handleChange}
            placeholder="type in your name"
            required
            autoFocus
          />
          to
          <button type="submit">Play</button>
        </form>
      </div>
    );
  }
}

export default Join;
