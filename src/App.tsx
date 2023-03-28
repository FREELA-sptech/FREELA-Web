import { ThemeProvider } from '@mui/material';

import HeaderLandingPage from './components/header';
import { theme } from './assets/mainTheme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <HeaderLandingPage />
    </ThemeProvider>

  );
}

export default App;
