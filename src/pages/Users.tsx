import { useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Pagination, PaginationItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getAllUsers } from '../api/users.ts';
import { Header } from '../components/Header/Header.tsx';

export function Users() {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const data = await getAllUsers(6, page);

      return data;
    },
  });

  if (!data || isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching data</div>;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleGoToUser = (userId: number) => {
    window.location.href = '/users/' + userId;
  };

  return (
    <>
      <Header />
      <Box>
        <h1>Users</h1>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={data.total_pages}
            page={data.page}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: ArrowBack, next: ArrowForward }}
                {...item}
              />
            )}
          />
        </Box>
        <Grid container spacing={2} columns={2}>
          {data.users.map((user) => {
            return <Grid item key={user.id}>
              <Card sx={{ maxWidth: 345 }} onClick={() => {
                handleGoToUser(user.id);
                console.log(';lddsf');
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={user.photo} alt={user.name} style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                    }} />
                  </Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {user.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Position: {user.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registered: {new Date(user.registration_timestamp).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>;
          })}
        </Grid>
      </Box>
    </>
  );
}
