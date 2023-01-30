import { LandingPage } from '@poker4-fun/feature-landing';
import { RoomPage } from '@poker4-fun/feature-room';
import { createBrowserRouter, redirect } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    async action({ request }) {
      const formData = await request.formData();
      return redirect(
        `/${formData.get('roomName') || formData.get('randomRoomName')}`
      );
    },
  },
  {
    path: '/:roomName',
    element: (
      <RoomPage remoteUrl={import.meta.env.VITE_APP_SOCKET_SERVER_URL} />
    ),
  },
]);

export default router;
