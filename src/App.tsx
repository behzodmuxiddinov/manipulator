import { type PropsWithChildren, useEffect } from 'react';
import { Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { initUsers } from './utils';
import 'react-toastify/dist/ReactToastify.css';

function App({ children }: PropsWithChildren) {
  
  useEffect(() => {
    initUsers();
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100vw',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '0.875rem',
          fontWeight: 400,
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default App;
