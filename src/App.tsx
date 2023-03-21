import React from 'react';
import { Box, createTheme,ThemeProvider } from '@material-ui/core'
import HeaderLandingPage from './components/header';

const theme = createTheme({
  palette: {
    primary: {
      main: "#6096BA",
      light: "#A3CEF1",
      dark: "#274C77",
      contrastText: "#f6f6f6",

      
    }

  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HeaderLandingPage />
    </ThemeProvider>

  );
}

export default App;
