import React, { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SnackbarContextType {
  showSnackbar: (isError: boolean, message: string) => void;
  snackbarData: {
    open: boolean;
    isError: boolean;
    message: string;
  };
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
  snackbarData: {
    open: false,
    isError: false,
    message: '',
  },
});

export const SnackbarProvider = ({ children }: any) => {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    isError: false,
    message: '',
  });

  const showSnackbar = (isError: boolean, message: string) => {
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
