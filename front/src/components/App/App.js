import React from 'react';

// import components
import Header from '../Header/Header';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';

// import style
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './app.scss';

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
    <div className='app'>
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
