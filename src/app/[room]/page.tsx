'use client'

import { use, useState, useRef, cloneElement } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { usePokerRoom } from '@/hooks/usePokerRoom'
import type { Score } from '@/types/poker'
import styles from './page.module.css'

// Components will be filled in during Step 10.
// Imported here so the wiring is complete and types are checked.
import Share from '@/components/share/Share'
import SiteNotification from '@/components/site-notification/SiteNotification'
import Join from '@/components/join/Join'
import Actions from '@/components/actions/Actions'
import Votes from '@/components/votes/Votes'
import Summary from '@/components/summary/Summary'
import Notification from '@/components/notification/Notification'

// Transition wrappers — match old CSSTransition classNames
const Fade = ({ children, ...props }: { children: React.ReactElement; [key: string]: unknown }) => {
  const nodeRef = useRef(null)
  return (
    <CSSTransition {...(props as object)} nodeRef={nodeRef} timeout={500} classNames="fade">
      {cloneElement(children, { ref: nodeRef } as Record<string, unknown>)}
    </CSSTransition>
  )
}

const SlideOut = ({ children, ...props }: { children: React.ReactElement; [key: string]: unknown }) => {
  const nodeRef = useRef(null)
  return (
    <CSSTransition {...(props as object)} nodeRef={nodeRef} timeout={200} classNames="slideOut">
      {cloneElement(children, { ref: nodeRef } as Record<string, unknown>)}
    </CSSTransition>
  )
}

interface RoomPageProps {
  params: Promise<{ room: string }>
}

export default function RoomPage({ params }: RoomPageProps) {
  const { room } = use(params)
  const { state, actions } = usePokerRoom(room)
  const { me, myScore, team, playerAction, show, disconnected, reconnCountdown } = state
  const [highlightScore, setHighlightScore] = useState<Score>(null)

  const handleReconn = (e: React.MouseEvent) => {
    e.preventDefault()
    // socket.open() equivalent — remount by navigating to same page
    window.location.reload()
  }

  return (
    <div className={styles.room}>
      <Share roomName={room} />
      <SiteNotification />
      {me ? (
        <Actions
          show={show}
          myScore={myScore}
          onVote={actions.vote}
          onShow={actions.show}
          onClear={actions.clear}
        />
      ) : (
        <Join onSubmit={actions.play} />
      )}
      <Votes
        me={me}
        myScore={myScore}
        team={team}
        playerAction={playerAction}
        show={show}
        highlightScore={highlightScore}
      />
      <TransitionGroup component={null}>
        {show && (
          <Fade key="summary">
            <Summary me={me} team={team} onChangeHighlight={setHighlightScore} />
          </Fade>
        )}
        {disconnected && (
          <SlideOut key="notification">
            <Notification
              reconnCountdown={reconnCountdown}
              onReconn={handleReconn}
            />
          </SlideOut>
        )}
      </TransitionGroup>
    </div>
  )
}
