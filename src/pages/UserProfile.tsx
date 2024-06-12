import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getUserById } from '../api/users';
import { Header } from '../components/Header/Header.tsx';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  registration_timestamp: string;
  photo: string;
}

export const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();

  const { data: user, isLoading, isError } = useQuery<UserProfile>({
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  if (isLoading) return <CircularProgress />;

  if (isError || !user) return <div>Error fetching user data</div>;

  return (
    <>
      <Header />


      <Box display="flex" justifyContent="center" p={2}>
        <Card sx={{ maxWidth: 600 }}>
          <CardMedia
            component="img"
            height="300"
            image={user.photo}
            alt={user.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {user.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Phone: {user.phone}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Position: {user.position}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Registered: {new Date(user.registration_timestamp).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
