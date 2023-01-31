export interface ClientToServerEvents {
  join(room: string): void;
  play(player: { name: string } | string): void;
  vote(score: string): void;
  show(): void;
  clear(): void;
  disconnect(): void;
}
