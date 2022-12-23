/// <reference types="vite/client" />

declare module 'human-readable-ids' {
  export const hri: {
    random: () => string;
  };
}
