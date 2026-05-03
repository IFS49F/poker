import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";
import { registerSocketHandlers, shutdownSocketServer } from "./socket";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

const webBaseUrl = process.env.WEB_BASE_URL;

if (!webBaseUrl) {
  throw new Error("WEB_BASE_URL is required");
}

const port = Number(process.env.PORT ?? 4000);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

const engine = new Engine({
  path: "/socket.io/",
  pingInterval: 5000,
  pingTimeout: 15000,
  cors: {
    origin: [webBaseUrl],
    credentials: true,
  },
});

io.bind(engine);
registerSocketHandlers(io);

const { websocket } = engine.handler();

const server = Bun.serve({
  port,
  idleTimeout: 30,
  websocket,
  fetch(request, bunServer) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/socket.io")) {
      return engine.handleRequest(request, bunServer);
    }

    if (url.pathname === "/") {
      return new Response("Poker server is running.\n", {
        headers: {
          "content-type": "text/plain; charset=utf-8",
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

const shutdown = () => {
  io.close();
  shutdownSocketServer();
  server.stop(true);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(`Poker server listening on ${server.url}`);
