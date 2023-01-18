import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock } from 'vitest';
import Join, { JoinProps } from './join';

describe('Join', () => {
  const defaultProps: JoinProps = {
    defaultPlayerName: 'Foo',
    onJoin: vitest.fn(),
  };

  it('renders', () => {
    const { baseElement } = render(<Join {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('renders an input field', () => {
    render(<Join {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAccessibleName('Player Name');
    expect(input).toHaveAttribute('placeholder', 'type in your name');
  });

  it('renders a Play button', () => {
    render(<Join {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAccessibleName('Play');
  });

  it('calls `onJoin` with user input player name on submit', async () => {
    (defaultProps.onJoin as Mock).mockClear();

    render(<Join {...defaultProps} />);
    expect(defaultProps.onJoin).not.toBeCalled();

    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox'), 'bar');
    await user.click(screen.getByRole('button'));
    expect(defaultProps.onJoin).toHaveBeenCalledWith('Foobar');
  });
});
