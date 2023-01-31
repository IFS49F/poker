import { render } from '@testing-library/react';

import PlayerList from './player-list';

describe('PlayerList', () => {
  it('renders', () => {
    const { baseElement } = render(<PlayerList />);
    expect(baseElement).toBeTruthy();
  });
});
