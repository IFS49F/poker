import { act, renderHook } from '@testing-library/react';
import usePersistentState from './use-persistent-state';

describe('usePersistentState', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('stores value correctly', () => {
    const { result } = renderHook(() => usePersistentState('key', 'init'));

    expect(result.current[0]).toBe('init');

    act(() => {
      result.current[1]('new');
    });

    expect(result.current[0]).toBe('new');
  });

  it('persists value correctly', () => {
    const { result: r1 } = renderHook(() => usePersistentState('key', 'init'));

    act(() => {
      return r1.current[1]('saved');
    });

    const { result: r2 } = renderHook(() => usePersistentState('key', 'init'));

    expect(r2.current[0]).toBe('saved');
  });
});
