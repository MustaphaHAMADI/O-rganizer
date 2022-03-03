// import dependencies
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NoAuthRequired = () => {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  return auth ? (
    <Navigate to='/planning' state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default NoAuthRequired;
