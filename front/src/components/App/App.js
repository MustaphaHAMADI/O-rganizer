import React from 'react';
import Header from '../Header/Header';
import Login from '../Login/Login';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
        <Login />
      </ThemeProvider>
    </div>
  );
};

export default App;
