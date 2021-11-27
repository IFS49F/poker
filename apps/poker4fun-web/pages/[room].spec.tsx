import { render } from '@testing-library/react';
import Room from './[room]';

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { room: 'foobar' } }),
}));

describe('Room', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Room />);
    expect(baseElement).toBeTruthy();
  });
});
