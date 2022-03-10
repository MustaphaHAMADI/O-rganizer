// import dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// import styles
import './header.scss';
import LogoutIcon from '@mui/icons-material/Logout';

// import elements
import Btn from '../Btn/Btn';
import logo from '../../assets/logo.png';
import user from '../../assets/user.png';

const Header = ({ logout, isLoggedIn }) => {
  return (
    <div className='header'>
      {!isLoggedIn && (
        <div className='header__banner'>
          <img className='header__banner-logo' src={logo} alt='Logo' />
          <h1 className='header__banner-title'>O'rganizer</h1>
        </div>
      )}
      {isLoggedIn && (
        <div className='header__logged'>
          <div className='header__user-info'>
            <NavLink to={`/user/${JSON.parse(localStorage.user).id}`}>
              <img className='header__avatar' src={user} alt='User avatar' />
            </NavLink>
            <div className='header__user-info-details'>
              <p className='header__user-info-number'>{JSON.parse(localStorage.user).reg_number}</p>
              <p className='header__user-info-name'>{JSON.parse(localStorage.user).name} {JSON.parse(localStorage.user).lastname}</p>
            </div>
          </div>
          <Btn text='Se déconnecter' icon={<LogoutIcon />} clicked={logout} />
        </div>
      )}

      <div className='header__btns--mobile'>
        {isLoggedIn && <Btn text='' icon={<LogoutIcon />} clicked={logout} />}
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
