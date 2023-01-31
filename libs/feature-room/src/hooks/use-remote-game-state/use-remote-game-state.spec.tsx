import { renderHook } from '@testing-library/react';
import useRemoteGameState from './use-remote-game-state';

describe('useRemoteGameState', () => {
  it('renders', () => {
    expect(() => {
      renderHook(() => useRemoteGameState('foo'));
    }).not.toThrow();
  });
});
