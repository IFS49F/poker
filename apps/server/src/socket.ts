import type { Server } from "socket.io";
import { closeRoomStore, roomStore } from "./redis";
import {
  addPlayer,
  buildStateUpdate,
  clearVotes,
  defaultState,
  maskScores,
  removePlayer,
  showScores,
  updatePlayerVote,
} from "./state";
import type {
  ClientToServerEvents,
  InterServerEvents,
  PlayPayload,
  ServerToClientEvents,
  SocketData,
} from "./types";

type PokerServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

const normalizeRoom = (room = ""): string => room.toLowerCase();

const isRoomEmpty = (io: PokerServer, room: string): boolean =>
  !io.sockets.adapter.rooms.get(room)?.size;

const getPlayerPayload = (payload: PlayPayload, socketId: string) => {
  const base = typeof payload === "string" ? { name: payload } : payload;
  return {
    id: socketId,
    name: base.name,
    suit: base.suit,
  };
};

export const registerSocketHandlers = (io: PokerServer): void => {
  io.on("connection", (socket) => {
    console.log(`Client '${socket.id}' connected`);

    socket.on("join", async (room = "") => {
      const currentRoom = normalizeRoom(room);
      socket.data.currentRoom = currentRoom;
      console.log(`Client '${socket.id}' joined room '${currentRoom}'`);

      await socket.join(currentRoom);

      let state = await roomStore.get(currentRoom);
      if (!state) {
        console.log(`New room '${currentRoom}' created`);
        state = defaultState();
      }

      await roomStore.set(currentRoom, state);
      io.in(currentRoom).emit("stateUpdate", maskScores(state));
    });

    socket.on("play", async (player) => {
      const currentRoom = socket.data.currentRoom;
      if (!currentRoom) {
        return;
      }

      const state = await roomStore.get(currentRoom);
      if (!state) {
        return;
      }

      const nextState = addPlayer(state, getPlayerPayload(player, socket.id));
      console.log(
        `Client '${socket.id}' starts playing in room '${currentRoom}' under the name '${typeof player === "string" ? player : player.name}'`,
      );

      await roomStore.set(currentRoom, nextState);
      io.in(currentRoom).emit("stateUpdate", buildStateUpdate(nextState));
    });

    socket.on("vote", async (score) => {
      const currentRoom = socket.data.currentRoom;
      if (!currentRoom) {
        return;
      }

      const state = await roomStore.get(currentRoom);
      if (!state) {
        return;
      }

      const nextState = updatePlayerVote(state, socket.id, score);
      if (!nextState) {
        return;
      }

      console.log(`Client '${socket.id}' of room '${currentRoom}' voted`);
      await roomStore.set(currentRoom, nextState);
      io.in(currentRoom).emit(
        "stateUpdate",
        buildStateUpdate(nextState, {
          type: "vote",
          playerId: socket.id,
        }),
      );
    });

    socket.on("show", async () => {
      const currentRoom = socket.data.currentRoom;
      if (!currentRoom) {
        return;
      }

      const state = await roomStore.get(currentRoom);
      if (!state) {
        return;
      }

      const nextState = showScores(state);
      console.log(`Client '${socket.id}' of room '${currentRoom}' showed the result`);
      await roomStore.set(currentRoom, nextState);
      io.in(currentRoom).emit(
        "stateUpdate",
        buildStateUpdate(
          nextState,
          {
            type: "show",
            playerId: socket.id,
          },
          true,
        ),
      );
    });

    socket.on("clear", async () => {
      const currentRoom = socket.data.currentRoom;
      if (!currentRoom) {
        return;
      }

      const state = await roomStore.get(currentRoom);
      if (!state) {
        return;
      }

      const nextState = clearVotes(state);
      console.log(`Client '${socket.id}' of room '${currentRoom}' cleared the result`);
      await roomStore.set(currentRoom, nextState);
      io.in(currentRoom).emit(
        "stateUpdate",
        buildStateUpdate(
          nextState,
          {
            type: "clear",
            playerId: socket.id,
          },
          true,
        ),
        true,
      );
    });

    socket.on("disconnect", async () => {
      const currentRoom = socket.data.currentRoom;
      if (!currentRoom) {
        return;
      }

      const state = await roomStore.get(currentRoom);
      if (!state) {
        return;
      }

      console.log(`Client '${socket.id}' of room '${currentRoom}' disconnected`);
      const nextState = removePlayer(state, socket.id);

      if (isRoomEmpty(io, currentRoom)) {
        console.log(`All clients of room '${currentRoom}' disconnected, deleting the room`);
        await roomStore.del(currentRoom);
        socket.to(currentRoom).emit("stateUpdate", maskScores(defaultState()));
        return;
      }

      await roomStore.set(currentRoom, nextState);
      socket.to(currentRoom).emit("stateUpdate", maskScores(nextState));
    });
  });
};

export const shutdownSocketServer = (): void => {
  closeRoomStore();
};
