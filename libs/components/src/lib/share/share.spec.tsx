import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Share from './share';

describe('Share', () => {
  const roomName = 'dummy-room';

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        protocol: 'https:',
        host: 'poker4.fun',
      },
      configurable: true,
      enumerable: false,
    });
  });

  it('renders the Poker4Fun title', () => {
    render(<Share roomName={roomName} />);
    expect(screen.getByRole('heading', { name: 'Poker4 Fun' })).toBeTruthy();
  });

  it('renders the link', () => {
    render(<Share roomName={roomName} />);
    const link = screen.getByRole('link', { name: 'poker4.fun/dummy-room' });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('https://poker4.fun/dummy-room');
  });

  describe('when Web Share API is supported', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'share', {
        value: vitest.fn().mockResolvedValue(undefined),
        configurable: true,
      });
    });

    it('calls Web Share API when the link is clicked', async () => {
      render(<Share roomName={roomName} />);
      const user = userEvent.setup();
      await user.click(screen.getByRole('link'));
      expect(navigator.share).toHaveBeenCalledWith({
        title: 'dummy-room ♠︎ Poker4Fun',
        url: 'https://poker4.fun/dummy-room',
      });
    });

    afterEach(() => {
      Reflect.deleteProperty(navigator, 'share');
    });
  });

  describe('when Clipboard API is supported', () => {
    it('calls Clipboard API when the link is clicked', async () => {
      render(<Share roomName={roomName} />);
      const user = userEvent.setup();
      await user.click(screen.getByRole('link'));
      expect(await navigator.clipboard.readText()).toBe(
        'https://poker4.fun/dummy-room'
      );
    });
  });
});