// import dependencies
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import components
import HeaderContainer from '../../Containers/HeaderContainer/HeaderContainer';
import FooterContainer from '../../Containers/FooterContainer/FooterContainer';
import Home from '../Home/Home';
import PlanningContainer from '../../Containers/PlanningContainer/planningContainer';
import RequireAuth from '../RequireAuth/RequireAuth';
import RequireAdmin from '../RequireAdmin/RequireAdmin';
import NoAuthRequired from '../NoAuthRequired/NoAuthRequired';
import NotFound from '../NotFound/NotFound';
import UsersPage from '../UsersPage/UsersPage';
import User from '../User/User';
import ContactPage from '../ContactPage/ContactPage';
import ShiftsPageContainer from '../../Containers/ShiftsPageContainer/ShiftsPageContainer';

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
        <HeaderContainer />

        <Routes>
          <Route element={<NoAuthRequired />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/planning' element={<PlanningContainer />} />
            <Route element={<RequireAdmin />}>
              <Route path='/users' element={<UsersPage />} />
            </Route>
            <Route element={<RequireAdmin />}>
              <Route path='/shifts' element={<ShiftsPageContainer />} />
            </Route>
            <Route path='/user' element={<User />} />
          </Route>
          <Route>
            <Route path='/contact' element={<ContactPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>

        <FooterContainer />
      </ThemeProvider>
    </div>
  );
};

export default App;
