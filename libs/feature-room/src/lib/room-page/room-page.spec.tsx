import { render } from '@testing-library/react';

import RoomPage from './room-page';

describe('RoomPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RoomPage />);
    expect(baseElement).toBeTruthy();
  });
});
