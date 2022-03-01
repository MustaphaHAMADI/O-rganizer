import React from 'react';
import PropTypes from 'prop-types';

// import styles
import './header.scss';
import LogoutIcon from '@mui/icons-material/Logout';

// import elements
import Btn from '../Btn/Btn';
import logo from '../../assets/logo.png';

const Header = ({logout}) => {
  return (
    <div className='header'>
      <div className='header__banner'>
        <img className='header__banner-logo' src={logo} alt='Logo' />
        <h1 className='header__banner-title'>O'rganizer</h1>
      </div>
      <div className='header__btns'>
        <Btn text='Se déconnecter' icon={<LogoutIcon />} clicked={logout} />
      </div>
    </div>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

Header.defaultProps = {
  logout: () => () => console.log('logout clicked'),
}

export default Header