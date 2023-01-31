import { CustomServerIo, CustomServerSocket } from '@poker4-fun/types';
import * as redis from './redis';

const defaultState = {
  team: [],
  show: false,
};
const getResultWithoutScores = (result) => {
  if (!result) {
    return defaultState;
  }
  /*
   * For players who just joined or player, if `Show` has been
   * clicked already, they should also see others' scores.
   */
  if (result.show) {
    return result;
  }

  const { team, show } = result;
  return {
    team: team.map((player) => Object.assign({}, player, { score: null })),
    show,
  };
};

const isRoomEmpty = (io: CustomServerIo, currentRoom: string) => {
  // the doc for socket.io sucks, just found the answer on
  // https://stackoverflow.com/a/35527764/2798001
  //
  // io.sockets.adapter.rooms[room].length: All connected clients in specific room
  // Object.keys(io.sockets.connected).length: All connected clients
  //
  // if there are no any connections in specific room, io.sockets.adapter.rooms[room]
  // will be `undefined`.
  return !io.sockets.adapter.rooms[currentRoom];
};

function handlers(socket: CustomServerSocket, io: CustomServerIo) {
  console.log(`Client '${socket.id}' connected`);
  let currentRoom: string | null = null;

  socket.on('join', async (room = '') => {
    currentRoom = room.toLowerCase();
    console.log(`Client '${socket.id}' joined room '${currentRoom}'`);

    await socket.join(currentRoom);

    let result = await redis.get(currentRoom);
    if (!result) {
      console.log(`New room '${currentRoom}' created`);
      result = defaultState;
    }

    redis.set(currentRoom, result);
    io.in(currentRoom).emit('stateUpdate', getResultWithoutScores(result));
  });

  socket.on('play', async (player) => {
    const result = await redis.get(currentRoom);
    if (!result) {
      return;
    }

    if (typeof player !== 'object') player = { name: player };

    console.log(
      `Client '${socket.id}' starts playing in room '${currentRoom}' under the name '${player.name}'`
    );

    result.team.push(
      Object.assign(player, {
        id: socket.id,
        score: null,
        voted: false,
      })
    );

    redis.set(currentRoom, result);
    io.in(currentRoom).emit('stateUpdate', getResultWithoutScores(result));
  });

  socket.on('vote', async (score) => {
    const result = await redis.get(currentRoom);
    if (!result) {
      return;
    }

    console.log(`Client '${socket.id}' of room '${currentRoom}' voted`);
    const votingPlayer = result.team.find(({ id }) => id === socket.id);
    votingPlayer.score = score;
    votingPlayer.voted = true;

    const action = {
      type: 'vote',
      playerId: votingPlayer.id,
    };

    redis.set(currentRoom, result);
    io.in(currentRoom).emit('stateUpdate', {
      ...getResultWithoutScores(result),
      action,
    });
  });

  socket.on('show', async () => {
    const result = await redis.get(currentRoom);
    if (!result) {
      return;
    }

    console.log(
      `Client '${socket.id}' of room '${currentRoom}' showed the result`
    );
    result.show = true;

    const action = {
      type: 'show',
      playerId: socket.id,
    };

    redis.set(currentRoom, result);
    io.in(currentRoom).emit('stateUpdate', { ...result, action });
  });

  socket.on('clear', async () => {
    const result = await redis.get(currentRoom);
    if (!result) {
      return;
    }

    console.log(
      `Client '${socket.id}' of room '${currentRoom}' cleared the result`
    );
    result.team.forEach((item: { score: string; voted: boolean }) => {
      item.score = null;
      item.voted = false;
    });
    result.show = false;

    const action = {
      type: 'clear',
      playerId: socket.id,
    };

    redis.set(currentRoom, result);
    // the boolean is used for clients to indicate it's clear action,
    // then the local state `myScore` could be cleared. - Zoro

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    io.in(currentRoom).emit('stateUpdate', { ...result, action }, true);

    // TODO: This seems to be redundant given the `action` property already
    // serves the purpose of informing the client. Keeping it atm only for
    // backwards compatibility. - James
  });

  socket.on('disconnect', async () => {
    if (!currentRoom) {
      return;
    }

    let result = await redis.get(currentRoom);
    if (!result) {
      return;
    }

    console.log(`Client '${socket.id}' of room '${currentRoom}' disconnected`);
    result.team = result.team.filter(({ id }) => id !== socket.id);

    if (isRoomEmpty(io, currentRoom)) {
      console.log(
        `All clients of room '${currentRoom}' disconnected, deleting the room`
      );
      result = defaultState;
      redis.del(currentRoom);
    } else {
      redis.set(currentRoom, result);
    }

    socket.to(currentRoom).emit('stateUpdate', getResultWithoutScores(result));
  });
}

export default handlers;
