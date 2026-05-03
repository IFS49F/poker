import { RedisClient } from "bun";
import type { RoomState } from "./types";

const KEY_PREFIX = "poker:";

const client = process.env.REDIS_URL ? new RedisClient(process.env.REDIS_URL) : new RedisClient();

const isInvalidKey = (key: string | undefined | null): key is undefined | null =>
  !key || typeof key !== "string";

const getKey = (key: string): string => `${KEY_PREFIX}${key}`;

export const roomStore = {
  async get(key: string): Promise<RoomState | null> {
    if (isInvalidKey(key)) {
      return Promise.reject(new Error("Redis key must be a non-empty string"));
    }

    const result = await client.get(getKey(key));
    if (!result) {
      return null;
    }

    return JSON.parse(result) as RoomState;
  },

  async set(key: string, value: RoomState | string): Promise<string> {
    if (isInvalidKey(key)) {
      return Promise.reject(new Error("Redis key must be a non-empty string"));
    }

    const payload = typeof value === "string" ? value : JSON.stringify(value);
    await client.set(getKey(key), payload);
    return payload;
  },

  async del(key: string): Promise<number> {
    if (isInvalidKey(key)) {
      return Promise.reject(new Error("Redis key must be a non-empty string"));
    }

    return client.del(getKey(key));
  },
};

export const closeRoomStore = (): void => {
  client.close();
};
