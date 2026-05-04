# Poker Socket.IO API Documentation

This document describes the Socket.IO API for the Poker application backend.

## Overview

The Socket.IO server manages real-time communication for planning poker sessions. It handles room management, player state synchronization, voting, and result display through WebSocket connections.

The server runs on Bun, uses Socket.IO v4 on top of `@socket.io/bun-engine`, and stores room state in Redis via Bun's native Redis client.

## Connection

Connect to the Socket.IO server using the configured server URL:

```javascript
const socket = io(process.env.BUN_PUBLIC_SOCKET_SERVER_URL);
```

The server only accepts browser origins that match `WEB_BASE_URL`.

## Data Structures

### Player Object

```javascript
{
  id: string,         // Socket ID
  name: string,       // Player display name
  suit: string,       // Optional suit symbol
  score: string|null, // Voted score or null
  voted: boolean      // Whether player has voted
}
```

### Room State

```javascript
{
  team: Player[],     // Array of players in the room
  show: boolean       // Whether votes are revealed
}
```

### Action Object

```javascript
{
  type: string,       // Action type: 'vote', 'show', 'clear'
  playerId: string    // ID of player who performed the action
}
```

## Client Events (Client -> Server)

### `join`

Join a poker planning room.

**Parameters:**

- `room` (string): Room name (will be converted to lowercase)

**Example:**

```javascript
socket.emit("join", "my-room");
```

**Behavior:**

- Creates room if it does not exist
- Loads room state from Redis
- Emits `stateUpdate` to all clients in room

### `play`

Start participating in the poker session.

**Parameters:**

- `player` (string | object): Player information
  - `name` (string): Player display name
  - `suit` (string): Optional suit symbol

**Example:**

```javascript
socket.emit("play", { name: "John Doe", suit: "S" });
```

**Behavior:**

- Adds player to room's team
- Sets initial score to null and voted to false
- Emits `stateUpdate` to all clients in room

### `vote`

Submit a vote for the current story.

**Parameters:**

- `score` (string): The estimated score/points

**Example:**

```javascript
socket.emit("vote", "5");
```

**Behavior:**

- Updates player's score and voted status
- Emits `stateUpdate` with vote action to all clients
- Scores remain hidden until `show` is triggered

### `show`

Reveal all votes to participants.

**Parameters:** None

**Example:**

```javascript
socket.emit("show");
```

**Behavior:**

- Sets room's show flag to true
- Emits `stateUpdate` with show action and all scores visible
- All players can now see everyone's votes

### `clear`

Clear all votes and start a new round.

**Parameters:** None

**Example:**

```javascript
socket.emit("clear");
```

**Behavior:**

- Resets all players' scores to null and voted to false
- Sets room's show flag to false
- Emits `stateUpdate` with clear action and `isClearAction` flag

## Server Events (Server -> Client)

### `stateUpdate`

Main event for synchronizing room state across all clients.

**Parameters:**

- `state` (object): Current room state
  - `team` (Player[]): Array of players (scores hidden unless `show=true`)
  - `show` (boolean): Whether votes are currently revealed
  - `action` (object, optional): Action that triggered this update
- `isClearAction` (boolean, optional): Flag indicating this is a clear action

**Example:**

```javascript
socket.on("stateUpdate", (state, isClearAction) => {
  // state.team contains players
  // state.show indicates if votes are visible
  // state.action contains the triggering action (if any)
});
```

**Behavior:**

- Sent whenever room state changes
- Scores are filtered out for non-show states
- Includes action information for UI feedback
- Clear actions include special `isClearAction` flag

## Connection Events

### `connect`

Standard Socket.IO connection event.

```javascript
socket.on("connect", () => {
  console.log("Connected to server");
});
```

### `disconnect`

Automatic cleanup when client disconnects.

**Behavior:**

- Removes player from room's team
- Deletes empty rooms from Redis
- Notifies remaining players of updated state

### `connect_error`

Connection error handling.

```javascript
socket.on("connect_error", (reason) => {
  console.log("Connection failed:", reason);
});
```

### `reconnect`

Automatic reconnection handling.

```javascript
socket.on("reconnect", () => {
  console.log("Reconnected to server");
  // Client should re-join room and restore player state
});
```

## Room Management

### Room Creation

- Rooms are created automatically when first client joins
- Room names are case-insensitive (converted to lowercase)
- Empty rooms are automatically deleted when all clients disconnect

### State Persistence

- Room state is stored in Redis under the stable `poker:` key prefix
- State persists across server restarts as long as Redis data remains available
- Rooms are cleaned up when empty

### Privacy Model

- Votes are hidden from other players until `show` is triggered
- All players see votes after `show` is called

## Environment Variables

- `PORT`: HTTP port for the Bun server
- `REDIS_URL`: Redis connection string
- `WEB_BASE_URL`: Allowed browser origin for Socket.IO CORS

## Error Handling

The server includes basic error handling:

- Invalid room states return early without action
- Redis connection failures bubble up through Bun's runtime errors
- Client disconnections are managed automatically

## Usage Flow

1. **Join Room**: Client connects and emits `join` with room name
2. **Start Playing**: Client emits `play` with player information
3. **Vote**: Players emit `vote` with their estimates
4. **Show Results**: Any player can emit `show` to reveal votes
5. **Clear Round**: Any player can emit `clear` to start new round
6. **Repeat**: Steps 3-5 repeat for each story/task

## Security Considerations

- Room names are normalized to lowercase
- No authentication system is implemented; rooms are public
- Redis keys use room names under the `poker:` prefix
- Client-side player names are trusted without validation
