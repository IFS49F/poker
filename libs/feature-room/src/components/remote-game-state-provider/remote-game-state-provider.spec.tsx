import { render } from '@testing-library/react';
import RemoteGameStateProvider from './remote-game-state-provider';

describe('RemoteGameStateProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RemoteGameStateProvider remoteUrl="" />);
    expect(baseElement).toBeTruthy();
  });
});
