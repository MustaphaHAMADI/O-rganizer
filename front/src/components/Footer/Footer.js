import React from 'react';
import './footer.scss';

const Footer = () => (
    <div className='footer'>
      <a className='footer__navlink' href='#'>Plan du site</a>
      <a className='footer__navlink' href='#'>Contact</a>
    </div>
  );
  
export default React.memo(Footer);
