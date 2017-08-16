import React, { Component } from 'react';
import Card from 'components/Card/Card';
import './Votes.css';

const collator = (() => {
  if (Intl && 'Collator' in Intl) {
    return new Intl.Collator();
  } else {
    return {
      compare: (a, b) => a.localeCompare(b)
    };
  }
})();

class Votes extends Component { 
  render() {
    const { me, myScore, team, show } = this.props;
    const listItems = team
      .slice() // shallow copy to avoid mutating the state directly
      .sort((a, b) => collator.compare(a.name, b.name))
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
                  score={myScore}
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
