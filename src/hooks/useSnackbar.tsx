import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarProps {
  isError: boolean;
  message: string;
}

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [alertData, setAlertData] = useState<SnackbarProps>({
    isError: false,
    message: ''
  });

  const showSnackbar = (isError: boolean, message: string) => {
    setAlertData({ isError, message });
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  const SnackbarComponent: React.FC = () => {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertData.isError ? "error" : "success"} sx={{ width: '100%' }}>
          {alertData.message}
        </Alert>
      </Snackbar>
    );
  };

  return [SnackbarComponent, showSnackbar] as const;
};

export default useSnackbar;
