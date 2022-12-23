import { createBrowserRouter, redirect } from 'react-router-dom';
import Landing from './app/landing/landing';
import Room from './app/room/room';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    async action({ request }) {
      const formData = await request.formData();
      return redirect(
        `/${formData.get('roomName') || formData.get('randomRoomName')}`
      );
    },
  },
  {
    path: '/:room',
    element: <Room />,
  },
]);

export default router;
