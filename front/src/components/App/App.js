import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import Planning from '../Planning/Planning';
import RequireAuth from '../RequireAuth/RequireAuth';

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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path='/planning' element={<Planning />} />
          </Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
