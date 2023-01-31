import { cardScores } from '@poker4-fun/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NEVER } from 'rxjs';
import { Mock } from 'vitest';
import useRemoteGameState from '../../hooks/use-remote-game-state/use-remote-game-state';
import Actions from './actions';

vitest.mock('../../hooks/use-remote-game-state/use-remote-game-state');

describe('Actions', () => {
  const defaultContext = {
    isShowing: false,
    action$: NEVER,
    socket: { emit: vitest.fn() },
  };

  describe('when not showing votes', () => {
    beforeEach(() => {
      vitest.clearAllMocks();
      (useRemoteGameState as Mock).mockReturnValue(defaultContext);
      render(<Actions />);
    });

    it('renders action buttons', () => {
      expect(
        screen.getAllByRole('radio').map((btn) => btn.textContent)
      ).toEqual(cardScores);
    });

    it('has a disabled Clear button', () => {
      expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
    });

    it('has a Show button', () => {
      expect(screen.getByRole('button', { name: 'Show' })).not.toBeDisabled();
    });

    it('calls vote callback when a vote button is clicked', async () => {
      const user = userEvent.setup();
      const eight = screen.getByRole('radio', { name: '8' });
      await user.click(eight);
      expect(eight).toBeChecked();
      expect(defaultContext.socket.emit).toBeCalledWith('vote', '8');
    });

    it('calls show callback when the Show button is clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Show' }));
      expect(defaultContext.socket.emit).toBeCalledWith('show');
    });
  });

  describe('when showing votes', () => {
    beforeEach(() => {
      vitest.clearAllMocks();
      (useRemoteGameState as Mock).mockReturnValue({
        ...defaultContext,
        isShowing: true,
      });
      render(<Actions />);
    });

    it('has a Clear button', () => {
      expect(screen.getByRole('button', { name: 'Clear' })).not.toBeDisabled();
    });

    it('has a disabled Show button', () => {
      expect(screen.getByRole('button', { name: 'Show' })).toBeDisabled();
    });

    it('calls vote callback when a vote button is clicked', async () => {
      const user = userEvent.setup();
      const eight = screen.getByRole('radio', { name: '8' });
      await user.click(eight);
      expect(eight).toBeChecked();
      expect(defaultContext.socket.emit).toBeCalledWith('vote', '8');
    });

    it('calls clear callback when the Clear button is clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(defaultContext.socket.emit).toBeCalledWith('clear');
    });
  });
});
