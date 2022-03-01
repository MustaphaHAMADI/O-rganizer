import React from 'react';
import Header from '../Header/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from '../Home/Home';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8675Eb',
    },
    secondary: {
      main: '#15074e',
    },
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
      </ThemeProvider>
    </div>
  );
};

export default App;
