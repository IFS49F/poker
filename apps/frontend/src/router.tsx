import { LandingPage } from '@poker4-fun/feature-landing';
import { RoomPage } from '@poker4-fun/feature-room';
import { createBrowserRouter, redirect } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage appDomain={import.meta.env.VITE_APP_DOMAIN} />,
    async action({ request }) {
      const formData = await request.formData();
      return redirect(
        `/${formData.get('roomName') || formData.get('randomRoomName')}`
      );
    },
  },
  {
    path: '/:room',
    element: <RoomPage />,
  },
]);

export default router;
