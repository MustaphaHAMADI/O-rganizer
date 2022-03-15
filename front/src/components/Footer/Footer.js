import React from 'react';
import './footer.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = ({isLoggedIn}) => (
    <div className='footer'>
      {isLoggedIn ? (
        <div className='footer__banner'>
          <img className='footer__banner-logo' src={logo} alt='Logo' />
          <h1 className='footer__banner-title'>O'rganizer</h1>
        </div>
      ) :
        <Link to='/contact'>
          <p>Présentation de l'équipe</p>
        </Link>
      }
    </div>
  );
  
export default React.memo(Footer);
