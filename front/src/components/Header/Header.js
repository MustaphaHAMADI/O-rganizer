// import dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

// import styles
import './header.scss';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// import elements
import Btn from '../Btn/Btn';
import logo from '../../assets/logo.png';
import userAvatar from '../../assets/user.png';

const Header = ({ logout, isLoggedIn, user }) => {
  return (
    <div className='header'>
      {!isLoggedIn && (
        <div className='header__banner'>
          <img className='header__banner-logo' src={logo} alt='Logo' />
          <h1 className='header__banner-title'>O'rganizer</h1>
        </div>
      )}
      <div className='header__btns--desktop'>
        {isLoggedIn && (
          <div className='header__logged'>
            <div className='header__user-info'>
              <NavLink to={`/user/${JSON.parse(localStorage.user).id}`}>
                <img
                  className='header__avatar'
                  src={userAvatar}
                  alt='User avatar'
                />
              </NavLink>
              <div className='header__user-info-details'>
                <p className='header__user-info-number'>
                  {JSON.parse(localStorage.user).reg_number}
                </p>
                <p className='header__user-info-name'>
                  {JSON.parse(localStorage.user).name}{' '}
                  {JSON.parse(localStorage.user).lastname}
                </p>
              </div>
            </div>
            <div className='header__buttton--container'>
              {user.role === 'admin' ? (
                <Button variant='contained'>
                  <Link to='users'>Gestion des utilisateurs</Link>
                </Button>
              ) : null}
              <Btn
                text='Se déconnecter'
                icon={<LogoutIcon />}
                clicked={logout}
              />
            </div>
          </div>
        )}
      </div>

      <div className='header__btns--mobile'>
        {isLoggedIn && (
          <div className='header__logged'>
            <div className='header__user-info'>
              <NavLink to={`/user/${JSON.parse(localStorage.user).id}`}>
                <img className='header__avatar' src={user} alt='User avatar' />
              </NavLink>
              <div className='header__user-info-details'>
                <p className='header__user-info-number'>
                  {JSON.parse(localStorage.user).reg_number}
                </p>
                <p className='header__user-info-name'>
                  {JSON.parse(localStorage.user).name}{' '}
                  {JSON.parse(localStorage.user).lastname}
                </p>
              </div>
            </div>
            <Btn text='' icon={<LogoutIcon />} clicked={logout} />
          </div>
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
