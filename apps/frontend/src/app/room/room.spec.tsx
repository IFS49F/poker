import { render } from '@testing-library/react';

import Room from './room';

describe('Room', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Room />);
    expect(baseElement).toBeTruthy();
  });
});
