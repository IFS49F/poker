import { useRef, cloneElement } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Card from '@/components/card/Card'
import SpeechBalloon from '@/components/speech-balloon/SpeechBalloon'
import type { Player, PlayerActionMap, Score } from '@/types/poker'
import styles from './Votes.module.css'

interface VotesProps {
  me: Player | null
  myScore: Score
  team: Player[]
  playerAction: PlayerActionMap
  show: boolean
  highlightScore: Score
}

const collator =
  typeof Intl !== 'undefined' && 'Collator' in Intl
    ? new Intl.Collator()
    : { compare: (a: string, b: string) => a.localeCompare(b) }

const Fade = ({ children, ...props }: { children: React.ReactElement; [key: string]: unknown }) => {
  const nodeRef = useRef(null)
  return (
    <CSSTransition {...(props as object)} nodeRef={nodeRef} timeout={500} classNames="fade">
      {cloneElement(children, { ref: nodeRef } as Record<string, unknown>)}
    </CSSTransition>
  )
}

const Bounce = ({
  children,
  ...props
}: {
  children: React.ReactElement
  [key: string]: unknown
}) => {
  const nodeRef = useRef(null)
  return (
    <CSSTransition {...(props as object)} nodeRef={nodeRef} timeout={1000} classNames="bounce">
      {cloneElement(children, { ref: nodeRef } as Record<string, unknown>)}
    </CSSTransition>
  )
}

const PopIn = ({ children, ...props }: { children: React.ReactElement; [key: string]: unknown }) => {
  const nodeRef = useRef(null)
  return (
    <CSSTransition {...(props as object)} nodeRef={nodeRef} timeout={300} classNames="popin">
      {cloneElement(children, { ref: nodeRef } as Record<string, unknown>)}
    </CSSTransition>
  )
}

function PlayerCard({
  ref,
  player,
  score,
  show,
  highlightScore,
  playerAction,
}: {
  ref?: React.Ref<HTMLLIElement>
  player: Player
  score: Score
  show: boolean
  highlightScore: Score
  playerAction: PlayerActionMap
}) {
  const action = playerAction[player.id]
  return (
    <li ref={ref}>
      <dd>
        <Bounce in={Boolean(action?.voting)}>
          <Card
            highlight={score !== null && score === highlightScore}
            score={score}
            show={show}
            suit={player.suit}
            voted={player.voted}
          />
        </Bounce>
        <TransitionGroup component={null}>
          {action?.speaking && (
            <PopIn key="speech">
              <SpeechBalloon color={action.speaking.color}>{action.speaking.content}</SpeechBalloon>
            </PopIn>
          )}
        </TransitionGroup>
      </dd>
      <dt>{player.name}</dt>
    </li>
  )
}

export default function Votes({ me, myScore, team, playerAction, show, highlightScore }: VotesProps) {
  const sorted = team.slice().sort((a, b) => collator.compare(a.name, b.name))

  const items = [
    ...(me
      ? [
          <Fade key={me.id}>
            <PlayerCard
              player={me}
              score={myScore}
              show={show}
              highlightScore={highlightScore}
              playerAction={playerAction}
            />
          </Fade>,
        ]
      : []),
    ...sorted.map((member) => (
      <Fade key={member.id}>
        <PlayerCard
          player={member}
          score={member.score}
          show={show}
          highlightScore={highlightScore}
          playerAction={playerAction}
        />
      </Fade>
    )),
  ]

  return (
    <div className={styles.votes}>
      <TransitionGroup component="ul">{items}</TransitionGroup>
    </div>
  )
}
