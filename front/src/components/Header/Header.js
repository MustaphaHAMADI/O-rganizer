import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/features/userAuth/userAuthSlice';

// import styles
import './header.scss';
import LogoutIcon from '@mui/icons-material/Logout';

// import elements
import Btn from '../Btn/Btn';
import logo from '../../assets/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='header'>
      <div className='header__banner'>
        <img className='header__banner-logo' src={logo} alt='Logo' />
        <h1 className='header__banner-title'>O'rganizer</h1>
      </div>
      <div className='header__btns'>
        {isLoggedIn && (
          <Btn
            text='Se déconnecter'
            icon={<LogoutIcon />}
            clicked={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  logout: () => () => console.log('logout clicked'),
};

export default Header;
