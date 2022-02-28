import React from 'react';
import PropTypes from 'prop-types';

// import styles
import './header.scss';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({logout}) => {
  return (
    <div className='header'>
        {/* // TODO: ajout du logo à la place du titre */}

        <h1 className='header__title'>O'rganizer</h1>
        <button onClick={logout} className='header__logout-button'>
          <LogoutIcon />
        </button>
    </div>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default Header