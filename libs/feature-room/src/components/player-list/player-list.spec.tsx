import { render } from '@testing-library/react';
import { of } from 'rxjs';

import PlayerList from './player-list';

describe('PlayerList', () => {
  it('renders', () => {
    const { baseElement } = render(
      <PlayerList players={[]} show={false} action$={of()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
