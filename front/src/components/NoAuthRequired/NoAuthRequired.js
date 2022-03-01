import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
  const auth = useSelector((state) => state.auth.user);
  const location = useLocation();
  return auth ? (
    <Navigate to='/planning' state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
