import { render } from '@testing-library/react';
import { of } from 'rxjs';

import Player from './player';

describe('Player', () => {
  it('renders', () => {
    const { baseElement } = render(
      <Player
        name="James"
        action$={of()}
        voted={false}
        show={false}
        suit={'♤'}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
