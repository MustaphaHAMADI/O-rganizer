// import dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// import style
import './btn.scss';
import LoadingButton from '@mui/lab/LoadingButton';

const Btn = ({ text, icon, clicked, disabled, fullWidth }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    setLoading(true);
    await clicked();
    setLoading(false);
    return () => setLoading(false);
  };
  return (
    <LoadingButton
      onClick={handleClick}
      variant='contained'
      disabled={disabled}
      loading={loading}
      loadingIndicator='Loading...'
      fullWidth={fullWidth}
      size='large'
    >
      <span className='btn__content'>
        {icon}
        {text}
      </span>
    </LoadingButton>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

Btn.defaultProps = {
  clicked: () => console.log('clicked'),
  disabled: false,
  fullWidth: false,
  icon: null,
};

export default Btn;
