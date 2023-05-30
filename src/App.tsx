import './style.scss'

import AppRoutes from "./AppRoutes"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from './hooks/useSnackbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#274C77',
    },
    secondary: {
      main: '#6096BA'
    }
  },
});

const App = () => (
  <SnackbarProvider>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  </SnackbarProvider>
);

export default App
