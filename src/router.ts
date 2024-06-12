import { createBrowserRouter } from 'react-router-dom';

import { routes } from './pages/routes.tsx';

export const router = createBrowserRouter([
  ...routes,
]);
