import { cloneElement, useRef, type ReactElement } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "components/Card/Card";
import type { Player, PlayerActions } from "lib/types";
import "./Votes.css";
import SpeechBallon from "../SpeechBallon/SpeechBallon";

const collator =
  Intl && "Collator" in Intl
    ? new Intl.Collator()
    : { compare: (a: string, b: string) => a.localeCompare(b) };

const LooseTransitionGroup = TransitionGroup as React.ComponentType<{
  component?: React.ElementType | null;
  children?: React.ReactNode;
}>;

type TransitionProps = {
  children: ReactElement;
  in?: boolean;
};

const Fade = ({ children, ...props }: TransitionProps) => {
  const nodeRef = useRef<HTMLElement>(null);

  return (
    <CSSTransition {...props} nodeRef={nodeRef} timeout={500} classNames="fade">
      {cloneElement(children as any, { ref: nodeRef })}
    </CSSTransition>
  );
};

const Bounce = ({ children, ...props }: TransitionProps) => {
  const nodeRef = useRef<HTMLElement>(null);

  return (
    <CSSTransition {...props} nodeRef={nodeRef} timeout={1000} classNames="bounce">
      {cloneElement(children as any, { ref: nodeRef })}
    </CSSTransition>
  );
};

const PopIn = ({ children, ...props }: TransitionProps) => {
  const nodeRef = useRef<HTMLElement>(null);

  return (
    <CSSTransition {...props} nodeRef={nodeRef} classNames="popin" timeout={300}>
      {cloneElement(children as any, { ref: nodeRef })}
    </CSSTransition>
  );
};

type VotesProps = {
  me: Player | null;
  myScore: string | null;
  highlightScore: string | null;
  team: Player[];
  playerAction: PlayerActions;
  show: boolean;
};

const Votes = ({ me, myScore, highlightScore, team, playerAction, show }: VotesProps) => {
  const listItems = team
    .slice() // shallow copy to avoid mutating the state directly
    .sort((a, b) => collator.compare(a.name, b.name))
    .map((member) => {
      const action = playerAction[member.id];

      return (
        <Fade key={member.id}>
          <li>
            <dd>
              <Bounce in={action?.voting}>
                <Card
                  highlight={member.score === highlightScore && highlightScore !== null}
                  score={member.score}
                  show={show}
                  suit={member.suit}
                  voted={member.voted}
                />
              </Bounce>
              <TransitionGroup component={null}>
                {action?.speaking && (
                  <PopIn>
                    <SpeechBallon color={action.speaking.color}>
                      {action.speaking.content}
                    </SpeechBallon>
                  </PopIn>
                )}
              </TransitionGroup>
            </dd>
            <dt>{member.name}</dt>
          </li>
        </Fade>
      );
    });

  const meAction = me ? playerAction[me.id] : undefined;

  return (
    <div className="Votes">
      <LooseTransitionGroup component="ul">
        {me && (
          <Fade key={me.id}>
            <li>
              <dd>
                <Bounce in={meAction?.voting}>
                  <Card
                    highlight={myScore === highlightScore && highlightScore !== null}
                    score={myScore}
                    show={show}
                    suit={me.suit}
                    voted={me.voted}
                  />
                </Bounce>
                <TransitionGroup component={null}>
                  {meAction?.speaking && (
                    <PopIn>
                      <SpeechBallon color={meAction.speaking.color}>
                        {meAction.speaking.content}
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
      </LooseTransitionGroup>
    </div>
  );
};

export default Votes;
