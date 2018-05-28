import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Card from 'components/Card/Card';
import './Votes.css';
import SpeechBallon from '../SpeechBallon/SpeechBallon';

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

const Bounce = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={1000}
    classNames="bounce">
    {children}
  </CSSTransition>
);

const PopIn = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    classNames="popin"
    timeout={300}>
    {children}
  </CSSTransition>
);

const Votes = ({ me, myScore, highlightScore, team, playerAction, show }) => {
  const listItems = team
    .slice() // shallow copy to avoid mutating the state directly
    .sort((a, b) => collator.compare(a.name, b.name))
    .map((member) =>
      <Fade key={member.id}>
        <li>
          <dd>
            <Bounce in={playerAction[member.id] && playerAction[member.id].voting}>
              <Card
                highlight={member.score === highlightScore && highlightScore !== null}
                score={member.score}
                show={show}
                suit={member.suit}
                voted={member.voted} />
            </Bounce>
            <TransitionGroup component={null}>
              {playerAction[member.id] && playerAction[member.id].speaking && (
                <PopIn>
                  <SpeechBallon
                    color={playerAction[member.id].speaking.color}>
                    {playerAction[member.id].speaking.content}
                  </SpeechBallon>
                </PopIn>
              )}
            </TransitionGroup>
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
                <Bounce in={playerAction[me.id] && playerAction[me.id].voting}>
                  <Card
                    highlight={myScore === highlightScore && highlightScore !== null}
                    score={myScore}
                    show={show}
                    suit={me.suit}
                    voted={me.voted} />
                </Bounce>
                <TransitionGroup component={null}>
                  {playerAction[me.id] && playerAction[me.id].speaking && (
                    <PopIn>
                      <SpeechBallon
                        color={playerAction[me.id].speaking.color}>
                        {playerAction[me.id].speaking.content}
                      </SpeechBallon>
                    </PopIn>
                  )}
                </TransitionGroup>
              </dd>
              <dt>{me.name}</dt>
            </li>
          </Fade>
        )}
        {listItems}
      </TransitionGroup>
    </div>
  );
};

export default Votes;
