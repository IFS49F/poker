import * as http from 'node:http';
import { Server } from 'socket.io';
import handlers from './app/handlers';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  serveClient: false,
  pingInterval: 5000,
  pingTimeout: 15000,
});

io.on('connection', (socket) => handlers(socket, io));

const port = process.env.PORT || 4300;
server.listen(port, () => console.log(`Listening on port ${port}`));
