import React, { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SnackbarContext = createContext({
  showSnackbar: () => {},
  snackbarData: {
    open: false,
    isError: false,
    message: '',
  },
});

export const SnackbarProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    isError: false,
    message: '',
  });

  const showSnackbar = (isError, message) => {
    setSnackbarData({
      open: true,
      isError,
      message,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarData((prevData) => ({
      ...prevData,
      open: false,
    }));
  };

  const SnackbarComponent = () => (
    <Snackbar
      open={snackbarData.open}
      autoHideDuration={600}
    >
      <Alert
        severity={snackbarData.isError ? 'error' : 'success'}
        sx={{ width: '100%' }}
        action={
          <IconButton
            size="small"
            aria-label="fechar"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {snackbarData.message}
      </Alert>
    </Snackbar>
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar, snackbarData }}>
      {children}
      <SnackbarComponent />
    </SnackbarContext.Provider>
  );
};

export default SnackbarContext;
