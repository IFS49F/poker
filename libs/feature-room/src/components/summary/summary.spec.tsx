import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import { PlayerState } from '../../types/player-state';
import Summary, { SummaryProps } from './summary';

describe('Summary', () => {
  const defaultProps: SummaryProps = {
    show: false,
    players: [
      {
        voted: true,
        score: '8',
      },
      {
        voted: true,
        score: '5',
      },
      {
        voted: true,
        score: '13',
      },
      {
        voted: true,
        score: '5',
      },
      {
        voted: false,
      },
      {
        voted: true,
        score: '0',
      },
    ] as PlayerState[],
    onChangeHighlight: vitest.fn(),
  };

  it('renders', () => {
    const { baseElement } = render(<Summary {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('does not render anything when not showing', () => {
    render(<Summary {...defaultProps} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('does not render anything when no one has voted', () => {
    render(<Summary {...defaultProps} players={[]} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  describe('when showing and there is at least one vote', () => {
    beforeEach(() => {
      (defaultProps.onChangeHighlight as Mock).mockClear();
      render(<Summary {...defaultProps} show={true} />);
    });

    it('shows the results', () => {
      expect(screen.queryByRole('list', { name: 'Result' })).not.toBeNull();
    });

    it('shows a tally of each voted score', () => {
      expect(
        screen
          .getAllByRole('listitem')
          .map((item) => item.getAttribute('aria-label'))
      ).toMatchInlineSnapshot(`
        [
          "one person voted 0",
          "2 people voted 5",
          "one person voted 8",
          "one person voted 13",
        ]
      `);
    });

    it('calls onChangeHighlight callback when the user hovers on a score', async () => {
      const user = userEvent.setup();
      const eight = screen.getByText('8');
      await user.hover(eight);
      expect(defaultProps.onChangeHighlight).toHaveBeenNthCalledWith(1, '8');
      await user.unhover(eight);
      expect(defaultProps.onChangeHighlight).toHaveBeenNthCalledWith(2, null);
    });
  });
});
