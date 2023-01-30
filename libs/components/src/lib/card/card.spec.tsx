import { screen, render } from '@testing-library/react';
import Card, { CardProps } from './card';

describe('Card', () => {
  const defaultProps: CardProps = {
    bouncing: false,
    highlighted: false,
    voted: false,
    show: false,
    suit: '♤',
    score: '0',
  };

  it('renders', () => {
    const { baseElement } = render(<Card {...defaultProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('displays the back face', () => {
    render(<Card {...defaultProps} />);
    expect(screen.queryByText(defaultProps.suit)).not.toBeNull();
  });

  describe('when not showing score', () => {
    describe('and voted', () => {
      it('does not display the score', () => {
        render(<Card {...defaultProps} show={false} voted={true} />);
        expect(screen.queryByText(defaultProps.score as string)).toBeNull();
      });
    });

    describe('and not voted', () => {
      it('does not display a sleepy face', () => {
        render(<Card {...defaultProps} show={false} voted={false} />);
        expect(screen.queryByText('😴')).toBeNull();
      });
    });
  });

  describe('when showing score', () => {
    describe('and voted', () => {
      it('displays the score', () => {
        render(<Card {...defaultProps} show={true} voted={true} />);
        expect(screen.queryByText(defaultProps.score as string)).not.toBeNull();
      });
    });

    describe('and not voted', () => {
      it('displays a sleepy face', () => {
        render(<Card {...defaultProps} show={true} voted={false} />);
        expect(screen.queryByText('😴')).not.toBeNull();
      });
    });
  });
});
