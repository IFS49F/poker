import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { cardScores } from '../card/card-scores';
import Actions, { ActionsProps } from './actions';

describe('Actions', () => {
  const defaultProps: ActionsProps = {
    show: false,
    onVote: vitest.fn(),
    onShow: vitest.fn(),
    onClear: vitest.fn(),
  };

  it('renders', () => {
    const { baseElement } = render(<Actions {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('renders action buttons', () => {
    render(<Actions {...defaultProps} />);
    expect(screen.getAllByRole('radio').map((btn) => btn.textContent)).toEqual(
      cardScores
    );
  });

  it('shows my vote', () => {
    render(<Actions {...defaultProps} myScore={'8'} />);
    expect(screen.getByRole('radio', { name: '8' })).toBeChecked();
  });

  describe('when not showing votes', () => {
    beforeEach(() => {
      vitest.clearAllMocks();
      render(<Actions {...defaultProps} />);
    });

    it('has a disabled Clear button', () => {
      expect(screen.getByRole('button', { name: 'Clear' })).toBeDisabled();
    });

    it('has a Show button', () => {
      expect(screen.getByRole('button', { name: 'Show' })).not.toBeDisabled();
    });

    it('calls onVote callback when a vote button is clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('radio', { name: '8' }));
      expect(defaultProps.onVote).toBeCalledWith('8');
    });

    it('calls onShow callback when the Show button is clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Show' }));
      expect(defaultProps.onShow).toBeCalled();
    });
  });

  describe('when showing votes', () => {
    beforeEach(() => {
      vitest.clearAllMocks();
      render(<Actions {...defaultProps} show={true} />);
    });

    it('has a Clear button', () => {
      expect(screen.getByRole('button', { name: 'Clear' })).not.toBeDisabled();
    });

    it('has a disabled Show button', () => {
      expect(screen.getByRole('button', { name: 'Show' })).toBeDisabled();
    });

    it('calls onVote callback when a vote button is clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('radio', { name: '8' }));
      expect(defaultProps.onVote).toBeCalledWith('8');
    });

    it('calls onClear callback when the Clear button is clicked', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByRole('button', { name: 'Clear' }));
      expect(defaultProps.onClear).toBeCalled();
    });
  });
});
