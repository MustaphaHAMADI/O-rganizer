import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import components
import Header from '../Header/Header';
import Home from '../Home/Home';
import Footer from '../Footer/Footer';
import Planning from '../Planning/Planning';
import RequireAuth from '../RequireAuth/RequireAuth';
import NoAuthRequired from '../NoAuthRequired/NoAuthRequired';
import NotFound from '../NotFound/NotFound';

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
        <Routes>
          <Route element={<NoAuthRequired />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/planning' element={<Planning />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
