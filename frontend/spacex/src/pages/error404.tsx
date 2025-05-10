import { Box, Button, Typography } from '@mui/material';

export default function Error({error="404"}:{error?:string}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" color='primary'>
        {error}
      </Typography>
      <Button variant="contained" href='/'>Back Home</Button>
    </Box>
  );
}
