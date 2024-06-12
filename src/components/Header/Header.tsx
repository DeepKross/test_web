import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export function Header() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      width: '100%',
    }}>
      <Button>
        <Link to={'/'}>Home</Link>
      </Button>
      <Button>
        <Link to={'/users'}>Users</Link>
      </Button>
    </Box>
  );
}
