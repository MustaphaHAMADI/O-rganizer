// import dependencies
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAdmin = () => {
  const role = useSelector((state) => state.auth.user.role);
  const location = useLocation();
  return role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to='/planning' state={{ from: location }} replace />
  );
};

export default RequireAdmin;
