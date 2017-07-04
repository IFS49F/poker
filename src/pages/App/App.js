import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      url: e.target.value
    });
  }

  handleSubmit() {
    this.props.router.push(this.state.url);
  }

  render() {
    return (
      <div className='App'>
        <form className='Form' onSubmit={this.handleSubmit}>
          <section>
            <label>cdifs-49f.poker /</label>
            <input type='text' required onChange={this.handleChange} />
          </section>
          <button type="submit">Start or Join a session</button>
        </form>
      </div>
    );
  }
}

export default App;
