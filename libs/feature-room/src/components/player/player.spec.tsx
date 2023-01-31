import { render } from '@testing-library/react';

import Player from './player';

describe('Player', () => {
  it('renders', () => {
    const { baseElement } = render(
      <Player name="James" voted={false} show={false} suit={'♤'} id="" />
    );
    expect(baseElement).toBeTruthy();
  });
});
