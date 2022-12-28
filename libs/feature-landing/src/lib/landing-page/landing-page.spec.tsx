import { render } from '@testing-library/react';

import LandingPage from './landing-page';

describe('LandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPage />);
    expect(baseElement).toBeTruthy();
  });
});
