import { render } from '@testing-library/react';

import Card from './card';

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Card
        highlighted={false}
        voted={false}
        show={false}
        suit={'♤'}
        score={'0'}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
