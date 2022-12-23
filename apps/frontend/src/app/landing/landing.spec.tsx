import { render } from '@testing-library/react';

import Landing from './landing';

describe('Landing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Landing />);
    expect(baseElement).toBeTruthy();
  });
});
