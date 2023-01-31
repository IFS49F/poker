import { Join } from '@poker4-fun/components';
import { usePersistentState } from '@poker4-fun/hooks';
import { pickRandomCardSuit } from '@poker4-fun/types';
import { useState } from 'react';
import useRemoteGameState from '../../hooks/use-remote-game-state/use-remote-game-state';
import Actions from '../actions/actions';
import PlayerList from '../player-list/player-list';

export type GameProps = {
  roomName: string;
};

export const Game = ({ roomName }: GameProps) => {
  const [playerName, setPlayerName] = usePersistentState('playerName', '');
  const [isPlaying, setIsPlaying] = useState(false);
  const { socket } = useRemoteGameState();

  return (
    <>
      {isPlaying ? (
        <Actions />
      ) : (
        <Join
          defaultPlayerName={playerName}
          onJoin={(name) => {
            socket
              ?.emit('join', roomName)
              .emit('play', { name, suit: pickRandomCardSuit() });
            setPlayerName(name);
            setIsPlaying(true);
          }}
        />
      )}
      <PlayerList currentPlayerId={socket?.id} />
    </>
  );
};

export default Game;
