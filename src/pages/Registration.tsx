import { useState } from 'react';
import { Box, Button, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getAllPositions } from '../api/positions.ts';
import { getToken } from '../api/token.ts';
import { registerUser } from '../api/users';
import { Header } from '../components/Header/Header.tsx';

export function Registration() {
  const [data, setData] = useState<{
    name: string;
    email: string;
    phone: string;
    position_id: number;
    photo: File | null;
  }>({
    name: '',
    email: '',
    phone: '',
    position_id: 0,
    photo: null,
  });

  const { data: positions, isError, isLoading } = useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const response = await getAllPositions();

      return response;
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('position_id', data.position_id.toString());

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const token = await getToken();

    void await registerUser(formData, token);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData({ ...data, photo: e.target.files[0] });
    }
  };

  const handlePositionChange = (event: SelectChangeEvent) => {
    setData({ ...data, position_id: +event.target.value });
  };

  if (!positions || isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching data</div>;

  return (
    <>
      <Header />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          padding: 2,
          border: '1px solid black',
          borderRadius: 2,
          width: 600,
          margin: 'auto',
          marginTop: 2,
        }}
      >
        <h1>Registration</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
          }}
        >
          <Input
            type="text"
            name="name"
            placeholder="Name"
            sx={{
              width: '100%',
              marginBottom: 2,
            }}
            onChange={(event) => {
              setData({ ...data, name: event.target.value });
            }}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            sx={{
              width: '100%',
              marginBottom: 2,
            }}
            onChange={(event) => {
              setData({ ...data, email: event.target.value });
            }}
          />
          <Input
            type="text"
            name="phone"
            placeholder="Phone"
            sx={{
              width: '100%',
              marginBottom: 2,
            }}
            onChange={(event) => {
              setData({ ...data, phone: event.target.value });
            }}
          />
          <InputLabel id="positions">Position</InputLabel>
          <Select
            labelId="positions"
            name="position_id"
            label="Position"
            value={data.position_id as unknown as string}
            onChange={handlePositionChange}
            sx={{
              width: '100%',
              marginBottom: 2,
            }}
          >
            {positions.map((position) => {
              return (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              );
            })}
          </Select>
          <input
            type="file"
            name="photo"
            placeholder="Photo"
            onChange={handleFileUpload}
          />
          <Button type="submit">Register</Button>
        </form>
      </Box>
    </>
  );
}
