import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Btn = ({ text, icon, clicked, disabled, fullWidth }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    // remove the setTimeout onece we have the API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    clicked();
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
      {icon}
      {text}
    </LoadingButton>
  );
};

Btn.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
};
Btn.defaultProps = {
  clicked: () => console.log('cliked'),
  disabled: false,
  fullWidth: false,
  icon: null,
};

export default Btn;
