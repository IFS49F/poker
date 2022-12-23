import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
