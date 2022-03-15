// import dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

// import styles
import './header.scss';
import { Button, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

// import elements
import Btn from '../Btn/Btn';
import logo from '../../assets/logo.png';
import userAvatar from '../../assets/user.png';

const Header = ({ logout, isLoggedIn, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

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
            <NavLink to={`/user`}>
              <img
                className='header__avatar'
                src={userAvatar}
                alt='User avatar'
              />
            </NavLink>
            <div className='header__user-info-details'>
              <p className='header__user-info-number'>{user.reg_number}</p>
              <p className='header__user-info-name'>
                {user.name} {user.lastname}
              </p>
            </div>
          </div>

          <div className='header__buttons--desktop'>
            <div className='header__button-container'>
              {user.role === 'admin' ? (
                <React.Fragment>
                  <Button variant='contained'>
                    <Link to='users'>Gestion des utilisateurs</Link>
                  </Button>
                  <Button variant='contained'>
                    <Link to='shifts'>Gestion des factions</Link>
                  </Button>
                </React.Fragment>
              ) : null}
              <Btn
                text='Se déconnecter'
                icon={<LogoutIcon />}
                clicked={logout}
              />
            </div>
          </div>

          <div className='header__buttons--mobile'>
            {user.role === 'admin' ? (
              <div className='header__menu'>
                <Button
                  id='demo-positioned-button'
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon fontSize='large' sx={{ color: 'white' }} />
                </Button>
                <Menu
                  id='demo-positioned-menu'
                  aria-labelledby='demo-positioned-button'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to='users'>Gestion des utilisateurs</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to='shifts'>Gestion des factions</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
                </Menu>
              </div>
            ) : (
              <Btn text='' icon={<LogoutIcon />} clicked={logout} />
            )}
          </div>
        </div>
      )}
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
