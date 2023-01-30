import { render } from '@testing-library/react';
import LandingPage from './landing-page';

vitest.mock('react-helmet-async');
vitest.mock('react-router-dom');

describe('LandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPage />);
    expect(baseElement).toBeTruthy();
  });
});
