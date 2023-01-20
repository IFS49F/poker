import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OfflineBanner from './offline-banner';

describe('OfflineBanner', () => {
  it('renders', () => {
    const { baseElement } = render(<OfflineBanner show={false} />);
    expect(baseElement).toBeTruthy();
  });

  it('is not visible when show === false', () => {
    render(<OfflineBanner show={false} />);
    expect(screen.queryByText('Reconnecting...')).toBeNull();
  });

  it('is visible when show === true', () => {
    render(<OfflineBanner show={true} />);
    expect(screen.getByText('Reconnecting...')).toBeVisible();
  });
});
