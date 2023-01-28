import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import SiteNotification, { DISMISS_COOKIE_KEY } from './site-notification';

const fakeIssuedDate = 1034244000000;
global.fetch = vitest.fn().mockResolvedValue({
  text: async () => `<div --data-date-issued="${fakeIssuedDate}">Foo</div>`,
});

describe('SiteNotification', () => {
  beforeEach(() => {
    (global.fetch as Mock).mockClear();
    document.cookie = `${DISMISS_COOKIE_KEY}= ;path=/ ;expires=Fri Jan 01 1999 00:00:00 GMT`;
    Date.now = () => fakeIssuedDate + 1;
  });

  it('renders', () => {
    const { baseElement } = render(<SiteNotification />);
    expect(baseElement).toBeTruthy();
  });

  describe('When never been dismissed', () => {
    it('hides when the dismiss button is clicked', async () => {
      render(<SiteNotification />);
      await waitFor(() => expect(screen.getByText('Foo')).toBeVisible());
      const user = userEvent.setup();
      await user.click(screen.getByLabelText('dismiss'));
      expect(screen.queryByText('Foo')).toBeNull();
      expect(document.cookie).toBe(
        `${DISMISS_COOKIE_KEY}=${fakeIssuedDate + 1}`
      );
    });
  });

  describe('When dismissed before issue date', () => {
    it('shows', async () => {
      document.cookie = `${DISMISS_COOKIE_KEY}=${
        fakeIssuedDate - 1
      } ;path=/ ;max-age=604800`;
      render(<SiteNotification />);
      await waitFor(() => expect(screen.getByText('Foo')).toBeVisible());
    });
  });

  describe('When dismissed after issue date', () => {
    it('does not show', async () => {
      document.cookie = `${DISMISS_COOKIE_KEY}=${
        fakeIssuedDate + 1
      } ;path=/ ;max-age=604800`;
      render(<SiteNotification />);
      await waitFor(() => expect(screen.queryByText('Foo')).toBeNull());
    });
  });
});
