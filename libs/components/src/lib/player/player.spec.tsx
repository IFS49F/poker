import { render } from '@testing-library/react';

import Player from './player';

describe('Player', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Player />);
    expect(baseElement).toBeTruthy();
  });
});
