import './style.scss'

import AppRoutes from "./AppRoutes"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#274C77',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <AppRoutes />
  </ThemeProvider>
)

export default App
