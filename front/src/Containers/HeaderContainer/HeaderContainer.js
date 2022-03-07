// import dependencies
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Header from '../../components/Header/Header';

// import function
import { logout } from '../../app/features/userAuth/userAuthSlice';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    try {
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };
  return <Header logout={handleLogout} isLoggedIn={isLoggedIn} />;
};

export default HeaderContainer;
