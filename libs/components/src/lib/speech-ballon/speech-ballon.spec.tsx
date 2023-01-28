import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SpeechBallon, { SpeechBallonProps } from './speech-ballon';

describe('SpeechBallon', () => {
  const defaultProps: SpeechBallonProps = {
    show: false,
    backgroundColor: 'blue',
    children: 'Show!',
  };

  it('renders', () => {
    const { baseElement } = render(<SpeechBallon {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('is not visible when show === false', () => {
    render(<SpeechBallon {...defaultProps} />);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('is visible when show === true', () => {
    render(<SpeechBallon {...defaultProps} show={true} />);
    const ballon = screen.getByRole('alert');
    expect(ballon).toBeVisible();
    expect(ballon).toHaveTextContent('Show!');
  });
});
