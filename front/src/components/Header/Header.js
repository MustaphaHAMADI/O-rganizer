import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({logoutButton}) => {
  return (
    <div className='header'>
        <h1 className='header__title'>O'rganizer</h1>
        <button className='header__logout-button'>
          <LogoutIcon />
        </button>
    </div>
  )
}

Header.propTypes = {}

export default Header