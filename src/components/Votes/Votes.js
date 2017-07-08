import React, { Component } from 'react';
import Card from 'components/Card/Card';
import './Votes.css';

class Votes extends Component {
  render() {
    const { me, team, show } = this.props;
    const listItems = team
      .slice() // shallow copy to prevent sort from mutating the state directly
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .map((member) =>
        <li key={member.id}>
          <dd>
            <Card
              score={member.score}
              voted={member.voted}
              show={show} />
          </dd>
          <dt>{member.name}</dt>
        </li>
      );
    return (
      <div className="Votes">
        <ul>
          {me && (
            <li key={me.id}>
              <dd>
                <Card
                  score={me.score}
                  voted={me.voted}
                  show={show} />
              </dd>
              <dt>{me.name}</dt>
            </li>
          )}
          {listItems}
        </ul>
      </div>
    );
  }
}

export default Votes;
