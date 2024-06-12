import { Registration } from '../pages/Registration.tsx';
import { UserProfile } from '../pages/UserProfile.tsx';
import { Users } from '../pages/Users.tsx';

export const routes = [
  {
    path: '/',
    element: <Registration />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/users/:userId',
    element: <UserProfile />,
  },
];
