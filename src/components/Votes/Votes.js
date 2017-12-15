import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Card from 'components/Card/Card';
import './Votes.css';

const collator = Intl && ('Collator' in Intl)
  ? new Intl.Collator()
  : { compare: (a, b) => a.localeCompare(b) };

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={500}
    classNames="fade">
    {children}
  </CSSTransition>
);

class Votes extends Component { 
  render() {
    const { me, myScore, highlightScore, team, show } = this.props;
    const listItems = team
      .slice() // shallow copy to avoid mutating the state directly
      .sort((a, b) => collator.compare(a.name, b.name))
      .map((member) =>
        <Fade key={member.id}>
          <li>
            <dd>
              <Card
                highlight={member.score === highlightScore && highlightScore !== null}
                score={member.score}
                show={show}
                suit={member.suit}
                voted={member.voted} />
            </dd>
            <dt>{member.name}</dt>
          </li>
        </Fade>
      );
    return (
      <div className="Votes">
        <TransitionGroup component="ul">
          {me && (
            <Fade key={me.id}>
              <li>
                <dd>
                  <Card
                    highlight={myScore === highlightScore && highlightScore !== null}
                    score={myScore}
                    show={show}
                    suit={me.suit}
                    voted={me.voted} />
                </dd>
                <dt>{me.name}</dt>
              </li>
            </Fade>
          )}
          {listItems}
        </TransitionGroup>
      </div>
    );
  }
}

export default Votes;
