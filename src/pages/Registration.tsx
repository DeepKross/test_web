import { useState } from 'react';
import { Box, Button, Input } from '@mui/material';

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
          <Input
            type="text"
            name="position_id"
            placeholder="Position"
            sx={{
              width: '100%',
              marginBottom: 2,
            }}
            onChange={(event) => {
              setData({ ...data, position_id: parseInt(event.target.value) });
            }}
          />
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
