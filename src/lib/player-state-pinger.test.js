import React from 'react';
import { shallow, mount } from 'enzyme';
import PlayerStatePinger from './player-state-pinger';

describe('lib/player-state-pinger', () => {
  it('should set state for specific player', () => {
    let prevState = {
      // To indicate `me` is an observer.
      me: undefined,
      team: [
        {
          id: '9527'
        }
      ]
    };
    let nextState = null;
    let instance = new PlayerStatePinger({
      // Simulate `setState`.
      setState: (callback) => {
        nextState = callback(prevState);
        return nextState;
      }
    });
    instance.setPlayerState('9527', 'voting', true);
    expect(nextState.team.find(player => player.id === '9527').voting).toEqual(true);
  });
});
