import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default RequireAuth;
